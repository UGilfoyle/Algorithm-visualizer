// Service Worker for Caching and Performance
const CACHE_NAME = 'algorithm-visualizer-v1';
const STATIC_CACHE = 'static-v1';
const ICON_CACHE = 'icons-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/main.js',
    '/visualizer.js',
    '/audio.js',
    '/algorithms.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.log('Cache install error:', err);
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => {
                        return name !== STATIC_CACHE && name !== ICON_CACHE;
                    })
                    .map((name) => caches.delete(name))
            );
        })
    );
    return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Cache icons with longer TTL
    if (url.pathname.startsWith('/icons/')) {
        event.respondWith(
            caches.open(ICON_CACHE).then((cache) => {
                return cache.match(request).then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(request).then((fetchResponse) => {
                        if (fetchResponse.ok) {
                            cache.put(request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    });
                });
            })
        );
        return;
    }

    // Cache static assets
    if (STATIC_ASSETS.some(asset => url.pathname.includes(asset))) {
        event.respondWith(
            caches.match(request).then((response) => {
                return response || fetch(request).then((fetchResponse) => {
                    if (fetchResponse.ok) {
                        const cacheToUse = url.pathname.startsWith('/icons/') ? ICON_CACHE : STATIC_CACHE;
                        caches.open(cacheToUse).then((cache) => {
                            cache.put(request, fetchResponse.clone());
                        });
                    }
                    return fetchResponse;
                });
            })
        );
        return;
    }

    // Network first for other requests
    event.respondWith(
        fetch(request).catch(() => {
            return caches.match(request);
        })
    );
});

