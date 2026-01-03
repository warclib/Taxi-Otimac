// Nombre de la caché (Cambiamos a v4 para forzar que el celular borre lo viejo)
const CACHE_NAME = 'otimac-v4';

// Lista completa de archivos que deben guardarse en el celular
const ASSETS = [
  './',
  './chofer.html',
  './cliente.html',
  './manifest-chofer.json',
  './manifest-cliente.json',
  './logo.png',    // Imagen para el Chofer
  './cliente.png'  // Imagen para el Cliente
];

// 1. Instalación: Guarda todos los archivos en la memoria del celular
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Otimac: Archivos guardados en caché');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activación: Borra versiones viejas de la caché
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 3. Respuesta: Muestra los archivos incluso sin internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
