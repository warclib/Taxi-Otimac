const CACHE_NAME = 'otimac-v2'; // Cambiamos a v2 para forzar la actualización
const ASSETS = [
  './',
  './chofer.html',
  './cliente.html',
  './manifest-chofer.json',
  './manifest-cliente.json', // <--- Faltaba este archivo en la lista
  './logo.png'
];

// Instalación del Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Estrategia de respuesta (Offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
