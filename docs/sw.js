const c = "mastermind-cache-v1", i = [{"revision":null,"url":"index.html"},{"revision":null,"url":"registerSW.js"},{"revision":"d937f301b18f65655bd045f368bb0ca6","url":"manifest.webmanifest"}], l = [
  "./",
  "./index.html",
  "./src/style.css",
  "./src/main.ts",
  "./src/game.ts",
  "./src/ui.ts",
  "./favicon.png",
  "./icon.png",
  "./manifest.webmanifest"
];
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(c).then((n) => (console.log("Cache opened"), n.addAll([
      ...l,
      ...i ? i.map((s) => s.url) : []
    ]))).then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (e) => {
  const n = [c];
  e.waitUntil(
    caches.keys().then((s) => Promise.all(
      s.map((t) => {
        if (n.indexOf(t) === -1)
          return caches.delete(t);
      })
    )).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((n) => {
      if (n)
        return n;
      const s = e.request.clone();
      return fetch(s).then((t) => {
        if (!t || t.status !== 200 || t.type !== "basic")
          return t;
        const a = t.clone();
        return caches.open(c).then((r) => {
          e.request.url.indexOf("/api/") === -1 && r.put(e.request, a);
        }), t;
      }).catch(() => new Response("You are offline. Please reconnect to use this app."));
    })
  );
});
