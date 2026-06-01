import { NextResponse } from "next/server";
import type { FunnelStep } from "@/lib/crm/types";
import { createServiceClient } from "@/utils/supabase/service";

const FUNNEL_STEPS: FunnelStep[] = [
  "homepage",
  "lead_magnet",
  "calendly_booking",
  "discovery_call",
  "proposal",
  "client",
];

type TrackBody = {
  step?: string;
  sessionId?: string;
  pagePath?: string;
  referrer?: string;
};

export async function POST(request: Request) {
  let body: TrackBody;
  try {
    body = (await request.json()) as TrackBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const step = body.step as FunnelStep | undefined;
  if (!step || !FUNNEL_STEPS.includes(step)) {
    return NextResponse.json({ ok: false, error: "Invalid funnel step." }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("funnel_events").insert({
    step,
    session_id: body.sessionId?.trim() || null,
    page_path: body.pagePath?.trim() || null,
    referrer: body.referrer?.trim() || null,
  });

  if (error) {
    console.error("[funnel] track:", error.message);
    return NextResponse.json({ ok: false, error: "Failed to record event." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
