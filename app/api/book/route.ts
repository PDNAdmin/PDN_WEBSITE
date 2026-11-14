import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { bookingSchema, type Booking } from "@/lib/booking-schema";
import { clientEmail, firstName, internalEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { COUNTRIES } from "@/lib/countries";
import { LIVE, siteDomain, siteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_ELAPSED_MS = 3000;

/** Accepts JSON (the JS form) or a classic form post (no-JS fallback → 303 redirects). */
export async function POST(req: NextRequest) {
  const isJson = (req.headers.get("content-type") ?? "").includes("application/json");
  let raw: Record<string, unknown>;
  try {
    raw = isJson ? await req.json() : await fromForm(req);
  } catch {
    return reply(isJson, req, 400, { error: "bad_request" });
  }

  // honeypot: pretend success, send nothing
  if (typeof raw.company_website === "string" && raw.company_website.trim() !== "") {
    return reply(isJson, req, 200, { ok: true }, "");
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown";
  if (!(await rateLimit(ip))) return reply(isJson, req, 429, { error: "rate_limited" });

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    console.warn("[book] validation failed:", parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "");
      if (["name", "email", "phone", "need"].includes(k) && !fields[k]) fields[k] = issue.message;
    }
    return reply(isJson, req, 422, { error: "invalid", fields });
  }
  const b = parsed.data;
  if (isJson && b.elapsed < MIN_ELAPSED_MS) return reply(isJson, req, 400, { error: "too_fast" });

  const sent = await send(b);
  if (!sent) return reply(isJson, req, 500, { error: "send_failed" });
  return reply(isJson, req, 200, { ok: true }, firstName(b.name));
}

async function send(b: Booking): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL;
  if (!key || !to || !from) {
    console.error("[book] Missing RESEND_API_KEY / BOOKING_TO_EMAIL / BOOKING_FROM_EMAIL");
    if (process.env.NODE_ENV !== "production") {
      console.info("[book] DEV: booking accepted without sending:", internalEmail(b).subject);
      return true;
    }
    return false;
  }
  const resend = new Resend(key);
  const internal = internalEmail(b);
  const client = clientEmail(b, { siteUrl: siteUrl(), domain: siteDomain(), workLive: LIVE.work });
  try {
    const [a, c] = await Promise.all([
      resend.emails.send({
        from: `PDN Website <${from}>`,
        to: to.split(",").map((s) => s.trim()),
        replyTo: b.email,
        subject: internal.subject,
        html: internal.html,
        text: internal.text,
      }),
      resend.emails.send({
        from: `Pishon Digital Network <${from}>`,
        to: b.email,
        replyTo: to.split(",")[0]!.trim(),
        subject: client.subject,
        html: client.html,
        text: client.text,
      }),
    ]);
    if (a.error) console.error("[book] internal email failed", a.error);
    if (c.error) console.error("[book] auto-reply failed", c.error);
    // The booking counts as delivered if PDN got it; the auto-reply is best-effort.
    return !a.error;
  } catch (err) {
    console.error("[book] Resend error", err);
    return false;
  }
}

async function fromForm(req: NextRequest): Promise<Record<string, unknown>> {
  const fd = await req.formData();
  const get = (k: string) => (fd.get(k) as string | null) ?? "";
  const iso = get("phoneCode");
  return {
    name: get("name"),
    business: get("business"),
    email: get("email"),
    phoneCode: COUNTRIES.find((c) => c.iso === iso)?.code ?? (iso.startsWith("+") ? iso : "+234"),
    phone: get("phone"),
    audience: get("audience"),
    need: fd.getAll("need").map(String),
    currency: get("currency") || "ngn",
    budget: get("budget"),
    timeline: get("timeline") || undefined,
    message: get("message"),
    source: get("source") || undefined,
    package: get("package") || undefined,
    page: req.headers.get("referer") ?? "",
    company_website: get("company_website"),
  };
}

function reply(isJson: boolean, req: NextRequest, status: number, body: Record<string, unknown>, name?: string) {
  if (isJson) return NextResponse.json(body, { status });
  const url = new URL(req.url);
  if (status === 200) {
    url.pathname = "/thank-you";
    url.search = name ? `?name=${encodeURIComponent(name)}` : "";
  } else {
    // back to the page the form was on (/ or /contact), never off-site
    let back = "/";
    try {
      const ref = new URL(req.headers.get("referer") ?? "");
      if (ref.host === url.host) back = ref.pathname;
    } catch {}
    url.pathname = back;
    url.search = `?booking=error`;
    url.hash = "book";
  }
  return NextResponse.redirect(url, 303);
}
