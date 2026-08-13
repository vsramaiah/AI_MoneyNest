const VERSION = "moneynest-v2.1.1-offline-r39";
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const OFFLINE_FALLBACK_URL = "./offline.html";
const APP_SHELL = [
  "./",
  "./index.html",
  "./moneynest-app.html",
  "./local-store.js",
  "./ui-shell.js",
  "./app-state.js",
  "./backup-restore.js",
  "./pwa.js",
  "./manifest.json",
  OFFLINE_FALLBACK_URL,
  "./icon.svg",
  "./icon-maskable.svg",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable.png",
  "./screenshot-wide.svg",
  "./screenshot-narrow.svg",
  "./.nojekyll"
];

const NETWORK_FIRST_PATTERNS = [
  /\/$/,
  /index\.html$/,
  /moneynest-app\.html$/,
  /manifest\.json$/
];

const APP_SHELL_PATTERNS = [
  /local-store\.js$/,
  /ui-shell\.js$/,
  /app-state\.js$/,
  /backup-restore\.js$/,
  /pwa\.js$/,
  /offline\.html$/,
  /apple-touch-icon\.png$/,
  /icon(-maskable)?\.svg$/,
  /icon-(192|512)\.png$/,
  /screenshot-(wide|narrow)\.svg$/,
  /\.nojekyll$/
];

function shouldUseNetworkFirst(url, request) {
  return request.mode === "navigate" || NETWORK_FIRST_PATTERNS.some((pattern) => pattern.test(url.pathname));
}

function isAppShellAsset(url) {
  return APP_SHELL_PATTERNS.some((pattern) => pattern.test(url.pathname));
}

function isCacheableResponse(response) {
  return !!response && response.ok && (response.type === "basic" || response.type === "default");
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL.map((asset) => new Request(asset, { cache: "reload" }))))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
        .map((key) => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

async function networkFirst(request) {
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (isCacheableResponse(response)) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      return caches.match(OFFLINE_FALLBACK_URL);
    }
    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (isCacheableResponse(response)) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) || caches.match(OFFLINE_FALLBACK_URL);
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request, { cache: "no-store" })
    .then(async (response) => {
      if (isCacheableResponse(response)) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise || new Response("Offline", { status: 503, statusText: "Service Unavailable" });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (shouldUseNetworkFirst(url, request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isAppShellAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
