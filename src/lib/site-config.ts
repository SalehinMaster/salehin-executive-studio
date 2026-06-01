/**
 * Central site identity — SEO, JSON-LD, and newsletter branding.
 */
export const siteConfig = {
  name: "Salehin Executive Studio",
  shortName: "Salehin",
  legalName: "Salehin Executive Studio",
  tagline: "AI-Powered Personal Branding OS",
  description:
    "Premium personal branding infrastructure for founders, CEOs, and leaders — LinkedIn ghostwriting, strategy, AI content systems, and authority building.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://salehin.studio",
  locale: "en_US",
  language: "en",
  founder: "Salehin",
  contactEmail: "hello@salehin.studio",
  twitterHandle: "@salehinstudio",
  sameAs: [
    "https://linkedin.com",
    "https://x.com",
    "https://instagram.com",
  ] as const,
  keywords: [
    "personal branding",
    "LinkedIn ghostwriting",
    "executive branding",
    "AI content systems",
    "founder marketing",
    "authority building",
    "CEO personal brand",
    "LinkedIn strategy",
  ] as const,
  ogImagePath: "/opengraph-image",
} as const;

export type SiteConfig = typeof siteConfig;
