// Service worker della scheda D&D (sistema di aggiornamento come quello di Taccuino, dalla v21).
// VERSION va cambiata a ogni rilascio (script/scheda_dd_versione.py): è il cambio di questo file che fa capire al browser
// che c'è una versione nuova. NOTES sono le novità mostrate nell'avviso. I personaggi (localStorage) non passano da qui.
const VERSION = '21';
const NOTES = ['Aggiornamenti come nel Taccuino: questo avviso con le novità, "Più tardi", e in Salva e importa la versione installata con "Cerca aggiornamenti" e "Forza aggiornamento"', 'Live: funziona anche sui telefoni che non sanno decomprimere (iPhone con iOS vecchio) e avvisa se qualcuno è ancora sulla v18'];
const CACHE = 'scheda-dd-' + VERSION;
const CORE = ['./', 'app.js', 'style.css', 'theme.js', 'incantesimi.js', 'manuale.js', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-180.png', 'icons/icon.svg'];

self.addEventListener('install', e => {
  // {cache:'reload'} scavalca la cache HTTP (GitHub Pages tiene i file 10 minuti): si scarica davvero la versione nuova.
  // Un file alla volta e con un tempo massimo: se la rete si pianta l'installazione fallisce in modo pulito e il browser riprova.
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    for (const u of CORE) {
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 20000);
      try {
        const r = await fetch(new Request(u, { cache: 'reload' }), { signal: ctl.signal });
        if (!r.ok) throw new Error(u + ' → ' + r.status);
        await c.put(u, await clean(r));
      } finally { clearTimeout(t); }
    }
    await c.put('index.html', (await c.match('./')).clone());
  })());
  // niente skipWaiting automatico: la nuova versione aspetta che l'utente tocchi "Aggiorna ora",
  // così l'app non si ricarica a sorpresa (per esempio durante un combattimento live)
});

// una risposta arrivata dopo un reindirizzamento non può servire per aprire una pagina: se ne fa una copia pulita
async function clean(r) {
  if (!r.redirected) return r;
  return new Response(await r.blob(), { status: r.status, statusText: r.statusText, headers: r.headers });
}

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('scheda-dd-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('message', e => {
  // 'SKIP_WAITING' è il messaggio delle versioni fino alla 20: serve al passaggio dal vecchio sistema
  if (e.data === 'skipWaiting' || e.data === 'SKIP_WAITING') self.skipWaiting();
  if (e.data === 'info' && e.ports && e.ports[0]) e.ports[0].postMessage({ version: VERSION, notes: NOTES });
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // i broker del live (wss) non passano da qui
  // l'app viene dalla cache della versione installata: parte subito, funziona offline ed è sempre tutta della stessa versione
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' && await c.match('index.html'));
    return hit ? (req.mode === 'navigate' ? clean(hit) : hit) : fetch(req);
  })());
});
