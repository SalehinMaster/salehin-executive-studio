-- Stage D (Phases 31–33): CRM, sales funnel, and client intake
-- Run via Supabase CLI (`supabase db push`) or paste into the SQL Editor.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE public.lead_pipeline_stage AS ENUM (
  'new_lead',
  'qualified_lead',
  'discovery_call',
  'proposal_sent',
  'client_won',
  'client_lost'
);

CREATE TYPE public.funnel_step AS ENUM (
  'homepage',
  'lead_magnet',
  'calendly_booking',
  'discovery_call',
  'proposal',
  'client'
);

CREATE TYPE public.lead_source AS ENUM (
  'lead_magnet',
  'newsletter',
  'calendly',
  'intake_form',
  'manual',
  'other'
);

CREATE TYPE public.budget_range AS ENUM (
  'under_2500',
  '2500_5000',
  '5000_10000',
  'over_10000',
  'not_sure',
  'custom'
);

-- ---------------------------------------------------------------------------
-- CRM leads
-- ---------------------------------------------------------------------------
CREATE TABLE public.crm_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  linkedin_url TEXT,
  website TEXT,
  phone TEXT,
  stage public.lead_pipeline_stage NOT NULL DEFAULT 'new_lead',
  source public.lead_source NOT NULL DEFAULT 'manual',
  business_goals TEXT,
  current_challenges TEXT,
  budget_range public.budget_range,
  notes TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX crm_leads_stage_idx ON public.crm_leads (stage);
CREATE INDEX crm_leads_email_idx ON public.crm_leads (email);
CREATE INDEX crm_leads_created_at_idx ON public.crm_leads (created_at DESC);

COMMENT ON TABLE public.crm_leads IS 'Sales pipeline leads for executive studio CRM.';

-- ---------------------------------------------------------------------------
-- Funnel analytics events
-- ---------------------------------------------------------------------------
CREATE TABLE public.funnel_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step public.funnel_step NOT NULL,
  session_id TEXT,
  lead_id UUID REFERENCES public.crm_leads (id) ON DELETE SET NULL,
  page_path TEXT,
  referrer TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX funnel_events_step_idx ON public.funnel_events (step);
CREATE INDEX funnel_events_created_at_idx ON public.funnel_events (created_at DESC);
CREATE INDEX funnel_events_session_id_idx ON public.funnel_events (session_id);

COMMENT ON TABLE public.funnel_events IS 'Conversion funnel touchpoints for sales flow analytics.';

-- ---------------------------------------------------------------------------
-- Client intake submissions
-- ---------------------------------------------------------------------------
CREATE TABLE public.client_intake_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  linkedin_url TEXT,
  website TEXT,
  business_goals TEXT NOT NULL,
  current_challenges TEXT NOT NULL,
  budget_range public.budget_range NOT NULL,
  lead_id UUID REFERENCES public.crm_leads (id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX client_intake_created_at_idx ON public.client_intake_submissions (created_at DESC);

COMMENT ON TABLE public.client_intake_submissions IS 'Premium onboarding form submissions from prospective clients.';

-- ---------------------------------------------------------------------------
-- Updated-at triggers
-- ---------------------------------------------------------------------------
CREATE TRIGGER crm_leads_set_updated_at
  BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security (server / service role access via API)
-- ---------------------------------------------------------------------------
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_intake_submissions ENABLE ROW LEVEL SECURITY;
