import Link from "next/link";

export default function SiteHeader() {
  return (
    <nav className="site-nav" aria-label="ناوبری اصلی">
      <Link href="/" className="site-brand">نوستالژی مگ</Link>
      <div className="site-nav-links">
        <Link href="/nostalgia">نوستالژی</Link>
        <Link href="/stars">ستاره‌ها</Link>
        <Link href="/games">بازی و تست</Link>
        <Link href="/search">جست‌وجو</Link>
      </div>
    </nav>
  );
}
