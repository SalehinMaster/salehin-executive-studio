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
        "focus-ring inline-flex items-center gap-2 text-label text-foreground transition-colors hover:text-primary",
        className,
      )}
    >
      {children}
    </Link>
  );
}
