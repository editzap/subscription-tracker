"use client";

import { motion } from "framer-motion";

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl bottom-[-100px] right-[-100px]" />
      </div>

      {/* HERO */}
      <section className="text-center px-6 py-32 max-w-4xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-6"
        >
          Stop paying for what you forgot.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 mb-10"
        >
          Track subscriptions. Cancel smarter.
        </motion.p>

        <div className="flex justify-center gap-4">
          <a href="/tracker" className="bg-white text-black px-6 py-3 rounded-xl">
            Get Started
          </a>
          <a href="/cancel/netflix" className="border px-6 py-3 rounded-xl">
            Explore
          </a>
        </div>

      </section>

    </main>
  );
}