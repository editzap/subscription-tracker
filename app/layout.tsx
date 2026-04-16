import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "SubTrack",
  description: "Track subscriptions and save money",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* GOOGLE SEARCH CONSOLE VERIFICATION */}
        <meta
          name="google-site-verification"
          content="VlskugI9oL7iR415GO-_cqk_HqfxZSzu4BklP4eWymY"
        />
      </head>

      <body>

        {/* ADSENSE SCRIPT */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4445312802335744"
          crossOrigin="anonymous"
        />

        {children}

      </body>
    </html>
  );
}