import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "نوستالژی مگ | مجله زردی که از گذشته آمده",
    template: "%s | نوستالژی مگ"
  },
  description:
    "مجله سرگرمی، نوستالژی و فرهنگ عامه ایرانی؛ از دهه ۶۰ تا امروز.",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
