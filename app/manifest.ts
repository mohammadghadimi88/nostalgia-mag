import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "نوستالژی مگ",
    short_name: "نوستالژی مگ",
    description: "مجله سرگرمی و فرهنگ عامه ایرانی با حال‌وهوای نوستالژیک.",
    start_url: siteUrl,
    display: "standalone",
    background_color: "#f4efe4",
    theme_color: "#17130e",
    lang: "fa",
    dir: "rtl"
  };
}
