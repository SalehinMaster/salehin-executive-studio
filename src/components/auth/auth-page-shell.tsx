import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { GlassCard } from "@/components/ui/glass-card";

type AuthPageShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthPageShell({ title, subtitle, children, footer }: AuthPageShellProps) {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-16 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.22),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 size-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-1/4 size-80 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="focus-ring mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <span className="font-display text-lg text-foreground">Salehin</span>
          <span className="text-subtle">Executive Studio</span>
        </Link>

        <GlassCard variant="strong" glow="primary" className="relative overflow-hidden p-6 sm:p-8">
          <div
            className="pointer-events-none absolute -top-20 -right-20 size-40 rounded-full bg-primary/20 blur-3xl"
            aria-hidden
          />

          <div className="relative space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                <Sparkles className="size-3.5" aria-hidden />
                AI Personal Brand OS
              </div>
              <h1 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                {title}
              </h1>
              <p className="text-sm leading-relaxed text-muted">{subtitle}</p>
            </div>

            {children}
          </div>
        </GlassCard>

        {footer ? <div className="relative mt-6 text-center text-sm text-muted">{footer}</div> : null}
      </div>
    </div>
  );
}
