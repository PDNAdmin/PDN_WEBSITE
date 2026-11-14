import { Fragment } from "react";

/**
 * Splits a headline into masked words for the line/word reveal (docs/07 SplitLines, CSS-driven).
 * `**gold phrase**` words are wrapped in <em>. Screen readers get the plain sentence.
 */
export function SplitWords({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  let i = startIndex;
  const plain = text.replaceAll("**", "");
  return (
    <>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {parts.map((part, pi) => {
          const gold = part.startsWith("**");
          const words = (gold ? part.slice(2, -2) : part).split(/(\s+)/);
          const nodes = words.map((w, wi) => {
            if (!w) return null;
            if (/^\s+$/.test(w)) return <Fragment key={wi}> </Fragment>;
            const idx = i++;
            return (
              <span key={wi} className="split-w" style={{ "--i": idx } as React.CSSProperties}>
                <span>{w}</span>
              </span>
            );
          });
          return gold ? (
            <em key={pi} className="hl">
              {nodes}
            </em>
          ) : (
            <Fragment key={pi}>{nodes}</Fragment>
          );
        })}
      </span>
    </>
  );
}
