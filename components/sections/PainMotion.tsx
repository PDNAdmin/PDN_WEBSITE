"use client";

import { useGsapScene } from "@/lib/motion/gsap";

/** Scroll choreography for HOME.PAIN (see PainSection). Scrubbed both ways, reversible. */
export function PainMotion() {
  // collage → grid (desktop only: on phones the grid is already the right reading order)
  useGsapScene(
    () => document.getElementById("pain"),
    ({ gsap }, root) => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
      const scatter = [
        { x: -60, y: 90, r: -7 },
        { x: 40, y: 150, r: 6 },
        { x: 110, y: 60, r: 9 },
        { x: -120, y: 40, r: 5 },
        { x: 20, y: -40, r: -8 },
        { x: 90, y: 20, r: -4 },
      ];
      gsap.from(cards, {
        x: (i) => scatter[i % 6]!.x,
        y: (i) => scatter[i % 6]!.y,
        rotation: (i) => scatter[i % 6]!.r,
        scale: 0.94,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: { trigger: root.querySelector("[data-collage]"), start: "top 95%", end: "top 30%", scrub: 0.8 },
      });
    },
    { media: 1024 },
  );

  // the gold statement lights up word by word as you read (all sizes)
  useGsapScene(
    () => document.getElementById("fix"),
    ({ gsap, SplitText }, root) => {
      const p = root.querySelector<HTMLElement>("[data-manifesto]");
      if (!p) return;
      const split = new SplitText(p, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 45%", scrub: 0.5 },
        },
      );
      return () => split.revert();
    },
  );
  return null;
}
