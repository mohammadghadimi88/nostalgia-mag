import Link from "next/link";

export default function ServerErrorPage() {
  return (
    <main>
      <section className="hero">
        <span>۵۰۰</span>
        <h1>دکه امروز کمی به‌هم ریخته!</h1>
        <p>یک خطای موقت رخ داده است. لطفاً بعداً دوباره امتحان کن.</p>
        <Link className="hero-link" href="/">بازگشت به دکه ←</Link>
      </section>
    </main>
  );
}
