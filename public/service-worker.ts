/// <reference no-default-lib="true"/>
/// <reference lib="esNext" />
/// <reference lib="WebWorker" />
import type { ProcessSWType } from '@michijs/dev-server';

const sw = self as ServiceWorkerGlobalScope & typeof globalThis;

declare let process: ProcessSWType;

const buildFiles = process.env.BUILD_FILES;
const cacheName = process.env.CACHE_NAME;

const expectedCaches = [cacheName];

const storeBuildFilesIntoCache = async () => {
  const cache = await caches.open(cacheName);
  return await cache.addAll(buildFiles);
};

const controlPageAndClean = async () => {
  sw.clients.claim();
  const cacheNames = await caches.keys();
  return await Promise.all(
    cacheNames.map((x) =>
      expectedCaches.includes(x) ? undefined : caches.delete(x),
    ),
  );
};

const getFromCacheOrFetch = async (e: FetchEvent) => {
  const response = await caches.match(e.request);
  return response || fetch(e.request);
};

// Cache, falling back to network strategy
sw.addEventListener('install', (e) => {
  sw.skipWaiting();
  e.waitUntil(storeBuildFilesIntoCache());
});

sw.addEventListener('activate', (e) => {
  e.waitUntil(controlPageAndClean());
});

sw.addEventListener('fetch', (e) => {
  e.respondWith(getFromCacheOrFetch(e));
});
