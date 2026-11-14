import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { rich } from "@/components/ui/Rich";
import { RIVER_D, RIVER_STROKE, RIVER_VIEWBOX } from "@/lib/river-path.generated";
import { PainMotion } from "./PainMotion";

/**
 * HOME.PAIN.
 * Wildish & Co's collage: the six things customers say, as a pile of mixed cards (tone, black, gold) that
 * starts scattered and tilted and snaps into a clean grid as you scroll in (desktop; phones get the grid).
 * Then Wildish's single gold field, where OFF+BRAND's manifesto move lights the words up as you read.
 */
const SKINS = ["bg-[var(--tone)]", "field-black", "bg-[var(--tone)]", "field-gold", "bg-[var(--tone)]", "field-black"];

export function PainSection() {
  const c = HOME.pain;
  return (
    <>
      <section id="pain" aria-labelledby="pain-title" className="field-white section-y overflow-hidden !pt-[clamp(48px,6vw,96px)]">
        <div className="wrap">
          <SectionHead id="pain-title" eyebrow={c.eyebrow} headline={c.headline} />
          <ul data-collage className="mt-14 grid gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {c.cards.map((card, i) => (
              <li key={card.who} data-card className={`flex min-h-[240px] flex-col justify-between p-7 sm:p-9 ${SKINS[i]}`}>
                <blockquote>
                  <p className="text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.015em]">{card.quote}</p>
                </blockquote>
                <p className="mt-8 text-[var(--grey)]">{card.who}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="fix" aria-label={c.eyebrow} className="field-gold relative overflow-hidden">
        <svg
          aria-hidden="true"
          viewBox={RIVER_VIEWBOX}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-auto -translate-x-[8%] -translate-y-1/2"
          fill="none"
        >
          {/* the mark (not the logo) as a solid tone of the gold field: no transparency */}
          <path d={RIVER_D} stroke="#c9a52f" strokeWidth={RIVER_STROKE} />
        </svg>
        <div className="wrap relative grid min-h-[70svh] content-center justify-items-center gap-10 py-[clamp(96px,12vw,180px)] text-center">
          <p data-manifesto className="max-w-[30ch] text-[clamp(1.75rem,1rem+2.4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            {rich(c.bridge)}
          </p>
          <Button href="#book" variant="ink">
            {c.textCta}
          </Button>
        </div>
      </section>
      <PainMotion />
    </>
  );
}
