"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GLOBAL } from "@/content/copy";
import { Button } from "@/components/ui/Button";
import { LagosClock } from "./LagosClock";
import { MenuOverlay } from "./MenuOverlay";

export type NavItem = { label: string; href: string };

/**
 * Header (docs/11, from Finsweet): a solid black bar, wordmark left, plain links, one gold action.
 * Hides on scroll-down past 400px, returns on scroll-up. Links to unbuilt routes are not rendered.
 */
export function Header({ nav, askAi }: { nav: NavItem[]; askAi: { label: string; links: { label: string; href: string }[] } }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // pages with the form on them jump to it; everywhere else goes to /contact
  const pathname = usePathname();
  const bookHref = pathname === "/" || pathname === "/contact" ? "#book" : "/contact";
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
        <div className="flex items-center gap-5">
          <LagosClock className="hidden text-small text-[#9a9a95] md:inline" />
          <Button href={bookHref} size="sm" data-cta="header">
            {GLOBAL.headerButton}
          </Button>
          {nav.length > 0 ? (
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Menu"}
              onClick={() => setMenuOpen((o) => !o)}
              className="relative z-[61] grid h-11 w-11 place-items-center bg-[#161616] lg:hidden"
            >
              <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[1px] rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute block h-[2px] w-5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          ) : null}
        </div>
      </div>
      {nav.length > 0 ? (
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} nav={nav} bookHref={bookHref} askAi={askAi} />
      ) : null}
    </header>
  );
}
