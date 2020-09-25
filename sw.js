const staticCacheName = "site-static-v2";
const dynamicCache = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "/pages/fallback.html",
];

// install SW
self.addEventListener("install", (evt) => {
  // SHELL CACHING
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

//Activate Event
self.addEventListener("activate", (evt) => {
  // Delete old cach versions
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    //async promise
    caches
      .match(evt.request)
      .then((cacheRes) => {
        // looks for existing cach | OR | fetch it
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            // New Cache
            return caches.open(dynamicCache).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1)
          return caches.match("/pages/fallback.html");
      })
  );
});
