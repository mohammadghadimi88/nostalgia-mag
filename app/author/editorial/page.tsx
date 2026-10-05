import Link from "next/link";
import { articles } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

export const metadata = {
  title: "تحریریه نوستالژی مگ",
  description: "معرفی تحریریه نوستالژی مگ و اصول تولید و بررسی مطالب مجله.",
  alternates: { canonical: "/author/editorial" }
};

export default function EditorialAuthorPage() {
  const latest = articles.slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "تحریریه نوستالژی مگ",
    description: "صفحه تحریریه نوستالژی مگ.",
    url: "/author/editorial"
  };

  return (
    <main>
      <article className="article-page">
        <div className="breadcrumbs" aria-label="مسیر صفحه">
          <Link href="/">خانه</Link>
          <span aria-hidden="true">›</span>
          <span>تحریریه نوستالژی مگ</span>
        </div>

        <header className="article-header">
          <div className="issue">تحریریه</div>
          <h1>تحریریه نوستالژی مگ</h1>
          <p className="article-lead">
            پشت مطالب نوستالژی مگ یک تیم تحریریه است که هدفش ترکیب سرگرمی، خاطره و اطلاعات قابل بررسی است.
          </p>
        </header>

        <div className="article-body">
          <p>در مطالب مربوط به چهره‌ها و حاشیه‌ها، میان اطلاعات قابل استناد و شایعه تفاوت می‌گذاریم و ادعای تأییدنشده را به‌عنوان واقعیت منتشر نمی‌کنیم.</p>
          <p>مطالب نوستالژیک قرار است حس و خاطره یک دوره را زنده کنند، اما در موضوعات دانستنی تلاش می‌کنیم روایت سرگرم‌کننده با واقعیت خلط نشود.</p>
          <p>اگر خطایی در مطلبی دیدید، می‌توانید موضوع را به تحریریه اطلاع دهید تا بررسی و در صورت نیاز اصلاح شود.</p>
        </div>

        <section className="related">
          <h2>مطالب اخیر تحریریه</h2>
          <div className="article-grid">
            {latest.map((article) => <ArticleCard article={article} key={article.slug} />)}
          </div>
        </section>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
