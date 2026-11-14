"use client";

import { useSyncExternalStore } from "react";

/**
 * The visitor's business name, typed into the hero. Every interface fragment on the page
 * (and the booking form) uses it, so the page shows *their* business. Kept for the session only.
 */
const KEY = "pdn-business";
const listeners = new Set<() => void>();
let current: string | null = null;

function read(): string {
  if (current !== null) return current;
  try {
    current = sessionStorage.getItem(KEY) ?? "";
  } catch {
    current = "";
  }
  return current;
}

export function setBusinessName(v: string) {
  current = v.slice(0, 40);
  try {
    sessionStorage.setItem(KEY, current);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Raw value ("" until typed). */
export function useBusinessNameRaw(): string {
  return useSyncExternalStore(subscribe, read, () => "");
}

/** Display value with the sample fallback used inside interface fragments. */
export function useBusinessName(fallback = "Your business"): string {
  const v = useBusinessNameRaw().trim();
  return v || fallback;
}

export function initials(name: string): string {
  const w = name.trim().split(/\s+/).filter(Boolean);
  return ((w[0]?.[0] ?? "Y") + (w[1]?.[0] ?? "")).toUpperCase();
}

export function handle(name: string): string {
  return "@" + (name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 18) || "yourbusiness");
}
