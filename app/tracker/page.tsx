"use client";
import { useState, useEffect } from "react";

export default function Tracker() {
  const [subs, setSubs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [cycle, setCycle] = useState("monthly");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [dark, setDark] = useState(false);

  // Load
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

    if (editId) {
      const updated = subs.map((s) =>
        s.id === editId
          ? { ...s, name, cost: Number(cost), cycle, date }
          : s
      );
      save(updated);
      setEditId(null);
    } else {
      const newSub = {
        id: Date.now(),
        name,
        cost: Number(cost),
        cycle,
        date,
        used: true,
      };
      save([...subs, newSub]);
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
    setEditId(s.id);
  };

  const toggleUsage = (id: number) => {
    save(
      subs.map((s) =>
        s.id === id ? { ...s, used: !s.used } : s
      )
    );
  };

  const total = subs.reduce(
    (t, s) => t + (s.cycle === "yearly" ? s.cost / 12 : s.cost),
    0
  );

  const wasted = subs.reduce((t, s) => {
    if (!s.used) {
      return t + (s.cycle === "yearly" ? s.cost / 12 : s.cost);
    }
    return t;
  }, 0);

  const bg = dark ? "bg-black text-white" : "bg-white text-black";
  const card = dark ? "bg-gray-900 border-gray-700" : "bg-gray-100";

  return (
    <div className={`min-h-screen p-6 ${bg}`}>

      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold">SubTrack</h1>

        <button
          onClick={() => setDark(!dark)}
          className="border px-3 py-1 rounded-lg text-sm"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto">

        {/* Total */}
        <div className="text-center mb-10">
          <p className="text-sm opacity-70">Monthly Spend</p>
          <h2 className="text-5xl font-bold">
            ₹{total.toFixed(0)}
          </h2>
          <p className="text-sm opacity-60">
            ₹{(total * 12).toFixed(0)} / year
          </p>

          {wasted > 0 && (
            <p className="text-red-500 mt-2 text-sm">
              ₹{wasted.toFixed(0)} wasted / month
            </p>
          )}
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-4 gap-2 mb-8">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <select
            value={cycle}
            onChange={(e) => setCycle(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mb-10 bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl"
        >
          {editId ? "Update Subscription" : "Add Subscription"}
        </button>

        {/* List */}
        <div className="space-y-3">
          {subs.map((s) => (
            <div
              key={s.id}
              className={`p-4 rounded-xl border flex justify-between items-center ${card}`}
            >
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm opacity-70">
                  ₹{s.cost} / {s.cycle}
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

              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => startEdit(s)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSub(s.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}