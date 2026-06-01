"use client";

import { OPENROUTER_MODEL_OPTIONS, type OpenRouterModelKey } from "@/lib/ai/models";
import { cn } from "@/lib/utils";

type ModelSelectorProps = {
  value: OpenRouterModelKey;
  onChange: (key: OpenRouterModelKey) => void;
  allowedModels?: readonly OpenRouterModelKey[];
};

export function ModelSelector({ value, onChange, allowedModels }: ModelSelectorProps) {
  const allowed = allowedModels ?? OPENROUTER_MODEL_OPTIONS.map((o) => o.key);

  return (
    <div>
      <p className="text-eyebrow text-muted">Model</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {OPENROUTER_MODEL_OPTIONS.map((option) => {
          const locked = !allowed.includes(option.key);
          return (
          <button
            key={option.key}
            type="button"
            disabled={locked}
            onClick={() => onChange(option.key)}
            className={cn(
              "focus-ring rounded-lg border px-3 py-3 text-left transition-all",
              locked && "cursor-not-allowed opacity-50",
              value === option.key
                ? "border-primary/50 bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_rgba(124,58,237,0.2)]"
                : "border-border bg-surface/40 text-muted hover:border-primary/30",
            )}
          >
            <span className="block text-sm font-medium">{option.label}</span>
            <span className="mt-1 block text-[11px] leading-snug text-subtle">
              {option.description}
            </span>
          </button>
        );
        })}
      </div>
      {allowed.length < OPENROUTER_MODEL_OPTIONS.length ? (
        <p className="mt-2 text-[11px] text-subtle">
          Upgrade to Pro for all models.
        </p>
      ) : null}
    </div>
  );
}
