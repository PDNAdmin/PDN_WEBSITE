"use client";

import { useEffect, useId, useState } from "react";
import { setBusinessName, useBusinessNameRaw } from "@/lib/business-name";
import { SocialProfile, WebsiteMobile } from "@/components/ui/fragments";

/**
 * The live thing (docs/11): type your business name, see what customers see today
 * next to what PDN builds. Captions are verbatim copy (04: HOME.PAIN card 1, audience tab 1).
 */
export function SeeingDemo({
  inputLabel,
  todayCaption,
  todayWho,
  withCaption,
}: {
  inputLabel: string;
  todayCaption: string;
  todayWho: string;
  withCaption: string;
}) {
  const id = useId();
  const raw = useBusinessNameRaw();
  const [settled, setSettled] = useState(raw);

  // re-run the "build" animation once typing pauses, not on every key
  useEffect(() => {
    const t = setTimeout(() => setSettled(raw), 450);
    return () => clearTimeout(t);
  }, [raw]);

  return (
    <div className="field-black p-5 sm:p-8 lg:p-10">
      <label htmlFor={id} className="field-label !text-white">
        {inputLabel}
      </label>
      <input
        id={id}
        type="text"
        value={raw}
        onChange={(e) => setBusinessName(e.target.value)}
        autoComplete="organization"
        maxLength={40}
        className="input !h-14 !border-[#2c2c2c] !bg-[#0a0a0a] !text-[1.125rem] focus:!border-[#d4af37]"
      />
      <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-8 sm:gap-8">
        <figure>
          <div className="mx-auto max-w-[250px] opacity-90">
            <SocialProfile />
          </div>
          <figcaption className="mt-4 text-small text-[#d8d8d4]">
            {todayCaption}
            <span className="mt-1 block text-[#9a9a95]">{todayWho}</span>
          </figcaption>
        </figure>
        <figure>
          <div key={settled} className="mx-auto max-w-[250px] motion-safe:animate-[fade-up_600ms_var(--ease-out-expo)]">
            <WebsiteMobile />
          </div>
          <figcaption className="mt-4 text-small text-white">{withCaption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
