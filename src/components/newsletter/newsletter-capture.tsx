"use client";

import { Mail } from "lucide-react";
import { EmailCaptureForm } from "@/components/forms/email-capture-form";
import { cn } from "@/lib/utils";
import type { NewsletterSource } from "@/lib/newsletter/config";

type NewsletterCaptureProps = {
  source: NewsletterSource;
  inputId: string;
  variant?: "compact" | "featured" | "minimal";
  className?: string;
  title?: string;
  description?: string;
  eyebrow?: string;
  layout?: "inline" | "stacked";
};

const defaultCopy = {
  eyebrow: "Newsletter",
  title: "Authority insights, weekly",
  description:
    "LinkedIn growth tactics, AI workflows, and personal branding systems — no fluff.",
  successTitle: "You're subscribed",
  successMessage:
    "Check your inbox for the first authority briefing — LinkedIn tactics, AI workflows, and branding systems.",
} as const;

export function NewsletterCapture({
  source,
  inputId,
  variant = "featured",
  className,
  title = defaultCopy.title,
  description = defaultCopy.description,
  eyebrow = defaultCopy.eyebrow,
  layout = "inline",
}: NewsletterCaptureProps) {
  const showHeader = variant !== "minimal";

  return (
    <div
      className={cn(
        "newsletter-glass relative overflow-hidden",
        variant === "featured" && "glass-card glow-border-primary p-5 sm:p-6",
        variant === "compact" &&
          "rounded-xl border border-border/80 bg-surface/30 p-4 backdrop-blur-md sm:p-5",
        variant === "minimal" && "p-0",
        className,
      )}
    >
      {variant === "featured" ? (
        <>
          <div
            className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-10 -left-10 size-28 rounded-full bg-secondary/10 blur-3xl"
            aria-hidden
          />
        </>
      ) : null}

      <div className="relative">
        {showHeader ? (
          <div className={cn(variant === "compact" && "mb-4")}>
            <div className="flex items-center gap-2">
              {variant === "featured" ? (
                <span className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Mail className="size-4" aria-hidden />
                </span>
              ) : null}
              <p className="text-eyebrow text-primary">{eyebrow}</p>
            </div>
            <h3
              className={cn(
                "font-display font-medium text-foreground",
                variant === "featured"
                  ? "mt-3 text-lg sm:text-xl"
                  : "mt-2 text-base",
              )}
            >
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {description}
            </p>
          </div>
        ) : null}

        <EmailCaptureForm
          formType="newsletter"
          newsletterSource={source}
          inputId={inputId}
          submitLabel="Subscribe"
          successTitle={defaultCopy.successTitle}
          successMessage={defaultCopy.successMessage}
          layout={layout}
          showEmailIcon={layout === "stacked"}
          helperText={
            layout === "stacked"
              ? "One email per week. Unsubscribe anytime."
              : undefined
          }
          className={showHeader ? "mt-5" : undefined}
        />
      </div>
    </div>
  );
}
