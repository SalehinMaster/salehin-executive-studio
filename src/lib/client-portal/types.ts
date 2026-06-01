/** Phases 35–36 — Client onboarding portal & dashboard types */

export type ClientPortalSectionId =
  | "welcome"
  | "project"
  | "goals"
  | "preferences"
  | "resources"
  | "deliverables"
  | "queue"
  | "reports";

export type OnboardingStepId =
  | "profile"
  | "brand_voice"
  | "access"
  | "kickoff";

export type DeliverableStatus = "draft" | "in_review" | "approved" | "published";

export type ContentQueueStatus =
  | "scheduled"
  | "in_production"
  | "awaiting_approval"
  | "ready";

export interface ClientPortalNavItem {
  id: ClientPortalSectionId;
  label: string;
  description: string;
}

export interface OnboardingStep {
  id: OnboardingStepId;
  title: string;
  description: string;
  completed: boolean;
}

export interface ProjectDetails {
  engagementName: string;
  startDate: string;
  primaryContact: string;
  strategist: string;
  status: "onboarding" | "active" | "optimization";
  services: readonly string[];
}

export interface ClientGoal {
  id: string;
  title: string;
  target: string;
  progress: number;
  dueDate: string;
}

export interface ContentPreference {
  id: string;
  label: string;
  value: string;
}

export interface ResourceFile {
  id: string;
  name: string;
  type: string;
  sizeLabel: string;
  uploadedAt: string;
}

export interface DeliverableItem {
  id: string;
  title: string;
  type: string;
  status: DeliverableStatus;
  updatedAt: string;
  preview?: string;
}

export interface ContentQueueItem {
  id: string;
  title: string;
  format: string;
  scheduledFor: string;
  status: ContentQueueStatus;
}

export interface PerformanceMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface PerformanceReport {
  id: string;
  period: string;
  summary: string;
  metrics: readonly PerformanceMetric[];
}

export interface ClientPortalState {
  onboardingSteps: OnboardingStep[];
  project: ProjectDetails;
  goals: ClientGoal[];
  preferences: ContentPreference[];
  resources: ResourceFile[];
  deliverables: DeliverableItem[];
  queue: ContentQueueItem[];
  reports: PerformanceReport[];
}
