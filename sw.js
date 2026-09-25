const CACHE_NAME = 'kisan-dost-v2';

// List of files to save on the phone for offline use
const FILES_TO_SAVE = [
  './index.html',
  './manifest.json',
  '/Kisan dosti.png'
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Step A: Save files into the phone's memory
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Kisan Dost: Saving app files for offline use!');
      return cache.addAll(FILES_TO_SAVE);
    })
  );
  self.skipWaiting();
});

// Step B: Serve saved files if internet is gone
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedFile) => {
      // If we have it saved, show it! Otherwise get it from the internet.
      return cachedFile || fetch(event.request);
    })
  );
});
