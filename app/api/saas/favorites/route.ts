import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { logUsage } from "@/lib/saas/telemetry";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { user } = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { generationId?: string };
  try {
    body = (await request.json()) as { generationId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const generationId = body.generationId?.trim();
  if (!generationId) {
    return NextResponse.json({ error: "generationId is required." }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: generation } = await supabase
    .from("generations")
    .select("id")
    .eq("id", generationId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!generation) {
    return NextResponse.json({ error: "Generation not found." }, { status: 404 });
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("generation_id", generationId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase.from("favorites").delete().eq("id", existing.id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    await logUsage({
      userId: user.id,
      action: "favorite_remove",
      metadata: { generationId },
    });
    return NextResponse.json({ favorited: false });
  }

  const { error: insertError } = await supabase.from("favorites").insert({
    user_id: user.id,
    generation_id: generationId,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  await logUsage({
    userId: user.id,
    action: "favorite_add",
    metadata: { generationId },
  });

  return NextResponse.json({ favorited: true });
}
