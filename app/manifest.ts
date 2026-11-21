import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brand,
    short_name: "HEALIX",
    description:
      "International patient coordination and communication services across contracted healthcare facilities in Türkiye.",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10283e",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
