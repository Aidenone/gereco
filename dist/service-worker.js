if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let c={};const u=s=>l(s,n),o={module:{uri:n},exports:c,require:u};e[n]=Promise.all(i.map((s=>o[s]||u(s)))).then((s=>(r(...s),c)))}}define(["./workbox-db5fc017"],(function(s){"use strict";s.setCacheNameDetails({prefix:"wpa-gereco"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/130.22ae05ef.css",revision:null},{url:"/css/478.08207e9e.css",revision:null},{url:"/css/612.9aecfc7b.css",revision:null},{url:"/css/805.0bb5da22.css",revision:null},{url:"/css/870.d970f5df.css",revision:null},{url:"/css/874.8e5ff1d0.css",revision:null},{url:"/css/929.f2e293ce.css",revision:null},{url:"/css/app.f506a036.css",revision:null},{url:"/img/fleche2_blanc.dac177de.svg",revision:null},{url:"/img/fleche_blanc.f0ce88a1.svg",revision:null},{url:"/img/logo-gereco-2.012b9603.svg",revision:null},{url:"/img/logo-gereco.e6dd7bdb.svg",revision:null},{url:"/index.html",revision:"aa294e2d0bcc16b20b44305955fa61a1"},{url:"/js/130.7f5304b4.js",revision:null},{url:"/js/478.481b0dd9.js",revision:null},{url:"/js/612.d7cf250e.js",revision:null},{url:"/js/805.ee90f3ef.js",revision:null},{url:"/js/870.5fe535b4.js",revision:null},{url:"/js/874.45f1c8b1.js",revision:null},{url:"/js/929.f80c7c0d.js",revision:null},{url:"/js/app.f3eb5f04.js",revision:null},{url:"/js/chunk-vendors.996fa3ff.js",revision:null},{url:"/manifest.json",revision:"902dc40ae75163a68c39d1ecc8271c51"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
