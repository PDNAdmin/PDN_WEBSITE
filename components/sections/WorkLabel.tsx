"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

/** Koto's second line: the client whose project is in the middle of the screen. */
export function WorkLabel({ names, ids }: { names: string[]; ids: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setI(els.indexOf(e.target as HTMLElement))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return (
    <p aria-hidden="true" className="relative mt-2 hidden h-[1.1em] overflow-hidden font-display text-heading text-[var(--grey)] lg:block">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={i}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {names[i]}
        </m.span>
      </AnimatePresence>
    </p>
  );
}
