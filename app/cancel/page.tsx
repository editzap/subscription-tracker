"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CancelHome() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query) return;

    const slug = query
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    router.push(`/cancel/${slug}`);
  };

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

        <a
          href="/"
          className="text-sm text-white/70 hover:text-white transition"
        >
          ← Home
        </a>
      </nav>

      {/* HEADER */}
      <section className="text-center px-6 pt-24 pb-12 max-w-3xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-semibold mb-4"
        >
          Cancel Any Subscription
        </motion.h1>

        <p className="text-gray-400">
          Search any service and get instant cancellation steps.
        </p>

      </section>

      {/* SEARCH CARD */}
      <section className="max-w-2xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex gap-3"
        >

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Netflix, Spotify, Gym, Adobe..."
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-white text-black px-6 rounded-xl hover:scale-105 transition"
          >
            Search
          </button>

        </motion.div>

      </section>

      {/* QUICK SUGGESTIONS */}
      <section className="max-w-4xl mx-auto px-6 mt-10">

        <div className="flex flex-wrap gap-3 justify-center">

          {[
            "Netflix",
            "Spotify",
            "YouTube Premium",
            "Amazon Prime",
            "ChatGPT Plus",
            "Canva",
          ].map((item, i) => (
            <button
              key={i}
              onClick={() =>
                router.push(`/cancel/${item.toLowerCase().replace(/ /g, "-")}`)
              }
              className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm hover:bg-white/20 transition"
            >
              {item}
            </button>
          ))}

        </div>

      </section>

    </main>
  );
}