import type { BlogPost } from "@/lib/blog/types";
import { absoluteUrl } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { blogPostPath } from "@/lib/blog/queries";

type JsonLd = Record<string, unknown>;

export function buildBlogListingJsonLd(postCount: number): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: `${siteConfig.shortName} Insights`,
    description:
      "Executive insights on LinkedIn growth, personal branding, AI branding, and content marketing.",
    url: absoluteUrl("/blog"),
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    blogPost: {
      "@type": "ItemList",
      numberOfItems: postCount,
    },
  };
}

export function buildArticleJsonLd(post: BlogPost): JsonLd {
  const url = absoluteUrl(blogPostPath(post.slug));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.sections.reduce(
      (acc, section) =>
        acc +
        section.paragraphs.join(" ").split(/\s+/).length +
        section.heading.split(/\s+/).length,
      0,
    ),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    isPartOf: {
      "@type": "Blog",
      "@id": `${siteConfig.url}/blog#blog`,
      name: `${siteConfig.shortName} Insights`,
    },
  };
}
