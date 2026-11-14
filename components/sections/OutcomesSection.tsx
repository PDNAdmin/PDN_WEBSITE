import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { LockScreen, MapsCard, WebsiteDesktop } from "@/components/ui/fragments";

/**
 * HOME.SHIFT. Humbleteam's full-height case panels: one outcome per screen, the words on one side,
 * the real thing PDN builds on the other, large.
 */
export function OutcomesSection() {
  const c = HOME.shift;
  const visuals = [
    <div key="t" className="w-full max-w-[640px]">
      <WebsiteDesktop />
    </div>,
    <div key="f" className="w-full max-w-[520px]">
      <MapsCard />
    </div>,
    <div key="p" className="w-[58%] max-w-[290px]">
      <LockScreen />
    </div>,
  ];
  return (
    <section aria-labelledby="shift-title" className="field-black section-y">
      <div className="wrap">
        <SectionHead id="shift-title" eyebrow={c.eyebrow} headline={c.headline} />
      </div>
      <div className="wrap mt-16 space-y-3 lg:mt-24">
        {c.items.map((item, i) => (
          <article
            key={item.n}
            aria-labelledby={`outcome-${item.n}`}
            className="grid min-h-[min(84svh,820px)] bg-[var(--tone)] lg:grid-cols-2"
          >
            <div className={`self-center p-7 sm:p-10 lg:p-16 ${i % 2 ? "lg:order-2" : ""}`}>
              <p data-reveal className="text-[var(--grey)] tabular">
                {item.n} · {item.label}
              </p>
              <h3
                id={`outcome-${item.n}`}
                data-reveal
                style={{ "--i": 1 } as React.CSSProperties}
                className="font-display mt-5 sm:max-w-[20ch] text-[clamp(1.625rem,1.1rem+2.1vw,3.25rem)] leading-[1] tracking-[-0.04em]"
              >
                {item.title}
              </h3>
              <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="mt-6 max-w-[44ch] text-[1.25rem] leading-[1.5]">
                {item.body}
              </p>
            </div>
            <div
              data-reveal
              className={`grid min-h-[380px] place-items-center bg-[var(--tone-2)] px-6 py-12 sm:px-12 lg:py-16 ${i % 2 ? "lg:order-1" : ""}`}
            >
              {visuals[i]}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
