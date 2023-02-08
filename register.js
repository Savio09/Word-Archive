if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then((reg) => console.log("Service worker is registered", reg))
    .catch((err) => console.log("Service worker is not registered", err))
}