const buildFiles = process.env.BUILD_FILES;
const cacheName = process.env.CACHE_NAME;

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(buildFiles).then(() => { self.skipWaiting(); });
        })
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.open(cacheName)
            .then((cache) => { return cache.match(e.request, { ignoreSearch: true }); })
            .then((response) => { return response || fetch(e.request); })
    );
});