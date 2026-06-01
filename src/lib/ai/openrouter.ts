import type { OpenRouterModelKey } from "@/lib/ai/models";
import { resolveOpenRouterModelId } from "@/lib/ai/models";
import type { LinkedInPostPreview } from "@/types/linkedin-post";
import { extractJsonFromText, parseLinkedInPost } from "@/lib/ai/validate-post";

const LINKEDIN_SYSTEM_PROMPT = `You are an elite LinkedIn ghostwriter for founders, CEOs, and executives at Salehin Executive Studio.

Write authority-grade posts that stop the scroll, build trust with proof-led narrative, and drive meaningful engagement.

Return ONLY valid JSON with this exact shape:
{
  "hook": "1-2 punchy opening lines separated by \\n",
  "body": "Proof-led body copy with strategic line breaks using \\n and optional bullet arrows (→)",
  "cta": "Engagement-driving call to action that invites comments or DMs",
  "hashtags": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5"]
}

Rules:
- Hook must create tension or a bold insight in the first line
- Body should be 80-160 words, scannable, executive tone
- CTA must feel natural, not salesy
- Exactly 5 hashtags, each starting with #
- No markdown, no code fences, no extra keys`;

export type OpenRouterCompletionResult = {
  content: string;
  model: string;
  tokensUsed: number | null;
};

export function isOpenRouterConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY?.trim());
}

export async function completeWithOpenRouter(options: {
  modelKey: OpenRouterModelKey;
  userPrompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<OpenRouterCompletionResult> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const model = resolveOpenRouterModelId(options.modelKey);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": siteUrl,
      "X-Title": "Salehin Executive Studio",
    },
    body: JSON.stringify({
      model,
      temperature: options.temperature ?? 0.85,
      max_tokens: options.maxTokens ?? 1024,
      messages: [
        {
          role: "system",
          content: options.systemPrompt ?? LINKEDIN_SYSTEM_PROMPT,
        },
        { role: "user", content: options.userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenRouter request failed (${response.status}): ${detail}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    model?: string;
    usage?: { total_tokens?: number };
  };

  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return {
    content,
    model: payload.model ?? model,
    tokensUsed: payload.usage?.total_tokens ?? null,
  };
}

export async function generateLinkedInPostWithOpenRouter(
  topic: string,
  modelKey: OpenRouterModelKey,
): Promise<{ post: LinkedInPostPreview; model: string; tokensUsed: number | null }> {
  const { content, model, tokensUsed } = await completeWithOpenRouter({
    modelKey,
    userPrompt: `Generate a LinkedIn post about: ${topic}`,
  });

  const parsed = parseLinkedInPost(extractJsonFromText(content));
  if (!parsed) {
    throw new Error("Model response did not match the expected post structure.");
  }

  return { post: parsed, model, tokensUsed };
}
