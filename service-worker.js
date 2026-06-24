// ─── Morning Pride Gear Builder — Service Worker ────────────────────────────
// Strategy: Cache-First for all app assets (full offline support)
// Version this string any time you deploy updated files so the SW
// triggers an install + activate cycle and the cache refreshes.

const CACHE_NAME = 'mp-gear-builder-v26';

// Every URL the app needs to function offline.
// Add any additional static assets your build outputs here.
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',
  './app_source.jsx',
  // catalog.js inlined into index.html (window.CATALOG); app code lives in
  // app_source.jsx, compiled in-browser by Babel (see index.html)
  // CDN dependencies loaded at runtime by index.html / the app
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://unpkg.com/@supabase/supabase-js@2.108.2/dist/umd/supabase.js',
];

// ── Install: pre-cache all app shell assets ───────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Install — caching app shell');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache same-origin files strictly; CDN files with no-cors so we at
      // least get an opaque response that can be served offline.
      const sameOrigin = PRECACHE_URLS.filter(u => !u.startsWith('http'));
      const crossOrigin = PRECACHE_URLS.filter(u => u.startsWith('http'));

      return Promise.all([
        cache.addAll(sameOrigin),
        ...crossOrigin.map(url =>
          cache.add(new Request(url, { mode: 'no-cors' })).catch(err =>
            console.warn('[SW] Could not pre-cache', url, err)
          )
        ),
      ]);
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: delete any old caches ──────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activate — cleaning old caches');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: Cache-First, falling back to network ───────────────────────────────
self.addEventListener('fetch', event => {
  // Only intercept GET requests; let POST/PUT/DELETE pass through.
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and non-http(s) requests.
  if (!event.request.url.startsWith('http')) return;

  // Never cache Supabase API traffic (auth + the shared builds library must
  // always be live). Let these go straight to the network, uncached.
  if (event.request.url.includes('.supabase.co')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Serve from cache immediately, then revalidate in background.
        const network = fetch(event.request)
          .then(response => {
            if (response && response.status === 200 && response.type !== 'opaque') {
              caches.open(CACHE_NAME).then(cache =>
                cache.put(event.request, response.clone())
              );
            }
            return response;
          })
          .catch(() => { /* offline — cached copy already served */ });

        return cached;
      }

      // Not in cache — try the network and cache the result.
      return fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200) return response;

          // Only cache same-origin or successful cross-origin responses.
          const shouldCache =
            event.request.url.startsWith(self.location.origin) ||
            response.type === 'basic' ||
            response.type === 'cors';

          if (shouldCache) {
            caches.open(CACHE_NAME).then(cache =>
              cache.put(event.request, response.clone())
            );
          }

          return response;
        })
        .catch(() => {
          // Completely offline and nothing cached — return offline page.
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
