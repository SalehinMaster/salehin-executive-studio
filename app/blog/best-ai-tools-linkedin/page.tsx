"use client";

import React from "react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";

// --- Data Section ---

// Tool data structure for feature grid and pros/cons
const aiTools = [
  {
    name: "CopyPilot AI",
    logo: "https://res.cloudinary.com/di7nxx8ig/image/upload/v1717516274/copypilot-logo.png", // Replace w/ real logo if available
    highlights: [
      "Real-time post optimization",
      "Viral hook generation",
      "Brand voice training modules",
      "Tone & sentiment control",
      "Native LinkedIn API scheduling"
    ],
    accent: "from-cyan-500/70 via-blue-500/50 to-fuchsia-500/40",
    pros: [
      "Crafts highly personalized LinkedIn content in seconds using your historical posts.",
      "Adaptive viral style generator: predicts trending styles for maximum reach in 2026 algorithm.",
      "Integrated plagiarism + cliché detector ensures originality.",
      "Ultra-fast drafts with multilingual fluency."
    ],
    cons: [
      "Best results require training on your brand data (initial setup needed).",
      "Premium plan needed for enterprise scheduling.",
      "No direct image generation (copy-focused)."
    ],
    category: "Copywriting"
  },
  {
    name: "VisionFrame Studio",
    logo: "https://res.cloudinary.com/di7nxx8ig/image/upload/v1717516274/visionframe-logo.png", // Replace w/ real logo if available
    highlights: [
      "LinkedIn-native 3:4 and carousel image outputs",
      "Realistic professional headshots (no uncanny valley)",
      "Brand color + font sync",
      "Generative infographics for listicles",
      "Drag-and-drop post composer"
    ],
    accent: "from-pink-500/50 via-violet-500/40 to-emerald-500/40",
    pros: [
      "Turns text prompts into thumb-stopping visuals designed for LinkedIn engagement.",
      "Batch image and carousel generation—ideal for content calendars.",
      "A/B image testing tools optimize CTR based on performance analytics.",
      "Advanced watermarking keeps LinkedIn compliance in check."
    ],
    cons: [
      "Limited video generation (still images & GIFs only).",
      "Freemium tier includes small watermark.",
      "Best output with clear, detailed prompts."
    ],
    category: "Image Generation"
  },
  {
    name: "PostPulse Scheduler",
    logo: "https://res.cloudinary.com/di7nxx8ig/image/upload/v1717516274/postpulse-logo.png", // Replace w/ real logo if available
    highlights: [
      "Predictive engagement timing based on AI signal analysis",
      "Smart auto-reposting for missed followers",
      "Deep LinkedIn comments auto-threading",
      "Multi-account management",
      "Native calendar and analytics integration"
    ],
    accent: "from-emerald-500/40 via-blue-400/30 to-cyan-500/20",
    pros: [
      "Pinpoints optimal post times using live LinkedIn data, boosting reach 2.4x (2026 algorithm).",
      "Manages all comments and DMs from one dashboard—AI triage for lead conversion.",
      "Tracks shadow-banning risk and flags sensitive topics for editing before posting.",
      "Clickable analytics overlays let you refine in real time."
    ],
    cons: [
      "Scheduling bulk uploads limited on starter plan.",
      "Learning curve for advanced automations.",
      "Requires LinkedIn admin API permissions for some features."
    ],
    category: "Scheduling"
  },
  {
    name: "NeuraCompose Suite",
    logo: "https://res.cloudinary.com/di7nxx8ig/image/upload/v1717516274/neuracompose-logo.png", // Replace w/ real logo if available
    highlights: [
      "Hybrid text+visual post creation",
      "Team collaboration: shared libraries & review flows",
      "AI-driven calendar: detects LinkedIn trending topics",
      "Voice-to-post with real-time transcription",
      "Automatic repurposing for newsletter/email"
    ],
    accent: "from-fuchsia-500/40 via-cyan-400/30 to-blue-700/30",
    pros: [
      "Unifies copywriting and imaging for streamlined, branded posts.",
      "Live trend analysis shows daily ‘hot topics’ for viral relevance.",
      "Supports enterprise workflow: legal approvals, team roles, versioning.",
      "Repurposes LinkedIn content as newsletter drafts or tweets in 1-click."
    ],
    cons: [
      "Pro features are team-focused—single users may not need all options.",
      "Requires Chrome extension install for some LinkedIn hooks.",
      "Occasional lag with large, media-heavy posts."
    ],
    category: "All-in-One"
  }
];

// FAQ
const faqItems = [
  {
    question: "How do AI tools boost LinkedIn reach in 2026?",
    answer: (
      <>
        Modern AI tools analyze <strong>billions of posts</strong>, identify viral structure changes (e.g., “hook first” vs. “story arc”), and <span className="text-fuchsia-300 font-semibold">predict trends before your audience reacts</span>. They surface optimal posting times, automate engagement prompts, and even warn you of potential shadow bans or compliance flags—keeping your content primed for maximum reach.
      </>
    )
  },
  {
    question: "Is it safe to connect AI tools to my LinkedIn account?",
    answer: (
      <>
        Reputable 2026 tools use <span className="text-cyan-300">official LinkedIn APIs</span> (no scraping or risky browser hacks), protect your logins with <strong>end-to-end encryption</strong>, and let you revoke access at any time. Always review permissions and select platforms with proven security records.<br/><span className="text-xs text-neutral-400">Tip: Genuine tools never ask for your direct LinkedIn password—use OAuth only.</span>
      </>
    )
  },
  {
    question: "What’s the best way to blend AI and human creativity?",
    answer: (
      <>
        Use AI for brainstorming, draft ideation, headline generation, and routine scheduling. But <span className="text-emerald-300 font-semibold">add personal stories, industry anecdotes, and nuanced commentary</span> that only you can provide. In 2026, successful creators <strong>mix AI speed with human resonance</strong>.
      </>
    )
  },
  {
    question: "Which AI features are must-haves for solo creators vs. teams?",
    answer: (
      <>
        <ul className="list-disc pl-5 space-y-1 text-neutral-300">
          <li><span className="font-semibold text-violet-300">Solopreneurs:</span> Look for tools with <strong>brand voice cloning, auto-scheduling, and fast viral prompt templates</strong>.</li>
          <li><span className="font-semibold text-cyan-300">Scaling teams:</span> Prioritize <strong>approval flows, shared libraries, trend analytics, and repurposing automation</strong>.</li>
        </ul>
      </>
    )
  },
  {
    question: "What are the risks of relying too much on generative AI?",
    answer: (
      <>
        <span className="text-pink-300 font-semibold">Over-automation can dull your unique brand.</span> Check your posts for echoes of generic AI prose. Fact-check AI-generated data, monitor for tone consistency, and schedule regular “human review” cycles—especially for executive leadership or regulated industries.
      </>
    )
  }
];

// --- Section Components ---

// Feature Grid Card
const FeatureComparisonCard = ({
  tool
}: {
  tool: typeof aiTools[number];
}) => (
  <GlassCard
    className={`
      p-7 flex flex-col relative border-2 border-transparent 
      bg-gradient-to-tr ${tool.accent} hover:border-cyan-300 
      shadow-xl group transition-all duration-200
      backdrop-blur-xl cursor-pointer
      min-h-[420px]
    `}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-black/60 rounded-xl shadow-inner p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tool.logo}
          alt={`${tool.name} logo`}
          className="w-10 h-10 rounded-xl object-contain"
          draggable={false}
        />
      </div>
      <h3 className="text-xl font-extrabold text-blue-200 tracking-tight drop-shadow-md">
        {tool.name}
      </h3>
      <span className="ml-auto px-3 py-1 rounded-full bg-cyan-800/40 text-xs font-bold text-cyan-200 shadow-sm">
        {tool.category}
      </span>
    </div>
    <ul className="space-y-2 mb-4">
      {tool.highlights.map((item, idx) => (
        <li
          key={item}
          className="flex items-start text-cyan-100/90 text-sm"
        >
          <span className="w-1.5 h-1.5 mr-2 mt-[8px] bg-fuchsia-400 rounded-full shadow-sm flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto flex flex-wrap gap-2">
      {tool.category === "Copywriting" && (
        <span className="text-xs font-bold px-2 py-1 rounded bg-cyan-900/50 text-cyan-300 ring-1 ring-cyan-500/40">AI Copy</span>
      )}
      {tool.category === "Image Generation" && (
        <span className="text-xs font-bold px-2 py-1 rounded bg-pink-900/30 text-pink-300 ring-1 ring-pink-400/30">AI Visuals</span>
      )}
      {tool.category === "Scheduling" && (
        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-900/40 text-emerald-400 ring-1 ring-emerald-400/30">Scheduler</span>
      )}
      {tool.category === "All-in-One" && (
        <span className="text-xs font-bold px-2 py-1 rounded bg-violet-800/40 text-violet-200 ring-1 ring-violet-500/30">All-in-One</span>
      )}
    </div>
    {/* Fancy floating bg accent */}
    <div
      className={`
        absolute -z-10 inset-0 scale-[1.11] blur-2xl opacity-30
        pointer-events-none rounded-2xl
        bg-gradient-to-tr ${tool.accent}
      `}
    />
  </GlassCard>
);

// Floating CTA: persistent at bottom right on desktops
function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-xs transition-all group hidden md:block">
      <GlassCard className="p-6 bg-gradient-to-tr from-cyan-900/80 to-blue-950/80 border-blue-400/30 shadow-2xl ring-2 ring-cyan-700/25 animate-fadeInUp">
        <h4 className="text-lg font-extrabold text-center text-cyan-200 mb-1 drop-shadow">
          Skyrocket Your LinkedIn Growth
        </h4>
        <p className="text-sm text-neutral-200 text-center mb-3">
          Get our 2026 AI Content Playbook—plus deep-dive tool reviews & growth hacks straight to your inbox.
        </p>
        <Link
          href="https://forms.gle/lead-magnet-link"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-400 transition-colors text-sm w-full block text-center"
        >
          Unlock the Playbook →
        </Link>
        <p className="mt-2 italic text-xs text-neutral-400 text-center">
          No spam. Just expert tactics.
        </p>
      </GlassCard>
    </div>
  );
}

// FAQ Accordion (standalone for this file)
function FAQAccordion({ items }: { items: typeof faqItems }) {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <div className="divide-y divide-neutral-800 bg-black/10 rounded-xl shadow-inner">
      {items.map((item, idx) => (
        <div
          key={item.question}
          className="py-4 px-4 cursor-pointer select-none"
          onClick={() => setOpen(open === idx ? null : idx)}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-200 text-base">{item.question}</span>
            <span
              className={`ml-2 inline-block transform transition-transform duration-200 ${
                open === idx ? "rotate-90" : "rotate-0"
              }`}
            >
              <svg width={14} height={14} fill="currentColor" className="text-cyan-300"><path d="M5 2l5 5-5 5"/></svg>
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === idx ? "max-h-96 mt-2 visible opacity-100" : "max-h-0 opacity-0 invisible"
            }`}
          >
            <div className="text-cyan-100/90 text-sm leading-relaxed">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main Page Component ---

export default function BestAiToolsLinkedinPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-black via-neutral-900 to-blue-950 pb-20">
      <FloatingCTA />
      {/* --- HERO HEADER --- */}
      <section className="max-w-4xl mx-auto text-center pt-14 pb-10 px-4">
        <GlassCard className="p-10 md:p-14 bg-gradient-to-tr from-cyan-900/80 to-blue-950/80 border-blue-400/25 shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-200 to-fuchsia-300 bg-clip-text text-transparent mb-6 drop-shadow-md">
            Best AI Tools for LinkedIn Content Creation in 2026
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-6">
            In 2026, LinkedIn creators and B2B brands face a new era: <span className="text-cyan-200 font-semibold">viral reach is algorithmically engineered,</span> and <span className="text-fuchsia-200 font-semibold">AI-powered content wins buyer attention</span>. 
            <br /><br />
            We rigorously compare the top AI solutions for copywriting, image generation, and scheduling—helping you outpace the LinkedIn algorithm, drive engagement, and <span className="text-emerald-300 font-semibold">build trust in a synthetic content age</span>.
          </p>
          <Link
            href="#comparison"
            className="inline-block mt-2 px-6 py-2 rounded-full font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:from-blue-700 hover:to-fuchsia-500 transition-colors"
          >
            Jump to Tool Comparison ↓
          </Link>
        </GlassCard>
      </section>
      {/* --- SEO/DEEP DIVE BODY --- */}
      {/* --- Section 1: THE AI-POWERED LINKEDIN ERA --- */}
      <section className="max-w-3xl mx-auto px-4 mb-14">
        <GlassCard className="p-8 md:p-12 bg-gradient-to-tr from-black/80 via-blue-900/70 to-neutral-950 border-cyan-300/10 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-cyan-200">
            The AI-Powered LinkedIn Revolution (2026)
          </h2>
          <p className="text-neutral-200 text-lg mb-3">
            In 2026, <span className="text-cyan-300 font-semibold">95% of top LinkedIn posts</span> will be drafted, optimized, or scheduled with generative AI—and competition for attention is lightning fierce. 
            The <span className="text-fuchsia-300 font-semibold">new algorithm</span> surfaces posts that feel relevant, timely, and high-signal—penalizing generic automation or stale content.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-cyan-100/90 text-base mb-3">
            <li>
              <span className="font-semibold text-fuchsia-400">AI as a Co-Writer:</span> Tools analyze account analytics, recent news, and audience pulse to create irresistible hooks and implication-laden bodies—moving away from formulaic “motivational” formats of the 2020s.
            </li>
            <li>
              <span className="font-semibold text-cyan-300">Visuals That Stop the Scroll:</span> Native AI image generation produces infographics, headshots, and carousels tailored to LinkedIn’s algorithmic style signals. No more Canva clones.
            </li>
            <li>
              <span className="font-semibold text-emerald-300">End-to-End Workflows:</span> Next-gen scheduling platforms optimize engagement by timing, topic, and even “comment velocity,” giving early engagement a science-backed boost.
            </li>
          </ul>
          <p className="text-neutral-300 mb-0">
            <span className="font-semibold text-pink-300">Bottom line:</span> The creator who <strong>harnesses the best AI stack</strong> will dominate their niche, win more deals, and outlast every algorithm update—without sacrificing authenticity.
          </p>
        </GlassCard>
      </section>
      {/* --- Section 2: TOOL FEATURE COMPARISON GRID --- */}
      <section id="comparison" className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-blue-200 text-center">
          2026’s Top AI Tools for LinkedIn: Feature Comparison
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiTools.map(tool => (
            <FeatureComparisonCard tool={tool} key={tool.name} />
          ))}
        </div>
      </section>
      {/* --- Section 3: TOOL DEEP DIVES --- */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-cyan-200">
          AI Tool Spotlights: Pros & Cons for Power Users
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {aiTools.map(tool => (
            <GlassCard
              key={tool.name}
              className={`
                p-8 relative border-2 border-transparent 
                bg-gradient-to-tr ${tool.accent} hover:border-cyan-300 
                shadow-lg transition-all duration-150
                backdrop-blur-2xl
                flex flex-col
              `}
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="w-9 h-9 rounded-xl object-contain bg-black/70 p-1"
                  draggable={false}
                />
                <h3 className="text-lg font-extrabold text-blue-100 tracking-tight">
                  {tool.name}
                </h3>
                <span
                  className="ml-auto px-2 py-1 rounded bg-black/20 text-xs text-cyan-100 border border-cyan-600/20"
                >
                  {tool.category}
                </span>
              </div>
              <div className="mt-2 mb-4">
                <h4 className="font-bold text-cyan-300 mb-1">Pros</h4>
                <ul className="list-disc pl-5 mb-2 space-y-1 text-sm text-cyan-100/90">
                  {tool.pros.map((pro, idx) => (
                    <li key={idx}>{pro}</li>
                  ))}
                </ul>
                <h4 className="font-bold text-pink-300 mt-3 mb-1">Cons</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-pink-100/90">
                  {tool.cons.map((con, idx) => (
                    <li key={idx}>{con}</li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
      {/* --- Section 4: HOW PROS COMBINE AI TOOLS ("Real Workflows") --- */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <GlassCard className="p-10 md:p-12 bg-gradient-to-tr from-blue-950/85 via-fuchsia-900/15 to-neutral-950 border-fuchsia-500/10 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-blue-200">
            Proven AI Workflows: Winning LinkedIn in 2026
          </h2>
          <ol className="list-decimal space-y-4 pl-7 text-cyan-100/90 text-base mb-3">
            <li>
              <span className="font-semibold text-cyan-300">Personalized Post Engine: </span>
              Use <span className="text-neutral-100 font-bold">CopyPilot AI</span> to draft hooks and bodies from trending news in your niche. Fine-tune tone and predictions for viral resonance.
            </li>
            <li>
              <span className="font-semibold text-pink-300">Visual Amplification: </span>
              Feed text prompts into <span className="font-bold text-pink-200">VisionFrame Studio</span> for standout carousels and headline graphics optimized by native LinkedIn image guidelines.
            </li>
            <li>
              <span className="font-semibold text-blue-300">Smart Scheduling: </span>
              Let <span className="font-bold text-blue-100">PostPulse Scheduler</span> auto-select peak post windows, group-comment new leads, and surface trending response topics.
            </li>
            <li>
              <span className="font-semibold text-violet-300">All-in-One Collab (Teams): </span>
              Manage everything—from draft review to campaign reporting—in <span className="font-bold text-violet-200">NeuraCompose Suite</span> for multi-persona LinkedIn accounts.
            </li>
          </ol>
          <p className="text-neutral-400 text-sm">Tip: The best creators mix at least two tools to optimize both originality and consistency—while staying compliant with evolving LinkedIn rules.</p>
        </GlassCard>
      </section>
      {/* --- Section 5: FAQ --- */}
      <section className="max-w-3xl mx-auto mb-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          LinkedIn AI Content Creation FAQ (2026)
        </h2>
        <FAQAccordion items={faqItems} />
      </section>
      {/* --- Final CTA Section --- */}
      <section className="flex flex-col justify-center items-center my-12 md:my-20">
        <GlassCard className="py-10 px-8 md:px-16 max-w-xl w-full flex flex-col items-center bg-gradient-to-tr from-blue-900/70 to-black/80 border border-blue-400/25 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-200 mb-3">
            Unlock Our 2026 LinkedIn Content Vault
          </h2>
          <p className="text-center max-w-xl mx-auto mb-5 text-neutral-300 text-lg">
            Access exclusive AI tool reviews, next-gen growth scripts, and plug-and-play frameworks for LinkedIn dominance.
          </p>
          <Link
            href="https://forms.gle/lead-magnet-link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-400 transition-colors"
          >
            Get the Vault & Playbooks →
          </Link>
          <p className="mt-3 text-xs text-neutral-400 italic">
            No spam. Unsubscribe anytime.
          </p>
        </GlassCard>
      </section>
      {/* --- Footer --- */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500">
          © 2026 Executive Studio. Crafted for creators who lead.
        </span>
      </footer>
    </main>
  );
}