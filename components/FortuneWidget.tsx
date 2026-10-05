"use client";

import { useMemo, useState } from "react";
import ShareResult from "@/components/ShareResult";

const fortunes = [
  ["امروز برای شروع کاری که مدام عقب انداخته‌ای روز بدی نیست.", "فال روزانه"],
  ["یک خبر کوچک می‌تواند حال و هوای امروزت را عوض کند؛ حواست به نشانه‌های خوب باشد.", "فال روزانه"],
  ["گاهی بهترین تصمیم، چند دقیقه صبر کردن و دوباره نگاه کردن به ماجراست.", "فال روزانه"],
  ["چیزی که فکر می‌کنی تمام شده، شاید فقط به یک شکل تازه نیاز داشته باشد.", "فال روزانه"],
  ["امروز یک گفت‌وگوی ساده ممکن است از یک برنامه پیچیده بیشتر به کارت بیاید.", "فال روزانه"]
];

const hafez = [
  ["دوش وقت سحر از غصه نجاتم دادند؛ وندر آن ظلمت شب آب حیاتم دادند.", "برای وقتی که منتظر یک گشایش هستی."],
  ["صلاح کار کجا و من خراب کجا؛ ببین تفاوت ره از کجاست تا به کجا.", "برای وقتی که می‌خواهی با خودت صادق‌تر باشی."],
  ["خوشا شیراز و وضع بی‌مثالش؛ خداوندا نگه دار از زوالش.", "برای یک حال خوب و یادآوری زیبایی‌های ساده."],
  ["تو خود حجاب خودی حافظ از میان برخیز؛ خوشا کسی که در این راه بی‌حجاب رود.", "برای وقتی که بیش از حد درگیر تردید شده‌ای."]
];

export default function FortuneWidget() {
  const [mode, setMode] = useState<"daily" | "hafez">("daily");
  const [index, setIndex] = useState<number | null>(null);
  const result = useMemo(() => {
    if (index === null) return null;
    return mode === "daily" ? fortunes[index] : hafez[index];
  }, [index, mode]);

  function draw() {
    const length = mode === "daily" ? fortunes.length : hafez.length;
    setIndex(Math.floor(Math.random() * length));
  }

  return (
    <section className="fortune-box" aria-live="polite">
      <div className="fortune-tabs">
        <button className={mode === "daily" ? "active" : ""} onClick={() => { setMode("daily"); setIndex(null); }}>فال امروز</button>
        <button className={mode === "hafez" ? "active" : ""} onClick={() => { setMode("hafez"); setIndex(null); }}>فال حافظ</button>
      </div>
      <span>{mode === "daily" ? "یک مکث کوتاه" : "به نیت دل"}</span>
      <h2>{mode === "daily" ? "فال امروزت را بگیر" : "یک غزل برای نیتت"}</h2>
      {result ? <div className="fortune-result"><p>{result[0]}</p><small>{result[1]}</small><ShareResult title="فال من در نوستالژی مگ" text={`فال من: ${result[0]}`} /></div> : <p>دکمه را بزن؛ ببین امروز مجله چه می‌گوید.</p>}
      <button className="fortune-draw" onClick={draw}>{result ? "یک فال دیگر ←" : "فال بگیر ←"}</button>
    </section>
  );
}
