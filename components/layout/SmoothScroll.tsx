"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scroll (docs/07 §2). Desktop pointer:fine only, never on low tier or reduced motion.
 * Loaded lazily after idle so it never competes with first paint.
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
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const headerH = parseInt(getComputedStyle(root).getPropertyValue("--header-h")) || 76;
      const lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
        anchors: { offset: -(headerH + 16), duration: 1.2, easing: riverEase },
      });
      destroy = () => lenis.destroy();
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
  // Newton-Raphson on the bezier x(t) to find the parameter, then return y.
  const x1 = 0.65,
    y1 = 0,
    x2 = 0.35,
    y2 = 1;
  const cx = 3 * x1,
    bx = 3 * (x2 - x1) - cx,
    ax = 1 - cx - bx;
  const cy = 3 * y1,
    by = 3 * (y2 - y1) - cy,
    ay = 1 - cy - by;
  let u = t;
  for (let i = 0; i < 6; i++) {
    const x = ((ax * u + bx) * u + cx) * u - t;
    const d = (3 * ax * u + 2 * bx) * u + cx;
    if (Math.abs(d) < 1e-6) break;
    u -= x / d;
  }
  return ((ay * u + by) * u + cy) * u;
}
