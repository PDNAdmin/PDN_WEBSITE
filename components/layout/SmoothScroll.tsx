"use client";

import { useEffect } from "react";
import { loadGsap } from "@/lib/motion/gsap";

/**
 * Lenis smooth scroll (desktop pointer devices only; phones keep native scroll, which is faster).
 * Loaded after idle. When GSAP is present, Lenis drives ScrollTrigger so pinned scenes stay in sync.
 */
export function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    if (
      root.dataset.tier === "low" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !matchMedia("(pointer: fine)").matches
    ) {
      return;
    }
    let destroy: (() => void) | undefined;
    let cancelled = false;
    const start = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), loadGsap()]);
      if (cancelled) return;
      const headerH = parseInt(getComputedStyle(root).getPropertyValue("--header-h")) || 72;
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        anchors: { offset: -(headerH + 16), duration: 1.2, easing: riverEase },
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      destroy = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => void start(), { timeout: 1500 });
    else setTimeout(() => void start(), 1200);
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);
  return null;
}

/** cubic-bezier(0.65, 0, 0.35, 1), the "river" ease */
function riverEase(t: number): number {
  const cx = 1.95,
    bx = -2.85,
    ax = 1.9;
  const cy = 0,
    by = 3,
    ay = -2;
  let u = t;
  for (let i = 0; i < 6; i++) {
    const x = ((ax * u + bx) * u + cx) * u - t;
    const d = (3 * ax * u + 2 * bx) * u + cx;
    if (Math.abs(d) < 1e-6) break;
    u -= x / d;
  }
  return ((ay * u + by) * u + cy) * u;
}
