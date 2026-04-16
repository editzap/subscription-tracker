"use client";

export default function CancelClient({ service }: { service: string }) {
  const name = service.replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-semibold mb-4">
          Cancel {name}
        </h1>

        <p className="text-gray-400 mb-8">
          Follow these general steps to cancel your subscription.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

          <p>1. Log into your {name} account</p>
          <p>2. Go to billing or subscription settings</p>
          <p>3. Click cancel subscription</p>
          <p>4. Confirm cancellation</p>

        </div>

      </div>

    </main>
  );
}