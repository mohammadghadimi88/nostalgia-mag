export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nostalgia-mag.example";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
