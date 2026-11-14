import { settings } from "@/content/settings";

/** Show {{TOKEN}} pills everywhere except real production (Vercel production, or a local `next start`). */
export const SHOW_TOKENS: boolean =
  process.env.NEXT_PUBLIC_SHOW_TOKENS !== undefined
    ? process.env.NEXT_PUBLIC_SHOW_TOKENS === "true"
    : process.env.NEXT_PUBLIC_VERCEL_ENV
      ? process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
      : process.env.NODE_ENV !== "production";

/** Token → value. Empty string = unfilled. */
export const TOKENS: Record<string, string> = {
  PHONE: settings.phone,
  WHATSAPP: settings.whatsapp,
  EMAIL_PUBLIC: settings.emailPublic,
  ADDRESS: settings.address,
  DOMAIN: settings.domain,
  INSTAGRAM: settings.socials.instagram,
  LINKEDIN: settings.socials.linkedin,
  X: settings.socials.x,
  TIKTOK: settings.socials.tiktok,
  RESPONSE_TIME: settings.responseTime,
  DELIVERY_DAYS: settings.deliveryDays,
  GUARANTEE: settings.guarantee,
  STAT_PROJECTS: settings.stats.projects,
  STAT_CLIENTS: settings.stats.clients,
  STAT_COUNTRIES: settings.stats.countries,
  STAT_YEARS: settings.stats.years,
  PRICE_STARTER_NGN: settings.prices.starterNgn,
  PRICE_BUSINESS_NGN: settings.prices.businessNgn,
  PRICE_PREMIUM_NGN: settings.prices.premiumNgn,
  PRICE_STARTER_USD: settings.prices.starterUsd,
  PRICE_BUSINESS_USD: settings.prices.businessUsd,
  PRICE_PREMIUM_USD: settings.prices.premiumUsd,
};

export const TOKEN_RE = /\{\{([A-Z0-9_]+)\}\}/g;

export function tokensIn(s: string): string[] {
  return [...s.matchAll(TOKEN_RE)].map((m) => m[1]!);
}

export function isFilled(name: string): boolean {
  return Boolean(TOKENS[name]?.trim());
}

/** A sentence that depends on an empty token hides (04-copy conventions), unless pills are on. */
export function shouldRender(s: string): boolean {
  if (SHOW_TOKENS) return true;
  return tokensIn(s).every(isFilled);
}

/** Plain-text resolution (emails, attributes). Unfilled tokens resolve to "". */
export function resolvePlain(s: string): string {
  return s.replace(TOKEN_RE, (_, n: string) => TOKENS[n] ?? "");
}
