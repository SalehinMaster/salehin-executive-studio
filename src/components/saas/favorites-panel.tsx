"use client";

import { BookmarkMinus, Loader2, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/components/ui/toast-provider";

export type FavoriteRow = {
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

type FavoritesPanelProps = {
  initialRows: FavoriteRow[];
};

export function FavoritesPanel({ initialRows }: FavoritesPanelProps) {
  const { toast } = useToast();
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const gen = row.generations;
      if (!gen) return false;
      const haystack = `${gen.title ?? ""} ${gen.prompt} ${gen.output}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [rows, query]);

  const removeFavorite = useCallback(
    async (generationId: string, favoriteRowId: string) => {
      setActionId(favoriteRowId);
      try {
        const response = await fetch("/api/saas/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ generationId }),
        });
        if (!response.ok) {
          const data = (await response.json()) as { error?: string };
          toast({ title: "Could not remove", description: data.error, variant: "error" });
          return;
        }
        setRows((prev) => prev.filter((r) => r.id !== favoriteRowId));
        toast({ title: "Removed from favorites", variant: "success" });
      } finally {
        setActionId(null);
      }
    },
    [toast],
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter favorites…"
          className="focus-ring w-full rounded-xl border border-border bg-surface/50 py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-subtle"
          aria-label="Search favorites"
        />
      </div>

      {filtered.length > 0 ? (
        <ul className="space-y-4">
          {filtered.map((row) => {
            const gen = row.generations;
            if (!gen) return null;
            const busy = actionId === row.id;
            return (
              <li key={row.id}>
                <GlassCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{gen.title ?? gen.prompt}</p>
                      <p className="mt-1 text-xs text-muted capitalize">
                        {gen.tool_type.replace(/_/g, " ")}
                        {gen.model ? ` · ${gen.model}` : ""} · Favorited{" "}
                        {new Date(row.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void removeFavorite(gen.id, row.id)}
                      disabled={busy}
                      className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:border-red-500/40 hover:text-red-400"
                    >
                      {busy ? (
                        <Loader2 className="size-3.5 animate-spin" aria-hidden />
                      ) : (
                        <BookmarkMinus className="size-3.5" aria-hidden />
                      )}
                      Unfavorite
                    </button>
                  </div>
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
          {query.trim()
            ? "No favorites match your filter."
            : "No favorites yet. Star generations from Saved Outputs or after generating in AI Tools."}
        </GlassCard>
      )}
    </div>
  );
}
