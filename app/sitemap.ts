import type { MetadataRoute } from "next";
import { articles, sections, getAllTags } from "@/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nostalgia-mag.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    ...sections.map((section) => ({ url: `${baseUrl}/${section.slug}`, changeFrequency: "daily" as const, priority: 0.8 })),
    { url: `${baseUrl}/tag`, changeFrequency: "weekly", priority: 0.5 },
    ...getAllTags().map((tag) => ({ url: `${baseUrl}/tag/${encodeURIComponent(tag)}`, changeFrequency: "weekly" as const, priority: 0.5 })),
    { url: `${baseUrl}/games/nostalgia`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/games/decade-80`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/fortune`, changeFrequency: "daily", priority: 0.7 },
    ...articles.map((article) => ({ url: `${baseUrl}/article/${article.slug}`, lastModified: article.updatedAt, changeFrequency: "weekly" as const, priority: article.featured ? 0.8 : 0.6 }))
  ];
}
