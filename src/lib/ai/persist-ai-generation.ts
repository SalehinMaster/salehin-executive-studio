import type { OpenRouterModelKey } from "@/lib/ai/models";
import { resolveOpenRouterModelId } from "@/lib/ai/models";
import { buildPromptSummary, serializeToolOutput } from "@/lib/ai/tools/generate";
import type { AiToolId, AiToolOutputMap } from "@/types/ai-tools";
import { createClient } from "@/utils/supabase/server";

type GenerationToolType = "linkedin_post" | "twitter_post" | "bio" | "headline" | "other";

function resolveDbToolType(tool: AiToolId): GenerationToolType {
  switch (tool) {
    case "linkedin_post":
      return "linkedin_post";
    case "bio_optimizer":
      return "bio";
    default:
      return "other";
  }
}

export async function persistAiToolGeneration<T extends AiToolId>(options: {
  userId: string;
  tool: T;
  output: AiToolOutputMap[T];
  modelKey: OpenRouterModelKey;
  resolvedModel: string;
  tokensUsed: number | null;
  promptFields: Record<string, string>;
  title?: string;
}): Promise<string> {
  const supabase = await createClient();
  const prompt = buildPromptSummary(options.tool, options.promptFields);
  const output = serializeToolOutput(options.output);

  const { data: generation, error: generationError } = await supabase
    .from("generations")
    .insert({
      user_id: options.userId,
      tool_type: resolveDbToolType(options.tool),
      title: (options.title ?? prompt).slice(0, 120),
      prompt: prompt || options.tool,
      output,
      model: options.resolvedModel,
      platform: "linkedin",
      metadata: {
        modelKey: options.modelKey,
        aiTool: options.tool,
        ...options.promptFields,
      },
    })
    .select("id")
    .single();

  if (generationError || !generation) {
    throw new Error(generationError?.message ?? "Failed to save generation.");
  }

  await supabase.from("usage_tracking").insert({
    user_id: options.userId,
    action: "generation",
    model: options.resolvedModel,
    tokens_used: options.tokensUsed,
    metadata: {
      modelKey: options.modelKey,
      openRouterModel: resolveOpenRouterModelId(options.modelKey),
      generationId: generation.id,
      aiTool: options.tool,
    },
  });

  return generation.id as string;
}
