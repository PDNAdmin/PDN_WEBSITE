/** Digital University products (docs/09 `product`), for /digital-university (round 4). */
export type Product = {
  slug: string;
  title: string;
  format: "course" | "template" | "ebook" | "toolkit" | "live";
  price: string; // e.g. "₦25,000" or "Free"
  status: "available" | "coming-soon";
  externalUrl?: string;
  cover?: string;
  order: number;
};

export const products: Product[] = [];
