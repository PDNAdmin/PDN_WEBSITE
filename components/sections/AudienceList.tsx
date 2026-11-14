import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { IconCheck, IconPlus } from "@/components/ui/icons";
import { Picture, hasAsset } from "@/components/ui/Picture";

/** Realistic scene photos (prompt/assets.md HUM-04..07). Illustrative only: never presented as clients. */
const PHOTOS = [
  { id: "HUM-04", alt: "A boutique owner in Lagos checking orders on her phone in her shop" },
  { id: "HUM-05", alt: "A professional at his desk in a Lagos office" },
  { id: "HUM-06", alt: "A small company team in Lagos reviewing their website together" },
  { id: "HUM-07", alt: "A Nigerian founder abroad on a video call from home" },
];

/**
 * HOME.AUDIENCE. Clay's large expandable rows: each audience is a big line you open.
 * Native exclusive <details>: keyboard and no-JS friendly. CTAs pre-select the audience in the form.
 */
export function AudienceList() {
  const c = HOME.audience;
  return (
    <section aria-labelledby="audience-title" className="field-white section-y">
      <div className="wrap">
        <SectionHead id="audience-title" eyebrow={c.eyebrow} headline={c.headline} />
        <div className="mt-14 space-y-2 lg:mt-20 lg:ml-[calc(25%+0.5rem)]">
          {c.tabs.map((t, i) => (
            <details key={t.id} name="audience" open={i === 0} data-reveal style={{ "--i": i } as React.CSSProperties} className="faq-item group bg-[var(--tone)]">
              <summary className="flex min-h-[88px] items-center justify-between gap-6 px-6 py-5 sm:px-10">
                <span className="font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-none tracking-[-0.04em]">{t.tab}</span>
                <span className="grid h-11 w-11 shrink-0 place-items-center bg-[var(--ground)] transition-colors group-open:bg-[#d4af37]">
                  <IconPlus size={22} className="faq-icon" />
                </span>
              </summary>
              {hasAsset(PHOTOS[i]!.id) ? (
                <div className="px-6 pb-8 sm:px-10">
                  <Picture
                    id={PHOTOS[i]!.id}
                    alt={PHOTOS[i]!.alt}
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="block"
                    imgClassName="block aspect-[16/9] w-full object-cover"
                    fallback={null}
                  />
                </div>
              ) : null}
              <div className="grid gap-8 px-6 pb-10 sm:px-10 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h3 className="text-statement font-semibold">{t.title}</h3>
                  <p className="mt-4 max-w-[46ch]">{t.body}</p>
                </div>
                <div className="flex flex-col justify-between gap-8">
                  <ul className="space-y-3">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center bg-[#0a0a0a] text-[#d4af37]" aria-hidden="true">
                          <IconCheck size={14} strokeWidth={2.5} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <Button href="#book" data-audience={t.audience} className="max-sm:w-full">
                      {t.button}
                    </Button>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
