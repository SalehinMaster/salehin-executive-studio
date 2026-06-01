import type { ClientPortalState } from "@/lib/client-portal/types";

/** Seed data for client dashboard — replace with Supabase when backend ships */
export function createDefaultClientPortalState(
  displayName = "Client",
): ClientPortalState {
  return {
    onboardingSteps: [
      {
        id: "profile",
        title: "Complete your profile",
        description: "Confirm contact details and LinkedIn URL for the team.",
        completed: true,
      },
      {
        id: "brand_voice",
        title: "Brand voice questionnaire",
        description: "Share tone samples, phrases to use or avoid, and proof points.",
        completed: false,
      },
      {
        id: "access",
        title: "Grant platform access",
        description: "Invite your strategist to LinkedIn analytics and asset folders.",
        completed: false,
      },
      {
        id: "kickoff",
        title: "Schedule kickoff call",
        description: "60-minute strategy session to lock pillars and publishing cadence.",
        completed: false,
      },
    ],
    project: {
      engagementName: "Authority Partnership",
      startDate: new Date().toISOString().slice(0, 10),
      primaryContact: displayName,
      strategist: "Salehin Executive Studio",
      status: "onboarding",
      services: [
        "LinkedIn Ghostwriting",
        "Personal Branding",
        "AI Content Systems",
        "Carousel Design",
      ],
    },
    goals: [
      {
        id: "g1",
        title: "Profile authority lift",
        target: "12K monthly impressions",
        progress: 35,
        dueDate: "2026-08-01",
      },
      {
        id: "g2",
        title: "Inbound pipeline",
        target: "20 qualified DMs / month",
        progress: 20,
        dueDate: "2026-09-01",
      },
      {
        id: "g3",
        title: "Publishing cadence",
        target: "3× weekly posts live",
        progress: 60,
        dueDate: "2026-07-15",
      },
    ],
    preferences: [
      { id: "p1", label: "Tone", value: "Confident, direct, executive — no hype" },
      { id: "p2", label: "Topics", value: "Leadership, fintech, AI ops, founder lessons" },
      { id: "p3", label: "Avoid", value: "Politics, competitor bashing, engagement bait" },
      { id: "p4", label: "CTA style", value: "Soft invite to DM or book — never hard sell" },
      { id: "p5", label: "Posting window", value: "Tue / Thu 8:00 AM ET" },
    ],
    resources: [
      {
        id: "r1",
        name: "Brand-guidelines.pdf",
        type: "PDF",
        sizeLabel: "2.4 MB",
        uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: "r2",
        name: "Headshot-executive.jpg",
        type: "Image",
        sizeLabel: "1.1 MB",
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    deliverables: [
      {
        id: "d1",
        title: "Authority narrative — v2",
        type: "Strategy doc",
        status: "in_review",
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        preview: "Repositioning around category leadership in AI-enabled operations…",
      },
      {
        id: "d2",
        title: "LinkedIn carousel — Q2 themes",
        type: "Carousel",
        status: "approved",
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "d3",
        title: "Week 24 post batch",
        type: "Ghostwriting",
        status: "draft",
        updatedAt: new Date().toISOString(),
      },
    ],
    queue: [
      {
        id: "q1",
        title: "The hidden cost of inconsistent posting",
        format: "LinkedIn post",
        scheduledFor: "2026-06-03T12:00:00Z",
        status: "awaiting_approval",
      },
      {
        id: "q2",
        title: "5-slide: AI content OS blueprint",
        format: "Carousel",
        scheduledFor: "2026-06-05T12:00:00Z",
        status: "in_production",
      },
      {
        id: "q3",
        title: "Founder story — origin narrative",
        format: "LinkedIn post",
        scheduledFor: "2026-06-07T12:00:00Z",
        status: "scheduled",
      },
    ],
    reports: [
      {
        id: "rep1",
        period: "May 2026",
        summary:
          "Strong lift in profile visits and save rate on carousel content. Next focus: comment depth and DM conversion.",
        metrics: [
          { id: "m1", label: "Impressions", value: "48.2K", change: "+34%", trend: "up" },
          { id: "m2", label: "Engagement rate", value: "4.8%", change: "+1.2pp", trend: "up" },
          { id: "m3", label: "Profile views", value: "2,840", change: "+22%", trend: "up" },
          { id: "m4", label: "Inbound DMs", value: "11", change: "+3", trend: "up" },
        ],
      },
      {
        id: "rep2",
        period: "April 2026",
        summary:
          "Onboarding month — baseline established. Cadence ramping to 3× weekly in May.",
        metrics: [
          { id: "m5", label: "Impressions", value: "31.5K", change: "Baseline", trend: "neutral" },
          { id: "m6", label: "Engagement rate", value: "3.6%", change: "—", trend: "neutral" },
          { id: "m7", label: "Profile views", value: "2,310", change: "—", trend: "neutral" },
          { id: "m8", label: "Inbound DMs", value: "8", change: "—", trend: "neutral" },
        ],
      },
    ],
  };
}
