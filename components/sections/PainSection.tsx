import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { rich } from "@/components/ui/Rich";
import { RIVER_D, RIVER_STROKE, RIVER_VIEWBOX } from "@/lib/river-path.generated";

/**
 * HOME.PAIN. Koto: the heading holds still on the left while the customers' own words
 * scroll past on the right, each set as a statement. Then Wildish & Co: one full field of gold
 * carrying the bridge line, with the PDN mark cropped by the edge.
 */
export function PainSection() {
  const c = HOME.pain;
  return (
    <>
      <section aria-labelledby="pain-title" className="field-white section-y !pt-[clamp(48px,6vw,96px)]">
        <div className="wrap">
          <SectionHead id="pain-title" eyebrow={c.eyebrow} headline={c.headline} />
          <ul className="mt-14 grid gap-3 md:grid-cols-2 lg:ml-[calc(25%+0.5rem)] lg:mt-20">
            {c.cards.map((card, i) => (
              <li key={card.who} data-reveal style={{ "--i": i % 2 } as React.CSSProperties} className="bg-[var(--tone)] p-7 sm:p-10">
                <blockquote>
                  <p className="text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.015em]">{card.quote}</p>
                </blockquote>
                <p className="mt-6 text-[var(--grey)]">{card.who}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label={c.eyebrow} className="field-gold relative overflow-hidden">
        <svg
          aria-hidden="true"
          viewBox={RIVER_VIEWBOX}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-auto -translate-x-[8%] -translate-y-1/2"
          fill="none"
        >
          {/* the mark (not the logo) as a solid tone of the gold field: no transparency */}
          <path d={RIVER_D} stroke="#c9a52f" strokeWidth={RIVER_STROKE} />
        </svg>
        <div className="wrap relative grid min-h-[56svh] content-center justify-items-center gap-10 py-[clamp(96px,12vw,180px)] text-center">
          <p data-reveal className="max-w-[32ch] text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
            {rich(c.bridge)}
          </p>
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <Button href="#book" variant="ink">
              {c.textCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
