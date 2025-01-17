'use client';

import { useEffect } from 'react';

export default function PWAProvider() {
  useEffect(() => {
    console.log('PWAProvider mounted');
    
    if (typeof window !== 'undefined') {
      console.log('Window is defined');
      
      if ('serviceWorker' in navigator) {
        console.log('Service Worker is supported');
        
        window.addEventListener('load', async () => {
          try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registration successful:', registration);

            // Listen for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              console.log('Service Worker update found:', newWorker?.state);
            });

            // Listen for controller change
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              console.log('Service Worker controller changed');
            });

            // Listen for messages from the Service Worker
            navigator.serviceWorker.addEventListener('message', (event) => {
              console.log('Message from Service Worker:', event.data);
            });

          } catch (error) {
            console.error('Service Worker registration failed:', error);
          }
        });
      } else {
        console.log('Service Worker is not supported');
      }

      // Add beforeinstallprompt event listener
      window.addEventListener('beforeinstallprompt', (event) => {
        console.log('beforeinstallprompt event fired');
        // Optionally prevent Chrome 67 and earlier from automatically showing the prompt
        event.preventDefault();
      });
    }
  }, []);

  return null;
}
