"use client";

import { useState } from "react";

export default function Tracker() {
  const [subs, setSubs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const add = () => {
    if (!name || !price) return;
    setSubs([...subs, { name, price: Number(price) }]);
    setName("");
    setPrice("");
  };

  const total = subs.reduce((a, b) => a + b.price, 0);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-3xl mb-6">Tracker</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Netflix"
          className="bg-white/10 px-3 py-2 rounded"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="15"
          type="number"
          className="bg-white/10 px-3 py-2 rounded"
        />

        <button onClick={add} className="bg-white text-black px-4 rounded">
          Add
        </button>
      </div>

      {subs.map((s, i) => (
        <div key={i} className="flex justify-between mb-2">
          <span>{s.name}</span>
          <span>${s.price}</span>
        </div>
      ))}

      <div className="mt-6 font-bold">Total: ${total}</div>

    </main>
  );
}