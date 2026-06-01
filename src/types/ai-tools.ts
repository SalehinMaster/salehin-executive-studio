import type { OpenRouterModelKey } from "@/lib/ai/models";
import type { LinkedInPostPreview } from "@/types/linkedin-post";

export type AiToolId =
  | "linkedin_post"
  | "hook_generator"
  | "bio_optimizer"
  | "content_rewriter"
  | "carousel";

export type PostTone =
  | "professional"
  | "bold"
  | "conversational"
  | "educational"
  | "inspirational";

export type RewriterTone = "founder" | "professional" | "executive";

export type HookStyle = "curiosity" | "authority" | "contrarian" | "story";

export type HookGeneratorResult = Record<HookStyle, string>;

export type BioOptimizerResult = {
  headlineOptions: string[];
  aboutSection: string;
  positioningStatement: string;
  proofBullets: string[];
  keywords: string[];
};

export type ContentRewriterResult = {
  rewritten: string;
  tone: RewriterTone;
};

export type CarouselSlide = {
  slideNumber: number;
  title: string | null;
  body: string | null;
  visualPrompt: string | null;
};

export type CarouselGeneratorResult = {
  slides: CarouselSlide[];
};

export type AiToolOutputMap = {
  linkedin_post: LinkedInPostPreview;
  hook_generator: HookGeneratorResult;
  bio_optimizer: BioOptimizerResult;
  content_rewriter: ContentRewriterResult;
  carousel: CarouselGeneratorResult;
};

export type LinkedInPostToolRequest = {
  tool: "linkedin_post";
  topic: string;
  audience: string;
  tone: PostTone;
  model: OpenRouterModelKey;
};

export type HookGeneratorToolRequest = {
  tool: "hook_generator";
  topic: string;
  audience: string;
  model: OpenRouterModelKey;
};

export type BioOptimizerToolRequest = {
  tool: "bio_optimizer";
  role: string;
  industry: string;
  goals: string;
  model: OpenRouterModelKey;
};

export type ContentRewriterToolRequest = {
  tool: "content_rewriter";
  text: string;
  tone: RewriterTone;
  model: OpenRouterModelKey;
};

export type CarouselToolRequest = {
  tool: "carousel";
  topic: string;
  model: OpenRouterModelKey;
};

export type AiToolsGenerateRequest =
  | LinkedInPostToolRequest
  | HookGeneratorToolRequest
  | BioOptimizerToolRequest
  | ContentRewriterToolRequest
  | CarouselToolRequest;

export type AiToolsGenerateResponse<T extends AiToolId = AiToolId> = {
  tool: T;
  output: AiToolOutputMap[T];
  generationId: string;
  model: string;
};

export type AiToolsGenerateError = {
  error: string;
};

export const POST_TONE_OPTIONS: ReadonlyArray<{
  value: PostTone;
  label: string;
  description: string;
}> = [
  { value: "professional", label: "Professional", description: "Polished, credible, boardroom-ready" },
  { value: "bold", label: "Bold", description: "Contrarian, high-conviction, scroll-stopping" },
  { value: "conversational", label: "Conversational", description: "Warm, approachable, peer-to-peer" },
  { value: "educational", label: "Educational", description: "Framework-led, teach-first authority" },
  { value: "inspirational", label: "Inspirational", description: "Vision-led, momentum-building" },
] as const;

export const REWRITER_TONE_OPTIONS: ReadonlyArray<{
  value: RewriterTone;
  label: string;
  description: string;
}> = [
  { value: "founder", label: "Founder", description: "Builder energy, candid, operator credibility" },
  { value: "professional", label: "Professional", description: "Clear, measured, client-facing polish" },
  { value: "executive", label: "Executive", description: "C-suite gravitas, strategic, minimal fluff" },
] as const;

export const HOOK_STYLE_META: ReadonlyArray<{
  key: HookStyle;
  label: string;
  description: string;
}> = [
  { key: "curiosity", label: "Curiosity", description: "Open loops that demand the next line" },
  { key: "authority", label: "Authority", description: "Proof-led credibility in one punch" },
  { key: "contrarian", label: "Contrarian", description: "Challenge consensus to spark debate" },
  { key: "story", label: "Story", description: "Micro-narratives with emotional pull" },
] as const;
