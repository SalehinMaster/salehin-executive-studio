import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FunnelVisualizer } from "@/components/crm/funnel-visualizer";
import { PageShell } from "@/components/layout/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { FUNNEL_STEPS } from "@/lib/crm/constants";
import { isCrmAdminEmail } from "@/lib/crm/admin";
import { fetchFunnelMetrics } from "@/lib/crm/queries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/utils/supabase/server";

export const metadata = createPageMetadata({
  title: "Sales Funnel",
  description:
    "Track conversion from homepage through lead magnet, Calendly, discovery, proposal, and client.",
  path: "/crm/funnel",
  noIndex: true,
});

export default async function SalesFunnelPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?auth=signin&next=/crm/funnel");
  }

  if (!isCrmAdminEmail(user.email)) {
    redirect("/dashboard");
  }

  const metrics = await fetchFunnelMetrics();
  const totalEvents = metrics.reduce((sum, m) => sum + m.count, 0);

  return (
    <PageShell
      title="Sales Funnel"
      description="Homepage → Lead Magnet → Calendly Booking → Discovery Call → Proposal → Client. Track where prospects advance and where they drop off."
    >
      <Link
        href="/crm"
        className="focus-ring mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to CRM
      </Link>

      <GlassCard className="mb-8 p-5 sm:p-6">
        <p className="text-eyebrow text-muted">Total funnel events</p>
        <p className="mt-2 font-display text-3xl text-foreground">{totalEvents}</p>
      </GlassCard>

      <FunnelVisualizer metrics={metrics} />

      <section className="mt-12" aria-labelledby="funnel-map-heading">
        <h2
          id="funnel-map-heading"
          className="font-display text-lg text-foreground sm:text-xl"
        >
          User flow map
        </h2>
        <ol className="mt-6 space-y-4">
          {FUNNEL_STEPS.map((step, index) => (
            <li key={step.id}>
              <GlassCard hover className="flex gap-4 p-5 sm:p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 font-display text-sm text-primary">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{step.label}</p>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </GlassCard>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
