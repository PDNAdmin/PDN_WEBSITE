"use client";

import type { ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useCurrency } from "@/lib/currency";

/** Shows the NGN or USD price; the figure rolls up when the currency changes (Motion). */
export function PriceSwitch({ ngn, usd }: { ngn: ReactNode; usd: ReactNode }) {
  const cur = useCurrency();
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={cur}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {cur === "usd" ? usd : ngn}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
