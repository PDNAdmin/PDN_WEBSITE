"use client";

import { useGsapScene } from "@/lib/motion/gsap";

/**
 * OFF+BRAND's living headline: once GSAP has loaded (after first paint), the hero question's letters
 * lean away from the cursor and settle back; the whole headline drifts up as the hero scrolls away.
 * Desktop fine pointers only. The CSS load-in (word rise) has already played, so text is never late.
 */
export function HeroMotion({ titleId, sectionId }: { titleId: string; sectionId: string }) {
  useGsapScene(
    () => document.getElementById(sectionId),
    ({ gsap, SplitText }, root) => {
      if (!matchMedia("(pointer: fine)").matches) return;
      const title = root.querySelector<HTMLElement>(`#${titleId}`);
      if (!title) return;

      // scroll drift (desktop)
      gsap.to(title, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      // letters lean away from the pointer (after the CSS rise has finished)
      const words = title.querySelectorAll<HTMLElement>(".split-w > span");
      const split = new SplitText(words, { type: "chars" });
      const chars = split.chars as HTMLElement[];
      const movers = chars.map((c) => ({
        el: c,
        y: gsap.quickTo(c, "y", { duration: 0.5, ease: "power3" }),
        r: gsap.quickTo(c, "rotation", { duration: 0.6, ease: "power3" }),
      }));
      const R = 160;
      const onMove = (e: PointerEvent) => {
        for (const mv of movers) {
          const b = mv.el.getBoundingClientRect();
          const dx = e.clientX - (b.left + b.width / 2);
          const dy = e.clientY - (b.top + b.height / 2);
          const d = Math.hypot(dx, dy);
          const k = d < R ? 1 - d / R : 0;
          mv.y(-k * 0.16 * b.height);
          mv.r((dx < 0 ? 1 : -1) * k * 8);
        }
      };
      const onLeave = () => movers.forEach((mv) => (mv.y(0), mv.r(0)));
      title.addEventListener("pointermove", onMove);
      title.addEventListener("pointerleave", onLeave);
      return () => {
        title.removeEventListener("pointermove", onMove);
        title.removeEventListener("pointerleave", onLeave);
        split.revert();
      };
    },
    { media: 1024 },
  );
  return null;
}
