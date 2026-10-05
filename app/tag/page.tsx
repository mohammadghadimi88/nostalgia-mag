import Link from "next/link";
import { getAllTags, getArticlesByTag } from "@/lib/content";

export const metadata = { title: "همه برچسب‌ها", description: "فهرست موضوعات و برچسب‌های نوستالژی مگ." };

export default function TagsPage() {
  const tags = getAllTags().map((tag) => ({ tag, count: getArticlesByTag(tag).length })).sort((a,b) => b.count-a.count || a.tag.localeCompare(b.tag,"fa"));
  return <main>
    <header className="masthead"><Link className="back-link" href="/">نوستالژی مگ</Link><div className="issue">راهنمای مجله</div><h1>همه برچسب‌ها</h1><p>هر برچسب یک قفسه کوچک برای کشف مطالب مرتبط است.</p></header>
    <section className="tag-index" aria-label="همه برچسب‌ها">{tags.map(({tag,count}) => <Link href={"/tag/" + encodeURIComponent(tag)} className="tag-index-item" key={tag}><strong>#{tag}</strong><span>{count} مطلب</span></Link>)}</section>
  </main>;
}