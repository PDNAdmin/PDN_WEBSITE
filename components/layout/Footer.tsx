import Image from "next/image";
import { GLOBAL } from "@/content/copy";
import { Tok } from "@/components/ui/Rich";
import { ArrowUpRight, IconInstagram, IconLinkedin, IconTiktok, IconX } from "@/components/ui/icons";
import { SHOW_TOKENS, isFilled, resolvePlain } from "@/lib/tokens";
import { siteDomain } from "@/lib/site";
import { Picture } from "@/components/ui/Picture";
import credits from "@/found/credits.json";

type Link = { label: string; href: string };

/** Footer (docs/04 §1). Links to routes that aren't built yet are omitted (never a 404). */
export function Footer({ explore, services, legal }: { explore: Link[]; services: Link[]; legal: Link[] }) {
  const f = GLOBAL.footer;
  const year = new Date().getFullYear();
  const prompt = resolvePlain(f.askAi.prompt.replace("{{DOMAIN}}", isFilled("DOMAIN") ? "{{DOMAIN}}" : siteDomain()));
  const q = encodeURIComponent(prompt);
  const ai = [
    { label: f.askAi.buttons[0], href: `https://chatgpt.com/?q=${q}` },
    { label: f.askAi.buttons[1], href: `https://claude.ai/new?q=${q}` },
    { label: f.askAi.buttons[2], href: `https://www.perplexity.ai/search?q=${q}` },
  ];
  const talk = [
    { token: "PHONE", href: (v: string) => `tel:${v.replace(/[^\d+]/g, "")}` },
    { token: "WHATSAPP", label: f.talk.whatsappLabel, href: (v: string) => `https://wa.me/${v.replace(/\D/g, "")}` },
    { token: "EMAIL_PUBLIC", href: (v: string) => `mailto:${v}` },
    { token: "ADDRESS" },
  ].filter((t) => SHOW_TOKENS || isFilled(t.token));
  const socials = [
    { token: "INSTAGRAM", Icon: IconInstagram, name: "Instagram" },
    { token: "LINKEDIN", Icon: IconLinkedin, name: "LinkedIn" },
    { token: "X", Icon: IconX, name: "X" },
    { token: "TIKTOK", Icon: IconTiktok, name: "TikTok" },
  ];

  return (
    <footer className="field-black relative pb-28 md:pb-10">
      <Picture
        id="found:lagos-skyline-with-marina"
        alt="The Lagos Island skyline seen across the marina"
        sizes="100vw"
        className="block"
        imgClassName="block aspect-[16/7] w-full object-cover sm:aspect-[1920/512]"
        fallback={null}
      />
      <div className="wrap pt-[clamp(64px,8vw,120px)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="font-display max-w-[18ch] text-[clamp(2rem,1.2rem+2.4vw,3.5rem)] leading-[1] tracking-[-0.04em] text-gold">{f.brandLine}</p>
            <p className="mt-8 max-w-[44ch] text-[#d8d8d4]">{f.statement}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            {explore.length ? <Col title={f.explore.title} links={explore} /> : null}
            {services.length ? <Col title={f.services.title} links={services} /> : null}
            {talk.length ? (
              <div>
                <h2 className="font-semibold">{f.talk.title}</h2>
                <ul className="mt-5 space-y-3 text-[#d8d8d4]">
                  {talk.map((t) => {
                    const v = resolvePlain(`{{${t.token}}}`);
                    const content = t.label && v ? t.label : <Tok name={t.token} />;
                    return (
                      <li key={t.token}>
                        {v && t.href ? (
                          <a href={t.href(v)} className="link">
                            {content}
                          </a>
                        ) : (
                          <span>
                            {t.label && !v ? <>{t.label} </> : null}
                            {content}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {socials.map(({ token, Icon, name }) =>
                    isFilled(token) ? (
                      <li key={token}>
                        <a
                          href={resolvePlain(`{{${token}}}`)}
                          aria-label={name}
                          className="grid h-11 w-11 place-items-center bg-[var(--tone)] transition-colors hover:bg-gold hover:text-[#0a0a0a]"
                        >
                          <Icon size={20} />
                        </a>
                      </li>
                    ) : SHOW_TOKENS ? (
                      <li key={token}>
                        <Tok name={token} />
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center">
          <p className="text-[#d8d8d4]">{f.askAi.label}</p>
          <ul className="flex flex-wrap gap-2">
            {ai.map((a) => (
              <li key={a.label}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-1.5 bg-[var(--tone)] px-4 font-semibold transition-colors hover:bg-gold hover:text-[#0a0a0a]"
                >
                  {a.label}
                  <ArrowUpRight size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* OFF+BRAND: the name returns at full width. Official file, unaltered. */}
        <Image
          src="/brand/pdn-logo-horizontal-white.svg"
          alt="Pishon Digital Network"
          width={456}
          height={140}
          unoptimized
          className="mt-[clamp(64px,8vw,120px)] h-auto w-full"
        />

        <p className="mt-10 max-w-[90ch] text-small text-[var(--grey)]">
          {credits.map((c, i) => (
            <span key={c.ref}>
              {i ? " · " : "Photos: "}
              <a href={c.page} className="underline underline-offset-2 hover:text-white" rel="noopener" target="_blank">
                {c.title}
              </a>{" "}
              by {c.creator}, {c.license}, via {c.via}
            </span>
          ))}
        </p>
        <div className="mt-6 flex flex-col gap-3 text-small text-[var(--grey)] sm:flex-row sm:items-center sm:justify-between">
          <p>{f.copyright.replace("{year}", String(year))}</p>
          <p className="flex flex-wrap items-center gap-x-2">
            <span>{f.madeIn}</span>
            {legal.map((l) => (
              <span key={l.href} className="contents">
                <span aria-hidden="true">·</span>
                <a href={l.href} className="link">
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: Link[] }) {
  return (
    <div>
      <h2 className="font-semibold">{title}</h2>
      <ul className="mt-5 space-y-3 text-[#d8d8d4]">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="link !font-normal">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
