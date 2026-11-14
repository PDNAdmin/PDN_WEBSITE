import Image from "next/image";
import { HOME } from "@/content/copy";
import type { Client } from "@/content/clients";

/**
 * HOME.MARQUEE (Ramotion / Finsweet logo rows): real client logos, greyscale until hovered, drifting
 * slowly (CSS only, pauses on hover, static under reduced motion). Hidden below 4 real logos.
 */
export function LogoStrip({ clients, label }: { clients: Client[]; label?: string }) {
  if (clients.length < 4) return null;
  const row = [...clients, ...clients];
  return (
    <section aria-label={label ?? HOME.marquee.labelFallback} className="field-white pb-[clamp(56px,7vw,112px)]">
      <div className="wrap">
        <p className="kicker" /* taste-skill-ignore: marquee label is copy (docs/04 HOME.MARQUEE) */>{label ?? HOME.marquee.labelFallback}</p>
      </div>
      <div className="group mt-8 overflow-hidden">
        <ul className="flex w-max animate-[marquee_40s_linear_infinite] gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((c, i) => (
            <li key={`${c.name}-${i}`} aria-hidden={i >= clients.length} className="grid h-28 w-56 place-items-center bg-[var(--tone)] px-8">
              <Image src={c.logo} alt={c.name} width={160} height={56} unoptimized className="max-h-12 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
