importScripts('https://cdn.bootcdn.net/ajax/libs/workbox-sw/7.1.0/workbox-sw.js');

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

} else {
  console.log('Workbox failed to load');
}