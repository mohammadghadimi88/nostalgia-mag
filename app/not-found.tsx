import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="hero">
        <span>۴۰۴</span>
        <h2>این صفحه هنوز به دکه نرسیده!</h2>
        <p>ممکن است آدرس اشتباه باشد یا این مطلب هنوز منتشر نشده باشد.</p><Link className="hero-link" href="/">بازگشت به دکه ←</Link>
      </section>
    </main>
  );
}
