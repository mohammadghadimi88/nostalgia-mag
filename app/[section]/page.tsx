import { notFound } from "next/navigation";
import { sections } from "@/lib/content";

export function generateStaticParams() {
  return sections.map((section) => ({ section: section.slug }));
}

export default async function SectionPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const current = sections.find((item) => item.slug === section);
  if (!current) notFound();

  return (
    <main>
      <header className="masthead">
        <div className="issue">دکه امروز</div>
        <h1>{current.title}</h1>
        <p>{current.description}</p>
      </header>
      <section className="hero">
        <span>به‌زودی</span>
        <h2>این قفسه در حال چیده‌شدن است.</h2>
        <p>ساختار محتوایی این بخش آماده است و در مرحله بعد اولین مطالب واقعی وارد آن می‌شوند.</p>
      </section>
    </main>
  );
}
