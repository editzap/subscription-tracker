"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [dark, setDark] = useState(false);

  const bg = dark
    ? "bg-black text-white"
    : "bg-[#f9fafb] text-black";

  const sub = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen transition ${bg}`}>

      {/* NAV */}
      <div className="flex justify-between items-center px-6 py-5 max-w-6xl mx-auto">
        <Logo />

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link href="/tracker">
            <button className="px-5 py-2 rounded-lg text-sm bg-black text-white dark:bg-white dark:text-black">
              Open App
            </button>
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mt-32 px-6 max-w-4xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-semibold leading-tight mb-6 tracking-tight"
        >
          Stop paying for
          <br />
          things you don’t use.
        </motion.h1>

        <p className={`text-lg ${sub} mb-10`}>
          SubTrack helps you track subscriptions,
          cut waste, and take control of your money.
        </p>

        <Link href="/tracker">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-xl text-lg bg-black text-white dark:bg-white dark:text-black shadow-sm"
          >
            Start for free
          </motion.button>
        </Link>
      </div>

      {/* FEATURE CARDS */}
      <div className="mt-36 grid md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto">
        {[
          ["Clarity", "All subscriptions in one place"],
          ["Control", "Know exactly where money goes"],
          ["Action", "Cancel and save instantly"],
        ].map(([title, desc], i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium mb-2">{title}</h3>
            <p className={`text-sm ${sub}`}>{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <div className={`mt-36 text-center text-sm pb-6 ${sub}`}>
        SubTrack — built for clarity.
      </div>
    </div>
  );
}