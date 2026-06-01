import { PageWithHub } from "@/components/layout/page-with-hub";
import { NewsletterCapture } from "@/components/newsletter/newsletter-capture";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Personal branding outcomes for CEOs and founders — authority, visibility, and revenue at scale.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <PageWithHub
      pathname="/portfolio"
      ctaLocation="portfolio"
      title="Portfolio"
      description="Leaders across finance, health, and venture who installed a personal branding operating system — and turned visibility into trust, pipeline, and growth."
      showNewsletterOnCta={false}
    >
      <NewsletterCapture
        source="portfolio"
        inputId="portfolio-newsletter-email"
        variant="compact"
        layout="stacked"
        className="mx-auto max-w-lg"
        title="Get portfolio drops first"
        description="New case studies and authority playbooks — delivered before they hit the site."
      />
    </PageWithHub>
  );
}
