"use client";

import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES, sanitizeRedirectPath } from "@/lib/auth/paths";
import { validateEmail, validatePassword } from "@/lib/auth/validation";
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

const inputClassName = cn(
  "focus-ring w-full rounded-lg border border-border-strong bg-surface/60 py-3 pr-4 text-sm text-foreground placeholder:text-muted/70",
  "transition-colors hover:border-primary/30 focus:border-primary/50",
);

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);

  const nextPath = sanitizeRedirectPath(searchParams.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"google" | "email" | null>(null);

  const callbackUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(AUTH_ROUTES.callback, window.location.origin);
    url.searchParams.set("next", nextPath);
    return url.toString();
  }, [nextPath]);

  const handleGoogle = async () => {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setError(emailError ?? passwordError);
      return;
    }

    setLoading("email");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(null);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (data.user && !data.user.email_confirmed_at) {
      router.push(`${AUTH_ROUTES.verifyEmail}?email=${encodeURIComponent(email.trim())}`);
      router.refresh();
      return;
    }

    router.push(nextPath);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <Button
        variant="secondary"
        className="w-full gap-3"
        loading={loading === "google"}
        onClick={handleGoogle}
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
        <span className="text-xs tracking-wide text-muted uppercase">or email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block space-y-2">
          <span className="text-eyebrow text-muted">Email</span>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(inputClassName, "pl-10")}
            />
          </div>
        </label>

        <label className="block space-y-2">
          <span className="text-eyebrow text-muted">Password</span>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(inputClassName, "pl-10")}
            />
          </div>
        </label>

        <Button type="submit" className="w-full" loading={loading === "email"}>
          Sign in
        </Button>
      </form>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
