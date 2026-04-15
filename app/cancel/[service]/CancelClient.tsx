"use client";

export default function CancelClient({ service }: { service: string }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Cancel {service}</h1>
    </div>
  );
}