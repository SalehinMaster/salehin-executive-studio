import { serializePostContent } from "@/lib/linkedin-demo-generator";
import type { OpenRouterModelKey } from "@/lib/ai/models";
import { resolveOpenRouterModelId } from "@/lib/ai/models";
import type { LinkedInPostPreview } from "@/types/linkedin-post";
import { createClient } from "@/utils/supabase/server";

export async function persistGeneration(options: {
  userId: string;
  topic: string;
  post: LinkedInPostPreview;
  modelKey: OpenRouterModelKey;
  resolvedModel: string;
  tokensUsed: number | null;
}): Promise<string> {
  const supabase = await createClient();
  const output = serializePostContent(options.post);

  const { data: generation, error: generationError } = await supabase
    .from("generations")
    .insert({
      user_id: options.userId,
      tool_type: "linkedin_post",
      title: options.topic.slice(0, 120),
      prompt: options.topic,
      output,
      model: options.resolvedModel,
      platform: "linkedin",
      metadata: { modelKey: options.modelKey },
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
    },
  });

  return generation.id as string;
}
