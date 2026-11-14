import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { ArrowRight } from "./icons";
import { label } from "./Rich";

type Props = {
  children: string;
  href: string;
  variant?: "primary" | "ink" | "quiet" | "link";
  size?: "md" | "sm";
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

/** Flat square CTA. Copy ending in " →" gets its arrow in a square box (docs/11, from Finsweet). */
export function Button({ children, href, variant = "primary", size = "md", className = "", ...rest }: Props) {
  const { text, arrow } = label(children);
  const cls =
    variant === "link"
      ? `link ${className}`
      : `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${arrow ? "" : "btn-noarrow"} ${className}`;
  const inner =
    variant === "link" ? (
      <>
        <span>{text}</span>
        {arrow ? <ArrowRight size={20} /> : null}
      </>
    ) : (
      <>
        <span>{text}</span>
        {arrow ? (
          <span className="btn-arrow-box" aria-hidden="true">
            <ArrowRight size={size === "sm" ? 18 : 20} />
          </span>
        ) : null}
      </>
    );
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
