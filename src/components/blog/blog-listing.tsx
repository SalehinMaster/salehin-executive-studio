"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { conversionPaths } from "@/lib/internal-links";
import {
  filterPostsByCategory,
  searchPosts,
} from "@/lib/blog/queries";
import type { BlogCategoryFilter, BlogPostSummary } from "@/lib/blog/types";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

const CATEGORY_FILTERS: { id: BlogCategoryFilter; label: string }[] = [
  { id: "all", label: "All insights" },
  ...BLOG_CATEGORIES.map((category) => ({
    id: category as BlogCategoryFilter,
    label: category,
  })),
];

type BlogListingProps = {
  posts: BlogPostSummary[];
};

export function BlogListing({ posts }: BlogListingProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategoryFilter>("all");

  const filteredPosts = useMemo(() => {
    const byCategory = filterPostsByCategory(posts, category);
    return searchPosts(byCategory, query);
  }, [posts, category, query]);

  return (
    <div className="space-y-10">
      <div className="glass-card-strong space-y-6 p-5 md:p-6">
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, topic, or tag…"
            autoComplete="off"
            className="focus-ring w-full rounded-lg border border-border bg-surface/40 py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-subtle md:text-base"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = category === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(filter.id)}
                className={cn(
                  "focus-ring touch-target rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors md:text-sm",
                  isActive
                    ? "border-primary/50 bg-primary/15 text-foreground shadow-glow-soft"
                    : "border-border bg-surface/30 text-muted hover:border-border-strong hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        {filteredPosts.length === 0
          ? "No articles match your search — try another keyword or category."
          : `Showing ${filteredPosts.length} article${filteredPosts.length === 1 ? "" : "s"}`}
      </p>

      {filteredPosts.length > 0 ? (
        <ul className="grid list-none gap-6 sm:grid-cols-2 lg:gap-8">
          {filteredPosts.map((post, index) => (
            <li key={post.slug} className="content-auto">
              <BlogPostCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="glass-card flex flex-col items-center justify-center px-6 py-16 text-center">
          <p className="font-display text-xl text-foreground">
            Nothing here yet
          </p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Clear your search or select &ldquo;All insights&rdquo; to browse the
            full library.
          </p>
        </div>
      )}

      <p className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-8 text-sm text-muted">
        <span className="text-eyebrow text-foreground/80">Also explore</span>
        <Link href={conversionPaths.services} className="focus-ring hover:text-primary">
          Services
        </Link>
        <Link href={conversionPaths.pricing} className="focus-ring hover:text-primary">
          Pricing
        </Link>
        <Link href={conversionPaths.portfolio} className="focus-ring hover:text-primary">
          Portfolio
        </Link>
        <Link href={conversionPaths.scheduling} className="focus-ring text-primary">
          Book a call
        </Link>
      </p>
    </div>
  );
}
