import { HOME } from "@/content/copy";
import type { Project } from "@/content/projects";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";
import { SplitWords } from "@/components/motion/SplitWords";
import { MediaDistort } from "@/components/webgl/MediaDistort";
import { WorkLabel } from "./WorkLabel";

/**
 * HOME.WORK (#work). Koto: "Selected work" holds on the left and its second line becomes the client
 * whose project is on screen; large media tiles scroll on the right with the WebGL hover ripple.
 * Clay: client + one real result under each tile. Real, approved projects only (content/projects.ts).
 */
export function WorkStack({ projects, allWorkHref }: { projects: Project[]; allWorkHref?: string }) {
  const c = HOME.work;
  if (!projects.length) return null;
  return (
    <section id="work" aria-labelledby="work-title" className="field-white section-y">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
            <p className="kicker" /* taste-skill-ignore: copy eyebrow (docs/04) */>{c.eyebrow}</p>
            <h2 id="work-title" data-reveal="split" className="font-display mt-4 text-heading">
              <SplitWords text={c.headline} />
            </h2>
            <WorkLabel names={projects.map((p) => p.client)} ids={projects.map((p) => `work-${p.slug}`)} />
            <p className="mt-6 max-w-[40ch] text-[1.125rem] text-[var(--grey)]">{c.lead}</p>
            {allWorkHref ? (
              <div className="mt-8">
                <Button href={allWorkHref} variant="link">
                  {c.link}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        <ul className="space-y-16 lg:col-span-8 lg:space-y-24">
          {projects.map((p) => (
            <li key={p.slug} id={`work-${p.slug}`} data-reveal>
              <a href={p.liveUrl} target="_blank" rel="noopener" data-cursor="view" className="group block">
                <MediaDistort className="aspect-[16/10] bg-[var(--tone)]">
                  <Picture
                    id={`client:${p.slug}:desktop-hero`}
                    alt={`${p.client} website, homepage`}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="block h-full w-full"
                    imgClassName="h-full w-full object-cover object-top transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03]"
                    fallback={<div className="grid h-full place-items-center text-[var(--grey)]">{p.client}</div>}
                  />
                </MediaDistort>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-small text-[var(--grey)]">{p.services.join(" · ")}</p>
                    <h3 className="mt-1 text-statement font-semibold">{p.client}</h3>
                    {p.result ? <p className="mt-1 text-[var(--grey)]">{p.result}</p> : null}
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center bg-[#0a0a0a] text-[#d4af37] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
