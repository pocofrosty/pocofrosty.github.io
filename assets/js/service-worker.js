importScripts('https://cdn.bootcdn.net/ajax/libs/workbox-sw/7.1.0/workbox-sw.js');

// Cache version number
let cacheVersion = '-240619';
// Maximum number of entries
const maxEntries = 10000;

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    // Cache all files for your site
    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'https://pocofrosty.github.io' || url.origin === 'http://localhost:1313',
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'site-cache' + cacheVersion,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    // Cache Fonts
    workbox.routing.registerRoute(
        new RegExp('.*\.(?:woff|woff2|ttf|otf|eot)'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'fonts' + cacheVersion,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    // Cache public libraries like bootcdn, unpkg, jsdelivr
    workbox.routing.registerRoute(
        new RegExp('^https://(?:cdn\.bootcdn\.net|unpkg\.com|cdn\.jsdelivr\.net)'),
        new workbox.strategies.CacheFirst({
            cacheName: 'cdn' + cacheVersion,
            fetchOptions: {
                mode: 'cors',
                credentials: 'omit',
            },
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );

    // Cache images
    workbox.routing.registerRoute(
        new RegExp('.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'image-cache' + cacheVersion,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    // Cache CSS and JS
    workbox.routing.registerRoute(
        new RegExp('.*\.(css|js)'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-resources' + cacheVersion,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );

    // Default match for remaining requests
    workbox.routing.setDefaultHandler(
        new workbox.strategies.NetworkFirst({
            networkTimeoutSeconds: 3,
        })
    );

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}