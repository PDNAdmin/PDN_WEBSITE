import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { Copy } from "@/components/ui/Rich";
import { shouldRender } from "@/lib/tokens";
import { PriceSwitch } from "./PriceSwitch";

/** HOME.PRICING. Finsweet: flat tone cards, the featured one in black; square gold arrow actions. */
export function Pricing() {
  const c = HOME.pricing;
  return (
    <section aria-labelledby="pricing-title" className="field-white section-y">
      <div className="wrap">
        <SectionHead id="pricing-title" eyebrow={c.eyebrow} headline={c.headline} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <p data-reveal className="max-w-[48ch] text-[1.25rem] leading-[1.5] lg:col-span-6 lg:col-start-4">
            {c.lead}
          </p>
          <div data-reveal className="lg:col-span-3 lg:justify-self-end">
            <CurrencyToggle labels={c.toggle} aria={c.toggle.aria} />
          </div>
        </div>

        <ul className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-3">
          {c.plans.map((p, i) => {
            const showPrice = shouldRender(p.ngn) || shouldRender(p.usd);
            return (
              <li
                key={p.id}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className={`flex flex-col p-7 sm:p-10 ${p.featured ? "field-black" : "bg-[var(--tone)]"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[clamp(2rem,1.4rem+1.6vw,3rem)] leading-none tracking-[-0.04em]">{p.name}</h3>
                  {"badge" in p && p.badge ? (
                    <span className="bg-[#d4af37] px-2.5 py-1 text-small font-semibold text-[#0a0a0a]">{p.badge}</span>
                  ) : null}
                </div>
                <p className="mt-4 text-[var(--grey)]">{p.for}</p>
                {showPrice ? (
                  <div className="mt-8">
                    <p className="text-small text-[var(--grey)]">{c.from}</p>
                    <p className="font-display mt-1 text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] leading-none tracking-[-0.04em] tabular">
                      <PriceSwitch ngn={<Copy s={p.ngn} />} usd={<Copy s={p.usd} />} />
                    </p>
                  </div>
                ) : null}
                <ul className="mt-8 space-y-3">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <IconCheck size={20} className="mt-[3px] shrink-0 text-[#b8962a]" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <Button href="#book" data-package={p.id} variant={p.featured ? "primary" : "ink"} className="w-full">
                    {p.button}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <p data-reveal className="mt-10 max-w-[44ch] text-statement font-semibold lg:mt-14">
          {c.footnote}
        </p>
      </div>
    </section>
  );
}
