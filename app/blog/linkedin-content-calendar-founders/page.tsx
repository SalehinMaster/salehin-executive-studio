"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- GLASSCARD COMPONENT ---
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-blue-400/15 bg-gradient-to-br from-blue-900/55 to-neutral-900/70 shadow-xl backdrop-blur-2xl p-7 md:p-12 mb-8 ${className}`}
    >
      {children}
    </div>
  );
}

// --- FAQ ACCORDION ---
const faqItems = [
  {
    question: "Can I schedule LinkedIn posts directly, or do I need a tool?",
    answer:
      "LinkedIn now allows native scheduling for personal profiles and pages (with most formats), but advanced tools like Buffer, Hootsuite, or Taplio unlock analytics, auto-rescheduling, smart queues, and team collaboration—essential for batching at scale.",
  },
  {
    question: "What’s the safest way to automate comments or DMs?",
    answer:
      "Avoid mass automation for comments/DMs, as LinkedIn may flag aggressive activity. For robust yet compliant workflows, manually batch genuine engagement, or use trusted tools with throttling and human review for outreach (try Alfred, LaGrowthMachine, or Dripify).",
  },
  {
    question: "How do I keep content fresh if I batch 4 weeks ahead?",
    answer:
      "Use 10-20% of your calendar for “timely slots”: allocate 1-2 posts/week to react to real-time trends. Block 30 minutes each Friday to adjust or swap posts before they’re published.",
  },
  {
    question: "Is it risky to repeat post formats or topics?",
    answer:
      "No—repetition done strategically strengthens your brand. Mix core themes with rotating hooks, story formats, or visuals. Use analytic reviews every month to remix top performers with fresh angles.",
  },
  {
    question: "What’s the best day/time to post for visibility?",
    answer:
      "Peak windows for founders are typically Tue-Thurs, 7–10am or 3–6pm in your target audience's timezone. However, variance is high—let data guide you. Most scheduling tools suggest your best times based on engagement history.",
  },
];

// --- WEEKLY CONTENT MATRIX DATA ---
const contentMatrix = [
  {
    week: "Week 1",
    posts: [
      {
        type: "Origin Story",
        format: "Text + Photo",
        description:
          "Share a pivotal founder moment or ‘origin insight’. Personal narrative, image of early days or milestone.",
      },
      {
        type: "Teachable Failure",
        format: "Carousel",
        description:
          "Break down a recent setback and the lesson learned. Use a 5-slide carousel with actionable takeaways.",
      },
      {
        type: "Market Trend POV",
        format: "Text",
        description:
          "Quick, authoritative response to trending news or a new tool in your industry.",
      },
      {
        type: "Team/Process Highlight",
        format: "Photo + Caption",
        description:
          "Showcase behind-the-scenes: systems, culture ops, or introduce a key teammate.",
      },
    ],
  },
  {
    week: "Week 2",
    posts: [
      {
        type: "Customer Success",
        format: "Text + Graphic",
        description:
          "Tell a story about a customer transformation, focusing on the before-and-after.",
      },
      {
        type: "Myth Busting",
        format: "Carousel",
        description:
          "Address 3-5 common misconceptions in your space—with data or firsthand experience.",
      },
      {
        type: "AMA / Q&A",
        format: "Text",
        description:
          "Answer a frequently asked founder/industry question in depth—tag contributors if appropriate.",
      },
      {
        type: "LinkedIn Audio/Video",
        format: "Short Video",
        description:
          "Share a 1-2 minute video on leadership, mental models, or your decision framework.",
      },
    ],
  },
  {
    week: "Week 3",
    posts: [
      {
        type: "Milestone Update",
        format: "Photo + Text",
        description:
          "Update on a company achievement or growth metric, framed around learnings—not bragging.",
      },
      {
        type: "Resource Share",
        format: "Carousel/Link",
        description:
          "Recommend a toolkit, book, or framework. Download link or carousel with summaries.",
      },
      {
        type: "Vulnerability Post",
        format: "Text",
        description:
          "Open up about a challenge you’re working through now. Authenticity builds loyalty.",
      },
      {
        type: "Customer/Community Feature",
        format: "Image/Quote",
        description:
          "Spotlight a customer win, community member, or team quote with their permission.",
      },
    ],
  },
  {
    week: "Week 4",
    posts: [
      {
        type: "Personal Rituals",
        format: "Photo + Text",
        description:
          "Share a daily/weekly habit that helps you perform: journaling, exercise, leadership cadence.",
      },
      {
        type: "Industry Data Drop",
        format: "Graphic",
        description:
          "Share proprietary data, infographic, or recent poll with commentary.",
      },
      {
        type: "Ask/Engagement",
        format: "Text",
        description:
          "Invite audience opinions, e.g., 'What’s your #1 challenge right now?' (great for DM pipeline).",
      },
      {
        type: "Reflection / Upcoming",
        format: "Text/Photo",
        description:
          "Recap the month’s learnings and hint at what’s coming next. Humanize future plans.",
      },
    ],
  },
];

// --- VISUAL CONTENT MATRIX COMPONENT ---
function WeeklyMatrix() {
  const [selectedWeek, setSelectedWeek] = useState(0);

  return (
    <GlassCard className="mt-4 mb-8 bg-gradient-to-tr from-blue-950/80 to-neutral-900/90 border-blue-400/25">
      <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-200 text-center">
        4-Week Founders’ Content Matrix
      </h2>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {contentMatrix.map((w, idx) => (
          <button
            key={w.week}
            onClick={() => setSelectedWeek(idx)}
            className={`px-4 py-2 rounded-xl font-semibold transition 
              ${
                selectedWeek === idx
                  ? "bg-blue-700/70 text-blue-100 shadow-lg"
                  : "bg-blue-900/30 text-blue-300 hover:bg-blue-800/40"
              }`}
          >
            {w.week}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse rounded-2xl overflow-hidden text-sm">
          <thead>
            <tr className="bg-blue-950/60">
              <th className="px-4 py-2 text-left text-blue-200 font-semibold">Post Type</th>
              <th className="px-4 py-2 text-blue-200 font-semibold">Format</th>
              <th className="px-4 py-2 text-blue-200 font-semibold">What to Share</th>
            </tr>
          </thead>
          <tbody>
            {contentMatrix[selectedWeek].posts.map((post, idx) => (
              <tr
                key={post.type}
                className={`${
                  idx % 2 === 0 ? "bg-blue-900/30" : "bg-blue-900/10"
                } border-b border-blue-700/10`}
              >
                <td className="px-4 py-3 text-cyan-100 font-medium">{post.type}</td>
                <td className="px-4 py-3 text-blue-200">{post.format}</td>
                <td className="px-4 py-3 text-neutral-200">{post.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-neutral-400 text-center italic">
        Tip: Mix weeks for variety, but batching these ~4 post types weekly keeps your brand fresh and scalable.
      </p>
    </GlassCard>
  );
}

// --- BATCH PROCESS GUIDE ---
function BatchProcessingSection() {
  return (
    <GlassCard className="mt-2 bg-gradient-to-tr from-blue-950/80 to-neutral-900/80 border-blue-400/20">
      <h2 className="text-xl md:text-2xl font-bold text-blue-200 mb-3">
        Sustainable Batching & Scheduling: The 4-Week Founder Framework
      </h2>

      <ol className="list-decimal pl-7 mb-5 text-neutral-200 space-y-5">
        <li>
          <span className="font-bold text-blue-100">
            Block 90 Minutes Per Week (“Founder Power Hour”)
          </span>
          <br />
          <span className="text-neutral-400 text-sm">
            Friday or Sunday, no notifications. One session to brainstorm, outline, and draft four upcoming posts—aligned with business initiatives and team priorities.
          </span>
        </li>
        <li>
          <span className="font-bold text-blue-100">
            Use a Repeatable Content Matrix
          </span>
          <br />
          <span className="text-neutral-400 text-sm">
            Rotate four core types: 1 personal story, 1 tactical playbook or ‘how-to’, 1 industry POV, 1 milestone/customer highlight. Templates keep ideation time minimal.
          </span>
        </li>
        <li>
          <span className="font-bold text-blue-100">
            Batch Drafting: Iterate Fast, Polish Later
          </span>
          <br />
          <span className="text-neutral-400 text-sm">
            Draft “raw” first—bullets and voice notes work. Edit the entire batch in one 30-minute sitting (Monday AM, before meetings, is ideal for clarity).
          </span>
        </li>
        <li>
          <span className="font-bold text-blue-100">
            Schedule Natively or Use Tools
          </span>
          <br />
          <span className="text-neutral-400 text-sm">
            Upload all 4 posts for the week to LinkedIn’s built-in scheduler—or use a trusted tool for auto-queueing and smart time slots (see FAQ below).
          </span>
        </li>
        <li>
          <span className="font-bold text-blue-100">
            Weekly Realignment: Hot Swap as Needed
          </span>
          <br />
          <span className="text-neutral-400 text-sm">
            Leave 1 slot “flex” for current events or inside insights. Review analytics briefly each Friday, and adjust the following week’s matrix to double down on what’s working best.
          </span>
        </li>
      </ol>

      <div className="text-cyan-300 font-semibold mb-2">Batching cheat codes for busy execs:</div>
      <ul className="list-disc pl-7 space-y-2 text-sm text-cyan-200 mb-3">
        <li>Voice memo your stories during commutes, then transcribe in Notion/Obsidian.</li>
        <li>Save post templates/snippets in a “swipe file” for rapid idea reuse.</li>
        <li>Use AI to generate first drafts or headlines, then edit for your authentic voice.</li>
        <li>Batch image selection/screenshotting using cloud folders for easy drag-and-drop.</li>
        <li>Appoint a VA or marketer to schedule/queue posts on your behalf if timing is tight.</li>
      </ul>
    </GlassCard>
  );
}

// --- PAGE COMPONENT ---
export default function LinkedInContentCalendarForFoundersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-blue-950 to-black text-neutral-100 py-2 px-0">
      {/* --- HERO SECTION --- */}
      <section className="max-w-3xl mx-auto mt-12 mb-10 px-4">
        <GlassCard className="bg-gradient-to-tr from-blue-950/80 to-blue-900/90 border-blue-400/25">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-100 mb-3 text-center">
            LinkedIn Content Calendar for Busy Founders
          </h1>
          <p className="mb-4 text-lg text-neutral-300 text-center">
            <span className="text-cyan-200 font-semibold">Never go blank on LinkedIn again—</span>
            here’s the proven 4-week batching and scheduling framework so top founders build audience, reputation, and inbound opportunities (without losing focus on running the business).
          </p>
          <p className="mb-2 text-blue-300 text-base text-center font-medium">
            Designed for high-achieving executives, this guide will transform your content process into an asset, not an obligation.
          </p>
        </GlassCard>
      </section>

      {/* --- CONTENT MATRIX --- */}
      <section className="max-w-5xl mx-auto px-4">
        <WeeklyMatrix />
      </section>

      {/* --- BATCH PROCESS GUIDE --- */}
      <section className="max-w-4xl mx-auto px-4">
        <BatchProcessingSection />
      </section>

      {/* --- TOOLS + FAQ --- */}
      <section className="max-w-3xl mx-auto px-4 mb-14">
        <GlassCard className="bg-gradient-to-tr from-blue-950/80 to-neutral-900/80 border-blue-400/20">
          <h2 className="text-xl md:text-2xl font-bold text-blue-200 mb-3">
            Scheduling Tools & Workflow FAQ
          </h2>
          <FAQAccordion items={faqItems} />
          <div className="mt-7 mb-2 text-sm text-neutral-300">
            <span className="font-semibold text-cyan-200">Pro Tip:</span>{" "}
            Integrate LinkedIn analytics with Google Sheets or Notion to cut manual KPI tracking time in half. Review post performance monthly and update your content matrix accordingly.
          </div>
        </GlassCard>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="flex flex-col items-center my-20 px-4">
        <GlassCard className="py-10 px-8 md:px-16 max-w-xl w-full flex flex-col items-center bg-gradient-to-r from-blue-900/70 to-black/85 border border-blue-400/25 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-200 mb-3">
            Download the Executive LinkedIn Content Calendar Template (2026)
          </h2>
          <p className="text-center max-w-xl mx-auto mb-5 text-neutral-300 text-lg">
            Get our plug-and-play, 4-week Google Sheets + Notion template (optimized for founders & teams) with built-in post prompt, analytics, and batching tracker.
          </p>
          <Link
            href="https://forms.gle/exec-content-calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-400 transition-colors"
          >
            Grab the Calendar & Prompts →
          </Link>
          <p className="mt-3 text-xs text-neutral-400 italic">
            Free for founders. No spam, ever. One-click unsubscribe available.
          </p>
        </GlassCard>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for founders who lead with impact.
        </span>
      </footer>
    </main>
  );
}

// --- FAQ ACCORDION COMPONENT ---
function FAQAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-blue-800/40">
      {items.map((item, idx) => (
        <div key={item.question} className="py-2">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full text-left px-0 py-2 flex items-center justify-between text-blue-100 font-semibold focus:outline-none"
            aria-expanded={openIndex === idx}
            aria-controls={`faq-content-${idx}`}
          >
            <span>{item.question}</span>
            <span className="ml-3 text-blue-300 text-lg select-none">
              {openIndex === idx ? "–" : "+"}
            </span>
          </button>
          <div
            id={`faq-content-${idx}`}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === idx ? "max-h-96 mt-1 opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={openIndex !== idx}
          >
            <p className="pl-1 pr-1 text-neutral-200 text-sm mb-1">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}