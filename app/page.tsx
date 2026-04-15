"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <Logo />

        <Link href="/tracker">
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
            Open App
          </button>
        </Link>
      </div>

      {/* Hero */}
      <div className="text-center px-6 mt-24 max-w-3xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold leading-tight mb-6"
        >
          Track subscriptions.
          <br />
          <span className="text-gray-600">
            Stop wasting money.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-700 mb-8"
        >
          See where your money goes, cancel what you don’t use,
          and save every month.
        </motion.p>

        <Link href="/tracker">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-black text-white px-8 py-3 rounded-xl text-lg"
          >
            Start Tracking
          </motion.button>
        </Link>
      </div>

      {/* Features */}
      <div className="mt-28 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

        {[
          ["💸 Save Money", "Find unused subscriptions instantly"],
          ["🧠 Smart Insights", "Know where you're overspending"],
          ["⚡ Take Action", "Cancel services in seconds"],
        ].map(([title, desc], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border bg-gray-50"
          >
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-28 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Start saving today
        </h2>

        <Link href="/tracker">
          <button className="bg-black text-white px-8 py-3 rounded-xl text-lg">
            Open Tracker
          </button>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-gray-500 pb-6">
        SubTrack — spend smarter.
      </div>

    </div>
  );
}