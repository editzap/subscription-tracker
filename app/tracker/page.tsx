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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

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

  // 🔔 Request notification permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
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

  const getDaysLeft = (date: string) => {
    const today = new Date();
    const next = new Date(date);
    return Math.ceil(
      (next.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  // 🔔 Trigger notifications
  useEffect(() => {
    subs.forEach((s) => {
      const days = getDaysLeft(s.date);

      if (days === 0 && Notification.permission === "granted") {
        new Notification(`${s.name} is due today 💸`);
      }
    });
  }, [subs]);

  // 📊 Category totals
  const categoryTotals: any = {};
  subs.forEach((s) => {
    const value = s.cycle === "yearly" ? s.cost / 12 : s.cost;
    categoryTotals[s.category] =
      (categoryTotals[s.category] || 0) + value;
  });

  const chartData = Object.entries(categoryTotals).map(
    ([name, value]) => ({ name, value })
  );

  const COLORS = ["#000", "#555", "#888", "#ccc"];

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

        {/* 📊 Chart */}
        {chartData.length > 0 && (
          <div className="mb-6 flex justify-center">
            <PieChart width={250} height={250}>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={100}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
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
          {subs.map((s) => {
            const days = getDaysLeft(s.date);

            return (
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

                    <p className="text-xs mt-1 text-yellow-500">
                      {days === 0
                        ? "Due today"
                        : days === 1
                        ? "Due tomorrow"
                        : `${days} days left`}
                    </p>
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
            );
          })}
        </AnimatePresence>

      </div>
    </div>
  );
}