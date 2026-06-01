"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/toast-provider";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export function CopyButton({ text, label = "Copy", className }: CopyButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        variant: "success",
        title: "Copied to clipboard",
        description: "Ready to paste into LinkedIn or your design tool.",
      });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        variant: "error",
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
      });
    }
  }, [text, toast]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "focus-ring inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-surface/60 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-foreground",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-primary" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}
