const CACHE = "trivia-v2";
const ARQUIVOS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./assets/css/style.css",
    "./src/main.js",
    "./src/core/Engine.js",
    "./src/ui/UI.js",
    "./src/services/Storage.js",
    "./src/data/Questions.js"
];

self.addEventListener("install", (evento) => {
    evento.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
    evento.waitUntil(
        caches.keys().then((chaves) =>
            Promise.all(chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
    evento.respondWith(
        caches.match(evento.request).then((resposta) => resposta || fetch(evento.request))
    );
});
