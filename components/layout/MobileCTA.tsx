"use client";

import { useEffect, useState } from "react";
import { GLOBAL } from "@/content/copy";
import { Button } from "@/components/ui/Button";

/**
 * Sticky mobile CTA (< 768px): appears after the hero leaves view,
 * hides while the booking section is in view.
 */
export function MobileCTA({ href, heroId = "hero", bookId = "book" }: { href: string; heroId?: string; bookId?: string }) {
  const [heroGone, setHeroGone] = useState(false);
  const [bookVisible, setBookVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const book = document.getElementById(bookId);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) setHeroGone(!e.isIntersecting);
          if (e.target === book) setBookVisible(e.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    if (hero) io.observe(hero);
    if (book) io.observe(book);
    return () => io.disconnect();
  }, [heroId, bookId]);

  const show = heroGone && !bookVisible;
  return (
    <div
      className="fixed inset-x-4 bottom-3 z-40 transition-[transform,opacity] duration-500 ease-(--ease-out-expo) md:hidden"
      style={{
        transform: show ? "none" : "translateY(140%)",
        opacity: show ? 1 : 0,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      aria-hidden={!show}
      inert={!show}
    >
      <Button href={href} className="w-full" data-cta="sticky">
        {GLOBAL.stickyCta}
      </Button>
    </div>
  );
}
