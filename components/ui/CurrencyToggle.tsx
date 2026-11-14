"use client";

import { setCurrency, useCurrency, type Currency } from "@/lib/currency";

/** NGN / USD switch (radiogroup): flat tone track, the chosen side filled in ink. */
export function CurrencyToggle({
  labels,
  aria,
  size = "md",
}: {
  labels: { ngn: string; usd: string };
  aria: string;
  size?: "sm" | "md";
}) {
  const cur = useCurrency();
  const opts: Currency[] = ["ngn", "usd"];
  return (
    <div
      role="radiogroup"
      aria-label={aria}
      className="inline-flex bg-[var(--tone)] p-1"
      onKeyDown={(e) => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
          e.preventDefault();
          const next = cur === "ngn" ? "usd" : "ngn";
          setCurrency(next);
          (e.currentTarget.querySelector(`[data-c="${next}"]`) as HTMLElement | null)?.focus();
        }
      }}
    >
      {opts.map((o) => {
        const on = cur === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            data-c={o}
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => setCurrency(o)}
            className={`font-semibold transition-colors duration-150 ${
              size === "sm" ? "min-h-9 px-3.5 text-[0.875rem]" : "min-h-11 px-5 text-[0.9375rem]"
            } ${on ? "bg-[var(--ink)] text-[var(--ground)]" : "text-[var(--ink)] hover:bg-[var(--tone-2)]"}`}
          >
            {labels[o]}
          </button>
        );
      })}
    </div>
  );
}
