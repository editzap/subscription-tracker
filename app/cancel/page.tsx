"use client";

import { useState } from "react";

export default function CancelPage() {
  const [query, setQuery] = useState("");

  const go = () => {
    if (!query) return;

    const slug = query
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    window.location.href = `/cancel/${slug}`;
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-xl w-full text-center">

        <h1 className="text-3xl font-semibold mb-4">
          Cancel Any Subscription
        </h1>

        <p className="text-gray-400 mb-6">
          Type any service and go instantly.
        </p>

        <div className="flex gap-3">

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Netflix, Spotify, Gym..."
            className="flex-1 bg-white/10 px-4 py-3 rounded-xl outline-none"
          />

          <button
            onClick={go}
            className="bg-white text-black px-5 rounded-xl"
          >
            Go
          </button>

        </div>

      </div>

    </main>
  );
}