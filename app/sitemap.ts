import type { MetadataRoute } from "next";
import { articles, getAllTags, sections } from "@/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nostalgia-mag.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    ...sections.map((section) => ({
      url: `${baseUrl}/${section.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8
    })),
    ...getAllTags().map((tag) => ({
      url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/article/${article.slug}`,
      changeFrequency: "weekly" as const,
      priority: article.featured ? 0.9 : 0.7
    }))
  ];
}
