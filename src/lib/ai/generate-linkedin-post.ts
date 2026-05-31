import type { LinkedInPostPreview } from "@/types/linkedin-post";
import { extractJsonFromText, parseLinkedInPost } from "@/lib/ai/validate-post";

const SYSTEM_PROMPT = `You are an elite LinkedIn ghostwriter for founders, CEOs, and executives at Salehin Executive Studio.

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

type AiProvider = "openai" | "gemini";

function resolveProvider(): AiProvider | null {
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GEMINI_API_KEY) return "gemini";
  return null;
}

async function generateWithOpenAI(topic: string): Promise<LinkedInPostPreview> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.85,
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a LinkedIn post about: ${topic}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${detail}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response.");
  }

  const parsed = parseLinkedInPost(extractJsonFromText(content));
  if (!parsed) {
    throw new Error("OpenAI response did not match the expected post structure.");
  }

  return parsed;
}

async function generateWithGemini(topic: string): Promise<LinkedInPostPreview> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: `Generate a LinkedIn post about: ${topic}` }],
        },
      ],
      generationConfig: {
        temperature: 0.85,
        maxOutputTokens: 1024,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini request failed (${response.status}): ${detail}`);
  }

  const payload = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  const content = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new Error("Gemini returned an empty response.");
  }

  const parsed = parseLinkedInPost(extractJsonFromText(content));
  if (!parsed) {
    throw new Error("Gemini response did not match the expected post structure.");
  }

  return parsed;
}

export function isAiConfigured(): boolean {
  return resolveProvider() !== null;
}

export async function generateLinkedInPostWithAi(
  topic: string,
): Promise<LinkedInPostPreview> {
  const provider = resolveProvider();

  if (!provider) {
    throw new Error(
      "No AI provider configured. Set OPENAI_API_KEY or GEMINI_API_KEY.",
    );
  }

  if (provider === "openai") {
    return generateWithOpenAI(topic);
  }

  return generateWithGemini(topic);
}
