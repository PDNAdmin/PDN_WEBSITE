import { Header, type NavItem } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Cursor } from "@/components/motion/Cursor";
import { askAiLinks } from "@/lib/ask-ai";
import { GLOBAL } from "@/content/copy";
import { LIVE } from "@/lib/site";

const NAV_ROUTES: Record<string, { href: string; live: boolean }> = {
  Work: { href: "/work", live: LIVE.work },
  Services: { href: "/services", live: LIVE.services },
  "AI Agents": { href: "/ai-agents", live: LIVE.aiAgents },
  About: { href: "/about", live: LIVE.about },
  Insights: { href: "/insights", live: LIVE.insights },
  "Digital University": { href: "/digital-university", live: LIVE.digitalUniversity },
};

/** Global layout (docs/03 §2). Phase 1: only links to built routes render. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const nav: NavItem[] = GLOBAL.nav
    .filter((l) => NAV_ROUTES[l]?.live)
    .map((l) => ({ label: l, href: NAV_ROUTES[l]!.href }));
  const explore = GLOBAL.footer.explore.links
    .filter((l) => NAV_ROUTES[l]?.live)
    .map((l) => ({ label: l, href: NAV_ROUTES[l]!.href }));
  // Phase 1: the services rows on Home are the only services destination.
  const services = GLOBAL.footer.services.links.map((l) => ({
    label: l,
    href: LIVE.services ? `/services#${l.toLowerCase().replace(/\s+/g, "-")}` : "/#services",
  }));
  const legal = [
    ...(LIVE.privacy ? [{ label: GLOBAL.footer.privacy, href: "/privacy" }] : []),
    ...(LIVE.terms ? [{ label: GLOBAL.footer.terms, href: "/terms" }] : []),
  ];

  const askAi = askAiLinks();

  return (
    <MotionProvider>
      <SmoothScroll />
      <Header nav={nav} askAi={askAi} />
      {children}
      <Footer explore={explore} services={services} legal={legal} />
      <RevealObserver />
      <Cursor />
    </MotionProvider>
  );
}
