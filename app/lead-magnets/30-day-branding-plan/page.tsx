"use client";

import { useState } from "react";
import Link from "next/link";

// --- GLASSCARD STUB: Replace with your actual import ---
function GlassCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "rounded-2xl shadow-xl backdrop-blur-md border border-blue-400/25 bg-gradient-to-br from-[#10182e]/80 to-[#141923]/90 p-7 " +
        className
      }
    >
      {children}
    </div>
  );
}

// --- SUPABASE CLIENT STUB: Replace with your project config ---
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ThirtyDayBrandingPlanPage() {
  // --- State
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Timeline Steps Preview
  const timeline = [
    {
      day: 1,
      title: "Audit & Clarity",
      highlight: true,
      desc: "Expert self-audit + competitive scan. Pinpoint strengths, bottlenecks, and set your true-market positioning.",
    },
    {
      day: 5,
      title: "Visual Overhaul",
      highlight: false,
      desc: "Upgrade profile photos, banners, branding assets. Golden-ratio tweaks for instant authority.",
    },
    {
      day: 10,
      title: "Magnetic Bio & Headline",
      highlight: false,
      desc: "Craft an ROI-driven headline & summary framework used by elite execs.",
    },
    {
      day: 16,
      title: "Content Engine Kickoff",
      highlight: false,
      desc: "Plug in our done-for-you content calendar. AI prompts to post daily in 15 min per day.",
    },
    {
      day: 22,
      title: "Authority Stacking",
      highlight: false,
      desc: "Add trust triggers: social proof, press, testimonials. Optimize engagement surfaces.",
    },
    {
      day: 28,
      title: "Network Growth Hacks",
      highlight: false,
      desc: "Seed high-value connections & build DM scripts that open doors—no cold spam.",
    },
    {
      day: 30,
      title: "360° Review & Launch",
      highlight: true,
      desc: "Complete a 30-point audit. Unveil your improved brand and track real business KPIs.",
    },
  ];

  // --- Submission Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from("30_day_branding_plan")
        .insert([{ first_name: firstName, email }]);
      if (insertError) {
        if (insertError.code === "23505") {
          setError("This email is already registered.");
        } else {
          setError("Sorry, something went wrong. Please try again.");
        }
        setLoading(false);
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError("Failed to subscribe. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#101629] via-black to-[#0a1020] flex flex-col items-center justify-start px-2 pb-10 relative overflow-x-hidden">
      {/* --- GOLD/NEON BORDER GLOW --- */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[96vw] h-[700px] rounded-[60px] blur-3xl opacity-70"
        style={{
          background: "radial-gradient(ellipse at top, #2067d9 30%, #cac091 64%, transparent 85%)",
        }}
      />

      {/* --- HEADER --- */}
      <header className="w-full max-w-4xl pt-14 md:pt-20 pb-4 mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#ffe088] via-[#f5daaf] to-[#276fef] inline-block text-transparent bg-clip-text drop-shadow-lg mb-2 tracking-tight">
          30-Day<br className="sm:hidden" /> Personal Branding Plan
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-100/80 font-semibold">
          Go from invisible to in-demand executive in 30 days.<br />
          <span className="text-blue-200/90 font-medium">Proven, step-by-step daily roadmap used by 7-figure founders</span> to build credibility, attract dream opportunities, and become a "category of one".
        </p>
      </header>

      {/* --- TIMELINE PREVIEW --- */}
      <section className="w-full max-w-5xl flex flex-col items-center mt-7 md:mt-14 px-2">
        <GlassCard className="w-full py-8 px-5 md:px-12 flex flex-col items-center bg-gradient-to-br from-[#14192a]/70 to-[#131f40]/30 border border-[#ffe088]/20 relative">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-7 h-7 text-[#ffe088] drop-shadow-[0_0_14px_#ffe08877]" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
              <circle cx="12" cy="12" r="10" className="stroke-[#ffe088]/70" />
              <path d="M8 13s1.5 2 4 2 4-2 4-2" className="stroke-[#ffe088]" />
            </svg>
            <span className="uppercase text-xs tracking-widest text-[#ffe088] font-semibold">
              Preview
            </span>
          </div>
          <h2 className="font-black text-xl md:text-2xl text-neutral-100 drop-shadow-md mb-8">
            Your 30-Day Executive Branding Transformation
          </h2>
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-0 items-center relative">

            {/* TIMELINE GRAPHIC */}
            <div className="w-full flex-1 flex md:flex-row flex-col items-center md:items-stretch justify-between md:gap-0 gap-6">

              {timeline.map((item, idx) => (
                <div
                  key={item.day}
                  className="flex flex-col items-center group max-w-[180px] md:min-h-[174px] relative"
                >
                  {/* Connector Lines */}
                  {idx !== 0 && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 -top-8 md:-left-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 h-10 md:w-10 border-t md:border-l border-dashed border-[#ffe088]/40"
                      style={{
                        width: idx === 0 ? 0 : "50px",
                        height: idx === 0 ? 0 : (idx % 2 === 0 ? "36px" : "24px"),
                        display: "block",
                      }}
                    ></span>
                  )}
                  <div
                    className={
                      "rounded-full w-12 h-12 flex items-center justify-center border-2 drop-shadow-lg mb-2 " +
                      (item.highlight
                        ? "bg-gradient-to-br from-[#ffe088]/80 to-[#276fef]/70 border-[#ffe088]"
                        : "bg-gradient-to-br from-[#122e39]/70 to-[#183047]/60 border-blue-500/40")
                    }
                  >
                    <span
                      className={
                        "text-lg font-extrabold drop-shadow " +
                        (item.highlight
                          ? "text-[#222311]"
                          : "text-blue-100")
                      }
                    >
                      Day {item.day}
                    </span>
                  </div>
                  <div className="mt-1 text-base md:text-lg font-bold text-[#ffe088] text-center drop-shadow tracking-tight">
                    {item.title}
                  </div>
                  <div className="mt-1 text-xs text-neutral-200 text-center opacity-80">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* --- HIGH-CONVERT EMAIL CTA FORM --- */}
      <section className="w-full max-w-2xl mt-12 mx-auto px-2 flex flex-col items-center">
        <GlassCard className="w-full max-w-xl flex flex-col items-center justify-center bg-gradient-to-br from-[#151929]/80 to-[#1b2545]/40 border border-[#ffe088]/20 py-9 px-7 shadow-[0_3px_30px_#ffe08822]">
          {!success ? (
            <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
              <h2 className="text-lg md:text-2xl font-bold text-center bg-gradient-to-r from-[#ffe088] via-[#f5e7b1] to-[#226be6] inline-block text-transparent bg-clip-text mb-4 tracking-tight">
                Get Your 30-Day Plan (Free)
              </h2>
              <p className="text-base text-neutral-200 text-center mb-7">
                Enter your details to instantly receive the full step-by-step <b className="text-[#ffe088] font-semibold">30-Day Personal Branding Roadmap</b> and actionable daily templates.
              </p>
              <div className="flex flex-col gap-5 mb-5">
                <div>
                  <label htmlFor="firstName" className="text-xs font-semibold text-[#ffe088] mb-1 block pl-1">
                    First Name <span className="text-neutral-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Jane"
                    autoComplete="given-name"
                    className="w-full rounded-lg bg-[#181f27]/60 border border-[#ffe088]/10 focus:border-[#ffe088]/60 px-4 py-3 text-base text-neutral-100 placeholder-[#edd082]/70 focus:outline-none transition-all"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold text-[#ffe088] mb-1 block pl-1">
                    Email <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="w-full rounded-lg bg-[#181f27]/60 border border-[#ffe088]/10 focus:border-[#ffe088]/70 px-4 py-3 text-base text-neutral-100 placeholder-[#edd082]/70 focus:outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
              {/* Error messaging */}
              {error && (
                <div className="w-full text-xs text-center text-pink-400 bg-pink-900/10 rounded py-2 mb-2 animate-fade-in">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-6 mt-1 font-bold rounded-xl bg-gradient-to-r from-[#ffe088] to-[#276fef] text-[#1f2340] shadow-lg hover:from-[#faf3d1] hover:to-[#367cfb] transition-opacity focus:outline-none disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="loader animate-spin rounded-full border-2 border-t-2 border-t-[#ffe088] border-[#e6ddbd] h-5 w-5 mr-2" />{" "}
                    Sending...
                  </>
                ) : (
                  "Get The Plan →"
                )}
              </button>
              <p className="text-xs text-neutral-500 text-center mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="w-full text-center mt-4 animate-fade-in">
              <div className="flex flex-col items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#ffe088] mx-auto mb-1 drop-shadow-[0_1px_10px_#ffe08855]" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" className="stroke-[#ffe088]/40" />
                  <path d="M7 13.5l3 3 6-6" className="stroke-[#ffe088]" />
                </svg>
                <p className="text-base text-[#ffe088] font-semibold">
                  Success! Your 30-Day Plan is in your email.
                </p>
                <p className="text-xs text-neutral-400">
                  Didn&apos;t get it? Check spam/promos or{" "}
                  <Link href="/contact" className="underline text-[#ffe088] hover:text-blue-300">
                    contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}
        </GlassCard>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for visionaries who build legendary brands.
        </span>
      </footer>

      {/* --- Minimal CSS for animation, loader, gold glow --- */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-18px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.38s cubic-bezier(.38,1.26,.41,1) both; }
        .loader {
          border-radius: 9999px;
          border-right-color: transparent !important;
        }
        .gold-glow {
          box-shadow: 0 0 18px 2px #ffe08877,0 0 8px 2px #ffe08855;
        }
      `}</style>
    </main>
  );
}