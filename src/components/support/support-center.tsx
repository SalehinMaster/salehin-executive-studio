"use client";

import { ChevronDown, LifeBuoy, Ticket } from "lucide-react";
import { useCallback, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import type { SupportFaq } from "@/lib/support/faqs";
import { cn } from "@/lib/utils";

type SupportCenterProps = {
  faqs: SupportFaq[];
};

type SupportTab = "faq" | "ticket";

export function SupportCenter({ faqs }: SupportCenterProps) {
  const [tab, setTab] = useState<SupportTab>("faq");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  function handleTicketSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="space-y-8">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Support sections"
      >
        <TabButton
          active={tab === "faq"}
          onClick={() => setTab("faq")}
          icon={<LifeBuoy className="size-4" aria-hidden />}
          label="FAQs"
        />
        <TabButton
          active={tab === "ticket"}
          onClick={() => setTab("ticket")}
          icon={<Ticket className="size-4" aria-hidden />}
          label="Submit ticket"
        />
      </div>

      {tab === "faq" ? (
        <div className="space-y-3" role="tabpanel">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <GlassCard
                key={item.id}
                variant={isOpen ? "strong" : "default"}
                glow={isOpen ? "soft" : "none"}
                className="overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(item.id)}
                  className="focus-ring flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <span className="min-w-0 flex-1">
                    <span className="text-eyebrow text-secondary">{item.topic}</span>
                    <span className="mt-2 block font-display text-lg font-medium text-foreground">
                      {item.question}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface/60 text-primary transition-transform duration-300",
                      isOpen && "rotate-180 border-primary/40 bg-primary/10",
                    )}
                    aria-hidden
                  >
                    <ChevronDown className="size-4 stroke-[2]" />
                  </span>
                </button>
                {isOpen ? (
                  <div className="border-t border-border/80 px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="max-w-3xl pt-4 text-sm leading-relaxed text-muted sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div role="tabpanel">
        <GlassCard variant="strong" glow="soft" className="p-6 sm:p-8">
          <p className="text-eyebrow text-primary">Support ticket</p>
          <h2 className="mt-2 font-display text-xl text-foreground">
            Request help from client success
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            This form is a placeholder for your ticketing integration (Zendesk,
            Intercom, or Linear). Submissions are not sent until connected.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-lg border border-primary/30 bg-primary/10 px-5 py-6">
              <p className="text-sm font-medium text-foreground">
                Ticket placeholder received
              </p>
              <p className="mt-2 text-sm text-muted">
                Wire this form to your support API to create real tickets. For
                urgent issues, email your strategist directly.
              </p>
              <Button
                type="button"
                variant="ghost"
                className="mt-4"
                onClick={() => setSubmitted(false)}
              >
                Submit another
              </Button>
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleTicketSubmit}>
              <Field label="Subject" id="ticket-subject" required />
              <div>
                <label htmlFor="ticket-priority" className="text-eyebrow text-muted">
                  Priority
                </label>
                <select
                  id="ticket-priority"
                  name="priority"
                  className="focus-ring mt-2 w-full rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm text-foreground"
                  defaultValue="normal"
                >
                  <option value="low">Low — general question</option>
                  <option value="normal">Normal — needs response this week</option>
                  <option value="high">High — blocking delivery</option>
                </select>
              </div>
              <div>
                <label htmlFor="ticket-message" className="text-eyebrow text-muted">
                  Message
                </label>
                <textarea
                  id="ticket-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe your issue, deliverable link, or deadline…"
                  className="focus-ring mt-2 w-full resize-y rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm text-foreground placeholder:text-subtle"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Submit ticket (placeholder)
              </Button>
            </form>
          )}
        </GlassCard>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
        active
          ? "border-primary/50 bg-primary/15 text-foreground shadow-glow-soft"
          : "border-border bg-surface/40 text-muted hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function Field({
  label,
  id,
  required,
}: {
  label: string;
  id: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-eyebrow text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        required={required}
        className="focus-ring mt-2 w-full rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm text-foreground"
      />
    </div>
  );
}
