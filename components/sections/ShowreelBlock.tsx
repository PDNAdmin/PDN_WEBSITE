"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useGsapScene } from "@/lib/motion/gsap";

/**
 * HOME.SHOWREEL (Koto). A muted loop that grows from an inset card to full-bleed as it scrolls in (GSAP),
 * plays only while visible, shows "Play" on the cursor, and opens fullscreen with sound on click (Motion).
 * Rendered only when the real reel exists (content/settings.ts → showreel.ready).
 */
export function ShowreelBlock({
  src,
  srcWebm,
  srcMobile,
  full,
  poster,
  caption,
  labels,
}: {
  src: string;
  srcWebm?: string;
  srcMobile?: string;
  full: string;
  poster: string;
  caption: string;
  labels: { play: string; close: string };
}) {
  const frame = useRef<HTMLDivElement>(null);
  const loop = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  useGsapScene(
    () => document.getElementById("showreel"),
    ({ gsap }, root) => {
      const el = root.querySelector<HTMLElement>("[data-frame]");
      if (!el) return;
      gsap.fromTo(
        el,
        { scale: 0.86, borderRadius: 28 },
        { scale: 1, borderRadius: 0, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top 15%", scrub: 0.6 } },
      );
    },
  );

  // play only while on screen
  useEffect(() => {
    const v = loop.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? void v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="showreel" aria-label={labels.play} className="field-black overflow-hidden pb-[var(--section-y)]">
      <div ref={frame} data-frame className="relative overflow-hidden will-change-transform">
        <button type="button" data-cursor="play" onClick={() => setOpen(true)} className="block w-full" aria-label={labels.play}>
          <video ref={loop} muted playsInline loop preload="none" poster={poster} className="block aspect-[4/5] w-full object-cover sm:aspect-video">
            {srcMobile ? <source src={srcMobile} media="(max-width: 639px)" type="video/mp4" /> : null}
            {srcWebm ? <source src={srcWebm} type="video/webm" /> : null}
            <source src={src} type="video/mp4" />
          </video>
        </button>
      </div>
      <p className="wrap mt-6 text-small text-[#9a9a95]">{caption}</p>
      <AnimatePresence>
        {open ? (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={labels.play}
            className="fixed inset-0 z-[80] grid place-items-center bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <video src={full} controls autoPlay playsInline className="max-h-full w-full" />
            <button type="button" autoFocus onClick={() => setOpen(false)} className="btn btn-primary btn-noarrow absolute right-4 top-4">
              {labels.close}
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
