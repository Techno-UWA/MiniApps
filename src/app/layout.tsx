import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PWAProvider from '@/components/PWAProvider';
import InstallPWA from '@/components/InstallPWA';
import Navigation from '@/components/Navigation';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'MiniApps',
  description: 'Your personal companion',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MiniApps',
  },
  icons: {
    icon: '/icons/icon-512x512.png',
    shortcut: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="MiniApps" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="MiniApps" />
      </head>
      <body suppressHydrationWarning className={`${inter.className} h-full`}>
        <PWAProvider>
          <div className="min-h-full fade-in">
            <Navigation />
            <main>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {children}
                {children === null && (
                  <div className="flex justify-center mt-20">
                    <button className="install-button text-2xl py-5 px-10 rounded-lg bg-blue-500 hover:bg-blue-700 text-white">
                      Install PWA
                    </button>
                  </div>
                )}
              </div>
            </main>
            <InstallPWA />
            <Toaster 
              position="bottom-right" 
              toastOptions={{
                className: 'dark:bg-gray-800 dark:text-white'
              }} 
            />
          </div>
        </PWAProvider>
      </body>
    </html>
  );
}
