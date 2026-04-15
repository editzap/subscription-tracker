"use client";

import { useRouter } from "next/navigation";

export default function CancelClient({ service }: { service: string }) {
  const router = useRouter();

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => router.back()}>
        ← Back
      </button>

      <h1 style={{ fontSize: 24, marginTop: 20 }}>
        Cancel {service}
      </h1>
    </div>
  );
}