import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { createClient } from "@/utils/supabase/server";

const CATEGORIES = ["general", "ai-tools", "billing", "ux"] as const;

export async function POST(request: Request) {
  const { user } = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to send feedback." }, { status: 401 });
  }

  let body: { rating?: number; category?: string; message?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const message = body.message?.trim();
  const category = body.category?.trim() ?? "general";

  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: "Please provide at least 10 characters of feedback." },
      { status: 400 },
    );
  }

  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const rating =
    body.rating != null ? Math.min(5, Math.max(1, Math.round(body.rating))) : null;

  const supabase = await createClient();
  const { error } = await supabase.from("beta_feedback").insert({
    user_id: user.id,
    rating,
    category,
    message,
    metadata: { source: "dashboard_modal" },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
