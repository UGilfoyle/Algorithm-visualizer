// Service Worker for Caching and Performance
const CACHE_NAME = 'algorithm-visualizer-v1';
const STATIC_CACHE = 'static-v1';
const ICON_CACHE = 'icons-v1';

// Get base path for GitHub Pages compatibility
const getBasePath = () => {
    // For GitHub Pages, use repository name as base path
    // For root domain or Vercel, use empty string
    const path = self.location.pathname;
    if (path.includes('/Algorithm-visualizer/')) {
        return '/Algorithm-visualizer';
    }
    return '';
};

const BASE_PATH = getBasePath();

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

    // Cache static assets
    const assetPath = url.pathname.replace(BASE_PATH, '');
    if (STATIC_ASSETS.some(asset => assetPath.includes(asset.replace(BASE_PATH, ''))) || 
        assetPath === '/' || assetPath === '/index.html' ||
        assetPath.endsWith('.css') || assetPath.endsWith('.js')) {
        event.respondWith(
            caches.match(request).then((response) => {
                return response || fetch(request).then((fetchResponse) => {
                    if (fetchResponse.ok) {
                        const cacheToUse = url.pathname.includes('/icons/') ? ICON_CACHE : STATIC_CACHE;
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

