import { redirect } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { OperationsHub } from "@/components/operations/operations-hub";
import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { isOperationsAdmin } from "@/lib/operations/auth";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/utils/supabase/server";

export const metadata = createPageMetadata({
  title: "Operations",
  description:
    "Internal operations panel — knowledge, support, CRM, and executive KPI analytics.",
  path: "/operations",
  noIndex: true,
});

export default async function OperationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/operations");
  }

  if (!isOperationsAdmin(user.email)) {
    redirect("/dashboard");
  }

  return (
    <PageShell
      title="Operations panel"
      description="Your internal command center for delivery, support, pipeline, and executive metrics."
    >
      <div className="mb-8 flex flex-wrap gap-3">
        <ButtonLink href="/operations/kpi" variant="secondary" className="gap-2">
          <BarChart3 className="size-4" aria-hidden />
          Executive KPIs
        </ButtonLink>
        <ButtonLink href="/crm" variant="ghost">
          CRM
        </ButtonLink>
      </div>
      <OperationsHub />
    </PageShell>
  );
}
