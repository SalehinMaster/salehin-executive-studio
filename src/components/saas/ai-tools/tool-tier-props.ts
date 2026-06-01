import type { OpenRouterModelKey } from "@/lib/ai/models";
import type { SaasTierId } from "@/lib/saas/subscription-plans";

export type AiToolTierProps = {
  tier: SaasTierId;
  allowedModels: readonly OpenRouterModelKey[];
};
