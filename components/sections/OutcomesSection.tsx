import { HOME } from "@/content/copy";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Picture, hasAsset } from "@/components/ui/Picture";
import { LockScreen, MapsCard, WebsiteDesktop } from "@/components/ui/fragments";
import { OutcomesStage } from "./OutcomesStage";

/**
 * HOME.SHIFT. Desktop: Koto's sticky column. The three outcomes scroll on the left while one sticky
 * stage on the right crossfades to the matching thing PDN builds (Humbleteam's big visual).
 * Phones: Humbleteam's stacked full panels, text then visual. Realistic scene photos (HUM-01..03) slot in
 * behind the interfaces when they exist.
 */
const PHOTOS = [
  { id: "HUM-01", alt: "A customer in Lagos looking at a business website on her phone" },
  { id: "HUM-02", alt: "A man in Lagos traffic searching for a business on his phone" },
  { id: "HUM-03", alt: "A phone lighting up on a bedside table at night" },
];
const ALONE = ["w-full max-w-[640px]", "w-full max-w-[520px]", "w-[58%] max-w-[290px]"];
const ON_PHOTO = ["w-[62%] max-w-[420px]", "w-[56%] max-w-[340px]", "w-[34%] max-w-[190px]"];

function Visual({ i }: { i: number }) {
  const fragments = [<WebsiteDesktop key="t" />, <MapsCard key="f" />, <LockScreen key="p" />];
  const photo = PHOTOS[i]!;
  if (hasAsset(photo.id)) {
    return (
      <div className="relative h-full min-h-[460px] w-full overflow-hidden">
        <Picture id={photo.id} alt={photo.alt} sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0 block" imgClassName="h-full w-full object-cover" fallback={null} />
        <div className={`absolute bottom-6 right-6 sm:bottom-8 sm:right-8 ${ON_PHOTO[i]}`}>{fragments[i]}</div>
      </div>
    );
  }
  return (
    <div className="grid h-full min-h-[380px] w-full place-items-center px-6 py-12 sm:px-12">
      <div className={ALONE[i]}>{fragments[i]}</div>
    </div>
  );
}

export function OutcomesSection() {
  const c = HOME.shift;
  const ids = c.items.map((it) => `outcome-${it.n}`);
  return (
    <section aria-labelledby="shift-title" className="field-black section-y">
      <div className="wrap">
        <SectionHead id="shift-title" eyebrow={c.eyebrow} headline={c.headline} />
      </div>
      <div className="wrap mt-16 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-3">
        <div className="space-y-3">
          {c.items.map((item, i) => (
            <article key={item.n} aria-labelledby={ids[i]} className="bg-[var(--tone)] lg:flex lg:min-h-[86svh] lg:items-center">
              <div className="p-7 sm:p-10 lg:p-16">
                <p data-reveal className="text-[var(--grey)] tabular">
                  {item.n} · {item.label}
                </p>
                <h3
                  id={ids[i]}
                  data-reveal
                  style={{ "--i": 1 } as React.CSSProperties}
                  className="font-display mt-5 text-[clamp(1.625rem,1.1rem+2.1vw,3.25rem)] leading-[1] tracking-[-0.04em] sm:max-w-[20ch]"
                >
                  {item.title}
                </h3>
                <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="mt-6 max-w-[44ch] text-[1.25rem] leading-[1.5]">
                  {item.body}
                </p>
              </div>
              {/* phones/tablets: the visual sits inside its panel */}
              <div className="bg-[var(--tone-2)] lg:hidden">
                <Visual i={i} />
              </div>
            </article>
          ))}
        </div>
        <div className="hidden lg:block">
          <OutcomesStage labels={ids} visuals={c.items.map((_, i) => <Visual key={i} i={i} />)} />
        </div>
      </div>
    </section>
  );
}
