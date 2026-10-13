import type { MetadataRoute } from "next";
import { articles, getAllTags, sections } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { topics } from "@/lib/topics";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/author/editorial"), changeFrequency: "weekly", priority: 0.5 },
    { url: absoluteUrl("/topic"), changeFrequency: "weekly", priority: 0.7 },
    ...topics.map((topic) => ({
      url: absoluteUrl(`/topic/${topic.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),
    ...sections.map((section) => ({
      url: absoluteUrl(`/${section.slug}`),
      changeFrequency: "daily" as const,
      priority: 0.8
    })),
    ...getAllTags().map((tag) => ({
      url: absoluteUrl(`/tag/${encodeURIComponent(tag)}`),
      changeFrequency: "weekly" as const,
      priority: 0.6
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/article/${article.slug}`),
      lastModified: article.updatedAt,
      changeFrequency: "weekly" as const,
      priority: article.featured ? 0.9 : 0.7
    }))
  ];
}
