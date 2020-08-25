self.addEventListener('install', function(e) {
  console.log('mise en cache');
  e.waitUntil(
    caches.open('cache-pwa_fuel')
      .then(function(cache) {
        return cache.addAll([
          '/pwa_fuel/index.html',
          '/pwa_fuel/js/jquery.js',
          '/pwa_fuel/js/fct.js',
          '/pwa_fuel/css/loader.css',
          '/pwa_fuel/css/style.css',
          '/pwa_fuel/extract/PrixCarburants_instantane.xml',
          '/pwa_fuel/image/128x.png',
          '/pwa_fuel/image/512x.png',
          '/pwa_fuel/image/2424.svg',
          '/pwa_fuel/image/atm.svg',
          '/pwa_fuel/image/refresh.svg',
          '/pwa_fuel/image/restau.svg',
          '/pwa_fuel/image/wash.svg',
          '/pwa_fuel/image/wc.svg',
        ]);
      })
  );

 });

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
 });

