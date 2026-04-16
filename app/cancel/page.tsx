export default function CancelPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-xl w-full text-center">

        <h1 className="text-3xl font-semibold mb-4">
          Cancel Any Subscription
        </h1>

        <p className="text-gray-400 mb-6">
          Go to a specific service manually:
        </p>

        <div className="space-y-2 text-white/80">
          <p>/cancel/netflix</p>
          <p>/cancel/spotify</p>
          <p>/cancel/gym</p>
        </div>

      </div>

    </main>
  );
}