import Link from "next/link";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type HeaderProps = {
  pathname: string;
};

export function Header({ pathname }: HeaderProps) {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-foreground"
        >
          Salehin
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          {routes.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
