const CACHE_NAME = 'voom-chofer-v1';
const urlsToCache = [
  './',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js'
];

// Instalación y Caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Estrategia de carga
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// RECEPTOR DE NOTIFICACIONES (Segundo Plano)
self.addEventListener('push', event => {
    const options = {
        body: '¡Tienes un nuevo viaje disponible!',
        icon: 'taxi-chofer.png',
        badge: 'taxi-chofer.png',
        vibrate: [200, 100, 200],
        tag: 'nuevo-viaje',
        data: { url: './' }
    };
    event.waitUntil(
        self.registration.showNotification('OTIMAC 🚖', options)
    );
});

// Clic en la notificación: Abre la App
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            if (windowClients.length > 0) {
                return windowClients[0].focus();
            }
            return clients.openWindow('./');
        })
    );
});
