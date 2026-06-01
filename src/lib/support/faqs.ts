export type SupportFaq = {
  id: string;
  question: string;
  answer: string;
  topic: "Account" | "Billing" | "Delivery" | "Technical";
};

export const supportFaqs: SupportFaq[] = [
  {
    id: "account-access",
    question: "How do I access the client portal and content studio?",
    answer:
      "Sign in from the site header, then open Dashboard for AI generation history or Client Portal for deliverables, onboarding, and your content queue. Use the same email you used at intake.",
    topic: "Account",
  },
  {
    id: "billing-invoice",
    question: "Where can I find invoices and billing questions?",
    answer:
      "Invoices are issued monthly per your engagement letter. For billing adjustments or payment method updates, reference your client success contact or submit a ticket below — our team responds within one business day.",
    topic: "Billing",
  },
  {
    id: "delivery-timeline",
    question: "What is the typical delivery timeline for content?",
    answer:
      "Professional and Executive tiers receive weekly content batches with 48-hour revision windows. Rush requests can be flagged in your portal queue; availability depends on strategist capacity.",
    topic: "Delivery",
  },
  {
    id: "revision-rounds",
    question: "How many revision rounds are included?",
    answer:
      "Each deliverable includes two structured revision rounds. Additional rounds may be scoped as a change request — your strategist will confirm before work begins.",
    topic: "Delivery",
  },
  {
    id: "linkedin-access",
    question: "Do you need my LinkedIn login?",
    answer:
      "No. We operate with draft-and-approve workflows or scheduling tools you authorize. Never share passwords; use official LinkedIn publishing permissions only.",
    topic: "Technical",
  },
  {
    id: "ai-data",
    question: "How is my data used in AI workflows?",
    answer:
      "Your voice guides, transcripts, and brand assets stay in your engagement workspace. We do not train public models on your proprietary materials without written consent.",
    topic: "Technical",
  },
];
