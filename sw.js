const CACHE_VERSION='3';
const CACHE='scheda-dd-'+CACHE_VERSION;
const ASSETS=['./','index.html','app.js','style.css','manifest.json','icons/icon-192.png','icons/icon-512.png','icons/icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=e.request.url;
  const doc=e.request.mode==='navigate'||/\/(index\.html|app\.js|sw\.js)(\?|$)/.test(u);
  if(doc){
    e.respondWith(
      fetch(e.request).then(res=>{
        if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}
        return res;
      }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(h=>h||caches.match('./')).then(h=>h||Response.error()))
    );
  }else{
    e.respondWith(
      caches.match(e.request,{ignoreSearch:true}).then(h=>h||fetch(e.request).then(res=>{
        if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}
        return res;
      }))
    );
  }
});
