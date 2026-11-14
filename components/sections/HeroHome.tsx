import { FORM, HOME } from "@/content/copy";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/motion/SplitWords";
import { IconCheck } from "@/components/ui/icons";
import { SeeingDemo } from "./SeeingDemo";

/**
 * HOME.HERO (docs/11, from Ramotion): the question set huge, the real interface right beside it.
 * The headline copy keeps its words and order: the first sentence leads in, the question is the h1.
 */
export function HeroHome({ showWork, workHref }: { showWork: boolean; workHref: string }) {
  const c = HOME.hero;
  const [leadIn, question] = c.headline.split(" **");
  const q = `**${question}`;
  return (
    <section id="hero" aria-labelledby="hero-title" className="field-white hero-anim">
      <div className="wrap pt-[calc(var(--header-h)+clamp(28px,6vw,88px))] pb-[clamp(56px,7vw,112px)]">
        <p className="kicker hero-fade" /* taste-skill-ignore: copy eyebrow (docs/04) */ style={{ "--d": "0ms" } as React.CSSProperties}>
          {c.eyebrow}
        </p>
        <p className="hero-fade mt-5 max-w-[26ch] text-statement font-semibold" style={{ "--d": "60ms" } as React.CSSProperties}>
          {leadIn}
        </p>
        <h1 id="hero-title" className="font-display text-display mt-6 max-w-[12ch] lg:mt-8 lg:max-w-none">
          <SplitWords text={q} />
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="max-w-[40ch] text-[1.25rem] leading-[1.5]">{c.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#book" data-cta="hero" className="sm:min-w-[260px]">
                {c.primary}
              </Button>
              {showWork ? (
                <Button href={workHref} variant="quiet">
                  {c.secondary}
                </Button>
              ) : null}
            </div>
            <p className="mt-4 text-small text-[var(--grey)]">{c.microTrust}</p>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-small">
              {c.ticks.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center bg-[#d4af37] text-[#0a0a0a]" aria-hidden="true">
                    <IconCheck size={14} strokeWidth={2.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <SeeingDemo
              inputLabel={FORM.business.label}
              todayCaption={HOME.pain.cards[0].quote}
              todayWho={HOME.pain.cards[0].who}
              withCaption={HOME.audience.tabs[0].title}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
