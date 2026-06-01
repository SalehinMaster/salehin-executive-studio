import { AiToolsHub } from "@/components/saas/ai-tools-hub";
import { requireSessionUser } from "@/lib/auth/session";
import { fetchSubscription } from "@/lib/saas/queries";
import { resolveSaasTier } from "@/lib/saas/subscription-plans";

export const metadata = {
  title: "AI Tools | Studio",
  description:
    "LinkedIn post generator, hook generator, bio optimizer, content rewriter, and carousel planner.",
};

export default async function AiToolsPage() {
  const { user } = await requireSessionUser("/dashboard/ai-tools");
  const subscription = await fetchSubscription(user.id);
  const tier = resolveSaasTier({
    plan: subscription?.plan,
    status: subscription?.status,
  });

  return <AiToolsHub tier={tier} />;
}
