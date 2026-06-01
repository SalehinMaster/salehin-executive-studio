import type { AiToolId } from "@/types/ai-tools";
import type { Json } from "@/types/database";
import { createClient } from "@/utils/supabase/server";

export type UsageAction =
  | "generation"
  | "tool_view"
  | "favorite_add"
  | "favorite_remove"
  | "generation_delete"
  | "search";

export type LogUsageOptions = {
  userId: string;
  action: UsageAction;
  model?: string | null;
  tokensUsed?: number | null;
  metadata?: Record<string, Json>;
};

/** Server-side telemetry writer for `usage_tracking` (Phase 52). */
export async function logUsage(options: LogUsageOptions): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("usage_tracking").insert({
    user_id: options.userId,
    action: options.action,
    model: options.model ?? null,
    tokens_used: options.tokensUsed ?? null,
    metadata: (options.metadata ?? {}) as Json,
  });

  if (error) {
    console.error("[telemetry] logUsage failed:", error.message);
  }
}

export async function logGenerationUsage(options: {
  userId: string;
  tool: AiToolId;
  model: string;
  tokensUsed: number | null;
  generationId: string;
  modelKey?: string;
}): Promise<void> {
  await logUsage({
    userId: options.userId,
    action: "generation",
    model: options.model,
    tokensUsed: options.tokensUsed,
    metadata: {
      aiTool: options.tool,
      generationId: options.generationId,
      ...(options.modelKey ? { modelKey: options.modelKey } : {}),
    },
  });
}
