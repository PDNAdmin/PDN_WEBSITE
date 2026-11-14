"use client";

import { useSyncExternalStore } from "react";

/** Shared NGN/USD choice for Pricing and the booking form's budget chips. Remembered in localStorage. */
export type Currency = "ngn" | "usd";
const KEY = "pdn-currency";
const listeners = new Set<() => void>();
let current: Currency | null = null;

function initial(): Currency {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "ngn" || saved === "usd") return saved;
  } catch {}
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz === "Africa/Lagos" ? "ngn" : "usd";
  } catch {
    return "ngn";
  }
}

export function getCurrency(): Currency {
  if (current === null) current = initial();
  return current;
}

export function setCurrency(c: Currency, persist = true) {
  current = c;
  if (persist) {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** SSR renders NGN (the primary market); the client resolves the saved/likely currency after hydration. */
export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, getCurrency, () => "ngn");
}
