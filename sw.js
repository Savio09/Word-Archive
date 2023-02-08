//install service worker
self.addEventListener("install", evt => {
    console.log('Installation complete');
})

//activate events
self.addEventListener('activate', evt => {
    console.log('Activation complete')
})

//fetch event
self.addEventListener("fetch", evt => {
    console.log('fetch event', evt)
})