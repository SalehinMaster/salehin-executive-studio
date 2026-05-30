import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  tabIndex,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      tabIndex={tabIndex}
      className={cn(
        "focus-ring touch-target inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 text-label transition-all",
        variant === "primary" &&
          "bg-primary text-foreground shadow-glow-primary hover:bg-primary-hover hover:shadow-[var(--shadow-glow-primary),0_0_60px_rgba(124,58,237,0.4)]",
        variant === "secondary" &&
          "glass-card border-border-strong text-foreground hover:border-primary/40 hover:shadow-glow-soft",
        variant === "ghost" &&
          "border border-border-strong bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/10",
        className,
      )}
    >
      {children}
    </Link>
  );
}
