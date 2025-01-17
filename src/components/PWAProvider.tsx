'use client';

import { useEffect, useState } from 'react';

export default function PWAProvider() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        console.log('Starting service worker registration...');
        
        // Check if service workers are supported
        if (!('serviceWorker' in navigator)) {
          throw new Error('Service workers are not supported');
        }

        // Check if we're in a secure context (localhost or HTTPS)
        if (!window.isSecureContext) {
          throw new Error('Page must be served over HTTPS or localhost');
        }

        // Get all registered service workers
        const registrations = await navigator.serviceWorker.getRegistrations();
        console.log('Existing registrations:', registrations.length);

        // Unregister any existing service workers
        await Promise.all(registrations.map(registration => registration.unregister()));
        console.log('Unregistered existing service workers');

        // Register the new service worker
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          type: 'classic'
        });

        console.log('Service Worker registered successfully:', {
          scope: registration.scope,
          state: registration.active?.state || 'no active worker'
        });

        // Wait for the service worker to be activated
        if (registration.installing) {
          console.log('Service Worker installing...');
          registration.installing.addEventListener('statechange', () => {
            console.log('Service Worker state changed:', registration.installing?.state);
          });
        }

        if (registration.waiting) {
          console.log('Service Worker waiting...');
        }

        if (registration.active) {
          console.log('Service Worker active!');
        }

        // Force activation if needed
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    // Handle the install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setIsInstallable(true);
    };

    // Register service worker when the window loads
    if (typeof window !== 'undefined') {
      window.addEventListener('load', registerServiceWorker);
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', registerServiceWorker);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      const result = await deferredPrompt.prompt();
      console.log('Install prompt result:', result);
      
      // Reset the deferred prompt -- it can only be used once
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (err) {
      console.error('Error installing PWA:', err);
    }
  };

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleInstallClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
      >
        Install App
      </button>
    </div>
  );
}
