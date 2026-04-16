"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const popular = [
  "Netflix",
  "Spotify",
  "YouTube Premium",
  "Amazon Prime",
  "ChatGPT Plus",
  "Canva",
];

export default function CancelHome() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const goToService = (name: string) => {
    const slug = name.toLowerCase().replace(/ /g, "-");
    router.push(`/cancel/${slug}`);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-4xl font-semibold mb-3">
          Cancel Any Subscription
        </h1>
        <p className="text-gray-400">
          Search or enter any service to get cancellation steps.
        </p>
      </div>

      {/* SEARCH INPUT */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex gap-3">

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter any service (e.g. Notion, Gym, Adobe)"
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={() => query && goToService(query)}
            className="bg-white text-black px-6 rounded-xl"
          >
            Search
          </button>

        </div>
      </div>

      {/* POPULAR SERVICES */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

        {popular.map((service, i) => (
          <div
            key={i}
            onClick={() => goToService(service)}
            className="cursor-pointer p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition"
          >
            <h2 className="text-lg font-semibold">{service}</h2>
            <p className="text-gray-400 text-sm mt-2">
              Cancel {service}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}