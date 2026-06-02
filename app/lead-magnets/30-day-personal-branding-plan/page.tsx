import { LeadMagnetLandingPage } from "@/components/lead-magnets/lead-magnet-landing-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "30-Day Personal Branding Plan",
  description:
    "Download the 30-day personal branding action plan to build a credible executive presence with clear weekly milestones.",
  path: "/lead-magnets/30-day-personal-branding-plan",
});

export default function PersonalBrandingPlanLeadMagnetPage() {
  return (
    <LeadMagnetLandingPage
      magnetSlug="30-day-personal-branding-plan"
      title="30-Day Personal Branding Plan"
      subtitle="A practical implementation roadmap with daily and weekly actions to build authority, consistency, and conversion pathways in your first month."
      bullets={[
        "Weekly milestones for positioning, profile optimization, and publishing",
        "Plug-and-play post planning template for busy operators",
        "Distribution checklist to maximize reach quality",
        "Simple KPI tracker to evaluate trust and pipeline signals",
      ]}
    />
  );
}
