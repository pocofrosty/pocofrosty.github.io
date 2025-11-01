if (self.location.hostname === 'localhost') {
  console.log('Service worker disabled on localhost');
} else {
  importScripts('https://cdn.bootcdn.net/ajax/libs/workbox-sw/7.1.0/workbox-sw.js')
}

// Force waiting service worker to become active
self.skipWaiting();
workbox.core.clientsClaim();

if (workbox) {
  console.log('Workbox loaded successfully');

  // Precache about, index, 404 pages
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '7' },
    { url: '/about/', revision: '3' },
    { url: '/404.html', revision: '1' },
  ]);

  // Offline fallback for navigation requests
  self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open("fallback-cache").then((cache) => cache.add('/404.html')),
  );
  });

  const fallbackPlugin = {
    handlerDidError: async () => {
      const fallbackResponse = await caches.match('/404.html', {
        cacheName: "fallback-cache",
      });
      return fallbackResponse;
    },
  };

  // Serve all HTML pages under /post/ with Cache First strategy
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/post/'),
    new workbox.strategies.CacheFirst({
      cacheName: 'post-pages-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 day
        }),
        fallbackPlugin,
      ],
    })
  );

  // Serve CSS and JS files with Stale While Revalidate strategy
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.endsWith('.css') || url.pathname.endsWith('.js'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-js-resources-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    })
  );

  // Serve image files with Cache First strategy
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.jpeg') || url.pathname.endsWith('.gif') || url.pathname.endsWith('.svg'),
    new workbox.strategies.CacheFirst({
      cacheName: 'image-resources-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    })
  );

  // Serve font files with Cache First strategy
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.endsWith('.woff') || url.pathname.endsWith('.woff2') || url.pathname.endsWith('.ttf') || url.pathname.endsWith('.otf'),
    new workbox.strategies.CacheFirst({
      cacheName: 'font-resources-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    })
  );

  // Default handler for other requests
  workbox.routing.setDefaultHandler(
        // Prefer cache, if cache is not available, use network request
        new workbox.strategies.NetworkFirst({
          cacheName: 'default-cache',
            networkTimeoutSeconds: 3,
        })
    );
} else {
  console.log('Workbox failed to load');
}