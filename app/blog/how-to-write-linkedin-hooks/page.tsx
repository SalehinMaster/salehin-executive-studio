"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from '../../../src/components/ui/glass-card';

// --- Interactive Hook Builder ---
const psychologicalTriggers = [
  "Curiosity",
  "Contrarian Insight",
  "Social Proof",
  "Scarcity/Urgency",
  "Novelty",
  "Direct Value",
  "Personal Story",
  "Question",
];

const hookPatterns = [
  {
    label: "Prediction",
    description:
      "Forecasting future trends to capture attention. ('In 2026, ... will change everything about ...')",
    template: "Prediction: In {year}, {unexpected trend} will {result}. Here’s why…",
  },
  {
    label: "Contrarian Take",
    description:
      "Challenging common beliefs or the status quo to spark debate. ('Most people think..., but...')",
    template: "Everyone says {common belief}, but here’s what actually works: {short punchline}.",
  },
  {
    label: "Bold Question",
    description:
      "Asking an unexpected or bold question. ('Would you fire your top performer if...')",
    template: "Would you {unexpected action} if it meant {big result}? Let me explain.",
  },
  {
    label: "Statistic/Insight",
    description:
      "Using surprising numbers or research up front. ('92% of leaders forget this about LinkedIn…')",
    template: "{impressive stat} of {group} ignore this {problem}—are you missing out?",
  },
  {
    label: "Micro-story",
    description:
      "Leading with a personal snippet or client anecdote. ('Last Friday, my DM notification changed everything…')",
    template: "Last {timeframe}, I {unusual event}. Here’s what happened next.",
  },
  {
    label: "Step-by-Step",
    description:
      "Previewing a process or list right up top. ('3 steps to land enterprise clients on LinkedIn:')",
    template: "{number} {valuable things} to {achieve result} in {year}:",
  },
  {
    label: "Warning",
    description:
      "Raising an urgent issue. ('Warning: LinkedIn’s new feed change is killing your reach.')",
    template: "Warning: {threat/opportunity} is happening on LinkedIn right now.",
  },
];

// --- Interactive Hook Builder Component ---
function HookBuilder() {
  const [pattern, setPattern] = useState(hookPatterns[0]);
  const [year, setYear] = useState("2026");
  const [custom, setCustom] = useState({
    trend: "",
    result: "",
    belief: "",
    punchline: "",
    action: "",
    bigResult: "",
    stat: "",
    group: "",
    problem: "",
    timeframe: "",
    event: "",
    number: "3",
    things: "",
    achieve: "",
    threat: "",
    opportunity: "",
  });

  function renderFields() {
    switch (pattern.label) {
      case "Prediction":
        return (
          <>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Unexpected Trend</label>
              <input
                type="text"
                value={custom.trend}
                onChange={(e) => setCustom(s => ({ ...s, trend: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. AI-generated profiles"
              />
            </div>
            <div>
              <label className="block text-sm text-cyan-100/90 mb-1">Result</label>
              <input
                type="text"
                value={custom.result}
                onChange={(e) => setCustom(s => ({ ...s, result: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. drown out original voices"
              />
            </div>
          </>
        );
      case "Contrarian Take":
        return (
          <>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Common Belief</label>
              <input
                type="text"
                value={custom.belief}
                onChange={(e) => setCustom(s => ({ ...s, belief: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. You need to post daily"
              />
            </div>
            <div>
              <label className="block text-sm text-cyan-100/90 mb-1">Punchline (What actually works?)</label>
              <input
                type="text"
                value={custom.punchline}
                onChange={(e) => setCustom(s => ({ ...s, punchline: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. Strategic comments outperform posts"
              />
            </div>
          </>
        );
      case "Bold Question":
        return (
          <>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Unexpected Action</label>
              <input
                type="text"
                value={custom.action}
                onChange={(e) => setCustom(s => ({ ...s, action: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. fire your best client"
              />
            </div>
            <div>
              <label className="block text-sm text-cyan-100/90 mb-1">Big Result</label>
              <input
                type="text"
                value={custom.bigResult}
                onChange={(e) => setCustom(s => ({ ...s, bigResult: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. double your pipeline"
              />
            </div>
          </>
        );
      case "Statistic/Insight":
        return (
          <>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Impressive Stat</label>
              <input
                type="text"
                value={custom.stat}
                onChange={(e) => setCustom(s => ({ ...s, stat: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. 89%"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Group</label>
              <input
                type="text"
                value={custom.group}
                onChange={(e) => setCustom(s => ({ ...s, group: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. C-suite execs"
              />
            </div>
            <div>
              <label className="block text-sm text-cyan-100/90 mb-1">Problem</label>
              <input
                type="text"
                value={custom.problem}
                onChange={(e) => setCustom(s => ({ ...s, problem: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. missed sales opportunities"
              />
            </div>
          </>
        );
      case "Micro-story":
        return (
          <>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Timeframe</label>
              <input
                type="text"
                value={custom.timeframe}
                onChange={(e) => setCustom(s => ({ ...s, timeframe: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. Friday night"
              />
            </div>
            <div>
              <label className="block text-sm text-cyan-100/90 mb-1">Unusual Event</label>
              <input
                type="text"
                value={custom.event}
                onChange={(e) => setCustom(s => ({ ...s, event: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. was tagged in a viral post"
              />
            </div>
          </>
        );
      case "Step-by-Step":
        return (
          <>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Number</label>
              <input
                type="text"
                value={custom.number}
                onChange={(e) => setCustom(s => ({ ...s, number: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Valuable Things</label>
              <input
                type="text"
                value={custom.things}
                onChange={(e) => setCustom(s => ({ ...s, things: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. scripts"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Achieve Result</label>
              <input
                type="text"
                value={custom.achieve}
                onChange={(e) => setCustom(s => ({ ...s, achieve: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. land enterprise deals"
              />
            </div>
            <div>
              <label className="block text-sm text-cyan-100/90 mb-1">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
              />
            </div>
          </>
        );
      case "Warning":
        return (
          <>
            <div className="mb-2">
              <label className="block text-sm text-cyan-100/90 mb-1">Threat or Opportunity</label>
              <input
                type="text"
                value={custom.threat}
                onChange={(e) => setCustom(s => ({ ...s, threat: e.target.value, opportunity: e.target.value }))}
                className="w-full rounded bg-black/70 text-cyan-100 p-2 border border-cyan-900 focus:border-cyan-400"
                placeholder="e.g. algorithm penalties"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  }

  function generateHook() {
    switch (pattern.label) {
      case "Prediction":
        return `Prediction: In ${year}, ${custom.trend || "[unexpected trend]"} will ${custom.result || "[result]"}. Here’s why…`;
      case "Contrarian Take":
        return `Everyone says ${custom.belief || "[common belief]"}, but here’s what actually works: ${custom.punchline || "[the real answer]"}.
`;
      case "Bold Question":
        return `Would you ${custom.action || "[unexpected action]"} if it meant ${custom.bigResult || "[amazing result]"}? Let me explain.`;
      case "Statistic/Insight":
        return `${custom.stat || "[%]"} of ${custom.group || "[group]"} ignore this ${custom.problem ||
          "[problem]"}—are you missing out?`;
      case "Micro-story":
        return `Last ${custom.timeframe || "[timeframe]"}, I ${custom.event || "[unusual event]"}. Here’s what happened next.`;
      case "Step-by-Step":
        return `${custom.number || "[#]"} ${custom.things || "[things]"} to ${custom.achieve || "[achieve]"} in ${
          year
        }:`;
      case "Warning":
        return `Warning: ${custom.threat || "[threat/opportunity]"} is happening on LinkedIn right now.`;
      default:
        return "";
    }
  }

  return (
    <GlassCard className="p-6 md:p-10 max-w-2xl mx-auto mt-8 mb-14 border-cyan-300/15 shadow-lg bg-gradient-to-br from-blue-950/80 to-black/90">
      <h3 className="text-xl md:text-2xl font-bold text-cyan-200 mb-4">🧩 Build Your Own LinkedIn Hook</h3>
      <p className="text-cyan-100/80 mb-4 text-sm">Mix high-performing patterns and psychological triggers below. Instantly preview a hook for your next post:</p>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full">
          <label className="block text-sm font-medium text-blue-100 mb-2">Select Pattern</label>
          <select
            value={pattern.label}
            onChange={e => setPattern(hookPatterns.find(p => p.label === e.target.value) || hookPatterns[0])}
            className="w-full rounded bg-black/80 text-blue-200 py-2 px-3 border border-cyan-900 focus:border-cyan-400"
          >
            {hookPatterns.map(p => (
              <option value={p.label} key={p.label}>{p.label}</option>
            ))}
          </select>
          <div className="text-xs mt-2 text-cyan-100/70 italic">{pattern.description}</div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-blue-100 mb-2">Psychological Triggers</label>
          <div className="flex flex-wrap gap-2">
            {psychologicalTriggers.map((trig) => (
              <span
                key={trig}
                className="inline-block bg-gradient-to-r from-blue-900 via-cyan-700 to-blue-800 text-cyan-100 rounded-full px-3 py-1 text-xs font-medium"
              >
                {trig}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-5">{renderFields()}</div>
      <div className="mt-2">
        <span className="block text-xs text-cyan-400 mb-1 font-semibold">Live Hook Preview:</span>
        <div className="bg-black/80 border border-cyan-700/20 rounded-lg px-4 py-3 font-mono text-cyan-100 text-lg">{generateHook()}</div>
      </div>
    </GlassCard>
  );
}

// --- FAQ Data ---
const faqItems = [
  {
    question: "What makes a great LinkedIn hook in 2026?",
    answer: (
      <>
        <span className="font-semibold text-cyan-300">A:</span> The best hooks blend psychological triggers—like curiosity, surprise, or perceived exclusivity—with ultra-relevant context. Tech-literate audiences crave instant clarity and asset value. In 2026, <strong>AI-generated content noise</strong> makes it essential to (1) create contrast, (2) establish originality fast, and (3) signal specific value within the first 2 lines (the “faded preview” zone).
      </>
    ),
  },
  {
    question: "How many words should my LinkedIn post hook be?",
    answer: (
      <>
        <span className="font-semibold text-cyan-300">A:</span> 12–24 words is the current sweet spot. Short enough to fit within LinkedIn’s preview but long enough to deliver a punch. Use line breaks before key info for better mobile preview.
      </>
    ),
  },
  {
    question: "Are emojis helpful or hurtful in hooks?",
    answer: (
      <>
        <span className="font-semibold text-cyan-300">A:</span> Thoughtful emoji use (to signal emotion or break up lines) can boost engagement. But overused or irrelevant emojis feel spammy and reduce perceived authority. In 2026, top-performing execs use 0–2 per opening paragraph.
      </>
    ),
  },
  {
    question: "How do I avoid clickbait in my hooks?",
    answer: (
      <>
        <span className="font-semibold text-cyan-300">A:</span> Set <i>realistic expectations</i>. Make sure your hook’s promise is directly delivered on in your body. If you pose a big question, answer it. If you tease a result, show the method. LinkedIn’s latest algorithm penalizes “ghost” engagement and misleading opens.
      </>
    ),
  },
  {
    question: "What hook formats work best for different LinkedIn content types?",
    answer: (
      <>
        <span className="font-semibold text-cyan-300">A:</span>
        <ul className="mt-2 pl-4 list-disc text-cyan-100/90 text-sm space-y-1">
          <li><strong>Stories:</strong> Micro-story or bold question hooks outperform formal intros.</li>
          <li><strong>Carousels:</strong> Use a stat, warning, or step-by-step preview (“7 rookie mistakes to avoid in...”).</li>
          <li><strong>Thought Leadership:</strong> Contrarian and prediction hooks stand out in crowded feeds.</li>
          <li><strong>Commentary/News:</strong> Start with a number, trend, or urgent threat related to industry shifts.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Should I personalize hooks for my audience?",
    answer: (
      <>
        <span className="font-semibold text-cyan-300">A:</span> Personalization is non-negotiable. Reference your target role, challenge, or outcome. “For B2B SaaS founders tired of spray-and-pray…” always beats generic openers.
      </>
    ),
  },
  {
    question: "Do AI tools help or hurt hook writing?",
    answer: (
      <>
        <span className="font-semibold text-cyan-300">A:</span> AI is an amplifier. Use it for brainstorming, pattern matching, and speed. But manually refine for originality and resonance. <b>Your strategic insight</b> is still the differentiator.
      </>
    ),
  },
];

// --- FAQ Accordion Component ---
function FAQAccordion({ items }: { items: typeof faqItems }) {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  return (
    <div className="divide-y divide-neutral-800 bg-black/10 rounded-xl shadow-inner">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center py-4 px-2 text-left"
          >
            <span className="text-cyan-200 font-semibold">{item.question}</span>
            <span className="ml-3 text-cyan-300">{openIndex === i ? "–" : "+"}</span>
          </button>
          {openIndex === i && (
            <div className="py-2 px-4 text-cyan-100/90 text-sm transition-all">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// --- Before vs After Comparison Blocks ---
function BeforeAfterBlock({ before, after }: { before: string; after: string }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6">
      <div className="w-full">
        <GlassCard className="p-5 border-red-500/25 bg-gradient-to-br from-red-900/30 to-black/80">
          <span className="block text-xs font-bold text-red-300 mb-2">BEFORE</span>
          <div className="text-neutral-300 whitespace-pre-line">{before}</div>
        </GlassCard>
      </div>
      <div className="w-full">
        <GlassCard className="p-5 border-cyan-500/25 bg-gradient-to-br from-cyan-900/30 to-black/80">
          <span className="block text-xs font-bold text-cyan-300 mb-2">AFTER</span>
          <div className="text-cyan-100 whitespace-pre-line">{after}</div>
        </GlassCard>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-slate-900 pb-8">
      <article className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-extrabold text-3xl md:text-5xl text-cyan-200 mb-5 text-center drop-shadow-lg">
          How to Write LinkedIn Hooks That Get Read <span className="inline-block text-[1.1rem] align-top bg-gradient-to-tr from-blue-600 to-cyan-500 text-transparent bg-clip-text ml-1">2026 Edition</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg text-neutral-200 mb-8 text-center">
          <span className="text-cyan-300 font-semibold">“Hook”</span> your ideal prospects (and the algorithm) in 3 seconds or less. Discover the proven formulas, psychological triggers, and formatting rules that drive viral, high-authority LinkedIn engagement in the next era of business content.
        </p>

        {/* Section: The 2026 Challenge */}
        <GlassCard className="mb-10 p-6 text-cyan-100/80 bg-gradient-to-br from-black/60 to-blue-900/40 border-cyan-900/30">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-300 mb-2">
            Why Your LinkedIn Hooks Matter More Than Ever in 2026
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-[15px] mb-2">
            <li>
              <span className="font-semibold text-blue-200">Algorithmic Overload:</span> LinkedIn’s feed AI now prioritizes <b>unique openers and high D1 dwell time</b> over total likes.
            </li>
            <li>
              <span className="font-semibold text-blue-200">Skimmable Feeds:</span> 78% of leadership-level users admit they “<i>never click ‘see more’</i>” on weak intros.
            </li>
            <li>
              <span className="font-semibold text-blue-200">AI-Generated Competition:</span> Auto-written intros are everywhere. Human distinction starts with your first line.
            </li>
            <li>
              <span className="font-semibold text-blue-200">Trust Signals:</span> Modern readers spot bland lead-ins instantly—your opening must promise <b>specific</b> value, not just platitudes.
            </li>
          </ul>
        </GlassCard>

        {/* Section: Psychological Triggers */}
        <GlassCard className="mb-10 p-7 border-blue-900/15 bg-gradient-to-r from-black/90 to-blue-950/70">
          <h2 className="text-xl font-bold text-cyan-200 mb-3 tracking-tight">The Science of LinkedIn Hooks: Psychological Triggers</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-cyan-100/90">
            <li>
              <span className="font-semibold text-pink-300">Curiosity:</span> Pose an unanswered question or partial insight ("...but here’s what nobody tells you.")
            </li>
            <li>
              <span className="font-semibold text-cyan-300">Contrarianism:</span> Challenge a belief/assumption. ("Everyone says X, but the data says Y...")
            </li>
            <li>
              <span className="font-semibold text-yellow-300">Social Proof:</span> Reference data, status, or authority. ("Last year, 61% of executives overlooked...")
            </li>
            <li>
              <span className="font-semibold text-fuchsia-300">Urgency/Scarcity:</span> Present time-sensitive value or warning ("This shift is killing your 2026 reach.")
            </li>
            <li>
              <span className="font-semibold text-emerald-300">Novelty:</span> Promise something never shared before, or a surprising trend.
            </li>
            <li>
              <span className="font-semibold text-violet-300">Direct Value:</span> Promise a quick win, cheat code, or tactical blueprint.
            </li>
            <li>
              <span className="font-semibold text-blue-300">Relatability (Personal Story):</span> Open vulnerable or authentic ("I almost gave up. Then...")
            </li>
            <li>
              <span className="font-semibold text-orange-300">Question:</span> Lead with a powerful question ("What’s the #1 mistake new managers make?")
            </li>
          </ul>
        </GlassCard>

        {/* Section: High-Performing Formatting Rules */}
        <GlassCard className="mb-10 p-7 border-cyan-400/20 bg-gradient-to-r from-cyan-950/70 to-blue-950/80">
          <h2 className="text-xl text-cyan-200 font-bold mb-3 tracking-tight">Formatting Rules for Next-Level Hooks (2026)</h2>
          <ol className="list-decimal pl-6 text-cyan-100/90 text-sm space-y-2">
            <li>
              <b>Keep it visually tight:</b> Never more than 2 lines before the “see more” cut-off (40–50 words max).
            </li>
            <li>
              <b>Emphasize scannability:</b> Use line breaks after punchlines and before lists.
            </li>
            <li>
              <b>Leverage whitespace:</b> Start new ideas on a fresh line for mobile readability.
            </li>
            <li>
              <b>Strategic emojis (0–2 max):</b> Use only to add tone, flag hierarchy, or break monotony.
            </li>
            <li>
              <b>Active verbs first:</b> “Quit skipping X. Try this formula.” - “Here are tips to...”
            </li>
            <li>
              <b>Personalize for your ICP:</b> Call out the reader with “For B2B founders in SaaS ...”
            </li>
            <li>
              <b>Numbers and specifics rule:</b> “97% of $1M founders missed this...” - “You’re missing out...”
            </li>
            <li>
              <b>Match hook style to post intent:</b> Carousels love questions/stats, stories love micro-anecdotes.
            </li>
            <li>
              <b>Main value above the fold:</b> Don’t “bury the lead.” Offer your differentiator up front.
            </li>
          </ol>
        </GlassCard>

        {/* Section: Before vs After Hook Examples */}
        <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mt-10 mb-4 drop-shadow">Before vs After: High-Impact Hook Transformations</h2>
        <p className="text-cyan-100/80 mb-2 text-sm">See how generic intros become scroll-stopping openers:</p>
        <BeforeAfterBlock
          before={`"Here’s how to grow on LinkedIn in 2026."\n\n(Too generic. Zero differentiation.)`}
          after={`Prediction: In 2026, AI-generated profiles will drown out 70% of LinkedIn posts—but here’s how standout creators break through.\n\n(Curiosity + Contrarian + Direct Value)`}
        />
        <BeforeAfterBlock
          before={`"My tips for new sales leaders."\n\n(Bland, no reason to read further.)`}
          after={`Would you fire your top performer if it guaranteed you’d double your pipeline in 90 days? Most won’t. Here’s why that’s a mistake.\n\n(Bold Question + Social Proof + Personalization)`}
        />
        <BeforeAfterBlock
          before={`"Sharing my experience with remote work."\n\n(Too broad, no hook.)`}
          after={`Last Friday, I accidentally discovered the meeting hack that saved my team 19 hours/month. Here’s what happened.\n\n(Micro-story + Statistic)`}
        />

        {/* Section: Interactive Hook Builder */}
        <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mt-12 mb-4 drop-shadow">🪄 Hook Builder Playground: Try These Patterns</h2>
        <HookBuilder />

        {/* Section: Deep Dive Educational Content */}
        <section className="mt-14 mb-16">
          <GlassCard className="p-7 border-violet-400/15 bg-gradient-to-tr from-cyan-900/70 to-black/80">
            <h2 className="text-xl font-extrabold text-cyan-200 mb-4">The Anatomy of a High-Performing LinkedIn Hook</h2>
            <ul className="list-disc text-cyan-100/90 text-[15px] pl-5 mb-5 space-y-2">
              <li>
                <b>Micro-positioning:</b> The reader must know within a glance: “Is this for me?” Name-drop target role, challenge, or outcome.
              </li>
              <li>
                <b>Contrast is currency:</b> If most posts say A, start with Z. “Everyone loves remote teams. Why mine failed…”
              </li>
              <li>
                <b>‘Assetize’ your promise:</b> Hooks that hint at frameworks, downloadable cheatsheets, or unique case studies trigger a “perceived possession” response.
              </li>
              <li>
                <b>Use negative pattern interrupts:</b> “Stop...”, “Never…”, or “The reason you’re losing deals...” break algorithmic skimming.
              </li>
              <li>
                <b>Collapse the curiosity gap:</b> Tease a result, but preview there’s more (“…and here’s the script I used.”)
              </li>
              <li>
                <b>Validate with social proof:</b> “Every $1M founder I work with asks me…” shows relevance and expertise.
              </li>
            </ul>
            <div>
              <h3 className="text-lg text-violet-200 font-semibold mb-2 mt-6">Pattern Library: 2026’s Best LinkedIn Hooks</h3>
              <ol className="list-decimal text-cyan-100/90 text-[15px] pl-6 mb-2 space-y-2">
                <li>
                  <span className="font-semibold text-cyan-300">The Prediction:</span> “By December, 80% of buyer DMs will be AI-filtered — but here’s how real founders break through.”
                </li>
                <li>
                  <span className="font-semibold text-fuchsia-300">Contrarian Insight:</span> “Stop posting daily. Comment-led authority wins in 2026. Here’s why.”
                </li>
                <li>
                  <span className="font-semibold text-yellow-300">Stat/Proof:</span> “97% of VPs misuse this positioning. (Are you one of them?)”
                </li>
                <li>
                  <span className="font-semibold text-emerald-300">Story First:</span> “Two years ago I almost quit LinkedIn. My next move changed everything...”
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Bold Question:</span> “Would you fire your top-paying client if it 5x’d your deal flow?”
                </li>
                <li>
                  <span className="font-semibold text-orange-300">How-To/Process:</span> “3 scripts that warm up cold prospects in 5 minutes or less:”
                </li>
                <li>
                  <span className="font-semibold text-violet-300">Warning:</span> “Warning: LinkedIn’s latest algorithm shift just killed reach for carousel-only creators.”
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg text-cyan-300 font-semibold my-4">Top Mistakes to Avoid (2026):</h3>
              <ul className="list-disc text-cyan-100/90 text-[15px] pl-5 space-y-1">
                <li>Using recycled/generic intros (“Here are my thoughts…”, “Some advice for you…”)</li>
                <li>Burying the lead; waiting too long to reveal the main point.</li>
                <li>Writing for the algorithm, not humans—AI detectors reward substance, not keyword stuffing.</li>
                <li>Ignoring line breaks and mobile preview.</li>
                <li>Forgetting to reference your audience (role, industry, painpoint, aspiration).</li>
                <li>Clickbaiting with no payoff: LinkedIn AI is increasingly punitive toward this pattern.</li>
                <li>Over-indexing on emojis, or using irrelevant ones that dilute your brand.</li>
              </ul>
            </div>
            <div className="mt-7 mb-3">
              <h3 className="text-lg text-violet-200 font-semibold mb-2">Pro-Tip: Audit Your Last 10 Posts</h3>
              <ul className="list-disc text-cyan-100/80 text-[15px] pl-5 space-y-1">
                <li>
                  Did at least 1 of the psychological triggers appear in your opening?
                </li>
                <li>
                  If you swapped your first sentence with a competitor’s, would it stand out?
                </li>
                <li>
                  Is the “so what?” clear from your intro?
                </li>
                <li>
                  Does your hook deliver or tease <span className="font-semibold text-cyan-300">transformational value</span> (not just information)?
                </li>
              </ul>
            </div>
          </GlassCard>
        </section>

        {/* Section: FAQ */}
        <section className="mt-8 mb-16">
          <h2 className="text-2xl font-bold text-cyan-200 mb-6">LinkedIn Hook Optimization FAQ</h2>
          <FAQAccordion items={faqItems} />
        </section>

        {/* Section: Bundle Download CTA */}
        <section className="flex flex-col items-center my-20">
          <GlassCard className="py-10 px-8 md:px-16 max-w-xl w-full flex flex-col items-center bg-gradient-to-tr from-cyan-900/60 to-black/70 border border-cyan-400/30 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-cyan-200 mb-4">
              Download the Ultimate LinkedIn Hook Template Bundle (2026)
            </h2>
            <p className="mb-5 text-neutral-300 text-center max-w-lg">
              <span className="font-semibold text-blue-300">50+ Copy-Paste Hooks</span> for every scenario:
              <br />
              Carousels, story posts, lead magnets, executive thought leadership, and more.
              <br />
              <span className="text-cyan-200">Accelerate</span> your post ideation and fill your pipeline with scroll-stopping openers built for tomorrow’s algorithm.
            </p>
            <Link
              href="https://forms.gle/your-lead-magnet-url" // Replace with a live link for production
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-cyan-700 hover:to-blue-400 transition-colors"
            >
              Get My 2026 Hook Templates →
            </Link>
            <p className="mt-3 text-xs text-neutral-400 italic">
              ⚡ No spam. One-click unsubscribe at any time.
            </p>
          </GlassCard>
        </section>
      </article>

      {/* FOOTER */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500">
          © 2026 Executive Studio. Crafted for creators and leaders who write.
        </span>
      </footer>
    </main>
  );
}