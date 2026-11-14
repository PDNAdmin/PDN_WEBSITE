/** Insights posts (docs/09 `post`), for /insights (round 4). */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "websites" | "ai" | "growth" | "case-notes";
  publishedAt: string; // ISO date
  readTime: number; // minutes
  cover?: string;
  author?: string;
};

export const posts: Post[] = [];
