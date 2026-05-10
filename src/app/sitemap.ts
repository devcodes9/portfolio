import { getContentSlugs } from "@/lib/content";
import type { MetadataRoute } from "next";

const BASE_URL = "https://devdalia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const writingSlugs = getContentSlugs("writing");
  const workSlugs = getContentSlugs("work");
  const notesSlugs = getContentSlugs("notes");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/oss`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const writingRoutes = writingSlugs.map((slug) => ({
    url: `${BASE_URL}/writing/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workRoutes = workSlugs.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const notesRoutes = notesSlugs.map((slug) => ({
    url: `${BASE_URL}/notes/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...writingRoutes, ...workRoutes, ...notesRoutes];
}
