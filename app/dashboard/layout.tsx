import type { ReactNode } from "react";
import { SaasShell } from "@/components/saas/saas-shell";
import { getUserProfile, requireSessionUser } from "@/lib/auth/session";

export const metadata = {
  title: "Studio | Salehin Executive Studio",
  description: "Your AI personal branding operating system.",
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = await requireSessionUser("/dashboard");
  const profile = await getUserProfile(user.id);

  const displayName =
    profile?.full_name ??
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Member";

  const planLabel = profile?.tier === "premium" ? "premium" : "free";

  return (
    <SaasShell displayName={displayName} planLabel={planLabel}>
      {children}
    </SaasShell>
  );
}
