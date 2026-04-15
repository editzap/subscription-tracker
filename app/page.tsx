"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Landing() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={`min-h-screen transition duration-300 ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
              dark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            S
          </div>
          <h1 className="font-semibold text-lg">SubTrack</h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="border px-3 py-1 rounded-lg text-sm"
          >
            {dark ? "Light" : "Dark"}
          </button>

          <Link href="/tracker">
            <button
              className={`px-4 py-2 rounded-lg text-sm ${
                dark
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              Open App
            </button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="text-center px-6 mt-20 max-w-3xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6"
        >
          Track your subscriptions.
          <br />
          <span className={dark ? "text-gray-400" : "text-gray-600"}>
            Stop wasting money.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-lg mb-8 ${
            dark ? "text-gray-300" : "text-gray-700"
          }`}
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
            <button
              className={`px-8 py-3 rounded-xl text-lg transition hover:scale-105 ${
                dark
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              Start Tracking
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Features */}
      <div className="mt-24 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

        {[
          ["Real Spend", "Know exactly what you pay"],
          ["Hidden Waste", "Find unused subscriptions"],
          ["Stay Ahead", "Never miss a payment"]
        ].map(([title, desc], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`p-6 rounded-xl border ${
              dark
                ? "bg-gray-900 border-gray-700"
                : "bg-gray-100"
            }`}
          >
            <h3 className="font-semibold mb-2">{title}</h3>
            <p
              className={`text-sm ${
                dark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div
        className={`mt-20 text-center text-sm pb-6 ${
          dark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        SubTrack — clarity over chaos.
      </div>

    </div>
  );
}