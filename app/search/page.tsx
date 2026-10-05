import Link from "next/link";
import { articles } from "@/lib/content";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams; const query = q.trim().toLowerCase();
  const results = query ? articles.filter((article) => [article.title, article.excerpt, ...article.content].join(" ").toLowerCase().includes(query)) : [];
  return <main><header className="masthead"><Link className="back-link" href="/">نوستالژی مگ</Link><h1>جست‌وجو</h1><p>دنبال خاطره، ستاره یا موضوع مورد علاقه‌ات بگرد.</p></header><form className="search-form" action="/search"><input name="q" defaultValue={q} placeholder="مثلاً دایل‌آپ، نوکیا، تلویزیون..." aria-label="عبارت جست‌وجو" /><button type="submit">جست‌وجو</button></form>{query && <section className="article-grid" aria-label="نتایج جست‌وجو">{results.length ? results.map((article) => <Link className="article-card" href={`/article/${article.slug}`} key={article.slug}><span>نتیجه جست‌وجو</span><h2>{article.title}</h2><p>{article.excerpt}</p></Link>) : <div className="section-intro"><h2>چیزی پیدا نشد.</h2><p>عبارت دیگری را امتحان کن.</p></div>}</section>}</main>;
}