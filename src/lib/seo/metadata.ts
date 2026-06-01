import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export function absoluteUrl(path = ""): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!path) return siteConfig.url;
  return `${siteConfig.url}${normalizedPath}`;
}

export function createRootMetadata(): Metadata {
  const ogImage = absoluteUrl(siteConfig.ogImagePath);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: defaultTitle,
      template: `%s | ${siteConfig.shortName}`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.founder, url: siteConfig.url }],
    creator: siteConfig.founder,
    publisher: siteConfig.legalName,
    category: "Business",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: defaultTitle,
      description: siteConfig.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — premium personal branding for executives`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: defaultTitle,
      description: siteConfig.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** Override OG/Twitter title while keeping the document title pattern */
  ogTitle?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  ogTitle,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const pageUrl = absoluteUrl(canonicalPath);
  const ogImage = absoluteUrl(siteConfig.ogImagePath);
  const resolvedOgTitle = ogTitle ?? title;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: pageUrl,
      siteName: siteConfig.name,
      title: resolvedOgTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: resolvedOgTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: resolvedOgTitle,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export const homeMetadata = createPageMetadata({
  title: "Personal Branding OS for Founders & CEOs",
  description: siteConfig.description,
  path: "/",
  ogTitle: defaultTitle,
});
