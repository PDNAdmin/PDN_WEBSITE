"use client";

import { useEffect, useState } from "react";
import * as m from "motion/react-m";

let hasNavigated = false;

/**
 * Page transition (enter side): a black curtain with a gold leading edge lifts off the new page.
 * Never on the first load (it would hide the content and slow the first paint), only on in-app navigation.
 * Mounted from app/(site)/template.tsx, which remounts on every route change.
 */
export function PageCurtain() {
  const [show] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);
  if (!show) return null;
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] bg-[#0a0a0a]"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
    >
      <span className="absolute inset-x-0 bottom-0 h-1.5 bg-[#d4af37]" />
    </m.div>
  );
}
