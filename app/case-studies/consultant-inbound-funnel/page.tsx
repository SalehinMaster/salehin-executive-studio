"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- GLASS CARD COMPONENT ---
function GlassCard({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_4px_40px_6px_rgba(80,120,255,0.08)] p-6 md:p-9 my-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// --- PREMIUM CONSULTATION CTA ---
function BookConsultationCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate async
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  }

  return (
    <GlassCard className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900/70 to-blue-950/20 border-blue-500/25 animate-fade-in">
      <span className="text-blue-200 uppercase text-xs tracking-widest font-semibold mb-4">
        Application-Only: <span className="text-blue-300 font-bold">Limited to 5 New Clients</span> Monthly
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-blue-100 mb-3 text-center drop-shadow-glow">
        Book Your Private Funnel Strategy Session
      </h2>
      <p className="text-base text-blue-100/80 mb-6 text-center">
        Advisory calls are <span className="text-blue-300/90">high-integrity, non-pitch</span> and designed for serious experts scaling to premium retainer revenue.
      </p>
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-3 animate-fade-in"
          autoComplete="off"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2 bg-[#191e2c]/50 border border-blue-600/20 text-blue-100 placeholder:text-blue-200/40 focus:outline-none focus:border-blue-400/60 transition"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2 bg-[#191e2c]/50 border border-blue-600/20 text-blue-100 placeholder:text-blue-200/40 focus:outline-none focus:border-blue-400/60 transition"
          />
          <input
            type="text"
            name="company"
            required
            placeholder="Your Company or Niche"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2 bg-[#191e2c]/50 border border-blue-600/20 text-blue-100 placeholder:text-blue-200/40 focus:outline-none focus:border-blue-400/60 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl px-6 py-3 bg-gradient-to-r from-blue-400/90 via-blue-700/80 to-cyan-400 font-bold text-base text-black shadow-lg transition-all hover:scale-105 hover:brightness-110 ring-1 ring-blue-300/40 neon-glow flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="loader loader-blue mr-2" />
                Sending...
              </>
            ) : (
              "Apply for Consultation →"
            )}
          </button>
          <p className="text-xs text-blue-200/60 text-center mt-2">
            Zero spam. Applications reviewed within 24h.
          </p>
        </form>
      ) : (
        <div className="w-full text-center mt-4 animate-fade-in">
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-cyan-300 mx-auto mb-1 drop-shadow-[0_1px_12px_#4aedff77]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" className="stroke-cyan-200/40" />
            <path d="M7 13.5l3 3 6-6" className="stroke-cyan-300" />
          </svg>
          <p className="text-base text-cyan-200 font-semibold">
            Application Received.<br />
            We’ll reach out to schedule your session!
          </p>
          <p className="text-xs text-blue-200/60">For urgent requests, <Link href="/contact" className="underline text-cyan-200 hover:text-blue-300">contact us</Link>.</p>
        </div>
      )}
    </GlassCard>
  );
}

// --- MAIN PAGE ---
export default function ConsultantInboundFunnelPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0c0c18] via-[#11162c] to-[#0a1122] flex flex-col relative pb-20">
      {/* --- HEADER HERO --- */}
      <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-7 md:gap-12 items-center justify-between mt-7 md:mt-16 animate-fade-in">
        <div className="flex-1">
          <GlassCard className="bg-gradient-to-br from-blue-900/70 to-indigo-900/30 border-blue-700/20 shadow-[0_2px_26px_2px_#3ecaff22] px-7 py-9 md:py-12 md:px-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-50 drop-shadow-glow mb-4 md:mb-6 leading-tight text-balance">
              How a High-Ticket Consultant Automated a 100% Inbound Lead Funnel to Book <span className="text-blue-300">15+ Retainer Clients</span> a Month
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 mb-2 md:mb-0">
              A behind-the-scenes, actionable breakdown: Content → Trust → Qualification → Script → Closed deals. Built for the elite expert, executive advisor, or $5k+/mo consultant.
            </p>
          </GlassCard>
        </div>
        <BookConsultationCTA />
      </section>

      {/* --- INBOUND CONTENT CALENDAR BREAKDOWN --- */}
      <section className="w-full max-w-4xl mx-auto mt-12">
        <GlassCard className="bg-gradient-to-br from-[#16203a]/90 to-blue-900/40 border-blue-700/20">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" className="stroke-cyan-200/40" />
              <path d="M7 13.5l3 3 6-6" className="stroke-cyan-300" />
            </svg>
            The Inbound Content Calendar That Did The Work
          </h2>
          <div className="text-blue-100/90 text-base leading-relaxed">
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>
                <span className="font-bold text-cyan-200">Mondays:</span> "Branded Results" carousels—showcasing client wins, analytics, and transformation screenshots.
              </li>
              <li>
                <span className="font-bold text-cyan-200">Wednesdays:</span> "Authority POV" posts—clear opinions & frameworks, planting the seed of executive expertise.
              </li>
              <li>
                <span className="font-bold text-cyan-200">Fridays:</span> "Buyer Signals" stories—screenshots of DMs, call feedback, onboarding docs; proof that high-caliber buyers are taking action.
              </li>
              <li>
                <span className="font-bold text-cyan-200">Extras:</span> Live teardown sessions, community Q&As, and case study replays for organic event-based surges.
              </li>
            </ul>
            <div className="text-cyan-200/80 italic text-sm">
              <span className="font-semibold text-cyan-300">Result:</span> DM and call requests spiking within 60-72 hours of each new "momentum" post. Zero cold outreach.
            </div>
          </div>
        </GlassCard>
      </section>

      {/* --- LINKEDIN PROFILE TRUST FUNNEL ANALYSIS --- */}
      <section className="w-full max-w-4xl mx-auto">
        <GlassCard className="bg-gradient-to-br from-[#131c2c]/95 to-cyan-900/40 border-cyan-700/20">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-100 mb-1 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" className="stroke-blue-200/40" />
              <path d="M8 12l2.5 2.5L16 9" className="stroke-blue-400" />
            </svg>
            Trust Layers: Profile Funnel That Converts Inbound
          </h2>
          <ol className="list-decimal ml-7 space-y-2 mb-3 text-base text-blue-100/85">
            <li>
              <span className="font-semibold text-blue-300">Banner Value Proposition:</span>{" "}
              Instantly positions the offer to founders, executives, or niche experts.
            </li>
            <li>
              <span className="font-semibold text-blue-300">Headline with Proof Points:</span>{" "}
              Quantifiable wins, niche clarity, and unique methodology.
            </li>
            <li>
              <span className="font-semibold text-blue-300">Featured Section “CTA”:</span>{" "}
              Directs to case studies, results videos, or application page.
            </li>
            <li>
              <span className="font-semibold text-blue-300">Recent Content Alignment:</span>{" "}
              Every post reinforces your position, premium segment, and specialty.
            </li>
            <li>
              <span className="font-semibold text-blue-300">DMs & Connection Flow:</span>{" "}
              Warm, credibility-driven first touch—no hard sell, only value add.
            </li>
          </ol>
          <div className="text-blue-200/80 text-sm italic">
            <span className="font-semibold text-blue-300">Key:</span> Remove friction. Every profile asset answers: “Why trust you with my $5k–$10k/mo?”
          </div>
        </GlassCard>
      </section>

      {/* --- LEAD-QUALIFICATION METRICS LAYOUT --- */}
      <section className="w-full max-w-4xl mx-auto">
        <GlassCard className="bg-gradient-to-br from-blue-950/90 to-cyan-950/40 border-cyan-700/25">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-100 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" className="stroke-cyan-200/40" />
              <path d="M7 13.5l3 3 6-6" className="stroke-cyan-400" />
            </svg>
            Qualification: Metrics That Screen $5k+ Retainers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 text-center py-4">
            <div>
              <div className="text-3xl font-black text-cyan-200 drop-shadow-glow">63%</div>
              <div className="text-sm text-blue-100/80">Inbound DM-to-Call Ratio</div>
              <div className="text-xs text-cyan-200/70 mt-1">from profile, not cold email</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-200 drop-shadow-glow">87%</div>
              <div className="text-sm text-blue-100/80">Qualifying Form Completion</div>
              <div className="text-xs text-cyan-200/70 mt-1">prospects who fill response form</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-200 drop-shadow-glow">15+</div>
              <div className="text-sm text-blue-100/80">Monthly Premium Clients</div>
              <div className="text-xs text-cyan-200/70 mt-1">closed (100% inbound, $5k–$10k/mo)</div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* --- HIGH-TICKET SALES SCRIPT FRAMEWORK CARDS --- */}
      <section className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* 1: Discovery Script */}
          <GlassCard className="bg-gradient-to-br from-[#142437]/70 to-cyan-950/30 border-cyan-600/20">
            <h3 className="text-lg font-bold text-cyan-200 mb-2">Discovery Call: Script Outline</h3>
            <ol className="list-decimal ml-5 text-blue-100/85 space-y-1 text-base">
              <li><strong className="text-cyan-300">Opening:</strong> “Quick intro—what triggered you to reach out?” <span className="text-xs text-cyan-200/60">(Establish context)</span></li>
              <li><strong className="text-cyan-300">Deep Dive:</strong> “If we were working together, what would ‘success’ look like?”</li>
              <li><strong className="text-cyan-300">Fit Check:</strong> “Are you prepared to invest at a premium to solve this in the next 2–4 weeks?”</li>
              <li><strong className="text-cyan-300">Close:</strong> “If we both agree there’s a fit, next step is to kick off onboarding—should we review details?”</li>
            </ol>
          </GlassCard>
          {/* 2: Objection Handling */}
          <GlassCard className="bg-gradient-to-br from-[#101627]/80 to-blue-950/25 border-blue-600/20">
            <h3 className="text-lg font-bold text-cyan-200 mb-2">Objection Handling: Premium Buyer</h3>
            <ul className="list-disc ml-5 text-blue-100/85 space-y-1 text-base">
              <li>
                <strong className="text-cyan-300">“I need to think...” →</strong>{" "}
                “Absolutely, this needs to feel right. Is there any piece you’d want more clarity on before making a decision?”
              </li>
              <li>
                <strong className="text-cyan-300">“Can you send more proof?” →</strong>{" "}
                “Happy to share another client story or metric. Would seeing a revenue jump or process doc help you most?”
              </li>
              <li>
                <strong className="text-cyan-300">“Budget feels tight...” →</strong>{" "}
                “My best clients see ROI within the first month. Want to talk through a phased start or value milestone?”
              </li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full mt-20 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for high-trust consultants who <span className="text-blue-300">dominate their niche with inbound</span>.
        </span>
      </footer>

      {/* --- Minimal CSS for glass, animation, neon glow, loader --- */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-16px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.38s cubic-bezier(.38,1.26,.41,1) both;
        }

        .neon-glow {
          box-shadow: 0 0 22px 2px #3ecaff99, 0 0 8px 1px #dcfeff22;
        }
        .drop-shadow-glow {
          text-shadow: 0 1px 22px #b0e7ff66, 0 1px 8px #95deff55;
        }
        .loader, .loader-blue {
          display: inline-block; width: 1.25rem; height: 1.25rem;
          border-radius: 9999px;
          border: 3px solid #2ad7ec77;
          border-right-color: transparent !important;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg);}
        }
      `}</style>
    </main>
  );
}