import { redirect } from "next/navigation";
import { ProposalBuilder } from "@/components/proposal/proposal-builder";
import { FunnelTracker } from "@/components/crm/funnel-tracker";
import { PageShell } from "@/components/layout/page-shell";
import { isCrmAdminEmail } from "@/lib/crm/admin";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/utils/supabase/server";

export const metadata = createPageMetadata({
  title: "Proposal Generator",
  description:
    "Build executive-grade proposals with pre-built templates and premium service pricing blocks.",
  path: "/proposal",
  noIndex: true,
});

export default async function ProposalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?auth=signin&next=/proposal");
  }

  if (!isCrmAdminEmail(user.email)) {
    redirect("/dashboard");
  }

  return (
    <PageShell
      title="Proposal generator"
      description="Compose dynamic, client-ready proposals — select a template, configure premium service blocks, and export a polished PDF."
    >
      <FunnelTracker step="proposal" />
      <ProposalBuilder />
    </PageShell>
  );
}
