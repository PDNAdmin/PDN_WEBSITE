import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/icons";

/**
 * HOME.SERVICES. Koto: the label holds on the left; the services run as giant lines on the right.
 * Phase 1: /services isn't built, so each line opens the booking form with that need pre-selected.
 */
export function ServicesStrip() {
  const c = HOME.services;
  return (
    <section id="services" aria-labelledby="services-title" className="field-black section-y">
      <div className="wrap">
        <SectionHead id="services-title" eyebrow={c.eyebrow} headline={c.headline} />
        <ul className="mt-14 space-y-2 lg:ml-[calc(25%+0.5rem)] lg:mt-20">
          {c.rows.map((r, i) => (
            <li key={r.n} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <a
                href="#book"
                data-service={r.need || undefined}
                className="group grid gap-4 bg-[var(--tone)] p-6 transition-colors duration-200 hover:bg-[var(--tone-2)] sm:p-10 md:grid-cols-[1fr_auto] md:items-end"
              >
                <span>
                  <span className="block text-[var(--grey)] tabular">{r.n}</span>
                  <span className="font-display mt-3 block text-[clamp(2.5rem,1.4rem+4.4vw,6rem)] leading-[0.9] tracking-[-0.05em]">
                    {r.title}
                  </span>
                  <span className="mt-5 block max-w-[40ch] text-[1.25rem] leading-[1.45] text-[#d8d8d4]">{r.line}</span>
                </span>
                <span className="flex items-center gap-3 font-semibold">
                  {c.hoverLabel}
                  <span className="grid h-12 w-12 place-items-center bg-[#d4af37] text-[#0a0a0a] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={22} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
