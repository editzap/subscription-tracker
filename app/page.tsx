"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [dark, setDark] = useState(false);

  const bg = dark ? "bg-black text-white" : "bg-white text-black";
  const sub = dark ? "text-gray-400" : "text-gray-600";
  const card = dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";

  return (
    <div className={`min-h-screen transition ${bg}`}>

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-5 max-w-6xl mx-auto">
        <Logo />

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="border p-2 rounded-lg"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link href="/tracker">
            <button className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-lg text-sm">
              Open App
            </button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="text-center px-6 mt-28 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold leading-tight mb-6"
        >
          Know where your money goes.
        </motion.h1>

        <p className={`text-lg mb-10 ${sub}`}>
          Track subscriptions, spot waste, and take action instantly.
        </p>

        <Link href="/tracker">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-10 py-4 rounded-xl text-lg ${
              dark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Start Free
          </motion.button>
        </Link>
      </div>

      {/* Features */}
      <div className="mt-32 grid md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto">
        {[
          ["Track Everything", "All subscriptions in one place"],
          ["Find Waste", "See unused services instantly"],
          ["Take Action", "Cancel and save money fast"],
        ].map(([title, desc], i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-2xl border ${card}`}
          >
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className={`text-sm ${sub}`}>{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className={`mt-32 text-center text-sm pb-6 ${sub}`}>
        SubTrack — clarity over chaos.
      </div>
    </div>
  );
}