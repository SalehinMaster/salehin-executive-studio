"use client";

import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

const inputClassName = cn(
  "focus-ring min-h-11 w-full rounded-lg border border-border bg-surface/60 px-3 text-sm text-foreground placeholder:text-muted/70",
  "transition-colors hover:border-primary/30 focus:border-primary/50",
);

export function AddLeadForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName.trim()) {
      setError("Name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim() || undefined,
          company: company.trim() || undefined,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Failed to add lead.");
        return;
      }

      setFullName("");
      setEmail("");
      setCompany("");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard variant="strong" glow="soft" className="p-5 sm:p-6">
      <p className="text-eyebrow text-primary">Quick add</p>
      <h3 className="mt-2 font-display text-lg text-foreground">New lead</h3>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-3">
        <input
          type="text"
          placeholder="Full name *"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClassName}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClassName}
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClassName}
        />
        <div className="sm:col-span-3 flex flex-wrap items-center gap-3">
          <Button type="submit" loading={loading} className="gap-2">
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Plus className="size-4" aria-hidden />
            )}
            Add to pipeline
          </Button>
          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </form>
    </GlassCard>
  );
}
