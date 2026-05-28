"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0 },
};

export default function PitchPage() {
  return (
    <main className="bg-black text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 1 }}
          >
            <p className="uppercase tracking-[0.3em] text-gray-400 mb-6">
              Executive Authority System
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Building Investor-Level
              <span className="block text-gray-400">
                Executive Brands
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We help founders, CEOs, and B2B leaders dominate attention
              through premium content systems, strategic positioning,
              and authority-driven storytelling.
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
                Book Strategy Call
              </button>

              <button className="border border-white/20 px-8 py-4 rounded-2xl hover:bg-white/10 transition">
                View Case Studies
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 border-t border-white/10 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          {[
            ["10M+", "Content Impressions"],
            ["150+", "Authority Campaigns"],
            ["92%", "Client Retention"],
          ].map(([number, label], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-3xl p-10 backdrop-blur-lg"
            >
              <h2 className="text-5xl font-bold">{number}</h2>
              <p className="mt-4 text-gray-400">{label}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* PROBLEM + SOLUTION */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 uppercase tracking-[0.3em] mb-5">
              The Problem
            </p>

            <h2 className="text-4xl font-bold leading-tight">
              Most executives have expertise.
              <span className="block text-gray-400">
                But no digital authority.
              </span>
            </h2>

            <p className="mt-6 text-gray-300 leading-relaxed text-lg">
              Traditional companies are losing attention online.
              Founder-led branding and strategic content are replacing
              outdated corporate marketing systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-3xl p-10 border border-white/10"
          >
            <p className="text-gray-500 uppercase tracking-[0.3em] mb-5">
              Our Solution
            </p>

            <div className="space-y-5 text-lg text-gray-200">
              <div>✔ LinkedIn Ghostwriting</div>
              <div>✔ Authority Positioning</div>
              <div>✔ Founder-Led Content</div>
              <div>✔ Executive Branding</div>
              <div>✔ Strategic Storytelling</div>
              <div>✔ High-Ticket Audience Growth</div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-32 bg-white/[0.03]">
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="uppercase tracking-[0.3em] text-gray-500 mb-5">
              Our System
            </p>

            <h2 className="text-5xl font-bold">
              Authority Growth Engine
            </h2>
          </motion.div>

          <div className="mt-20 grid md:grid-cols-4 gap-8">

            {[
              "Research",
              "Positioning",
              "Content System",
              "Audience Growth",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-black border border-white/10 rounded-3xl p-8"
              >
                <div className="text-5xl font-bold text-gray-700">
                  0{index + 1}
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {item}
                </h3>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center bg-gradient-to-b from-white/10 to-white/[0.03] border border-white/10 rounded-[40px] p-16"
        >
          <h2 className="text-5xl font-bold leading-tight">
            Ready to Build
            <span className="block text-gray-400">
              Executive Authority?
            </span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Build a premium founder-led brand system designed for
            attention, credibility, and long-term authority.
          </p>

          <button className="mt-10 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            Schedule Strategic Call
          </button>
        </motion.div>
      </section>

    </main>
  );
}