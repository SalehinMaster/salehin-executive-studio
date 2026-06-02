"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// GlassCard component for premium glassmorphism look
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-gradient-to-br from-cyan-900/60 via-slate-900/60 to-black/80 border border-cyan-400/15 shadow-2xl backdrop-blur-2xl p-7 md:p-10 ${className}`}>
      {children}
    </div>
  );
}

// --- LEAD MAGNET LANDING PAGE ---
export default function ProfileChecklistLanding() {
  // State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // --- Supabase Client Init (client-side, safe) ---
  // NOTE: In prod, move keys to env + route/api; here for demo.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  // --- Form submit handler ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Basic validation
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      setErrorMsg("Please enter a valid business email.");
      setLoading(false);
      return;
    }
    try {
      const { error } = await supabase.from("leads").insert([
        {
          email,
          first_name: firstName.trim() ? firstName.trim() : null,
          source: "profile_checklist",
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      setSuccess(true);
      setEmail("");
      setFirstName("");
    } catch (err: any) {
      setErrorMsg("Could not submit. Please try again or contact us.");
    } finally {
      setLoading(false);
    }
  }

  // --- Checklist preview data ---
  const sections = [
    {
      title: "Banner / Visual Branding",
      items: [
        "Communicates your industry & positioning",
        "High-resolution, uncluttered imagery",
        "Call-to-action subtly integrated",
      ],
      icon: (
        <svg className="w-7 h-7 text-cyan-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
          <rect x="4" y="7" width="16" height="10" rx="3" className="stroke-cyan-200" />
          <path d="M4 15l3.5-4 4.5 6 3-4 5 2" className="stroke-cyan-400" />
        </svg>
      ),
    },
    {
      title: "Headline That Sells",
      items: [
        "Laser-focused value proposition",
        "Target audience named & niche clear",
        "Includes authority keywords ('Forbes', 'Advisor', '7-figure', etc.)",
      ],
      icon: (
        <svg className="w-7 h-7 text-fuchsia-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
          <path d="M12 4v16m6-8H6" className="stroke-fuchsia-200" />
        </svg>
      ),
    },
    {
      title: "About Section Mastery",
      items: [
        "Unique story hook in first two lines",
        "Concrete client outcomes & credibility drops",
        "Clear CTA: how to contact or work with you",
      ],
      icon: (
        <svg className="w-7 h-7 text-emerald-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
          <circle cx="12" cy="12" r="10" className="stroke-emerald-200" />
          <path d="M8 13s1.5 2 4 2 4-2 4-2" className="stroke-emerald-300" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#101629] via-black to-[#0d1727] flex flex-col items-center justify-start px-2 pb-10">
      {/* --- HEADER --- */}
      <header className="w-full max-w-6xl pt-14 md:pt-20 pb-2 mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 inline-block text-transparent bg-clip-text drop-shadow-lg mb-2 tracking-tight">
          Is your profile leaking inbound clients?
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg md:text-xl text-cyan-100/80 font-medium">
          Audit your LinkedIn like a top agency: Instantly spot missing trust-builders & ROI signals elite founders use to attract 6/7-figure inbound.
        </p>
      </header>

      {/* --- MAIN CONTENT --- */}
      <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-10 items-stretch justify-center mt-6 md:mt-14 px-2">
        {/* --- GLASSCARD: Checklist PREVIEW --- */}
        <GlassCard className="flex-1 min-w-[340px] max-w-lg flex flex-col justify-center bg-gradient-to-br from-cyan-950/50 to-cyan-900/20">
          <div className="mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
              <path d="M5 13l4 4L19 7" className="stroke-cyan-300" />
            </svg>
            <span className="uppercase text-xs tracking-widest text-cyan-300 font-semibold">
              Preview
            </span>
          </div>
          <h2 className="font-black text-xl md:text-2xl text-cyan-100 mt-2 mb-5">
            LinkedIn Profile Checklist
          </h2>
          <div className="space-y-4">
            {sections.map((sec) => (
              <div key={sec.title} className="flex items-start gap-3">
                <div className="shrink-0">{sec.icon}</div>
                <div>
                  <div className="font-semibold text-cyan-200 mb-1">{sec.title}</div>
                  <ul className="list-disc ml-5 text-slate-100/90 space-y-1 text-sm">
                    {sec.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-5 pb-1 mt-6 text-xs text-cyan-300/90 border-t border-cyan-900/40 text-center">
            Unlock: Full 18-Point PDF + Case Study Examples
          </div>
        </GlassCard>

        {/* --- GLASSCARD: Form --- */}
        <GlassCard className="flex-1 min-w-[340px] max-w-lg flex flex-col items-center justify-center bg-gradient-to-br from-black/10 to-cyan-900/30 border-cyan-400/25 mt-4 md:mt-0">
          {!success ? (
            <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
              <h2 className="text-lg md:text-xl font-bold text-center text-cyan-100 mb-4">
                Unlock Your Premium Checklist
              </h2>
              <p className="text-base text-neutral-300 text-center mb-7">
                Enter your details to receive the full actionable checklist—and a founder’s inbound score template.
              </p>
              <div className="flex flex-col gap-5 mb-5">
                <div>
                  <label htmlFor="firstName" className="text-xs font-semibold text-cyan-300 mb-1 block pl-1">
                    First Name <span className="text-neutral-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Jane"
                    autoComplete="given-name"
                    className="w-full rounded-lg bg-slate-800/50 border border-cyan-800/40 focus:border-cyan-400/60 px-4 py-3 text-base text-cyan-100 placeholder-cyan-300/70 focus:outline-none transition-all"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold text-cyan-300 mb-1 block pl-1">
                    Email <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="w-full rounded-lg bg-slate-800/50 border border-cyan-800/40 focus:border-cyan-400/60 px-4 py-3 text-base text-cyan-100 placeholder-cyan-300/70 focus:outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
              {errorMsg && (
                <div className="w-full mb-3 text-center text-xs text-pink-400 font-semibold">{errorMsg}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-1 rounded-xl font-semibold 
                bg-gradient-to-r from-cyan-700/90 to-fuchsia-500/80 text-white shadow-lg 
                hover:brightness-110 transition-all 
                flex items-center justify-center gap-2 text-base disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="loader animate-spin rounded-full border-2 border-t-2 border-t-cyan-200 border-cyan-700 h-5 w-5 mr-1"></span>
                    Sending...
                  </>
                ) : (
                  "Get The Checklist →"
                )}
              </button>
              <p className="text-xs text-neutral-500 text-center mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="w-full text-center mt-3 animate-fade-in">
              <div className="flex flex-col items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-cyan-300 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" className="stroke-cyan-900/60" />
                  <path d="M7 13.5l3 3 6-6" className="stroke-cyan-300" />
                </svg>
                <p className="text-base text-cyan-100 font-semibold">
                  Success! Your download link is in your email.
                </p>
                <p className="text-xs text-neutral-400">
                  Didn&apos;t get it? Check spam/promos or <Link href="/contact" className="underline text-cyan-300">contact us</Link>.
                </p>
              </div>
            </div>
          )}
        </GlassCard>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full mt-14 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for those who command trust on LinkedIn.
        </span>
      </footer>

      {/* --- Minimal CSS for animation + loader --- */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.38s cubic-bezier(.38,1.26,.41,1) both; }
        .loader {
          border-radius: 9999px;
          border-right-color: transparent !important;
        }
      `}</style>
    </main>
  );
}