import { FileText, Sparkles, Wand2, Zap } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { ButtonLink } from "@/components/ui/button-link";
import { requireSessionUser } from "@/lib/auth/session";
import { fetchSaasDashboardData } from "@/lib/saas/queries";
import { isCrmAdminEmail } from "@/lib/crm/admin";

export default async function DashboardHomePage() {
  const { user } = await requireSessionUser("/dashboard");
  const { profile, subscription, recentGenerations, favoritesCount, recentUsage } =
    await fetchSaasDashboardData(user.id);

  const tier = profile?.tier ?? "free";
  const plan = subscription?.plan ?? "free";
  const crmAdmin = isCrmAdminEmail(user.email);
  const generationCount = recentGenerations.length;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">Dashboard</p>
        <h1 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
          Your brand operating system
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Generate authority content, review saved outputs, and track AI usage — all
          in one executive-grade workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-5">
          <p className="text-eyebrow text-muted">Plan</p>
          <p className="mt-2 flex items-center gap-2 font-display text-2xl capitalize text-foreground">
            {tier === "premium" && <Sparkles className="size-5 text-primary" aria-hidden />}
            {plan}
          </p>
          <p className="mt-1 text-xs text-subtle">{subscription?.status ?? "active"}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-eyebrow text-muted">Recent outputs</p>
          <p className="mt-2 font-display text-2xl text-foreground">{generationCount}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-eyebrow text-muted">Favorites</p>
          <p className="mt-2 font-display text-2xl text-foreground">{favoritesCount}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-eyebrow text-muted">Usage events</p>
          <p className="mt-2 font-display text-2xl text-foreground">{recentUsage.length}</p>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard variant="strong" glow="soft" className="space-y-6 p-6">
          <div>
            <p className="text-eyebrow text-secondary">Quick actions</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href="/dashboard/ai-tools" className="gap-2">
                <Wand2 className="size-4" aria-hidden />
                Open AI Tools
              </ButtonLink>
              <ButtonLink href="/dashboard/saved" variant="secondary" className="gap-2">
                <FileText className="size-4" aria-hidden />
                Saved outputs
              </ButtonLink>
              <ButtonLink href="/dashboard/analytics" variant="ghost" className="gap-2">
                <Zap className="size-4" aria-hidden />
                Analytics
              </ButtonLink>
            </div>
          </div>

          {crmAdmin ? (
            <div className="border-t border-border/80 pt-6">
              <p className="text-eyebrow text-muted">Admin</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <ButtonLink href="/crm" variant="ghost" className="text-xs">
                  CRM
                </ButtonLink>
                <ButtonLink href="/operations" variant="ghost" className="text-xs">
                  Operations
                </ButtonLink>
                <ButtonLink href="/client" variant="ghost" className="text-xs">
                  Client portal
                </ButtonLink>
              </div>
            </div>
          ) : null}
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-eyebrow text-primary">Latest generations</p>
          {recentGenerations.length > 0 ? (
            <ul className="space-y-3">
              {recentGenerations.map((gen) => (
                <li
                  key={gen.id}
                  className="rounded-lg border border-border bg-surface/40 px-4 py-3"
                >
                  <p className="text-sm font-medium text-foreground">
                    {gen.title ?? gen.prompt}
                  </p>
                  <p className="mt-1 text-xs text-muted capitalize">
                    {gen.tool_type.replace("_", " ")}
                    {gen.model ? ` · ${gen.model}` : ""} ·{" "}
                    {new Date(gen.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">
              No generations yet.{" "}
              <Link href="/dashboard/ai-tools" className="text-primary hover:underline">
                Create your first post
              </Link>
              .
            </p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
