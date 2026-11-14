import { settings } from "@/content/settings";

/** {{DOMAIN}} → absolute site URL. Until the domain is bought, the Vercel URL. */
export function siteUrl(): string {
  if (settings.domain) return `https://${settings.domain.replace(/^https?:\/\//, "")}`;
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod && process.env.VERCEL_ENV === "production") return `https://${prod}`;
  const url = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
  if (url) return `https://${url}`;
  return "http://localhost:3000";
}

/** Bare domain for display / prompts (no protocol). */
export function siteDomain(): string {
  return siteUrl().replace(/^https?:\/\//, "");
}

export const isProductionDeploy = process.env.VERCEL_ENV === "production";

/** Phase flags: which routes exist yet. Links to unbuilt routes are hidden, never 404. */
export const LIVE = {
  work: false,
  services: false,
  aiAgents: false,
  about: false,
  insights: false,
  digitalUniversity: false,
  book: false,
  privacy: false,
  terms: false,
} as const;
