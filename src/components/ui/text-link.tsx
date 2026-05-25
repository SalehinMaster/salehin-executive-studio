import Link from "next/link";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
    </Link>
  );
}
