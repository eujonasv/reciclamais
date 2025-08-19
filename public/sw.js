import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';

// Precache all static assets
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Cache Mapbox tiles and resources for offline map functionality
registerRoute(
  ({ url }) => 
    url.hostname === 'api.mapbox.com' ||
    url.hostname.includes('tiles.mapbox.com') ||
    url.hostname.includes('mapbox.com'),
  new CacheFirst({
    cacheName: 'mapbox-tiles',
    plugins: [{
      cacheWillUpdate: async ({ response }) => {
        return response.status === 200 ? response : null;
      },
      cacheKeyWillBeUsed: async ({ request }) => {
        // Remove access token from cache key for better caching
        const url = new URL(request.url);
        url.searchParams.delete('access_token');
        return url.toString();
      },
    }],
  })
);

// Cache Supabase API responses with cache-first for better offline experience
registerRoute(
  ({ url }) => url.pathname.includes('/rest/v1/collection_points'),
  new CacheFirst({
    cacheName: 'api-collection-points',
    networkTimeoutSeconds: 3,
    plugins: [{
      cacheWillUpdate: async ({ response }) => {
        return response.status === 200 ? response : null;
      },
    }],
  })
);

// Cache all Supabase API calls for offline functionality
registerRoute(
  ({ url }) => url.hostname.includes('supabase.co'),
  new CacheFirst({
    cacheName: 'supabase-api',
    networkTimeoutSeconds: 3,
    plugins: [{
      cacheWillUpdate: async ({ response }) => {
        return response.status === 200 ? response : null;
      },
    }],
  })
);

// Cache Google Fonts and other font resources
registerRoute(
  ({ url }) => 
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
  })
);

// Cache images with cache-first strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [{
      cacheWillUpdate: async ({ response }) => {
        return response.status === 200 ? response : null;
      },
    }],
  })
);

// Cache static assets with stale-while-revalidate
registerRoute(
  ({ request }) => 
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'document',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Handle offline fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle navigation requests (page loads)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/') || new Response('Offline - Por favor, conecte-se à internet');
      })
    );
  }
});

// Background sync for when connectivity returns
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle queued operations when back online
      self.registration.sync.register('sync-collection-points')
    );
  }
});

// Show notification when app is updated
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});