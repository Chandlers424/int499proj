
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('streamlist-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/styles.css',  // Ensure you update with actual paths to your stylesheets and assets
        '/app.js'        // Ensure you update with actual paths to your app's scripts
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
