"use client";

import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/home-content";
import { cn } from "@/lib/utils";

function VideoPlaceholder({
  initials,
  name,
  duration,
}: {
  initials: string;
  name: string;
  duration: string;
}) {
  return (
    <div className="group/video relative aspect-video w-full overflow-hidden rounded-xl border border-border/80 bg-surface/80">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-secondary/15"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(124,58,237,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(6,182,212,0.2) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover/video:scale-110 group-hover/video:border-primary/40 group-hover/video:bg-primary/20">
          <Play className="size-5 fill-foreground text-foreground pl-0.5" aria-hidden />
        </span>
        <span className="rounded-full bg-background/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted backdrop-blur-sm">
          {duration}
        </span>
      </div>

      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-semibold text-foreground">
          {initials}
        </span>
        <span className="text-xs font-medium text-foreground/90">{name}</span>
      </div>
    </div>
  );
}

function TestimonialCard({
  item,
  isActive,
}: {
  item: (typeof testimonials)[number];
  isActive: boolean;
}) {
  return (
    <GlassCard
      variant="strong"
      glow={isActive ? "soft" : "none"}
      className={cn(
        "relative h-full overflow-hidden p-6 sm:p-8",
        isActive && "glow-border-primary",
      )}
    >
      <Quote className="size-8 text-primary/30" aria-hidden />

      <blockquote className="mt-4">
        <p className="text-display-quote font-display font-medium text-pretty text-foreground">
          &ldquo;{item.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-border/60 pt-6">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-foreground">
          {item.initials}
        </span>
        <cite className="not-italic">
          <span className="block text-sm font-medium text-foreground">{item.name}</span>
          <span className="mt-0.5 block text-[11px] uppercase tracking-[0.16em] text-muted">
            {item.role}
          </span>
        </cite>
      </footer>

      {item.hasVideo && item.videoDuration ? (
        <div className="mt-6">
          <VideoPlaceholder
            initials={item.initials}
            name={item.name.split(" ")[0]}
            duration={item.videoDuration}
          />
        </div>
      ) : null}
    </GlassCard>
  );
}

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(goNext, 7000);
    return () => clearInterval(timer);
  }, [goNext, prefersReducedMotion]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <Section id="testimonials" lazy className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-[min(80vw,36rem)] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="Testimonials"
          title="Founders & CEOs on life after the OS is live."
          description="Hear from leaders who replaced sporadic posting with a compounding authority engine."
          align="center"
          className="mx-auto max-w-3xl"
        />
      </FadeIn>

      <div className="relative mt-12 md:mt-16">
        <div className="relative mx-auto max-w-3xl min-h-[28rem] sm:min-h-[26rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full"
            >
              <TestimonialCard
                item={testimonials[activeIndex]}
                isActive
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="focus-ring glass-card touch-target flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "focus-ring h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-gradient-brand"
                    : "w-2 bg-border hover:bg-muted/50",
                )}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="focus-ring glass-card touch-target flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-12 hidden gap-4 md:mt-16 md:grid md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((item, index) => (
          <FadeIn key={item.name} delay={index * 0.06}>
            <button
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "focus-ring w-full rounded-xl border p-4 text-left transition-all duration-300",
                index === activeIndex
                  ? "border-primary/40 bg-primary/10 glow-soft"
                  : "border-border bg-surface/40 hover:border-primary/25 hover:bg-surface/60",
              )}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-gradient-brand text-xs font-semibold text-foreground">
                {item.initials}
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">{item.name}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-subtle">
                {item.role}
              </p>
            </button>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
