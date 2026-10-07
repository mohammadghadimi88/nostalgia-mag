import { articles, type Article } from "@/lib/content";

export type Topic = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  related?: string[];
};

export const topics: Topic[] = [
  { slug: "internet-old", title: "اینترنت قدیم", description: "از دایل‌آپ و کافی‌نت تا چت و روزهایی که آنلاین‌شدن خودش یک اتفاق بود.", tags: ["اینترنت قدیم", "دایل‌آپ", "کافی‌نت", "Yahoo Messenger", "چت", "مودم", "اورکات", "وبلاگ", "ایمیل"], related: ["old-mobile", "old-school"] },
  { slug: "old-mobile", title: "موبایل‌های قدیمی", description: "نوکیا، پیامک، زنگ‌های پلی‌فونیک و گوشی‌هایی که هنوز اسمشان خاطره است.", tags: ["موبایل قدیمی", "نوکیا", "پیامک", "دهه ۸۰", "بازی مار", "زنگ پلی‌فونیک"], related: ["internet-old", "old-school"] },
  { slug: "old-school", title: "مدرسه قدیم", description: "دفتر مشق، خوراکی زنگ تفریح، شوخی‌های کلاس و خاطرات سال‌های مدرسه.", tags: ["مدرسه", "دفتر", "خوراکی", "کودکی", "جوک", "کامپیوتر"], related: ["internet-old", "old-tv-video"] },
  { slug: "old-tv-video", title: "تلویزیون و ویدئوی قدیم", description: "سریال، کارتون، ویدئو و جنگ‌های خانوادگی بر سر کنترل تلویزیون.", tags: ["تلویزیون", "سریال قدیمی", "کارتون", "ویدئو", "ویدئوکلوپ", "فیلم قدیمی"], related: ["old-school", "cassette-music"] },
  { slug: "cassette-music", title: "کاست و موسیقی قدیم", description: "نوار کاست، واکمن، ضبط و خاطره آهنگ‌هایی که با مداد برمی‌گرداندیم.", tags: ["کاست", "موسیقی قدیمی", "واکمن", "رادیو"], related: ["old-tv-video", "old-school"] },
  { slug: "stars-before-fame", title: "ستاره‌ها قبل از شهرت", description: "عکس‌ها و مسیرهای ابتدایی چهره‌هایی که بعدها مشهور شدند؛ بدون شایعه‌سازی.", tags: ["ستاره‌ها", "بازیگران", "عکس قدیمی", "سینما", "مجله قدیمی"], related: ["old-tv-video", "cassette-music"] }
];

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getArticlesByTopic(slug: string, limit = 12): Article[] {
  const topic = getTopic(slug);
  if (!topic) return [];
  return articles
    .map((article) => ({
      article,
      score: topic.tags.reduce((score, tag) => score + (article.tags.includes(tag) ? 1 : 0), 0)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || Number(Boolean(b.article.featured)) - Number(Boolean(a.article.featured)) || a.article.title.localeCompare(b.article.title, "fa"))
    .slice(0, limit)
    .map(({ article }) => article);
}

export function getTopicsForArticle(article: Article, limit = 3): Topic[] {
  return topics
    .map((topic) => ({
      topic,
      score: topic.tags.reduce((score, tag) => score + (article.tags.includes(tag) ? 1 : 0), 0)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.topic.title.localeCompare(b.topic.title, "fa"))
    .slice(0, limit)
    .map(({ topic }) => topic);
}

export function getRelatedTopics(slug: string, limit = 4): Topic[] {
  const topic = getTopic(slug);
  if (!topic) return [];
  return topics
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      topic: item,
      score: item.related?.includes(slug) ? 10 : topic.tags.reduce((score, tag) => score + (item.tags.includes(tag) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.score - a.score || a.topic.title.localeCompare(b.topic.title, "fa"))
    .slice(0, limit)
    .map(({ topic }) => topic);
}
