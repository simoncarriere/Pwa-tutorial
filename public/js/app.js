// In your app.js or main JS file, register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js") // Returns a promise
    .then((reg) => console.log("SW registered", reg))
    .catch((err) => console.log("SW registration failed", err));
}
