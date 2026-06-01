import type {
  BioOptimizerResult,
  CarouselGeneratorResult,
  CarouselSlide,
  ContentRewriterResult,
  HookGeneratorResult,
  HookStyle,
  RewriterTone,
} from "@/types/ai-tools";
import type { LinkedInPostPreview } from "@/types/linkedin-post";
import { extractJsonFromText, parseLinkedInPost } from "@/lib/ai/validate-post";

const HOOK_STYLES: HookStyle[] = ["curiosity", "authority", "contrarian", "story"];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
}

export function parseHookGeneratorResult(raw: unknown): HookGeneratorResult | null {
  if (!raw || typeof raw !== "object") return null;
  const candidate = raw as Record<string, unknown>;
  const result = {} as HookGeneratorResult;

  for (const style of HOOK_STYLES) {
    if (!isNonEmptyString(candidate[style])) return null;
    result[style] = candidate[style].trim();
  }

  return result;
}

export function parseBioOptimizerResult(raw: unknown): BioOptimizerResult | null {
  if (!raw || typeof raw !== "object") return null;
  const candidate = raw as Record<string, unknown>;

  if (
    !isStringArray(candidate.headlineOptions) ||
    !isNonEmptyString(candidate.aboutSection) ||
    !isNonEmptyString(candidate.positioningStatement) ||
    !isStringArray(candidate.proofBullets) ||
    !isStringArray(candidate.keywords)
  ) {
    return null;
  }

  return {
    headlineOptions: candidate.headlineOptions.map((s) => s.trim()).slice(0, 5),
    aboutSection: candidate.aboutSection.trim(),
    positioningStatement: candidate.positioningStatement.trim(),
    proofBullets: candidate.proofBullets.map((s) => s.trim()).slice(0, 6),
    keywords: candidate.keywords.map((s) => s.trim()).slice(0, 12),
  };
}

export function parseContentRewriterResult(
  raw: unknown,
  tone: RewriterTone,
): ContentRewriterResult | null {
  if (!raw || typeof raw !== "object") return null;
  const candidate = raw as Record<string, unknown>;

  if (!isNonEmptyString(candidate.rewritten)) return null;

  return {
    rewritten: candidate.rewritten.trim(),
    tone,
  };
}

function parseCarouselSlide(raw: unknown): CarouselSlide | null {
  if (!raw || typeof raw !== "object") return null;
  const candidate = raw as Record<string, unknown>;

  const slideNumber =
    typeof candidate.slideNumber === "number"
      ? candidate.slideNumber
      : typeof candidate.number === "number"
        ? candidate.number
        : null;

  if (slideNumber === null || slideNumber < 1 || slideNumber > 9) return null;

  const title =
    candidate.title === null || candidate.title === undefined
      ? null
      : isNonEmptyString(candidate.title)
        ? candidate.title.trim()
        : null;

  const body =
    candidate.body === null || candidate.body === undefined
      ? null
      : isNonEmptyString(candidate.body)
        ? candidate.body.trim()
        : null;

  const visualPrompt =
    candidate.visualPrompt === null || candidate.visualPrompt === undefined
      ? null
      : isNonEmptyString(candidate.visualPrompt)
        ? candidate.visualPrompt.trim()
        : null;

  if (!title && !body && !visualPrompt) return null;

  return { slideNumber, title, body, visualPrompt };
}

export function parseCarouselGeneratorResult(raw: unknown): CarouselGeneratorResult | null {
  if (!raw || typeof raw !== "object") return null;
  const candidate = raw as Record<string, unknown>;

  if (!Array.isArray(candidate.slides)) return null;

  const slides = candidate.slides
    .map((slide) => parseCarouselSlide(slide))
    .filter((slide): slide is CarouselSlide => slide !== null);

  if (slides.length < 9) return null;

  const ordered = [...slides].sort((a, b) => a.slideNumber - b.slideNumber).slice(0, 9);
  return { slides: ordered };
}

export function parseToolJson<T>(
  content: string,
  parser: (raw: unknown) => T | null,
): T | null {
  const raw = extractJsonFromText(content);
  if (raw === null) return null;
  return parser(raw);
}

export function parseLinkedInPostFromContent(content: string): LinkedInPostPreview | null {
  const raw = extractJsonFromText(content);
  if (raw === null) return null;
  return parseLinkedInPost(raw);
}
