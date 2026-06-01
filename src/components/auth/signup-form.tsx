"use client";

import { Loader2, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES } from "@/lib/auth/paths";
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "@/lib/auth/validation";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

const inputClassName = cn(
  "focus-ring w-full rounded-lg border border-border-strong bg-surface/60 py-3 pr-4 text-sm text-foreground placeholder:text-muted/70",
  "transition-colors hover:border-primary/30 focus:border-primary/50",
);

export function SignupForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(AUTH_ROUTES.callback, window.location.origin);
    url.searchParams.set("next", "/dashboard");
    return url.toString();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const nameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (nameError || emailError || passwordError) {
      setError(nameError ?? emailError ?? passwordError);
      return;
    }

    setLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: callbackUrl,
        data: { full_name: fullName.trim() },
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    router.push(`${AUTH_ROUTES.verifyEmail}?email=${encodeURIComponent(email.trim())}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block space-y-2">
        <span className="text-eyebrow text-muted">Full name</span>
        <div className="relative">
          <User
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            type="text"
            required
            autoComplete="name"
            placeholder="Alex Rivera"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={cn(inputClassName, "pl-10")}
          />
        </div>
      </label>

      <label className="block space-y-2">
        <span className="text-eyebrow text-muted">Work email</span>
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
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(inputClassName, "pl-10")}
          />
        </div>
      </label>

      <Button type="submit" className="w-full" loading={loading}>
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        Create account
      </Button>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}

      <p className="text-center text-xs leading-relaxed text-muted">
        We&apos;ll send a verification link to confirm your email before full access.
      </p>
    </form>
  );
}
