importScripts("/build/cache-polyfill.js");

/**
 * Service Worker
 */
self.addEventListener("install", function(e) {
    e.waitUntil(
        /**
         * Rename this to a unique identifier for your project (EG/ turbo-couscous)
         */
        caches.open("turbo-couscous").then(function(cache) {
            /**
             * We only need to list local resources, any external resources should get cached.
             */
            return cache.addAll([
                "/",
                "/index.html",
                "/build/app.min.css",
                "/build/bundle.js"
            ]).then(function() {
                return self.skipWaiting();
            });
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
// **/
