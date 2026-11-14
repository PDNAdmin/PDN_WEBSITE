import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Rich";
import { ProcessMotion } from "./ProcessMotion";

/**
 * HOME.PROCESS. Humbleteam / Finsweet sideways run: on desktop the section pins and the three steps slide
 * past horizontally while a gold line draws across them. The sideways layout switches on only when that
 * scene runs (class .is-hscroll); otherwise (phones, low tier, reduced motion) it is a plain grid/list.
 */
export function ProcessSteps() {
  const c = HOME.process;
  return (
    <section id="process" aria-labelledby="process-title" className="field-white overflow-hidden">
      <div data-pin className="process-pin section-y">
        <div className="wrap">
          <SectionHead id="process-title" eyebrow={c.eyebrow} headline={c.headline} />
        </div>
        <div className="wrap relative mt-14 lg:mt-16">
          <span data-line aria-hidden="true" className="process-line absolute left-[var(--margin)] right-0 top-10 hidden h-[3px] origin-left bg-[#d4af37]" />
          <ol data-track className="process-track relative grid gap-12 lg:grid-cols-3 lg:gap-6">
            {c.steps.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="process-step">
                <span
                  className={`relative grid h-20 w-20 place-items-center font-display text-[2.75rem] leading-none tabular ${
                    i === 0 ? "bg-[#d4af37] text-[#0a0a0a]" : "bg-[#0a0a0a] text-white"
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="mt-8 lg:bg-[var(--tone)] lg:p-10">
                  <p className="text-[var(--grey)]">{`${c.stepLabel} ${i + 1}`}</p>
                  <h3 className="mt-2 font-display text-[clamp(1.75rem,1.2rem+1.6vw,3rem)] leading-none tracking-[-0.04em]">{s.title}</h3>
                  <p className="mt-5 max-w-[42ch] text-[1.125rem]">{s.body}</p>
                </div>
              </li>
            ))}
            <li className="process-cta hidden">
              <div className="w-full bg-[#0a0a0a] p-10 text-white">
                <Copy s={c.note} as="p" className="text-statement font-semibold" />
                <div className="mt-8">
                  <Button href="#book">{c.button}</Button>
                </div>
              </div>
            </li>
          </ol>
          <div className="process-note mt-12 flex flex-col gap-6 bg-[#0a0a0a] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <Copy s={c.note} as="p" className="text-statement font-semibold" />
            <Button href="#book" className="max-sm:w-full">
              {c.button}
            </Button>
          </div>
        </div>
      </div>
      <ProcessMotion />
    </section>
  );
}
