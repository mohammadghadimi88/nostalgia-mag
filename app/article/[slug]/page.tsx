import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import { notFound } from "next/navigation";
import { getArticle, getRelatedArticles, getSection, articles } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { getTopicsForArticle } from "@/lib/topics";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    keywords: article.tags,
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.excerpt, publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author], tags: article.tags, images: [{ url: `/images/articles/${article.slug}.svg`, width: 1200, height: 675, alt: article.title }] }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const section = getSection(article.section);
  const related = getRelatedArticles(article, 6);
  const articleTopics = getTopicsForArticle(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    articleSection: section?.title,
    author: {
      "@type": "Organization",
      name: article.author,
      url: absoluteUrl("/author/editorial")
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    keywords: article.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/article/${article.slug}`) },
    image: absoluteUrl(`/images/articles/${article.slug}.svg`),
    publisher: {
      "@type": "Organization",
      name: "نوستالژی مگ",
      url: absoluteUrl()
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: absoluteUrl() },
      ...(section ? [{ "@type": "ListItem", position: 2, name: section.title, item: absoluteUrl(`/${section.slug}`) }] : []),
      { "@type": "ListItem", position: section ? 3 : 2, name: article.title, item: absoluteUrl(`/article/${article.slug}`) }
    ]
  };

  return (
    <main>
      <article className="article-page">
        <div className="breadcrumbs" aria-label="مسیر صفحه">
          <Link href="/">خانه</Link>
          {section && (
            <>
              <span aria-hidden="true">›</span>
              <Link href={`/${section.slug}`}>{section.title}</Link>
            </>
          )}
          <span aria-hidden="true">›</span>
          <span>{article.title}</span>
        </div>
        <header className="article-header">
          <Link className="back-link" href={section ? `/${section.slug}` : "/"}>← {section?.title ?? "دکه"}</Link>
          <div className="issue">{article.year ?? "مجله"}</div>
          <h1>{article.title}</h1>
          <p className="article-lead">{article.excerpt}</p>
          <div className="article-meta">
            <span>نویسنده: <Link href="/author/editorial">{article.author}</Link></span>
            <span>به‌روزرسانی: {article.updatedAt}</span>
          </div>
          <Image
            className="article-hero-image"
            src={`/images/articles/${article.slug}.svg`}
            alt=""
            width={1200}
            height={675}
            priority
            sizes="(max-width: 860px) 100vw, 860px"
          />
          <div className="article-tags">
            {article.tags.map((tag) => <Link href={`/tag/${encodeURIComponent(tag)}`} key={tag}>#{tag}</Link>)}
          </div>
        </header>

        <div className="article-body">
          {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {articleTopics.length > 0 && (
          <section className="article-topics" aria-label="پرونده‌های مرتبط">
            <h2>این مطلب را در این پرونده‌ها دنبال کن</h2>
            <div className="topic-grid compact">
              {articleTopics.map((topic) => (
                <Link className="topic-card" href={"/topic/" + topic.slug} key={topic.slug}>
                  <span>پرونده موضوعی</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="related">
            <h2>مطالب مرتبط</h2>
            <div className="article-grid">
              {related.map((item) => <ArticleCard article={item} key={item.slug} />)}
            </div>
          </section>
        )}
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
