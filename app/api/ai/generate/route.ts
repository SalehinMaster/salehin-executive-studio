import { NextResponse } from "next/server";
import { isOpenRouterModelKey } from "@/lib/ai/models";
import { generateLinkedInPostWithOpenRouter, isOpenRouterConfigured } from "@/lib/ai/openrouter";
import { persistGeneration } from "@/lib/ai/persist-generation";
import { getSessionUser } from "@/lib/auth/session";
import type { AiGenerateError, AiGenerateRequest, AiGenerateResponse } from "@/types/ai-generate";
import {
  generateLinkedInPostWithAi,
  isAiConfigured,
} from "@/lib/ai/generate-linkedin-post";

const MAX_TOPIC_LENGTH = 280;

export async function POST(request: Request) {
  const { user } = await getSessionUser();

  if (!user) {
    return NextResponse.json<AiGenerateError>(
      { error: "Sign in to generate content." },
      { status: 401 },
    );
  }

  if (!isOpenRouterConfigured() && !isAiConfigured()) {
    return NextResponse.json<AiGenerateError>(
      {
        error:
          "AI generation is not configured. Add OPENROUTER_API_KEY (recommended) or OPENAI_API_KEY / GEMINI_API_KEY.",
      },
      { status: 503 },
    );
  }

  let body: AiGenerateRequest;

  try {
    body = (await request.json()) as AiGenerateRequest;
  } catch {
    return NextResponse.json<AiGenerateError>(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const topic = body.topic?.trim();
  const modelKey = body.model;

  if (!topic) {
    return NextResponse.json<AiGenerateError>(
      { error: "Topic is required." },
      { status: 400 },
    );
  }

  if (topic.length > MAX_TOPIC_LENGTH) {
    return NextResponse.json<AiGenerateError>(
      { error: `Topic must be ${MAX_TOPIC_LENGTH} characters or fewer.` },
      { status: 400 },
    );
  }

  if (!modelKey || !isOpenRouterModelKey(modelKey)) {
    return NextResponse.json<AiGenerateError>(
      { error: "A valid model selection is required (deepseek, mistral, or llama)." },
      { status: 400 },
    );
  }

  try {
    if (isOpenRouterConfigured()) {
      const { post, model, tokensUsed } = await generateLinkedInPostWithOpenRouter(
        topic,
        modelKey,
      );

      const generationId = await persistGeneration({
        userId: user.id,
        topic,
        post,
        modelKey,
        resolvedModel: model,
        tokensUsed,
      });

      return NextResponse.json<AiGenerateResponse>({
        post,
        generationId,
        model,
      });
    }

    const post = await generateLinkedInPostWithAi(topic);
    const generationId = await persistGeneration({
      userId: user.id,
      topic,
      post,
      modelKey,
      resolvedModel: "fallback",
      tokensUsed: null,
    });

    return NextResponse.json<AiGenerateResponse>({
      post,
      generationId,
      model: "fallback",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate content.";

    console.error("[api/ai/generate]", message);

    return NextResponse.json<AiGenerateError>(
      { error: "Unable to generate your content right now. Please try again." },
      { status: 502 },
    );
  }
}
