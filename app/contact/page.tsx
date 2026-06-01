import { InternalLinkHub } from "@/components/layout/internal-link-hub";
import { PageShell } from "@/components/layout/page-shell";
import { SchedulingSection } from "@/components/scheduling/scheduling-section";
import { getContextualInternalLinks } from "@/lib/internal-links";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Book a strategy call to install your AI-powered personal branding operating system.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="Tell us where you are and where you need to be seen. Book a strategy call below or reach out — we respond within two business days with fit, scope, and availability."
    >
      <div className="space-y-12 md:space-y-16">
        <SchedulingSection />
        <InternalLinkHub links={getContextualInternalLinks("/contact")} />
      </div>
    </PageShell>
  );
}
