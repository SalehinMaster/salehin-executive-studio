import type { LinkedInPostPreview } from "@/types/linkedin-post";
import { serializePostContent } from "@/lib/linkedin-demo-generator";
import { createClient } from "@/utils/supabase/client";

export async function savePostToHistory(
  userId: string,
  topic: string,
  post: LinkedInPostPreview,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const supabase = createClient();

  const { error } = await supabase.from("posts_history").insert({
    user_id: userId,
    topic,
    generated_content: serializePostContent(post),
    platform: "linkedin",
  });

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return { ok: true };
}
