import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllTags, getArticlesByTag, getRelatedTags } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  if (!getAllTags().includes(tag)) return {};
  return {
    title: `مطالب مرتبط با ${tag}`,
    description: `مطالب نوستالژی مگ درباره ${tag}`,
    alternates: { canonical: `/tag/${encodeURIComponent(tag)}` },
    openGraph: { type: "website", title: `مطالب مرتبط با ${tag}`, description: `مطالب نوستالژی مگ درباره ${tag}` }
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const articles = getArticlesByTag(tag);
  if (!articles.length) notFound();
  const relatedTags = getRelatedTags(tag);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `مطالب مرتبط با ${tag}`,
    description: `مطالب نوستالژی مگ درباره ${tag}`,
    url: absoluteUrl(`/tag/${encodeURIComponent(tag)}`)
  };

  return (
    <main>
      <header className="masthead">
        <Link className="back-link" href="/">نوستالژی مگ</Link>
        <div className="issue">برچسب</div>
        <h1>#{tag}</h1>
        <p>{articles.length} مطلب در این قفسه پیدا شد.</p>
      </header>
      <section className="article-grid" aria-label={`مطالب مرتبط با ${tag}`}>
        {articles.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </section>
      {relatedTags.length > 0 && <nav className="tag-suggestions related-tags" aria-label="برچسب‌های مرتبط"><span>برچسب‌های مرتبط</span><div>{relatedTags.map((item) => <Link href={"/tag/" + encodeURIComponent(item)} key={item}>#{item}</Link>)}</div></nav>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}