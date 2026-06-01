import { createClient } from "@/utils/supabase/server";
import type { Generation, Subscription, UsageRecord, UserProfile } from "@/types/database";

export async function fetchSaasDashboardData(userId: string) {
  const supabase = await createClient();

  const [profileResult, subscriptionResult, recentGenerationsResult, favoritesCountResult, usageResult] =
    await Promise.all([
      supabase.from("users").select("*").eq("id", userId).single(),
      supabase.from("subscriptions").select("*").eq("user_id", userId).maybeSingle(),
      supabase
        .from("generations")
        .select("id, title, prompt, tool_type, model, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("favorites")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabase
        .from("usage_tracking")
        .select("id, action, model, tokens_used, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  return {
    profile: profileResult.data as UserProfile | null,
    subscription: subscriptionResult.data as Subscription | null,
    recentGenerations: (recentGenerationsResult.data ?? []) as Pick<
      Generation,
      "id" | "title" | "prompt" | "tool_type" | "model" | "created_at"
    >[],
    favoritesCount: favoritesCountResult.count ?? 0,
    recentUsage: (usageResult.data ?? []) as UsageRecord[],
  };
}

export async function fetchGenerations(userId: string, limit = 50) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("generations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as Generation[];
}

export async function fetchFavoriteGenerations(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("favorites")
    .select(
      `
      id,
      created_at,
      generations (
        id,
        title,
        prompt,
        output,
        tool_type,
        model,
        platform,
        created_at
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function fetchUsageSummary(userId: string) {
  const supabase = await createClient();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data, count } = await supabase
    .from("usage_tracking")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .gte("created_at", thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: false });

  const records = (data ?? []) as UsageRecord[];
  const totalTokens = records.reduce((sum, row) => sum + (row.tokens_used ?? 0), 0);
  const generationCount = records.filter((row) => row.action === "generation").length;

  return {
    records,
    totalEvents: count ?? records.length,
    totalTokens,
    generationCount,
  };
}
