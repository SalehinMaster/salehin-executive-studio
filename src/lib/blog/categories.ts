import type { BlogCategory, BlogCategorySlug } from "@/lib/blog/types";
import { BLOG_CATEGORIES } from "@/lib/blog/types";

export const blogCategoryMeta: Record<
  BlogCategory,
  { slug: BlogCategorySlug; description: string }
> = {
  "LinkedIn Growth": {
    slug: "linkedin-growth",
    description:
      "Algorithms, hooks, and distribution systems that compound reach on LinkedIn.",
  },
  "Personal Branding": {
    slug: "personal-branding",
    description:
      "Positioning, narrative, and executive presence that converts attention into trust.",
  },
  "AI Branding": {
    slug: "ai-branding",
    description:
      "Human-led, AI-accelerated workflows for premium content at scale.",
  },
  "Content Marketing": {
    slug: "content-marketing",
    description:
      "Editorial strategy, repurposing, and funnels that turn content into pipeline.",
  },
};

export const blogCategories = BLOG_CATEGORIES.map((name) => ({
  name,
  ...blogCategoryMeta[name],
}));

export function categoryFromSlug(
  slug: BlogCategorySlug,
): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug)?.name;
}

export function slugFromCategory(
  category: BlogCategory,
): BlogCategorySlug {
  return blogCategoryMeta[category].slug;
}
