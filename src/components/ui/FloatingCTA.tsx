"use client";

import Link from "next/link";
import { GlassCard } from "./glass-card";

type FloatingCTAProps = {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  href: string;
};

export default function FloatingCTA({
  headline,
  subheadline,
  ctaLabel,
  href,
}: FloatingCTAProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-xs transition-all hidden md:block">
      <GlassCard className="p-6 bg-gradient-to-tr from-cyan-900/80 to-blue-950/80 border-cyan-400/30 shadow-2xl ring-2 ring-cyan-700/25">
        <h4 className="text-lg font-extrabold text-center text-cyan-200 mb-1 drop-shadow">
          {headline}
        </h4>
        <p className="text-sm text-neutral-200 text-center mb-3">{subheadline}</p>
        <Link
          href={href}
          className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-400 transition-colors text-sm w-full block text-center"
        >
          {ctaLabel} →
        </Link>
      </GlassCard>
    </div>
  );
}
