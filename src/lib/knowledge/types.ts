export const KNOWLEDGE_CATEGORIES = [
  "LinkedIn Growth",
  "Personal Branding",
  "AI Content",
  "Content Strategy",
] as const;

export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number];

export type KnowledgeCategoryFilter = KnowledgeCategory | "all";

export type KnowledgeArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: KnowledgeCategory;
  readMinutes: number;
  tags: string[];
  updatedAt: string;
  body: string[];
};
