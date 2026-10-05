import Link from "next/link";
import type { Article } from "@/lib/content";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <span>{article.year ?? "مجله"}</span>
      <h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.excerpt}</p>
      <div className="card-tags" aria-label="برچسب‌ها">
        {article.tags.slice(0, 3).map((tag) => (
          <Link href={`/tag/${encodeURIComponent(tag)}`} key={tag}>#{tag}</Link>
        ))}
      </div>
    </article>
  );
}
