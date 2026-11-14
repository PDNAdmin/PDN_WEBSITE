import "server-only";
import type { Booking } from "./booking-schema";
import { resolvePlain } from "./tokens";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const FONT = `'Bricolage Grotesque', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function lagosTime(d = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

/** Internal notification (docs/04 §12): subject + table of all fields, UTM, page, time, WhatsApp link. */
export function internalEmail(b: Booking) {
  const phone = `${b.phoneCode} ${b.phone}`;
  const digits = `${b.phoneCode}${b.phone}`.replace(/\D/g, "");
  const subject = `New booking: ${b.name} · ${b.need.join(", ")} · ${b.budget ?? "No budget given"}`;
  const rows: [string, string][] = [
    ["Name", b.name],
    ["Business", b.business ?? ""],
    ["Email", b.email],
    ["Phone / WhatsApp", phone],
    ["I am a…", b.audience],
    ["I need…", b.need.join(", ")],
    ["Budget", b.budget ? `${b.budget} (${b.currency.toUpperCase()})` : ""],
    ["Launch", b.timeline ?? ""],
    ["Package", b.package ?? ""],
    ["Project", b.message ?? ""],
    ["Heard about us", b.source ?? ""],
    ...Object.entries(b.utm).map(([k, v]) => [k, v] as [string, string]),
    ["Referrer", b.referrer ?? ""],
    ["Page", b.page ?? ""],
    ["Submitted (Lagos)", lagosTime()],
  ];
  const html = `<!doctype html><html><body style="margin:0;background:#0f0f10;padding:24px;font-family:${FONT};color:#f5f1e8">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;border-collapse:collapse">
<tr><td style="padding:0 0 16px;font-size:20px;font-weight:700">New booking</td></tr>
<tr><td style="padding:0 0 20px"><a href="https://wa.me/${digits}" style="display:inline-block;background:#d4af37;color:#0f0f10;padding:12px 20px;border-radius:999px;font-weight:700;text-decoration:none">Reply on WhatsApp</a></td></tr>
<tr><td><table role="presentation" width="100%" style="border-collapse:collapse;background:#19191c;border-radius:12px">
${rows
  .filter(([, v]) => v)
  .map(
    ([k, v]) =>
      `<tr><td style="padding:10px 14px;border-bottom:1px solid #2e2e33;color:#b4afa4;font-size:14px;width:170px;vertical-align:top">${esc(k)}</td><td style="padding:10px 14px;border-bottom:1px solid #2e2e33;font-size:15px;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("")}
</table></td></tr></table></body></html>`;
  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")
    .concat(`\n\nReply on WhatsApp: https://wa.me/${digits}`);
  return { subject, html, text };
}

/** Auto-reply to the client (docs/04 §12), verbatim copy. */
export function clientEmail(b: Booking, opts: { siteUrl: string; domain: string; workLive: boolean }) {
  const fn = firstName(b.name);
  const phone = `${b.phoneCode} ${b.phone}`;
  const responseTime = resolvePlain("{{RESPONSE_TIME}}") || "one business day";
  const subject = `We've got your request, ${fn}`;
  const preview = "Here's what happens next.";
  const workLine = opts.workLive
    ? `<p style="margin:0 0 24px">Want to see what we build? <a href="${opts.siteUrl}/work" style="color:#d4af37">${esc(opts.domain)}/work</a></p>
       <p style="margin:0 0 28px"><a href="${opts.siteUrl}/work" style="display:inline-block;background:#d4af37;color:#0f0f10;padding:14px 26px;border-radius:999px;font-weight:700;text-decoration:none">See our work</a></p>`
    : "";
  const html = `<!doctype html><html><head><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"></head>
<body style="margin:0;background:#0f0f10;font-family:${FONT};color:#f5f1e8">
<div style="display:none;max-height:0;overflow:hidden">${preview}</div>
<table role="presentation" width="100%" style="background:#0f0f10"><tr><td align="center" style="padding:32px 20px">
<table role="presentation" width="100%" style="max-width:560px;font-size:16px;line-height:1.6">
<tr><td style="padding:0 0 32px"><img src="${opts.siteUrl}/brand/png/pdn-logo-horizontal-gold.png" width="180" alt="Pishon Digital Network" style="display:block;height:auto;border:0"></td></tr>
<tr><td>
<p style="margin:0 0 16px">Hi ${esc(fn)},</p>
<p style="margin:0 0 24px">Thank you for booking a free call with Pishon Digital Network. Your request is in, and someone from our team will reach out within ${esc(responseTime)}.</p>
<p style="margin:0 0 8px;font-weight:700">Here's what happens next</p>
<ol style="margin:0 0 24px;padding-left:20px">
<li style="margin-bottom:6px">We review what you've shared, so the call is useful from the first minute.</li>
<li style="margin-bottom:6px">We call or WhatsApp you on ${esc(phone)}.</li>
<li>You get honest advice, a clear plan and a quote. No obligation.</li>
</ol>
<p style="margin:0 0 24px"><strong>To make the call even better</strong>, have your logo and a few photos of your work or products handy, if you have them.</p>
${workLine}
<p style="margin:0 0 4px">Talk soon,</p>
<p style="margin:0 0 32px">The PDN team</p>
<p style="margin:0;padding-top:20px;border-top:1px solid #2e2e33;color:#b4afa4;font-size:14px">Pishon Digital Network · Because the future belongs to businesses built for it.</p>
</td></tr></table></td></tr></table></body></html>`;
  const text = [
    `Hi ${fn},`,
    "",
    `Thank you for booking a free call with Pishon Digital Network. Your request is in, and someone from our team will reach out within ${responseTime}.`,
    "",
    "Here's what happens next",
    "1. We review what you've shared, so the call is useful from the first minute.",
    `2. We call or WhatsApp you on ${phone}.`,
    "3. You get honest advice, a clear plan and a quote. No obligation.",
    "",
    "To make the call even better, have your logo and a few photos of your work or products handy, if you have them.",
    "",
    ...(opts.workLive ? [`Want to see what we build? ${opts.domain}/work`, ""] : []),
    "Talk soon,",
    "The PDN team",
    "",
    "Pishon Digital Network · Because the future belongs to businesses built for it.",
  ].join("\n");
  return { subject, html, text };
}
