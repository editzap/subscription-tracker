"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelHome() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const go = () => {
    if (!query) return;
    const slug = query.toLowerCase().replace(/ /g, "-");
    router.push(`/cancel/${slug}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-xl w-full">

        <h1 className="text-3xl font-semibold mb-4">
          Cancel Any Subscription
        </h1>

        <p className="text-gray-400 mb-6">
          Enter any service name to get cancellation steps.
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