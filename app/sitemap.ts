export default function sitemap() {
  const baseUrl = "https://your-domain.com";

  // 👇 Add known services (can expand later)
  const services = [
    "netflix",
    "spotify",
    "youtube-premium",
    "amazon-prime",
    "chatgpt-plus",
    "canva",
    "apple-music",
    "disney-plus",
    "hotstar",
    "zoom",
  ];

  const cancelPages = services.map((service) => ({
    url: `${baseUrl}/cancel/${service}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tracker`,
      lastModified: new Date(),
    },
    ...cancelPages,
  ];
}