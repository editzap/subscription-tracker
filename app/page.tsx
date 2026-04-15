export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Track every subscription.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Know where your money goes. Cancel what you don’t need.
        </p>

        <a
          href="/tracker"
          className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:opacity-80 transition"
        >
          Get Started
        </a>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold text-lg mb-2">Track Spending</h3>
          <p className="text-gray-500">
            See how much you spend every month on subscriptions.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold text-lg mb-2">Cancel Easily</h3>
          <p className="text-gray-500">
            Guides to cancel Netflix, Spotify, and more.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold text-lg mb-2">Stay in Control</h3>
          <p className="text-gray-500">
            Never forget recurring payments again.
          </p>
        </div>

      </section>

    </main>
  );
}