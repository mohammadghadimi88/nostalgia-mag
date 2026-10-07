import Link from "next/link";
import { topics } from "@/lib/topics";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "موضوعات نوستالژی",
  description: "قفسه‌های موضوعی نوستالژی مگ؛ از اینترنت قدیم و مدرسه تا تلویزیون، کاست و ستاره‌ها.",
  alternates: { canonical: "/topic" }
};

export default function TopicIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "موضوعات نوستالژی",
    description: "قفسه‌های موضوعی نوستالژی مگ.",
    url: absoluteUrl("/topic")
  };
  return (
    <main>
      <header className="masthead">
        <Link className="back-link" href="/">صفحه اول</Link>
        <div className="issue">نقشه خاطره‌ها</div>
        <h1>موضوعات نوستالژی</h1>
        <p>اگر یک خاطره از یک جای کوچک شروع شد، اینجا می‌توانی ردش را تا چند مطلب دیگر دنبال کنی.</p>
      </header>
      <section className="topic-grid" aria-label="موضوعات">
        {topics.map((topic) => (
          <Link className="topic-card" href={"/topic/" + topic.slug} key={topic.slug}>
            <span>قفسه موضوعی</span>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <strong>دیدن مطالب ←</strong>
          </Link>
        ))}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
    </main>
  );
}
