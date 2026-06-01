import { GlassCard } from "@/components/ui/glass-card";
import { requireSessionUser } from "@/lib/auth/session";
import { fetchFavoriteGenerations } from "@/lib/saas/queries";

export const metadata = {
  title: "Favorites | Studio",
};

type FavoriteRow = {
  id: string;
  created_at: string;
  generations: {
    id: string;
    title: string | null;
    prompt: string;
    output: string;
    tool_type: string;
    model: string | null;
    platform: string | null;
    created_at: string;
  } | null;
};

export default async function FavoritesPage() {
  const { user } = await requireSessionUser("/dashboard/favorites");
  const rows = (await fetchFavoriteGenerations(user.id)) as FavoriteRow[];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">Favorites</p>
        <h1 className="mt-2 font-display text-2xl text-foreground">Starred outputs</h1>
        <p className="mt-2 text-sm text-muted">
          Pin your best generations for fast reuse and reference.
        </p>
      </div>

      {rows.length > 0 ? (
        <ul className="space-y-4">
          {rows.map((row) => {
            const gen = row.generations;
            if (!gen) return null;
            return (
              <li key={row.id}>
                <GlassCard className="p-5">
                  <p className="font-medium text-foreground">{gen.title ?? gen.prompt}</p>
                  <p className="mt-1 text-xs text-muted">
                    Favorited {new Date(row.created_at).toLocaleDateString()}
                  </p>
                  <pre className="mt-4 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-surface/50 p-4 text-xs text-muted">
                    {gen.output}
                  </pre>
                </GlassCard>
              </li>
            );
          })}
        </ul>
      ) : (
        <GlassCard className="p-10 text-center text-sm text-muted">
          No favorites yet. Star generations from Saved Outputs when that action is
          enabled, or add favorites via the API.
        </GlassCard>
      )}
    </div>
  );
}
