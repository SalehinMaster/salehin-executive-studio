import { redirect } from "next/navigation";
import { AUTH_ROUTES, sanitizeRedirectPath } from "@/lib/auth/paths";
import { createClient } from "@/utils/supabase/server";
import type { UserProfile } from "@/types/database";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

export async function requireSessionUser(nextPath?: string) {
  const { supabase, user } = await getSessionUser();

  if (!user) {
    const next = sanitizeRedirectPath(nextPath);
    redirect(`${AUTH_ROUTES.login}?next=${encodeURIComponent(next)}`);
  }

  return { supabase, user };
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("users").select("*").eq("id", userId).single();
  return data as UserProfile | null;
}
