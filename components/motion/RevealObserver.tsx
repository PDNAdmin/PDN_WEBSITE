"use client";

import { useEffect } from "react";

/**
 * M-REVEAL (docs/07 §2): one observer for every [data-reveal] / [data-draw] element.
 * Reveals run once at "top 85%". Content stays visible if this script never runs
 * (the hidden state only applies under html.io, which this adds).
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal],[data-draw]"));
    if (!("IntersectionObserver" in window)) return;

    // Elements already on screen are marked before hiding kicks in (no flash).
    // The first callback of an observer reports current state for every target.
    let primed = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
        if (!primed) {
          primed = true;
          root.classList.add("io");
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 },
    );
    for (const el of els) io.observe(el);

    return () => {
      io.disconnect();
    };
  }, []);
  return null;
}
