const V="tichupro-v1-13";
const CORE=["./","index.html","manifest.json","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png","apple-touch-icon.png","icon-32.png","fondo.webp","logo.webp","splash.webp","melodia.mp3"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("tichupro-")&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url),propio=u.origin===location.origin&&u.pathname.startsWith(new URL(self.registration.scope).pathname),font=u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com";
  if(!propio&&!font)return;
  if(propio&&r.headers.has("range")){e.respondWith(rangeResp(r));return}
  if(font){ // tipografías: caché primero (no cambian)
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x&&(x.ok||x.type==="opaque")){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x})));return}
  // Archivos propios: red primero saltándose la caché del navegador; la caché solo se usa sin conexión
  e.respondWith(fetch(r,{cache:"no-cache"}).then(x=>{if(x&&x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r.mode==="navigate"?"index.html":r,c))}return x})
    .catch(()=>caches.match(r.mode==="navigate"?"index.html":r,{ignoreSearch:true}).then(m=>m||caches.match("index.html"))))});

async function rangeResp(r){
  let m=await caches.match(r.url,{ignoreSearch:true});
  if(!m){m=await fetch(r.url);if(m.ok){const c=m.clone();caches.open(V).then(k=>k.put(r.url,c))}}
  if(!m.ok)return m;
  const b=await m.blob(),n=b.size,g=/bytes=(\d*)-(\d*)/.exec(r.headers.get("range"))||[];
  let s=g[1]?+g[1]:0,t=g[2]?+g[2]:n-1;
  if(!g[1]&&g[2]){s=Math.max(0,n-+g[2]);t=n-1}
  t=Math.min(t,n-1);
  if(s>t)return new Response(null,{status:416,headers:{"Content-Range":"bytes */"+n}});
  return new Response(b.slice(s,t+1),{status:206,headers:{"Content-Type":m.headers.get("Content-Type")||"audio/mpeg","Content-Range":`bytes ${s}-${t}/${n}`,"Content-Length":String(t-s+1)}})}
