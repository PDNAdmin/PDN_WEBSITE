"use client";

import { useRef, useState, type ReactNode } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, useMotionValue, useSpring } from "motion/react";

/**
 * OFF+BRAND / Koto hover preview: while the pointer is over a service line, a phone showing that
 * service's interface follows it (spring-damped, slight tilt with horizontal speed).
 * Desktop fine pointers only; decorative (the lines themselves carry the content).
 */
export function ServicesPreview({ previews, children }: { previews: ReactNode[]; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });
  const rot = useSpring(0, { stiffness: 120, damping: 14 });
  const lastX = useRef(0);

  return (
    <div
      ref={box}
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !box.current) return;
        const r = box.current.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
        rot.set(Math.max(-8, Math.min(8, (e.clientX - lastX.current) * 0.6)));
        lastX.current = e.clientX;
        const row = (e.target as HTMLElement).closest<HTMLElement>("[data-service-row]");
        setActive(row ? Number(row.dataset.serviceRow) : null);
      }}
      onPointerLeave={() => setActive(null)}
    >
      {children}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[208px] rounded-[2.5rem] bg-[#262626] p-1 lg:block"
        style={{ x: sx, y: sy, rotate: rot, translateX: "36px", translateY: "-55%" }}
      >
        <AnimatePresence mode="popLayout">
          {active !== null ? (
            <m.div
              key={active}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              {previews[active]}
            </m.div>
          ) : null}
        </AnimatePresence>
      </m.div>
    </div>
  );
}
