import type { OpenRouterModelKey } from "@/lib/ai/models";
import { completeWithOpenRouter } from "@/lib/ai/openrouter";
import {
  parseBioOptimizerResult,
  parseCarouselGeneratorResult,
  parseContentRewriterResult,
  parseHookGeneratorResult,
  parseLinkedInPostFromContent,
  parseToolJson,
} from "@/lib/ai/parse-tool-output";
import {
  BIO_OPTIMIZER_PROMPT,
  CAROUSEL_GENERATOR_PROMPT,
  CONTENT_REWRITER_PROMPT,
  HOOK_GENERATOR_PROMPT,
  LINKEDIN_POST_TOOL_PROMPT,
} from "@/lib/ai/tools/prompts";
import type {
  AiToolId,
  AiToolOutputMap,
  BioOptimizerResult,
  CarouselGeneratorResult,
  ContentRewriterResult,
  HookGeneratorResult,
  PostTone,
  RewriterTone,
} from "@/types/ai-tools";
import type { LinkedInPostPreview } from "@/types/linkedin-post";

export type ToolGenerationResult<T extends AiToolId> = {
  output: AiToolOutputMap[T];
  model: string;
  tokensUsed: number | null;
};

async function runToolCompletion<T extends AiToolId>(options: {
  modelKey: OpenRouterModelKey;
  systemPrompt: string;
  userPrompt: string;
  parse: (content: string) => AiToolOutputMap[T] | null;
  maxTokens?: number;
}): Promise<ToolGenerationResult<T>> {
  const { content, model, tokensUsed } = await completeWithOpenRouter({
    modelKey: options.modelKey,
    systemPrompt: options.systemPrompt,
    userPrompt: options.userPrompt,
    maxTokens: options.maxTokens ?? 1536,
  });

  const output = options.parse(content);
  if (!output) {
    throw new Error("Model response did not match the expected structure.");
  }

  return { output, model, tokensUsed };
}

export async function generateLinkedInPostTool(options: {
  topic: string;
  audience: string;
  tone: PostTone;
  modelKey: OpenRouterModelKey;
}): Promise<ToolGenerationResult<"linkedin_post">> {
  return runToolCompletion({
    modelKey: options.modelKey,
    systemPrompt: LINKEDIN_POST_TOOL_PROMPT,
    userPrompt: `Topic: ${options.topic}
Audience: ${options.audience}
Tone: ${options.tone}

Generate a complete LinkedIn post.`,
    parse: parseLinkedInPostFromContent,
  });
}

export async function generateHookGeneratorTool(options: {
  topic: string;
  audience: string;
  modelKey: OpenRouterModelKey;
}): Promise<ToolGenerationResult<"hook_generator">> {
  return runToolCompletion({
    modelKey: options.modelKey,
    systemPrompt: HOOK_GENERATOR_PROMPT,
    userPrompt: `Topic: ${options.topic}
Audience: ${options.audience}

Generate four engagement-optimized hooks.`,
    parse: (content) => parseToolJson(content, parseHookGeneratorResult),
    maxTokens: 1024,
  });
}

export async function generateBioOptimizerTool(options: {
  role: string;
  industry: string;
  goals: string;
  modelKey: OpenRouterModelKey;
}): Promise<ToolGenerationResult<"bio_optimizer">> {
  return runToolCompletion({
    modelKey: options.modelKey,
    systemPrompt: BIO_OPTIMIZER_PROMPT,
    userPrompt: `Role: ${options.role}
Industry: ${options.industry}
Goals: ${options.goals}

Generate premium LinkedIn bio positioning.`,
    parse: (content) => parseToolJson(content, parseBioOptimizerResult),
    maxTokens: 1536,
  });
}

export async function generateContentRewriterTool(options: {
  text: string;
  tone: RewriterTone;
  modelKey: OpenRouterModelKey;
}): Promise<ToolGenerationResult<"content_rewriter">> {
  return runToolCompletion({
    modelKey: options.modelKey,
    systemPrompt: CONTENT_REWRITER_PROMPT,
    userPrompt: `Tone: ${options.tone}

Original text:
${options.text}

Rewrite for executive authority.`,
    parse: (content) => parseToolJson(content, (raw) => parseContentRewriterResult(raw, options.tone)),
    maxTokens: 1536,
  });
}

export async function generateCarouselTool(options: {
  topic: string;
  modelKey: OpenRouterModelKey;
}): Promise<ToolGenerationResult<"carousel">> {
  return runToolCompletion({
    modelKey: options.modelKey,
    systemPrompt: CAROUSEL_GENERATOR_PROMPT,
    userPrompt: `Main topic: ${options.topic}

Generate a complete 9-slide carousel plan.`,
    parse: (content) => parseToolJson(content, parseCarouselGeneratorResult),
    maxTokens: 2048,
  });
}

export function serializeToolOutput(output: AiToolOutputMap[AiToolId]): string {
  return JSON.stringify(output);
}

export function buildPromptSummary(
  tool: AiToolId,
  fields: Record<string, string>,
): string {
  switch (tool) {
    case "linkedin_post":
      return [fields.topic, fields.audience, fields.tone].filter(Boolean).join(" · ");
    case "hook_generator":
      return [fields.topic, fields.audience].filter(Boolean).join(" · ");
    case "bio_optimizer":
      return [fields.role, fields.industry, fields.goals].filter(Boolean).join(" · ");
    case "content_rewriter":
      return fields.text?.slice(0, 120) ?? "";
    case "carousel":
      return fields.topic ?? "";
    default:
      return "";
  }
}

export type { LinkedInPostPreview, HookGeneratorResult, BioOptimizerResult, ContentRewriterResult, CarouselGeneratorResult };
