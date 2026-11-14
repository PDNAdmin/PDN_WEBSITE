import { HOME } from "@/content/copy";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Scramble } from "@/components/motion/Scramble";

/**
 * HOME.CLOSER. OFF+BRAND's giant settling statement, then Lagos at night: the Third Mainland Bridge
 * drawing a line of gold through the dark city. The River Pishon, in a real photograph of PDN's home.
 * (Found picture, credited in the footer.)
 */
export function CloserStatement() {
  const c = HOME.closer;
  return (
    <section aria-labelledby="closer-title" className="field-black pt-[var(--section-y)]">
      <div className="wrap">
        <h2 id="closer-title" className="font-display max-w-[18ch] text-[clamp(2.5rem,1rem+6.4vw,8rem)] leading-[0.92] tracking-[-0.05em]">
          <Scramble text={c.line} />
        </h2>
        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className="text-[1.25rem] text-[#d8d8d4]">{c.brandLine}</p>
          <Button href="#book" className="max-sm:w-full sm:min-w-[260px]">
            {c.button}
          </Button>
        </div>
      </div>
      <div data-reveal className="mt-[clamp(56px,7vw,112px)]">
        <Picture
          id="found:the-third-mainland-bridge-lagos"
          alt="The Third Mainland Bridge in Lagos at night, its lights drawing a long gold curve across the lagoon"
          sizes="100vw"
          className="block"
          imgClassName="block aspect-[4/3] w-full object-cover object-[45%_78%] sm:aspect-[21/9]"
          fallback={null}
        />
      </div>
    </section>
  );
}
