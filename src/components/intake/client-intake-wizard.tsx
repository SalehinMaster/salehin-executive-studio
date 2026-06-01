"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  Link2,
  Loader2,
  Sparkles,
  Target,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { BUDGET_RANGE_OPTIONS } from "@/lib/crm/constants";
import type { BudgetRange, IntakeFormState } from "@/lib/crm/types";
import { trackFunnelStep } from "@/lib/crm/track-funnel";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "profile", title: "Your profile", icon: User },
  { id: "goals", title: "Business goals", icon: Target },
  { id: "challenges", title: "Challenges", icon: Sparkles },
  { id: "investment", title: "Investment", icon: Wallet },
] as const;

const initialState: IntakeFormState = {
  fullName: "",
  company: "",
  linkedinUrl: "",
  website: "",
  businessGoals: "",
  currentChallenges: "",
  budgetRange: "",
};

const inputClassName = cn(
  "focus-ring min-h-11 w-full rounded-lg border border-border bg-surface/60 px-4 text-sm text-foreground placeholder:text-muted/70",
  "transition-colors hover:border-primary/30 focus:border-primary/50",
);

const textareaClassName = cn(inputClassName, "min-h-[120px] resize-y py-3");

export function ClientIntakeWizard() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<IntakeFormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof IntakeFormState>(key: K, value: IntakeFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const validateStep = (): boolean => {
    if (step === 0) {
      if (!form.fullName.trim() || !form.company.trim()) {
        setError("Name and company are required.");
        return false;
      }
    }
    if (step === 1 && !form.businessGoals.trim()) {
      setError("Please describe your business goals.");
      return false;
    }
    if (step === 2 && !form.currentChallenges.trim()) {
      setError("Please share your current challenges.");
      return false;
    }
    if (step === 3 && !form.budgetRange) {
      setError("Please select a budget range.");
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          company: form.company.trim(),
          linkedinUrl: form.linkedinUrl.trim() || undefined,
          website: form.website.trim() || undefined,
          businessGoals: form.businessGoals.trim(),
          currentChallenges: form.currentChallenges.trim(),
          budgetRange: form.budgetRange as BudgetRange,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Submission failed. Please try again.");
        return;
      }

      trackFunnelStep("client");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <GlassCard variant="strong" glow="primary" className="mx-auto max-w-xl p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden />
        <h2 className="mt-6 font-display text-2xl text-foreground">
          Application received
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Thank you, {form.fullName.split(" ")[0]}. Our team will review your goals and
          reach out within two business days with next steps.
        </p>
        <ButtonLink href="/contact#scheduling" className="mt-8">
          Prefer to talk sooner? Book a call
        </ButtonLink>
      </GlassCard>
    );
  }

  const StepIcon = STEPS[step].icon;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="flex justify-between gap-2">
          {STEPS.map((s, index) => (
            <div
              key={s.id}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-500",
                index <= step ? "bg-primary" : "bg-border",
              )}
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-4 text-eyebrow text-muted">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>

      <GlassCard variant="strong" glow="soft" className="overflow-hidden">
        <div
          className="h-1 bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label="Onboarding progress"
        />

        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="glass-card flex size-11 items-center justify-center rounded-xl">
              <StepIcon className="size-5 text-primary" aria-hidden />
            </span>
            <h2 className="font-display text-xl text-foreground sm:text-2xl">
              {STEPS[step].title}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 space-y-5"
            >
              {step === 0 ? (
                <>
                  <Field label="Full name" icon={User} required>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className={inputClassName}
                      placeholder="Jordan Salehin"
                      autoComplete="name"
                      required
                    />
                  </Field>
                  <Field label="Company" icon={Building2} required>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className={inputClassName}
                      placeholder="Acme Ventures"
                      autoComplete="organization"
                      required
                    />
                  </Field>
                  <Field label="LinkedIn profile" icon={Link2}>
                    <input
                      type="url"
                      value={form.linkedinUrl}
                      onChange={(e) => update("linkedinUrl", e.target.value)}
                      className={inputClassName}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </Field>
                  <Field label="Website" icon={Globe}>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      className={inputClassName}
                      placeholder="https://..."
                    />
                  </Field>
                </>
              ) : null}

              {step === 1 ? (
                <Field label="What are your primary business goals?" icon={Target} required>
                  <textarea
                    value={form.businessGoals}
                    onChange={(e) => update("businessGoals", e.target.value)}
                    className={textareaClassName}
                    placeholder="e.g. Build executive authority on LinkedIn, generate qualified inbound, support fundraising narrative..."
                    required
                  />
                </Field>
              ) : null}

              {step === 2 ? (
                <Field label="What challenges are you facing today?" icon={Sparkles} required>
                  <textarea
                    value={form.currentChallenges}
                    onChange={(e) => update("currentChallenges", e.target.value)}
                    className={textareaClassName}
                    placeholder="e.g. Inconsistent posting, unclear positioning, low engagement from ICP..."
                    required
                  />
                </Field>
              ) : null}

              {step === 3 ? (
                <fieldset>
                  <legend className="text-sm font-medium text-foreground">
                    Budget range <span className="text-primary">*</span>
                  </legend>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {BUDGET_RANGE_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "focus-within:ring-2 focus-within:ring-primary/50 cursor-pointer rounded-xl border p-4 transition-all",
                          form.budgetRange === option.value
                            ? "border-primary/50 bg-primary/10 shadow-glow-soft"
                            : "border-border bg-surface/40 hover:border-primary/30",
                        )}
                      >
                        <input
                          type="radio"
                          name="budgetRange"
                          value={option.value}
                          checked={form.budgetRange === option.value}
                          onChange={() => update("budgetRange", option.value)}
                          className="sr-only"
                        />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : null}
            </motion.div>
          </AnimatePresence>

          {error ? (
            <p className="mt-4 text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={step === 0 || loading}
              className="gap-2"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={goNext} className="gap-2">
                Continue
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                loading={loading}
                className="gap-2"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Sparkles className="size-4" aria-hidden />
                )}
                Submit application
              </Button>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="size-4 text-primary" aria-hidden />
        {label}
        {required ? <span className="text-primary">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function ButtonLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-6 text-label text-foreground shadow-glow-primary transition-all hover:bg-primary-hover",
        className,
      )}
    >
      {children}
    </Link>
  );
}
