"use client";

import { useState } from "react";

export default function ShareResult({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = window.location.href;
    const payload = { title, text, url };
    if (navigator.share) {
      await navigator.share(payload).catch(() => {});
      return;
    }
    await navigator.clipboard?.writeText(`${text}\n${url}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <button className="share-result" onClick={share}>{copied ? "لینک کپی شد ✓" : "اشتراک‌گذاری نتیجه ↗"}</button>;
}
