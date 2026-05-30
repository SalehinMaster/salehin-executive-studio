"use client";

import {
  Hash,
  Loader2,
  MessageSquare,
  Sparkles,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  demoSuggestions,
  generateLinkedInPost,
  type LinkedInPostPreview,
} from "@/lib/linkedin-demo-generator";
import { cn } from "@/lib/utils";

const initialPreview = generateLinkedInPost("AI content systems for founders");

function PostPreview({ post }: { post: LinkedInPostPreview }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-eyebrow text-secondary">Hook</p>
        <p className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-foreground md:text-base">
          {post.hook}
        </p>
      </div>
      <div className="h-px bg-border" />
      <div>
        <p className="text-eyebrow text-muted">Body</p>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">
          {post.body}
        </p>
      </div>
      <div className="h-px bg-border" />
      <div>
        <p className="text-eyebrow text-primary">CTA</p>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground">
          {post.cta}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {post.hashtags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-surface/80 px-2.5 py-1 text-xs text-secondary transition-colors hover:border-secondary/30"
          >
            <Hash className="size-3 opacity-70" aria-hidden />
            {tag.replace("#", "")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AiDemo() {
  const [topic, setTopic] = useState("");
  const [preview, setPreview] = useState<LinkedInPostPreview>(initialPreview);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setHasGenerated(true);

    window.setTimeout(() => {
      setPreview(generateLinkedInPost(topic));
      setIsGenerating(false);
    }, 1100);
  }, [topic]);

  const applySuggestion = (suggestion: string) => {
    setTopic(suggestion);
  };

  return (
    <Section id="ai-demo" lazy className="relative border-t border-border">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-[min(100vw,36rem)] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="AI demo"
          title="See authority-grade content — generated in seconds"
          description="Enter a topic. Watch our AI content engine produce a high-converting LinkedIn post structure — hook, body, CTA, and hashtags."
          align="center"
          className="relative mx-auto"
        />
      </FadeIn>

      <FadeIn delay={0.1} className="relative mt-12 md:mt-16">
        <GlassCard variant="strong" glow="soft" className="overflow-hidden p-1">
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface/60 px-3 py-2.5 sm:px-4 sm:py-3">
            <span className="size-2.5 shrink-0 rounded-full bg-red-500/70" aria-hidden />
            <span className="size-2.5 shrink-0 rounded-full bg-amber-400/70" aria-hidden />
            <span className="size-2.5 shrink-0 rounded-full bg-emerald-400/70" aria-hidden />
            <span className="min-w-0 truncate text-[10px] font-medium uppercase tracking-[0.18em] text-subtle sm:tracking-[0.2em]">
              Salehin AI Studio · LinkedIn Generator
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              Live
            </span>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div className="border-b border-border p-5 sm:p-6 md:p-8 lg:border-r lg:border-b-0">
              <label
                htmlFor="demo-topic"
                className="text-eyebrow text-muted"
              >
                Your topic
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="demo-topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isGenerating) handleGenerate();
                  }}
                  placeholder="e.g. AI content systems for founders"
                  className="focus-ring h-12 flex-1 rounded-lg border border-border-strong bg-background/80 px-4 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-primary/50"
                />
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={cn(
                    "focus-ring touch-target inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-label transition-all sm:w-auto",
                    "bg-primary text-foreground shadow-glow-primary",
                    "hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70",
                  )}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Wand2 className="size-4" aria-hidden />
                      Generate
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 text-xs text-subtle">Try a suggestion:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {demoSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => applySuggestion(suggestion)}
                    className="focus-ring touch-target rounded-full border border-border px-3 py-2 text-xs text-muted transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <ul className="mt-8 space-y-3 border-t border-border/80 pt-6">
                {[
                  "Voice-calibrated hooks & proof-led body copy",
                  "CTAs engineered for comments and DMs",
                  "Hashtag clusters for discoverability",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <Sparkles
                      className="mt-0.5 size-3.5 shrink-0 text-secondary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface/30 p-5 sm:p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full border border-border bg-gradient-brand-subtle font-display text-sm font-medium text-foreground">
                  SE
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Salehin Executive Studio
                  </p>
                  <p className="text-xs text-subtle">Preview · Just now</p>
                </div>
                <MessageSquare
                  className="ml-auto size-4 text-subtle"
                  aria-hidden
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={
                    hasGenerated
                      ? `${preview.hook.slice(0, 24)}-${isGenerating}`
                      : "initial"
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: isGenerating ? 0.4 : 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "rounded-xl border border-border bg-background/50 p-5 md:p-6",
                    isGenerating && "pointer-events-none",
                  )}
                >
                  {isGenerating ? (
                    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-muted">
                      <Loader2 className="size-8 animate-spin text-primary" />
                      <p className="text-sm">Crafting your post…</p>
                    </div>
                  ) : (
                    <PostPreview post={preview} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </GlassCard>
      </FadeIn>
    </Section>
  );
}
