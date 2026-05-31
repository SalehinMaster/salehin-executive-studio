"use client";

import { ChevronDown } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { faqs } from "@/lib/home-content";
import { cn } from "@/lib/utils";

const categories = [
  "Pricing",
  "Delivery",
  "LinkedIn Growth",
  "Personal Branding",
  "AI Systems",
] as const;

export function FAQAccordion() {
  const prefersReducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [activeCategory, setActiveCategory] = useState<string | "All">("All");

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((item) => item.category === activeCategory);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="mt-12 md:mt-16">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter FAQ by topic"
      >
        <CategoryPill
          label="All"
          active={activeCategory === "All"}
          onClick={() => setActiveCategory("All")}
        />
        {categories.map((category) => (
          <CategoryPill
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      <div className="mt-8 space-y-3 md:mt-10">
        {filteredFaqs.map((item, index) => {
          const isOpen = openId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard
                variant={isOpen ? "strong" : "default"}
                glow={isOpen ? "soft" : "none"}
                className={cn(
                  "overflow-hidden transition-colors duration-300",
                  isOpen && "glow-border-primary",
                )}
              >
                <button
                  type="button"
                  id={`faq-trigger-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggle(item.id)}
                  className="focus-ring flex w-full items-start justify-between gap-4 p-5 text-left sm:gap-6 sm:p-6 md:p-7"
                >
                  <span className="min-w-0 flex-1">
                    <span className="text-eyebrow text-primary/80">
                      {item.category}
                    </span>
                    <span className="mt-2 block text-display-card font-display font-medium text-foreground">
                      {item.question}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface/60 text-primary transition-all duration-300",
                      isOpen && "rotate-180 border-primary/40 bg-primary/10",
                    )}
                    aria-hidden
                  >
                    <ChevronDown className="size-4 stroke-[2]" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      initial={
                        prefersReducedMotion
                          ? false
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        prefersReducedMotion
                          ? undefined
                          : { height: 0, opacity: 0 }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/80 px-5 pb-5 sm:px-6 sm:pb-6 md:px-7 md:pb-7">
                        <p className="max-w-3xl pt-4 text-sm leading-relaxed text-muted sm:pt-5 sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "focus-ring rounded-full border px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-300 sm:px-4",
        active
          ? "border-primary/50 bg-primary/15 text-foreground shadow-glow-soft"
          : "border-border bg-surface/40 text-muted hover:border-primary/30 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
