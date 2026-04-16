"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Sub = {
  name: string;
  price: number;
  category: string;
};

export default function Tracker() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Entertainment");

  const addSub = () => {
    if (!name || !price) return;

    setSubs([...subs, { name, price: Number(price), category }]);
    setName("");
    setPrice("");
  };

  const total = subs.reduce((sum, s) => sum + s.price, 0);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* SAME GLOW AS HOMEPAGE */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl bottom-[-100px] right-[-100px]" />
      </div>

      {/* NAV (MATCH HOMEPAGE) */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <div className="text-lg font-medium tracking-tight text-white/90">
          SubTrack
        </div>

        <a
          href="/"
          className="text-sm text-white/70 hover:text-white transition"
        >
          ← Home
        </a>
      </nav>

      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-4xl font-semibold mb-3">
          Subscription Dashboard
        </h1>
        <p className="text-gray-400">
          Everything you pay for — in one place.
        </p>
      </section>

      {/* ADD CARD */}
      <section className="max-w-4xl mx-auto px-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Spotify / Gym / ChatGPT"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$10"
              type="number"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3"
            >
              <option>Entertainment</option>
              <option>Productivity</option>
              <option>Health</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Other</option>
            </select>

            <button
              onClick={addSub}
              className="bg-white text-black rounded-xl px-6 py-3 hover:scale-105 transition"
            >
              Add
            </button>

          </div>

        </div>
      </section>

      {/* TOTAL (PREMIUM CARD) */}
      <section className="max-w-4xl mx-auto px-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex justify-between text-lg">
          <span>Total Monthly</span>
          <span className="font-semibold">${total}</span>
        </div>
      </section>

      {/* LIST */}
      <section className="max-w-4xl mx-auto px-6 pb-20 space-y-4">

        {subs.map((sub, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div>
              <div className="text-lg">{sub.name}</div>
              <div className="text-sm text-gray-400">
                {sub.category}
              </div>
            </div>

            <div className="text-gray-300">${sub.price}</div>
          </motion.div>
        ))}

        {subs.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            Start adding subscriptions — anything you pay for.
          </div>
        )}

      </section>

    </main>
  );
}