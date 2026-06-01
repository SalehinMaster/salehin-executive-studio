import type { OpenRouterModelKey } from "@/lib/ai/models";
import type { AiToolId } from "@/types/ai-tools";
import type { Subscription, SubscriptionStatus } from "@/types/database";
import {
  getTierConfig,
  resolveSaasTier,
  tierMeetsMinimum,
  TOOL_MIN_TIER,
  type SaasTierId,
} from "@/lib/saas/subscription-plans";

export type AccessContext = {
  tier: SaasTierId;
  subscription: Subscription | null;
};

export function buildAccessContext(subscription: Subscription | null): AccessContext {
  const tier = resolveSaasTier({
    plan: subscription?.plan,
    status: subscription?.status,
  });
  return { tier, subscription };
}

export function canAccessTool(tier: SaasTierId, tool: AiToolId): boolean {
  return tierMeetsMinimum(tier, TOOL_MIN_TIER[tool]);
}

export function canUseModel(tier: SaasTierId, model: OpenRouterModelKey): boolean {
  const { limits } = getTierConfig(tier);
  return limits.models.includes(model);
}

export function getToolUpgradeTier(tool: AiToolId): SaasTierId {
  return TOOL_MIN_TIER[tool];
}

export function getAccessDeniedMessage(tool: AiToolId, tier: SaasTierId): string {
  const required = TOOL_MIN_TIER[tool];
  if (tierMeetsMinimum(tier, required)) {
    return "This tool is not available on your plan.";
  }
  const label = required === "agency" ? "Agency" : required === "pro" ? "Pro" : "Free";
  return `Upgrade to ${label} to unlock this tool.`;
}

export type UsageLimitCheck = {
  allowed: boolean;
  reason?: string;
  dailyCount: number;
  monthlyCount: number;
  dailyLimit: number | null;
  monthlyLimit: number | null;
};

export function evaluateUsageLimits(options: {
  tier: SaasTierId;
  dailyCount: number;
  monthlyCount: number;
}): UsageLimitCheck {
  const { limits } = getTierConfig(options.tier);
  const dailyLimit = limits.dailyGenerations;
  const monthlyLimit = limits.monthlyGenerations;

  if (dailyLimit != null && options.dailyCount >= dailyLimit) {
    return {
      allowed: false,
      reason: `Daily limit reached (${dailyLimit} generations). Upgrade for more capacity.`,
      dailyCount: options.dailyCount,
      monthlyCount: options.monthlyCount,
      dailyLimit,
      monthlyLimit,
    };
  }

  if (monthlyLimit != null && options.monthlyCount >= monthlyLimit) {
    return {
      allowed: false,
      reason: `Monthly limit reached (${monthlyLimit} generations). Upgrade for more capacity.`,
      dailyCount: options.dailyCount,
      monthlyCount: options.monthlyCount,
      dailyLimit,
      monthlyLimit,
    };
  }

  return {
    allowed: true,
    dailyCount: options.dailyCount,
    monthlyCount: options.monthlyCount,
    dailyLimit,
    monthlyLimit,
  };
}

export function isSubscriptionActive(status: SubscriptionStatus | null | undefined): boolean {
  return status === "active" || status === "trialing";
}
