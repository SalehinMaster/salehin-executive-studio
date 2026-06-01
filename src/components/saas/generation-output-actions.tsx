"use client";

import { Bookmark, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/toast-provider";
import { cn } from "@/lib/utils";

type GenerationOutputActionsProps = {
  generationId: string | null;
  initialFavorited?: boolean;
  className?: string;
};

export function GenerationOutputActions({
  generationId,
  initialFavorited = false,
  className,
}: GenerationOutputActionsProps) {
  const { toast } = useToast();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = useCallback(async () => {
    if (!generationId) return;
    setLoading(true);
    try {
      const response = await fetch("/api/saas/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generationId }),
      });
      const data = (await response.json()) as { favorited?: boolean; error?: string };
      if (!response.ok) {
        toast({ title: "Could not update favorite", description: data.error, variant: "error" });
        return;
      }
      setFavorited(Boolean(data.favorited));
      toast({
        title: data.favorited ? "Added to favorites" : "Removed from favorites",
        variant: "success",
      });
    } catch {
      toast({ title: "Network error", variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [generationId, toast]);

  if (!generationId) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 border-t border-border/80 pt-4",
        className,
      )}
    >
      <p className="text-[11px] text-subtle">Saved to your generation history</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => void toggleFavorite()}
          disabled={loading}
          className={cn(
            "focus-ring inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all",
            favorited
              ? "border-primary/50 bg-primary/15 text-primary"
              : "border-border text-muted hover:border-primary/30 hover:text-foreground",
          )}
          aria-pressed={favorited}
        >
          {loading ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden />
          ) : (
            <Bookmark className={cn("size-3.5", favorited && "fill-current")} aria-hidden />
          )}
          {favorited ? "Favorited" : "Favorite"}
        </button>
        <Link
          href="/dashboard/saved"
          className="focus-ring inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
        >
          <ExternalLink className="size-3.5" aria-hidden />
          Saved outputs
        </Link>
      </div>
    </div>
  );
}
