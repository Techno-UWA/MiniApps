// Service Worker version
const VERSION = 'v1';
const CACHE_NAME = `windsurf-${VERSION}`;

// Log helper
const log = (message) => {
  console.log(`[Service Worker ${VERSION}] ${message}`);
};

// Files to cache immediately
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon.svg'
];

// Install event handler
self.addEventListener('install', (event) => {
  log('Installing...');
  
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        log('Caching app shell...');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        log('Installation complete!');
      })
  );
});

// Activate event handler
self.addEventListener('activate', (event) => {
  log('Activating...');
  
  // Claim clients immediately
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith('windsurf-') && cacheName !== CACHE_NAME)
            .map(cacheName => {
              log(`Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            })
        );
      })
    ]).then(() => {
      log('Service Worker activated!');
    })
  );
});

// Fetch event handler
self.addEventListener('fetch', (event) => {
  log(`Fetching: ${event.request.url}`);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          log(`Found in cache: ${event.request.url}`);
          return response;
        }
        
        log(`Not in cache, fetching: ${event.request.url}`);
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response before caching
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                log(`Caching new resource: ${event.request.url}`);
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(error => {
            log(`Fetch failed: ${error}`);
            // You could return a custom offline page/image here
            return new Response('Offline');
          });
      })
  );
});

// Message event handler
self.addEventListener('message', (event) => {
  log(`Received message: ${JSON.stringify(event.data)}`);
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
