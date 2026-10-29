const V="tichupro-v1-9";
const CORE=["./","index.html","manifest.json","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png","apple-touch-icon.png","icon-32.png","fondo.webp","logo.webp","splash.webp","melodia.mp3"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("tichupro-")&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url),font=u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com";
  if(u.origin!==location.origin&&!font)return;
  if(r.headers.has("range")&&u.origin===location.origin){e.respondWith(rangeResp(r));return}
  // Red primero para la página (así se actualiza), caché si no hay conexión; caché primero para el resto
  if(r.mode==="navigate"){
    e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put("index.html",c));return x}).catch(()=>caches.match("index.html")));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x&&(x.ok||x.type==="opaque")){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x}).catch(()=>m)))});

async function rangeResp(r){
  let m=await caches.match(r.url);
  if(!m){m=await fetch(r.url);if(m.ok){const c=m.clone();caches.open(V).then(k=>k.put(r.url,c))}}
  if(!m.ok)return m;
  const b=await m.blob(),n=b.size,g=/bytes=(\d*)-(\d*)/.exec(r.headers.get("range"))||[];
  let s=g[1]?+g[1]:0,t=g[2]?+g[2]:n-1;
  if(!g[1]&&g[2]){s=Math.max(0,n-+g[2]);t=n-1}
  t=Math.min(t,n-1);
  if(s>t)return new Response(null,{status:416,headers:{"Content-Range":"bytes */"+n}});
  return new Response(b.slice(s,t+1),{status:206,headers:{"Content-Type":m.headers.get("Content-Type")||"audio/mpeg","Content-Range":`bytes ${s}-${t}/${n}`,"Content-Length":String(t-s+1)}})}
