"use client";

/**
 * Interface fragments: the page's pictures (docs/11). Each one is a piece of what PDN actually builds,
 * drawn in code and filled with the visitor's own business name. `data-ui` marks them as product UI.
 * Inner text is sample interface content, not marketing copy.
 */
import type { ReactNode } from "react";
import { handle, initials, useBusinessName } from "@/lib/business-name";

const slug = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbusiness";

export function Phone({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div
      data-ui
      role={label ? "img" : undefined}
      aria-label={label}
      className={`relative aspect-[9/19] w-full rounded-[2.2rem] bg-[#0a0a0a] p-[7px] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-white text-[#0a0a0a]">
        <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-[#0a0a0a]" />
        {children}
      </div>
    </div>
  );
}

function StatusBar({ dark = false, time = "9:41" }: { dark?: boolean; time?: string }) {
  return (
    <div className={`flex items-center justify-between px-5 pt-2.5 text-[10px] font-semibold ${dark ? "text-white" : "text-[#0a0a0a]"}`}>
      <span className="tabular">{time}</span>
      <span className="flex items-center gap-1" aria-hidden="true">
        <span className="h-[7px] w-[11px] rounded-[2px] border border-current" />
      </span>
    </div>
  );
}

/** "Today": the link-in-bio profile most businesses send customers to. */
export function SocialProfile() {
  const name = useBusinessName();
  return (
    <Phone label={`${name} today: a social profile with a link in bio`}>
      <StatusBar />
      <div className="px-4 pt-5">
        <p className="text-center text-[11px] font-semibold">{handle(name)}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e7e7e4] text-[13px] font-bold text-[#6e6e6a]">
            {initials(name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold">{name}</p>
            <p className="text-[10px] leading-snug text-[#6e6e6a]">DM to order · Prices in DM</p>
            <p className="text-[10px] text-[#6e6e6a]">Link in bio</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <span className="rounded-md bg-[#efefec] py-1.5 text-center text-[10px] font-semibold">Message</span>
          <span className="rounded-md bg-[#efefec] py-1.5 text-center text-[10px] font-semibold">Follow</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-[3px]">
          {["#d9d6cf", "#c9c4ba", "#e4e1da", "#bdb8ad", "#dcd8d0", "#cfcac0", "#e8e5df", "#c4bfb4", "#d6d2ca"].map((c, i) => (
            <span key={i} className="aspect-square" style={{ background: c }} />
          ))}
        </div>
        <div className="mt-3 rounded-md bg-[#f4f4f2] p-2.5 text-[9.5px] leading-snug text-[#6e6e6a]">
          <span className="font-semibold text-[#0a0a0a]">How much is this?</span> · seen
        </div>
      </div>
    </Phone>
  );
}

/** "With PDN": the same business as a proper mobile website. */
export function WebsiteMobile() {
  const name = useBusinessName();
  return (
    <Phone label={`${name} with PDN: a mobile website with WhatsApp ordering`}>
      <div className="flex h-full flex-col bg-[#0a0a0a] text-white">
        <StatusBar dark />
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold">
            <span className="grid h-5 w-5 shrink-0 place-items-center bg-[#d4af37] text-[8px] font-bold text-[#0a0a0a]">{initials(name)}</span>
            <span className="truncate">{name}</span>
          </span>
          <span className="flex flex-col gap-[3px]" aria-hidden="true">
            <span className="h-[1.5px] w-3.5 bg-white" />
            <span className="h-[1.5px] w-2.5 bg-white" />
          </span>
        </div>
        <div className="px-4 pt-7">
          <p className="break-words text-[25px] font-semibold leading-[0.95] tracking-[-0.04em]">{name}</p>
          <p className="mt-2 text-[10.5px] leading-snug text-[#b5b5b0]">Order today. Delivered across Lagos.</p>
          <div className="mt-4 flex flex-col gap-1.5">
            <span className="flex items-center justify-between bg-[#d4af37] px-3 py-2 text-[10.5px] font-semibold text-[#0a0a0a]">
              Order on WhatsApp <span aria-hidden="true">→</span>
            </span>
            <span className="bg-[#1d1d1d] px-3 py-2 text-[10.5px] font-semibold">Book a call</span>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-[3px] p-[3px]">
          <div className="grid aspect-square place-items-center bg-[#d4af37] text-[30px] font-bold tracking-[-0.06em] text-[#0a0a0a]">
            {initials(name)}
          </div>
          <div className="flex aspect-square flex-col justify-between bg-white p-2.5 text-[#0a0a0a]">
            <span className="text-[9px] text-[#6e6e6a]">Open now</span>
            <span className="text-[10.5px] font-semibold leading-tight">Delivery across Lagos, same day</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

/** Trust: the desktop website. */
export function WebsiteDesktop() {
  const name = useBusinessName();
  return (
    <div data-ui role="img" aria-label={`${name} website on a laptop`} className="w-full overflow-hidden rounded-xl bg-white text-[#0a0a0a]">
      <div className="flex items-center gap-2 bg-[#ececea] px-3 py-2">
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#c9c9c5]" />
          <span className="h-2 w-2 rounded-full bg-[#c9c9c5]" />
          <span className="h-2 w-2 rounded-full bg-[#c9c9c5]" />
        </span>
        <span className="mx-auto truncate rounded bg-white px-3 py-0.5 text-[10px] text-[#6e6e6a]">{slug(name)}.com</span>
      </div>
      <div className="flex items-center justify-between px-[5%] py-3 text-[11px]">
        <span className="flex items-center gap-2 font-semibold">
          <span className="grid h-6 w-6 place-items-center bg-[#0a0a0a] text-[9px] font-bold text-[#d4af37]">{initials(name)}</span>
          {name}
        </span>
        <span className="hidden gap-5 text-[#6e6e6a] sm:flex">
          <span>Shop</span>
          <span>About</span>
          <span>Delivery</span>
        </span>
        <span className="bg-[#d4af37] px-2.5 py-1 font-semibold">Order now</span>
      </div>
      <div className="grid grid-cols-5 gap-[3px] px-[5%] pb-[5%]">
        <div className="col-span-3 flex flex-col justify-end bg-[#0a0a0a] p-[6%] text-white">
          <p className="text-[clamp(1.25rem,3.2vw,2.6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">{name}</p>
          <p className="mt-3 max-w-[30ch] text-[11px] leading-snug text-[#b5b5b0]">Order today. Delivered across Lagos. Pay on delivery or by transfer.</p>
          <span className="mt-4 w-fit bg-[#d4af37] px-3 py-1.5 text-[11px] font-semibold text-[#0a0a0a]">Order on WhatsApp →</span>
        </div>
        <div className="col-span-2 grid gap-[3px]">
          <div className="grid aspect-[4/3] place-items-center bg-[#d4af37] text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.06em]">
            {initials(name)}
          </div>
          <div className="grid grid-cols-2 gap-[3px] text-[10px]">
            <div className="bg-[#f3f3f1] p-2.5">
              <p className="text-[#6e6e6a]">Open daily</p>
              <p className="font-semibold">9am to 8pm</p>
            </div>
            <div className="bg-[#f3f3f1] p-2.5">
              <p className="text-[#6e6e6a]">Delivery</p>
              <p className="font-semibold">Same day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Found: the business profile on a map search. No invented ratings. */
export function MapsCard() {
  const name = useBusinessName();
  return (
    <div data-ui role="img" aria-label={`${name} found on a map search`} className="w-full overflow-hidden rounded-xl bg-white text-[#0a0a0a]">
      <div className="p-3">
        <div className="flex items-center gap-2 rounded-full bg-[#f1f1ef] px-3.5 py-2 text-[11px]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6e6e6a" strokeWidth="2.5" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" strokeLinecap="round" />
          </svg>
          <span className="truncate">{name} near me</span>
        </div>
      </div>
      <svg viewBox="0 0 400 190" className="block h-auto w-full bg-[#eeede9]" aria-hidden="true">
        <path d="M-10 150 C80 120 140 160 220 120 S360 70 420 90" stroke="#ffffff" strokeWidth="14" fill="none" />
        <path d="M60 -10 L110 200" stroke="#ffffff" strokeWidth="10" />
        <path d="M250 -10 C240 60 300 120 290 200" stroke="#ffffff" strokeWidth="9" fill="none" />
        <path d="M-10 60 L420 40" stroke="#ffffff" strokeWidth="6" />
        <path d="M150 -10 L170 200 M330 -10 L360 200" stroke="#fbfbf9" strokeWidth="4" />
        <rect x="300" y="120" width="80" height="60" fill="#dfe4d8" />
        <g transform="translate(200 96)">
          <path d="M0 -34 C-15 -34 -24 -22 -24 -10 C-24 8 0 26 0 26 C0 26 24 8 24 -10 C24 -22 15 -34 0 -34Z" fill="#0a0a0a" />
          <circle cx="0" cy="-11" r="8" fill="#d4af37" />
        </g>
      </svg>
      <div className="p-4">
        <p className="text-[15px] font-semibold leading-tight">{name}</p>
        <p className="mt-0.5 text-[11px] text-[#6e6e6a]">Lagos · Open · Closes 8 pm</p>
        <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[10px] font-semibold">
          {["Call", "Directions", "Website", "WhatsApp"].map((a, i) => (
            <span key={a} className={`py-2 ${i === 2 ? "bg-[#d4af37]" : "bg-[#f1f1ef]"}`}>
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Paid: the lock screen at 11pm, enquiries arriving while you sleep. */
export function LockScreen() {
  const name = useBusinessName();
  const notes = [
    { app: "WhatsApp", time: "23:04", title: "New message", body: "Hi, do you have chocolate cakes for this Saturday?" },
    { app: `${name} · AI agent`, time: "23:04", title: "Replied", body: "Yes, we do. We have 8-inch and 10-inch chocolate cakes for Saturday." },
    { app: `${slug(name)}.com`, time: "23:06", title: "New booking request", body: "Saturday delivery to Lekki, 10am to 4pm." },
  ];
  return (
    <Phone label={`Enquiries for ${name} arriving at 11pm`} className="!bg-[#0a0a0a]">
      <div className="flex h-full flex-col bg-[#141414] text-white">
        <StatusBar dark time="23:06" />
        <div className="pt-6 text-center">
          <p className="text-[11px] text-[#b5b5b0]">Saturday</p>
          <p className="text-[46px] font-semibold leading-none tracking-[-0.04em] tabular">23:06</p>
        </div>
        <div className="mt-6 space-y-1.5 px-2.5">
          {notes.map((n) => (
            <div key={n.title} className="rounded-2xl bg-[#262626] p-2.5">
              <div className="flex items-center justify-between text-[9px] text-[#b5b5b0]">
                <span className="truncate font-semibold">{n.app}</span>
                <span className="tabular">{n.time}</span>
              </div>
              <p className="mt-0.5 text-[10.5px] font-semibold">{n.title}</p>
              <p className="text-[10px] leading-snug text-[#d8d8d4]">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

/** AI Agents: the chat (messages passed in from copy, 04 §6). */
export function AgentChat({ label, messages }: { label: string; messages: readonly { from: string; text: string }[] }) {
  const name = useBusinessName();
  return (
    <Phone label={`${name} AI agent answering a customer`}>
      <div className="flex h-full flex-col bg-[#f4f4f2]">
        <StatusBar />
        <div className="flex items-center gap-2 bg-white px-4 py-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0a0a0a] text-[9px] font-bold text-[#d4af37]">{initials(name)}</span>
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-semibold">{name}</span>
            <span className="block text-[9px] text-[#3f7d4f]">AI agent · online</span>
          </span>
        </div>
        <p className="px-4 pt-3 text-center text-[9px] text-[#6e6e6a]">{label}</p>
        <div className="flex-1 space-y-1.5 overflow-hidden px-3 py-2">
          {messages.map((msg, i) => (
            <p
              key={i}
              className={`max-w-[84%] rounded-2xl px-3 py-2 text-[10px] leading-snug ${
                msg.from === "agent" ? "bg-white text-[#0a0a0a]" : "ml-auto bg-[#0a0a0a] text-white"
              }`}
            >
              {msg.text}
            </p>
          ))}
        </div>
      </div>
    </Phone>
  );
}

/** Digital Products: a booking app screen. */
export function BookingApp() {
  const name = useBusinessName();
  const slots = ["9:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
  return (
    <Phone label={`${name} booking app`}>
      <div className="flex h-full flex-col bg-white">
        <StatusBar />
        <div className="px-4 pt-4">
          <p className="text-[10px] text-[#6e6e6a]">{name}</p>
          <p className="text-[18px] font-semibold leading-tight tracking-[-0.03em]">Book an appointment</p>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 px-4 text-center text-[9px]">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="text-[#6e6e6a]">
              {d}
            </span>
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className={`grid aspect-square place-items-center rounded-md ${i === 9 ? "bg-[#0a0a0a] font-semibold text-white" : "bg-[#f3f3f1]"}`}>
              {i + 10}
            </span>
          ))}
        </div>
        <p className="px-4 pt-4 text-[10px] font-semibold">Saturday 19</p>
        <div className="grid grid-cols-3 gap-1.5 px-4 pt-2">
          {slots.map((s, i) => (
            <span key={s} className={`rounded-md py-2 text-center text-[10px] font-semibold ${i === 2 ? "bg-[#d4af37]" : "bg-[#f3f3f1]"}`}>
              {s}
            </span>
          ))}
        </div>
        <span className="mx-4 mt-auto mb-5 rounded-md bg-[#0a0a0a] py-2.5 text-center text-[10.5px] font-semibold text-white">Confirm 12:00</span>
      </div>
    </Phone>
  );
}

/** Digital University: a course screen. */
export function CourseScreen() {
  const lessons = [
    { t: "Set up your Google Business profile", d: "12 min", done: true },
    { t: "Write a homepage that sells", d: "18 min", done: true },
    { t: "Take product photos on your phone", d: "15 min", done: false },
    { t: "Get your first 10 reviews", d: "10 min", done: false },
  ];
  return (
    <Phone label="A Digital University course on a phone">
      <div className="flex h-full flex-col bg-[#0a0a0a] text-white">
        <StatusBar dark />
        <div className="px-4 pt-4">
          <p className="text-[10px] text-[#9a9a95]">Digital University</p>
          <p className="text-[17px] font-semibold leading-tight tracking-[-0.03em]">Get found online</p>
          <div className="mt-3 h-1.5 bg-[#262626]">
            <div className="h-full w-1/2 bg-[#d4af37]" />
          </div>
          <p className="mt-1.5 text-[9px] text-[#9a9a95]">2 of 4 lessons</p>
        </div>
        <ul className="mt-4 space-y-1.5 px-3">
          {lessons.map((l) => (
            <li key={l.t} className="flex items-center gap-2.5 rounded-xl bg-[#161616] p-2.5">
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] ${l.done ? "bg-[#d4af37] text-[#0a0a0a]" : "bg-[#262626]"}`}>
                {l.done ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5 10 17.5 19 7" />
                  </svg>
                ) : null}
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold leading-snug">{l.t}</span>
                <span className="block text-[9px] text-[#9a9a95]">{l.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Phone>
  );
}
