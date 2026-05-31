import type { LinkedInPostPreview } from "@/types/linkedin-post";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeHashtags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag.replace(/^#+/, "")}`))
    .slice(0, 8);
}

export function parseLinkedInPost(raw: unknown): LinkedInPostPreview | null {
  if (!raw || typeof raw !== "object") return null;

  const candidate = raw as Record<string, unknown>;

  if (
    !isNonEmptyString(candidate.hook) ||
    !isNonEmptyString(candidate.body) ||
    !isNonEmptyString(candidate.cta)
  ) {
    return null;
  }

  const hashtags = normalizeHashtags(candidate.hashtags);
  if (hashtags.length === 0) return null;

  return {
    hook: candidate.hook.trim(),
    body: candidate.body.trim(),
    cta: candidate.cta.trim(),
    hashtags,
  };
}

export function extractJsonFromText(text: string): unknown {
  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}
