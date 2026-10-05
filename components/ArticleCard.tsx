import Link from "next/link";
import type { Article } from "@/lib/content";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link className="article-card" href={`/article/${article.slug}`}>
      <span>{article.year ?? "مجله"}</span>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
    </Link>
  );
}
