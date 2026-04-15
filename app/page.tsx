import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">

      {/* Hero */}
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">
          Stop wasting money on subscriptions
        </h1>

        <p className="text-gray-500 mb-6">
          Track everything you pay for. See what you actually use.
          Cut what you don’t.
        </p>

        <Link href="/tracker">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90">
            Start Tracking
          </button>
        </Link>
      </div>

      {/* Features */}
      <div className="mt-16 grid gap-6 text-center max-w-xl">
        <div>
          <h3 className="font-semibold">💸 See your real monthly cost</h3>
          <p className="text-sm text-gray-500">
            No guessing. Know exactly where your money goes.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">⚠️ Find wasted subscriptions</h3>
          <p className="text-sm text-gray-500">
            Instantly see what you’re paying for but not using.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">⏰ Never miss a payment</h3>
          <p className="text-sm text-gray-500">
            Track upcoming charges before they hit your account.
          </p>
        </div>
      </div>

    </div>
  );
}