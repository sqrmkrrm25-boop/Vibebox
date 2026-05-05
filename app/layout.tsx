import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VibeBox | מה שקורה ב-VibeBox נשאר ב-VibeBox',
  description: 'Ultra-Fast Interactive Party App - אפליקציית מסיבה אינטראקטיבית',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'VibeBox',
    description: 'Ultra-Fast Interactive Party App',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#050508" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen w-full">{children}</div>
      </body>
    </html>
  );
}
