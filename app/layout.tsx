import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nostalgia-mag.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "نوستالژی مگ | مجله زردی که از گذشته آمده",
    template: "%s | نوستالژی مگ"
  },
  description: "مجله سرگرمی، نوستالژی و فرهنگ عامه ایرانی؛ از دهه ۶۰ تا امروز.",
  keywords: ["نوستالژی", "سرگرمی", "مجله", "فرهنگ عامه", "سینما", "تلویزیون", "فال"],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "نوستالژی مگ",
    title: "نوستالژی مگ",
    description: "مجله سرگرمی و فرهنگ عامه ایرانی با حال‌وهوای نوستالژیک."
  },
  robots: { index: true, follow: true },
  category: "entertainment",
  creator: "نوستالژی مگ",
  publisher: "نوستالژی مگ",
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
