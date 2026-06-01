"use client";

import { MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "ai-tools", label: "AI Tools" },
  { value: "billing", label: "Billing" },
  { value: "ux", label: "UX" },
] as const;

type FeedbackModalProps = {
  open: boolean;
  onClose: () => void;
};

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState(4);
  const [category, setCategory] = useState<string>("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/beta/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, category, message }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok) {
        toast({ title: "Feedback failed", description: data.error, variant: "error" });
        return;
      }
      toast({ title: "Thank you for your feedback", variant: "success" });
      setMessage("");
      onClose();
    } catch {
      toast({ title: "Network error", variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-label="Close feedback"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface-elevated p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" aria-hidden />
            <h2 id="feedback-title" className="font-display text-lg text-foreground">
              Beta feedback
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex size-8 items-center justify-center rounded-lg text-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={(e) => void submit(e)} className="space-y-4">
          <div>
            <p className="text-eyebrow text-muted">Rating</p>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className={cn(
                    "focus-ring size-9 rounded-lg border text-sm",
                    rating >= n
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-border text-muted",
                  )}
                  aria-label={`Rate ${n} of 5`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="feedback-category" className="text-eyebrow text-muted">
              Category
            </label>
            <select
              id="feedback-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="focus-ring mt-2 w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="feedback-message" className="text-eyebrow text-muted">
              Message
            </label>
            <textarea
              id="feedback-message"
              required
              minLength={10}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="focus-ring mt-2 w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
              placeholder="What should we improve?"
            />
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Send feedback
          </Button>
        </form>
      </div>
    </div>
  );
}
