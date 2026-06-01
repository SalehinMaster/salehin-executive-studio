import { NextResponse } from "next/server";
import { requireCrmAdmin } from "@/lib/crm/auth-request";
import type { LeadPipelineStage } from "@/lib/crm/types";
import type { Database } from "@/types/database";
import { createServiceClient } from "@/utils/supabase/service";

type CrmLeadUpdate = Database["public"]["Tables"]["crm_leads"]["Update"];

const PIPELINE_STAGES: LeadPipelineStage[] = [
  "new_lead",
  "qualified_lead",
  "discovery_call",
  "proposal_sent",
  "client_won",
  "client_lost",
];

type UpdateLeadBody = {
  stage?: LeadPipelineStage;
  notes?: string;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireCrmAdmin();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  const { id } = await context.params;

  let body: UpdateLeadBody;
  try {
    body = (await request.json()) as UpdateLeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.stage && !PIPELINE_STAGES.includes(body.stage)) {
    return NextResponse.json({ ok: false, error: "Invalid pipeline stage." }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "CRM database is not configured." },
      { status: 503 },
    );
  }

  const updates: CrmLeadUpdate = {};
  if (body.stage) updates.stage = body.stage;
  if (body.notes !== undefined) updates.notes = body.notes?.trim() || null;
  if (body.stage) updates.last_contacted_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("crm_leads")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lead: data });
}
