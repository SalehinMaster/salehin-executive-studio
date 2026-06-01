import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { InternalLinkItem } from "@/lib/internal-links";
import { cn } from "@/lib/utils";

type InternalLinkHubProps = {
  title?: string;
  description?: string;
  links: InternalLinkItem[];
  className?: string;
};

export function InternalLinkHub({
  title = "Explore the studio",
  description = "Cross-linked hubs for services, proof, pricing, and insights — built for SEO equity and clear next steps.",
  links,
  className,
}: InternalLinkHubProps) {
  if (links.length === 0) return null;

  return (
    <nav
      aria-label="Related pages"
      className={cn(
        "rounded-2xl border border-border/80 bg-surface/30 p-6 md:p-8",
        className,
      )}
    >
      <h2 className="font-display text-xl font-medium text-foreground md:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {description}
      </p>
      <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="focus-ring group flex h-full flex-col rounded-xl border border-border/80 bg-surface/40 p-4 transition-colors hover:border-primary/35 hover:bg-surface/60"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">
                  {link.label}
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden
                />
              </span>
              <span className="mt-2 text-xs leading-relaxed text-muted">
                {link.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
