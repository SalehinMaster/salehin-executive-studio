"use client";

import { Bookmark, Loader2, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/components/ui/toast-provider";
import type { Generation } from "@/types/database";
import { cn } from "@/lib/utils";

type SavedOutputsPanelProps = {
  initialGenerations: Generation[];
  initialFavoriteIds: string[];
};

export function SavedOutputsPanel({
  initialGenerations,
  initialFavoriteIds,
}: SavedOutputsPanelProps) {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [generations, setGenerations] = useState(initialGenerations);
  const [favoriteIds, setFavoriteIds] = useState(new Set(initialFavoriteIds));
  const [pending, startTransition] = useTransition();
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback((search: string) => {
    startTransition(async () => {
      const params = new URLSearchParams();
      if (search.trim()) params.set("q", search.trim());
      const response = await fetch(`/api/saas/generations?${params.toString()}`);
      const data = (await response.json()) as {
        generations?: Generation[];
        error?: string;
      };
      if (response.ok && data.generations) {
        setGenerations(data.generations);
      }
    });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (query !== "") load(query);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [query, load]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    load(query);
  };

  const toggleFavorite = async (generationId: string) => {
    setActionId(generationId);
    try {
      const response = await fetch("/api/saas/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generationId }),
      });
      const data = (await response.json()) as { favorited?: boolean; error?: string };
      if (!response.ok) {
        toast({ title: "Favorite failed", description: data.error, variant: "error" });
        return;
      }
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (data.favorited) next.add(generationId);
        else next.delete(generationId);
        return next;
      });
    } finally {
      setActionId(null);
    }
  };

  const deleteGeneration = async (generationId: string) => {
    setActionId(generationId);
    try {
      const response = await fetch(`/api/saas/generations/${generationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        toast({ title: "Delete failed", description: data.error, variant: "error" });
        return;
      }
      setGenerations((prev) => prev.filter((g) => g.id !== generationId));
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(generationId);
        return next;
      });
      toast({ title: "Output deleted", variant: "success" });
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, prompt, or output…"
          className="focus-ring w-full rounded-xl border border-border bg-surface/50 py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-subtle"
          aria-label="Search saved outputs"
        />
        {pending ? (
          <Loader2
            className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted"
            aria-hidden
          />
        ) : null}
      </form>

      {generations.length > 0 ? (
        <ul className="space-y-4">
          {generations.map((gen) => {
            const isFavorite = favoriteIds.has(gen.id);
            const busy = actionId === gen.id;
            return (
              <li key={gen.id}>
                <GlassCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">{gen.title ?? gen.prompt}</p>
                      <p className="mt-1 text-xs text-muted capitalize">
                        {gen.tool_type.replace(/_/g, " ")}
                        {gen.model ? ` · ${gen.model}` : ""} ·{" "}
                        {new Date(gen.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => void toggleFavorite(gen.id)}
                        disabled={busy}
                        className={cn(
                          "focus-ring inline-flex size-9 items-center justify-center rounded-lg border transition-all",
                          isFavorite
                            ? "border-primary/50 bg-primary/15 text-primary"
                            : "border-border text-muted hover:text-foreground",
                        )}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Bookmark className={cn("size-4", isFavorite && "fill-current")} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteGeneration(gen.id)}
                        disabled={busy}
                        className="focus-ring inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted hover:border-red-500/40 hover:text-red-400"
                        aria-label="Delete output"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                  <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-surface/50 p-4 text-xs leading-relaxed text-muted">
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
            ? "No outputs match your search."
            : "No saved outputs yet. Head to AI Tools to generate your first post."}
        </GlassCard>
      )}
    </div>
  );
}
