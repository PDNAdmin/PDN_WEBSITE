"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { FORM as FormCopy } from "@/content/copy";
import { COUNTRIES, detectCountry } from "@/lib/countries";
import { setCurrency, useCurrency } from "@/lib/currency";
import { useBusinessNameRaw } from "@/lib/business-name";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { ArrowRight, IconCheck } from "@/components/ui/icons";

type F = typeof FormCopy;
type Errors = Partial<Record<"name" | "email" | "phone" | "audience" | "need", string>>;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"];
const PKG = new Set(["starter", "business", "premium"]);
const noopSubscribe = () => () => {};

function stripArrow(s: string) {
  return s.endsWith(" →") ? s.slice(0, -2) : s;
}

/**
 * BookingForm (docs/03 §11). Real inputs (chips are radios/checkboxes) so it also posts without JS.
 * Mobile (< 768px): 2 steps with a gold progress bar. Pre-selection from any link carrying
 * data-audience / data-service / data-package. UTM params captured on landing (sessionStorage).
 */
export function BookingForm({
  copy,
  serverError,
  pricingCurrencyLabels,
}: {
  copy: F;
  serverError: string;
  pricingCurrencyLabels: { ngn: string; usd: string; aria: string };
}) {
  const router = useRouter();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(0);
  const currency = useCurrency();
  const typedBusiness = useBusinessNameRaw();

  // carry the business name typed in the hero into the form (until the visitor edits the field)
  useEffect(() => {
    const el = formRef.current?.elements.namedItem("business") as HTMLInputElement | null;
    if (el && (el.value === "" || el.dataset.auto === "1")) {
      el.value = typedBusiness;
      el.dataset.auto = "1";
    }
  }, [typedBusiness]);

  const detectedCountry = useSyncExternalStore(noopSubscribe, detectCountry, () => "NG");
  const [chosenCountry, setCountry] = useState<string | null>(null);
  const country = chosenCountry ?? detectedCountry;
  const [audience, setAudience] = useState("");
  const [need, setNeed] = useState<string[]>([]);
  const [budgetChoice, setBudget] = useState("");
  const [pkg, setPkg] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [twoStep, setTwoStep] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [formError, setFormError] = useState("");

  // mount: timezone defaults, UTM capture, 2-step on mobile
  useEffect(() => {
    started.current = Date.now();
    try {
      const params = new URLSearchParams(window.location.search);
      const saved = JSON.parse(sessionStorage.getItem("pdn-utm") || "{}") as Record<string, string>;
      let changed = false;
      for (const k of UTM_KEYS) {
        const v = params.get(k);
        if (v && !saved[k]) {
          saved[k] = v.slice(0, 300);
          changed = true;
        }
      }
      if (!saved.landing) {
        saved.landing = window.location.pathname + window.location.search;
        if (document.referrer) saved.referrer = document.referrer.slice(0, 300);
        changed = true;
      }
      if (changed) sessionStorage.setItem("pdn-utm", JSON.stringify(saved));
    } catch {}
    const mq = matchMedia("(max-width: 767px)");
    const apply = () => setTwoStep(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // budget chips depend on currency: a selection from the other currency's bands doesn't count
  const budgets = currency === "usd" ? copy.budget.usd : copy.budget.ngn;
  const budget = (budgets as readonly string[]).includes(budgetChoice) ? budgetChoice : "";

  // pre-selection from CTAs anywhere on the page
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-audience],[data-service],[data-package]");
      if (!el) return;
      const a = el.dataset.audience;
      const s = el.dataset.service;
      const p = el.dataset.package;
      if (a && (copy.audience.options as readonly string[]).includes(a)) {
        setAudience(a);
        if (a === "Client outside Nigeria") setCurrency("usd", false);
      }
      if (s && (copy.need.options as readonly string[]).includes(s)) setNeed((n) => (n.includes(s) ? n : [...n, s]));
      if (p && PKG.has(p)) setPkg(p);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [copy]);

  const val = (n: string) => (formRef.current?.elements.namedItem(n) as HTMLInputElement | null)?.value?.trim() ?? "";

  function validate(which: 1 | 2 | "all"): Errors {
    const e: Errors = {};
    if (which === 1 || which === "all") {
      if (!val("name")) e.name = copy.name.error;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("email"))) e.email = copy.email.error;
      const digits = val("phone").replace(/\D/g, "").replace(/^0+/, "");
      if (digits.length < 6 || digits.length > 14) e.phone = copy.phone.error;
    }
    if (which === 2 || which === "all") {
      if (!audience) e.audience = copy.audience.error;
      if (need.length === 0) e.need = copy.need.error;
    }
    return e;
  }

  function focusFirst(e: Errors) {
    const first = (["name", "email", "phone", "audience", "need"] as const).find((k) => e[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] textarea`);
    el?.focus();
  }

  function next() {
    const e = validate(1);
    setErrors(e);
    if (Object.keys(e).length) return focusFirst(e);
    setStep(2);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      formRef.current?.querySelector<HTMLElement>('[data-field="audience"] input')?.focus({ preventScroll: true });
    });
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (twoStep && step === 1) return next();
    const e = validate("all");
    setErrors(e);
    if (Object.keys(e).length) {
      if (twoStep && (e.name || e.email || e.phone)) setStep(1);
      requestAnimationFrame(() => focusFirst(e));
      return;
    }
    setStatus("sending");
    setFormError("");
    let utm: Record<string, string> = {};
    try {
      utm = JSON.parse(sessionStorage.getItem("pdn-utm") || "{}");
    } catch {}
    const code = COUNTRIES.find((c) => c.iso === country)?.code ?? "+234";
    const { referrer, landing, ...utmOnly } = utm;
    const body = {
      name: val("name"),
      business: val("business"),
      email: val("email"),
      phoneCode: code,
      phone: val("phone"),
      audience,
      need,
      currency,
      budget,
      timeline: (formRef.current?.querySelector<HTMLInputElement>('input[name="timeline"]:checked')?.value) ?? "",
      message: val("message"),
      source: (formRef.current?.querySelector<HTMLInputElement>('input[name="source"]:checked')?.value) ?? "",
      package: pkg,
      utm: { ...utmOnly, ...(landing ? { landing } : {}) },
      page: window.location.href,
      referrer: referrer ?? "",
      elapsed: Date.now() - started.current,
      company_website: val("company_website"),
    };
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Errors };
      if (res.ok && data.ok) {
        const first = body.name.split(/\s+/)[0] ?? "";
        router.push(`/thank-you${first ? `?name=${encodeURIComponent(first)}` : ""}`);
        return;
      }
      setStatus("error");
      if (data.error === "too_fast") setFormError(copy.tooFast);
      else if (data.fields && Object.keys(data.fields).length) {
        setErrors(data.fields);
        if (twoStep && (data.fields.name || data.fields.email || data.fields.phone)) setStep(1);
      } else setFormError(serverError);
    } catch {
      setStatus("error");
      setFormError(serverError);
    }
  }

  const showStep1 = !twoStep || step === 1;
  const showStep2 = !twoStep || step === 2;

  return (
    <form
      ref={formRef}
      action="/api/book"
      method="post"
      noValidate
      onSubmit={onSubmit}
      className="scroll-mt-[calc(var(--header-h)+16px)]"
      aria-describedby={formError ? `${uid}-formerr` : undefined}
    >
      {twoStep ? (
        <div className="mb-8">
          <div className="flex items-center justify-between text-small text-[var(--grey)]">
            <span aria-live="polite">{step === 1 ? copy.steps.one : copy.steps.two}</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden bg-[var(--tone)]" aria-hidden="true">
            <div
              className="h-full bg-gold transition-[width] duration-500 ease-(--ease-out-expo)"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>
      ) : null}

      {/* honeypot (off-screen spam trap, not a divider) taste-skill-ignore */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden" /* taste-skill-ignore: off-screen honeypot */>
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="package" value={pkg} />
      <input type="hidden" name="currency" value={currency} />

      <div className={`space-y-6 ${showStep1 ? "" : "hidden"}`}>
        <Field id={`${uid}-name`} name="name" label={copy.name.label} error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.name.placeholder}
            className="input"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          />
        </Field>
        <Field id={`${uid}-business`} name="business" label={copy.business.label}>
          <input
            id={`${uid}-business`}
            name="business"
            type="text"
            autoComplete="organization"
            onInput={(e) => (e.currentTarget.dataset.auto = "0")}
            placeholder={copy.business.placeholder}
            className="input"
          />
        </Field>
        <Field id={`${uid}-email`} name="email" label={copy.email.label} error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={copy.email.placeholder}
            className="input"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
          />
        </Field>
        <Field id={`${uid}-phone`} name="phone" label={copy.phone.label} error={errors.phone} help={copy.phone.help}>
          <div className="flex gap-2">
            <select
              aria-label="Country code"
              name="phoneCode"
              value={COUNTRIES.find((c) => c.iso === country)?.code ? country : "NG"}
              onChange={(e) => setCountry(e.target.value)}
              className="input !w-[7.5rem] shrink-0"
              autoComplete="tel-country-code"
            >
              {COUNTRIES.map((c) => (
                <option key={c.iso} value={c.iso}>
                  {c.iso} {c.code}
                </option>
              ))}
            </select>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={copy.phone.placeholder}
              className="input"
              required
              aria-invalid={!!errors.phone}
              aria-describedby={`${uid}-phone-help${errors.phone ? ` ${uid}-phone-err` : ""}`}
            />
          </div>
        </Field>
      </div>

      <div className={`space-y-8 ${showStep2 ? "" : "hidden"} ${twoStep ? "" : "mt-8"}`}>
        <ChipGroup
          legend={copy.audience.label}
          name="audience"
          type="radio"
          options={copy.audience.options}
          value={audience ? [audience] : []}
          onChange={(v) => {
            setAudience(v);
            if (v === "Client outside Nigeria") setCurrency("usd", false);
          }}
          error={errors.audience}
          uid={uid}
          required
        />
        <ChipGroup
          legend={copy.need.label}
          name="need"
          type="checkbox"
          options={copy.need.options}
          value={need}
          onChange={(v) => setNeed((n) => (n.includes(v) ? n.filter((x) => x !== v) : [...n, v]))}
          error={errors.need}
          uid={uid}
          required
        />
        <ChipGroup
          legend={copy.budget.label}
          name="budget"
          type="radio"
          options={budgets}
          value={budget ? [budget] : []}
          onChange={setBudget}
          help={copy.budget.help}
          uid={uid}
          aside={<CurrencyToggle labels={pricingCurrencyLabels} aria={pricingCurrencyLabels.aria} size="sm" />}
        />
        <ChipGroup legend={copy.timeline.label} name="timeline" type="radio" options={copy.timeline.options} uid={uid} />
        <Field id={`${uid}-message`} name="message" label={copy.message.label} help={copy.message.help}>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            placeholder={copy.message.placeholder}
            className="input"
            aria-describedby={`${uid}-message-help`}
          />
        </Field>
        <ChipGroup legend={copy.source.label} name="source" type="radio" options={copy.source.options} uid={uid} />
      </div>

      {formError ? (
        <p id={`${uid}-formerr`} role="alert" className="mt-8 bg-[#fff1ec] px-4 py-3 text-error">
          {formError}
        </p>
      ) : null}

      <div className="mt-8">
        {twoStep && step === 1 ? (
          <button type="button" onClick={next} className="btn btn-primary w-full">
            <span>{stripArrow(copy.continue)}</span>
            <span className="btn-arrow-box" aria-hidden="true"><ArrowRight size={20} /></span>
          </button>
        ) : (
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            {twoStep ? (
              <button type="button" onClick={() => setStep(1)} className="btn btn-quiet btn-noarrow sm:w-auto">
                {copy.back}
              </button>
            ) : null}
            <button
              type="submit"
              className="btn btn-primary flex-1"
              aria-disabled={status === "sending"}
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <Spinner />
                  <span>{copy.submitting}</span>
                </>
              ) : (
                <>
                  <span>{stripArrow(copy.submit)}</span>
                  <span className="btn-arrow-box" aria-hidden="true"><ArrowRight size={20} /></span>
                </>
              )}
            </button>
          </div>
        )}
        <p className="mt-4 text-center text-small text-[var(--grey)]">{copy.underSubmit}</p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  help,
  children,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  help?: string;
  children: ReactNode;
}) {
  return (
    <div data-field={name}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {help && !error ? (
        <p id={`${id}-help`} className="field-help">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ChipGroup({
  legend,
  name,
  type,
  options,
  value,
  onChange,
  error,
  help,
  uid,
  required,
  aside,
}: {
  legend: string;
  name: string;
  type: "radio" | "checkbox";
  options: readonly string[];
  value?: string[];
  onChange?: (v: string) => void;
  error?: string;
  help?: string;
  uid: string;
  required?: boolean;
  aside?: ReactNode;
}) {
  const controlled = value !== undefined && onChange !== undefined;
  const errId = `${uid}-${name}-err`;
  const helpId = `${uid}-${name}-help`;
  return (
    <fieldset
      data-field={name}
      aria-invalid={error ? true : undefined}
      aria-describedby={[error ? errId : "", help ? helpId : ""].filter(Boolean).join(" ") || undefined}
      aria-required={required || undefined}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <legend className="field-label !mb-0 float-left">{legend}</legend>
        {aside}
      </div>
      <div className="clear-both flex flex-wrap gap-2">
        {options.map((o, i) => {
          const id = `${uid}-${name}-${i}`;
          return (
            <span key={o} className="relative">
              <input
                id={id}
                type={type}
                name={name}
                value={o}
                className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
                {...(controlled
                  ? { checked: value!.includes(o), onChange: () => onChange!(o) }
                  : {})}
              />
              <label htmlFor={id} className="chip">
                {type === "checkbox" && controlled && value!.includes(o) ? (
                  <IconCheck size={16} strokeWidth={2.25} className="-ml-1 mr-1.5" />
                ) : null}
                {o}
              </label>
            </span>
          );
        })}
      </div>
      {help ? (
        <p id={helpId} className="field-help">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={errId} className="field-error">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/** Submit loader: the River loop spinning */
function Spinner() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" className="animate-spin">
      <path
        d="M12 3a9 9 0 1 0 9 9c0-2.5-1.8-3.6-3-2.6-1.1.9-.3 2.6 1 2.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
