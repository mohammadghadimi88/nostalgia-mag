"use client";

import { useMemo, useState } from "react";
import ShareResult from "@/components/ShareResult";

const questions = [
  { text: "اگر به سال‌های ۸۰ برگردی، اول سراغ کدام وسیله می‌روی؟", options: [["نوکیا",3],["آتاری",4],["واکمن",5],["دوربین دیجیتال",2]] },
  { text: "کدام صدای قدیمی را بیشتر دوست داری؟", options: [["مودم دایل‌آپ",5],["زنگ پلی‌فونیک",3],["صدای ضبط",4],["صدای کیبورد",2]] },
  { text: "یک عصر قدیمی را با چه چیزی کامل می‌کنی؟", options: [["فیلم و ویدئو",3],["بازی",4],["کاست",5],["مجله",2]] }
] as const;

function result(score:number) {
  if(score>=13) return "دهه‌هشتادیِ اصیل";
  if(score>=10) return "نوستالژی‌باز حرفه‌ای";
  if(score>=7) return "نسلِ بینابینی";
  return "مدرنِ قدیمی‌پسند";
}

export default function DecadeQuiz() {
  const [step,setStep]=useState(0); const [score,setScore]=useState(0); const [done,setDone]=useState(false);
  const title=useMemo(()=>result(score),[score]);
  if(done) return <section className="quiz-box"><span>نتیجه</span><h2>{title}</h2><p>امتیاز تو: {score} از ۱۵</p><ShareResult title="تست نوستالژی من" text={`من در تست نوستالژی شدم «${title}»! تو چی؟`} /><br/><button className="quiz-reset" onClick={()=>{setStep(0);setScore(0);setDone(false)}}>دوباره</button></section>;
  const q=questions[step];
  return <section className="quiz-box"><span>تست نسل دهه ۸۰</span><p className="quiz-progress">سؤال {step+1} از {questions.length}</p><h2>{q.text}</h2><div className="quiz-options">{q.options.map(([label,points])=><button key={label} onClick={()=>{const n=score+points;setScore(n);step===questions.length-1?setDone(true):setStep(step+1)}}>{label}</button>)}</div></section>;
}
