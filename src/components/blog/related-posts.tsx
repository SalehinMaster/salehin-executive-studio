import Link from "next/link";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getRelatedPosts } from "@/lib/blog/queries";
import type { BlogPost } from "@/lib/blog/types";

type RelatedPostsProps = {
  post: BlogPost;
};

export function RelatedPosts({ post }: RelatedPostsProps) {
  const related = getRelatedPosts(post, 3);

  if (related.length === 0) return null;

  return (
    <section
      className="mt-16 border-t border-border/80 pt-16 md:mt-20 md:pt-20"
      aria-labelledby="related-posts-heading"
    >
      <SectionHeading
        titleId="related-posts-heading"
        eyebrow="Keep reading"
        title="Related posts"
        description="Continue building authority with insights matched to this topic — internal links that compound SEO equity across the hub."
        align="left"
      />

      <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {related.map((relatedPost) => (
          <li key={relatedPost.slug}>
            <BlogPostCard post={relatedPost} />
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center">
        <Link
          href="/blog"
          className="focus-ring text-label text-primary transition-colors hover:text-primary-hover"
        >
          View all insights →
        </Link>
      </p>
    </section>
  );
}
