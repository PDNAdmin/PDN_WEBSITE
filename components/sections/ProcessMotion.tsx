"use client";

import { useGsapScene } from "@/lib/motion/gsap";

/** Desktop: pin HOME.PROCESS and scrub the steps sideways; the gold line draws with the progress. */
export function ProcessMotion() {
  useGsapScene(
    () => document.getElementById("process"),
    ({ gsap }, root) => {
      const pin = root.querySelector<HTMLElement>("[data-pin]");
      const track = root.querySelector<HTMLElement>("[data-track]");
      const line = root.querySelector<HTMLElement>("[data-line]");
      if (!pin || !track) return;
      root.classList.add("is-hscroll");
      const distance = () => Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? window.innerWidth));
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.15}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      tl.to(track, { x: () => -distance() }, 0);
      if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1 }, 0);
      return () => root.classList.remove("is-hscroll");
    },
    { media: 1024 },
  );
  return null;
}
