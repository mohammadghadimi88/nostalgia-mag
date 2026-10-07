import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesBySection, getSection, sections } from "@/lib/content";
import { topics } from "@/lib/topics";
import { absoluteUrl } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return sections.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const current = getSection(section);
  if (!current) return {};
  return {
    title: current.title,
    description: current.description,
    alternates: { canonical: `/${current.slug}` },
    openGraph: { type: "website", title: current.title, description: current.description }
  };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const current = getSection(section);
  if (!current) notFound();
  const articles = getArticlesBySection(section);
  const featured = articles[0];
  const tags = Array.from(new Set(articles.flatMap((article) => article.tags))).slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: current.title,
    description: current.description,
    url: absoluteUrl(`/${current.slug}`)
  };

  return (
    <main>
      <header className="masthead">
        <Link className="back-link" href="/">صفحه اول</Link>
        <div className="issue">قفسه امروز</div>
        <h1>{current.title}</h1>
        <p>{current.description}</p>
      </header>
      {featured && (
        <section className="hero" aria-label="مطلب منتخب">
          <span>پیشنهاد سردبیر</span>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <Link className="hero-link" href={`/article/${featured.slug}`}>خواندن مطلب</Link>
        </section>
      )}
      {section === "nostalgia" && (
        <section className="topic-shelf" aria-label="نوستالژی بر اساس موضوع">
          <div className="section-heading">
            <span>نقشه خاطره‌ها</span>
            <h2>موضوعات محبوب نوستالژی</h2>
          </div>
          <div className="topic-grid compact">
            {topics.map((topic) => (
              <Link className="topic-card" href={"/topic/" + topic.slug} key={topic.slug}>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {tags.length > 0 && (
        <nav className="article-tags section-tags" aria-label="موضوعات این بخش">
          {tags.map((tag) => <Link href={`/tag/${encodeURIComponent(tag)}`} key={tag}>#{tag}</Link>)}
        </nav>
      )}
      <section className="section-intro">
        <span>دکه امروز</span>
        <h2>چیزهایی برای خواندن، دیدن و یادآوری</h2>
      </section>
      <section className="article-grid" aria-label={current.title}>
        {articles.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}