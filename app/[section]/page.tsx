import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesBySection, getSection, sections } from "@/lib/content";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: current.title,
    description: current.description,
    url: `/${current.slug}`
  };

  return (
    <main>
      <header className="masthead">
        <Link className="back-link" href="/">صفحه اول</Link>
        <div className="issue">قفسه امروز</div>
        <h1>{current.title}</h1>
        <p>{current.description}</p>
      </header>
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