export default function Page({ params }: { params: { service: string } }) {
  const name = params.service.replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-xl text-center">

        <h1 className="text-3xl font-semibold mb-4">
          Cancel {name}
        </h1>

        <p className="text-gray-400">
          Steps to cancel your subscription:
        </p>

        <div className="mt-6 space-y-2 text-white/80">
          <p>1. Login to {name}</p>
          <p>2. Open subscription settings</p>
          <p>3. Click cancel</p>
          <p>4. Confirm</p>
        </div>

      </div>

    </main>
  );
}