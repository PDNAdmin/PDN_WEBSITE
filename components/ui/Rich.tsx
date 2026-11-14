import { Fragment, type ReactNode } from "react";
import { SHOW_TOKENS, TOKENS, shouldRender } from "@/lib/tokens";

/** One {{TOKEN}}: its value, an amber pill on dev/preview, or nothing on production. */
export function Tok({ name }: { name: string }) {
  const v = TOKENS[name]?.trim();
  if (v) return <>{v}</>;
  if (!SHOW_TOKENS) return null;
  return <span className="token-pill" data-token={name}>{`{{${name}}}`}</span>;
}

const PART = /(\*\*[^*]+\*\*|\{\{[A-Z0-9_]+\}\})/g;

/** Renders copy: `**gold phrase**` → <em>, `{{TOKEN}}` → <Tok>. */
export function rich(s: string): ReactNode {
  return s.split(PART).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**")) return <em key={i} className="hl">{rich(part.slice(2, -2))}</em>;
    const t = part.match(/^\{\{([A-Z0-9_]+)\}\}$/);
    if (t) return <Tok key={i} name={t[1]!} />;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * A copy string that hides itself when it depends on an empty token (production only).
 * `as` picks the wrapper element; omit for a fragment.
 */
export function Copy({
  s,
  as: As,
  className,
}: {
  s: string;
  as?: "p" | "span" | "li" | "div" | "h2" | "h3";
  className?: string;
}) {
  if (!shouldRender(s)) return null;
  if (!As) return <>{rich(s)}</>;
  return <As className={className}>{rich(s)}</As>;
}

/** Strip a trailing " →" (rendered as the ArrowRight icon instead). */
export function label(s: string): { text: string; arrow: boolean } {
  return s.endsWith(" →") ? { text: s.slice(0, -2), arrow: true } : { text: s, arrow: false };
}
