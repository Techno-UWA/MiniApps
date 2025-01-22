/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
  publicExcludes: ['!screenshots/*'],
  buildExcludes: [
    /chunks\/.*$/,
    /css\/.*$/,
    /webpack\/.*$/,
    /_buildManifest\.js$/,
    /_ssgManifest\.js$/,
    /app-build-manifest\.json$/,
  ],
  fallbacks: {
    document: '/offline',
  },
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  sw: '/sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 2,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 2,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
      }
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 2,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 12 * 60 * 60 // 12 hours
        }
      }
    },
    {
      urlPattern: /\/_next\/image\?url=.+$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'next-image',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 12 * 60 * 60 // 12 hours
        }
      }
    },
    {
      urlPattern: /\.(?:mp3|wav|ogg)$/i,
      handler: 'CacheFirst',
      options: {
        rangeRequests: true,
        cacheName: 'static-audio-assets',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 12 * 60 * 60 // 12 hours
        }
      }
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-js-assets',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 12 * 60 * 60 // 12 hours
        }
      }
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 12 * 60 * 60 // 12 hours
        }
      }
    },
    {
      urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'next-data',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 12 * 60 * 60 // 12 hours
        }
      }
    },
    {
      urlPattern: /\.(?:json|xml|csv)$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'static-data-assets',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 12 * 60 * 60 // 12 hours
        }
      }
    },
    {
      urlPattern: ({url}) => {
        const isSameOrigin = self.origin === url.origin;
        return !isSameOrigin;
      },
      handler: 'NetworkFirst',
      options: {
        cacheName: 'cross-origin',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 30 * 60 // 30 minutes
        },
        networkTimeoutSeconds: 10
      }
    }
  ]
});

const nextConfig = {
  distDir: '.next', // Specify the output directory
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig);
