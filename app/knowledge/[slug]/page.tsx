import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { getKnowledgeArticleBySlug, getKnowledgeArticles } from "@/lib/knowledge/articles";
import { createPageMetadata } from "@/lib/seo/metadata";

type KnowledgeArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getKnowledgeArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getKnowledgeArticleBySlug(slug);
  if (!article) {
    return createPageMetadata({
      title: "Article not found",
      description: "The requested knowledge base article could not be found.",
      path: `/knowledge/${slug}`,
      noIndex: true,
    });
  }
  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/knowledge/${slug}`,
    noIndex: true,
  });
}

export default async function KnowledgeArticlePage({
  params,
}: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getKnowledgeArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <PageShell title={article.title} description={article.excerpt}>
      <Link
        href="/knowledge"
        className="focus-ring mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to knowledge base
      </Link>

      <GlassCard variant="strong" className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="text-eyebrow text-primary">{article.category}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {article.readMinutes} min read
          </span>
          <span>Updated {formattedDate}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface/50 px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-4 border-t border-border/80 pt-6">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-muted sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
