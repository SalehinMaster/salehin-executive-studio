import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { createClient } from "@/utils/supabase/server";

const SEVERITIES = ["low", "medium", "high", "critical"] as const;

export async function GET() {
  const { user } = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("beta_bug_reports")
    .select("id, title, description, severity, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reports: data ?? [] });
}

export async function POST(request: Request) {
  const { user } = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to report a bug." }, { status: 401 });
  }

  let body: { title?: string; description?: string; severity?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const title = body.title?.trim();
  const description = body.description?.trim();
  const severity = body.severity?.trim() ?? "medium";

  if (!title || title.length < 3) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!description || description.length < 10) {
    return NextResponse.json(
      { error: "Please describe the issue in at least 10 characters." },
      { status: 400 },
    );
  }
  if (!SEVERITIES.includes(severity as (typeof SEVERITIES)[number])) {
    return NextResponse.json({ error: "Invalid severity." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("beta_bug_reports")
    .insert({
      user_id: user.id,
      title,
      description,
      severity,
      metadata: { source: "dashboard" },
    })
    .select("id, title, severity, status, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ report: data });
}
