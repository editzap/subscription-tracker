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
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4445312802335744"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        <div className="min-h-screen flex flex-col">

          <div className="flex-1">
            {children}
          </div>

          <footer className="text-center text-sm text-gray-500 py-6 space-x-4 border-t">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </footer>

        </div>
      </body>
    </html>
  );
}