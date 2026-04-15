import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <h1 className="font-semibold text-lg">SubTrack</h1>
        <Link href="/tracker">
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
            Open App
          </button>
        </Link>
      </div>

      {/* Hero */}
      <div className="text-center px-6 mt-20 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Track your subscriptions.
          <br />
          <span className="text-gray-600">
            Stop wasting money.
          </span>
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          See exactly how much you spend every month,
          what you actually use, and what you should cancel.
        </p>

        <Link href="/tracker">
          <button className="bg-black text-white px-8 py-3 rounded-xl text-lg hover:opacity-90">
            Start Tracking
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto text-center">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold">₹0 → ₹?</h2>
          <p className="text-gray-600 text-sm mt-2">
            Know your real monthly spend
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold">Hidden Waste</h2>
          <p className="text-gray-600 text-sm mt-2">
            Find subscriptions you don’t use
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold">Stay Ahead</h2>
          <p className="text-gray-600 text-sm mt-2">
            Track upcoming payments easily
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mt-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Everything you need. Nothing you don’t.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Simple & Fast</h3>
            <p className="text-gray-600 text-sm">
              No login. No setup. Start tracking in seconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Smart Insights</h3>
            <p className="text-gray-600 text-sm">
              See where your money is going and what’s waste.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Clean Interface</h3>
            <p className="text-gray-600 text-sm">
              Minimal design focused on clarity and speed.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Private</h3>
            <p className="text-gray-600 text-sm">
              Your data stays in your browser. No tracking.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Start tracking today
        </h2>

        <Link href="/tracker">
          <button className="bg-black text-white px-8 py-3 rounded-xl text-lg hover:opacity-90">
            Open Tracker
          </button>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-gray-500 pb-6">
        Built for clarity. No noise.
      </div>

    </div>
  );
}