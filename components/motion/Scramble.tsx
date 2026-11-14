"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * OFF+BRAND's settling letters: when the line enters, each letter flickers and lands left to right.
 * Server-rendered as the final text (no JS = final text). `**phrase**` keeps the gold highlighter.
 * Reduced motion: no flicker.
 */
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  const plain = text.replaceAll("**", "");
  const ref = useRef<HTMLSpanElement>(null);
  const [frame, setFrame] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const f = (now - start) / 1100;
          setFrame(f >= 1 ? null : f);
          if (f < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  let idx = 0;
  const total = plain.length;
  const render = (s: string) =>
    [...s]
      .map((ch) => {
        const i = idx++;
        if (frame === null || ch === " " || /[.,'?]/.test(ch)) return ch;
        // each letter flickers in a window that sweeps left to right, then lands
        const settleAt = (i / total) * 0.75;
        if (frame < settleAt - 0.05 || frame >= settleAt + 0.18) return ch;
        return GLYPHS[(i * 7 + Math.floor(frame * 60)) % GLYPHS.length];
      })
      .join("");

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {parts.map((p, pi) =>
          p.startsWith("**") ? (
            <em key={pi} className="hl">
              {render(p.slice(2, -2))}
            </em>
          ) : (
            <span key={pi}>{render(p)}</span>
          ),
        )}
      </span>
    </span>
  );
}
