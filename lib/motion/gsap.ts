"use client";

/**
 * GSAP, loaded after first paint (never in the initial bundle). One promise, plugins registered once.
 * Scroll choreography only: pins, scrubs, horizontal scroll, SplitText reveals.
 */
import { useEffect, type RefObject } from "react";

type GsapModule = typeof import("gsap");
export type Gsap = GsapModule["gsap"];
export type ScrollTriggerT = typeof import("gsap/ScrollTrigger").ScrollTrigger;
export type SplitTextT = typeof import("gsap/SplitText").SplitText;
export type GsapKit = { gsap: Gsap; ScrollTrigger: ScrollTriggerT; SplitText: SplitTextT };

let kit: Promise<GsapKit> | null = null;

export function loadGsap(): Promise<GsapKit> {
  if (!kit) {
    kit = Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText"), import("gsap/CustomEase")]).then(
      ([g, st, sp, ce]) => {
        const gsap = g.gsap;
        gsap.registerPlugin(st.ScrollTrigger, sp.SplitText, ce.CustomEase);
        ce.CustomEase.create("river", "M0,0 C0.65,0 0.35,1 1,1");
        ce.CustomEase.create("expoOut", "M0,0 C0.16,1 0.3,1 1,1");
        return { gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText };
      },
    );
  }
  return kit;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isLowTier(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.tier === "low";
}

/**
 * Run a GSAP scene scoped to a component. GSAP loads lazily; everything created inside `setup`
 * is reverted on unmount (gsap.context). Skipped entirely under reduced motion or on low-tier devices,
 * so the server-rendered page is always the finished page.
 *
 * `media`: optional min-width breakpoint (e.g. 1024) below which the scene doesn't run.
 */
export function useGsapScene(
  scope: RefObject<HTMLElement | null> | (() => HTMLElement | null),
  setup: (k: GsapKit, root: HTMLElement) => void | (() => void),
  opts: { media?: number; allowLowTier?: boolean } = {},
) {
  const { media, allowLowTier } = opts;
  useEffect(() => {
    const root = typeof scope === "function" ? scope() : scope.current;
    if (!root || prefersReducedMotion() || (!allowLowTier && isLowTier())) return;
    if (media && !matchMedia(`(min-width: ${media}px)`).matches) return;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let extraCleanup: void | (() => void);
    loadGsap().then((k) => {
      if (cancelled) return;
      ctx = k.gsap.context(() => {
        extraCleanup = setup(k, root);
      }, root);
    });
    return () => {
      cancelled = true;
      if (typeof extraCleanup === "function") extraCleanup();
      ctx?.revert();
    };
    // setup is intentionally captured once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, media, allowLowTier]);
}
