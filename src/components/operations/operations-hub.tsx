import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  GitBranch,
  Headphones,
  LayoutDashboard,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { operationsQuickLinks } from "@/lib/operations/kpi-data";
import { cn } from "@/lib/utils";

const iconByHref: Record<string, React.ComponentType<{ className?: string }>> = {
  "/operations/kpi": BarChart3,
  "/knowledge": BookOpen,
  "/support": Headphones,
  "/crm": GitBranch,
  "/proposal": LayoutDashboard,
};

export function OperationsHub() {
  return (
    <div className="space-y-10">
      <GlassCard variant="strong" glow="soft" className="p-6 sm:p-8">
        <p className="text-eyebrow text-secondary">Stage D · Phases 39–40</p>
        <h2 className="mt-2 font-display text-2xl text-foreground">
          Operational backbone
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Central hub for executive analytics, client knowledge, support intake,
          and revenue operations. Connect live CRM and analytics feeds when ready.
        </p>
      </GlassCard>

      <ul className="grid gap-4 sm:grid-cols-2">
        {operationsQuickLinks.map((link) => {
          const Icon = iconByHref[link.href] ?? LayoutDashboard;
          return (
            <li key={link.href}>
              <Link href={link.href} className="group block h-full">
                <GlassCard
                  hover
                  variant="default"
                  className="flex h-full flex-col p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {link.badge ? (
                      <span className="rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary">
                        {link.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 font-display text-lg text-foreground group-hover:text-primary">
                    {link.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{link.description}</p>
                  <span
                    className={cn(
                      "mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary",
                    )}
                  >
                    Open
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </GlassCard>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
