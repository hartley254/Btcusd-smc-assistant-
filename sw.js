
const CACHE = "hartley-smc-educational-v3";
const CACHE_PREFIX = "hartley-smc-educational-";

const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key =>
            key.startsWith(CACHE_PREFIX) &&
            key !== CACHE
          )
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin
  ) return;

  const isPage =
    request.mode === "navigate" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/");

  event.respondWith((async () => {
    if (isPage) {
      try {
        const freshRequest = new Request(request, {
          cache: "no-store"
        });

        const response = await fetch(freshRequest);

        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        const cached = await caches.match(request);
        return cached ||
          await caches.match("./index.html") ||
          Response.error();
      }
    }

    try {
      const response = await fetch(request);

      if (response.ok) {
        const cache = await caches.open(CACHE);
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      return await caches.match(request) || Response.error();
    }
  })());
});
