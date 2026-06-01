import { FUNNEL_STEPS, PIPELINE_STAGES } from "@/lib/crm/constants";
import type {
  CrmLead,
  FunnelMetrics,
  FunnelStep,
  LeadPipelineStage,
} from "@/lib/crm/types";
import { createServiceClient } from "@/utils/supabase/service";

function mapLead(row: Record<string, unknown>): CrmLead {
  return {
    id: row.id as string,
    full_name: row.full_name as string,
    email: (row.email as string | null) ?? null,
    company: (row.company as string | null) ?? null,
    linkedin_url: (row.linkedin_url as string | null) ?? null,
    website: (row.website as string | null) ?? null,
    phone: (row.phone as string | null) ?? null,
    stage: row.stage as LeadPipelineStage,
    source: row.source as CrmLead["source"],
    business_goals: (row.business_goals as string | null) ?? null,
    current_challenges: (row.current_challenges as string | null) ?? null,
    budget_range: (row.budget_range as CrmLead["budget_range"]) ?? null,
    notes: (row.notes as string | null) ?? null,
    metadata: (row.metadata as Record<string, unknown>) ?? {},
    last_contacted_at: (row.last_contacted_at as string | null) ?? null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export async function fetchCrmLeads(): Promise<CrmLead[]> {
  const supabase = createServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("crm_leads")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error || !data) {
    console.error("[crm] fetchCrmLeads:", error?.message);
    return [];
  }

  return data.map((row) => mapLead(row as Record<string, unknown>));
}

export function groupLeadsByStage(
  leads: CrmLead[],
): Record<LeadPipelineStage, CrmLead[]> {
  const grouped = Object.fromEntries(
    PIPELINE_STAGES.map((stage) => [stage.id, [] as CrmLead[]]),
  ) as Record<LeadPipelineStage, CrmLead[]>;

  for (const lead of leads) {
    grouped[lead.stage]?.push(lead);
  }

  return grouped;
}

export async function fetchFunnelMetrics(): Promise<FunnelMetrics[]> {
  const supabase = createServiceClient();
  if (!supabase) {
    return FUNNEL_STEPS.map((step) => ({
      step: step.id,
      count: 0,
      uniqueSessions: 0,
    }));
  }

  const { data, error } = await supabase
    .from("funnel_events")
    .select("step, session_id")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error || !data) {
    console.error("[crm] fetchFunnelMetrics:", error?.message);
    return FUNNEL_STEPS.map((step) => ({
      step: step.id,
      count: 0,
      uniqueSessions: 0,
    }));
  }

  const byStep = new Map<FunnelStep, { count: number; sessions: Set<string> }>();

  for (const step of FUNNEL_STEPS) {
    byStep.set(step.id, { count: 0, sessions: new Set() });
  }

  for (const row of data) {
    const step = row.step as FunnelStep;
    const bucket = byStep.get(step);
    if (!bucket) continue;
    bucket.count += 1;
    if (row.session_id) {
      bucket.sessions.add(row.session_id);
    }
  }

  return FUNNEL_STEPS.map((step) => {
    const bucket = byStep.get(step.id)!;
    return {
      step: step.id,
      count: bucket.count,
      uniqueSessions: bucket.sessions.size,
    };
  });
}

export function computeCrmSummary(leads: CrmLead[]) {
  const total = leads.length;
  const won = leads.filter((l) => l.stage === "client_won").length;
  const lost = leads.filter((l) => l.stage === "client_lost").length;
  const active = total - won - lost;
  const conversionRate =
    total > 0 ? Math.round((won / total) * 100) : 0;

  return { total, won, lost, active, conversionRate };
}
