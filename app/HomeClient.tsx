"use client";

import { motion } from "framer-motion";

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl bottom-[-100px] right-[-100px]" />
      </div>

      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <div className="text-lg font-medium tracking-tight text-white/90">
          SubTrack
        </div>

        <a
          href="/tracker"
          className="text-sm text-white/70 hover:text-white transition"
        >
          Open App →
        </a>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-32 max-w-4xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold leading-tight mb-6"
        >
          Stop paying
          <br />
          for what you forgot.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg mb-10"
        >
          Subscriptions quietly drain money.
          <br />
          Now you see everything.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <a
            href="/tracker"
            className="bg-white text-black px-6 py-3 rounded-xl text-lg hover:scale-105 transition"
          >
            Get Started
          </a>

          <a
            href="/cancel"
            className="border border-white/20 px-6 py-3 rounded-xl text-lg hover:bg-white/10 transition"
          >
            Explore Guides
          </a>
        </motion.div>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">

        {[
          {
            title: "Track Spending",
            desc: "See exactly where your money goes every month.",
          },
          {
            title: "Cancel Faster",
            desc: "Find cancellation steps for any service instantly.",
          },
          {
            title: "Stay in Control",
            desc: "No more hidden recurring payments.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-semibold mb-6">
          Start saving today.
        </h2>

        <a
          href="/tracker"
          className="bg-white text-black px-8 py-4 rounded-xl text-lg hover:scale-105 transition"
        >
          Open Tracker
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-10 border-t border-white/10">
        © 2026 SubTrack
      </footer>

    </main>
  );
}