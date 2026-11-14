import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/icons";
import { Copy } from "@/components/ui/Rich";
import { isFilled } from "@/lib/tokens";

/** HOME.GUARANTEE: a black field; each promise is a full-width statement row, not a card. */
export function PromiseBand() {
  const c = HOME.guarantee;
  return (
    <section aria-labelledby="promise-title" className="field-black section-y">
      <div className="wrap">
        <SectionHead id="promise-title" eyebrow={c.eyebrow} headline={c.headline} />
        <ul className="mt-14 space-y-2 lg:ml-[calc(25%+0.5rem)] lg:mt-20">
          {c.promises.map((p, i) => (
            <li key={p.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="grid gap-5 bg-[var(--tone)] p-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-10 lg:grid-cols-[auto_1.1fr_1fr] lg:items-center">
              <span className="grid h-14 w-14 place-items-center bg-[#d4af37] text-[#0a0a0a]" aria-hidden="true">
                <Icon name={p.icon as IconName} size={26} />
              </span>
              <h3 className="text-statement font-semibold">{p.title}</h3>
              <p className="text-[#d8d8d4] sm:col-start-2 lg:col-start-auto">{p.line}</p>
            </li>
          ))}
        </ul>
        {isFilled("GUARANTEE") ? <Copy s={c.guaranteeLine} as="p" className="mt-10 text-statement font-semibold lg:ml-[calc(25%+0.5rem)]" /> : null}
      </div>
    </section>
  );
}
