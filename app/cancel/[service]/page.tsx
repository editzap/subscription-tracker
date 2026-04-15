"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function CancelPage({ params }: any) {
  const router = useRouter();
  const service = params.service;

  // Format name
  const formatted = service
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">

      {/* Back */}
      <button
        onClick={() => router.push("/tracker")}
        className="flex items-center gap-2 text-sm mb-8 opacity-70 hover:opacity-100 transition"
      >
        <ArrowLeft size={16} />
        Back to tracker
      </button>

      <div className="max-w-xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Cancel {formatted}
          </h1>

          <p className="text-gray-600">
            Stop paying for something you don’t use.
            This takes less than 2 minutes.
          </p>
        </motion.div>

        {/* Highlight Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 rounded-2xl border mb-8 bg-gray-50"
        >
          <p className="text-sm opacity-70 mb-1">
            Potential savings
          </p>
          <p className="text-2xl font-semibold">
            Save money every month 💸
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="font-semibold mb-4">
            Steps to cancel
          </h2>

          <div className="space-y-4 text-sm">
            {[
              `Go to ${formatted} account settings`,
              "Open billing or subscription section",
              "Click cancel or manage plan",
              "Confirm cancellation",
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  {i + 1}
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/search?q=how+to+cancel+${service}`,
                "_blank"
              )
            }
            className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:scale-[1.02] transition"
          >
            <ExternalLink size={16} />
            View detailed guide
          </button>

          <button
            onClick={() =>
              alert("Coming soon: better alternatives")
            }
            className="border py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Find cheaper alternatives
          </button>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-xs text-gray-400 text-center">
          Built to help you spend smarter.
        </div>

      </div>
    </div>
  );
}