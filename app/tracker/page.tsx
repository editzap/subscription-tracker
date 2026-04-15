"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  Pencil,
  Moon,
  Sun,
  PlusCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tracker() {
  const [subs, setSubs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [cycle, setCycle] = useState("monthly");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Entertainment");
  const [editId, setEditId] = useState<number | null>(null);
  const [dark, setDark] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem("subs");
    if (data) setSubs(JSON.parse(data));
  }, []);

  const save = (data: any[]) => {
    setSubs(data);
    localStorage.setItem("subs", JSON.stringify(data));
  };

  const handleSubmit = () => {
    if (!name || !cost || !date) return;

    const newData = {
      id: editId || Date.now(),
      name,
      cost: Number(cost),
      cycle,
      date,
      category,
      used: true,
    };

    if (editId) {
      save(subs.map((s) => (s.id === editId ? newData : s)));
      setEditId(null);
    } else {
      save([...subs, newData]);
    }

    setName("");
    setCost("");
    setDate("");
  };

  const deleteSub = (id: number) => {
    save(subs.filter((s) => s.id !== id));
  };

  const startEdit = (s: any) => {
    setName(s.name);
    setCost(s.cost);
    setCycle(s.cycle);
    setDate(s.date);
    setCategory(s.category);
    setEditId(s.id);
  };

  const toggleUsage = (id: number) => {
    save(
      subs.map((s) =>
        s.id === id ? { ...s, used: !s.used } : s
      )
    );
  };

  // 💰 TOTAL
  const total = subs.reduce(
    (t, s) => t + (s.cycle === "yearly" ? s.cost / 12 : s.cost),
    0
  );

  // 📊 CATEGORY ANALYTICS
  const categoryTotals: any = {};
  subs.forEach((s) => {
    const value = s.cycle === "yearly" ? s.cost / 12 : s.cost;
    categoryTotals[s.category] =
      (categoryTotals[s.category] || 0) + value;
  });

  // 🧠 SMART SUGGESTIONS
  const suggestions: any[] = [];

  // Unused subscriptions
  subs.forEach((s) => {
    if (!s.used) {
      suggestions.push({
        text: `Cancel ${s.name} → save ₹${s.cost}`,
        action: () => {
          window.location.href = `/cancel/${encodeURIComponent(
            s.name.toLowerCase().replace(/\s+/g, "-")
          )}`;
        },
      });
    }
  });

  // Too many entertainment apps
  const entertainment = subs.filter(
    (s) => s.category === "Entertainment"
  );
  if (entertainment.length >= 3) {
    suggestions.push({
      text: "Too many OTT apps → reduce to 1–2",
      action: () => alert("Try keeping only your most used app."),
    });
  }

  // High spend warning
  if (total > 2000) {
    suggestions.push({
      text: `Spending ₹${total}/month → review now`,
      action: () =>
        alert("Check unused subscriptions to reduce cost."),
    });
  }

  const bg = dark ? "bg-black text-white" : "bg-white text-black";
  const card = dark ? "bg-gray-900 border-gray-700" : "bg-gray-100";

  return (
    <div className={`min-h-screen px-4 py-6 ${bg}`}>

      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-3xl mx-auto mb-6">
        <h1 className="text-xl font-bold">SubTrack</h1>

        <button
          onClick={() => setDark(!dark)}
          className="border p-2 rounded-lg"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="max-w-3xl mx-auto">

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl font-bold">
            ₹{total.toFixed(0)}
          </h2>
          <p className="text-sm opacity-60">Monthly Spend</p>
        </motion.div>

        {/* 📊 Analytics */}
        {Object.keys(categoryTotals).length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm mb-2 opacity-70">
              Spending by Category
            </h3>

            {Object.entries(categoryTotals).map(
              ([cat, val]: any) => (
                <div
                  key={cat}
                  className="flex justify-between text-sm"
                >
                  <span>{cat}</span>
                  <span>₹{val.toFixed(0)}</span>
                </div>
              )
            )}
          </div>
        )}

        {/* 🧠 Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-6 p-4 rounded-xl border bg-yellow-100 text-black">
            <h3 className="font-semibold mb-2">
              Smart Suggestions
            </h3>

            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={s.action}
                className="block w-full text-left text-sm mb-2 hover:underline"
              >
                • {s.text}
              </button>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-3 mb-6">
          <input
            placeholder="Subscription name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <div className="flex gap-2">
            <input
              placeholder="Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="border p-3 rounded-xl w-1/2"
            />

            <select
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              className="border p-3 rounded-xl w-1/2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option>Entertainment</option>
            <option>Work</option>
            <option>Education</option>
            <option>Utilities</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl"
          >
            <PlusCircle size={18} />
            {editId ? "Update" : "Add Subscription"}
          </button>
        </div>

        {/* List */}
        <AnimatePresence>
          {subs.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-4 mb-3 rounded-xl border flex justify-between ${card}`}
            >
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm opacity-70">
                  ₹{s.cost} • {s.category}
                </p>

                <button
                  onClick={() => toggleUsage(s.id)}
                  className={`text-xs mt-1 ${
                    s.used ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {s.used ? "Using" : "Not Using"}
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={() => startEdit(s)}>
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => deleteSub(s.id)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>
    </div>
  );
}