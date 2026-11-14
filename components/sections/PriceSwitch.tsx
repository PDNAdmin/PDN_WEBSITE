"use client";

import type { ReactNode } from "react";
import { useCurrency } from "@/lib/currency";

/** Shows the NGN or USD price (server-rendered nodes passed in, so tokens resolve on the server). */
export function PriceSwitch({ ngn, usd }: { ngn: ReactNode; usd: ReactNode }) {
  const cur = useCurrency();
  return <>{cur === "usd" ? usd : ngn}</>;
}
