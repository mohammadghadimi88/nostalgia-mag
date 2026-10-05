import FortuneWidget from "@/components/FortuneWidget";

export const metadata = {
  title: "فال امروز و فال حافظ",
  description: "فال روزانه و فال حافظ سرگرم‌کننده در نوستالژی مگ."
};

export default function FortunePage() {
  return (
    <main className="fortune-page">
      <header className="section-intro">
        <span>فال و سرگرمی</span>
        <h1>فال امروز و فال حافظ</h1>
        <p>یک مکث کوتاه، یک نیت، و یک انتخاب تصادفی برای سرگرمی.</p>
      </header>
      <FortuneWidget />
      <p className="quiz-note">فال‌ها صرفاً برای سرگرمی هستند.</p>
    </main>
  );
}
