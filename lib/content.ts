export type Section = {
  slug: string;
  title: string;
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  section: string;
  year?: string;
  featured?: boolean;
  content: string[];
};

export const sections: Section[] = [
  { slug: "stars", title: "ستاره‌ها", description: "چهره‌ها، خاطرات و حاشیه‌های واقعی" },
  { slug: "nostalgia", title: "نوستالژی", description: "از دهه ۶۰ تا ۹۰" },
  { slug: "games", title: "بازی و تست", description: "تست‌های کوتاه و سرگرمی‌های قابل اشتراک" },
  { slug: "fortune", title: "فال", description: "فال و سرگرمی روزانه" },
  { slug: "tv-cinema", title: "تلویزیون و سینما", description: "سریال‌ها، فیلم‌ها و موسیقی خاطره‌انگیز" },
  { slug: "life", title: "عشق و زندگی", description: "داستان‌ها و موضوعات رابطه و زندگی" },
  { slug: "humor", title: "طنز", description: "جوک، خاطره و خنده" },
  { slug: "facts", title: "عجایب", description: "دانستنی‌های عجیب و واقعی" }
];

export const articles: Article[] = [
  {
    slug: "dialup-internet",
    title: "یادت هست اولین بار با دایل‌آپ به اینترنت وصل شدی؟",
    excerpt: "صدایی که برای یک نسل، صدای ورود به دنیای اینترنت بود.",
    section: "nostalgia",
    year: "۱۳۸۰",
    featured: true,
    content: [
      "قبل از اینترنت پرسرعت، وصل‌شدن به اینترنت خودش یک مراسم بود؛ تلفن اشغال می‌شد و صدای مودم شروع ماجرا را اعلام می‌کرد.",
      "برای خیلی‌ها، اولین ایمیل، اولین چت و اولین جست‌وجوی اینترنتی با همان اتصال کند و هیجان‌انگیز شکل گرفت.",
      "آن روزها اینترنت فقط یک ابزار نبود؛ یک پنجره تازه بود که هر بار بازکردنش حس کشف‌کردن داشت."
    ]
  },
  {
    slug: "old-mobile-phones",
    title: "وقتی موبایل هنوز وسیله‌ای برای پُز دادن بود!",
    excerpt: "از نوکیاهای خاطره‌انگیز تا زنگ‌های پلی‌فونیک؛ موبایل‌های یک نسل.",
    section: "nostalgia",
    year: "۱۳۸۴",
    content: [
      "یک زمانی داشتن موبایل، مخصوصاً یک مدل خاص، برای خودش اتفاقی مهم بود.",
      "صفحه‌های کوچک، بازی مار، پیامک و زنگ‌های پلی‌فونیک بخشی از فرهنگ روزمره یک نسل شدند.",
      "امروز گوشی‌ها هزاران قابلیت دارند، اما بعضی از همان موبایل‌های ساده هنوز خاطره‌انگیزند."
    ]
  },
  {
    slug: "school-snacks",
    title: "خوراکی‌های زنگ تفریح که هنوز مزه‌شان یادمان مانده",
    excerpt: "از پفک و لواشک تا خوراکی‌هایی که کنار مدرسه می‌خریدیم.",
    section: "nostalgia",
    year: "۱۳۷۰",
    content: [
      "زنگ تفریح برای خیلی از بچه‌های آن سال‌ها با صف بوفه و خرید یک خوراکی کوچک شروع می‌شد.",
      "بعضی خوراکی‌ها بیشتر از طعمشان، خاطره دارند؛ چون با مدرسه، دوست‌ها و مسیر خانه گره خورده‌اند.",
      "شاید همین جزئیات کوچک‌اند که نوستالژی را این‌قدر واقعی می‌کنند."
    ]
  },
  {
    slug: "why-nostalgia-works",
    title: "چرا بعضی خاطره‌های قدیمی با یک صدا زنده می‌شوند؟",
    excerpt: "یک آهنگ، یک تصویر یا حتی صدای مودم می‌تواند سال‌ها ما را عقب ببرد.",
    section: "facts",
    content: [
      "حافظه فقط مجموعه‌ای از اطلاعات نیست؛ صداها، بوها، تصاویر و احساسات می‌توانند به‌عنوان سرنخ یادآوری عمل کنند.",
      "به همین دلیل یک نشانه کوچک می‌تواند مجموعه‌ای از خاطرات قدیمی را دوباره فعال کند.",
      "نوستالژی از همین پیوند میان نشانه‌های آشنا، خاطره و احساس شکل می‌گیرد."
    ]
  }
];

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesBySection(sectionSlug: string) {
  return articles.filter((article) => article.section === sectionSlug);
}
