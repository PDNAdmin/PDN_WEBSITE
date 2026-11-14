import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { IconPlus } from "@/components/ui/icons";
import { Copy } from "@/components/ui/Rich";

/** HOME.FAQ: heading held on the left, questions as tone rows on the right (native exclusive accordion). */
export function FAQ() {
  const c = HOME.faq;
  return (
    <section aria-labelledby="faq-title" className="field-white section-y">
      <div className="wrap">
        <SectionHead id="faq-title" eyebrow={c.eyebrow} headline={c.headline} />
        <div className="mt-14 space-y-2 lg:ml-[calc(25%+0.5rem)] lg:mt-20">
          {c.items.map((item, i) => (
            <details key={item.q} name="faq" data-reveal style={{ "--i": Math.min(i, 3) } as React.CSSProperties} className="faq-item group bg-[var(--tone)]">
              <summary className="flex min-h-[80px] items-center justify-between gap-6 px-6 py-5 sm:px-8">
                <h3 className="text-[1.25rem] font-semibold leading-snug">{item.q}</h3>
                <span className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--ground)] transition-colors group-open:bg-[#d4af37]">
                  <IconPlus size={20} className="faq-icon" />
                </span>
              </summary>
              <p className="max-w-[60ch] px-6 pb-8 sm:px-8">
                {item.a.map((sentence, si) => (
                  <Copy key={si} s={si < item.a.length - 1 ? `${sentence} ` : sentence} />
                ))}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
