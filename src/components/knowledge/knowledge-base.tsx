"use client";

import Link from "next/link";
import { BookOpen, Clock, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  filterKnowledgeByCategory,
  searchKnowledgeArticles,
} from "@/lib/knowledge/articles";
import type { KnowledgeArticle, KnowledgeCategoryFilter } from "@/lib/knowledge/types";
import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge/types";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

const CATEGORY_FILTERS: { id: KnowledgeCategoryFilter; label: string }[] = [
  { id: "all", label: "All topics" },
  ...KNOWLEDGE_CATEGORIES.map((category) => ({
    id: category as KnowledgeCategoryFilter,
    label: category,
  })),
];

type KnowledgeBaseProps = {
  articles: KnowledgeArticle[];
};

export function KnowledgeBase({ articles }: KnowledgeBaseProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<KnowledgeCategoryFilter>("all");

  const filtered = useMemo(() => {
    const byCategory = filterKnowledgeByCategory(articles, category);
    return searchKnowledgeArticles(byCategory, query);
  }, [articles, category, query]);

  return (
    <div className="space-y-10">
      <GlassCard variant="strong" glow="soft" className="space-y-6 p-5 md:p-6">
        <div>
          <p className="text-eyebrow text-primary">Search & filter</p>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Playbooks for LinkedIn growth, executive branding, AI content systems,
            and content strategy — filter by category or search by keyword.
          </p>
        </div>

        <label htmlFor="kb-search" className="sr-only">
          Search knowledge base
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="kb-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, tags, or topics…"
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
      </GlassCard>

      <p className="text-sm text-muted">
        {filtered.length} article{filtered.length === 1 ? "" : "s"}
        {category !== "all" ? ` in ${category}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>

      {filtered.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((article) => (
            <li key={article.slug}>
              <KnowledgeArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <GlassCard className="border-dashed p-10 text-center">
          <BookOpen className="mx-auto size-6 text-muted opacity-60" aria-hidden />
          <p className="mt-4 text-sm text-muted">
            No articles match your filters. Try another category or search term.
          </p>
        </GlassCard>
      )}
    </div>
  );
}

function KnowledgeArticleCard({ article }: { article: KnowledgeArticle }) {
  return (
    <Link href={`/knowledge/${article.slug}`} className="group block h-full">
      <GlassCard
        hover
        variant="default"
        className="flex h-full flex-col p-5 transition-colors group-hover:border-primary/30 sm:p-6"
      >
        <p className="text-eyebrow text-primary">{article.category}</p>
        <h2 className="mt-2 font-display text-lg font-medium text-foreground group-hover:text-primary">
          {article.title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/80 pt-4 text-xs text-subtle">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {article.readMinutes} min read
          </span>
          <span>
            Updated{" "}
            {new Date(article.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
