"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// ✅ SEO METADATA (IMPORTANT)
export async function generateMetadata({ params }: any) {
  const service = params.service;

  const formatted = service
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return {
    title: `How to Cancel ${formatted} Subscription (Step-by-Step)`,
    description: `Learn how to cancel your ${formatted} subscription easily. Step-by-step guide to stop payments and save money.`,
  };
}

export default function CancelPage({ params }: any) {
  const router = useRouter();
  const service = params.service;

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

        {/* SEO Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            How to Cancel {formatted} Subscription
          </h1>

          <p className="text-gray-600">
            Step-by-step guide to cancel your {formatted} subscription,
            stop recurring payments, and save money instantly.
          </p>
        </motion.div>

        {/* Content Block (SEO TEXT) */}
        <div className="mb-8 text-sm text-gray-700 leading-relaxed">
          <p className="mb-3">
            If you're looking to cancel your {formatted} subscription,
            you're not alone. Many users forget about recurring payments
            and end up spending money on services they no longer use.
          </p>

          <p>
            This guide will help you quickly cancel your {formatted} account
            and avoid future charges.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-10">
          <h2 className="font-semibold mb-4">
            Steps to cancel {formatted}
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
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mb-10">
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/search?q=how+to+cancel+${service}`,
                "_blank"
              )
            }
            className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl"
          >
            <ExternalLink size={16} />
            View detailed guide
          </button>

          <button
            onClick={() =>
              alert("Coming soon: cheaper alternatives")
            }
            className="border py-3 rounded-xl"
          >
            Find cheaper alternatives
          </button>
        </div>

        {/* EXTRA SEO CONTENT */}
        <div className="text-sm text-gray-600 leading-relaxed">
          <h3 className="font-semibold mb-2">
            Why cancel {formatted}?
          </h3>

          <p className="mb-3">
            Subscriptions can add up quickly. If you're not actively using
            {formatted}, canceling it can help you save money every month.
          </p>

          <p>
            You can always resubscribe later if needed, so there’s no risk
            in canceling unused services.
          </p>
        </div>

      </div>
    </div>
  );
}