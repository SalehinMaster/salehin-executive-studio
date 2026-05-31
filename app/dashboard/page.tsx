import { redirect } from "next/navigation";
import { FileText, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { DashboardSignOutButton } from "@/components/dashboard/sign-out-button";
import { createClient } from "@/utils/supabase/server";
import type { UserProfile } from "@/types/database";

export const metadata = {
  title: "Dashboard | Salehin Executive Studio",
  description: "Your premium content studio dashboard.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?auth=signin&next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const typedProfile = profile as UserProfile | null;

  const { data: recentPosts } = await supabase
    .from("posts_history")
    .select("id, topic, platform, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const tier = typedProfile?.tier ?? "free";
  const displayName =
    typedProfile?.full_name ??
    user.user_metadata?.full_name ??
    user.email?.split("@")[0] ??
    "Member";

  return (
    <PageShell
      title={`Welcome, ${displayName}`}
      description="Your content studio is ready. Generate posts, track history, and upgrade when you're ready for premium workflows."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard variant="strong" glow="soft" className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-eyebrow text-secondary">Account</p>
              <p className="mt-2 font-display text-xl text-foreground">
                {user.email}
              </p>
            </div>
            <span
              className={
                tier === "premium"
                  ? "inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase"
                  : "inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface/80 px-3 py-1 text-xs font-medium tracking-wide text-muted uppercase"
              }
            >
              {tier === "premium" && <Sparkles className="size-3.5" aria-hidden />}
              {tier} plan
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <p className="text-eyebrow text-muted">Recent posts</p>
              <p className="mt-2 font-display text-3xl text-foreground">
                {recentPosts?.length ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <p className="text-eyebrow text-muted">Platform</p>
              <p className="mt-2 text-sm text-foreground">LinkedIn-first studio</p>
            </div>
          </div>

          <DashboardSignOutButton />
        </GlassCard>

        <GlassCard className="space-y-4 p-6 sm:p-8">
          <div>
            <p className="text-eyebrow text-primary">Post history</p>
            <h3 className="mt-2 font-display text-lg text-foreground">
              Latest generations
            </h3>
          </div>

          {recentPosts && recentPosts.length > 0 ? (
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li
                  key={post.id}
                  className="rounded-lg border border-border bg-surface/40 px-4 py-3"
                >
                  <p className="text-sm font-medium text-foreground">{post.topic}</p>
                  <p className="mt-1 text-xs text-muted capitalize">
                    {post.platform} ·{" "}
                    {new Date(post.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-border-strong px-4 py-8 text-center">
              <FileText className="mx-auto size-5 text-muted opacity-50" aria-hidden />
              <p className="mt-3 text-sm text-muted">
                No posts saved yet. Generate from the home demo and they&apos;ll
                appear here once connected.
              </p>
            </div>
          )}
        </GlassCard>
      </div>
    </PageShell>
  );
}
