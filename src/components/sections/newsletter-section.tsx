"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsletterCapture } from "@/components/newsletter/newsletter-capture";

export function NewsletterSection() {
  return (
    <Section
      id="newsletter"
      lazy
      className="relative border-t border-border py-section md:py-section-lg"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/35 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 size-80 rounded-full bg-secondary/8 blur-[100px]"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="Stay ahead"
          title="The executive briefing on authority"
          description="Weekly systems for LinkedIn growth, AI content, and personal branding — written for founders who don't have time for fluff."
          align="center"
          className="mx-auto max-w-2xl"
        />
      </FadeIn>

      <FadeIn delay={0.1}>
        <NewsletterCapture
          source="home-newsletter"
          inputId="home-newsletter-email"
          variant="featured"
          layout="stacked"
          className="mx-auto mt-10 max-w-xl sm:mt-12"
        />
      </FadeIn>
    </Section>
  );
}
