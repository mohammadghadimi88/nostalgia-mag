"use client";

import { useMemo, useState } from "react";
import ShareResult from "@/components/ShareResult";

type Question = {
  text: string;
  options: { label: string; score: number }[];
};

const questions: Question[] = [
  { text: "اولین چیزی که از اینترنت قدیم یادت می‌آید؟", options: [{label:"صدای دایل‌آپ",score:3},{label:"چت و یاهو",score:4},{label:"وبلاگ‌ها",score:5},{label:"بازی آنلاین",score:2}] },
  { text: "برای یک عصر نوستالژیک کدام را انتخاب می‌کنی؟", options: [{label:"کاست و ضبط",score:5},{label:"فیلم و ویدئو",score:4},{label:"آتاری و سگا",score:3},{label:"پیامک",score:2}] },
  { text: "کدام وسیله بیشتر دلت را می‌برد؟", options: [{label:"نوکیا",score:3},{label:"واکمن",score:5},{label:"کنسول قدیمی",score:4},{label:"دوربین دیجیتال",score:2}] },
  { text: "اگر فقط یک چیز از آن سال‌ها برگردد؟", options: [{label:"جمع‌های خانوادگی",score:5},{label:"بازی‌های کوچه",score:4},{label:"تلویزیون شبانه",score:3},{label:"SMS",score:2}] }
];

function resultFor(score: number) {
  if (score >= 17) return ["نوستالژیِ تمام‌عیار", "تو فقط گذشته را به یاد نمی‌آوری؛ جزئیاتش را هم حفظ کرده‌ای!"];
  if (score >= 13) return ["بچهٔ دهه‌ات", "خاطرات قدیمی برایت هنوز یک دکمهٔ روشن/خاموش دارند."];
  if (score >= 9) return ["نوستالژیِ انتخابی", "بعضی خاطره‌ها را نگه داشته‌ای و بقیه را با خودت آورده‌ای."];
  return ["نسلِ ترکیبی", "بین گذشته و امروز راحت رفت‌وآمد می‌کنی؛ و این هم خودش یک مدل نوستالژی است."];
}

export default function NostalgiaQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const result = useMemo(() => resultFor(score), [score]);

  if (done) return (
    <section className="quiz-box" aria-live="polite">
      <span>نتیجه تست</span><h2>{result[0]}</h2><p>{result[1]}</p>
      <p className="quiz-score">امتیاز تو: {score} از ۲۰</p>
      <ShareResult title="نتیجه تست نوستالژی من" text={`من شدم «${result[0]}»! تو چی؟`} />
      <button onClick={() => { setStep(0); setScore(0); setDone(false); }}>دوباره بازی می‌کنم</button>
    </section>
  );

  const q = questions[step];
  return (
    <section className="quiz-box">
      <span>تست نوستالژی</span>
      <p className="quiz-progress">سؤال {step + 1} از {questions.length}</p>
      <h2>{q.text}</h2>
      <div className="quiz-options">
        {q.options.map((option) => (
          <button key={option.label} onClick={() => {
            const next = score + option.score;
            setScore(next);
            if (step === questions.length - 1) setDone(true);
            else setStep(step + 1);
          }}>{option.label}</button>
        ))}
      </div>
    </section>
  );
}
