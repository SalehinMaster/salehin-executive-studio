import { LeadMagnetLandingPage } from "@/components/lead-magnets/lead-magnet-landing-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "100 LinkedIn Hooks PDF",
  description:
    "Download 100 conversion-focused LinkedIn hooks for founders, CEOs, and operators who want stronger post performance in 2026.",
  path: "/lead-magnets/100-linkedin-hooks-pdf",
});

export default function HooksPdfLeadMagnetPage() {
  return (
    <LeadMagnetLandingPage
      magnetSlug="100-linkedin-hooks-pdf"
      title="100 LinkedIn Hooks PDF"
      subtitle="A curated hook swipe file built for executive audiences. Use these templates to open with clarity, tension, and relevance without sounding generic."
      bullets={[
        "100 categorized hooks for educational, contrarian, proof, and CTA posts",
        "Examples optimized for founder and CEO voice",
        "A mini framework to adapt each hook to your niche",
        "Bonus: hook quality checklist for final review before publishing",
      ]}
    />
  );
}
