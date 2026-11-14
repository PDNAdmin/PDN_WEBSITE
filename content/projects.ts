/**
 * Case studies (docs/09 `project`). REAL, client-approved work only.
 * Images are captured from the live sites into assets/clients/<slug>/ and processed by `pnpm assets`
 * (manifest ids `client:<slug>:desktop-hero`, `client:<slug>:mobile-hero`).
 */
export type Project = {
  slug: string;
  /** Client name, as they want to be named */
  client: string;
  /** Result-led headline: "[What changed] for [who]" (04 §4 writing guide) */
  headline: string;
  /** One real result, short. Leave "" if there's no number yet. */
  result: string;
  services: ("Website" | "Online store" | "AI agent" | "Digital product")[];
  industry: string;
  year: number;
  liveUrl: string;
  featured: boolean;
  order: number;
  /** Client confirmed in writing that PDN may show this project */
  permissionConfirmed: boolean;
};

export const projects: Project[] = [
  // Fill from the links PDN sends. Example shape (do not uncomment without a real, approved project):
  // { slug: "client-slug", client: "Client Name", headline: "A premium online store that finally matches the product.",
  //   result: "Launched in 3 weeks", services: ["Online store"], industry: "Fashion", year: 2026,
  //   liveUrl: "https://example.com", featured: true, order: 1, permissionConfirmed: true },
];

/** Projects that may appear publicly (approved), in display order. */
export const shownProjects = projects.filter((p) => p.permissionConfirmed).sort((a, b) => a.order - b.order);
export const featuredProjects = shownProjects.filter((p) => p.featured).slice(0, 6);
