/**
 * Blog content hub — typed contracts for 100+ SEO articles.
 * Split post arrays by category file under `data/` as the library grows.
 */

export const BLOG_CATEGORIES = [
  "LinkedIn Growth",
  "Personal Branding",
  "AI Branding",
  "Content Marketing",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogCategorySlug =
  | "linkedin-growth"
  | "personal-branding"
  | "ai-branding"
  | "content-marketing";

export type BlogPostSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  categorySlug: BlogCategorySlug;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  author: string;
  tags: string[];
  /** SEO meta description override; falls back to excerpt */
  seoDescription?: string;
  /** Hero eyebrow shown on article page */
  eyebrow?: string;
  sections: BlogPostSection[];
};

/** Lightweight shape for listing, search, and related grids */
export type BlogPostSummary = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "excerpt"
  | "category"
  | "categorySlug"
  | "publishedAt"
  | "readingTimeMinutes"
  | "tags"
>;

export type BlogCategoryFilter = BlogCategory | "all";
