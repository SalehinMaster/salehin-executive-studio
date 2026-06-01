import type { OpenRouterModelKey } from "@/lib/ai/models";
import type { LinkedInPostPreview } from "@/types/linkedin-post";

export type AiGenerateRequest = {
  topic: string;
  model: OpenRouterModelKey;
};

export type AiGenerateResponse = {
  post: LinkedInPostPreview;
  generationId: string;
  model: string;
};

export type AiGenerateError = {
  error: string;
};
