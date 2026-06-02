import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/service";

type LeadMagnetBody = {
  fullName?: string;
  email?: string;
  company?: string;
  magnetSlug?: string;
  magnetTitle?: string;
};

const MAGNET_WHITELIST = new Set([
  "100-linkedin-hooks-pdf",
  "linkedin-profile-checklist",
  "30-day-personal-branding-plan",
]);

export async function POST(request: Request) {
  let body: LeadMagnetBody;
  try {
    body = (await request.json()) as LeadMagnetBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  const email = body.email?.trim().toLowerCase();
  const company = body.company?.trim() || null;
  const magnetSlug = body.magnetSlug?.trim();
  const magnetTitle = body.magnetTitle?.trim();

  if (!fullName || !email || !magnetSlug || !magnetTitle) {
    return NextResponse.json(
      { ok: false, error: "Full name, email, and magnet selection are required." },
      { status: 400 },
    );
  }

  if (!MAGNET_WHITELIST.has(magnetSlug)) {
    return NextResponse.json({ ok: false, error: "Unsupported lead magnet." }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase service role key is not configured." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("crm_leads").insert({
    full_name: fullName,
    email,
    company,
    source: "lead_magnet",
    stage: "new_lead",
    metadata: {
      leadMagnetSlug: magnetSlug,
      leadMagnetTitle: magnetTitle,
      capturedAt: new Date().toISOString(),
    },
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
