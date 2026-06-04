// ==========================================================================
// PTCG EoR Helper - Service Worker (sw.js)
// ==========================================================================

const CACHE_NAME = 'ptcg-eor-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install Event - caching core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] 快取核心資源中...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // Force activation
  );
});

// Activate Event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] 正在清除舊快取:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Cache-First Strategy
self.addEventListener('fetch', event => {
  // Only handle http/https requests, avoid chrome-extension schemes etc.
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Fallback to network
      return fetch(event.request).then(networkResponse => {
        // Cache dynamic assets if needed, but for now we have pre-cached everything.
        return networkResponse;
      }).catch(err => {
        console.log('[Service Worker] 離線且無快取可用:', event.request.url, err);
      });
    })
  );
});
