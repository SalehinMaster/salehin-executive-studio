import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { blogPostPath, formatPostDate } from "@/lib/blog/queries";
import type { BlogPostSummary } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
  post: BlogPostSummary;
  className?: string;
  priority?: boolean;
};

export function BlogPostCard({ post, className, priority }: BlogPostCardProps) {
  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={blogPostPath(post.slug)}
        className="focus-ring block h-full rounded-xl"
        {...(priority ? { prefetch: true } : {})}
      >
        <GlassCard
          as="div"
          hover
          className="flex h-full flex-col p-6 md:p-7"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-eyebrow text-primary">{post.category}</span>
            <span className="text-xs text-subtle" aria-hidden>
              ·
            </span>
            <time
              dateTime={post.publishedAt}
              className="text-xs text-muted"
            >
              {formatPostDate(post.publishedAt)}
            </time>
          </div>

          <h2 className="mt-4 font-display text-display-card font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h2>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/60 pt-5">
            <span className="text-label text-muted">
              {post.readingTimeMinutes} min read
            </span>
            <span className="text-label text-primary transition-transform group-hover:translate-x-0.5">
              Read article →
            </span>
          </div>
        </GlassCard>
      </Link>
    </article>
  );
}
