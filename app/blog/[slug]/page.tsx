import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleBody } from "@/components/blog/blog-article-body";
import { RelatedPosts } from "@/components/blog/related-posts";
import { GlassCard } from "@/components/ui/glass-card";
import { TextLink } from "@/components/ui/text-link";
import {
  blogPostPath,
  formatPostDate,
  getAllPostSlugs,
  getPostBySlug,
} from "@/lib/blog/queries";
import { buildArticleJsonLd } from "@/lib/seo/blog-json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return createPageMetadata({
    title: post.title,
    description: post.seoDescription ?? post.excerpt,
    path: blogPostPath(slug),
    ogTitle: post.title,
  });
}

function ArticleJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const jsonLd = buildArticleJsonLd(post);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleJsonLd post={post} />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-container-x py-section md:px-container-x-md md:py-section-lg">
        <article className="mx-auto w-full max-w-3xl">
        <TextLink href="/blog" className="text-muted hover:text-primary">
          ← All insights
        </TextLink>

        <header className="mt-8 md:mt-10">
          <p className="text-eyebrow text-primary">
            {post.eyebrow ?? post.category}
          </p>
          <h1 className="mt-5 font-display text-display-section font-medium tracking-tight text-foreground text-balance">
            {post.title}
          </h1>
          <p className="mt-5 text-body-fluid text-muted text-pretty">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <time dateTime={post.publishedAt}>
              {formatPostDate(post.publishedAt)}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readingTimeMinutes} min read</span>
            <span aria-hidden>·</span>
            <span>{post.author}</span>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <span className="rounded-full border border-border bg-surface/40 px-3 py-1 text-xs text-muted">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </header>

        <GlassCard variant="strong" className="mt-10 p-6 md:mt-12 md:p-10">
          <BlogArticleBody post={post} />
        </GlassCard>

        <footer className="mt-10 flex flex-col gap-6 border-t border-border/80 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Category:{" "}
            <Link
              href="/blog"
              className="focus-ring text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {post.category}
            </Link>
          </p>
          <TextLink href="/contact">Book a strategy call →</TextLink>
        </footer>
        </article>

        <div className="mx-auto mt-4 w-full max-w-6xl">
          <RelatedPosts post={post} />
        </div>
      </div>
    </>
  );
}
