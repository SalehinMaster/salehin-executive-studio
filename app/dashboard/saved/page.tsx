import { SavedOutputsPanel } from "@/components/saas/saved-outputs-panel";
import { requireSessionUser } from "@/lib/auth/session";
import {
  fetchFavoriteGenerationIds,
  fetchGenerations,
} from "@/lib/saas/queries";

export const metadata = {
  title: "Saved Outputs | Studio",
};

export default async function SavedOutputsPage() {
  const { user } = await requireSessionUser("/dashboard/saved");
  const [generations, favoriteIds] = await Promise.all([
    fetchGenerations(user.id),
    fetchFavoriteGenerationIds(user.id),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">Saved outputs</p>
        <h1 className="mt-2 font-display text-2xl text-foreground">Generation history</h1>
        <p className="mt-2 text-sm text-muted">
          Search, favorite, or delete any AI output stored in your studio.
        </p>
      </div>

      <SavedOutputsPanel
        initialGenerations={generations}
        initialFavoriteIds={favoriteIds}
      />
    </div>
  );
}
