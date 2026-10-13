const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohammadghadimi88.github.io/nostalgia-mag/";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.replace(/^\/+/, "");
  return new URL(normalizedPath, siteUrl.endsWith("/") ? siteUrl : siteUrl + "/").toString();
}

export function assetPath(path: string) {
  const normalizedPath = "/" + path.replace(/^\/+/, "");
  return basePath ? basePath + normalizedPath : normalizedPath;
}

const availableArticleCovers = new Set([
  "cassette-and-walkman",
  "celebrity-old-photos",
  "dialup-internet",
  "first-serials-of-the-evening",
  "movie-night-home",
  "old-mobile-phones",
  "old-sms-jokes",
  "relationship-first-message",
  "retro-game-console",
  "school-snacks",
  "stars-first-appearance",
  "today-hafez-fortune",
  "which-nostalgia-type",
  "why-nostalgia-works",
  "why-old-photos-look-different",
  "why-we-keep-old-things"
]);

const sectionCoverFallback: Record<string, string> = {
  nostalgia: "dialup-internet",
  stars: "celebrity-old-photos",
  games: "retro-game-console",
  fortune: "today-hafez-fortune",
  "tv-cinema": "first-serials-of-the-evening",
  life: "relationship-first-message",
  humor: "old-sms-jokes",
  facts: "why-nostalgia-works"
};

export function articleCoverPath(slug: string, section: string) {
  const coverSlug = availableArticleCovers.has(slug)
    ? slug
    : sectionCoverFallback[section] ?? "dialup-internet";
  return `/images/articles/${coverSlug}.svg`;
}
