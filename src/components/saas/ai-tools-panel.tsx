"use client";

import { Hash, Loader2, Wand2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  OPENROUTER_MODEL_OPTIONS,
  type OpenRouterModelKey,
} from "@/lib/ai/models";
import { demoSuggestions } from "@/lib/linkedin-demo-generator";
import { cn } from "@/lib/utils";
import type {
  AiGenerateError,
  AiGenerateResponse,
} from "@/types/ai-generate";
import type { LinkedInPostPreview } from "@/types/linkedin-post";

function PostPreview({ post }: { post: LinkedInPostPreview }) {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-eyebrow text-secondary">Hook</p>
        <p className="mt-2 whitespace-pre-line font-medium text-foreground">{post.hook}</p>
      </div>
      <div className="h-px bg-border" />
      <div>
        <p className="text-eyebrow text-muted">Body</p>
        <p className="mt-2 whitespace-pre-line text-muted">{post.body}</p>
      </div>
      <div className="h-px bg-border" />
      <div>
        <p className="text-eyebrow text-primary">CTA</p>
        <p className="mt-2 whitespace-pre-line text-foreground">{post.cta}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {post.hashtags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-surface/80 px-2 py-1 text-xs text-secondary"
          >
            <Hash className="size-3 opacity-70" aria-hidden />
            {tag.replace("#", "")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AiToolsPanel() {
  const [topic, setTopic] = useState("");
  const [model, setModel] = useState<OpenRouterModelKey>("deepseek");
  const [preview, setPreview] = useState<LinkedInPostPreview | null>(null);
  const [lastModel, setLastModel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(async () => {
    const trimmed = topic.trim();
    if (!trimmed) {
      setError("Enter a topic before generating.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: trimmed, model }),
      });

      const payload = (await response.json()) as AiGenerateResponse | AiGenerateError;

      if (!response.ok) {
        setError("error" in payload ? payload.error : "Generation failed.");
        return;
      }

      const success = payload as AiGenerateResponse;
      setPreview(success.post);
      setLastModel(success.model);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [topic, model]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">AI Tools</p>
        <h1 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
          LinkedIn authority generator
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Choose your model via OpenRouter — DeepSeek, Mistral, or Llama — and
          generate executive-grade posts saved to your studio.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassCard variant="strong" className="space-y-5 p-6">
          <div>
            <p className="text-eyebrow text-muted">Model</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {OPENROUTER_MODEL_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setModel(option.key)}
                  className={cn(
                    "focus-ring rounded-lg border px-3 py-3 text-left transition-all",
                    model === option.key
                      ? "border-primary/50 bg-primary/15 text-foreground"
                      : "border-border bg-surface/40 text-muted hover:border-primary/30",
                  )}
                >
                  <span className="block text-sm font-medium">{option.label}</span>
                  <span className="mt-1 block text-[11px] leading-snug text-subtle">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-2">
            <span className="text-eyebrow text-muted">Topic</span>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={4}
              maxLength={280}
              placeholder="e.g. Why founders should publish weekly thought leadership in 2026"
              className="focus-ring w-full resize-none rounded-lg border border-border-strong bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {demoSuggestions.slice(0, 3).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setTopic(suggestion)}
                className="focus-ring rounded-full border border-border px-3 py-1 text-xs text-muted hover:border-primary/40 hover:text-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <Button className="w-full gap-2" onClick={handleGenerate} loading={loading}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Wand2 className="size-4" aria-hidden />
            )}
            Generate post
          </Button>

          {error ? (
            <p
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            >
              {error}
            </p>
          ) : null}
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <p className="text-eyebrow text-muted">Preview</p>
            {lastModel ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-subtle">
                {lastModel}
              </span>
            ) : null}
          </div>
          {preview ? (
            <PostPreview post={preview} />
          ) : (
            <p className="py-12 text-center text-sm text-muted">
              Your generated post will appear here.
            </p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
