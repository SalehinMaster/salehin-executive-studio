import { redirect } from "next/navigation";
import { ExecutiveKpiDashboard } from "@/components/operations/executive-kpi-dashboard";
import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { isOperationsAdmin } from "@/lib/operations/auth";
import {
  getExecutiveKpiSnapshot,
  getKpiMonthLabels,
} from "@/lib/operations/kpi-data";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/utils/supabase/server";

export const metadata = createPageMetadata({
  title: "Executive KPI Dashboard",
  description:
    "Monthly leads, booked calls, conversion, revenue, retention, tasks, and traffic growth.",
  path: "/operations/kpi",
  noIndex: true,
});

export default async function ExecutiveKpiPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/operations/kpi");
  }

  if (!isOperationsAdmin(user.email)) {
    redirect("/dashboard");
  }

  const snapshot = getExecutiveKpiSnapshot();
  const monthLabels = getKpiMonthLabels();

  return (
    <PageShell
      title="Executive KPI dashboard"
      description={`Leadership analytics for ${snapshot.periodLabel} — interactive charts for pipeline, revenue, retention, and growth.`}
    >
      <div className="mb-8 flex flex-wrap gap-3">
        <ButtonLink href="/operations" variant="ghost">
          Operations hub
        </ButtonLink>
        <ButtonLink href="/crm" variant="ghost">
          CRM pipeline
        </ButtonLink>
      </div>
      <ExecutiveKpiDashboard snapshot={snapshot} monthLabels={monthLabels} />
    </PageShell>
  );
}
