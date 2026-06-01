"use client";

import {
  Layers,
  PenLine,
  Sparkles,
  UserRound,
  Wand2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { BioOptimizerTool } from "@/components/saas/ai-tools/bio-optimizer-tool";
import { CarouselGeneratorTool } from "@/components/saas/ai-tools/carousel-generator-tool";
import { ContentRewriterTool } from "@/components/saas/ai-tools/content-rewriter-tool";
import { HookGeneratorTool } from "@/components/saas/ai-tools/hook-generator-tool";
import { LinkedInPostTool } from "@/components/saas/ai-tools/linkedin-post-tool";
import { cn } from "@/lib/utils";

type ToolTabId =
  | "linkedin_post"
  | "hook_generator"
  | "bio_optimizer"
  | "content_rewriter"
  | "carousel";

const TOOL_TABS: ReadonlyArray<{
  id: ToolTabId;
  label: string;
  description: string;
  icon: typeof Wand2;
  phases: string;
}> = [
  {
    id: "linkedin_post",
    label: "Post Generator",
    description: "Hook, body, CTA, hashtags",
    icon: Wand2,
    phases: "45",
  },
  {
    id: "hook_generator",
    label: "Hook Generator",
    description: "Curiosity, authority, contrarian, story",
    icon: Zap,
    phases: "46",
  },
  {
    id: "bio_optimizer",
    label: "Bio Optimizer",
    description: "Premium positioning concepts",
    icon: UserRound,
    phases: "47",
  },
  {
    id: "content_rewriter",
    label: "Content Rewriter",
    description: "Founder · Professional · Executive",
    icon: PenLine,
    phases: "48",
  },
  {
    id: "carousel",
    label: "Carousel",
    description: "9-slide design-ready plan",
    icon: Layers,
    phases: "49",
  },
] as const;

function ActiveTool({ id }: { id: ToolTabId }) {
  switch (id) {
    case "linkedin_post":
      return <LinkedInPostTool />;
    case "hook_generator":
      return <HookGeneratorTool />;
    case "bio_optimizer":
      return <BioOptimizerTool />;
    case "content_rewriter":
      return <ContentRewriterTool />;
    case "carousel":
      return <CarouselGeneratorTool />;
    default:
      return null;
  }
}

export function AiToolsHub() {
  const [activeTab, setActiveTab] = useState<ToolTabId>("linkedin_post");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <p className="text-eyebrow text-primary">AI Tools · Stage E</p>
        <h1 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
          Core generation suite
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Authority content powered by OpenRouter — posts, hooks, bios, rewrites,
          and carousel plans in one executive workspace.
        </p>
      </div>

      <nav
        className="flex gap-2 overflow-x-auto pb-1"
        aria-label="AI generation tools"
      >
        {TOOL_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "focus-ring shrink-0 rounded-xl border px-4 py-3 text-left transition-all",
                active
                  ? "border-primary/50 bg-primary/15 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.2)]"
                  : "border-border/80 bg-surface/40 text-muted hover:border-primary/30 hover:text-foreground",
              )}
              aria-current={active ? "true" : undefined}
            >
              <span className="flex items-center gap-2">
                <Icon
                  className={cn("size-4", active ? "text-primary" : "text-subtle")}
                  aria-hidden
                />
                <span className="text-sm font-medium text-foreground">{tab.label}</span>
              </span>
              <span className="mt-1 block text-[11px] text-subtle">{tab.description}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface/30 px-3 py-2 text-xs text-muted">
        <Sparkles className="size-3.5 text-primary" aria-hidden />
        Phases {TOOL_TABS.find((t) => t.id === activeTab)?.phases} — outputs save to your
        generation history automatically.
      </div>

      <ActiveTool id={activeTab} />
    </div>
  );
}
