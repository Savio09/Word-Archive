//Cache App Assets and firing install events on service worker
const staticCache = 'site-static'
const appShellAssets = [
    "./",
    "./index.html",
    "./style.css",
    "https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Lobster&family=Lobster+Two&family=Montserrat:wght@300&family=Raleway:wght@300&family=Roboto:wght@300&family=Source+Serif+Pro:wght@600&display=swap",
    "https://kit.fontawesome.com/4c0c5e2d66.js"
]
//install event
self.addEventListener("install", evt => {
    console.log('Installation complete');
    evt.waitUntil(
        caches.open(staticCache).then(cache => {
            console.log('Caching app shell items')
            cache.addAll(appShellAssets);
        })
    )
   
})
//activate events
self.addEventListener('activate', evt => {
    console.log('Activation complete')
})

//fetch event
self.addEventListener("fetch", evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})
