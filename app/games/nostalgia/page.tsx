import NostalgiaQuiz from "@/components/NostalgiaQuiz";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "تست نوستالژی | کدام مدل نوستالژی بیشتر به تو می‌چسبد؟",
  description: "یک تست کوتاه و سرگرم‌کننده برای کشف مدل نوستالژی تو."
};

export default function NostalgiaQuizPage() {
  return (
    <main className="quiz-page">
      <header className="section-intro">
        <span>بازی و تست</span>
        <h1>کدام مدل نوستالژی بیشتر به تو می‌چسبد؟</h1>
        <p>چهار سؤال کوتاه جواب بده و ببین نوستالژی تو از کدام جنس است.</p>
      </header>
      <NostalgiaQuiz />
      <p className="quiz-note">نتیجه این تست برای سرگرمی است و برای اشتراک‌گذاری طراحی شده.</p>
    </main>
  );
}
