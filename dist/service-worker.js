if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let c={};const u=s=>l(s,n),o={module:{uri:n},exports:c,require:u};e[n]=Promise.all(i.map((s=>o[s]||u(s)))).then((s=>(r(...s),c)))}}define(["./workbox-db5fc017"],(function(s){"use strict";s.setCacheNameDetails({prefix:"wpa-gereco"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/321.00def610.css",revision:null},{url:"/css/354.26ab6adc.css",revision:null},{url:"/css/370.9aecfc7b.css",revision:null},{url:"/css/710.6e342f34.css",revision:null},{url:"/css/795.0cab9404.css",revision:null},{url:"/css/801.1b134103.css",revision:null},{url:"/css/999.673ccdf8.css",revision:null},{url:"/css/app.f506a036.css",revision:null},{url:"/img/fleche2_blanc.dac177de.svg",revision:null},{url:"/img/fleche_blanc.f0ce88a1.svg",revision:null},{url:"/img/logo-gereco-2.012b9603.svg",revision:null},{url:"/img/logo-gereco.e6dd7bdb.svg",revision:null},{url:"/index.html",revision:"071be8e541d9710b55a5e5d15b1740eb"},{url:"/js/321.751cb1bf.js",revision:null},{url:"/js/354.27c97ec9.js",revision:null},{url:"/js/370.2e449ed1.js",revision:null},{url:"/js/710.d7e6e41a.js",revision:null},{url:"/js/795.eeef3e02.js",revision:null},{url:"/js/801.ca099155.js",revision:null},{url:"/js/999.99e76719.js",revision:null},{url:"/js/app.ad6d5e1f.js",revision:null},{url:"/js/chunk-vendors.32bb41f9.js",revision:null},{url:"/manifest.json",revision:"902dc40ae75163a68c39d1ecc8271c51"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
