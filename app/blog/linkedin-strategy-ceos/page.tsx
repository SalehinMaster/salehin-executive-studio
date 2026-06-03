"use client";

import React from "react";
import Link from "next/link";

// Assume GlassCard is a project-shared luxury glassmorphism wrapper
import { GlassCard } from '../../../src/components/ui/glass-card';

// Executive FAQ data
const faqItems = [
  {
    question: "How can CEOs maintain privacy while building a visible brand on LinkedIn?",
    answer: (
      <>
        Balancing executive presence with privacy starts by distinguishing between <strong>public leadership themes</strong> (vision, values, strategy) and <strong>private personal details</strong>. Share compelling professional insights and industry commentary, but audit all posts, profile details, and interactions for personal data exposure. Pro-actively curate connections. Use LinkedIn’s privacy settings and regularly review activity logs. Consider separating inner-circle updates (shared in private groups or DMs) from your main feed.
      </>
    ),
  },
  {
    question: "What’s the most effective content formula for executive LinkedIn engagement in 2026?",
    answer: (
      <>
        Layer two approaches: <br />
        1. <strong>Signature Frameworks</strong>: Serial, value-dense posts mapping your core leadership playbooks. Example: a Monday ‘CEO Mindset Minute’ dissecting one actionable leadership habit each week.<br />
        2. <strong>Real-Time Authority</strong>: Timely, AI-assisted commentary on pivotal industry events—demonstrating you’re in sync with macro trends, not just repeating platitudes.<br />
        Blend these for both ‘evergreen’ search traffic and daily topical reach.
      </>
    ),
  },
  {
    question: "How do I position myself as a thought leader without coming across as self-promotional?",
    answer: (
      <>
        Elevate others first. Analyze future trends, draw strategic connections, and cite the success of executives in your network. Use collaborative posts and acknowledge contributors. Center your narrative on community impact and results, not just personal achievements.
      </>
    ),
  },
  {
    question: "What role does AI play in LinkedIn reputation management for CEOs?",
    answer: (
      <>
        In 2026, AI enhances your velocity and vigilance. Automate <strong>post scheduling, engagement tracking, and social listening</strong>. Deploy LLM-based brand risk detection to flag sensitive comments or off-message reactions before they escalate. Use AI-driven analytics to measure message resonance and identify rising audience issues worth addressing.
      </>
    ),
  },
  {
    question: "Should CEOs respond to negative or controversial LinkedIn comments?",
    answer: (
      <>
        Addressing criticism signals accountability—but only when done with clarity and empathy. Develop a decision matrix: Respond thoughtfully to legitimate feedback, but disengage from obvious misinformation or bait. When in doubt, have a comms specialist pre-draft response templates and keep your tone impeccable.
      </>
    ),
  },
];

// Metric highlights for credibility
const metricData = [
  {
    label: "Avg. 2026 CEO LinkedIn Post Reach",
    value: "86,000+",
    accent: "from-cyan-400 to-blue-400",
    description:
      "Top-performing CEOs see exponential reach when leveraging AI-powered frameworks and premium authority layouts.", 
  },
  {
    label: "Clients Attracted via Executive LinkedIn Profiles (Yearly)",
    value: "7.3x",
    accent: "from-blue-600 to-violet-400",
    description:
      "CEOs deploying intentional authority-building strategies see a 7x higher rate in high-ticket client acquisition.", 
  },
  {
    label: "Profile Views by Industry Influencers",
    value: "+420%",
    accent: "from-pink-400 via-violet-400 to-blue-400",
    description:
      "Data shows a >4x spike in strategic profile visits when thought leadership and social proof are prioritized.",
  },
];

// FAQ Accordion Component
function FAQAccordion({ items } : { items: typeof faqItems }) {
  const [openIndex, setOpenIndex] = React.useState<null|number>(null);

  return (
    <div className="divide-y divide-neutral-800 bg-black/10 rounded-xl shadow-inner">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left px-3 focus:outline-none text-lg font-medium text-blue-200 hover:text-cyan-300 transition-colors"
            aria-expanded={openIndex === i}
          >
            {item.question}
            <span className="ml-3 text-cyan-400">{openIndex === i ? "–" : "+"}</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 px-3 pb-3 ${
              openIndex === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            } text-neutral-200 text-base`}
          >
            {openIndex === i && <div>{item.answer}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LinkedInStrategyCEOsPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#050c14] via-[#181d23]/80 to-[#02070d] relative pb-8 px-0">
      {/* HERO */}
      <section className="relative py-16 md:py-28 flex flex-col items-center z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-indigo-700/10 to-black/0 pointer-events-none blur-[120px]"></div>
        <GlassCard className="max-w-4xl w-full mx-auto py-12 px-8 md:px-20 bg-gradient-to-br from-blue-950/60 to-neutral-950/80 border border-cyan-400/20 shadow-xl flex flex-col items-center text-center backdrop-blur-xl">
          <h1 className="font-extrabold text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-300 drop-shadow-glow mb-6">
            LinkedIn Personal Branding Strategy for CEOs <span className="inline-block animate-pulse text-cyan-500/90">2026</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-neutral-100/90 mb-5 leading-relaxed max-w-2xl mx-auto">
            <span className="text-cyan-200 font-semibold">Stand out. Shape your sector. Build trust—at scale.</span> 
            <br /><br />
            Discover the <strong>next generation of authority frameworks</strong> and AI-driven reputation management strategies engineered exclusively for C-suite leaders ready to dominate 2026’s digital landscape.
          </p>
          <Link
            href="#consult"
            className="inline-block mt-5 px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-800 to-blue-700 text-white font-bold text-lg transition-colors hover:from-cyan-600 hover:to-blue-400 shadow-lg border border-cyan-400/30"
          >
            Book a Private Consultation
          </Link>
        </GlassCard>
      </section>

      {/* METRICS */}
      <section className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto mt-6 md:mt-10 justify-center z-10 relative">
        {metricData.map((card, idx) => (
          <GlassCard
            key={card.label}
            className={`
              flex-1 min-w-[240px]
              px-7 py-8
              bg-gradient-to-br ${card.accent}
              bg-opacity-20 border border-blue-400/10
              shadow-lg
              flex flex-col items-center
              transition-transform hover:scale-[1.025]
            `}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-cyan-100 mb-2 drop-shadow-neon-blue">{card.value}</div>
            <div className="text-base md:text-lg font-medium text-blue-200/90 mb-1 text-center">{card.label}</div>
            <div className="text-xs text-cyan-100/70 text-center">{card.description}</div>
          </GlassCard>
        ))}
      </section>

      {/* CONTENT */}
      <article className="max-w-3xl mx-auto my-20 px-4 md:px-0 text-neutral-100">
        {/* SECTION: The 2026 CEO Branding Playbook */}
        <section className="mb-16">
          <GlassCard className="p-8 bg-gradient-to-br from-blue-900/70 to-neutral-900/80 border-cyan-500/20 shadow-inner">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-200/90">
              The 2026 CEO LinkedIn Branding Playbook
            </h2>
            <p className="mb-4 font-medium text-neutral-100/90 leading-relaxed">
              For today’s executive, LinkedIn is more than a digital resume. It’s the <strong>epicenter of influence</strong> where partnerships are born, clients are won, and a CEO’s vision is amplified on a global stage. But 2026’s landscape brings a fresh set of challenges: <span className="text-cyan-300 font-semibold">sharp AI algorithms</span>, rapidly evolving <span className="text-blue-300 font-semibold">stakeholder expectations</span>, and a new kind of strategic privacy risk.
            </p>
            <p className="mb-5 text-neutral-300/90">
              <strong>Here’s how elite CEOs are building unassailable digital authority—while safeguarding reputation and accelerating business growth:</strong>
            </p>

            <ol className="space-y-7 pl-2 border-l-2 border-cyan-600/20">
              <li>
                <span className="font-bold text-cyan-300">1. Design a “Signature Framework” Content Series</span>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-cyan-100/80">
                  <li>
                    Articulate three-to-five proprietary frameworks that anchor your leadership style: e.g., &quot;CEO Decision Stack&quot;, &quot;Next-Gen People Ops Blueprint&quot;, or &quot;Transparency Method for Scale&quot;.
                  </li>
                  <li>
                    Convert these into serialized posts: one framework per week, delivered as a combination of quick video bites and in-depth carousel essays with strong visual cues.
                  </li>
                  <li>
                    Leverage LinkedIn’s 2026 AI writing assist to experiment with tone and optimize reach to your target industry cohorts.
                  </li>
                </ul>
              </li>

              <li>
                <span className="font-bold text-cyan-300">2. Dominate Search &amp; Conversation with AI-Powered Thought Leadership</span>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-cyan-100/80">
                  <li>
                    Use AI tools for keyword and topic intent clustering. Target 2026’s hottest executive-level queries: <strong>“AI governance for boards”</strong>, <strong>“leadership in an LLM-native era”</strong>, or <strong>“enterprise AI ethics frameworks”</strong>.
                  </li>
                  <li>
                    Automate distribution—schedule your pillar content to drop at optimal times using predictive engagement models.
                  </li>
                  <li>
                    “Listen” at scale: AI-based social listening for new partner opportunities and red-flag narratives before they can harm your corporate or personal brand.
                  </li>
                </ul>
              </li>

              <li>
                <span className="font-bold text-cyan-300">3. Safeguard Executive Privacy Without Sacrificing Impact</span>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-cyan-100/80">
                  <li>
                    Audit all LinkedIn data fields, posts, and connection settings quarterly. Redact private or legacy information surfaced by advanced data aggregation tools.
                  </li>
                  <li>
                    Separate company news and personal philosophy. Use Stories and Events for select inner-circle updates, keeping your main feed executive but non-intimate.
                  </li>
                  <li>
                    Establish an incident response plan: What’s your protocol if confidential business becomes public in a viral post? Prebuild communication templates for critical scenarios.
                  </li>
                </ul>
              </li>

              <li>
                <span className="font-bold text-cyan-300">4. Elevate Social Proof and Authority Signals</span>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-cyan-100/80">
                  <li>
                    Curate third-party credibility: podcasts, published interviews, and conference appearances. Feature these at the top of your LinkedIn profile in a “Press &amp; Media” carousel, leveraging LinkedIn’s new 2026 embed features.
                  </li>
                  <li>
                    Encourage your executive team and industry peers to “vouch” with micro-endorsements and ‘Skills for the Future’ badges.
                  </li>
                </ul>
              </li>

              <li>
                <span className="font-bold text-cyan-300">5. Implement C-Suite Engagement Rituals</span>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-cyan-100/80">
                  <li>
                    Set a recurring block (e.g., <strong>30 minutes every Tuesday</strong>) for genuine engagement: deep-dive comments on partner posts, inviting private DMs, and sharing “unscripted” leadership lessons.
                  </li>
                  <li>
                    Reward high-value commenters with follow-backs or offers to connect offline, boosting both reach and trust.
                  </li>
                </ul>
              </li>
            </ol>
          </GlassCard>
        </section>
        
        {/* SECTION: Future-Proof Content Frameworks */}
        <section className="mb-16">
          <GlassCard className="p-8 bg-gradient-to-br from-cyan-900/70 to-neutral-900/80 border-cyan-500/20 shadow-inner">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-200">
              Future-Proof Content Frameworks for CEOs
            </h2>
            <p className="mb-4 text-neutral-100/90">
              Today’s generic “announce-and-forget” leadership posts are obsolete. Executives seeing outsized impact from LinkedIn in 2026 share content through <strong>three future-proof frameworks</strong>:
            </p>
            <ul className="list-decimal pl-6 text-cyan-100/90 space-y-3">
              <li>
                <strong>Executive Anchor Narratives</strong> — Stories of pivotal board decisions, milestone partnerships, or overcoming sector crises, always tied back to your personal playbook.
              </li>
              <li>
                <strong>AI-Powered Industry Telemetry</strong> — Weekly/biweekly insight reports built from synthesized AI industry listening, flagging the five shifts that matter most to your audience.
              </li>
              <li>
                <strong>The Vision-to-Execution Series</strong> — Play-by-play breakdowns (video or carousel) of how your team operationalizes abstract strategy, making your thought leadership tangible and credible.
              </li>
            </ul>
            <p className="mt-5 text-cyan-100/80 text-xs italic">
              <span className="font-semibold text-cyan-300">Pro Tip:</span> CEOs who systematize story distribution across text, visuals, and video in 2026 report 41% higher “top-of-funnel” investor and partner inquiries.
            </p>
          </GlassCard>
        </section>

        {/* SECTION: Authority, Privacy & AI Reputation */}
        <section className="mb-16">
          <GlassCard className="p-8 bg-gradient-to-br from-violet-900/70 to-neutral-900/80 border-cyan-500/20 shadow-inner">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-200">
              Authority, Privacy, and the Rise of AI-Driven Executive Reputation
            </h2>
            <p className="mb-4 font-medium text-neutral-100/90">
              <span className="text-cyan-200 font-semibold">Reputation is fragile</span>—and in 2026’s LLM-native world, it can shift in hours. CEOs must proactively manage reputation across five touchpoints:
            </p>
            <ul className="list-disc pl-7 text-cyan-100/90 space-y-2">
              <li>
                <strong>AI Risk Monitoring:</strong> Deploy language models trained on your company’s risk lexicon to automatically detect potential issues in comments or UGC, flagging them in real-time.
              </li>
              <li>
                <strong>Sentiment Engineering:</strong> Use analytics dashboards to track shifts in post and profile sentiment. Adjust your messaging cadence based on high/low sentiment signals.
              </li>
              <li>
                <strong>Incident Response Speed:</strong> Build a toolkit for rapid communication: pre-approved posts, video address templates, and a “single source of response truth” for your team.
              </li>
              <li>
                <strong>Stakeholder Transparency:</strong> Publish regular executive recaps—think “Boardroom Insights”—to reassure partners, investors, and regulators during market volatility.
              </li>
              <li>
                <strong>Personal Brand Vault:</strong> Maintain an encrypted repository of all posts, media, and comments for internal audit and compliance reviews.
              </li>
            </ul>
            <p className="mt-4 text-cyan-100/80 text-xs italic">
              <span className="font-semibold text-cyan-400">Insight:</span> CEOs deploying AI-native reputation management systems in 2026 resolve PR issues 61% faster than traditional comms teams.
            </p>
          </GlassCard>
        </section>
      </article>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto mb-20 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Executive FAQ: LinkedIn Branding
        </h2>
        <FAQAccordion items={faqItems} />
      </section>
      
      {/* CALL TO ACTION */}
      <section id="consult" className="flex justify-center items-center my-14 md:my-24">
        <GlassCard className="py-10 md:py-14 px-7 md:px-16 max-w-2xl w-full flex flex-col items-center bg-gradient-to-tr from-blue-900/60 to-black/70 border border-blue-400/20 backdrop-blur-2xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-200 mb-3">
            Elevate Your Executive Authority
          </h2>
          <p className="text-center max-w-xl mx-auto mb-5 text-neutral-300 text-lg">
            Schedule a one-on-one strategy call. Our team specializes in building confidential, high-impact LinkedIn authority engines for C-level leaders worldwide.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-cyan-700 hover:to-blue-400 transition-colors"
          >
            Schedule My Executive Session →
          </Link>
        </GlassCard>
      </section>

      {/* FOOTER */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500">© 2026 Executive Studio. Crafted for modern leaders.</span>
      </footer>
    </main>
  );
}