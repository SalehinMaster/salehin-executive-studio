-- Stage E (Phases 54–55): Private beta — waitlist, feedback, bug reports

CREATE TABLE public.beta_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  source TEXT NOT NULL DEFAULT 'dashboard',
  user_id UUID REFERENCES public.users (id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT beta_waitlist_email_unique UNIQUE (email)
);

CREATE INDEX beta_waitlist_created_at_idx ON public.beta_waitlist (created_at DESC);

CREATE TABLE public.beta_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users (id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX beta_feedback_user_id_idx ON public.beta_feedback (user_id);

CREATE TABLE public.beta_bug_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users (id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX beta_bug_reports_user_id_idx ON public.beta_bug_reports (user_id);
CREATE INDEX beta_bug_reports_status_idx ON public.beta_bug_reports (status);

COMMENT ON TABLE public.beta_waitlist IS 'Private beta waitlist signups.';
COMMENT ON TABLE public.beta_feedback IS 'In-app beta feedback from studio users.';
COMMENT ON TABLE public.beta_bug_reports IS 'User-reported bugs during private beta.';

ALTER TABLE public.beta_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_bug_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON public.beta_waitlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own waitlist entry"
  ON public.beta_waitlist FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own feedback"
  ON public.beta_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view own feedback"
  ON public.beta_feedback FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bug reports"
  ON public.beta_bug_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view own bug reports"
  ON public.beta_bug_reports FOR SELECT
  USING (auth.uid() = user_id);
