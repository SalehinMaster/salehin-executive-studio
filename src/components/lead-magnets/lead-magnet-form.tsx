"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";

type LeadMagnetFormProps = {
  magnetSlug: string;
  magnetTitle: string;
  downloadLabel: string;
};

export function LeadMagnetForm({
  magnetSlug,
  magnetTitle,
  downloadLabel,
}: LeadMagnetFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/lead-magnets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          company,
          magnetSlug,
          magnetTitle,
        }),
      });

      const payload = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.error ?? "Something went wrong while saving your request.");
        return;
      }

      setStatus("success");
      setMessage(`Success. Your ${downloadLabel} is on the way to your inbox.`);
      setFullName("");
      setEmail("");
      setCompany("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again in a moment.");
    }
  }

  return (
    <GlassCard variant="strong" glow="soft" className="p-6 md:p-8">
      <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
        Get instant access
      </h2>
      <p className="mt-3 text-muted">
        Enter your details and we will send the {downloadLabel.toLowerCase()} immediately.
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor={`${magnetSlug}-full-name`} className="text-sm text-muted">
            Full name
          </label>
          <input
            id={`${magnetSlug}-full-name`}
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-primary transition focus:ring-2"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor={`${magnetSlug}-email`} className="text-sm text-muted">
            Work email
          </label>
          <input
            id={`${magnetSlug}-email`}
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-primary transition focus:ring-2"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor={`${magnetSlug}-company`} className="text-sm text-muted">
            Company (optional)
          </label>
          <input
            id={`${magnetSlug}-company`}
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-primary transition focus:ring-2"
            placeholder="Your company"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : `Download ${downloadLabel}`}
        </button>
      </form>

      {status !== "idle" ? (
        <p
          className={`mt-4 text-sm ${
            status === "success" ? "text-emerald-400" : status === "error" ? "text-red-400" : "text-muted"
          }`}
        >
          {message}
        </p>
      ) : null}
    </GlassCard>
  );
}
