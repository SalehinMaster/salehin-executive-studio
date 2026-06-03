"use client";

import React from "react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";

// ==========================
// TemplateBlock Component
// Nicely formatted post template block
// ==========================
function TemplateBlock({
  title,
  hook,
  body,
  cta,
  example,
  accent = "from-cyan-400/80 via-blue-600/70 to-blue-900/70",
}: {
  title: string;
  hook: string;
  body: string;
  cta: string;
  example?: string;
  accent?: string;
}) {
  return (
    <GlassCard
      className={`w-full p-6 my-8 border-l-8 bg-gradient-to-tr ${accent} border-cyan-400/20 shadow-lg`}
    >
      <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-cyan-100 tracking-tight">
        {title}
      </h3>
      <div className="mb-3 text-slate-200/95 text-[15px] leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
          <div>
            <span className="block font-bold text-cyan-300 mb-1">Hook</span>
            <span className="block rounded bg-black/10 p-2 text-cyan-100/90 text-sm font-mono">
              {hook}
            </span>
          </div>
          <div>
            <span className="block font-bold text-blue-300 mb-1">Body</span>
            <span className="block rounded bg-black/10 p-2 text-blue-100/90 text-sm font-mono">
              {body}
            </span>
          </div>
          <div>
            <span className="block font-bold text-emerald-300 mb-1">CTA</span>
            <span className="block rounded bg-black/10 p-2 text-emerald-100/90 text-sm font-mono">
              {cta}
            </span>
          </div>
        </div>
        {example && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sky-400 hover:text-cyan-300 font-medium">
              Example Post
            </summary>
            <div className="mt-1 bg-black/30 border border-slate-700 rounded-lg p-3 font-mono text-[14px] text-slate-100">
              {example}
            </div>
          </details>
        )}
      </div>
    </GlassCard>
  );
}

// ==========================
// FAQ Section Data
// ==========================
const faqItems = [
  {
    question: "Are these LinkedIn post frameworks suitable for any industry?",
    answer: (
      <>
        Yes – they’re designed for cross-industry use. Whether you’re in SaaS, consulting, creative fields, or leadership, these frameworks can be specialized for your expertise, brand, and audience.
      </>
    ),
  },
  {
    question: "How often should I post using these frameworks?",
    answer: (
      <>
        For most creators, 3–5 high-quality posts per week using a mix of frameworks works best. Consistency trains the algorithm and your audience to expect unique value.
      </>
    ),
  },
  {
    question: "Do these frameworks work for company pages as well as personal profiles?",
    answer: (
      <>
        Primarily—they excel on personal profiles where authenticity and narrative drive engagement. Adapt them for company pages by emphasizing team voice, employee stories, and industry insights.
      </>
    ),
  },
  {
    question: "Can AI help personalize these frameworks for me?",
    answer: (
      <>
        Absolutely! Use generative AI to brainstorm hooks, generate unique examples, or schedule/sequencing posts. <strong>But:</strong> Always review for voice and relevance—algorithm favor goes to genuine perspective.
      </>
    ),
  },
  {
    question: "Should every post have a CTA in 2026?",
    answer: (
      <>
        Not always. While CTAs drive action, sometimes ending with an open-ended insight or question increases meaningful responses. Mix hard and soft CTAs for maximum effect.
      </>
    ),
  },
  {
    question: "How do I ensure my post doesn't get shadowbanned?",
    answer: (
      <>
        <ul className="list-disc pl-5">
          <li>Avoid engagement bait ("Like if you agree!")</li>
          <li>Stay compliant with LinkedIn’s terms</li>
          <li>Diversify formats (text, carousels, short video, polls)</li>
          <li>Post value-first, not “viral hacks”</li>
        </ul>
      </>
    ),
  }
];

// ==========================
// FAQ Accordion Component
// ==========================
function FAQAccordion({ items }: { items: typeof faqItems }) {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <div className="rounded-xl divide-y divide-neutral-800 bg-black/20 backdrop-blur-md shadow-inner">
      {items.map((item, idx) => (
        <div key={idx}>
          <button
            className="w-full text-left px-6 py-4 font-semibold text-cyan-200 flex items-center justify-between focus:outline-none"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
          >
            <span>{item.question}</span>
            <svg
              className={`transform transition-transform duration-200 ${open === idx ? "rotate-90" : ""}`}
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M7 7l6 3-6 3V7z" fill="currentColor" />
            </svg>
          </button>
          {open === idx && (
            <div className="px-6 pb-4 text-blue-100/90 text-[15px]">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// =====================================
// Main Article Page
// =====================================
export default function Page() {
  return (
    <main className="min-h-screen w-full pb-16 bg-gradient-to-br from-black via-[#0a182c] to-blue-900 text-white">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto pt-12 px-4 md:px-0">
        <GlassCard className="p-8 border-cyan-500/20 shadow-2xl mb-10 bg-gradient-to-tr from-blue-950/60 to-black/80">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent mb-3">
            10 LinkedIn Post Frameworks That Drive Engagement <span className="block mt-2 text-base bg-clip-text text-cyan-100 tracking-wide font-semibold">[2026 Edition]</span>
          </h1>
          <p className="text-lg md:text-xl text-center text-neutral-200 mb-3">
            Master the LinkedIn algorithm and spark conversations in any industry. Here are the advanced template blueprints for visibility, credibility, and connection.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 justify-center text-xs md:text-sm text-cyan-100/80">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/20 border border-cyan-500/40">SEO-Driven</span>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600/30 to-blue-600/20 border border-emerald-400/40">Proven Human Psychology</span>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-800/40 via-blue-600/20 to-pink-700/10 border border-blue-400/30">Optimized for 2026 Algorithm</span>
          </div>
        </GlassCard>
      </section>

      {/* Intro and Algorithm Tips */}
      <section className="max-w-2xl mx-auto mb-16 px-4 md:px-0">
        <GlassCard className="p-7 bg-gradient-to-bl from-blue-950/70 to-black/70 border-blue-400/20 mb-8">
          <h2 className="text-2xl font-semibold text-cyan-200 mb-1">
            Why Frameworks Matter in 2026
          </h2>
          <p className="text-neutral-200 mb-2">
            LinkedIn’s 2026 algorithm is smarter—and pickier—than ever. Content that earns high dwell time, authentic reactions, and meaningful discussion <span className="text-cyan-300 font-semibold">outranks generic tips and recycled thought leadership</span>.
          </p>
          <ul className="list-disc pl-6 mb-2 text-cyan-100/90 space-y-2">
            <li>
              <strong>Pattern Interrupts:</strong> Lead with lines that break the scroll (unusual questions, bold stats, quotable statements).
            </li>
            <li>
              <strong>Relatability:</strong> Contextualize with lived experience or client stories.
            </li>
            <li>
              <strong>AI-Optimized Structure:</strong> Keep hooks & CTAs concise, and body scannable. Use simple visuals, lists, or code-style formatting for clarity.
            </li>
            <li>
              <strong>Native Engagement:</strong> Invite thoughtful responses, not just “likes.” LinkedIn now favors posts with -60 second average dwell and visible replies.
            </li>
          </ul>
          <p className="mt-1 text-blue-100/80 text-sm italic">
            Use these 10 frameworks—proven by top creators and refined for today’s feed.
          </p>
        </GlassCard>
      </section>

      {/* Main Templates: 10 Frameworks */}
      <section className="max-w-3xl mx-auto px-4 md:px-0">
        {/* #1 - Contrarian Insight */}
        <TemplateBlock
          title="1. Contrarian Insight"
          hook="Most people get this entirely wrong about [industry/problem]."
          body="Present the mainstream belief. Gently dismantle it with data or a personal story. Explain why your 'contrarian' insight actually delivers better results—grounded in real evidence."
          cta="What do you think—does the old way still work, or are we overdue for a rethink?"
          example={`Hook: Most people still post on LinkedIn at 9am—assuming that's peak visibility. Here's what's changed.\n\nBody: For years, 'post early' was gospel. But in 2026, more B2B buyers browse after hours. My data from 100+ SaaS founders: evening posts (7-9pm) get 33% more engagement. Here's why…\n\nCTA: When do you actually check the feed? Surprised by this data?"`}
          accent="from-fuchsia-600/30 via-blue-800/60 to-black/70"
        />

        {/* #2 - Micro Case Study */}
        <TemplateBlock
          title="2. Micro Case Study"
          hook="How [Client/You] Achieved [Result] in [Short Timeframe]"
          body="State the goal. Share step-by-step actions taken (brief, actionable). Conclude with a measurable result and the real driver of success—not just the surface tactic."
          cta="Who else is using a similar approach—or what's your top lesson here?"
          example={`Hook: How a solopreneur booked $50k from LinkedIn in 90 days—no ad spend.\n\nBody: 1) Profile overhaul: targeted keywords + portfolio. 2) Strategic daily commenting. 3) Weekly value-drop posts (using this exact framework). Result: 34 inbound leads, 6 closed deals. The twist? 80% came from just *two* thought leadership threads.\n\nCTA: Anyone want the full breakdown? Drop a 🔥 below."`}
          accent="from-cyan-500/25 via-violet-500/25 to-blue-700/40"
        />

        {/* #3 - Playbook/Checklist Drop */}
        <TemplateBlock
          title="3. Playbook/Checklist Drop"
          hook="The [Number]-Step Playbook for [Ambitious Outcome]"
          body="Introduce the playbook or checklist as a shortcut to a desired, specific outcome. List actionable steps or checkpoints clearly—use line breaks or bullet points for scanability."
          cta="Want the full .pdf? Comment ‘Checklist’ & I’ll DM."
          example={`Hook: The 5-Step Playbook for Booking Podcast Guest Spots Fast\n\nBody:\n- Craft irresistible pitch lines (highlight WIIFT).\n- Target niche podcasts using Podchaser.\n- Build a ‘one-pager’ with past wins.\n- Personalize every pitch; 10/day max.\n- Prep 3 “signature stories.”\n\nCTA: Want my editable outreach tracker? Reply ‘Podcast’—I’ll DM the Notion link."`}
          accent="from-cyan-700/30 via-blue-700/20 to-blue-950/40"
        />

        {/* #4 - Hot Take (with Data) */}
        <TemplateBlock
          title="4. Hot Take (With Data)"
          hook="Unpopular opinion: [Contrarian Belief Supported by Metric]"
          body="Lead with a strong assertion. Instantly back it with a surprising data point or trend. Explain what most miss and what your readers should do differently in response."
          cta="Agree or disagree—with data?"
          example={`Hook: Unpopular opinion: “Likes” on LinkedIn are now nearly worthless. Comments drive all discovery.\n\nBody: Internal data from our 2026 pilot: posts with 3+ genuine comments get 7x the profile views, 13x messages. The algorithm is watching conversations, not just clicks.\n\nCTA: Agree—or do likes still matter to you?"`}
          accent="from-amber-500/20 via-pink-500/10 to-black/70"
        />

        {/* #5 - Behind-the-Scenes Breakdown */}
        <TemplateBlock
          title="5. Behind-the-Scenes Breakdown"
          hook="Ever wondered how [Person/Team] actually does [Cool Thing]?"
          body="Reveal your genuine process—struggles, tools, mindset shifts, even mistakes. Include unexpected lessons or favorite tools, aiming for relatability and transparency."
          cta="Want the full toolkit checklist? Drop a ☑️ below."
          example={`Hook: Ever wondered how I batch a month's of LinkedIn posts in 2 hours?\n\nBody: - Voice note ideas on morning walks. - Use AI to rough-draft, then rewrite for nuance. - Schedule 60% in advance; leave 2 spots open for “in the moment” trends. Mistake: automated everything before, but it killed my engagement. Workflow now = less stress, more DMs.\n\nCTA: Want this Notion template? Reply with 🙌."`}
          accent="from-blue-500/30 via-cyan-500/15 to-black/60"
        />

        {/* #6 - Open-Ended Question */}
        <TemplateBlock
          title="6. Open-Ended Question"
          hook="What's the best [Tool/Book/Lesson] you've discovered lately—and why?"
          body="Frame a broad, insightful question that invites thoughtful responses. Share your own quick answer to seed quality replies, then prompt others to contribute genuinely."
          cta="Reply with your best tip (👇) and let's crowdsource gold."
          example={`Hook: What's the best leadership lesson you've uncovered in 2026?\n\nBody: For me: “Hire for adaptability, not just experience.” It’s helped us grow through chaos this year. Curious to hear what’s shaped your journey!\n\nCTA: Comment yours—let’s help each other level up."`}
          accent="from-teal-500/20 via-cyan-800/20 to-blue-900/20"
        />

        {/* #7 - Personal Storytime */}
        <TemplateBlock
          title="7. Personal Storytime"
          hook="I almost gave up on [Goal/Challenge] until this happened…"
          body="Draw readers in with a relatable struggle. Narrate events honestly, without fluff: What was at stake? The turning point? End with the lesson learned—a takeaway readers can apply."
          cta="Anyone else been here? Share your story."
          example={`Hook: I almost quit daily posting in 2025. Felt invisible. Then a DM changed everything…\n\nBody: After 3 months of eerie silence, a new founder messaged: “I acted on your advice. Landed my biggest contract.” That *one* impact kept me going—reminded me why consistency matters. Now: posting is non-negotiable.\n\nCTA: Have you almost quit content—or did you push through?"`}
          accent="from-purple-500/20 via-pink-300/10 to-blue-900/20"
        />

        {/* #8 - Value Bomb Carousel */}
        <TemplateBlock
          title="8. Value Bomb Carousel"
          hook="Swipe for the 3 biggest lessons I learned scaling to [Milestone]"
          body="Tease a rapid-fire set of actionable tips. Each slide (or bullet) should deliver one tangible, idea-packed insight readers can use today. Ideal for multi-image carousels or list-based posts."
          cta="Which tip will you use first? Drop a number!"
          example={`Hook: Swipe for the 3 biggest client acquisition lessons from my year in consulting.\n\nBody: 1. Stop mass-DMing—personalized video intros land 8x more meetings. 2. LinkedIn posts drive most discovery, but *Profiles* close deals. 3. Nurture by offering free 10-min audits—no pitch attached.\n\nCTA: Which one is a game-changer for your flow? Comment below!"`}
          accent="from-pink-400/30 via-lime-200/10 to-blue-700/20"
        />

        {/* #9 - Myth vs. Reality */}
        <TemplateBlock
          title="9. Myth vs. Reality"
          hook="Myth: [Common Misconception]. Reality: [Truth Supported by Story/Data]."
          body="Present the myth concisely, then shatter it with evidence, a brief client story, or your own journey. End with a practical suggestion readers can adopt."
          cta="Heard this myth before? What's your take?"
          example={`Hook: Myth: Only extroverts win on LinkedIn. Reality: Listening is the real growth engine.\n\nBody: My introvert clients quietly engage 1:1 or in small communities—yet they generate more high-value leads. Engagement isn’t volume; it’s intention and timing.\n\nCTA: Does the 'quiet strength' approach work for you, too?"`}
          accent="from-violet-700/30 via-blue-700/15 to-fuchsia-500/10"
        />

        {/* #10 - Predictive Thought Leadership */}
        <TemplateBlock
          title="10. Predictive Thought Leadership"
          hook="Prediction: In [2026/Industry], [Unfolding Trend] will reshape [Key Outcome]."
          body="Make a bold, fact-based prediction about the next big thing in your field. Mention what signals you’re watching, what changes are coming, and how forward-thinkers can get ahead."
          cta="Agree? Or think different? Let’s debate in the comments."
          example={`Hook: Prediction: In 2026, personal AI avatars will replace 60% of basic client intro calls. Here’s the signal…\n\nBody: LinkedIn’s beta AI features already write and personalize messages at scale. These tools free you for high-value work—but only if used transparently. Next? AI-driven video intros, coming Q4. Early adopters are positioned to win!\n\nCTA: How are you preparing for the AI shift? Will it help or hurt real connections?"`}
          accent="from-cyan-400/30 via-blue-500/20 to-fuchsia-500/20"
        />
      </section>

      {/* Algorithm Pro Tips + LinkedIn 2026 */}
      <section className="max-w-2xl mx-auto mb-20 px-4 md:px-0">
        <GlassCard className="p-7 border-cyan-400/20 bg-gradient-to-r from-black/70 to-blue-950">
          <h3 className="text-xl text-cyan-200 mb-2 font-bold">
            Pro Tips: Turbocharge Distribution in 2026
          </h3>
          <ul className="list-disc pl-6 text-cyan-100/90 space-y-1 text-[15px] mb-2">
            <li>
              <span className="font-semibold text-cyan-300">Prime your post launch:</span> Reply instantly to first comments (the “golden 10 minutes”).
            </li>
            <li>
              <span className="font-semibold text-pink-300">Use AI content & real stories:</span> AI helps you brainstorm—but human experience gets reshared and quoted. Blend the two.
            </li>
            <li>
              <span className="font-semibold text-violet-300">Experiment with formats:</span> Alternate carousels, text, short native video, and interactive polls.
            </li>
            <li>
              <span className="font-semibold text-amber-200">Time it right:</span> 2026 data: posts at 9am or 7-9pm (reader’s local time) earn highest dwell.
            </li>
            <li>
              <span className="font-semibold text-emerald-200">Reply velocity matters:</span> LinkedIn algorithm rewards replies within 1 hour. Aim for 6–10 comments/threads.
            </li>
            <li>
              <span className="font-semibold text-pink-200">Don’t delete/edit in first 45m:</span> It tanks reach. Review, then post.
            </li>
          </ul>
          <p className="text-xs text-cyan-100/80 italic mt-2">
            Outpace competitors by acting on the data—and adapting weekly as LinkedIn continues to evolve.
          </p>
        </GlassCard>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto mb-20 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </section>

      {/* FINAL CTA SECTION - Lead Magnet */}
      <section className="flex flex-col justify-center items-center my-12 md:my-20">
        <GlassCard className="py-10 px-8 md:px-16 max-w-xl w-full flex flex-col items-center bg-gradient-to-tr from-blue-900/70 to-black/80 border border-blue-400/25 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-200 mb-3">
            Want Plug-and-Play LinkedIn Templates?
          </h2>
          <p className="text-center max-w-xl mx-auto mb-5 text-neutral-300 text-lg">
            Unlock our full 2026 template vault: <span className="text-cyan-200 font-semibold">copy-and-paste hooks, weekly planners, and engagement trackers—built for next-gen LinkedIn growth.</span>
          </p>
          <Link
            href="https://forms.gle/lead-magnet-link" // Replace with actual lead magnet sign-up or Formspree when live
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-400 transition-colors"
          >
            Get the 2026 LinkedIn Framework Vault →
          </Link>
          <p className="mt-3 text-xs text-neutral-400 italic">
            No spam. One-click unsubscribe anytime.
          </p>
        </GlassCard>
      </section>

      {/* FOOTER */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500">© 2026 Executive Studio. Crafted for creators who lead.</span>
      </footer>
    </main>
  );
}