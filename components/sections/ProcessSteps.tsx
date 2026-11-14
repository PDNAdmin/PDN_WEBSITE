import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Rich";

/**
 * HOME.PROCESS: three open columns read left to right (no cards). The numbers are joined by one
 * line, the first one gold because that's where the visitor starts.
 */
export function ProcessSteps() {
  const c = HOME.process;
  return (
    <section aria-labelledby="process-title" className="field-white section-y">
      <div className="wrap">
        <SectionHead id="process-title" eyebrow={c.eyebrow} headline={c.headline} />
        <ol className="relative mt-14 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          <span aria-hidden="true" className="absolute left-0 right-0 top-10 hidden h-[3px] bg-[#0a0a0a] lg:block" />
          {c.steps.map((s, i) => (
            <li key={s.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="relative">
              <span
                className={`relative grid h-20 w-20 place-items-center font-display text-[2.75rem] leading-none tabular ${
                  i === 0 ? "bg-[#d4af37] text-[#0a0a0a]" : "bg-[#0a0a0a] text-white"
                }`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="mt-8 text-[var(--grey)]">{`${c.stepLabel} ${i + 1}`}</p>
              <h3 className="mt-2 text-statement font-semibold">{s.title}</h3>
              <p className="mt-4 max-w-[40ch]">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16 flex flex-col gap-6 bg-[#0a0a0a] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:mt-20">
          <Copy s={c.note} as="p" className="text-statement font-semibold" />
          <Button href="#book" className="max-sm:w-full">
            {c.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
