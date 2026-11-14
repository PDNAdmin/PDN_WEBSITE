"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GLOBAL } from "@/content/copy";
import { Button } from "@/components/ui/Button";

export type NavItem = { label: string; href: string };

/**
 * Header (docs/11, from Finsweet): a solid black bar, wordmark left, plain links, one gold action.
 * Hides on scroll-down past 400px, returns on scroll-up. Links to unbuilt routes are not rendered.
 */
export function Header({ nav, bookHref }: { nav: NavItem[]; bookHref: string }) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const d = y - last.current;
        if (y < 400) setHidden(false);
        else if (d > 6) setHidden(true);
        else if (d < -6) setHidden(false);
        last.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-[#0a0a0a] text-white transition-transform duration-300 ease-(--ease-river) focus-within:!translate-y-0"
      style={{ transform: hidden ? "translateY(-100%)" : undefined }}
    >
      <div className="wrap flex h-(--header-h) items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label="Pishon Digital Network">
          <Image src="/brand/pdn-logo-horizontal-white.svg" alt="" width={456} height={140} priority unoptimized className="h-7 w-auto md:h-9" />
        </Link>
        {nav.length > 0 ? (
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link !font-medium">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <Button href={bookHref} size="sm" data-cta="header">
          {GLOBAL.headerButton}
        </Button>
      </div>
    </header>
  );
}
