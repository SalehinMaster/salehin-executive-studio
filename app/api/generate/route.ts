import { NextResponse } from "next/server";
import {
  generateLinkedInPostWithAi,
  isAiConfigured,
} from "@/lib/ai/generate-linkedin-post";
import type {
  GeneratePostError,
  GeneratePostRequest,
  GeneratePostResponse,
} from "@/types/linkedin-post";

const MAX_TOPIC_LENGTH = 280;

export async function POST(request: Request) {
  if (!isAiConfigured()) {
    return NextResponse.json<GeneratePostError>(
      {
        error:
          "AI generation is not configured. Add OPENAI_API_KEY or GEMINI_API_KEY to your environment.",
      },
      { status: 503 },
    );
  }

  let body: GeneratePostRequest;

  try {
    body = (await request.json()) as GeneratePostRequest;
  } catch {
    return NextResponse.json<GeneratePostError>(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const topic = body.topic?.trim();

  if (!topic) {
    return NextResponse.json<GeneratePostError>(
      { error: "Topic is required." },
      { status: 400 },
    );
  }

  if (topic.length > MAX_TOPIC_LENGTH) {
    return NextResponse.json<GeneratePostError>(
      { error: `Topic must be ${MAX_TOPIC_LENGTH} characters or fewer.` },
      { status: 400 },
    );
  }

  try {
    const post = await generateLinkedInPostWithAi(topic);

    return NextResponse.json<GeneratePostResponse>({ post });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate post.";

    console.error("[api/generate]", message);

    return NextResponse.json<GeneratePostError>(
      { error: "Unable to generate your post right now. Please try again." },
      { status: 502 },
    );
  }
}
