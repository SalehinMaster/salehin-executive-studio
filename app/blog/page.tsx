import { BlogListing } from "@/components/blog/blog-listing";
import { PageShell } from "@/components/layout/page-shell";
import { getAllPostSummaries } from "@/lib/blog/queries";
import { buildBlogListingJsonLd } from "@/lib/seo/blog-json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Insights & Blog",
  description:
    "Executive insights on LinkedIn growth, personal branding, AI branding, and content marketing — built for founders and CEOs who compound authority.",
  path: "/blog",
});

function BlogListingJsonLd({ postCount }: { postCount: number }) {
  const jsonLd = buildBlogListingJsonLd(postCount);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function BlogPage() {
  const posts = getAllPostSummaries();

  return (
    <>
      <BlogListingJsonLd postCount={posts.length} />
      <PageShell
        title="Insights"
        description="A scalable content hub for operators — search instantly, filter by category, and dive into playbooks engineered for SEO and pipeline."
      >
        <BlogListing posts={posts} />
      </PageShell>
    </>
  );
}
