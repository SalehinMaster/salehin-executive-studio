import { SubscriptionTierCards } from "@/components/saas/subscription-tier-cards";
import { GlassCard } from "@/components/ui/glass-card";
import { DashboardSignOutButton } from "@/components/dashboard/sign-out-button";
import { requireSessionUser, getUserProfile } from "@/lib/auth/session";
import { fetchSubscription } from "@/lib/saas/queries";
import { getTierConfig, resolveSaasTier } from "@/lib/saas/subscription-plans";
export const metadata = {
  title: "Settings | Studio",
};

export default async function SettingsPage() {
  const { user } = await requireSessionUser("/dashboard/settings");
  const profile = await getUserProfile(user.id);

  const subscription = await fetchSubscription(user.id);
  const tier = resolveSaasTier({
    plan: subscription?.plan,
    status: subscription?.status,
  });
  const tierConfig = getTierConfig(tier);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">Settings</p>
        <h1 className="mt-2 font-display text-2xl text-foreground">Account</h1>
      </div>

      <GlassCard className="space-y-4 p-6">
        <div>
          <p className="text-eyebrow text-muted">Email</p>
          <p className="mt-1 text-foreground">{user.email}</p>
        </div>
        <div>
          <p className="text-eyebrow text-muted">Name</p>
          <p className="mt-1 text-foreground">
            {profile?.full_name ?? (user.user_metadata?.full_name as string) ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-eyebrow text-muted">Email verified</p>
          <p className="mt-1 text-foreground">
            {user.email_confirmed_at ? "Yes" : "Pending verification"}
          </p>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-6">
        <p className="text-eyebrow text-secondary">Subscription</p>
        <p className="text-sm text-foreground">
          Current: <span className="font-medium capitalize">{tierConfig.label}</span>
          <span className="text-muted">
            {" "}
            · Status: {subscription?.status ?? "inactive"}
          </span>
        </p>
        {subscription?.current_period_end ? (
          <p className="text-xs text-muted">
            Period ends {new Date(subscription.current_period_end).toLocaleDateString()}
          </p>
        ) : null}
        <p className="text-xs text-subtle">
          Mock Stripe price IDs below — wire to checkout when billing goes live.
        </p>
      </GlassCard>

      <SubscriptionTierCards currentTier={tier} />

      <GlassCard className="p-6">
        <p className="text-eyebrow text-muted">Session</p>
        <div className="mt-4">
          <DashboardSignOutButton />
        </div>
      </GlassCard>
    </div>
  );
}
