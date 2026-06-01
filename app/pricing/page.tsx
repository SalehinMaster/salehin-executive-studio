import { PageWithHub } from "@/components/layout/page-with-hub";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Transparent investment tiers for AI-powered personal branding infrastructure.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <PageWithHub
      pathname="/pricing"
      ctaLocation="pricing"
      title="Pricing"
      description="Transparent investment tiers for AI-powered personal branding infrastructure. Every plan includes strategy, AI pipelines, and measurable outcomes — book a call or start with free resources."
    />
  );
}
