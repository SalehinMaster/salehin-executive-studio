import { NextResponse } from "next/server";
import { BUDGET_RANGE_OPTIONS } from "@/lib/crm/constants";
import type { BudgetRange, ClientIntakePayload } from "@/lib/crm/types";
import { createServiceClient } from "@/utils/supabase/service";

const BUDGET_VALUES = new Set(BUDGET_RANGE_OPTIONS.map((o) => o.value));

function validatePayload(body: Partial<ClientIntakePayload>): string | null {
  if (!body.fullName?.trim()) return "Name is required.";
  if (!body.company?.trim()) return "Company is required.";
  if (!body.businessGoals?.trim()) return "Business goals are required.";
  if (!body.currentChallenges?.trim()) return "Current challenges are required.";
  if (!body.budgetRange || !BUDGET_VALUES.has(body.budgetRange)) {
    return "Please select a valid budget range.";
  }
  return null;
}

export async function POST(request: Request) {
  let body: Partial<ClientIntakePayload>;
  try {
    body = (await request.json()) as Partial<ClientIntakePayload>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const validationError = validatePayload(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Intake system is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const budgetRange = body.budgetRange as BudgetRange;

  const { data: lead, error: leadError } = await supabase
    .from("crm_leads")
    .insert({
      full_name: body.fullName!.trim(),
      company: body.company!.trim(),
      linkedin_url: body.linkedinUrl?.trim() || null,
      website: body.website?.trim() || null,
      business_goals: body.businessGoals!.trim(),
      current_challenges: body.currentChallenges!.trim(),
      budget_range: budgetRange,
      stage: "qualified_lead",
      source: "intake_form",
    })
    .select("id")
    .single();

  if (leadError) {
    console.error("[intake] lead:", leadError.message);
    return NextResponse.json(
      { ok: false, error: "Failed to save your application." },
      { status: 500 },
    );
  }

  const { error: intakeError } = await supabase.from("client_intake_submissions").insert({
    full_name: body.fullName!.trim(),
    company: body.company!.trim(),
    linkedin_url: body.linkedinUrl?.trim() || null,
    website: body.website?.trim() || null,
    business_goals: body.businessGoals!.trim(),
    current_challenges: body.currentChallenges!.trim(),
    budget_range: budgetRange,
    lead_id: lead.id,
  });

  if (intakeError) {
    console.error("[intake] submission:", intakeError.message);
    return NextResponse.json(
      { ok: false, error: "Failed to save your application." },
      { status: 500 },
    );
  }

  await supabase.from("funnel_events").insert({
    step: "client",
    metadata: { source: "intake_form", lead_id: lead.id },
  });

  return NextResponse.json({ ok: true, leadId: lead.id });
}
