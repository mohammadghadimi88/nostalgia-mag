import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/content";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link className="article-card-media" href={`/article/${article.slug}`} aria-label={article.title}>
        <Image
          src={`/images/articles/${article.slug}.svg`}
          alt=""
          width={960}
          height={540}
          sizes="(max-width: 520px) 100vw, (max-width: 800px) 50vw, 33vw"
        />
      </Link>
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
