import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navigation from '@/components/Navigation'
import PWAProvider from '@/components/PWAProvider'
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Windsurf Project',
  description: 'Your personal windsurf companion',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon.svg',
    shortcut: '/icons/icon.svg',
    apple: '/icons/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Windsurf Project',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <PWAProvider />
        <div className="min-h-full fade-in">
          <Navigation />
          <main className="container-padding">
            <div className="mx-auto max-w-5xl py-8 px-6 sm:px-12 lg:px-24">
              {children}
            </div>
          </main>
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '0.5rem',
              },
              duration: 4000,
            }}
          />
        </div>
      </body>
    </html>
  )
}
