import { GlassCard } from "@/components/ui/glass-card";
import { DashboardSignOutButton } from "@/components/dashboard/sign-out-button";
import { requireSessionUser, getUserProfile } from "@/lib/auth/session";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Settings | Studio",
};

export default async function SettingsPage() {
  const { user, supabase } = await requireSessionUser("/dashboard/settings");
  const profile = await getUserProfile(user.id);

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan, status, current_period_end")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
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
        <p className="text-sm text-foreground capitalize">
          Plan: {subscription?.plan ?? "free"} · Status: {subscription?.status ?? "inactive"}
        </p>
        {subscription?.current_period_end ? (
          <p className="text-xs text-muted">
            Period ends {new Date(subscription.current_period_end).toLocaleDateString()}
          </p>
        ) : null}
      </GlassCard>

      <GlassCard className="p-6">
        <p className="text-eyebrow text-muted">Session</p>
        <div className="mt-4">
          <DashboardSignOutButton />
        </div>
      </GlassCard>
    </div>
  );
}
