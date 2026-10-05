import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesBySection, getSection, sections } from "@/lib/content";

export function generateStaticParams() { return sections.map((section) => ({ section: section.slug })); }

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params; const current = getSection(section); if (!current) return null;
  const articles = getArticlesBySection(section);
  return <main><header className="masthead"><Link className="back-link" href="/">صفحه اول</Link><div className="issue">قفسه امروز</div><h1>{current.title}</h1><p>{current.description}</p></header><section className="section-intro"><span>دکه امروز</span><h2>چیزهایی برای خواندن، دیدن و یادآوری</h2></section><section className="article-grid" aria-label={current.title}>{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</section></main>;
}