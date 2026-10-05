import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { articles, sections } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function HomePage() {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const popular = [...articles].sort((a, b) => {
    const score = (x: typeof a) => (x.featured ? 8 : 0) + x.tags.length + (x.section === "nostalgia" ? 3 : 0);
    return score(b) - score(a);
  }).slice(0, 6);
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
      <section className="latest" aria-labelledby="latest-heading">
        <div className="section-heading"><span>تازه از دکه</span><h2 id="latest-heading">تازه‌ترین مطالب</h2></div>
        <div className="article-grid">{articles.slice(0, 6).map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
      </section>
      <section className="fortune-promo"><div><span>فال امروز</span><h2>یک نیت کن، یک فال بگیر</h2><p>فال روزانه و فال حافظ؛ فقط برای چند دقیقه سرگرمی.</p></div><Link className="hero-link" href="/fortune">رفتن به فال ←</Link></section>
      <section className="quiz-promo"><div><span>بازی امروز</span><h2>چقدر از نسل نوستالژی هستی؟</h2><p>چهار سؤال کوتاه؛ یک نتیجه قابل اشتراک‌گذاری.</p></div><Link className="hero-link" href="/games/nostalgia">شروع تست ←</Link></section>
      <section className="latest" aria-labelledby="nostalgia-heading">
        <div className="section-heading"><span>نوستالژی امروز</span><h2 id="nostalgia-heading">یک قدم به عقب</h2></div>
        <div className="article-grid">{articles.filter((article) => article.section === "nostalgia").slice(0, 3).map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
      </section>
      <section className="latest" aria-labelledby="popular-heading">
        <div className="section-heading"><span>قفسه‌های بیشتر</span><h2>برای هر حال یک گوشه داریم</h2></div>
        <div className="section-grid">{sections.filter((section) => !["nostalgia","stars","games","fortune"].includes(section.slug)).map((section) => <Link className="section-card" href={`/${section.slug}`} key={section.slug}><span>مجله</span><h3>{section.title}</h3><p>{section.description}</p></Link>)}</div>
      </section>
      <section className="latest" aria-labelledby="popular-heading">
        <div className="section-heading"><span>پیشنهاد سردبیر</span><h2 id="popular-heading">اگر این را دوست داشتی...</h2></div>
        <div className="article-grid">{popular.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
      </section>
      <footer>نوستالژی مگ — یک مجله اینترنتی با حال‌وهوای گذشته</footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}