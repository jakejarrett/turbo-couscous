importScripts("/build/cache-polyfill.js");

'use strict';

/**
 * Strings for the service worker
 *
 * @type {string}
 */
const NAME = 'Turbo couscous';
const VERSION = '0.1';

self.oninstall = _ => {
    self.skipWaiting();
};

self.onactivate = _ => {
    self.clients.claim();
};

/**
 * On a fetch, we're going to cache the response so if we run that request again,
 * we'll hit the cache if we're offline!
 *
 * @param evt
 */
self.onfetch = evt => {
    evt.respondWith(caches.match(evt.request).then(response => response || fetch(evt.request)));

    /** Open the cache with the name & version **/
    caches.open(`${NAME}-v${VERSION}`).then(cache => {
        /** Add each request to cache so if we go offline, the site works fine :) **/
        cache.add(evt.request.url).then(_ => { return self.skipWaiting(); });
    });
};

