import { GlassCard } from "@/components/ui/glass-card";
import { requireSessionUser } from "@/lib/auth/session";
import { fetchUsageSummary } from "@/lib/saas/queries";

export const metadata = {
  title: "Analytics | Studio",
};

export default async function AnalyticsPage() {
  const { user } = await requireSessionUser("/dashboard/analytics");
  const { records, totalEvents, totalTokens, generationCount } = await fetchUsageSummary(
    user.id,
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">Analytics</p>
        <h1 className="mt-2 font-display text-2xl text-foreground">Usage insights</h1>
        <p className="mt-2 text-sm text-muted">Last 30 days of AI activity in your studio.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <GlassCard className="p-5">
          <p className="text-eyebrow text-muted">Total events</p>
          <p className="mt-2 font-display text-3xl text-foreground">{totalEvents}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-eyebrow text-muted">Generations</p>
          <p className="mt-2 font-display text-3xl text-foreground">{generationCount}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-eyebrow text-muted">Tokens (reported)</p>
          <p className="mt-2 font-display text-3xl text-foreground">{totalTokens}</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <p className="text-eyebrow text-muted">Recent activity</p>
        {records.length > 0 ? (
          <ul className="mt-4 divide-y divide-border">
            {records.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <span className="capitalize text-foreground">{row.action}</span>
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
