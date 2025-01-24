'use client';

import { useState, useEffect } from 'react';
import { FiDownload, FiCheck } from 'react-icons/fi';
import { usePWA } from '@/components/PWAProvider';

export default function InstallPrompt() {
  const { deferredPrompt, isInstalled, onInstall } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);
  const [isiOSSafari, setIsiOSSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (navigator as any).standalone === true; 
    if (isIos && !isStandalone) {
      setIsiOSSafari(true);
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        onInstall();
      }
    } catch (err) {
      console.error('Error installing PWA:', err);
    } finally {
      setIsInstalling(false);
    }
  };

  const getButtonText = () => {
    if (isInstalled) return 'Successfully Installed!';
    if (isInstalling) return 'Installing...';
    if (!deferredPrompt) return 'Installation Not Available';
    return 'Install MiniApps Project';
  };

  const getButtonIcon = () => {
    if (isInstalled) return <FiCheck className="w-6 h-6" />;
    return <FiDownload className="w-6 h-6" />;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {isiOSSafari ? (
        <div className="bg-yellow-100 p-8 rounded-lg shadow-md w-full max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Install on iPhone</h2>
          <p className="text-gray-700 text-lg">
            Tap the "Share" icon, then "Add to Home Screen" to install.
          </p>
        </div>
      ) : (
        <button
          onClick={deferredPrompt ? handleInstall : undefined}
          disabled={!deferredPrompt || isInstalling || isInstalled}
          className={`
            install-button flex items-center justify-center space-x-3 
            w-full max-w-sm px-8 py-4 rounded-xl
            text-9xl font-semibold
            transform transition-all duration-200
            ${isInstalled 
              ? 'bg-green-500 text-white cursor-default' 
              : deferredPrompt 
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {getButtonIcon()}
          <span>{getButtonText()}</span>
        </button>
      )}

      {!isInstalled && !isiOSSafari && (
        <p className="text-gray-500 text-sm">
          {deferredPrompt 
            ? 'Install now for the best experience!' 
            : 'Visit this site in Chrome or Edge to install'}
        </p>
      )}
    </div>
  );
}
