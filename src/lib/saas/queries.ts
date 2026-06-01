import { createClient } from "@/utils/supabase/server";
import type {
  Generation,
  Subscription,
  UsageRecord,
  UserProfile,
} from "@/types/database";

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

export async function fetchFavoriteGenerationIds(userId: string): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("favorites")
    .select("generation_id")
    .eq("user_id", userId);

  return (data ?? []).map((row) => row.generation_id as string);
}

export async function searchGenerations(
  userId: string,
  query: string,
  limit = 50,
): Promise<Generation[]> {
  const supabase = await createClient();
  const trimmed = query.trim();

  let builder = supabase
    .from("generations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (trimmed) {
    const pattern = `%${trimmed.replace(/[%_]/g, "")}%`;
    builder = builder.or(
      `title.ilike.${pattern},prompt.ilike.${pattern},output.ilike.${pattern}`,
    );
  }

  const { data } = await builder;
  return (data ?? []) as Generation[];
}

export type UsageAnalytics = {
  totalGenerations: number;
  dailyCount: number;
  monthlyCount: number;
  toolBreakdown: { tool: string; count: number }[];
  dailySeries: { date: string; count: number }[];
  recentRecords: UsageRecord[];
};

export async function fetchUsageAnalytics(userId: string): Promise<UsageAnalytics> {
  const supabase = await createClient();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [windowResult, dailyResult, monthlyResult] = await Promise.all([
    supabase
      .from("usage_tracking")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: false }),
    supabase
      .from("usage_tracking")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("action", "generation")
      .gte("created_at", startOfDay.toISOString()),
    supabase
      .from("usage_tracking")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("action", "generation")
      .gte("created_at", startOfMonth.toISOString()),
  ]);

  const records = (windowResult.data ?? []) as UsageRecord[];
  const generationRecords = records.filter((row) => row.action === "generation");

  const toolCounts = new Map<string, number>();
  for (const row of generationRecords) {
    const meta = row.metadata as { aiTool?: string } | null;
    const tool = meta?.aiTool ?? "unknown";
    toolCounts.set(tool, (toolCounts.get(tool) ?? 0) + 1);
  }

  const dayMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dayMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const row of generationRecords) {
    const key = row.created_at.slice(0, 10);
    if (dayMap.has(key)) {
      dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
    }
  }

  return {
    totalGenerations: generationRecords.length,
    dailyCount: dailyResult.count ?? 0,
    monthlyCount: monthlyResult.count ?? 0,
    toolBreakdown: [...toolCounts.entries()]
      .map(([tool, count]) => ({ tool, count }))
      .sort((a, b) => b.count - a.count),
    dailySeries: [...dayMap.entries()].map(([date, count]) => ({ date, count })),
    recentRecords: records.slice(0, 15),
  };
}

export async function fetchSubscription(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  return data as Subscription | null;
}
