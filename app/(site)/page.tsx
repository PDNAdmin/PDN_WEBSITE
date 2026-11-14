import type { Metadata } from "next";
import { HOME, META } from "@/content/copy";
import { settings, showreel } from "@/content/settings";
import { featuredProjects } from "@/content/projects";
import { stripClients } from "@/content/clients";
import { shownTestimonials } from "@/content/testimonials";
import { HeroHome } from "@/components/sections/HeroHome";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { PainSection } from "@/components/sections/PainSection";
import { ShowreelBlock } from "@/components/sections/ShowreelBlock";
import { OutcomesSection } from "@/components/sections/OutcomesSection";
import { WorkStack } from "@/components/sections/WorkStack";
import { AudienceList } from "@/components/sections/AudienceList";
import { ServicesStrip } from "@/components/sections/ServicesStrip";
import { TestimonialsStats } from "@/components/sections/TestimonialsStats";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Pricing } from "@/components/sections/Pricing";
import { PromiseBand } from "@/components/sections/PromiseBand";
import { FAQ } from "@/components/sections/FAQ";
import { BookingSection } from "@/components/sections/BookingSection";
import { CloserStatement } from "@/components/sections/CloserStatement";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { PreviewNote } from "@/components/layout/PreviewNote";
import { rich } from "@/components/ui/Rich";
import { TOKENS, isFilled } from "@/lib/tokens";
import { LIVE, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: META.home.title },
  description: META.home.description,
  alternates: { canonical: "/" },
  openGraph: { title: META.home.title, description: META.home.description, url: "/" },
};

/**
 * Home (docs/13 sitemap, docs/11 direction). Conversion arc: hook → pain → proof → offer → book.
 * Sections that need real material (logos, showreel, work, proof) render only when it exists;
 * on preview builds a note marks where they will appear.
 */
export default function HomePage() {
  const stats = HOME.proof.stats
    .filter((s) => isFilled(s.token))
    .map((s) => ({ value: TOKENS[s.token]!, suffix: s.suffix, label: s.label }));
  const showProof = stats.length >= 2 || shownTestimonials.length > 0;
  const showWork = featuredProjects.length > 0;

  return (
    <>
      <main id="main">
        <JsonLd />
        <HeroHome showWork={showWork} workHref="#work" />

        {stripClients.length >= 4 ? (
          <LogoStrip clients={stripClients} />
        ) : (
          <div className="field-white">
            <PreviewNote id="HOME.MARQUEE" reason="appears with 4+ real client logos (content/clients.ts)." />
          </div>
        )}

        <PainSection />

        {showreel.ready ? (
          <ShowreelBlock
            src={showreel.loop}
            srcWebm={showreel.loopWebm}
            srcMobile={showreel.loopMobile}
            full={showreel.full}
            poster={showreel.poster}
            caption={HOME.showreel.caption}
            labels={{ play: HOME.showreel.cursor, close: HOME.showreel.close }}
          />
        ) : (
          <div className="field-black pt-10">
            <PreviewNote id="HOME.SHOWREEL" reason="appears when the reel cut from PDN's client recordings exists (docs/12)." />
          </div>
        )}

        <OutcomesSection />

        {showWork ? (
          <WorkStack projects={featuredProjects} allWorkHref={LIVE.work ? "/work" : undefined} />
        ) : (
          <div className="field-white pt-10">
            <PreviewNote id="HOME.WORK" reason="appears with PDN's real, approved projects (content/projects.ts). Send the links." />
          </div>
        )}

        <AudienceList />
        <ServicesStrip />

        {showProof ? (
          <TestimonialsStats
            eyebrow={HOME.proof.eyebrow}
            headline={rich(HOME.proof.headline)}
            stats={stats}
            testimonials={shownTestimonials}
            prev={HOME.proof.prev}
            next={HOME.proof.next}
          />
        ) : (
          <div className="field-white pt-10">
            <PreviewNote id="HOME.PROOF" reason="appears with 2+ real stats or real testimonials (content/testimonials.ts)." />
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
