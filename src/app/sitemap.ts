import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { servicePages } from "@/content/service-pages";

const lastModified = new Date("2026-09-17");

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceEntries = Object.values(servicePages)
    .filter((page) => page.visible)
    .map((page) => ({
      url: `${site.url}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page.slug === "ifm-services" ? 0.9 : 0.8,
    }));

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/careers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...serviceEntries,
  ];
}
