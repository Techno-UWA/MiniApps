'use client';

export default function Offline() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">You&apos;re offline</h1>
      <p className="text-lg mb-8">Please check your internet connection and try again.</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
