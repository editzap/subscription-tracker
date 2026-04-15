export function generateStaticParams() {
  return [
    { service: "netflix" },
    { service: "spotify" },
    { service: "youtube-premium" },
  ];
}

export async function generateMetadata({ params }: any) {
  return {
    title: `Cancel ${params.service}`,
  };
}

import CancelClient from "./CancelClient";

export default function Page({ params }: any) {
  return <CancelClient service={params.service} />;
}