import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { articles, sections } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function HomePage() {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "نوستالژی مگ",
    url: absoluteUrl(),
    description: "مجله سرگرمی، نوستالژی و فرهنگ عامه ایرانی."
  };

  return (
    <main>
      <header className="masthead"><div className="issue">شماره ۰۰۱</div><h1>نوستالژی مگ</h1><p>اخبار مهمی که اصلاً مهم نیستند!</p></header>
      <section className="hero"><span>دکه امروز</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><Link className="hero-link" href={`/article/${featured.slug}`}>خواندن مطلب ←</Link></section>
      <section className="section-grid" aria-label="دسته‌بندی‌ها">{sections.map((section) => <Link className="section-card" href={`/${section.slug}`} key={section.slug}><span>مجله</span><h3>{section.title}</h3><p>{section.description}</p></Link>)}</section>
      <section className="latest"><div className="section-heading"><span>تازه از دکه</span><h2>چند مطلب برای شروع</h2></div><div className="article-grid">{articles.slice(0, 4).map((article) => <ArticleCard article={article} key={article.slug} />)}</div></section>
      <footer>نوستالژی مگ — یک مجله اینترنتی با حال‌وهوای گذشته</footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}