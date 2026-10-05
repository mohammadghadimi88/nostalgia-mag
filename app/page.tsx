const sections = [
  ["ستاره‌ها", "چهره‌ها، خاطرات و حاشیه‌های واقعی"],
  ["نوستالژی", "از دهه ۶۰ تا ۹۰؛ چیزهایی که یادمان نرفته"],
  ["بازی و تست", "تست‌های کوتاه و سرگرمی‌های قابل اشتراک"],
  ["فال", "فال و سرگرمی روزانه"],
  ["تلویزیون و سینما", "سریال‌ها، فیلم‌ها و موسیقی خاطره‌انگیز"],
  ["عشق و زندگی", "داستان‌ها و موضوعات رابطه و زندگی"],
  ["طنز", "جوک، خاطره و خنده"],
  ["عجایب", "دانستنی‌های عجیب و واقعی"]
];

export default function HomePage() {
  return (
    <main>
      <header className="masthead">
        <div className="issue">شماره ۰۰۱</div>
        <h1>نوستالژی مگ</h1>
        <p>اخبار مهمی که اصلاً مهم نیستند!</p>
      </header>

      <section className="hero">
        <span>دکه امروز</span>
        <h2>انگار یک مجله از سال ۱۳۸۵ وارد اینترنت امروز شده...</h2>
        <p>
          سرگرمی، ستاره‌ها، نوستالژی و چیزهایی که یک‌بار دیدیم و هیچ‌وقت فراموش نکردیم.
        </p>
      </section>

      <section className="section-grid" aria-label="دسته‌بندی‌ها">
        {sections.map(([title, description]) => (
          <article className="section-card" key={title}>
            <span>مجله</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <footer>نوستالژی مگ — نسخه اولیه</footer>
    </main>
  );
}
