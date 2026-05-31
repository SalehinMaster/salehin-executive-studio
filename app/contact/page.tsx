import { PageShell } from "@/components/layout/page-shell";
import { SchedulingSection } from "@/components/scheduling/scheduling-section";

export const metadata = {
  title: "Contact | Salehin Executive Studio",
  description:
    "Book a strategy call to install your AI-powered personal branding operating system.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="Tell us where you are and where you need to be seen. Book a strategy call below or reach out — we respond within two business days with fit, scope, and availability."
    >
      <SchedulingSection />
    </PageShell>
  );
}
