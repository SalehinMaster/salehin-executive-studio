import { NextResponse } from "next/server";
import { requireCrmAdmin } from "@/lib/crm/auth-request";
import type { LeadPipelineStage } from "@/lib/crm/types";
import { createServiceClient } from "@/utils/supabase/service";

const PIPELINE_STAGES: LeadPipelineStage[] = [
  "new_lead",
  "qualified_lead",
  "discovery_call",
  "proposal_sent",
  "client_won",
  "client_lost",
];

export async function GET() {
  const auth = await requireCrmAdmin();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "CRM database is not configured." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("crm_leads")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, leads: data });
}

type CreateLeadBody = {
  fullName?: string;
  email?: string;
  company?: string;
  stage?: LeadPipelineStage;
};

export async function POST(request: Request) {
  const auth = await requireCrmAdmin();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  let body: CreateLeadBody;
  try {
    body = (await request.json()) as CreateLeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  if (!fullName) {
    return NextResponse.json(
      { ok: false, error: "Full name is required." },
      { status: 400 },
    );
  }

  const stage = body.stage ?? "new_lead";
  if (!PIPELINE_STAGES.includes(stage)) {
    return NextResponse.json({ ok: false, error: "Invalid pipeline stage." }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "CRM database is not configured." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("crm_leads")
    .insert({
      full_name: fullName,
      email: body.email?.trim() || null,
      company: body.company?.trim() || null,
      stage,
      source: "manual",
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lead: data });
}
