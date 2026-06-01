"use client";

import { Activity, Calendar, Sparkles, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import type { UsageAnalytics } from "@/lib/saas/queries";
import type { UsageRecord } from "@/types/database";
import { cn } from "@/lib/utils";

type UsageAnalyticsPanelProps = {
  analytics: UsageAnalytics;
  tierLabel: string;
  dailyLimit: number | null;
  monthlyLimit: number | null;
};

function formatToolLabel(tool: string): string {
  return tool.replace(/_/g, " ");
}

function MiniBarChart({ series }: { series: { date: string; count: number }[] }) {
  const max = Math.max(1, ...series.map((d) => d.count));

  return (
    <div
      className="flex h-28 items-end gap-0.5"
      role="img"
      aria-label="Daily generation activity for the last 30 days"
    >
      {series.map((point) => {
        const height = Math.round((point.count / max) * 100);
        return (
          <div
            key={point.date}
            className="group relative min-w-0 flex-1"
            title={`${point.date}: ${point.count}`}
          >
            <div
              className="mx-auto w-full max-w-[6px] rounded-t bg-primary/70 transition-all group-hover:bg-primary"
              style={{ height: `${Math.max(height, 4)}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: typeof Activity;
  accent?: "primary" | "secondary";
}) {
  return (
    <GlassCard className="relative overflow-hidden p-5">
      <div
        className={cn(
          "pointer-events-none absolute -top-8 -right-8 size-24 rounded-full opacity-20 blur-2xl",
          accent === "primary" ? "bg-primary" : "bg-secondary",
        )}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-eyebrow text-muted">{label}</p>
          <p className="mt-2 font-display text-3xl text-foreground">{value}</p>
          {sub ? <p className="mt-1 text-xs text-subtle">{sub}</p> : null}
        </div>
        <Icon
          className={cn("size-5 shrink-0", accent === "primary" ? "text-primary" : "text-secondary")}
          aria-hidden
        />
      </div>
    </GlassCard>
  );
}

export function UsageAnalyticsPanel({
  analytics,
  tierLabel,
  dailyLimit,
  monthlyLimit,
}: UsageAnalyticsPanelProps) {
  const dailyPct =
    dailyLimit != null ? Math.min(100, Math.round((analytics.dailyCount / dailyLimit) * 100)) : null;
  const monthlyPct =
    monthlyLimit != null
      ? Math.min(100, Math.round((analytics.monthlyCount / monthlyLimit) * 100))
      : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total generations"
          value={analytics.totalGenerations}
          sub="Last 30 days"
          icon={Sparkles}
        />
        <StatCard
          label="Today"
          value={analytics.dailyCount}
          sub={dailyLimit != null ? `of ${dailyLimit} daily limit` : "Unlimited"}
          icon={Zap}
          accent="secondary"
        />
        <StatCard
          label="This month"
          value={analytics.monthlyCount}
          sub={monthlyLimit != null ? `of ${monthlyLimit} monthly limit` : "Unlimited"}
          icon={Calendar}
        />
        <StatCard label="Plan" value={tierLabel} sub="Stripe-ready mock tiers" icon={Activity} />
      </div>

      {(dailyPct != null || monthlyPct != null) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {dailyPct != null ? (
            <GlassCard className="p-5">
              <p className="text-eyebrow text-muted">Daily quota</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${dailyPct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-subtle">{dailyPct}% used today</p>
            </GlassCard>
          ) : null}
          {monthlyPct != null ? (
            <GlassCard className="p-5">
              <p className="text-eyebrow text-muted">Monthly quota</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-secondary transition-all"
                  style={{ width: `${monthlyPct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-subtle">{monthlyPct}% used this month</p>
            </GlassCard>
          ) : null}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <GlassCard className="p-6">
          <p className="text-eyebrow text-muted">Daily activity</p>
          <p className="mt-1 text-sm text-subtle">Generation events per day</p>
          <div className="mt-6">
            <MiniBarChart series={analytics.dailySeries} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-eyebrow text-muted">By tool</p>
          {analytics.toolBreakdown.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {analytics.toolBreakdown.map((row) => {
                const max = analytics.toolBreakdown[0]?.count ?? 1;
                const width = Math.round((row.count / max) * 100);
                return (
                  <li key={row.tool}>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="capitalize text-foreground">{formatToolLabel(row.tool)}</span>
                      <span className="text-muted">{row.count}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-primary/80"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">No tool usage yet.</p>
          )}
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <p className="text-eyebrow text-muted">Recent telemetry</p>
        {analytics.recentRecords.length > 0 ? (
          <ul className="mt-4 divide-y divide-border">
            {analytics.recentRecords.map((row: UsageRecord) => (
              <li
                key={row.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
              >
                <span className="capitalize text-foreground">{row.action.replace(/_/g, " ")}</span>
                <span className="text-muted">
                  {row.model ?? "—"}
                  {row.tokens_used != null ? ` · ${row.tokens_used} tokens` : ""} ·{" "}
                  {new Date(row.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">No usage recorded yet.</p>
        )}
      </GlassCard>
    </div>
  );
}
