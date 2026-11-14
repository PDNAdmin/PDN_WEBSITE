/**
 * The "River" icon set (docs/02 §5). 24×24, 1.75 stroke (2 at ≥48px), round caps/joins, currentColor.
 * Each icon carries one small loop or a continuous curve from the mark's vocabulary.
 * Paths use pathLength="1" so parents can draw them (stroke-dasharray: 1).
 */
import type { SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number; title?: string };

function Svg({ size = 24, title, children, strokeWidth, ...rest }: IconProps & { children: React.ReactNode }) {
  const sw = strokeWidth ?? (size >= 48 ? 2 : 1.75);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const P = (d: string) => <path d={d} pathLength={1} />;

/** Horizontal line with a tiny loop before the arrowhead */
export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    {P("M3 12h8.2c2.1 0 3.1-1.3 2.7-2.5-.4-1.1-2.1-1.2-2.6 0-.5 1.4.8 2.5 3.1 2.5H21")}
    {P("M17.5 8.5 21 12l-3.5 3.5")}
  </Svg>
);

/** Diagonal stroke with a small loop at its tail */
export const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    {P("M4.5 19.5c1.7.2 3-1 2.4-2.3-.5-1-2-1.1-2.5 0-.5 1.1.6 2.2 2.2 1.6L18 7")}
    {P("M10 6.5h8.5V15")}
  </Svg>
);

/** Browser window; the address bar line runs out of the frame on the right */
export const IconWebsite = (p: IconProps) => (
  <Svg {...p}>
    {P("M20 12.5V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11")}
    {P("M4 9h10.5c1.6 0 2.4-1 2.1-2-.3-.9-1.6-1-2-.1-.5 1.1.5 2.1 2.2 2.1H23")}
  </Svg>
);

/** Chat bubble whose tail is a loop; three dots inside */
export const IconAgent = (p: IconProps) => (
  <Svg {...p}>
    {P("M8.2 17.5H17a3 3 0 0 0 3-3V7.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7c0 1.3.8 2.4 2 2.8-.4 1.2-1.8 1.7-2.4 1-.6-.8.4-1.9 1.6-1.6 1 .2 1.9.6 3 .8")}
    {P("M8.5 11h.01M12 11h.01M15.5 11h.01")}
  </Svg>
);

/** Stacked card/box; a single line wraps around it like a ribbon */
export const IconProduct = (p: IconProps) => (
  <Svg {...p}>
    {P("M12 3.5 19.5 7.5v9L12 20.5l-7.5-4v-9L12 3.5Z")}
    {P("M4.5 7.5 12 11.5l7.5-4M12 11.5v9")}
    {P("M1.5 13.5c3 .9 6.2 1.3 9 .5 1.6-.5 2.1-2 1.2-2.6-.8-.5-2 .2-1.6 1.2.6 1.6 5.3 1.5 12.4-.6")}
  </Svg>
);

/** An open book whose spine curls into a loop */
export const IconUniversity = (p: IconProps) => (
  <Svg {...p}>
    {P("M12 7.5C10 6 7 5.5 3.5 6v12c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V6C17 5.5 14 6 12 7.5Z")}
    {P("M12 19.5V7.5c0-2 1-3.5 2.2-3.3 1 .2 1.1 1.6.2 2-1 .5-2.4-.3-2.4-2.7")}
  </Svg>
);

/** Rising line with one loop mid-way, ending in an arrowhead */
export const IconGrowth = (p: IconProps) => (
  <Svg {...p}>
    {P("M3 19c3-1 5.5-3 7-5.5.9-1.5 2.6-1.4 2.8-.2.2 1.3-1.6 1.9-2.4.8C9.8 13 12 10 15 8.5L20.5 5")}
    {P("M15.5 4.5h5v5")}
  </Svg>
);

/** Magnifier whose handle is a flowing curve */
export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10" r="6" pathLength={1} />
    {P("M14.8 14.3c1.2 1.3 2.2 2.6 2.9 4 .6 1.3 1.8 2.2 3.3 2.2")}
  </Svg>
);

/** Shield; a check mark drawn as one stroke with a loop */
export const IconTrust = (p: IconProps) => (
  <Svg {...p}>
    {P("M12 3 19 5.8v5.4c0 4.4-2.9 8.1-7 9.8-4.1-1.7-7-5.4-7-9.8V5.8L12 3Z")}
    {P("M8.5 12.5c.8-.5 1.7-.3 2 .4.3.8-.5 1.4-1.1.9-.5-.4 0-1.1 1-.3l.9 1.3L15.5 9")}
  </Svg>
);

/** Smartphone outline; the home bar is a small loop */
export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" pathLength={1} />
    {P("M10 18.5h1.3c.9 0 1.5-.6 1.3-1.2-.2-.6-1-.6-1.2 0-.2.7.4 1.2 1.3 1.2H14")}
  </Svg>
);

/** Rounded speech bubble with a loop tail (generic, not the WhatsApp logo) */
export const IconChat = (p: IconProps) => (
  <Svg {...p}>
    {P("M7.5 19.2A8.5 8.5 0 1 0 4.4 15.8c.3 1.1-.3 2.4-1.3 2.4-.9 0-1.1-1.2-.2-1.6 1.2-.5 3.2.9 4.6 2.6Z")}
  </Svg>
);

/** Calendar with one date circled by a loop */
export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" pathLength={1} />
    {P("M3.5 9.5h17M8 3v4M16 3v4")}
    {P("M14.5 15.2c-.3-1.4-1.6-2.3-3-2-1.3.3-2 1.6-1.6 2.8.4 1.3 1.9 1.9 3.1 1.3 1-.5 1.6-1.6 1.7-2.7")}
  </Svg>
);

/** Globe whose meridian is the river curve */
export const IconGlobe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" pathLength={1} />
    {P("M3.5 12h17")}
    {P("M12 3.5c-2.5 2.3-3.4 5.5-2.4 8 .5 1.3 2 1.4 2.4.4.4-1-.8-1.8-1.7-.9-1.6 1.6-.4 5.8 1.7 9.5")}
  </Svg>
);

/** Gauge; the needle's base is a loop */
export const IconSpeed = (p: IconProps) => (
  <Svg {...p}>
    {P("M4.2 17.5a8.5 8.5 0 1 1 15.6 0")}
    {P("M16.5 9 12.9 13.1c-.6.7-1.7.8-2.2.1-.5-.7 0-1.6.8-1.6.9 0 1.4 1.1.6 2")}
  </Svg>
);

/** < / > with the slash as a flowing S-curve */
export const IconCode = (p: IconProps) => (
  <Svg {...p}>
    {P("M7.5 7.5 3 12l4.5 4.5M16.5 7.5 21 12l-4.5 4.5")}
    {P("M14 4.5c-2 2-1 4.5 0 6.5s1 4.5-2 8.5")}
  </Svg>
);

/** Pen nib; the ink line trails into a loop */
export const IconDesign = (p: IconProps) => (
  <Svg {...p}>
    {P("M15.5 3.5 20.5 8.5 12 17l-5 .5.5-5L15.5 3.5Z")}
    {P("M7 17.5c-1.2 1-2.6 1.2-3 .4-.4-.9.8-1.6 1.6-.9.8.7.1 2.4-2.1 3.5")}
  </Svg>
);

/** Two nodes joined by the double-loop "network" curve */
export const IconAutomation = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="4.5" cy="12" r="2" pathLength={1} />
    <circle cx="19.5" cy="12" r="2" pathLength={1} />
    {P("M6.5 12c1.5 0 2.5-1.8 3.6-1.5 1.2.4.6 2.4-.6 2-1-.3.2-2.5 2.5-.5 2.3 2 3.5-.5 2.5-.8-1.2-.3-1.8 1.6-.6 2 1.1.3 2.1-1.2 3.6-1.2")}
  </Svg>
);

/** Two interlocking loops (from the network symbol) */
export const IconPartner = (p: IconProps) => (
  <Svg {...p}>
    {P("M12 12c-1.8-2.5-4-4-6-3.4-1.8.5-2.6 2.4-2 4 .7 1.9 3 2.4 5 1.4C10.5 13 11.3 12.6 12 12Zm0 0c1.8 2.5 4 4 6 3.4 1.8-.5 2.6-2.4 2-4-.7-1.9-3-2.4-5-1.4-1.5.9-2.3 1.4-3 2Z")}
  </Svg>
);

/** Triangle inside a circle drawn as an open loop */
export const IconPlay = (p: IconProps) => (
  <Svg {...p}>
    {P("M20.2 9.5A8.5 8.5 0 1 1 16 4.6c1.2.7 2.3.1 2.2-.8-.1-.8-1.3-.9-1.6 0")}
    {P("M10 8.5v7l5.5-3.5L10 8.5Z")}
  </Svg>
);

export const IconPlus = (p: IconProps) => <Svg {...p}>{P("M12 5v14M5 12h14")}</Svg>;
export const IconClose = (p: IconProps) => <Svg {...p}>{P("M6 6l12 12M18 6 6 18")}</Svg>;
export const IconMenu = (p: IconProps) => <Svg {...p}>{P("M4 8h16M4 16h10")}</Svg>;
export const IconCheck = (p: IconProps) => <Svg {...p}>{P("M5 12.5 10 17.5 19 7")}</Svg>;
export const IconStar = (p: IconProps) => (
  <Svg {...p}>{P("M12 3.8 14.5 9l5.6.6-4.2 3.8 1.2 5.5L12 16.1 6.9 18.9l1.2-5.5L3.9 9.6 9.5 9 12 3.8Z")}</Svg>
);

/* Social (generic outline glyphs) */
export const IconInstagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" pathLength={1} />
    <circle cx="12" cy="12" r="4" pathLength={1} />
    {P("M17 7h.01")}
  </Svg>
);
export const IconLinkedin = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" pathLength={1} />
    {P("M8 10.5V16M8 7.8h.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16")}
  </Svg>
);
export const IconX = (p: IconProps) => <Svg {...p}>{P("M4.5 4.5 19.5 19.5M19.5 4.5 4.5 19.5")}</Svg>;
export const IconTiktok = (p: IconProps) => (
  <Svg {...p}>{P("M13.5 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3M13.5 3.5c.4 2.6 2.3 4.4 5 4.5")}</Svg>
);

export const ICONS = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  website: IconWebsite,
  agent: IconAgent,
  product: IconProduct,
  university: IconUniversity,
  growth: IconGrowth,
  search: IconSearch,
  trust: IconTrust,
  phone: IconPhone,
  chat: IconChat,
  calendar: IconCalendar,
  globe: IconGlobe,
  speed: IconSpeed,
  code: IconCode,
  design: IconDesign,
  automation: IconAutomation,
  partner: IconPartner,
  play: IconPlay,
  plus: IconPlus,
  close: IconClose,
  menu: IconMenu,
  check: IconCheck,
  star: IconStar,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...p }: IconProps & { name: IconName }) {
  const C = ICONS[name];
  return <C {...p} />;
}
