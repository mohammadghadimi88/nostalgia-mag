import type { MetadataRoute } from "next";
import { articles, getAllTags, sections } from "@/lib/content";
import { topics } from "@/lib/topics";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nostalgia-mag.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/author/editorial`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/topic`, changeFrequency: "weekly", priority: 0.7 },
    ...topics.map((topic) => ({
      url: `${baseUrl}/topic/${topic.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),
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
      lastModified: article.updatedAt,
      changeFrequency: "weekly" as const,
      priority: article.featured ? 0.9 : 0.7
    }))
  ];
}
