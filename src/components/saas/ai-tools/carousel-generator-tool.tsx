"use client";

import { Layers, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/saas/ai-tools/copy-button";
import { ErrorAlert } from "@/components/saas/ai-tools/error-alert";
import { FormField, FormTextarea } from "@/components/saas/ai-tools/form-field";
import { ModelSelector } from "@/components/saas/ai-tools/model-selector";
import { ResultsPanel, ToolShell } from "@/components/saas/ai-tools/tool-shell";
import { useAiToolGenerate } from "@/components/saas/ai-tools/use-ai-tool-generate";
import { Button } from "@/components/ui/button";
import type { OpenRouterModelKey } from "@/lib/ai/models";
import type { CarouselSlide } from "@/types/ai-tools";

function formatSlideForCopy(slide: CarouselSlide): string {
  const lines = [`Slide ${slide.slideNumber}`];
  if (slide.title) lines.push(`Title: ${slide.title}`);
  if (slide.body) lines.push(`Body: ${slide.body}`);
  if (slide.visualPrompt) lines.push(`Visual: ${slide.visualPrompt}`);
  return lines.join("\n");
}

function formatAllSlidesForCopy(slides: CarouselSlide[]): string {
  return slides.map(formatSlideForCopy).join("\n\n---\n\n");
}

function SlideBlock({ slide }: { slide: CarouselSlide }) {
  const isCover = slide.slideNumber === 1;
  const isCta = slide.slideNumber === 9;
  const copyText = formatSlideForCopy(slide);

  return (
    <div className="rounded-xl border border-border/80 bg-surface/30 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-eyebrow text-muted">
          {isCover ? "Slide 1 · Cover" : isCta ? "Slide 9 · CTA" : `Slide ${slide.slideNumber}`}
        </p>
        <CopyButton text={copyText} />
      </div>
      {slide.title ? (
        <p className="font-display text-lg text-foreground">{slide.title}</p>
      ) : null}
      {slide.body ? (
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">
          {slide.body}
        </p>
      ) : null}
      {slide.visualPrompt ? (
        <p className="mt-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-secondary">
          <span className="font-medium text-primary">Visual · </span>
          {slide.visualPrompt}
        </p>
      ) : null}
    </div>
  );
}

export function CarouselGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [model, setModel] = useState<OpenRouterModelKey>("deepseek");
  const { output, lastModel, error, loading, generate } = useAiToolGenerate("carousel");

  const exportCopy = useMemo(
    () => (output ? formatAllSlidesForCopy(output.slides) : ""),
    [output],
  );

  const form = (
    <>
      <ModelSelector value={model} onChange={setModel} />
      <FormField label="Main topic">
        <FormTextarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
          maxLength={280}
          placeholder="e.g. 5 systems every founder needs before hiring a content team"
        />
      </FormField>
      <Button
        className="w-full gap-2"
        onClick={() => void generate({ topic, model })}
        loading={loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Layers className="size-4" aria-hidden />
        )}
        Plan carousel
      </Button>
      {error ? <ErrorAlert message={error} /> : null}
    </>
  );

  const results = (
    <ResultsPanel
      model={lastModel}
      hasOutput={Boolean(output)}
      emptyMessage="Your 9-slide carousel plan will appear here — ready for design export."
    >
      {output ? (
        <>
          <div className="flex justify-end">
            <CopyButton text={exportCopy} label="Copy all slides" />
          </div>
          {output.slides.map((slide) => (
            <SlideBlock key={slide.slideNumber} slide={slide} />
          ))}
        </>
      ) : null}
    </ResultsPanel>
  );

  return <ToolShell form={form} results={results} />;
}
