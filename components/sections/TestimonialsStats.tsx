"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import type { Testimonial } from "@/content/testimonials";
import { ArrowRight } from "@/components/ui/icons";

/**
 * HOME.PROOF. Ramotion's testimonial slider with a "1 / n" counter + Finsweet's arrow pair; swipe/drag on
 * phones (Motion). Stats count up once. Real testimonials (with photo + permission) and real numbers only:
 * the page only renders this when they exist.
 */
export function TestimonialsStats({
  eyebrow,
  headline,
  stats,
  testimonials,
  prev,
  next,
}: {
  eyebrow: string;
  headline: React.ReactNode;
  stats: { value: string; suffix: string; label: string }[];
  testimonials: Testimonial[];
  prev: string;
  next: string;
}) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const n = testimonials.length;
  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + n) % n);
  };
  const t = testimonials[i];

  return (
    <section aria-labelledby="proof-title" className="field-white section-y">
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
          <p className="kicker lg:col-span-3 lg:pt-3" /* taste-skill-ignore: copy eyebrow (docs/04) */>{eyebrow}</p>
          <h2 id="proof-title" className="font-display text-heading lg:col-span-9">
            {headline}
          </h2>
        </div>
        {stats.length >= 2 ? (
          <dl className="mt-14 grid grid-cols-2 gap-3 lg:ml-[calc(25%+0.5rem)] lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[var(--tone)] p-7">
                <dt className="text-[var(--grey)]">{s.label}</dt>
                <dd className="font-display mt-3 text-[clamp(2.5rem,1.6rem+2.6vw,4.5rem)] leading-none tracking-[-0.04em] tabular">
                  {s.value}
                  <span className="text-[#b8962a]">{s.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        {t ? (
          <div className="mt-14 bg-[#0a0a0a] p-7 text-white sm:p-12 lg:ml-[calc(25%+0.5rem)]">
            <div className="flex items-center justify-between">
              <p className="tabular text-[#9a9a95]" aria-live="polite">
                {i + 1} / {n}
              </p>
              {n > 1 ? (
                <div className="flex gap-2">
                  <button type="button" aria-label={prev} onClick={() => go(-1)} className="grid h-12 w-12 rotate-180 place-items-center bg-[#161616] hover:bg-[#d4af37] hover:text-[#0a0a0a]">
                    <ArrowRight size={20} />
                  </button>
                  <button type="button" aria-label={next} onClick={() => go(1)} className="grid h-12 w-12 place-items-center bg-[#d4af37] text-[#0a0a0a]">
                    <ArrowRight size={20} />
                  </button>
                </div>
              ) : null}
            </div>
            <div className="relative mt-10 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <m.figure
                  key={i}
                  custom={dir}
                  initial={{ x: dir * 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -dir * 60, opacity: 0 }}
                  drag={n > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                >
                  <blockquote className="text-[clamp(1.375rem,1rem+1.2vw,2.25rem)] font-medium leading-[1.25] tracking-[-0.02em]">“{t.quote}”</blockquote>
                  <figcaption className="mt-10 flex items-center gap-4">
                    <Image src={t.photo} alt="" width={56} height={56} unoptimized className="h-14 w-14 rounded-full object-cover" />
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-[#9a9a95]">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </m.figure>
              </AnimatePresence>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
