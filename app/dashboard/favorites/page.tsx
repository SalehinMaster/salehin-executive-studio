import { FavoritesPanel, type FavoriteRow } from "@/components/saas/favorites-panel";
import { requireSessionUser } from "@/lib/auth/session";
import { fetchFavoriteGenerations } from "@/lib/saas/queries";

export const metadata = {
  title: "Favorites | Studio",
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

      <FavoritesPanel initialRows={rows} />
    </div>
  );
}
