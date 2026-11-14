import type { Metadata } from "next";
import { CONTACT, FORM, HOME, META } from "@/content/copy";
import { Copy, Tok, rich } from "@/components/ui/Rich";
import { Picture, hasAsset } from "@/components/ui/Picture";
import { IconCheck } from "@/components/ui/icons";
import { BookingForm } from "@/components/sections/BookingForm";
import { SHOW_TOKENS, isFilled, resolvePlain, shouldRender } from "@/lib/tokens";

export const metadata: Metadata = {
  title: { absolute: META.contact.title },
  description: META.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: META.contact.title, description: META.contact.description, url: "/contact" },
};

/**
 * /contact: the ad landing page (Meta ads link here). One job: the form.
 * Phone order: the promise in two lines, then step 1 of the form at once; reassurance follows below.
 * Desktop: reassurance on the left, the form card on the right.
 */
export default function ContactPage() {
  const b = HOME.book;
  const serverError = isFilled("PHONE") ? resolvePlain(FORM.serverError) : SHOW_TOKENS ? FORM.serverError : FORM.serverErrorNoPhone;
  const showPhone = shouldRender(b.altPhone);
  const showEmail = shouldRender(b.altEmail);

  return (
    <main id="main" className="field-black">
      <div className="wrap grid gap-10 pb-[clamp(64px,8vw,120px)] pt-[calc(var(--header-h)+clamp(24px,4vw,64px))] lg:grid-cols-12 lg:gap-8">
        {/* the promise */}
        <div className="lg:col-span-5">
          <p className="kicker" /* taste-skill-ignore: copy eyebrow (docs/04) */>{CONTACT.eyebrow}</p>
          <h1 className="font-display mt-3 text-[clamp(2rem,1.1rem+3vw,4rem)] leading-[0.98] tracking-[-0.045em]">{rich(CONTACT.headline)}</h1>
          <Copy s={CONTACT.lead} as="p" className="mt-5 max-w-[44ch] text-[1.125rem] leading-[1.5] text-[#d8d8d4] lg:text-[1.25rem]" />
        </div>

        {/* the form: second on phones, right column on desktop */}
        <div id="book" className="scroll-mt-[calc(var(--header-h)+16px)] lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:col-start-6">
          <div className="field-white p-5 sm:p-10 lg:p-12">
            <h2 className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.75rem)] leading-none tracking-[-0.04em]">{b.cardTitle}</h2>
            <p className="mt-2 text-[var(--grey)]">{b.cardSubtitle}</p>
            <div className="mt-8">
              <BookingForm copy={FORM} serverError={serverError} pricingCurrencyLabels={HOME.pricing.toggle} />
            </div>
          </div>
        </div>

        {/* reassurance */}
        <div className="lg:col-span-5">
          <h2 className="text-[1.25rem] font-semibold">{b.nextTitle}</h2>
          <ol className="mt-5 space-y-2">
            {b.next.map((s, i) => (
              <li key={s} className="flex gap-4 bg-[var(--tone)] p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center bg-[#d4af37] font-semibold text-[#0a0a0a] tabular">{i + 1}</span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-small">
            {HOME.hero.ticks.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center bg-[#d4af37] text-[#0a0a0a]" aria-hidden="true">
                  <IconCheck size={14} strokeWidth={2.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          {hasAsset("HUM-08") ? (
            <Picture
              id="HUM-08"
              alt="A business owner in Lagos answering a phone call at her counter"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="mt-10 block"
              imgClassName="block aspect-[4/5] w-full object-cover"
              fallback={null}
            />
          ) : null}
          {showPhone || showEmail ? (
            <p className="mt-10 text-[#d8d8d4]">
              {b.altPrefix}{" "}
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
    </main>
  );
}
