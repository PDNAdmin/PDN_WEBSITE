import { z } from "zod";
import { FORM } from "@/content/copy";

const AUDIENCE = FORM.audience.options;
const NEED = FORM.need.options;
const BUDGETS = [...FORM.budget.ngn, ...FORM.budget.usd] as string[];
const TIMELINE = FORM.timeline.options;
const SOURCE = FORM.source.options;

const opt = (s: z.ZodString) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), s.optional());

export const bookingSchema = z.object({
  name: z.string().trim().min(1, FORM.name.error).max(120),
  business: opt(z.string().trim().max(160)),
  email: z.string().trim().email(FORM.email.error).max(200),
  phoneCode: z.string().regex(/^\+\d{1,4}$/, FORM.phone.error),
  phone: z
    .string()
    .transform((s) => s.replace(/[^\d]/g, "").replace(/^0+/, ""))
    .pipe(z.string().min(6, FORM.phone.error).max(14, FORM.phone.error)),
  audience: z.enum(AUDIENCE).optional().catch(undefined),
  need: z.array(z.enum(NEED)).min(1, FORM.need.error),
  currency: z.enum(["ngn", "usd"]).default("ngn"),
  budget: opt(z.string()).refine((v) => v === undefined || BUDGETS.includes(v), "Invalid budget"),
  timeline: z.enum(TIMELINE).optional().catch(undefined),
  message: opt(z.string().trim().max(4000)),
  source: z.enum(SOURCE).optional().catch(undefined),
  package: z.enum(["starter", "business", "premium"]).optional().catch(undefined),
  utm: z.record(z.string(), z.string().max(300)).optional().default({}),
  page: opt(z.string().max(500)),
  referrer: opt(z.string().max(500)),
  /** ms the visitor spent on the form (time-trap) */
  elapsed: z.coerce.number().int().nonnegative().default(0),
  /** honeypot: must stay empty */
  company_website: z.string().optional().default(""),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type Booking = z.output<typeof bookingSchema>;
