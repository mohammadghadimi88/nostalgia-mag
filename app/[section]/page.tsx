import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesBySection, getSection, sections } from "@/lib/content";

export function generateStaticParams() {
  return sections.map((section) => ({ section: section.slug }));
}

export default async function SectionPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const current = getSection(section);
  if (!current) notFound();

  const articles = getArticlesBySection(section);

  return (
    <main>
      <header className="masthead">
        <Link className="back-link" href="/">نوستالژی مگ</Link>
        <div className="issue">قفسه امروز</div>
        <h1>{current.title}</h1>
        <p>{current.description}</p>
      </header>

      <section className="section-intro">
        <span>دکه امروز</span>
        <h2>چیزهایی برای خواندن، دیدن و یادآوری</h2>
      </section>

      <section className="article-grid" aria-label={current.title}>
        {articles.map((article) => (
          <Link className="article-card" href={`/article/${article.slug}`} key={article.slug}>
            <span>{article.year ?? "مجله"}</span>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
