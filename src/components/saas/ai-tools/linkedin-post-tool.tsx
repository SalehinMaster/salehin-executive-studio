"use client";

import { Hash, Loader2, Wand2 } from "lucide-react";
import { useState } from "react";
import { ErrorAlert } from "@/components/saas/ai-tools/error-alert";
import { FormField, FormTextarea } from "@/components/saas/ai-tools/form-field";
import { ModelSelector } from "@/components/saas/ai-tools/model-selector";
import { ResultCard, ResultsPanel, ToolShell } from "@/components/saas/ai-tools/tool-shell";
import type { AiToolTierProps } from "@/components/saas/ai-tools/tool-tier-props";
import { useAiToolGenerate } from "@/components/saas/ai-tools/use-ai-tool-generate";
import { GenerationOutputActions } from "@/components/saas/generation-output-actions";
import { Button } from "@/components/ui/button";
import type { OpenRouterModelKey } from "@/lib/ai/models";
import { canUseModel } from "@/lib/saas/access-control";
import { demoSuggestions } from "@/lib/linkedin-demo-generator";
import { cn } from "@/lib/utils";
import { POST_TONE_OPTIONS, type PostTone } from "@/types/ai-tools";

const AUDIENCE_SUGGESTIONS = [
  "Founders & CEOs",
  "B2B revenue leaders",
  "HR & talent executives",
] as const;

export function LinkedInPostTool({ tier, allowedModels }: AiToolTierProps) {
  const defaultModel = allowedModels[0] ?? "deepseek";
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState<PostTone>("professional");
  const [model, setModel] = useState<OpenRouterModelKey>(defaultModel);
  const { output, generationId, lastModel, error, loading, generate } =
    useAiToolGenerate("linkedin_post");

  const handleGenerate = () => {
    void generate({ topic, audience, tone, model });
  };

  const form = (
    <>
      <ModelSelector
        value={canUseModel(tier, model) ? model : defaultModel}
        onChange={setModel}
        allowedModels={allowedModels}
      />
      <FormField label="Topic">
        <FormTextarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={3}
          maxLength={280}
          placeholder="What should this post be about?"
        />
      </FormField>
      <div className="flex flex-wrap gap-2">
        {demoSuggestions.map((suggestion) => (
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
      <FormField label="Audience">
        <FormTextarea
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          rows={2}
          maxLength={120}
          placeholder="Who should stop scrolling for this?"
        />
      </FormField>
      <div className="flex flex-wrap gap-2">
        {AUDIENCE_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setAudience(suggestion)}
            className="focus-ring rounded-full border border-border px-3 py-1 text-xs text-muted hover:border-primary/40 hover:text-foreground"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <div>
        <p className="text-eyebrow text-muted">Tone</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {POST_TONE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              title={option.description}
              onClick={() => setTone(option.value)}
              className={cn(
                "focus-ring rounded-full border px-3 py-1.5 text-xs transition-all",
                tone === option.value
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border text-muted hover:border-primary/30",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <Button className="w-full gap-2" onClick={handleGenerate} loading={loading}>
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Wand2 className="size-4" aria-hidden />
        )}
        Generate post
      </Button>
      {error ? <ErrorAlert message={error} /> : null}
    </>
  );

  const results = (
    <ResultsPanel
      model={lastModel}
      hasOutput={Boolean(output)}
      emptyMessage="Your Hook, Body, CTA, and Hashtags will appear here."
    >
      {output ? (
        <>
          <ResultCard label="Hook" accent="secondary" copyText={output.hook}>
            <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-foreground">
              {output.hook}
            </p>
          </ResultCard>
          <ResultCard label="Body" copyText={output.body}>
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
              {output.body}
            </p>
          </ResultCard>
          <ResultCard label="CTA" accent="primary" copyText={output.cta}>
            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
              {output.cta}
            </p>
          </ResultCard>
          <ResultCard
            label="Hashtags"
            copyText={output.hashtags.join(" ")}
          >
            <div className="flex flex-wrap gap-2">
              {output.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-surface/80 px-2.5 py-1 text-xs text-secondary"
                >
                  <Hash className="size-3 opacity-70" aria-hidden />
                  {tag.replace("#", "")}
                </span>
              ))}
            </div>
          </ResultCard>
          <GenerationOutputActions generationId={generationId} />
        </>
      ) : null}
    </ResultsPanel>
  );

  return <ToolShell form={form} results={results} />;
}
