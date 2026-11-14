import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  // Phase 1: Home only. Add routes as they ship (thank-you is noindex).
  return [{ url: `${base}/`, changeFrequency: "weekly", priority: 1 }];
}
