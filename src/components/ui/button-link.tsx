import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 px-1 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors",
        variant === "primary" &&
          "border-b border-foreground text-foreground hover:border-accent hover:text-accent",
        variant === "secondary" &&
          "text-muted hover:text-foreground",
        variant === "ghost" &&
          "border-b border-background/40 text-background hover:border-background",
        className,
      )}
    >
      {children}
    </Link>
  );
}
