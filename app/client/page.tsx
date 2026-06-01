import { redirect } from "next/navigation";
import { ClientPortalDashboard } from "@/components/client-portal/client-portal-dashboard";
import { FunnelTracker } from "@/components/crm/funnel-tracker";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/utils/supabase/server";
import type { UserProfile } from "@/types/database";

export const metadata = createPageMetadata({
  title: "Client Dashboard",
  description:
    "Your executive client portal — onboarding, deliverables, content queue, and performance in one place.",
  path: "/client",
  noIndex: true,
});

export default async function ClientPortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/client");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const typedProfile = profile as UserProfile | null;
  const displayName =
    typedProfile?.full_name ??
    user.user_metadata?.full_name ??
    user.email?.split("@")[0] ??
    "Client";

  const companyLabel =
    typeof user.user_metadata?.company === "string"
      ? user.user_metadata.company
      : undefined;

  return (
    <>
      <FunnelTracker step="client" />
      <ClientPortalDashboard
        displayName={displayName}
        email={user.email ?? ""}
        companyLabel={companyLabel}
      />
    </>
  );
}
