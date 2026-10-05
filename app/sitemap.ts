import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nostalgia-mag.example";
  return [{ url: baseUrl, changeFrequency: "daily", priority: 1 }];
}
