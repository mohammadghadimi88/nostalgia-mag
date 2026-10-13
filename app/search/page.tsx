import { Suspense } from "react";
import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = { title: "جست‌وجو", robots: { index: false, follow: true } };

export default function SearchPage() {
  return <Suspense fallback={<main className="section-intro"><h1>جست‌وجو</h1><p>در حال آماده‌سازی جست‌وجو…</p></main>}><SearchClient /></Suspense>;
}
