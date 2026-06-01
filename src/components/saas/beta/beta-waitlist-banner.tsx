"use client";

import { Loader2, Rocket } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";

type BetaWaitlistBannerProps = {
  userEmail?: string | null;
};

export function BetaWaitlistBanner({ userEmail }: BetaWaitlistBannerProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState(userEmail ?? "");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/beta/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });
      const data = (await response.json()) as { ok?: boolean; alreadyJoined?: boolean; error?: string };
      if (!response.ok) {
        toast({ title: "Waitlist error", description: data.error, variant: "error" });
        return;
      }
      setJoined(true);
      toast({
        title: data.alreadyJoined ? "Already on the list" : "You're on the waitlist",
        description: "We'll notify you when new seats open.",
        variant: "success",
      });
    } catch {
      toast({ title: "Network error", variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (joined) {
    return (
      <GlassCard className="flex items-center gap-3 border-primary/30 bg-primary/5 p-4 text-sm text-muted">
        <Rocket className="size-4 shrink-0 text-primary" aria-hidden />
        <span>Thanks — you&apos;re on the private beta waitlist.</span>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="border-primary/20 p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow text-primary">Private beta</p>
          <p className="mt-1 text-sm text-muted">
            Reserve early access and help shape the executive studio roadmap.
          </p>
        </div>
        <form onSubmit={(e) => void submit(e)} className="flex w-full flex-col gap-2 sm:max-w-md sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            className="focus-ring min-h-10 flex-1 rounded-lg border border-border bg-surface/50 px-3 text-sm"
            aria-label="Email for waitlist"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="focus-ring min-h-10 flex-1 rounded-lg border border-border bg-surface/50 px-3 text-sm sm:max-w-[8rem]"
            aria-label="Name for waitlist"
          />
          <Button type="submit" loading={loading} className="shrink-0 gap-2">
            {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
            Join waitlist
          </Button>
        </form>
      </div>
    </GlassCard>
  );
}
