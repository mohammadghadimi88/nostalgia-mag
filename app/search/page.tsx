import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags, searchArticles } from "@/lib/content";

export const metadata: Metadata = { title: "جست‌وجو", robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchArticles(query);
  const suggestions = getAllTags().filter((tag) => !query || tag.includes(query)).slice(0, 8);
  return <main>
    <header className="masthead"><Link className="back-link" href="/">نوستالژی مگ</Link><h1>جست‌وجو</h1><p>دنبال خاطره، ستاره یا موضوع مورد علاقه‌ات بگرد.</p></header>
    <form className="search-form" action="/search"><input name="q" defaultValue={q} placeholder="مثلاً دایل‌آپ، نوکیا، تلویزیون..." aria-label="عبارت جست‌وجو" /><button type="submit">جست‌وجو</button></form>
    {query && <section className="search-results"><div className="section-heading"><span>نتیجه جست‌وجو</span><h2>{results.length ? results.length + " مطلب پیدا شد" : "چیزی پیدا نشد"}</h2></div>
      {results.length ? <div className="article-grid">{results.map((article) => <Link className="article-card" href={"/article/" + article.slug} key={article.slug}><span>{article.section}</span><h2>{article.title}</h2><p>{article.excerpt}</p><div className="card-tags">{article.tags.slice(0,3).map(tag => <span key={tag}>#{tag}</span>)}</div></Link>)}</div>
      : <div className="section-intro"><h2>این قفسه خالی است.</h2><p>با عبارت دیگری امتحان کن یا یکی از برچسب‌های زیر را انتخاب کن.</p></div>}
    </section>}
    {!query && <section className="section-intro"><h2>از کجا شروع کنیم؟</h2><p>یک کلمه بنویس؛ ما عنوان، برچسب، خلاصه و متن مطالب را بررسی می‌کنیم.</p></section>}
    <nav className="tag-suggestions" aria-label="پیشنهادهای جست‌وجو"><span>برچسب‌های محبوب</span><div>{suggestions.map(tag => <Link href={"/tag/" + encodeURIComponent(tag)} key={tag}>#{tag}</Link>)}</div></nav>
  </main>;
}