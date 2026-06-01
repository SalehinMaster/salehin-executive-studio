import { ClientIntakeWizard } from "@/components/intake/client-intake-wizard";
import { FunnelTracker } from "@/components/crm/funnel-tracker";
import { PageShell } from "@/components/layout/page-shell";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Client Onboarding",
  description:
    "Premium executive onboarding — share your goals, challenges, and investment range to begin your authority partnership.",
  path: "/intake",
});

export default function ClientIntakePage() {
  return (
    <PageShell
      title="Executive onboarding"
      description="A confidential, white-glove intake for leaders ready to install an authority operating system. Four steps — under five minutes."
    >
      <FunnelTracker step="client" />
      <ClientIntakeWizard />
    </PageShell>
  );
}
