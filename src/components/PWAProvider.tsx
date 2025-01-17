'use client';

import { useEffect, useState, createContext, useContext } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type PWAContextType = {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstalled: boolean;
  onInstall: () => void;
};

const PWAContext = createContext<PWAContextType>({
  deferredPrompt: null,
  isInstalled: false,
  onInstall: () => {},
});

export const usePWA = () => useContext(PWAContext);

export default function PWAProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    console.log('PWAProvider mounted');

    const registerServiceWorker = async () => {
      if (typeof window === 'undefined') return;

      try {
        console.log('Starting service worker registration...');
        
        if (!('serviceWorker' in navigator)) {
          console.log('Service workers are not supported');
          return;
        }

        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        console.log('Service Worker registered:', registration.scope);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    const checkInstallState = () => {
      if (typeof window === 'undefined') return;

      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        || (window.navigator as any).standalone
        || document.referrer.includes('android-app://');
      
      console.log('Checking install state:', { isStandalone });
      setIsInstalled(isStandalone);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      const promptEvent = e as BeforeInstallPromptEvent;
      console.log('beforeinstallprompt event fired', promptEvent);
      setDeferredPrompt(promptEvent);
    };

    const handleAppInstalled = () => {
      console.log('App was installed');
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    // Check initial state
    checkInstallState();

    // Register service worker
    registerServiceWorker();

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Monitor installation status changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      console.log('Display mode changed:', e.matches ? 'standalone' : 'browser');
      setIsInstalled(e.matches);
    };
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const handleInstall = async () => {
    console.log('Attempting to install with deferredPrompt:', deferredPrompt);
    
    if (!deferredPrompt) {
      console.log('No installation prompt available');
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      console.log('Install prompt shown');
      
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice;
      console.log('User choice:', choiceResult.outcome);
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the installation');
        setIsInstalled(true);
      } else {
        console.log('User dismissed the installation');
      }
      
      // Clear the saved prompt since it can't be used again
      setDeferredPrompt(null);
    } catch (err) {
      console.error('Error during installation:', err);
    }
  };

  console.log('Render state:', { 
    hasDeferredPrompt: !!deferredPrompt, 
    isInstalled 
  });

  return (
    <PWAContext.Provider 
      value={{
        deferredPrompt,
        isInstalled,
        onInstall: handleInstall,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}
