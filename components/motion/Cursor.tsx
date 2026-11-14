"use client";

import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { useMotionValue, useSpring } from "motion/react";

type Mode = "default" | "link" | "view" | "play" | "hidden";

/**
 * Koto-style cursor: a gold dot that follows exactly and a ring that lags. Elements opt into a label with
 * data-cursor="view" | "play". Desktop fine pointers only; never over form fields; off under reduced motion.
 * The native cursor stays (accessibility): this is a companion, not a replacement.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const ok =
      matchMedia("(pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      document.documentElement.dataset.tier !== "low";
    if (!ok) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("input, textarea, select, [contenteditable]")) return setMode("hidden");
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged) return setMode((tagged.dataset.cursor as Mode) || "link");
      if (t.closest("a, button, summary, label")) return setMode("link");
      setMode("default");
    };
    const onLeave = () => setMode("hidden");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    // first real pointer move switches it on (no cursor stuck at 0,0)
    const arm = () => setEnabled(true);
    window.addEventListener("pointermove", arm, { once: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointermove", arm);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const label = mode === "view" ? "View" : mode === "play" ? "Play" : "";
  const size = label ? 76 : mode === "link" ? 52 : 34;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      <m.div
        className="absolute left-0 top-0 grid place-items-center rounded-full"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: mode === "hidden" ? 0 : 1,
          backgroundColor: label ? "#d4af37" : "rgba(212,175,55,0)",
          borderColor: label ? "rgba(212,175,55,0)" : "rgba(212,175,55,.9)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <span className="absolute inset-0 rounded-full border-[1.5px]" style={{ borderColor: "inherit" }} />
        {label ? <span className="text-[13px] font-semibold text-[#0a0a0a]">{label}</span> : null}
      </m.div>
      <m.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-[#d4af37]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: mode === "hidden" || label ? 0 : 1 }}
      />
    </div>
  );
}
