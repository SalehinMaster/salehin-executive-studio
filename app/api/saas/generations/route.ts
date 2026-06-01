import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { logUsage } from "@/lib/saas/telemetry";
import { searchGenerations } from "@/lib/saas/queries";

export async function GET(request: Request) {
  const { user } = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

  const generations = await searchGenerations(user.id, q, limit);

  if (q.trim()) {
    await logUsage({
      userId: user.id,
      action: "search",
      metadata: { queryLength: q.trim().length, resultCount: generations.length },
    });
  }

  return NextResponse.json({ generations });
}
