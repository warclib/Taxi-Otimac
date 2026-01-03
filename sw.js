const CACHE_NAME = 'otimac-v1';
const ASSETS = [
  './',
  './chofer.html',
  './cliente.html',
  './manifest-chofer.json',
  './logo.png'
];

// Instalación del Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Estrategia de respuesta (Permite que la app abra sin señal)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
