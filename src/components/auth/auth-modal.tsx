"use client";

import { Loader2, Mail, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { useAuth } from "@/components/auth/auth-provider";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function AuthModal() {
  const { isAuthOpen, closeAuth, redirectTo } = useAuth();
  const supabase = useMemo(() => createClient(), []);
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"signin" | "sent">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"google" | "email" | null>(null);

  const resetForm = useCallback(() => {
    setEmail("");
    setMode("signin");
    setError(null);
    setLoading(null);
  }, []);

  useEffect(() => {
    if (!isAuthOpen) {
      resetForm();
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAuth();
    };

    window.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => emailInputRef.current?.focus(), 120);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [isAuthOpen, closeAuth, resetForm]);

  const callbackUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL("/auth/callback", window.location.origin);
    url.searchParams.set("next", redirectTo);
    return url.toString();
  }, [redirectTo]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading("google");

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(null);
    }
  };

  const handleMagicLink = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading("email");

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: callbackUrl,
        shouldCreateUser: true,
      },
    });

    setLoading(null);

    if (authError) {
      setError(authError.message);
      return;
    }

    setMode("sent");
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          <motion.button
            type="button"
            aria-label="Close sign in"
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            className="relative w-full max-w-md"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard
              variant="strong"
              glow="primary"
              className="relative overflow-hidden p-6 sm:p-8"
            >
              <div
                className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-primary/20 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-16 size-40 rounded-full bg-secondary/15 blur-3xl"
                aria-hidden
              />

              <button
                type="button"
                onClick={closeAuth}
                className="focus-ring absolute top-4 right-4 flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
                aria-label="Close"
              >
                <X className="size-4" aria-hidden />
              </button>

              <div className="relative space-y-6">
                <div className="space-y-2 pr-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                    <Sparkles className="size-3.5" aria-hidden />
                    Premium access
                  </div>
                  <h2
                    id="auth-modal-title"
                    className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
                  >
                    {mode === "sent" ? "Check your inbox" : "Welcome back"}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {mode === "sent"
                      ? `We sent a secure sign-in link to ${email}. Open it on this device to continue.`
                      : "Sign in to access your content studio, post history, and premium AI tools."}
                  </p>
                </div>

                {mode === "signin" ? (
                  <div className="space-y-4">
                    <Button
                      variant="secondary"
                      className="w-full gap-3"
                      loading={loading === "google"}
                      onClick={handleGoogleSignIn}
                    >
                      {loading === "google" ? (
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                      ) : (
                        <GoogleIcon className="size-5" />
                      )}
                      Continue with Google
                    </Button>

                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-xs tracking-wide text-muted uppercase">
                        or
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <form onSubmit={handleMagicLink} className="space-y-3">
                      <label className="block space-y-2">
                        <span className="text-eyebrow text-muted">Work email</span>
                        <div className="relative">
                          <Mail
                            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
                            aria-hidden
                          />
                          <input
                            ref={emailInputRef}
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className={cn(
                              "focus-ring w-full rounded-lg border border-border-strong bg-surface/60 py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted/70",
                              "transition-colors hover:border-primary/30 focus:border-primary/50",
                            )}
                          />
                        </div>
                      </label>

                      <Button
                        type="submit"
                        className="w-full"
                        loading={loading === "email"}
                      >
                        {loading === "email" ? (
                          <Loader2 className="size-4 animate-spin" aria-hidden />
                        ) : null}
                        Send magic link
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-secondary/25 bg-secondary/5 px-4 py-3 text-sm text-muted">
                      Didn&apos;t receive it? Check spam or{" "}
                      <button
                        type="button"
                        className="text-secondary underline-offset-2 hover:underline"
                        onClick={() => setMode("signin")}
                      >
                        try again
                      </button>
                      .
                    </div>
                    <Button variant="ghost" className="w-full" onClick={closeAuth}>
                      Back to site
                    </Button>
                  </div>
                )}

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                  >
                    {error}
                  </p>
                )}

                {mode === "signin" && (
                  <p className="text-center text-xs leading-relaxed text-muted">
                    By continuing, you agree to our terms. No password required.
                  </p>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
