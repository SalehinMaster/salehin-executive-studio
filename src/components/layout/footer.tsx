"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import {
  footerBrandStatement,
  footerNavColumns,
  footerSocialLinks,
} from "@/lib/home-content";
import { cn } from "@/lib/utils";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIcons = {
  linkedin: LinkedInIcon,
  x: XIcon,
  instagram: InstagramIcon,
} as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative mt-auto border-t border-border bg-surface/20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-container-x pb-8 pt-section md:px-container-x-md md:pb-10 md:pt-section-lg">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <div className="max-w-xl">
              <Link
                href="/"
                className="focus-ring font-display text-2xl font-medium tracking-tight text-foreground transition-opacity hover:opacity-90"
              >
                Salehin
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
                {footerBrandStatement}
              </p>
            </div>

            <div className="glass-card glow-border-primary p-5 sm:p-6">
              <p className="text-eyebrow text-primary">Newsletter</p>
              <h3 className="mt-2 font-display text-lg font-medium text-foreground">
                Authority insights, weekly
              </h3>
              <p className="mt-2 text-sm text-muted">
                LinkedIn growth tactics, AI workflows, and personal branding
                systems — no fluff.
              </p>

              {subscribed ? (
                <p className="mt-5 rounded-lg border border-secondary/25 bg-secondary/5 px-4 py-3 text-sm text-muted">
                  You&apos;re in. Check your inbox for the first briefing.
                </p>
              ) : (
                <form
                  onSubmit={handleNewsletter}
                  className="mt-5 flex flex-col gap-3 sm:flex-row"
                >
                  <label className="sr-only" htmlFor="footer-email">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={cn(
                      "focus-ring min-h-11 flex-1 rounded-lg border border-border-strong bg-surface/60 px-4 text-sm text-foreground placeholder:text-muted/70",
                      "transition-colors hover:border-primary/30 focus:border-primary/50",
                    )}
                  />
                  <Button type="submit" className="shrink-0 gap-2 sm:px-5">
                    Subscribe
                    <ArrowRight className="size-4 stroke-[1.5]" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-12 grid gap-8 border-t border-border/80 pt-10 sm:grid-cols-2 md:mt-14 md:grid-cols-4 md:pt-12">
            {footerNavColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-eyebrow text-foreground/90">{column.title}</h4>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="focus-ring text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-border/80 pt-8 md:mt-12 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              {footerSocialLinks.map((social) => {
                const Icon = socialIcons[social.icon];

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="focus-ring flex size-10 items-center justify-center rounded-lg border border-border bg-surface/50 text-muted transition-all hover:border-primary/40 hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>

            <p className="text-xs text-muted sm:text-sm">
              © {new Date().getFullYear()} Salehin Executive Studio. All rights
              reserved.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
