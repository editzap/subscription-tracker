"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Landing() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition">

        {/* Navbar */}
        <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-400 flex items-center justify-center text-white dark:text-black font-bold">
              S
            </div>
            <h1 className="font-semibold text-lg tracking-tight">
              SubTrack
            </h1>
          </div>

          <div className="flex gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="border px-3 py-1 rounded-lg text-sm"
            >
              {dark ? "Light" : "Dark"}
            </button>

            <Link href="/tracker">
              <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg text-sm hover:opacity-90">
                Open App
              </button>
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center px-6 mt-20 max-w-3xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold leading-tight mb-6"
          >
            Track your subscriptions.
            <br />
            <span className="text-gray-600 dark:text-gray-400">
              Stop wasting money.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-700 dark:text-gray-300 mb-8"
          >
            See exactly how much you spend every month,
            what you actually use, and what you should cancel.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/tracker">
              <button className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-xl text-lg hover:scale-105 transition">
                Start Tracking
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <div className="mt-24 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          {[
            ["💸 Real Spend", "Know exactly what you pay"],
            ["⚠️ Hidden Waste", "Find unused subscriptions"],
            ["⏰ Stay Ahead", "Never miss a payment"]
          ].map(([title, desc], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-xl border bg-gray-50 dark:bg-gray-900 hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center px-6">
          <h2 className="text-3xl font-bold mb-6">
            Start tracking today
          </h2>

          <Link href="/tracker">
            <button className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-xl text-lg hover:scale-105 transition">
              Open Tracker
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400 pb-6">
          SubTrack — clarity over chaos.
        </div>

      </div>
    </div>
  );
}