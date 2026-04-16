"use client";

import { motion } from "framer-motion";

export default function CancelClient({ service }: { service: string }) {
  const name = service.replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* GLOW (same as homepage) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl bottom-[-100px] right-[-100px]" />
      </div>

      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <div className="text-lg font-medium text-white/90">SubTrack</div>
        <a href="/cancel" className="text-sm text-white/70 hover:text-white">
          ← Back
        </a>
      </nav>

      {/* HEADER */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold mb-4"
        >
          Cancel {name}
        </motion.h1>

        <p className="text-gray-400">
          Follow these steps to stop your subscription.
        </p>

      </section>

      {/* STEPS */}
      <section className="max-w-3xl mx-auto px-6 pb-20">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-4">

          {[
            `Log into your ${name} account`,
            "Go to subscription or billing settings",
            "Click cancel subscription",
            "Confirm cancellation",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3"
            >
              <span className="text-white/40">{i + 1}.</span>
              <span>{step}</span>
            </motion.div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="text-center pb-20">
        <a
          href="/tracker"
          className="bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Track your subscriptions →
        </a>
      </section>

    </main>
  );
}