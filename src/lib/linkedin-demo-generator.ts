import type { LinkedInPostPreview } from "@/types/linkedin-post";

export const demoSuggestions = [
  "AI content systems for founders",
  "B2B pipeline on LinkedIn",
  "Executive personal branding",
] as const;

export const initialLinkedInPreview: LinkedInPostPreview = {
  hook:
    "Most founders are still writing LinkedIn posts manually in 2026.\n\nThat's a $50K/year mistake.",
  body:
    "The leaders winning inbound aren't \"more creative.\"\n\nThey run content like infrastructure:\n→ Voice-calibrated AI pipelines\n→ Proof-led narratives\n→ Consistent authority cadence\n\nWhen your expertise compounds in public, buyers arrive pre-sold.\n\nYou don't need more hours. You need a system that ships while you build.",
  cta: "Want the exact workflow we install for CEOs?\n\nComment SYSTEM — I'll send the blueprint.",
  hashtags: [
    "#PersonalBranding",
    "#Founders",
    "#AIContent",
    "#LinkedInGrowth",
    "#ExecutivePresence",
  ],
};

export function serializePostContent(post: LinkedInPostPreview): string {
  return JSON.stringify(post);
}
