"use client";

export default function CancelPage({ params }: any) {
  const service = params.service;

  const formatted =
    service.charAt(0).toUpperCase() + service.slice(1);

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        How to cancel {formatted}
      </h1>

      <p className="mb-6 text-gray-600">
        Stop paying for something you don’t use.
      </p>

      <div className="space-y-3 mb-8">
        <p>1. Go to {formatted} account settings</p>
        <p>2. Open billing or subscription section</p>
        <p>3. Click cancel or downgrade</p>
        <p>4. Confirm cancellation</p>
      </div>

      <button
        onClick={() =>
          window.open(
            `https://www.google.com/search?q=how+to+cancel+${service}`,
            "_blank"
          )
        }
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        View detailed guide
      </button>

    </div>
  );
}