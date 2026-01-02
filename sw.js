const CACHE_NAME = 'voom-chofer-v1';
const urlsToCache = [
  './',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js'
];

// Instalación: Guarda los archivos esenciales en el celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Estrategia: Primero buscar en caché, si no hay, ir a internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Receptor de notificaciones en segundo plano
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : { 
        title: 'OTIMAC', 
        body: '¡Tienes un nuevo viaje disponible!' 
    };

    const options = {
        body: data.body,
        icon: 'taxi-chofer.png', // Asegúrate de que el icono exista
        badge: 'taxi-chofer.png',
        vibrate: [200, 100, 200],
        data: { url: './' } // Abre la app al tocar
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Abrir la app al hacer clic en la notificación
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
