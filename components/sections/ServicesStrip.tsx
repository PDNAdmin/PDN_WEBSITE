import { AI_DEMO, HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/icons";
import { AgentChat, BookingApp, CourseScreen, WebsiteMobile } from "@/components/ui/fragments";
import { ServicesPreview } from "./ServicesPreview";

/**
 * HOME.SERVICES. Koto's giant service lines; hovering one floats that service's real interface beside the
 * pointer (OFF+BRAND). Lines open the booking form with that need pre-selected until /services ships.
 */
export function ServicesStrip() {
  const c = HOME.services;
  const previews = [
    <WebsiteMobile key="w" />,
    <AgentChat key="a" label={AI_DEMO.label} messages={AI_DEMO.messages} />,
    <BookingApp key="p" />,
    <CourseScreen key="u" />,
  ];
  return (
    <section id="services" aria-labelledby="services-title" className="field-black section-y">
      <div className="wrap">
        <SectionHead id="services-title" eyebrow={c.eyebrow} headline={c.headline} />
        <ServicesPreview previews={previews}>
          <ul className="mt-14 lg:ml-[calc(25%+0.5rem)] lg:mt-20">
            {c.rows.map((r, i) => (
              <li key={r.n} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <a
                  href="#book"
                  data-service={r.need || undefined}
                  data-service-row={i}
                  className="group grid gap-3 py-7 transition-colors duration-200 sm:py-9 md:grid-cols-[3.5rem_1fr_auto] md:items-center md:gap-6"
                >
                  <span className="text-[var(--grey)] tabular">{r.n}</span>
                  <span>
                    <span className="font-display block text-[clamp(2.5rem,1.4rem+4.4vw,6.5rem)] leading-[0.9] tracking-[-0.05em] transition-colors duration-300 group-hover:text-[#d4af37]">
                      {r.title}
                    </span>
                    <span className="mt-3 block max-w-[44ch] text-[1.125rem] leading-[1.45] text-[#d8d8d4]">{r.line}</span>
                  </span>
                  <span className="flex items-center gap-3 font-semibold">
                    <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100">{c.hoverLabel}</span>
                    <span className="grid h-12 w-12 place-items-center bg-[#d4af37] text-[#0a0a0a] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={22} />
                    </span>
                  </span>
                </a>
                {/* phones: show the interface under each line */}
                <div aria-hidden="true" className="mx-auto mb-6 w-[48%] max-w-[210px] rounded-[2.5rem] bg-[#262626] p-1.5 md:hidden">
                  {previews[i]}
                </div>
              </li>
            ))}
          </ul>
        </ServicesPreview>
      </div>
    </section>
  );
}
