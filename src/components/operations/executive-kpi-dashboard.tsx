"use client";

import { AreaSparkChart } from "@/components/operations/charts/area-spark-chart";
import { BarChart } from "@/components/operations/charts/bar-chart";
import { RingChart } from "@/components/operations/charts/ring-chart";
import { KpiMetricCard } from "@/components/operations/kpi-metric-card";
import { GlassCard } from "@/components/ui/glass-card";
import type { ExecutiveKpiSnapshot } from "@/lib/operations/kpi-data";

type ExecutiveKpiDashboardProps = {
  snapshot: ExecutiveKpiSnapshot;
  monthLabels: readonly string[];
};

export function ExecutiveKpiDashboard({
  snapshot,
  monthLabels,
}: ExecutiveKpiDashboardProps) {
  const { summary } = snapshot;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiMetricCard
          label="Monthly leads"
          value={String(summary.monthlyLeads)}
          delta={summary.monthlyLeadsDelta}
          glow
        />
        <KpiMetricCard
          label="Booked calls"
          value={String(summary.bookedCalls)}
          delta={summary.bookedCallsDelta}
        />
        <KpiMetricCard
          label="Conversion rate"
          value={`${summary.conversionRate}%`}
          delta={summary.conversionRateDelta}
        />
        <KpiMetricCard
          label="Revenue"
          value={`$${summary.revenue}k`}
          delta={summary.revenueDelta}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiMetricCard
          label="Client retention"
          value={`${summary.clientRetention}%`}
          delta={summary.clientRetentionDelta}
        />
        <KpiMetricCard
          label="Task completion"
          value={`${summary.tasksCompletionRate}%`}
          deltaLabel="of assigned tasks"
        />
        <KpiMetricCard
          label="Traffic growth"
          value={`${summary.trafficGrowth}%`}
          delta={summary.trafficGrowthDelta}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPanel
          title="Monthly leads"
          eyebrow="Pipeline"
          description="Inbound volume trend across the current period."
        >
          <AreaSparkChart
            values={snapshot.monthlyLeads.values}
            labels={monthLabels}
            accent="primary"
          />
        </ChartPanel>

        <ChartPanel
          title="Booked calls"
          eyebrow="Sales"
          description="Strategy calls scheduled from funnel and outbound."
        >
          <AreaSparkChart
            values={snapshot.bookedCalls.values}
            labels={monthLabels}
            accent="secondary"
          />
        </ChartPanel>

        <ChartPanel
          title="Conversion rate"
          eyebrow="Efficiency"
          description="Lead-to-call conversion percentage by month."
        >
          <BarChart
            values={snapshot.conversionRate.values}
            labels={monthLabels}
            formatValue={(v) => `${v}%`}
          />
        </ChartPanel>

        <ChartPanel
          title="Revenue"
          eyebrow="Finance"
          description="Recognized revenue in thousands (USD)."
        >
          <BarChart
            values={snapshot.revenue.values}
            labels={monthLabels}
            formatValue={(v) => `$${v}k`}
          />
        </ChartPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
        <ChartPanel
          title="Traffic growth"
          eyebrow="Marketing"
          description="Organic and referral session growth month over month."
        >
          <AreaSparkChart
            values={snapshot.trafficGrowth.values}
            labels={monthLabels}
            accent="secondary"
          />
        </ChartPanel>

        <GlassCard variant="strong" className="flex flex-col p-6 sm:p-8">
          <p className="text-eyebrow text-primary">Tasks</p>
          <h3 className="mt-2 font-display text-xl text-foreground">
            Operations workload
          </h3>
          <p className="mt-2 text-sm text-muted">
            Open vs completed tasks across delivery, strategy, and ops.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <p className="text-eyebrow text-muted">Open</p>
              <p className="mt-2 font-display text-3xl text-foreground tabular-nums">
                {snapshot.tasksOpen}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <p className="text-eyebrow text-muted">Completed</p>
              <p className="mt-2 font-display text-3xl text-foreground tabular-nums">
                {snapshot.tasksCompleted}
              </p>
            </div>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${summary.tasksCompletionRate}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            {summary.tasksCompletionRate}% completion rate
          </p>
        </GlassCard>

        <GlassCard
          variant="strong"
          glow="soft"
          className="flex flex-col items-center justify-center p-6 sm:p-8"
        >
          <p className="text-eyebrow text-secondary">Retention</p>
          <RingChart
            value={snapshot.clientRetention}
            label="Client retention"
            className="mt-4"
          />
          <p className="mt-6 max-w-xs text-center text-sm text-muted">
            Rolling 90-day logo retention across active executive partnerships.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

function ChartPanel({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard variant="strong" className="p-6 sm:p-8">
      <p className="text-eyebrow text-primary">{eyebrow}</p>
      <h3 className="mt-2 font-display text-xl text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <div className="mt-6">{children}</div>
    </GlassCard>
  );
}
