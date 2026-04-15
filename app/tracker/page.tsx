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

  // Load data
  useEffect(() => {
    const data = localStorage.getItem("subs");
    if (data) setSubs(JSON.parse(data));
  }, []);

  const save = (data: any[]) => {
    setSubs(data);
    localStorage.setItem("subs", JSON.stringify(data));
  };

  const addSub = () => {
    if (!name || !cost) return;

    save([
      ...subs,
      {
        id: Date.now(),
        name,
        cost: Number(cost),
        category,
      },
    ]);

    setName("");
    setCost("");
  };

  const deleteSub = (id: number) => {
    save(subs.filter((s) => s.id !== id));
  };

  const total = subs.reduce((t, s) => t + s.cost, 0);

  // 📊 Category breakdown
  const dataMap: any = {};
  subs.forEach((s) => {
    dataMap[s.category] =
      (dataMap[s.category] || 0) + s.cost;
  });

  const chartData = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  const COLORS = ["#000", "#444", "#888", "#bbb"];

  const bg = dark ? "bg-black text-white" : "bg-[#f9fafb]";
  const card = dark ? "bg-gray-900" : "bg-white";

  return (
    <div className={`min-h-screen px-6 py-10 ${bg}`}>

      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-10">
        <h1 className="text-lg font-medium">SubTrack</h1>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {dark ? <Sun /> : <Moon />}
        </button>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* Total */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-10"
        >
          <h2 className="text-6xl font-semibold tracking-tight">
            ₹{total}
          </h2>
          <p className="text-sm opacity-50 mt-2">
            monthly spend
          </p>
        </motion.div>

        {/* 🧠 Habit Loop */}
        {subs.length > 0 && (
          <div className="text-center mb-6 text-sm opacity-60">
            You are spending ₹{total}/month
          </div>
        )}

        {total > 1000 && (
          <div className="text-center text-sm text-red-500 mb-6">
            You're losing money every month ⚠️
          </div>
        )}

        {/* 🚀 Onboarding */}
        {subs.length === 0 && (
          <div className="text-center mb-10 opacity-60">
            Add your first subscription to get started 👇
          </div>
        )}

        {/* 📊 Chart */}
        {chartData.length > 0 && (
          <div className={`p-6 rounded-2xl mb-8 ${card}`}>
            <h3 className="text-sm mb-4 opacity-60">
              Spending breakdown
            </h3>

            <ResponsiveContainer width="100%" height={250}>
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

        {/* Add Subscription */}
        <div className={`p-5 rounded-2xl mb-8 ${card}`}>

          <input
            placeholder="Subscription name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border outline-none"
          />

          <input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg border outline-none"
          >
            <option>Entertainment</option>
            <option>Work</option>
            <option>Education</option>
            <option>Utilities</option>
          </select>

          <button
            onClick={addSub}
            className={`w-full py-3 rounded-xl ${
              dark
                ? "bg-white text-black"
                : "bg-black text-white"
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
              initial={{ opacity: 0, y: 10 }}
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
                className="opacity-60 hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}