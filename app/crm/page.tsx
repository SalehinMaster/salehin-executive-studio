import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart3, GitBranch, LayoutGrid } from "lucide-react";
import { AddLeadForm } from "@/components/crm/add-lead-form";
import { CrmStatsBar } from "@/components/crm/crm-stats-bar";
import { PipelineBoard } from "@/components/crm/pipeline-board";
import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/ui/glass-card";
import { isCrmAdminEmail, isCrmConfigured } from "@/lib/crm/admin";
import {
  computeCrmSummary,
  fetchCrmLeads,
  groupLeadsByStage,
} from "@/lib/crm/queries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/utils/supabase/server";

export const metadata = createPageMetadata({
  title: "CRM Dashboard",
  description:
    "Executive studio lead pipeline — track prospects from first touch to signed client.",
  path: "/crm",
  noIndex: true,
});

export default async function CrmDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/crm");
  }

  if (!isCrmAdminEmail(user.email)) {
    redirect("/dashboard");
  }

  const leads = await fetchCrmLeads();
  const grouped = groupLeadsByStage(leads);
  const summary = computeCrmSummary(leads);
  const dbReady = isCrmConfigured();

  return (
    <PageShell
      title="CRM Dashboard"
      description="Your executive studio pipeline — from first inbound touch to signed authority partnerships."
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/operations" variant="secondary" className="gap-2">
            <LayoutGrid className="size-4" aria-hidden />
            Operations
          </ButtonLink>
          <ButtonLink href="/operations/kpi" variant="secondary" className="gap-2">
            <BarChart3 className="size-4" aria-hidden />
            Executive KPIs
          </ButtonLink>
          <ButtonLink href="/crm/funnel" variant="secondary" className="gap-2">
            <GitBranch className="size-4" aria-hidden />
            Sales funnel
          </ButtonLink>
          <ButtonLink href="/intake" variant="ghost" className="gap-2">
            Client intake form
          </ButtonLink>
          <ButtonLink href="/proposal" variant="ghost" className="gap-2">
            Proposal generator
          </ButtonLink>
        </div>
      </div>

      {!dbReady ? (
        <GlassCard variant="strong" className="mb-8 border-amber-500/30 p-5 sm:p-6">
          <p className="text-sm text-muted">
            CRM database not connected. Add{" "}
            <code className="text-foreground">SUPABASE_SERVICE_ROLE_KEY</code> and run{" "}
            <code className="text-foreground">002_crm_lead_intake.sql</code>, then set{" "}
            <code className="text-foreground">CRM_ADMIN_EMAILS</code> to your sign-in email.
          </p>
        </GlassCard>
      ) : null}

      <CrmStatsBar
        total={summary.total}
        active={summary.active}
        won={summary.won}
        conversionRate={summary.conversionRate}
        className="mb-8"
      />

      <AddLeadForm />

      <section className="mt-10" aria-labelledby="pipeline-heading">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow text-primary">Lead pipeline</p>
            <h2
              id="pipeline-heading"
              className="mt-2 font-display text-xl text-foreground sm:text-2xl"
            >
              Visual pipeline
            </h2>
          </div>
          <Link
            href="/crm/funnel"
            className="focus-ring hidden items-center gap-2 text-sm text-muted transition-colors hover:text-primary sm:flex"
          >
            <BarChart3 className="size-4" aria-hidden />
            View funnel analytics
          </Link>
        </div>

        <PipelineBoard initialGrouped={grouped} />
      </section>
    </PageShell>
  );
}
