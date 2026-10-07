"use client";

import { useMemo, useState } from "react";
import ShareResult from "@/components/ShareResult";

const prompts = [
  { key: "internet", match: ["اینترنت قدیم", "دایل‌آپ", "کافی‌نت", "Yahoo Messenger", "اورکات", "وبلاگ", "ایمیل"], question: "یادت هست برای آنلاین‌شدن باید منتظر می‌ماندی؟" },
  { key: "mobile", match: ["موبایل قدیمی", "نوکیا", "پیامک", "زنگ پلی‌فونیک"], question: "یادت هست زنگ گوشی را با وسواس انتخاب می‌کردی؟" },
  { key: "school", match: ["مدرسه", "کودکی", "دفتر", "جامدادی"], question: "یادت هست زنگ تفریح از خود کلاس مهم‌تر بود؟" },
  { key: "tv", match: ["تلویزیون", "ویدئو", "ویدئوکلوپ", "فیلم قدیمی"], question: "یادت هست انتخاب برنامه تلویزیون یک تصمیم خانوادگی بود؟" },
  { key: "cassette", match: ["کاست", "موسیقی قدیمی", "واکمن", "رادیو"], question: "یادت هست برای یک آهنگ باید تا آخر نوار صبر می‌کردی؟" }
];

export default function MemoryPrompt({ tags, title }: { tags: string[]; title: string }) {
  const prompt = useMemo(() => {
    return prompts.find((item) => item.match.some((tag) => tags.includes(tag))) ?? prompts[0];
  }, [tags]);

  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <section className="memory-prompt" aria-label="یادت هست؟">
      <span>یک سؤال از آرشیو خاطره‌ها</span>
      <h2>یادت هست؟</h2>
      <p>{prompt.question}</p>
      <div className="memory-actions">
        {["آره!", "نه، ولی یادم افتاد", "اصلاً یادم نیست"].map((item) => (
          <button key={item} onClick={() => setAnswer(item)}>{item}</button>
        ))}
      </div>
      {answer && (
        <div className="memory-result">
          <strong>{answer}</strong>
          <p>پس این مطلب احتمالاً همان چیزی است که باید برای یک دوست قدیمی بفرستی.</p>
          <ShareResult title={title} text={"این مطلب من را یاد یک خاطره قدیمی انداخت: " + title} />
        </div>
      )}
    </section>
  );
}
