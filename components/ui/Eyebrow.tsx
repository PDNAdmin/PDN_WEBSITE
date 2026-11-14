import { SplitWords } from "@/components/motion/SplitWords";

/**
 * Section heading, Koto-style: the copy's eyebrow sits as a plain grey label in its own column,
 * the heading takes the main column. Sentence case, body size: never a tiny tracked label.
 */
export function SectionHead({
  eyebrow,
  headline,
  id,
  className = "",
  layout = "split",
}: {
  eyebrow: string;
  headline: string;
  id?: string;
  className?: string;
  layout?: "split" | "stack";
}) {
  if (layout === "stack") {
    return (
      <div className={className}>
        <p className="kicker" /* taste-skill-ignore: copy eyebrow (docs/04) */>{eyebrow}</p>
        <h2 id={id} data-reveal="split" className="font-display text-heading mt-4 lg:max-w-[16ch]">
          <SplitWords text={headline} />
        </h2>
      </div>
    );
  }
  return (
    <div className={`grid gap-4 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <p className="kicker lg:col-span-3 lg:pt-3" /* taste-skill-ignore: copy eyebrow (docs/04) */>{eyebrow}</p>
      <h2 id={id} data-reveal="split" className="font-display text-heading lg:col-span-9 lg:max-w-[16ch]">
        <SplitWords text={headline} />
      </h2>
    </div>
  );
}
