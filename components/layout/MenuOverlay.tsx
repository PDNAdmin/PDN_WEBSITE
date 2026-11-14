"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { GLOBAL } from "@/content/copy";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "./Header";

/**
 * Full-screen menu (OFF+BRAND / Koto): huge stacked links staggering in, contact and Ask AI at the foot.
 * Focus is trapped while open; Esc closes; focus returns to the toggle.
 */
export function MenuOverlay({
  open,
  onClose,
  nav,
  bookHref,
  askAi,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
  bookHref: string;
  askAi: { label: string; links: { label: string; href: string }[] };
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const el = panel.current;
    el?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !el) return;
      const f = [...el.querySelectorAll<HTMLElement>("a, button")];
      if (!f.length) return;
      const first = f[0]!,
        last = f[f.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          ref={panel}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="field-black fixed inset-0 z-[60] flex flex-col overflow-y-auto pt-[var(--header-h)]"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <nav aria-label="Main" className="wrap flex-1 py-10">
            <ul>
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <m.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}>
                    <Link
                      href={n.href}
                      onClick={onClose}
                      className="font-display block py-1 text-[clamp(2.75rem,1.5rem+6vw,7rem)] leading-[0.95] tracking-[-0.05em] transition-colors hover:text-[#d4af37]"
                    >
                      {n.label}
                    </Link>
                  </m.div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={bookHref} onClick={onClose}>
                {GLOBAL.headerButton}
              </Button>
            </div>
          </nav>
          <div className="wrap flex flex-col gap-4 pb-10 sm:flex-row sm:items-center">
            <p className="text-[#d8d8d4]">{askAi.label}</p>
            <ul className="flex flex-wrap gap-2">
              {askAi.links.map((a) => (
                <li key={a.label}>
                  <a href={a.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center bg-[var(--tone)] px-4 font-semibold hover:bg-[#d4af37] hover:text-[#0a0a0a]">
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
