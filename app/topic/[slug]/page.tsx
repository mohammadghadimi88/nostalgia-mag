import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getRelatedTopics, getArticlesByTopic, getTopic, topics } from "@/lib/topics";
import { absoluteUrl } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: "/topic/" + topic.slug },
    openGraph: { type: "website", title: topic.title, description: topic.description }
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const articles = getArticlesByTopic(slug);
  const related = getRelatedTopics(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.description,
    url: absoluteUrl("/topic/" + topic.slug),
    isPartOf: { "@type": "WebSite", name: "نوستالژی مگ", url: absoluteUrl("/") }
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "موضوعات", item: absoluteUrl("/topic") },
      { "@type": "ListItem", position: 3, name: topic.title, item: absoluteUrl("/topic/" + topic.slug) }
    ]
  };

  return (
    <main>
      <header className="masthead">
        <div className="breadcrumbs" aria-label="مسیر صفحه">
          <Link href="/">خانه</Link><span aria-hidden="true">›</span>
          <Link href="/topic">موضوعات</Link><span aria-hidden="true">›</span>
          <span>{topic.title}</span>
        </div>
        <div className="issue">قفسه موضوعی</div>
        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
      </header>

      <nav className="article-tags section-tags" aria-label="کلیدواژه‌های موضوع">
        {topic.tags.map((tag) => <Link href={"/tag/" + encodeURIComponent(tag)} key={tag}>#{tag}</Link>)}
      </nav>

      <section className="section-intro">
        <span>پرونده موضوعی</span>
        <h2>{articles.length} مطلب مرتبط که می‌توانی پشت سر هم بخوانی</h2>
      </section>

      <section className="article-grid" aria-label={topic.title}>
        {articles.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </section>

      {related.length > 0 && (
        <section className="related">
          <div className="section-heading">
            <span>اگر این قفسه را دوست داشتی</span>
            <h2>موضوعات نزدیک</h2>
          </div>
          <div className="topic-grid compact">
            {related.map((item) => (
              <Link className="topic-card" href={"/topic/" + item.slug} key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\u003c") }} />
    </main>
  );
}
