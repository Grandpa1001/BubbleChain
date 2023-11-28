const CACHE_NAME = 'my-cache2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/index.js',
          '/pages/Login.js',
          '/pages/App.js',
          // Dodaj ścieżki do innych zasobów, które chcesz cache'ować
        ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
