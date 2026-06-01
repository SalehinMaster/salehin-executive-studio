import { createClient } from "@/utils/supabase/server";
import { isCrmAdminEmail } from "@/lib/crm/admin";

export async function requireCrmAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, status: 401, error: "Authentication required." };
  }

  if (!isCrmAdminEmail(user.email)) {
    return { ok: false as const, status: 403, error: "CRM access denied." };
  }

  return { ok: true as const, user };
}
