"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [subs, setSubs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [cycle, setCycle] = useState("monthly");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Load
  useEffect(() => {
    const data = localStorage.getItem("subs");
    if (data) setSubs(JSON.parse(data));
  }, []);

  // Save
  const save = (data: any[]) => {
    setSubs(data);
    localStorage.setItem("subs", JSON.stringify(data));
  };

  // Add or Update
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
        used: true, // default
      };
      save([...subs, newSub]);
    }

    setName("");
    setCost("");
    setDate("");
  };

  // Delete
  const deleteSub = (id: number) => {
    const updated = subs.filter((s) => s.id !== id);
    save(updated);
  };

  // Start Edit
  const startEdit = (sub: any) => {
    setName(sub.name);
    setCost(sub.cost);
    setCycle(sub.cycle);
    setDate(sub.date);
    setEditId(sub.id);
  };

  // Toggle usage
  const toggleUsage = (id: number) => {
    const updated = subs.map((s) =>
      s.id === id ? { ...s, used: !s.used } : s
    );
    save(updated);
  };

  // Monthly total
  const total = subs.reduce((t, s) => {
    return t + (s.cycle === "yearly" ? s.cost / 12 : s.cost);
  }, 0);

  // Wasted money
  const wasted = subs.reduce((t, s) => {
    if (!s.used) {
      return t + (s.cycle === "yearly" ? s.cost / 12 : s.cost);
    }
    return t;
  }, 0);

  // Days left
  const getDaysLeft = (date: string) => {
    const today = new Date();
    const next = new Date(date);
    const diff = Math.ceil(
      (next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  };

  // Sort upcoming
  const upcoming = [...subs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          Subscription Tracker
        </h1>

        {/* Total */}
        <div className="text-center mb-4">
          <p className="text-gray-500 text-sm">Monthly Spend</p>
          <h2 className="text-4xl font-bold">
            ₹{total.toFixed(0)}
          </h2>
          <p className="text-xs text-gray-400">
            ₹{(total * 12).toFixed(0)} / year
          </p>
        </div>

        {/* Wasted */}
        {wasted > 0 && (
          <div className="text-center mb-6">
            <p className="text-red-500 text-sm">
              ₹{wasted.toFixed(0)} wasted / month
            </p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-2 mb-6">
          <input
            placeholder="Subscription name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          <input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <div className="flex gap-2">
            <select
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              className="w-1/2 border rounded-lg p-2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-1/2 border rounded-lg p-2"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white rounded-lg p-2 hover:opacity-90"
          >
            {editId ? "Update Subscription" : "Add Subscription"}
          </button>
        </div>

        {/* Upcoming Payments */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-500 mb-2">Upcoming Payments</h3>

          {upcoming.length === 0 && (
            <p className="text-center text-gray-400 text-sm">
              No upcoming payments
            </p>
          )}

          {upcoming.map((s) => {
            const days = getDaysLeft(s.date);

            return (
              <div
                key={s.id}
                className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg mb-2"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-gray-500">
                    ₹{s.cost} • {s.date}
                  </p>
                </div>

                <div className="text-right text-xs">
                  {days >= 0 ? (
                    <p className="text-orange-600">{days} days</p>
                  ) : (
                    <p className="text-red-500">Overdue</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* List */}
        <div className="space-y-2">
          <h3 className="text-sm text-gray-500">All Subscriptions</h3>

          {subs.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{s.cost} / {s.cycle}
                </p>

                {/* Toggle */}
                <button
                  onClick={() => toggleUsage(s.id)}
                  className={`text-xs mt-1 ${
                    s.used ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {s.used ? "Using" : "Not Using"}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(s)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSub(s.id)}
                  className="text-red-500 text-sm"
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