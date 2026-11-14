import type { Metadata } from "next";
import { HOME, META } from "@/content/copy";
import { realContent, settings } from "@/content/settings";
import { HeroHome } from "@/components/sections/HeroHome";
import { PainSection } from "@/components/sections/PainSection";
import { OutcomesSection } from "@/components/sections/OutcomesSection";
import { AudienceList } from "@/components/sections/AudienceList";
import { ServicesStrip } from "@/components/sections/ServicesStrip";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Pricing } from "@/components/sections/Pricing";
import { PromiseBand } from "@/components/sections/PromiseBand";
import { FAQ } from "@/components/sections/FAQ";
import { BookingSection } from "@/components/sections/BookingSection";
import { CloserStatement } from "@/components/sections/CloserStatement";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { PreviewNote } from "@/components/layout/PreviewNote";
import { isFilled } from "@/lib/tokens";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: META.home.title },
  description: META.home.description,
  alternates: { canonical: "/" },
  openGraph: { title: META.home.title, description: META.home.description, url: "/" },
};

/** Home (docs/03 §3 order, docs/11 direction). White, black and one gold field alternate. */
export default function HomePage() {
  const showMarquee = realContent.clientLogos.length >= 4;
  const showWork = realContent.featuredProjects.length >= 3;
  const statsFilled = HOME.proof.stats.filter((s) => isFilled(s.token)).length;
  const showProof = statsFilled >= 2 || realContent.testimonials.length > 0;

  return (
    <>
      <main id="main">
        <JsonLd />
        <HeroHome showWork={showWork} workHref="#work" />
        {showMarquee ? null : (
          <div className="field-white">
            <PreviewNote id="HOME.MARQUEE" reason="needs at least 4 real client logos (assets/clients/<slug>/logo.svg)." />
          </div>
        )}
        <PainSection />
        {realContent.showreel ? null : (
          <div className="field-black pt-10">
            <PreviewNote id="HOME.SHOWREEL" reason="waits for the real Koto-style showreel cut from client screen recordings (docs/12). Phase 3." />
          </div>
        )}
        <OutcomesSection />
        <AudienceList />
        {showWork ? null : (
          <div className="field-white">
            <PreviewNote id="HOME.WORK" reason="needs 3+ real, approved case studies. The hero's “See our work” button is hidden until then." />
          </div>
        )}
        <ServicesStrip />
        {showProof ? null : (
          <div className="field-white pt-10">
            <PreviewNote id="HOME.PROOF" reason="needs 2+ real stats or real testimonials with photo and permission." />
          </div>
        )}
        <ProcessSteps />
        <Pricing />
        <PromiseBand />
        <FAQ />
        <BookingSection />
        <CloserStatement />
      </main>
      <MobileCTA href="#book" />
    </>
  );
}

/** Organization schema (docs/04 §13). Only real, filled values. */
function JsonLd() {
  const url = siteUrl();
  const sameAs = Object.values(settings.socials).filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pishon Digital Network",
    alternateName: "PDN",
    url,
    logo: `${url}/brand/png/pdn-favicon-512.png`,
    slogan: "Because the future belongs to businesses built for it.",
  };
  if (sameAs.length) data.sameAs = sameAs;
  if (settings.phone) data.contactPoint = { "@type": "ContactPoint", telephone: settings.phone, contactType: "sales" };
  if (settings.address)
    data.address = { "@type": "PostalAddress", streetAddress: settings.address, addressLocality: "Lagos", addressCountry: "NG" };
  if (settings.emailPublic) data.email = settings.emailPublic;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
