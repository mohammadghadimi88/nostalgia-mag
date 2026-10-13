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
