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

    setSubs([
      ...subs,
      { name, price: Number(price), category },
    ]);

    setName("");
    setPrice("");
  };

  const total = subs.reduce((sum, s) => sum + s.price, 0);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl font-semibold">Subscription Dashboard</h1>
        <p className="text-gray-400">
          Track all your subscriptions — not just Netflix.
        </p>
      </div>

      {/* ADD CARD */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Spotify / Gym / ChatGPT"
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
      </div>

      {/* TOTAL CARD */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex justify-between text-lg">
          <span>Total Monthly Spend</span>
          <span className="font-semibold">${total}</span>
        </div>
      </div>

      {/* LIST */}
      <div className="max-w-5xl mx-auto space-y-4">

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
            No subscriptions yet — start adding anything.
          </div>
        )}

      </div>

    </main>
  );
}