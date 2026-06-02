import { LeadMagnetLandingPage } from "@/components/lead-magnets/lead-magnet-landing-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "LinkedIn Profile Checklist",
  description:
    "Get the executive LinkedIn profile checklist to improve trust signals, positioning clarity, and conversion readiness.",
  path: "/lead-magnets/linkedin-profile-checklist",
});

export default function ProfileChecklistLeadMagnetPage() {
  return (
    <LeadMagnetLandingPage
      magnetSlug="linkedin-profile-checklist"
      title="LinkedIn Profile Checklist"
      subtitle="A premium profile audit checklist that helps founders and CEOs identify the exact elements that influence profile-to-conversation conversion."
      bullets={[
        "Headline and banner positioning criteria for authority",
        "About section framework for trust and differentiation",
        "Featured section optimization checklist for conversion",
        "Quick scorecard to prioritize the highest-impact profile fixes",
      ]}
    />
  );
}
