import type { ReactNode } from "react";
import { SaasDashboardChrome } from "@/components/saas/saas-dashboard-chrome";
import { SaasShell } from "@/components/saas/saas-shell";
import { getUserProfile, requireSessionUser } from "@/lib/auth/session";
import { fetchSubscription } from "@/lib/saas/queries";
import { getTierConfig, resolveSaasTier } from "@/lib/saas/subscription-plans";

export const metadata = {
  title: "Studio | Salehin Executive Studio",
  description: "Your AI personal branding operating system.",
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = await requireSessionUser("/dashboard");
  const [profile, subscription] = await Promise.all([
    getUserProfile(user.id),
    fetchSubscription(user.id),
  ]);

  const displayName =
    profile?.full_name ??
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Member";

  const tier = resolveSaasTier({
    plan: subscription?.plan,
    status: subscription?.status,
  });
  const planLabel = getTierConfig(tier).label;

  return (
    <SaasShell displayName={displayName} planLabel={planLabel}>
      <SaasDashboardChrome userEmail={user.email}>
        {children}
      </SaasDashboardChrome>
    </SaasShell>
  );
}
