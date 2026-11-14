import type { Metadata } from "next";
import { THANK_YOU } from "@/content/copy";
import { Copy, rich } from "@/components/ui/Rich";
import { Button } from "@/components/ui/Button";
import { LIVE } from "@/lib/site";
import { isFilled } from "@/lib/tokens";
import { RIVER_D, RIVER_VIEWBOX } from "@/lib/river-path.generated";

export const metadata: Metadata = {
  title: "Thank you · Pishon Digital Network",
  robots: { index: false, follow: false },
};

/** /thank-you (docs/03 §4): the mark draws itself and ends in a check, then the words. */
export default async function ThankYou({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const { name } = await searchParams;
  const first = (name ?? "").replace(/[^\p{L}\p{M}' -]/gu, "").trim().slice(0, 40);
  const headline = first ? THANK_YOU.headlineNamed.replace("{firstName}", first) : THANK_YOU.headline;

  return (
    <main id="main" className="field-white">
      <div className="wrap grid min-h-[100svh] gap-12 pb-24 pt-[calc(var(--header-h)+clamp(48px,7vw,112px))] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <svg aria-hidden="true" viewBox="-20 -20 1070 830" className="h-[96px] w-auto sm:h-[120px]" fill="none">
            <path d={RIVER_D} stroke="#d4af37" strokeWidth="57.3" pathLength={1} className="ty-river" />
            <path
              d="M756 368.6 L846 452 L1010 214"
              stroke="#0a0a0a"
              strokeWidth="57.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="ty-check"
            />
          </svg>
          <h1 className="ty-in font-display text-heading mt-12 max-w-[14ch]" style={{ "--d": "450ms" } as React.CSSProperties}>
            {rich(headline)}
          </h1>
          <Copy s={THANK_YOU.body} as="p" className="ty-in mt-8 max-w-[44ch] text-[1.25rem] leading-[1.5]" />
          <div className="ty-in mt-10 flex flex-col items-start gap-5">
            {LIVE.work ? (
              <Button href="/work" variant="ink">
                {THANK_YOU.button}
              </Button>
            ) : null}
            {isFilled("PHONE") ? (
              <a href="/pdn.vcf" download className="link">
                {THANK_YOU.vcard}
              </a>
            ) : null}
          </div>
        </div>
        <div className="ty-in self-end bg-[var(--tone)] p-7 sm:p-10 lg:col-span-5">
          <h2 className="text-statement font-semibold">{THANK_YOU.waitTitle}</h2>
          <ol className="mt-6 space-y-4">
            {THANK_YOU.wait.map((w, i) => (
              <li key={w} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center bg-[#d4af37] font-semibold text-[#0a0a0a] tabular">{i + 1}</span>
                <span className="pt-1">{w}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
