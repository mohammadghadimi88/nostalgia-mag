import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllTags, getArticlesByTag } from "@/lib/content";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `مطالب مرتبط با ${tag}`,
    description: `مطالب نوستالژی مگ درباره ${tag}`
  };

  return (
    <main>
      <header className="masthead">
        <Link className="back-link" href="/">نوستالژی مگ</Link>
        <div className="issue">برچسب</div>
        <h1>#{tag}</h1>
        <p>همه مطالب مرتبط با این موضوع در یک قفسه.</p>
      </header>
      <section className="article-grid" aria-label={`مطالب مرتبط با ${tag}`}>
        {articles.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}