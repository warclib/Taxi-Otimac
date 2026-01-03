const CACHE_NAME = 'otimac-v3'; // Subimos a v3 para que el cambio sea inmediato
const ASSETS = [
  './',
  './chofer.html',
  './cliente.html',
  './manifest-chofer.json',
  './manifest-cliente.json',
  './logo.png',    // Imagen del Chofer
  './cliente.png'  // Imagen del Cliente (Agréga esta línea)
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
