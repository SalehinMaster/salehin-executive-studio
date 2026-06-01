"use client";

import { Loader2, Zap } from "lucide-react";
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
import { HOOK_STYLE_META } from "@/types/ai-tools";

export function HookGeneratorTool({ tier, allowedModels }: AiToolTierProps) {
  const defaultModel = allowedModels[0] ?? "deepseek";
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("Founders & executives");
  const [model, setModel] = useState<OpenRouterModelKey>(defaultModel);
  const { output, generationId, lastModel, error, loading, generate } =
    useAiToolGenerate("hook_generator");

  const form = (
    <>
      <ModelSelector
        value={canUseModel(tier, model) ? model : defaultModel}
        onChange={setModel}
        allowedModels={allowedModels}
      />
      <FormField label="Topic or angle">
        <FormTextarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={3}
          maxLength={280}
          placeholder="e.g. Why most personal brands plateau after 10K followers"
        />
      </FormField>
      <FormField label="Audience">
        <FormTextarea
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          rows={2}
          maxLength={120}
          placeholder="Who must engage with this hook?"
        />
      </FormField>
      <Button
        className="w-full gap-2"
        onClick={() => void generate({ topic, audience, model })}
        loading={loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Zap className="size-4" aria-hidden />
        )}
        Generate hooks
      </Button>
      {error ? <ErrorAlert message={error} /> : null}
    </>
  );

  const results = (
    <ResultsPanel
      model={lastModel}
      hasOutput={Boolean(output)}
      emptyMessage="Curiosity, Authority, Contrarian, and Story hooks will appear here."
    >
      {output ? (
        <>
          {HOOK_STYLE_META.map((meta) => (
            <ResultCard
              key={meta.key}
              label={meta.label}
              accent={meta.key === "contrarian" ? "primary" : "secondary"}
              copyText={output[meta.key]}
            >
              <p className="mb-2 text-[11px] text-subtle">{meta.description}</p>
              <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-foreground">
                {output[meta.key]}
              </p>
            </ResultCard>
          ))}
          <GenerationOutputActions generationId={generationId} />
        </>
      ) : null}
    </ResultsPanel>
  );

  return <ToolShell form={form} results={results} />;
}
