import { NextResponse } from "next/server";
import { isOpenRouterModelKey } from "@/lib/ai/models";
import { isOpenRouterConfigured } from "@/lib/ai/openrouter";
import { persistAiToolGeneration } from "@/lib/ai/persist-ai-generation";
import {
  generateBioOptimizerTool,
  generateCarouselTool,
  generateContentRewriterTool,
  generateHookGeneratorTool,
  generateLinkedInPostTool,
} from "@/lib/ai/tools/generate";
import { getSessionUser } from "@/lib/auth/session";
import {
  buildAccessContext,
  canAccessTool,
  canUseModel,
  evaluateUsageLimits,
  getAccessDeniedMessage,
} from "@/lib/saas/access-control";
import { fetchSubscription, fetchUsageAnalytics } from "@/lib/saas/queries";
import type {
  AiToolsGenerateError,
  AiToolsGenerateRequest,
  AiToolsGenerateResponse,
  PostTone,
  RewriterTone,
} from "@/types/ai-tools";

const MAX_TOPIC = 280;
const MAX_AUDIENCE = 120;
const MAX_ROLE = 120;
const MAX_INDUSTRY = 120;
const MAX_GOALS = 400;
const MAX_REWRITE = 4000;
const MAX_CAROUSEL_TOPIC = 280;

const POST_TONES: PostTone[] = [
  "professional",
  "bold",
  "conversational",
  "educational",
  "inspirational",
];

const REWRITER_TONES: RewriterTone[] = ["founder", "professional", "executive"];

function isPostTone(value: string): value is PostTone {
  return POST_TONES.includes(value as PostTone);
}

function isRewriterTone(value: string): value is RewriterTone {
  return REWRITER_TONES.includes(value as RewriterTone);
}

export async function POST(request: Request) {
  const { user } = await getSessionUser();

  if (!user) {
    return NextResponse.json<AiToolsGenerateError>(
      { error: "Sign in to generate content." },
      { status: 401 },
    );
  }

  if (!isOpenRouterConfigured()) {
    return NextResponse.json<AiToolsGenerateError>(
      { error: "AI generation is not configured. Add OPENROUTER_API_KEY to your environment." },
      { status: 503 },
    );
  }

  let body: AiToolsGenerateRequest;

  try {
    body = (await request.json()) as AiToolsGenerateRequest;
  } catch {
    return NextResponse.json<AiToolsGenerateError>(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!body.tool) {
    return NextResponse.json<AiToolsGenerateError>(
      { error: "Tool type is required." },
      { status: 400 },
    );
  }

  if (!body.model || !isOpenRouterModelKey(body.model)) {
    return NextResponse.json<AiToolsGenerateError>(
      { error: "A valid model selection is required (deepseek, mistral, or llama)." },
      { status: 400 },
    );
  }

  const subscription = await fetchSubscription(user.id);
  const { tier } = buildAccessContext(subscription);

  if (!canAccessTool(tier, body.tool)) {
    return NextResponse.json<AiToolsGenerateError>(
      { error: getAccessDeniedMessage(body.tool, tier) },
      { status: 403 },
    );
  }

  if (!canUseModel(tier, body.model)) {
    return NextResponse.json<AiToolsGenerateError>(
      { error: "This model is not available on your plan. Upgrade to Pro or Agency." },
      { status: 403 },
    );
  }

  const usage = await fetchUsageAnalytics(user.id);
  const limitCheck = evaluateUsageLimits({
    tier,
    dailyCount: usage.dailyCount,
    monthlyCount: usage.monthlyCount,
  });

  if (!limitCheck.allowed) {
    return NextResponse.json<AiToolsGenerateError>(
      { error: limitCheck.reason ?? "Usage limit reached." },
      { status: 429 },
    );
  }

  try {
    switch (body.tool) {
      case "linkedin_post": {
        const topic = body.topic?.trim();
        const audience = body.audience?.trim();
        const tone = body.tone;

        if (!topic) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "Topic is required." },
            { status: 400 },
          );
        }
        if (topic.length > MAX_TOPIC) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: `Topic must be ${MAX_TOPIC} characters or fewer.` },
            { status: 400 },
          );
        }
        if (!audience) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "Audience is required." },
            { status: 400 },
          );
        }
        if (audience.length > MAX_AUDIENCE) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: `Audience must be ${MAX_AUDIENCE} characters or fewer.` },
            { status: 400 },
          );
        }
        if (!tone || !isPostTone(tone)) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "A valid tone is required." },
            { status: 400 },
          );
        }

        const { output, model, tokensUsed } = await generateLinkedInPostTool({
          topic,
          audience,
          tone,
          modelKey: body.model,
        });

        const generationId = await persistAiToolGeneration({
          userId: user.id,
          tool: "linkedin_post",
          output,
          modelKey: body.model,
          resolvedModel: model,
          tokensUsed,
          promptFields: { topic, audience, tone },
          title: topic,
        });

        return NextResponse.json<AiToolsGenerateResponse<"linkedin_post">>({
          tool: "linkedin_post",
          output,
          generationId,
          model,
        });
      }

      case "hook_generator": {
        const topic = body.topic?.trim();
        const audience = body.audience?.trim();

        if (!topic) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "Topic is required." },
            { status: 400 },
          );
        }
        if (!audience) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "Audience is required." },
            { status: 400 },
          );
        }

        const { output, model, tokensUsed } = await generateHookGeneratorTool({
          topic,
          audience,
          modelKey: body.model,
        });

        const generationId = await persistAiToolGeneration({
          userId: user.id,
          tool: "hook_generator",
          output,
          modelKey: body.model,
          resolvedModel: model,
          tokensUsed,
          promptFields: { topic, audience },
          title: topic,
        });

        return NextResponse.json<AiToolsGenerateResponse<"hook_generator">>({
          tool: "hook_generator",
          output,
          generationId,
          model,
        });
      }

      case "bio_optimizer": {
        const role = body.role?.trim();
        const industry = body.industry?.trim();
        const goals = body.goals?.trim();

        if (!role || !industry || !goals) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "Role, industry, and goals are all required." },
            { status: 400 },
          );
        }
        if (role.length > MAX_ROLE || industry.length > MAX_INDUSTRY) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "Role and industry must be 120 characters or fewer." },
            { status: 400 },
          );
        }
        if (goals.length > MAX_GOALS) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: `Goals must be ${MAX_GOALS} characters or fewer.` },
            { status: 400 },
          );
        }

        const { output, model, tokensUsed } = await generateBioOptimizerTool({
          role,
          industry,
          goals,
          modelKey: body.model,
        });

        const generationId = await persistAiToolGeneration({
          userId: user.id,
          tool: "bio_optimizer",
          output,
          modelKey: body.model,
          resolvedModel: model,
          tokensUsed,
          promptFields: { role, industry, goals },
          title: role,
        });

        return NextResponse.json<AiToolsGenerateResponse<"bio_optimizer">>({
          tool: "bio_optimizer",
          output,
          generationId,
          model,
        });
      }

      case "content_rewriter": {
        const text = body.text?.trim();
        const tone = body.tone;

        if (!text) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "Text to rewrite is required." },
            { status: 400 },
          );
        }
        if (text.length > MAX_REWRITE) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: `Text must be ${MAX_REWRITE} characters or fewer.` },
            { status: 400 },
          );
        }
        if (!tone || !isRewriterTone(tone)) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "A valid tone is required (founder, professional, or executive)." },
            { status: 400 },
          );
        }

        const { output, model, tokensUsed } = await generateContentRewriterTool({
          text,
          tone,
          modelKey: body.model,
        });

        const generationId = await persistAiToolGeneration({
          userId: user.id,
          tool: "content_rewriter",
          output,
          modelKey: body.model,
          resolvedModel: model,
          tokensUsed,
          promptFields: { text: text.slice(0, 200), tone },
          title: `Rewrite · ${tone}`,
        });

        return NextResponse.json<AiToolsGenerateResponse<"content_rewriter">>({
          tool: "content_rewriter",
          output,
          generationId,
          model,
        });
      }

      case "carousel": {
        const topic = body.topic?.trim();

        if (!topic) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: "Topic is required." },
            { status: 400 },
          );
        }
        if (topic.length > MAX_CAROUSEL_TOPIC) {
          return NextResponse.json<AiToolsGenerateError>(
            { error: `Topic must be ${MAX_CAROUSEL_TOPIC} characters or fewer.` },
            { status: 400 },
          );
        }

        const { output, model, tokensUsed } = await generateCarouselTool({
          topic,
          modelKey: body.model,
        });

        const generationId = await persistAiToolGeneration({
          userId: user.id,
          tool: "carousel",
          output,
          modelKey: body.model,
          resolvedModel: model,
          tokensUsed,
          promptFields: { topic },
          title: topic,
        });

        return NextResponse.json<AiToolsGenerateResponse<"carousel">>({
          tool: "carousel",
          output,
          generationId,
          model,
        });
      }

      default:
        return NextResponse.json<AiToolsGenerateError>(
          { error: "Unknown tool type." },
          { status: 400 },
        );
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate content.";

    console.error("[api/ai/tools]", message);

    return NextResponse.json<AiToolsGenerateError>(
      { error: "Unable to generate your content right now. Please try again." },
      { status: 502 },
    );
  }
}
