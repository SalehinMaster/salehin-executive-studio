import { PageShell } from "@/components/layout/page-shell";
import { SupportCenter } from "@/components/support/support-center";
import { ButtonLink } from "@/components/ui/button-link";
import { supportFaqs } from "@/lib/support/faqs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Support Center",
  description:
    "FAQs and support ticket intake for Salehin Executive Studio clients.",
  path: "/support",
  noIndex: true,
});

export default function SupportCenterPage() {
  return (
    <PageShell
      title="Support center"
      description="Answers to common questions and a ticket placeholder for client success routing."
    >
      <div className="mb-8 flex flex-wrap gap-3">
        <ButtonLink href="/knowledge" variant="secondary">
          Knowledge base
        </ButtonLink>
        <ButtonLink href="/client" variant="ghost">
          Client portal
        </ButtonLink>
      </div>
      <SupportCenter faqs={supportFaqs} />
    </PageShell>
  );
}
