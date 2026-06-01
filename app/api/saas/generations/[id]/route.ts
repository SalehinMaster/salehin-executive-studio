import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { logUsage } from "@/lib/saas/telemetry";
import { createClient } from "@/utils/supabase/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  const { user } = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const supabase = await createClient();

  const { error } = await supabase
    .from("generations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logUsage({
    userId: user.id,
    action: "generation_delete",
    metadata: { generationId: id },
  });

  return NextResponse.json({ ok: true });
}
