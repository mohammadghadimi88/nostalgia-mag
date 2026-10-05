export type Section = {
  slug: string;
  title: string;
  description: string;
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
