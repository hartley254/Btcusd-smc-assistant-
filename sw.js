const CACHE="hartley-smc-educational-v1";
const CORE=["./","./index.html","./manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{const q=e.request,u=new URL(q.url);if(q.method!=="GET"||u.origin!==self.location.origin)return;e.respondWith(fetch(q).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(q,copy));}return r;}).catch(()=>caches.match(q).then(c=>c||caches.match("./index.html"))));});
