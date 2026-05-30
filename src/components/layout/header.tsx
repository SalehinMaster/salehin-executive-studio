"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { routes, strategyCallHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

type HeaderProps = {
  pathname: string;
};

export function Header({ pathname }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "glass-nav sticky top-0 z-50",
        scrolled && "glass-nav-scrolled",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-container-x md:h-20 md:px-container-x-md">
        <Link
          href="/"
          className="focus-ring font-display text-xl font-medium tracking-tight text-foreground transition-opacity hover:opacity-90"
        >
          Salehin
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {routes.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn("nav-link focus-ring", isActive && "nav-link-active")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ButtonLink href={strategyCallHref} className="h-10 px-5 text-[11px]">
            Book Strategy Call
          </ButtonLink>
        </div>

        <button
          type="button"
          className="focus-ring glass-card flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="size-5 stroke-[1.5]" />
          ) : (
            <Menu className="size-5 stroke-[1.5]" />
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 top-[4.5rem] z-40 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
        />

        <nav
          className={cn(
            "glass-card-strong absolute right-0 left-0 mx-4 mt-2 flex flex-col gap-1 p-4 transition-all duration-300 ease-out",
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0",
          )}
          aria-label="Mobile navigation"
        >
          {routes.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "focus-ring rounded-lg px-4 py-3 text-sm font-medium tracking-wide transition-colors",
                  isActive
                    ? "bg-primary/15 text-foreground"
                    : "text-muted hover:bg-surface hover:text-foreground",
                )}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <div className="mt-3 border-t border-border pt-4">
            <ButtonLink
              href={strategyCallHref}
              className="w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Book Strategy Call
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
