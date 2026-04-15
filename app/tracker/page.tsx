"use client";

import { useState, useEffect } from "react";
import { Trash2, Pencil, Moon, Sun } from "lucide-react";

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

    save([
      ...subs,
      { id: Date.now(), name, cost: Number(cost) },
    ]);

    setName("");
    setCost("");
  };

  const deleteSub = (id: number) => {
    save(subs.filter((s) => s.id !== id));
  };

  const total = subs.reduce((t, s) => t + s.cost, 0);

  const bg = dark ? "bg-black text-white" : "bg-gray-50 text-black";
  const card = dark ? "bg-gray-900" : "bg-white";

  return (
    <div className={`min-h-screen p-6 ${bg}`}>

      {/* Top */}
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-8">
        <h1 className="text-xl font-semibold">SubTrack</h1>

        <button onClick={() => setDark(!dark)}>
          {dark ? <Sun /> : <Moon />}
        </button>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* Total */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold">₹{total}</h2>
          <p className="text-sm opacity-60">Monthly spend</p>
        </div>

        {/* Add */}
        <div className={`p-4 rounded-xl mb-6 ${card}`}>
          <input
            placeholder="Subscription name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2 p-3 border rounded-lg"
          />

          <input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full mb-2 p-3 border rounded-lg"
          />

          <button
            onClick={addSub}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Add Subscription
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {subs.map((s) => (
            <div
              key={s.id}
              className={`p-4 rounded-xl flex justify-between ${card}`}
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm opacity-60">₹{s.cost}</p>
              </div>

              <button onClick={() => deleteSub(s.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}