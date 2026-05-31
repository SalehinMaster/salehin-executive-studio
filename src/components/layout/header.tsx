"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { routes, strategyCallHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

type HeaderProps = {
  pathname: string;
};

export function Header({ pathname }: HeaderProps) {
  const { user, loading, openAuth } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleSignIn = useCallback(() => {
    closeMobileMenu();
    openAuth({ redirectTo: "/dashboard" });
  }, [closeMobileMenu, openAuth]);

  const handleStrategyCall = useCallback(() => {
    if (!user) {
      closeMobileMenu();
      openAuth({ redirectTo: strategyCallHref });
    }
  }, [user, closeMobileMenu, openAuth]);

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
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobileMenu]);

  useEffect(() => {
    if (!mobileOpen) return;

    const firstLink = mobileNavRef.current?.querySelector<HTMLElement>(
      "a, button",
    );
    firstLink?.focus();
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "glass-nav sticky top-0 z-50 pt-[env(safe-area-inset-top,0px)]",
        scrolled && "glass-nav-scrolled",
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between gap-4 px-container-x md:px-container-x-md">
        <Link
          href="/"
          className="focus-ring font-display text-lg font-medium tracking-tight text-foreground transition-opacity hover:opacity-90 sm:text-xl"
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

        <div className="hidden items-center gap-3 lg:flex">
          {!loading && !user && (
            <Button variant="ghost" className="h-10 px-4 text-[11px]" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
          {!loading && user && (
            <ButtonLink
              href="/dashboard"
              variant="ghost"
              className="h-10 px-4 text-[11px]"
            >
              Dashboard
            </ButtonLink>
          )}
          {user ? (
            <ButtonLink href={strategyCallHref} className="h-10 px-5 text-[11px]">
              Book Strategy Call
            </ButtonLink>
          ) : (
            <Button className="h-10 px-5 text-[11px]" onClick={handleStrategyCall}>
              Book Strategy Call
            </Button>
          )}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="focus-ring glass-card touch-target flex size-11 items-center justify-center rounded-lg text-foreground lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-haspopup="dialog"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="size-5 stroke-[1.5]" aria-hidden />
          ) : (
            <Menu className="size-5 stroke-[1.5]" aria-hidden />
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 top-[calc(var(--header-height)+env(safe-area-inset-top,0px))] z-40 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
        {...(!mobileOpen ? { inert: true as const } : {})}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={closeMobileMenu}
        />

        <nav
          ref={mobileNavRef}
          className={cn(
            "glass-card-strong absolute right-0 left-0 mx-3 mt-2 flex max-h-[calc(100dvh-var(--header-height)-env(safe-area-inset-top,0px)-1rem)] flex-col gap-1 overflow-y-auto overscroll-contain p-3 transition-all duration-300 ease-out sm:mx-4 sm:p-4",
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0",
          )}
          aria-label="Mobile navigation links"
        >
          {routes.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "focus-ring touch-target flex min-h-11 items-center rounded-lg px-4 py-3 text-sm font-medium tracking-wide transition-colors",
                  isActive
                    ? "bg-primary/15 text-foreground"
                    : "text-muted hover:bg-surface hover:text-foreground",
                )}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={closeMobileMenu}
              >
                {label}
              </Link>
            );
          })}
          <div className="mt-2 space-y-2 border-t border-border pt-3 sm:mt-3 sm:pt-4">
            {!loading && !user && (
              <Button
                variant="ghost"
                className="min-h-11 w-full justify-center"
                tabIndex={mobileOpen ? 0 : -1}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            )}
            {!loading && user && (
              <ButtonLink
                href="/dashboard"
                variant="ghost"
                className="min-h-11 w-full justify-center"
                tabIndex={mobileOpen ? 0 : -1}
                onClick={closeMobileMenu}
              >
                Dashboard
              </ButtonLink>
            )}
            {user ? (
              <ButtonLink
                href={strategyCallHref}
                className="min-h-11 w-full justify-center"
                tabIndex={mobileOpen ? 0 : -1}
                onClick={closeMobileMenu}
              >
                Book Strategy Call
              </ButtonLink>
            ) : (
              <Button
                className="min-h-11 w-full justify-center"
                tabIndex={mobileOpen ? 0 : -1}
                onClick={handleStrategyCall}
              >
                Book Strategy Call
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
