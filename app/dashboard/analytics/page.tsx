import { UsageAnalyticsPanel } from "@/components/saas/usage-analytics-panel";
import { requireSessionUser } from "@/lib/auth/session";
import { fetchSubscription, fetchUsageAnalytics } from "@/lib/saas/queries";
import { getTierConfig, resolveSaasTier } from "@/lib/saas/subscription-plans";

export const metadata = {
  title: "Analytics | Studio",
};

export default async function AnalyticsPage() {
  const { user } = await requireSessionUser("/dashboard/analytics");
  const [analytics, subscription] = await Promise.all([
    fetchUsageAnalytics(user.id),
    fetchSubscription(user.id),
  ]);

  const tier = resolveSaasTier({
    plan: subscription?.plan,
    status: subscription?.status,
  });
  const tierConfig = getTierConfig(tier);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">Analytics</p>
        <h1 className="mt-2 font-display text-2xl text-foreground">Usage insights</h1>
        <p className="mt-2 text-sm text-muted">
          Telemetry from your studio — generations, quotas, and tool breakdowns.
        </p>
      </div>

      <UsageAnalyticsPanel
        analytics={analytics}
        tierLabel={tierConfig.label}
        dailyLimit={tierConfig.limits.dailyGenerations}
        monthlyLimit={tierConfig.limits.monthlyGenerations}
      />
    </div>
  );
}
