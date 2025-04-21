const CACHE_NAME = "my-cache-v1";
const urlsToCache = ["/", "/index.html", "/bamboo.jpg", "/main.js", "/bamboo.webp","/bottle.jpg","/bottle.webp","/charger.jpg","/charger.webp","/ecobag.jpg","/ecobag.webp","logo.png","logo.webp"];
// Install event: Caches the assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets");
      return cache.addAll(urlsToCache);
    })
  );
});
// Fetch event: Serves cached assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
// Activate event: Clears old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
