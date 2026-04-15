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

  // 🧠 SMART SUGGESTIONS
  const suggestions: string[] = [];

  // 1. Unused subscriptions
  subs.forEach((s) => {
    if (!s.used) {
      suggestions.push(
        `Cancel ${s.name} → save ₹${s.cost}/month`
      );
    }
  });

  // 2. Too many entertainment apps
  const entertainment = subs.filter(
    (s) => s.category === "Entertainment"
  );
  if (entertainment.length >= 3) {
    suggestions.push(
      "You have multiple OTT apps → consider keeping 1–2"
    );
  }

  // 3. High spend warning
  if (total > 2000) {
    suggestions.push(
      `You're spending ₹${total} monthly → review subscriptions`
    );
  }

  const bg = dark ? "bg-black text-white" : "bg-white text-black";
  const card = dark ? "bg-gray-900 border-gray-700" : "bg-gray-100";

  return (
    <div className={`min-h-screen px-4 py-6 ${bg}`}>

      {/* Top */}
      <div className="flex justify-between items-center max-w-3xl mx-auto mb-6">
        <h1 className="text-xl font-bold">SubTrack</h1>
        <button onClick={() => setDark(!dark)}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="max-w-3xl mx-auto">

        {/* Total */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold">
            ₹{total.toFixed(0)}
          </h2>
          <p className="text-sm opacity-60">Monthly Spend</p>
        </div>

        {/* 🧠 Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-6 p-4 rounded-xl border bg-yellow-100 text-black">
            <h3 className="font-semibold mb-2">Smart Suggestions</h3>

            {suggestions.map((s, i) => (
              <p key={i} className="text-sm mb-1">
                • {s}
              </p>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-2 mb-6">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="border p-2 rounded"
          />

          <div className="flex gap-2">
            <select
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              className="border p-2 rounded w-1/2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded w-1/2"
            >
              <option>Entertainment</option>
              <option>Work</option>
              <option>Education</option>
              <option>Utilities</option>
            </select>
          </div>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white py-2 rounded"
          >
            <PlusCircle size={16} className="inline mr-1" />
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* List */}
        <AnimatePresence>
          {subs.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`p-3 mb-2 rounded border ${card}`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs opacity-60">
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

                <div className="flex gap-2">
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
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>
    </div>
  );
}