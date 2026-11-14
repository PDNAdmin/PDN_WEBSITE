"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion (Framer Motion) for component-state animation: menu, accordions, carousels, cursor, number swaps.
 * LazyMotion + domAnimation keeps it small; components use `m.*` from "motion/react-m".
 * reducedMotion="user" honours the OS setting everywhere.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
