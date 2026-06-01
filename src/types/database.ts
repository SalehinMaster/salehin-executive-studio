export type UserTier = "free" | "premium";

export type Platform = "linkedin" | "twitter" | "instagram";

export type LeadPipelineStage =
  | "new_lead"
  | "qualified_lead"
  | "discovery_call"
  | "proposal_sent"
  | "client_won"
  | "client_lost";

export type FunnelStep =
  | "homepage"
  | "lead_magnet"
  | "calendly_booking"
  | "discovery_call"
  | "proposal"
  | "client";

export type LeadSource =
  | "lead_magnet"
  | "newsletter"
  | "calendly"
  | "intake_form"
  | "manual"
  | "other";

export type BudgetRange =
  | "under_2500"
  | "2500_5000"
  | "5000_10000"
  | "over_10000"
  | "not_sure"
  | "custom";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          tier: UserTier;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          tier?: UserTier;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          tier?: UserTier;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts_history: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          generated_content: string;
          platform: Platform;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          generated_content: string;
          platform?: Platform;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic?: string;
          generated_content?: string;
          platform?: Platform;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_history_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      crm_leads: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          company: string | null;
          linkedin_url: string | null;
          website: string | null;
          phone: string | null;
          stage: LeadPipelineStage;
          source: LeadSource;
          business_goals: string | null;
          current_challenges: string | null;
          budget_range: BudgetRange | null;
          notes: string | null;
          metadata: Json;
          last_contacted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email?: string | null;
          company?: string | null;
          linkedin_url?: string | null;
          website?: string | null;
          phone?: string | null;
          stage?: LeadPipelineStage;
          source?: LeadSource;
          business_goals?: string | null;
          current_challenges?: string | null;
          budget_range?: BudgetRange | null;
          notes?: string | null;
          metadata?: Json;
          last_contacted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string | null;
          company?: string | null;
          linkedin_url?: string | null;
          website?: string | null;
          phone?: string | null;
          stage?: LeadPipelineStage;
          source?: LeadSource;
          business_goals?: string | null;
          current_challenges?: string | null;
          budget_range?: BudgetRange | null;
          notes?: string | null;
          metadata?: Json;
          last_contacted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      funnel_events: {
        Row: {
          id: string;
          step: FunnelStep;
          session_id: string | null;
          lead_id: string | null;
          page_path: string | null;
          referrer: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          step: FunnelStep;
          session_id?: string | null;
          lead_id?: string | null;
          page_path?: string | null;
          referrer?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          step?: FunnelStep;
          session_id?: string | null;
          lead_id?: string | null;
          page_path?: string | null;
          referrer?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "funnel_events_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "crm_leads";
            referencedColumns: ["id"];
          },
        ];
      };
      client_intake_submissions: {
        Row: {
          id: string;
          full_name: string;
          company: string;
          linkedin_url: string | null;
          website: string | null;
          business_goals: string;
          current_challenges: string;
          budget_range: BudgetRange;
          lead_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          company: string;
          linkedin_url?: string | null;
          website?: string | null;
          business_goals: string;
          current_challenges: string;
          budget_range: BudgetRange;
          lead_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          company?: string;
          linkedin_url?: string | null;
          website?: string | null;
          business_goals?: string;
          current_challenges?: string;
          budget_range?: BudgetRange;
          lead_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "client_intake_submissions_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "crm_leads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_tier: UserTier;
      platform_type: Platform;
      lead_pipeline_stage: LeadPipelineStage;
      funnel_step: FunnelStep;
      lead_source: LeadSource;
      budget_range: BudgetRange;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type UserProfile = Database["public"]["Tables"]["users"]["Row"];
export type PostHistory = Database["public"]["Tables"]["posts_history"]["Row"];
