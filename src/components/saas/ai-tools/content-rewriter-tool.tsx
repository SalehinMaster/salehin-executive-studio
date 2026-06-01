"use client";

import { Loader2, PenLine } from "lucide-react";
import { useState } from "react";
import { ErrorAlert } from "@/components/saas/ai-tools/error-alert";
import { FormField, FormTextarea } from "@/components/saas/ai-tools/form-field";
import { ModelSelector } from "@/components/saas/ai-tools/model-selector";
import { ResultCard, ResultsPanel, ToolShell } from "@/components/saas/ai-tools/tool-shell";
import { useAiToolGenerate } from "@/components/saas/ai-tools/use-ai-tool-generate";
import { Button } from "@/components/ui/button";
import type { OpenRouterModelKey } from "@/lib/ai/models";
import { cn } from "@/lib/utils";
import { REWRITER_TONE_OPTIONS, type RewriterTone } from "@/types/ai-tools";

export function ContentRewriterTool() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState<RewriterTone>("executive");
  const [model, setModel] = useState<OpenRouterModelKey>("llama");
  const { output, lastModel, error, loading, generate } = useAiToolGenerate("content_rewriter");

  const form = (
    <>
      <ModelSelector value={model} onChange={setModel} />
      <FormField label="Original text">
        <FormTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          maxLength={4000}
          placeholder="Paste generic copy, a rough draft, or bullet notes to elevate..."
        />
      </FormField>
      <div>
        <p className="text-eyebrow text-muted">Voice</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {REWRITER_TONE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              title={option.description}
              onClick={() => setTone(option.value)}
              className={cn(
                "focus-ring rounded-lg border px-3 py-3 text-left transition-all",
                tone === option.value
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
      <Button
        className="w-full gap-2"
        onClick={() => void generate({ text, tone, model })}
        loading={loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <PenLine className="size-4" aria-hidden />
        )}
        Rewrite for authority
      </Button>
      {error ? <ErrorAlert message={error} /> : null}
    </>
  );

  const results = (
    <ResultsPanel
      model={lastModel}
      hasOutput={Boolean(output)}
      emptyMessage="Executive-level rewritten copy will appear here."
    >
      {output ? (
        <ResultCard
          label={`${output.tone.charAt(0).toUpperCase()}${output.tone.slice(1)} voice`}
          accent="primary"
          copyText={output.rewritten}
        >
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
            {output.rewritten}
          </p>
        </ResultCard>
      ) : null}
    </ResultsPanel>
  );

  return <ToolShell form={form} results={results} />;
}
