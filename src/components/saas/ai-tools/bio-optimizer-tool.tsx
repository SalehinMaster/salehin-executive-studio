"use client";

import { Loader2, UserRound } from "lucide-react";
import { useState } from "react";
import { ErrorAlert } from "@/components/saas/ai-tools/error-alert";
import { FormField, FormInput, FormTextarea } from "@/components/saas/ai-tools/form-field";
import { ModelSelector } from "@/components/saas/ai-tools/model-selector";
import { ResultCard, ResultsPanel, ToolShell } from "@/components/saas/ai-tools/tool-shell";
import type { AiToolTierProps } from "@/components/saas/ai-tools/tool-tier-props";
import { useAiToolGenerate } from "@/components/saas/ai-tools/use-ai-tool-generate";
import { GenerationOutputActions } from "@/components/saas/generation-output-actions";
import { Button } from "@/components/ui/button";
import type { OpenRouterModelKey } from "@/lib/ai/models";
import { canUseModel } from "@/lib/saas/access-control";

export function BioOptimizerTool({ tier, allowedModels }: AiToolTierProps) {
  const defaultModel = allowedModels[0] ?? "deepseek";
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState("");
  const [model, setModel] = useState<OpenRouterModelKey>(defaultModel);
  const { output, generationId, lastModel, error, loading, generate } =
    useAiToolGenerate("bio_optimizer");

  const form = (
    <>
      <ModelSelector
        value={canUseModel(tier, model) ? model : defaultModel}
        onChange={setModel}
        allowedModels={allowedModels}
      />
      <FormField label="Role">
        <FormInput
          value={role}
          onChange={(e) => setRole(e.target.value)}
          maxLength={120}
          placeholder="e.g. Fractional CMO, Series B founder"
        />
      </FormField>
      <FormField label="Industry">
        <FormInput
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          maxLength={120}
          placeholder="e.g. B2B SaaS, executive coaching"
        />
      </FormField>
      <FormField label="Goals">
        <FormTextarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          rows={4}
          maxLength={400}
          placeholder="Inbound leads, speaking gigs, recruiter visibility, thought leadership..."
        />
      </FormField>
      <Button
        className="w-full gap-2"
        onClick={() => void generate({ role, industry, goals, model })}
        loading={loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <UserRound className="size-4" aria-hidden />
        )}
        Optimize bio
      </Button>
      {error ? <ErrorAlert message={error} /> : null}
    </>
  );

  const headlineCopy = output?.headlineOptions.join("\n\n") ?? "";

  const results = (
    <ResultsPanel
      model={lastModel}
      hasOutput={Boolean(output)}
      emptyMessage="Headlines, about copy, positioning, and proof bullets will appear here."
    >
      {output ? (
        <>
          <ResultCard label="Headline options" accent="primary" copyText={headlineCopy}>
            <ul className="space-y-2">
              {output.headlineOptions.map((headline, index) => (
                <li
                  key={headline}
                  className="rounded-lg border border-border/60 bg-surface/40 px-3 py-2 text-sm text-foreground"
                >
                  <span className="text-[10px] uppercase tracking-wider text-subtle">
                    Option {index + 1}
                  </span>
                  <p className="mt-1 font-medium">{headline}</p>
                </li>
              ))}
            </ul>
          </ResultCard>
          <ResultCard label="Positioning" accent="secondary" copyText={output.positioningStatement}>
            <p className="text-sm font-medium leading-relaxed text-foreground">
              {output.positioningStatement}
            </p>
          </ResultCard>
          <ResultCard label="About section" copyText={output.aboutSection}>
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
              {output.aboutSection}
            </p>
          </ResultCard>
          <ResultCard
            label="Proof bullets"
            copyText={output.proofBullets.map((b) => `→ ${b}`).join("\n")}
          >
            <ul className="space-y-2 text-sm text-muted">
              {output.proofBullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="text-primary">→</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </ResultCard>
          <ResultCard label="Keywords" copyText={output.keywords.join(", ")}>
            <div className="flex flex-wrap gap-2">
              {output.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-md border border-border bg-surface/80 px-2.5 py-1 text-xs text-secondary"
                >
                  {keyword}
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
