import Link from "next/link";

const links = [
  ["/nostalgia", "نوستالژی"],
  ["/stars", "ستاره‌ها"],
  ["/games", "بازی و تست"],
  ["/tv-cinema", "تلویزیون و سینما"],
  ["/fortune", "فال"],
  ["/search", "جست‌وجو"]
] as const;

export default function SiteHeader() {
  return (
    <nav className="site-nav" aria-label="ناوبری اصلی">
      <Link href="/" className="site-brand">نوستالژی مگ</Link>
      <div className="site-nav-links" aria-label="دسته‌بندی‌های اصلی">
        {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </div>
    </nav>
  );
}
