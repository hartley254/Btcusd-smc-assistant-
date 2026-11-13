const CACHE='btcusd-smc-v2';
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll([
  './',
  './index.html',
  './manifest.webmanifest',
  './hartley-smc-icon-192.png',
  './hartley-smc-icon-512.png'
])
));
self.addEventListener('fetch',event=>{
  if(new URL(event.request.url).origin===location.origin){
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
  }
});
