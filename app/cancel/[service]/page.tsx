import { Metadata } from "next";
import CancelClient from "./CancelClient";

/* ✅ PRE-GENERATE POPULAR PAGES (SEO BOOST) */
export function generateStaticParams() {
  return [
    { service: "netflix" },
    { service: "spotify" },
    { service: "youtube-premium" },
    { service: "amazon-prime" },
    { service: "chatgpt-plus" },
    { service: "canva" },
  ];
}

/* ✅ SEO METADATA (DYNAMIC FOR EVERY PAGE) */
export async function generateMetadata({
  params,
}: {
  params: { service: string };
}): Promise<Metadata> {
  const name = params.service.replace(/-/g, " ");

  return {
    title: `How to cancel ${name} subscription`,
    description: `Step-by-step guide to cancel ${name}. Stop unwanted payments easily.`,
  };
}

/* ✅ MAIN PAGE */
export default function Page({
  params,
}: {
  params: { service: string };
}) {
  return <CancelClient service={params.service} />;
}