import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Filtered views are near-duplicates of /jobs and would dilute it. */
      disallow: ["/jobs?", "/profile"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
