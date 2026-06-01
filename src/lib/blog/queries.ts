import { blogPosts } from "@/lib/blog/data/posts";
import type {
  BlogCategory,
  BlogCategoryFilter,
  BlogPost,
  BlogPostSummary,
} from "@/lib/blog/types";

const SORTED_POSTS = [...blogPosts].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function toPostSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categorySlug: post.categorySlug,
    publishedAt: post.publishedAt,
    readingTimeMinutes: post.readingTimeMinutes,
    tags: post.tags,
  };
}

export function getAllPosts(): BlogPost[] {
  return SORTED_POSTS;
}

export function getAllPostSummaries(): BlogPostSummary[] {
  return SORTED_POSTS.map(toPostSummary);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return SORTED_POSTS.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return SORTED_POSTS.map((post) => post.slug);
}

export function filterPostsByCategory(
  posts: BlogPostSummary[],
  category: BlogCategoryFilter,
): BlogPostSummary[] {
  if (category === "all") return posts;
  return posts.filter((post) => post.category === category);
}

export function searchPosts(
  posts: BlogPostSummary[],
  query: string,
): BlogPostSummary[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return posts;

  return posts.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      ...post.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

function sharedTagCount(a: string[], b: string[]): number {
  const setB = new Set(b.map((t) => t.toLowerCase()));
  return a.filter((t) => setB.has(t.toLowerCase())).length;
}

/**
 * Ranks related posts: same category, overlapping tags, then recency.
 */
export function getRelatedPosts(
  post: BlogPost,
  limit = 3,
): BlogPostSummary[] {
  const publishedMs = new Date(post.publishedAt).getTime();

  const scored = SORTED_POSTS.filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === post.category) score += 10;
      score += sharedTagCount(candidate.tags, post.tags) * 3;

      const daysApart =
        Math.abs(new Date(candidate.publishedAt).getTime() - publishedMs) /
        (1000 * 60 * 60 * 24);
      if (daysApart <= 60) score += 2;
      else if (daysApart <= 120) score += 1;

      return { candidate, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        new Date(b.candidate.publishedAt).getTime() -
        new Date(a.candidate.publishedAt).getTime()
      );
    });

  return scored.slice(0, limit).map(({ candidate }) => toPostSummary(candidate));
}

export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function blogPostPath(slug: string): string {
  return `/blog/${slug}`;
}
