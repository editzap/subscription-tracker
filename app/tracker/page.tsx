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

  // 🔥 Streak system
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

    save([
      ...subs,
      {
        id: Date.now(),
        name,
        cost: Number(cost),
        category,
      },
    ]);

    navigator.vibrate?.(10); // mobile feel

    setName("");
    setCost("");
  };

  const deleteSub = (id: number) => {
    save(subs.filter((s) => s.id !== id));
  };

  const total = subs.reduce((t, s) => t + s.cost, 0);

  // 📊 Chart data
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

  // 🔔 Notifications
  const enableNotifications = () => {
    if (Notification.permission === "granted") {
      new Notification("SubTrack Reminder", {
        body: "Check your subscriptions today 💸",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((p) => {
        if (p === "granted") {
          new Notification("Notifications enabled ✅");
        }
      });
    }
  };

  const bg = dark ? "bg-black text-white" : "bg-[#f9fafb]";
  const card = dark ? "bg-gray-900" : "bg-white";

  return (
    <div className={`min-h-screen px-6 py-10 pb-24 ${bg}`}>

      {/* Top */}
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-8">
        <h1 className="text-lg font-medium">SubTrack</h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={enableNotifications}
            className="text-xs opacity-60 underline"
          >
            Remind
          </button>

          <button onClick={() => setDark(!dark)}>
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* Total */}
        <motion.div className="text-center mb-6">
          <h2 className="text-6xl font-semibold">₹{total}</h2>
          <p className="text-sm opacity-50">monthly spend</p>
        </motion.div>

        {/* 🔥 Streak */}
        <div className="text-center mb-6 text-sm opacity-70">
          🔥 {streak} day streak
        </div>

        {/* 🧠 Habit loop */}
        {subs.length > 0 && (
          <div className="text-center text-sm opacity-60 mb-3">
            You are spending ₹{total}/month
          </div>
        )}

        {total > 1000 && (
          <div className="text-center text-sm text-red-500 mb-6">
            You're losing money ⚠️
          </div>
        )}

        {/* 🚀 Onboarding */}
        {subs.length === 0 && (
          <div className="text-center mb-8 opacity-60">
            Add your first subscription 👇
          </div>
        )}

        {/* 📊 Chart */}
        {chartData.length > 0 && (
          <div className={`p-5 rounded-2xl mb-8 ${card}`}>
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

        {/* Add */}
        <div className={`p-5 rounded-2xl mb-8 ${card}`}>
          <input
            placeholder="Subscription name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border"
          />

          <input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg border"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded-2xl flex justify-between ${card}`}
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm opacity-50">
                  ₹{s.cost} • {s.category}
                </p>
              </div>

              <button onClick={() => deleteSub(s.id)}>
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* 📱 Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t p-3 flex justify-around text-sm">
        <span>Home</span>
        <span>Add</span>
        <span>Insights</span>
      </div>
    </div>
  );
}