import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { notFound } from "next/navigation";
import { getArticle, getArticlesBySection, getSection, articles } from "@/lib/content";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = getArticle(slug); if (!article) return {}; return { title: article.title, description: article.excerpt }; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = getArticle(slug); if (!article) notFound();
  const section = getSection(article.section);
  const related = getArticlesBySection(article.section).filter((item) => item.slug !== article.slug).slice(0, 3);
  const jsonLd = {"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.excerpt,articleSection:section?.title};
  return <main><article className="article-page"><header className="article-header"><Link className="back-link" href={section ? `/${section.slug}` : "/"}>← {section?.title ?? "دکه"}</Link><div className="issue">{article.year ?? "مجله"}</div><h1>{article.title}</h1><p className="article-lead">{article.excerpt}</p></header><div className="article-body">{article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{related.length > 0 && <section className="related"><h2>از همین قفسه</h2><div className="article-grid">{related.map((item) => <ArticleCard article={item} key={item.slug} />)}</div></section>}</article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}} /></main>;
}