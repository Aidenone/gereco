if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let c={};const u=s=>l(s,n),o={module:{uri:n},exports:c,require:u};e[n]=Promise.all(i.map((s=>o[s]||u(s)))).then((s=>(r(...s),c)))}}define(["./workbox-db5fc017"],(function(s){"use strict";s.setCacheNameDetails({prefix:"wpa-gereco"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/129.e5625817.css",revision:null},{url:"/css/184.9cb286f1.css",revision:null},{url:"/css/19.a0efadf4.css",revision:null},{url:"/css/416.97d094f2.css",revision:null},{url:"/css/533.4b109e40.css",revision:null},{url:"/css/869.9aecfc7b.css",revision:null},{url:"/css/924.d0640079.css",revision:null},{url:"/css/app.0cdfe72f.css",revision:null},{url:"/img/fleche2_blanc.dac177de.svg",revision:null},{url:"/img/fleche_blanc.f0ce88a1.svg",revision:null},{url:"/img/logo-gereco-2.012b9603.svg",revision:null},{url:"/img/logo-gereco.e6dd7bdb.svg",revision:null},{url:"/index.html",revision:"aafeabebe373cd991cc2799e7e4a077d"},{url:"/js/129.24ff6f33.js",revision:null},{url:"/js/184.3150a2ac.js",revision:null},{url:"/js/19.25011850.js",revision:null},{url:"/js/416.82c26ee2.js",revision:null},{url:"/js/533.67d3a8c7.js",revision:null},{url:"/js/869.7d7df846.js",revision:null},{url:"/js/924.87fc8567.js",revision:null},{url:"/js/app.0d585264.js",revision:null},{url:"/js/chunk-vendors.c19ae80e.js",revision:null},{url:"/manifest.json",revision:"7b4dd0710d3c3a00cb55fabd24dbef56"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
