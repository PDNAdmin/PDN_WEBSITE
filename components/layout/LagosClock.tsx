"use client";

import { useEffect, useState } from "react";

/** Koto's live studio clock: "Lagos 14:05". Rendered client-side only (no hydration mismatch). */
export function LagosClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" });
    const update = () => setTime(fmt.format(new Date()));
    const first = setTimeout(update, 0);
    const id = setInterval(update, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return (
    <span className={`tabular ${className}`} aria-label={time ? `Lagos time ${time}` : undefined}>
      Lagos <span className="inline-block min-w-[5ch]">{time ?? ""}</span>
    </span>
  );
}
