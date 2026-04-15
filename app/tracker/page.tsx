"use client";

import { useState, useEffect } from "react";
import { Trash2, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Tracker() {
  const [subs, setSubs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("Entertainment");
  const [dark, setDark] = useState(false);
  const [streak, setStreak] = useState(0);

  // Load data
  useEffect(() => {
    const data = localStorage.getItem("subs");
    if (data) setSubs(JSON.parse(data));
  }, []);

  // Streak system
  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toDateString();

    if (lastVisit !== today) {
      const prev = Number(localStorage.getItem("streak") || 0);
      const newStreak = prev + 1;

      setStreak(newStreak);
      localStorage.setItem("streak", String(newStreak));
      localStorage.setItem("lastVisit", today);
    } else {
      setStreak(Number(localStorage.getItem("streak") || 0));
    }
  }, []);

  const save = (data: any[]) => {
    setSubs(data);
    localStorage.setItem("subs", JSON.stringify(data));
  };

  const addSub = () => {
    if (!name || !cost) return;

    const updated = [
      ...subs,
      {
        id: Date.now(),
        name,
        cost: Number(cost),
        category,
      },
    ];

    save(updated);

    if (typeof window !== "undefined") {
      navigator.vibrate?.(10);
    }

    setName("");
    setCost("");
  };

  const deleteSub = (id: number) => {
    save(subs.filter((s) => s.id !== id));
  };

  const total = subs.reduce((t, s) => t + s.cost, 0);

  // Chart
  const dataMap: any = {};
  subs.forEach((s) => {
    dataMap[s.category] =
      (dataMap[s.category] || 0) + s.cost;
  });

  const chartData = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  const COLORS = ["#111", "#444", "#777", "#aaa"];

  const bg = dark ? "bg-black text-white" : "bg-[#f7f7f7]";
  const card = dark
    ? "bg-gray-900 border border-gray-800"
    : "bg-white border border-gray-200 shadow-sm";

  return (
    <div className={`min-h-screen px-6 py-10 pb-24 ${bg}`}>

      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-10">
        <h1 className="text-lg font-semibold tracking-tight">
          SubTrack
        </h1>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* Total */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-4"
        >
          <h2 className="text-6xl font-semibold tracking-tight">
            ₹{total}
          </h2>
          <p className="text-sm opacity-50 mt-1">
            monthly spend
          </p>
        </motion.div>

        {/* Streak */}
        <div className="text-center mb-6 text-sm opacity-70">
          🔥 {streak} day streak
        </div>

        {/* Habit */}
        {subs.length > 0 && (
          <div className="text-center text-sm opacity-60 mb-2">
            You’re spending ₹{total}/month
          </div>
        )}

        {total > 1000 && (
          <div className="text-center text-sm text-red-500 mb-6">
            That’s quietly draining your money ⚠️
          </div>
        )}

        {/* Onboarding */}
        {subs.length === 0 && (
          <div className="text-center mb-8 opacity-60">
            Start by adding your first subscription ↓
          </div>
        )}

        {/* Chart */}
        {chartData.length > 0 && (
          <div className={`p-6 rounded-2xl mb-8 ${card}`}>
            <p className="text-sm mb-4 opacity-50">
              Spending breakdown
            </p>

            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={90}
                >
                  {chartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Input Card */}
        <div className={`p-6 rounded-2xl mb-8 ${card}`}>

          <input
            placeholder="Subscription name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full mb-3 p-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700"
          >
            <option>Entertainment</option>
            <option>Work</option>
            <option>Education</option>
            <option>Utilities</option>
          </select>

          <button
            onClick={addSub}
            className={`w-full py-3 rounded-xl text-sm font-medium transition ${
              dark
                ? "bg-white text-black hover:opacity-90"
                : "bg-black text-white hover:opacity-90"
            }`}
          >
            Add Subscription
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {subs.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl flex justify-between items-center ${card}`}
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm opacity-50">
                  ₹{s.cost} • {s.category}
                </p>
              </div>

              <button
                onClick={() => deleteSub(s.id)}
                className="opacity-50 hover:opacity-100 transition"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom Bar (Mobile Feel) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 p-3 flex justify-around text-sm backdrop-blur">
        <span className="opacity-80">Home</span>
        <span className="opacity-80">Add</span>
        <span className="opacity-80">Insights</span>
      </div>
    </div>
  );
}