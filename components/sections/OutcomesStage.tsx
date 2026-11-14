"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

/**
 * Desktop sticky stage for HOME.SHIFT (Koto sticky column + Humbleteam panels): watches which outcome text
 * is in the middle of the screen and crossfades the matching visual. Decorative duplicate of the visuals
 * already inside each panel (those carry the accessible labels), so it is aria-hidden.
 */
export function OutcomesStage({ visuals, labels }: { visuals: ReactNode[]; labels: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = labels.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(items.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [labels]);

  return (
    <div aria-hidden="true" className="sticky top-[calc(var(--header-h)+24px)] h-[calc(100svh-var(--header-h)-48px)] min-h-[560px] overflow-hidden bg-[var(--tone-2)]">
      <AnimatePresence initial={false}>
        <m.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          {visuals[active]}
        </m.div>
      </AnimatePresence>
      <div className="absolute bottom-6 left-6 flex gap-2">
        {labels.map((l, i) => (
          <span key={l} className={`h-1.5 transition-[width,background-color] duration-500 ${i === active ? "w-10 bg-[#d4af37]" : "w-4 bg-white/25"}`} />
        ))}
      </div>
    </div>
  );
}
