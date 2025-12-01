// Service Worker for Caching and Performance
// Update this version number on each deployment to force cache refresh
const SW_VERSION = '2.0.0';
const CACHE_NAME = `algorithm-visualizer-${SW_VERSION}`;
const STATIC_CACHE = `static-${SW_VERSION}`;
const ICON_CACHE = `icons-${SW_VERSION}`;

const BASE_PATH = '';

// Assets to cache immediately
const STATIC_ASSETS = [
    `${BASE_PATH}/`,
    `${BASE_PATH}/index.html`,
    `${BASE_PATH}/styles.css`,
    `${BASE_PATH}/main.js`,
    `${BASE_PATH}/visualizer.js`,
    `${BASE_PATH}/audio.js`,
    `${BASE_PATH}/algorithms.js`
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.log('Cache addAll failed:', err);
            });
        })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => {
                        // Delete all caches that don't match current version
                        return (name !== STATIC_CACHE && name !== ICON_CACHE) && 
                               (name.startsWith('algorithm-visualizer-') || name.startsWith('static-') || name.startsWith('icons-'));
                    })
                    .map((name) => {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - network-first for HTML, stale-while-revalidate for assets
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Network-first strategy for HTML files (always get fresh version)
    if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone the response before caching
                    const responseToCache = response.clone();
                    caches.open(STATIC_CACHE).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(request);
                })
        );
        return;
    }

    // Cache-first for icons (they rarely change)
    if (url.pathname.includes('/icons/')) {
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

    // Stale-while-revalidate for CSS and JS files
    if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
        event.respondWith(
            caches.open(STATIC_CACHE).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    // Always fetch in background to update cache
                    const fetchPromise = fetch(request).then((networkResponse) => {
                        if (networkResponse.ok) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => {
                        // Network failed, ignore
                    });

                    // Return cached version immediately if available, otherwise wait for network
                    return cachedResponse || fetchPromise;
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

