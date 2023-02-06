/// <reference no-default-lib="true"/>
/// <reference lib="esNext" />
/// <reference lib="WebWorker" />
import type { ProcessSWType } from '@michijs/dev-server'

const sw = self as ServiceWorkerGlobalScope & typeof globalThis;

declare var process: ProcessSWType;

const buildFiles = process.env.BUILD_FILES;
const cacheName = process.env.CACHE_NAME;

sw.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(buildFiles).then(() => { sw.skipWaiting(); });
    })
  );
});

sw.addEventListener("activate", (e) => {
  e.waitUntil(sw.clients.claim());
});

sw.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.open(cacheName)
      .then((cache) => { return cache.match(e.request, { ignoreSearch: true }); })
      .then((response) => { return response || fetch(e.request); })
  );
});