/** OpenRouter model slugs — user-selectable in AI Tools */
export const OPENROUTER_MODELS = {
  deepseek: "deepseek/deepseek-chat",
  mistral: "mistralai/mistral-small-3.1-24b-instruct",
  llama: "meta-llama/llama-3.3-70b-instruct",
} as const;

export type OpenRouterModelKey = keyof typeof OPENROUTER_MODELS;

export const OPENROUTER_MODEL_OPTIONS: ReadonlyArray<{
  key: OpenRouterModelKey;
  label: string;
  description: string;
}> = [
  {
    key: "deepseek",
    label: "DeepSeek",
    description: "Fast, reasoning-strong drafts for authority posts",
  },
  {
    key: "mistral",
    label: "Mistral",
    description: "Balanced European model for crisp executive tone",
  },
  {
    key: "llama",
    label: "Llama",
    description: "Meta open model for versatile long-form output",
  },
] as const;

export function isOpenRouterModelKey(value: string): value is OpenRouterModelKey {
  return value in OPENROUTER_MODELS;
}

export function resolveOpenRouterModelId(key: OpenRouterModelKey): string {
  return OPENROUTER_MODELS[key];
}
