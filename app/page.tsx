"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold">
            S
          </div>
          <h1 className="font-semibold text-lg">SubTrack</h1>
        </div>

        <Link href="/tracker">
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
            Open App
          </button>
        </Link>
      </div>

      {/* Hero */}
      <div className="text-center px-6 mt-20 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold leading-tight mb-6"
        >
          Track your subscriptions.
          <br />
          <span className="text-gray-600">
            Stop wasting money.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 mb-8"
        >
          See exactly how much you spend every month,
          what you actually use, and what you should cancel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/tracker">
            <button className="bg-black text-white px-8 py-3 rounded-xl text-lg hover:opacity-90">
              Start Tracking
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto text-center">
        {["Real Spend", "Hidden Waste", "Stay Ahead"].map((title, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-gray-600 text-sm mt-2">
              {i === 0 && "Know your real monthly spend"}
              {i === 1 && "Find subscriptions you don’t use"}
              {i === 2 && "Track upcoming payments easily"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <div className="mt-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Everything you need. Nothing you don’t.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            ["Simple & Fast", "No login. Start instantly."],
            ["Smart Insights", "See waste clearly."],
            ["Clean Interface", "Minimal & distraction-free."],
            ["Private", "Your data stays in your browser."]
          ].map(([title, desc], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 text-center px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-6"
        >
          Start tracking today
        </motion.h2>

        <Link href="/tracker">
          <button className="bg-black text-white px-8 py-3 rounded-xl text-lg hover:scale-105 transition">
            Open Tracker
          </button>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-gray-500 pb-6">
        SubTrack — clarity over chaos.
      </div>

    </div>
  );
}