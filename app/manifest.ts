import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "نوستالژی مگ",
    short_name: "نوستالژی مگ",
    description: "مجله سرگرمی و فرهنگ عامه ایرانی با حال‌وهوای نوستالژیک.",
    start_url: absoluteUrl("/"),
    display: "standalone",
    background_color: "#f4efe4",
    theme_color: "#17130e",
    lang: "fa",
    dir: "rtl"
  };
}
