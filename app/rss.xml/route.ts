import { articles } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const items = articles
    .map(
      (article) => `
        <item>
          <title><![CDATA[${article.title}]]></title>
          <link>${absoluteUrl(`/article/${article.slug}`)}</link>
          <guid isPermaLink="true">${absoluteUrl(`/article/${article.slug}`)}</guid>
          <description><![CDATA[${article.excerpt}]]></description>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
        </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>نوستالژی مگ</title>
    <link>${absoluteUrl()}</link>
    <description>مجله سرگرمی و فرهنگ عامه ایرانی با حال‌وهوای نوستالژیک.</description>
    <language>fa-IR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  });
}
