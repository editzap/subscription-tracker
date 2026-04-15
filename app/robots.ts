export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://subscription-tracker-pied.vercel.app//sitemap.xml",
  };
}