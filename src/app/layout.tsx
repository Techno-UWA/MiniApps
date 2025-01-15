import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navigation from '@/components/Navigation'
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini-Apps Hub',
  description: 'A centralized platform for accessing single-purpose mini-applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
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
