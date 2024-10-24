/// <reference no-default-lib="true"/>
/// <reference lib="esNext" />
/// <reference lib="WebWorker" />
import type { MichiProcessType } from "@michijs/dev-server";

const sw = self as ServiceWorkerGlobalScope & typeof globalThis;

declare const michiProcess: MichiProcessType;

const buildFiles = michiProcess.env.BUILD_FILES;
const cacheName = michiProcess.env.CACHE_NAME;

const expectedCaches = [cacheName];

function urlsToRequests(urls: string[]): Request[] {
  return urls.map((url) => new Request(url, { cache: "no-cache" }));
}

const storeBuildFilesIntoCache = async () => {
  const cache = await caches.open(cacheName);
  return await cache.addAll(urlsToRequests(buildFiles));
};

const controlPageAndClean = async () => {
  const cacheNames = await caches.keys();
  return await Promise.all(
    cacheNames.map((x) =>
      expectedCaches.includes(x) ? undefined : caches.delete(x),
    ),
  );
};

const getFromCacheOrFetch = async (e: FetchEvent) => {
  if (e.request.method !== "GET") {
    return fetch(e.request);
  }
  const response = await caches.match(e.request);
  return response || fetch(e.request);
};

// Cache, falling back to network strategy
sw.addEventListener("install", (e) => {
  e.waitUntil(storeBuildFilesIntoCache());
  sw.skipWaiting();
});

sw.addEventListener("activate", (e) => {
  sw.clients.claim();
  e.waitUntil(controlPageAndClean());
});

sw.addEventListener("fetch", (e) => {
  e.respondWith(getFromCacheOrFetch(e));
});

sw.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") sw.skipWaiting();
});
