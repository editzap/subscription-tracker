"use client";

import { useState, useEffect } from "react";
import { Trash2, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function Tracker() {
  const [subs, setSubs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [dark, setDark] = useState(false);

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

    save([...subs, { id: Date.now(), name, cost: Number(cost) }]);

    setName("");
    setCost("");
  };

  const deleteSub = (id: number) => {
    save(subs.filter((s) => s.id !== id));
  };

  const total = subs.reduce((t, s) => t + s.cost, 0);

  const bg = dark ? "bg-black text-white" : "bg-[#f9fafb]";
  const card = dark
    ? "bg-gray-900"
    : "bg-white shadow-sm";

  return (
    <div className={`min-h-screen px-6 py-10 ${bg}`}>

      {/* TOP */}
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-10">
        <h1 className="text-lg font-medium">SubTrack</h1>

        <button onClick={() => setDark(!dark)}>
          {dark ? <Sun /> : <Moon />}
        </button>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* TOTAL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-semibold tracking-tight">
            ₹{total}
          </h2>
          <p className="text-sm opacity-50 mt-2">
            monthly spend
          </p>
        </motion.div>

        {/* INPUT CARD */}
        <div className={`p-5 rounded-2xl mb-8 ${card}`}>

          <input
            placeholder="Subscription name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg bg-transparent border outline-none"
          />

          <input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-transparent border outline-none"
          />

          <button
            onClick={addSub}
            className="w-full py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black"
          >
            Add
          </button>
        </div>

        {/* LIST */}
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
                  ₹{s.cost}
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