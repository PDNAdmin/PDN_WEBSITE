import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pishon Digital Network",
    short_name: "PDN",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f10",
    theme_color: "#0f0f10",
    icons: [
      { src: "/brand/png/pdn-favicon-180.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/png/pdn-favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
