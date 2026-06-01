import type { SubscriptionPlan, SubscriptionStatus } from "@/types/database";
import type { AiToolId } from "@/types/ai-tools";

/** Display tier id — maps `enterprise` DB plan to Agency for Stripe-ready mocks. */
export type SaasTierId = "free" | "pro" | "agency";

export type SaasTierConfig = {
  id: SaasTierId;
  dbPlan: SubscriptionPlan;
  label: string;
  tagline: string;
  priceMonthly: number | null;
  stripePriceIdMock: string | null;
  highlighted?: boolean;
  features: readonly string[];
  limits: {
    dailyGenerations: number | null;
    monthlyGenerations: number | null;
    savedOutputs: number | null;
    models: readonly ("deepseek" | "mistral" | "llama")[];
  };
};

export const SAAS_TIER_ORDER: readonly SaasTierId[] = ["free", "pro", "agency"] as const;

export const SAAS_TIER_CONFIG: Record<SaasTierId, SaasTierConfig> = {
  free: {
    id: "free",
    dbPlan: "free",
    label: "Free",
    tagline: "Start building authority with core AI tools.",
    priceMonthly: 0,
    stripePriceIdMock: null,
    features: [
      "LinkedIn Post & Hook generators",
      "5 generations per day",
      "Saved output history (last 25)",
      "Usage analytics (30-day window)",
    ],
    limits: {
      dailyGenerations: 5,
      monthlyGenerations: 50,
      savedOutputs: 25,
      models: ["deepseek"],
    },
  },
  pro: {
    id: "pro",
    dbPlan: "pro",
    label: "Pro",
    tagline: "Full rewrite and bio suite for growing executives.",
    priceMonthly: 49,
    stripePriceIdMock: "price_mock_pro_monthly",
    highlighted: true,
    features: [
      "Everything in Free",
      "Bio Optimizer & Content Rewriter",
      "50 generations per day",
      "All OpenRouter models",
      "Unlimited saved outputs",
    ],
    limits: {
      dailyGenerations: 50,
      monthlyGenerations: 500,
      savedOutputs: null,
      models: ["deepseek", "mistral", "llama"],
    },
  },
  agency: {
    id: "agency",
    dbPlan: "enterprise",
    label: "Agency",
    tagline: "Carousel planning and team-scale limits for agencies.",
    priceMonthly: 149,
    stripePriceIdMock: "price_mock_agency_monthly",
    features: [
      "Everything in Pro",
      "Carousel generator",
      "Unlimited daily generations",
      "Priority model routing (mock)",
      "Stripe seat billing ready",
    ],
    limits: {
      dailyGenerations: null,
      monthlyGenerations: null,
      savedOutputs: null,
      models: ["deepseek", "mistral", "llama"],
    },
  },
};

const TIER_RANK: Record<SaasTierId, number> = { free: 0, pro: 1, agency: 2 };

export function dbPlanToSaasTier(plan: SubscriptionPlan | null | undefined): SaasTierId {
  if (plan === "pro") return "pro";
  if (plan === "enterprise") return "agency";
  return "free";
}

export function resolveSaasTier(options: {
  plan?: SubscriptionPlan | null;
  status?: SubscriptionStatus | null;
}): SaasTierId {
  const { plan, status } = options;
  if (!plan || plan === "free") return "free";
  if (status && status !== "active" && status !== "trialing") return "free";
  return dbPlanToSaasTier(plan);
}

export function tierMeetsMinimum(current: SaasTierId, required: SaasTierId): boolean {
  return TIER_RANK[current] >= TIER_RANK[required];
}

/** Minimum tier required per AI tool (Phases 54–55 access control). */
export const TOOL_MIN_TIER: Record<AiToolId, SaasTierId> = {
  linkedin_post: "free",
  hook_generator: "free",
  bio_optimizer: "pro",
  content_rewriter: "pro",
  carousel: "agency",
};

export function getTierConfig(tier: SaasTierId): SaasTierConfig {
  return SAAS_TIER_CONFIG[tier];
}
