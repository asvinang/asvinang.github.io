'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ede5cfba5415c54e8100c31af4f458a1",
"assets/assets/app/LogoApp1TransRound.png": "254a5f274916e5bdd51444d904280e31",
"assets/assets/app/LogoCompany.png": "1e01f9426b684710473eeac5eae321d4",
"assets/assets/app/LogoCompanyCPG.png": "548617f80c0f10b68a32c091a0f8057b",
"assets/assets/app/LogoCompanySJ.png": "813ceddb670b6ff71d9974371696d01b",
"assets/assets/fonts/Dosis-Bold.ttf": "e66b462dad6eca8df6d91f09cea2b8ae",
"assets/assets/fonts/Dosis-Light.ttf": "f69a657556f9ff249553619387e13dae",
"assets/assets/fonts/Dosis-Regular.ttf": "f880e616dc9b1626463799dbeef9e96b",
"assets/assets/icons/AppIcons.zip": "d208d2522f0d3c650d6efb7a275f25f5",
"assets/assets/icons/icon.png": "6541d40f86169e424c3aab3890920b4a",
"assets/assets/icons/icon.svg": "b99453bf982be029a4e918b8e3814d11",
"assets/assets/projects/Proj1.jpg": "05bf3e867b30e2e77f91e137c10f50cf",
"assets/assets/projects/Proj10.jpg": "c2e1d0bf2c3f2ed82ce7237176720d50",
"assets/assets/projects/Proj2.jpg": "1c5ae4ebbd117981ded99e7e202be510",
"assets/assets/projects/Proj3.jpg": "b4bfa8e551298906c01d74cba23fde7b",
"assets/assets/projects/Proj4.jpg": "ef00d3b43e81b2df0178fcc77688fe1c",
"assets/assets/projects/Proj5.jpg": "44a3a5dad23748b13c066cdd7602d22c",
"assets/assets/projects/Proj6.jpg": "559e7768653ad8ef36faf3618caf7460",
"assets/assets/projects/Proj7.jpg": "e55216001baf5b3a3ff2bbdd9371ac10",
"assets/assets/projects/Proj8.jpg": "234daf8b517349b9746f8f4b178d00ec",
"assets/assets/projects/Proj9.jpg": "c4554610d54b9ea56d2feead99f8e445",
"assets/assets/projects/resolve/Reso1.jpg": "664db9d210537836e2d7c529cbd34cd8",
"assets/assets/projects/resolve/Reso10.jpg": "4b09b31028ebe454bea9fad83ae305dc",
"assets/assets/projects/resolve/Reso2.jpg": "a10ed281a9aee5bc28bb08d562eb6dd7",
"assets/assets/projects/resolve/Reso3.jpg": "bac282c2672f2997c61c8d00690bd2ba",
"assets/assets/projects/resolve/Reso4.jpg": "2eb8d490599835dbd3343a2b1332ac03",
"assets/assets/projects/resolve/Reso5.jpg": "30bfde7931f877d5e3c8d0b0c877006b",
"assets/assets/projects/resolve/Reso6.jpg": "2764c49811d544f62210cebb3742636b",
"assets/assets/projects/resolve/Reso7.jpg": "7ee98df5e1968fce82881cdf12f56bab",
"assets/assets/projects/resolve/Reso8.jpg": "fce2b9c6fdae96079875c1ecf9bf2307",
"assets/assets/projects/resolve/Reso9.jpg": "467fbca240a30f3a19d87dbe1e0c9788",
"assets/assets/weather/night.png": "2a21a0d7d9caa2a257fab79ac3353ee7",
"assets/assets/weather/night.svg": "5b18835289605728823d6def28138557",
"assets/assets/weather/rainy.png": "db03cf020d08348557877565ca909c0c",
"assets/assets/weather/rainy.svg": "7a5002d1971ce9406b0ca5e02b98c66d",
"assets/assets/weather/storm.png": "3e1ac81ad5516836cfc2f678ad1556b6",
"assets/assets/weather/storm.svg": "d0e94477fe88577520e57f0182a42e38",
"assets/assets/weather/sunny.png": "b9217ff3144aef6306d90f1a3bc040e5",
"assets/assets/weather/sunny.svg": "56e717d5aec8ecd3e2984175ae4a4b9e",
"assets/FontManifest.json": "56eb7227bcece046f16e4a08e46f3983",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/NOTICES": "0b3579cd85fe7d2257cb3aed333fdb52",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/flutter_signin_button/assets/logos/2.0x/google_dark.png": "937022ea241c167c8ce463d2ef7ed105",
"assets/packages/flutter_signin_button/assets/logos/2.0x/google_light.png": "8f10eb93525f0c0259c5e97271796b3c",
"assets/packages/flutter_signin_button/assets/logos/3.0x/google_dark.png": "ac553491f0002941159b405c2d37e8c6",
"assets/packages/flutter_signin_button/assets/logos/3.0x/google_light.png": "fe46d37e7d6a16ecd15d5908a795b4ee",
"assets/packages/flutter_signin_button/assets/logos/google_dark.png": "c32e2778b1d6552b7b4055e49407036f",
"assets/packages/flutter_signin_button/assets/logos/google_light.png": "f71e2d0b0a2bc7d1d8ab757194a02cac",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"assets/packages/line_awesome_flutter/lib/fonts/LineAwesome.ttf": "bcc78af7963d22efd760444145073cd3",
"assets/packages/outline_material_icons/lib/outline_material_icons.ttf": "6b94994fffd9868330d830fcb18a6026",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "52f11daf6e9a5591d0442ac9071bca80",
"/": "52f11daf6e9a5591d0442ac9071bca80",
"main.dart.js": "863bb0149fdba5f5836b923eb81fbf9a",
"manifest.json": "a0d61cf375632ed9bafdec936dda6d6b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/LICENSE",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.message == 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message = 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.add(resourceKey);
    }
  }
  return Cache.addAll(resources);
}
