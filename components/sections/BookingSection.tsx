import { FORM, HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Copy, Tok } from "@/components/ui/Rich";
import { SHOW_TOKENS, isFilled, shouldRender, resolvePlain } from "@/lib/tokens";
import { BookingForm } from "./BookingForm";

/** HOME.BOOK (#book). Humbleteam's "Let's talk": the promise on a black field, the form on a white card. */
export function BookingSection() {
  const c = HOME.book;
  const serverError = isFilled("PHONE")
    ? resolvePlain(FORM.serverError)
    : SHOW_TOKENS
      ? FORM.serverError
      : FORM.serverErrorNoPhone;
  const showPhone = shouldRender(c.altPhone);
  const showEmail = shouldRender(c.altEmail);

  return (
    <section id="book" aria-labelledby="book-title" className="field-black section-y">
      <div className="wrap">
        <SectionHead id="book-title" eyebrow={c.eyebrow} headline={c.headline} />
      </div>
      <div className="wrap mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
            <Copy s={c.lead} as="p" className="max-w-[44ch] text-[1.25rem] leading-[1.5]" />

            <h3 className="mt-12 text-[1.25rem] font-semibold">{c.nextTitle}</h3>
            <ol className="mt-5 space-y-2">
              {c.next.map((s, i) => (
                <li key={s} className="flex gap-4 bg-[var(--tone)] p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center bg-[#d4af37] font-semibold text-[#0a0a0a] tabular">{i + 1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>

            {showPhone || showEmail ? (
              <p className="mt-10 text-[#d8d8d4]">
                {c.altPrefix}{" "}
                {showPhone ? (
                  <>
                    Call or WhatsApp{" "}
                    {isFilled("PHONE") ? (
                      <a className="link text-white" href={`tel:${resolvePlain("{{PHONE}}").replace(/[^\d+]/g, "")}`}>
                        <Tok name="PHONE" />
                      </a>
                    ) : (
                      <Tok name="PHONE" />
                    )}
                  </>
                ) : null}
                {showPhone && showEmail ? <span className="px-2">·</span> : null}
                {showEmail ? (
                  <>
                    Email{" "}
                    {isFilled("EMAIL_PUBLIC") ? (
                      <a className="link text-white" href={`mailto:${resolvePlain("{{EMAIL_PUBLIC}}")}`}>
                        <Tok name="EMAIL_PUBLIC" />
                      </a>
                    ) : (
                      <Tok name="EMAIL_PUBLIC" />
                    )}
                  </>
                ) : null}
              </p>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="field-white p-6 sm:p-10 lg:p-12">
            <h3 className="font-display text-[clamp(2rem,1.4rem+1.6vw,3rem)] leading-none tracking-[-0.04em]">{c.cardTitle}</h3>
            <p className="mt-3 text-[var(--grey)]">{c.cardSubtitle}</p>
            <div className="mt-10">
              <BookingForm copy={FORM} serverError={serverError} pricingCurrencyLabels={HOME.pricing.toggle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
