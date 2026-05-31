"use client";

import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { EmailCaptureSuccess } from "@/components/forms/email-capture-success";
import { Button } from "@/components/ui/button";
import { getFormspreeEndpoint } from "@/lib/formspree-config";
import { validateEmail } from "@/lib/validate-email";
import { cn } from "@/lib/utils";

const inputClassName = cn(
  "focus-ring min-h-11 w-full rounded-lg border bg-surface/60 text-sm text-foreground placeholder:text-muted/70",
  "transition-colors hover:border-primary/30 focus:border-primary/50",
);

type EmailCaptureFormProps = {
  formId: string;
  formType: "lead-magnet" | "newsletter";
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  className?: string;
  layout?: "inline" | "stacked";
  inputId: string;
  resource?: string;
  showEmailIcon?: boolean;
  helperText?: string;
};

export function EmailCaptureForm({
  formId,
  formType,
  submitLabel,
  successTitle,
  successMessage,
  className,
  layout = "inline",
  inputId,
  resource,
  showEmailIcon = false,
  helperText,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const endpoint = formId ? getFormspreeEndpoint(formId) : "";

  const handleBlur = () => {
    setTouched(true);
    if (!email.trim()) {
      setError(null);
      return;
    }

    const result = validateEmail(email);
    setError(result.valid ? null : result.error);
  };

  const handleChange = (value: string) => {
    setEmail(value);
    if (touched || error) {
      const result = validateEmail(value);
      setError(result.valid ? null : result.error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);

    const result = validateEmail(email);
    if (!result.valid) {
      setError(result.error);
      return;
    }

    if (!endpoint) {
      setError(
        "Email capture is not configured yet. Add your Formspree form ID to .env.local.",
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: result.normalized,
          _subject:
            formType === "lead-magnet"
              ? `Lead magnet: ${resource ?? "Resource bundle"}`
              : "Newsletter subscription",
          form_type: formType,
          ...(resource ? { resource } : {}),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setEmail("");
      setTouched(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <EmailCaptureSuccess
        title={successTitle}
        message={successMessage}
        compact={layout === "inline"}
        className={className}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        layout === "inline"
          ? "flex flex-col gap-3 sm:flex-row"
          : "space-y-3",
        className,
      )}
    >
      <div className={cn(layout === "inline" && "min-w-0 flex-1")}>
        <label className="sr-only" htmlFor={inputId}>
          Email address
        </label>
        <div className="relative">
          {showEmailIcon ? (
            <Mail
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
          ) : null}
          <input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={handleBlur}
            disabled={loading}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              inputClassName,
              showEmailIcon && "pl-10 pr-4",
              !showEmailIcon && "px-4",
              error
                ? "border-red-500/50 focus:border-red-500/60"
                : "border-border-strong",
            )}
          />
        </div>
        {helperText ? (
          <p id={`${inputId}-helper`} className="mt-2 text-xs text-muted">
            {helperText}
          </p>
        ) : null}
        {error ? (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="mt-2 text-xs text-red-300"
          >
            {error}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        loading={loading}
        disabled={loading}
        className={cn(
          "shrink-0 gap-2",
          layout === "stacked" && "w-full sm:w-auto",
        )}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="size-4 stroke-[1.5]" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
