"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// --- GlassCard Component ---
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-gradient-to-tr from-blue-950/90 via-slate-950/80 to-black/80 backdrop-blur-lg shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}

// --- Toast Component ---
function Toast({
  message,
  type,
  show,
}: {
  message: string;
  type: "success" | "error";
  show: boolean;
}) {
  if (!show) return null;
  return (
    <div
      className={`fixed z-50 top-6 left-1/2 -translate-x-1/2 min-w-[220px] px-6 py-3 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-xl ${
        type === "success"
          ? "bg-emerald-800/80 text-emerald-100 border border-emerald-300/20"
          : "bg-red-900/80 text-red-100 border border-red-300/20"
      } animate-fade-in`}
    >
      {message}
    </div>
  );
}

// --- Supabase Client: Use environment variables set in .env.local ---
const supabase =
  typeof window !== "undefined"
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
    : null;

// --- PDF MOCKUP COMPONENT ---
function PDFMockup() {
  return (
    <div className="relative mx-auto mb-7 mt-3 flex items-center justify-center">
      <div className="w-28 sm:w-32 md:w-36 aspect-[0.7] bg-gradient-to-br from-blue-900/90 via-slate-900/90 to-black/90 rounded-2xl border border-blue-400/15 shadow-xl rotate-[-8deg]">
        {/* Simulated Pages */}
        <div className="absolute top-1 left-2 w-[90%] h-[95%] bg-gradient-to-b from-slate-700/30 to-slate-900/40 rounded-xl blur-md scale-95 z-0" />
        <div className="relative z-10 flex flex-col justify-between h-full pt-5 pb-4 px-4">
          <span className="block text-xs uppercase tracking-[0.2em] text-blue-200/80 font-bold mb-2">
            Lead Magnet
          </span>
          <span className="block font-extrabold text-lg md:text-xl lg:text-2xl text-cyan-200 leading-tight drop-shadow-sm">
            100 Irresistible LinkedIn Hooks
          </span>
          <span className="block mt-auto mb-1 text-neutral-300/70 text-xs font-mono">
            <span className="text-blue-400/90 font-semibold">PDF</span> – 17 Pages
          </span>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function LeadMagnet100HooksPage() {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    show: boolean;
  }>({ message: "", type: "success", show: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setToast({
        message: "Please enter your name and email address.",
        type: "error",
        show: true,
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3200);
      return;
    }
    setSubmitting(true);
    setToast({ message: "", type: "success", show: false });
    try {
      // Prepare lead data
      const lead = {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        source: "100_hooks_pdf",
        created_at: new Date().toISOString(),
      };

      // Try 'crm_leads' first, fallback to 'leads'
      let { error } = await supabase
        ?.from("crm_leads")
        .insert([lead]);

      if (error?.message?.includes("relation") || error?.code === "42P01") {
        // If crm_leads doesn't exist, try 'leads'
        ({ error } = await supabase?.from("leads").insert([lead]));
      }

      if (error) throw error;

      setToast({
        message: "Success! PDF access link sent to your inbox.",
        type: "success",
        show: true,
      });
      setSuccess(true);
      setFullName("");
      setEmail("");
    } catch (error: any) {
      setToast({
        message:
          error?.message?.includes("duplicate")
            ? "You've already claimed your PDF – check your inbox!"
            : "Error submitting. Please try again.",
        type: "error",
        show: true,
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3600);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-slate-950 pb-14">
      <Toast message={toast.message} type={toast.type} show={toast.show} />

      <section className="max-w-2xl mx-auto px-4 pt-14 md:pt-28 pb-10">
        <GlassCard className="py-10 px-5 md:px-14 flex flex-col items-center">
          {/* Hero/Header */}
          <PDFMockup />
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-100 tracking-tight mb-3 leading-tight drop-shadow-sm">
            Download <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">100 Magnetic LinkedIn Hooks</span>{" "}
            (PDF)
          </h1>
          <p className="text-lg text-center text-neutral-300 mb-7 max-w-xl">
            Instantly 2x your LinkedIn engagement. Steal the openers used by 7-figure founders, agency execs, and elite creators: <span className="font-semibold text-cyan-200">build authority, spark DM's, and book calls</span> every week with these proven starters.
          </p>
          {/* 3 Benefits */}
          <ul className="mb-10 mt-1 space-y-3 max-w-lg text-left">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-cyan-400/80 text-lg">•</span>
              <span className="text-neutral-200">
                <span className="font-semibold text-cyan-100">Modern Psychology:</span>{" "}
                Hooks reverse-engineered from viral posts in 2026.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-emerald-400/80 text-lg">•</span>
              <span className="text-neutral-200">
                <span className="font-semibold text-emerald-100">Founder-Proven:</span>{" "}
                Tested in B2B, SaaS, consulting, and growth agency workflows.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-violet-400/80 text-lg">•</span>
              <span className="text-neutral-200">
                <span className="font-semibold text-violet-100">Instant Results:</span>{" "}
                Go from “ignored” to inbox notifications—no creative block, no fluff.
              </span>
            </li>
          </ul>
          {/* Lead Capture Form */}
          {!success ? (
            <form
              className="flex flex-col gap-4 w-full max-w-sm mt-1"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block font-semibold text-neutral-200 mb-1 text-sm"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  maxLength={80}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={submitting}
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-blue-500/30 text-neutral-100 text-base placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-600/40 transition"
                  placeholder="e.g. Jane Doe"
                  autoCapitalize="words"
                  autoCorrect="off"
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-neutral-200 mb-1 text-sm"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  maxLength={90}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-blue-500/30 text-neutral-100 text-base placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-600/40 transition"
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`mt-3 py-3 rounded-2xl font-semibold text-lg shadow-lg bg-gradient-to-r from-cyan-700 to-blue-600 text-white tracking-wide transition-colors ${
                  submitting
                    ? "opacity-80 cursor-not-allowed"
                    : "hover:from-cyan-800 hover:to-blue-700"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-5 h-5 border-2 border-cyan-100 border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>Send Me the PDF &rarr;</>
                )}
              </button>
              <p className="text-xs text-neutral-500 text-center mt-2">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            // Success state
            <div className="w-full text-center mt-5">
              <div className="flex flex-col items-center gap-2 animate-fade-in">
                <svg
                  viewBox="0 0 24 24"
                  className="w-9 h-9 text-cyan-300 mx-auto mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" className="stroke-cyan-900/60" />
                  <path
                    d="M7 13.5l3 3 6-6"
                    className="stroke-cyan-300"
                  />
                </svg>
                <p className="text-base text-cyan-100 font-semibold">
                  Success! Your download link is in your email.
                </p>
                <p className="text-xs text-neutral-400">
                  Didn&apos;t get it? Check spam/promos or contact us.
                </p>
              </div>
            </div>
          )}
        </GlassCard>
      </section>

      <footer className="w-full mt-10 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for experts and founders who lead.
        </span>
      </footer>

      {/* --- Minimal CSS for toast/fade-in --- */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.38s cubic-bezier(.38,1.26,.41,1) both; }
      `}</style>
    </main>
  );
}