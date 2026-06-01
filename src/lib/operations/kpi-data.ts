export type KpiTimeSeries = {
  label: string;
  values: number[];
};

export type ExecutiveKpiSnapshot = {
  periodLabel: string;
  monthlyLeads: KpiTimeSeries;
  bookedCalls: KpiTimeSeries;
  conversionRate: KpiTimeSeries;
  revenue: KpiTimeSeries;
  clientRetention: number;
  tasksOpen: number;
  tasksCompleted: number;
  trafficGrowth: KpiTimeSeries;
  summary: {
    monthlyLeads: number;
    monthlyLeadsDelta: number;
    bookedCalls: number;
    bookedCallsDelta: number;
    conversionRate: number;
    conversionRateDelta: number;
    revenue: number;
    revenueDelta: number;
    clientRetention: number;
    clientRetentionDelta: number;
    tasksCompletionRate: number;
    trafficGrowth: number;
    trafficGrowthDelta: number;
  };
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as const;

/** Deterministic executive metrics — wire to CRM/analytics when live. */
export function getExecutiveKpiSnapshot(): ExecutiveKpiSnapshot {
  const monthlyLeads = [42, 48, 51, 57, 63, 71];
  const bookedCalls = [18, 20, 22, 24, 27, 31];
  const conversionRate = [28, 29, 31, 32, 34, 36];
  const revenue = [82, 88, 91, 96, 104, 112];
  const trafficGrowth = [12, 14, 15, 17, 19, 22];

  const tasksOpen = 14;
  const tasksCompleted = 47;
  const tasksTotal = tasksOpen + tasksCompleted;
  const clientRetention = 94;

  return {
    periodLabel: "H1 2026",
    monthlyLeads: { label: "Monthly leads", values: monthlyLeads },
    bookedCalls: { label: "Booked calls", values: bookedCalls },
    conversionRate: { label: "Conversion rate (%)", values: conversionRate },
    revenue: { label: "Revenue ($k)", values: revenue },
    clientRetention,
    tasksOpen,
    tasksCompleted,
    trafficGrowth: { label: "Traffic growth (%)", values: trafficGrowth },
    summary: {
      monthlyLeads: monthlyLeads[monthlyLeads.length - 1]!,
      monthlyLeadsDelta: 12.7,
      bookedCalls: bookedCalls[bookedCalls.length - 1]!,
      bookedCallsDelta: 14.8,
      conversionRate: conversionRate[conversionRate.length - 1]!,
      conversionRateDelta: 2.1,
      revenue: revenue[revenue.length - 1]!,
      revenueDelta: 7.7,
      clientRetention,
      clientRetentionDelta: 1.2,
      tasksCompletionRate: Math.round((tasksCompleted / tasksTotal) * 100),
      trafficGrowth: trafficGrowth[trafficGrowth.length - 1]!,
      trafficGrowthDelta: 15.8,
    },
  };
}

export function getKpiMonthLabels(): readonly string[] {
  return MONTH_LABELS;
}

export type OperationsQuickLink = {
  href: string;
  title: string;
  description: string;
  badge?: string;
};

export const operationsQuickLinks: OperationsQuickLink[] = [
  {
    href: "/operations/kpi",
    title: "Executive KPI Dashboard",
    description:
      "Monthly leads, revenue, retention, and traffic — interactive charts for leadership reviews.",
    badge: "Analytics",
  },
  {
    href: "/knowledge",
    title: "Knowledge base",
    description:
      "Playbooks across LinkedIn growth, branding, AI content, and strategy — searchable and categorized.",
  },
  {
    href: "/support",
    title: "Support center",
    description: "FAQs, ticket intake placeholder, and client success routing.",
  },
  {
    href: "/crm",
    title: "CRM pipeline",
    description: "Lead stages, intake, and funnel analytics.",
  },
  {
    href: "/proposal",
    title: "Proposal generator",
    description: "Executive-grade proposals with live pricing blocks.",
  },
];
