"use client";

import { useRouter } from "next/navigation";

export default function CancelClient({ service }: { service: string }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-black mb-4"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Cancel {service}
        </h1>

        <p className="text-gray-500 mt-2">
          Follow these steps to cancel your subscription easily.
        </p>

        {/* Steps */}
        <div className="mt-6 space-y-4">

          <div className="p-4 border rounded-xl">
            Go to {service} account settings
          </div>

          <div className="p-4 border rounded-xl">
            Navigate to subscription / billing
          </div>

          <div className="p-4 border rounded-xl">
            Click cancel subscription
          </div>

        </div>

        {/* CTA */}
        <a
          href={`https://www.google.com/search?q=cancel+${service}`}
          target="_blank"
          className="block mt-6 text-center bg-black text-white py-3 rounded-xl hover:opacity-90"
        >
          Open {service} settings
        </a>

      </div>
    </div>
  );
}