import { GlassCard } from "@/components/ui/glass-card";
import { requireSessionUser } from "@/lib/auth/session";
import { fetchGenerations } from "@/lib/saas/queries";

export const metadata = {
  title: "Saved Outputs | Studio",
};

export default async function SavedOutputsPage() {
  const { user } = await requireSessionUser("/dashboard/saved");
  const generations = await fetchGenerations(user.id);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">Saved outputs</p>
        <h1 className="mt-2 font-display text-2xl text-foreground">Generation history</h1>
        <p className="mt-2 text-sm text-muted">
          Every AI output you create is stored securely in your studio.
        </p>
      </div>

      {generations.length > 0 ? (
        <ul className="space-y-4">
          {generations.map((gen) => (
            <li key={gen.id}>
              <GlassCard className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">
                      {gen.title ?? gen.prompt}
                    </p>
                    <p className="mt-1 text-xs text-muted capitalize">
                      {gen.tool_type.replace("_", " ")}
                      {gen.model ? ` · ${gen.model}` : ""} ·{" "}
                      {new Date(gen.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-surface/50 p-4 text-xs leading-relaxed text-muted">
                  {gen.output}
                </pre>
              </GlassCard>
            </li>
          ))}
        </ul>
      ) : (
        <GlassCard className="p-10 text-center text-sm text-muted">
          No saved outputs yet. Head to AI Tools to generate your first post.
        </GlassCard>
      )}
    </div>
  );
}
