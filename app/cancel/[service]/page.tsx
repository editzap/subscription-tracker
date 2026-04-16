export function generateStaticParams() {
  return []; // allow ANY service dynamically
}

export async function generateMetadata({ params }: any) {
  const service = params.service.replace(/-/g, " ");

  return {
    title: `Cancel ${service}`,
    description: `How to cancel ${service} subscription`,
  };
}

import CancelClient from "./CancelClient";

export default function Page({ params }: any) {
  return <CancelClient service={params.service} />;
}