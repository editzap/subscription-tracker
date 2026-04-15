import "./globals.css";

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
        {/* AdSense Script (keep even before approval) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        <div className="min-h-screen flex flex-col">

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>

          {/* Footer */}
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