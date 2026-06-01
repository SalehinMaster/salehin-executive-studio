"use client";

import { Bug, MessageSquare } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BetaWaitlistBanner } from "@/components/saas/beta/beta-waitlist-banner";
import { BugReportPanel } from "@/components/saas/beta/bug-report-panel";
import { FeedbackModal } from "@/components/saas/beta/feedback-modal";
import { OnboardingWalkthrough } from "@/components/saas/beta/onboarding-walkthrough";
import { Button } from "@/components/ui/button";

type SaasDashboardChromeProps = {
  userEmail?: string | null;
  showBetaBanner?: boolean;
  children: ReactNode;
};

export function SaasDashboardChrome({
  userEmail,
  showBetaBanner = true,
  children,
}: SaasDashboardChromeProps) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [bugsOpen, setBugsOpen] = useState(false);

  return (
    <>
      <div className="mb-6 space-y-4">
        {showBetaBanner ? <BetaWaitlistBanner userEmail={userEmail} /> : null}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            className="gap-2 text-xs"
            data-onboarding="beta-feedback"
            onClick={() => setFeedbackOpen(true)}
          >
            <MessageSquare className="size-3.5" aria-hidden />
            Send feedback
          </Button>
          <Button
            variant="ghost"
            className="gap-2 text-xs"
            onClick={() => setBugsOpen((v) => !v)}
          >
            <Bug className="size-3.5" aria-hidden />
            {bugsOpen ? "Hide bugs" : "Report a bug"}
          </Button>
        </div>
        {bugsOpen ? <BugReportPanel embedded /> : null}
      </div>
      {children}
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <OnboardingWalkthrough />
    </>
  );
}
