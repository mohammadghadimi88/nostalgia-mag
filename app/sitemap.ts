import type { MetadataRoute } from "next";
import { articles, getAllTags, sections } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    ...sections.map((section) => ({
      url: `${siteUrl}/${section.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8
    })),
    ...getAllTags().map((tag) => ({
      url: `${siteUrl}/tag/${encodeURIComponent(tag)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/article/${article.slug}`,
      changeFrequency: "weekly" as const,
      priority: article.featured ? 0.9 : 0.7
    }))
  ];
}
