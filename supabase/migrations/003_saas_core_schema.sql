-- Stage E (Phases 41–42): AI SaaS core — generations, favorites, subscriptions, usage_tracking
-- Run via Supabase CLI (`supabase db push`) or paste into the SQL Editor.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE public.subscription_plan AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE public.subscription_status AS ENUM (
  'active',
  'canceled',
  'past_due',
  'trialing',
  'inactive'
);
CREATE TYPE public.generation_tool AS ENUM (
  'linkedin_post',
  'twitter_post',
  'bio',
  'headline',
  'other'
);

-- ---------------------------------------------------------------------------
-- Generations (AI outputs)
-- ---------------------------------------------------------------------------
CREATE TABLE public.generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
  tool_type public.generation_tool NOT NULL DEFAULT 'linkedin_post',
  title TEXT,
  prompt TEXT NOT NULL,
  output TEXT NOT NULL,
  model TEXT,
  platform public.platform_type,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX generations_user_id_idx ON public.generations (user_id);
CREATE INDEX generations_created_at_idx ON public.generations (created_at DESC);
CREATE INDEX generations_tool_type_idx ON public.generations (tool_type);

COMMENT ON TABLE public.generations IS 'User AI generation history across tools and models.';

-- ---------------------------------------------------------------------------
-- Favorites (saved generations)
-- ---------------------------------------------------------------------------
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
  generation_id UUID NOT NULL REFERENCES public.generations (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT favorites_user_generation_unique UNIQUE (user_id, generation_id)
);

CREATE INDEX favorites_user_id_idx ON public.favorites (user_id);

COMMENT ON TABLE public.favorites IS 'User-starred generations for quick access.';

-- ---------------------------------------------------------------------------
-- Subscriptions
-- ---------------------------------------------------------------------------
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
  plan public.subscription_plan NOT NULL DEFAULT 'free',
  status public.subscription_status NOT NULL DEFAULT 'inactive',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT subscriptions_user_id_unique UNIQUE (user_id)
);

CREATE INDEX subscriptions_status_idx ON public.subscriptions (status);

COMMENT ON TABLE public.subscriptions IS 'Per-user billing plan and Stripe linkage.';

-- ---------------------------------------------------------------------------
-- Usage tracking
-- ---------------------------------------------------------------------------
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  model TEXT,
  tokens_used INTEGER,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX usage_tracking_user_id_idx ON public.usage_tracking (user_id);
CREATE INDEX usage_tracking_created_at_idx ON public.usage_tracking (created_at DESC);

COMMENT ON TABLE public.usage_tracking IS 'Metered AI and feature usage per user.';

-- ---------------------------------------------------------------------------
-- Default subscription on signup
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_profile_created_subscription
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_subscription();

-- ---------------------------------------------------------------------------
-- Updated-at on subscriptions
-- ---------------------------------------------------------------------------
CREATE TRIGGER subscriptions_set_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- Generations
CREATE POLICY "Users can view own generations"
  ON public.generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON public.generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generations"
  ON public.generations FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own generations"
  ON public.generations FOR DELETE
  USING (auth.uid() = user_id);

-- Favorites
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Subscriptions: read own only (writes via service role / webhooks)
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Usage: read own; insert own (API also uses service role for server writes)
CREATE POLICY "Users can view own usage"
  ON public.usage_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage"
  ON public.usage_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);
