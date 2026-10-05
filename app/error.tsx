"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main>
      <section className="hero">
        <span>دکه گیر کرده!</span>
        <h2>یک اتفاق کوچک افتاد.</h2>
        <p>صفحه نتوانست کامل باز شود. دوباره تلاش کن.</p>
        <button className="hero-link" type="button" onClick={() => reset()}>
          تلاش دوباره
        </button>
      </section>
    </main>
  );
}
