!function(e){var t={};function d(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,d),a.l=!0,a.exports}d.m=e,d.c=t,d.d=function(e,t,n){d.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},d.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,t){if(1&t&&(e=d(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(d.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)d.d(n,a,function(t){return e[t]}.bind(null,a));return n},d.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return d.d(t,"a",t),t},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},d.p="",d(d.s=3)}({3:function(e,t){document.createElement("div").classList.add("container");const d=document.createElement("div");d.classList.add("dashboard");const n=document.createElement("div");n.classList.add("refresh");const a=document.createElement("div");a.classList.add("language");const c=document.createElement("div");c.classList.add("language");const s=document.createElement("div");s.classList.add("degree-unit");const o=document.createElement("div");o.classList.add("controls"),o.appendChild(n),o.appendChild(a),o.appendChild(c),o.appendChild(s),d.appendChild(o);const i=document.createElement("div");i.classList.add("search");const l=document.createElement("form");i.appendChild(l),d.appendChild(i),document.body.appendChild(d);const r=document.createElement("div");r.classList.add("weather-now");const p=document.createElement("h2");p.classList.add("place");const u=document.createElement("p");u.classList.add("clock");const m=document.createElement("div");m.classList.add("day"),r.appendChild(p),r.appendChild(m),r.appendChild(u);const f=document.createElement("div");f.classList.add("forecast");const h=document.createElement("div"),v=document.createElement("div"),E=document.createElement("div");h.classList.add("forecast-degrees"),v.classList.add("forecast-icon"),E.classList.add("forecast-details"),f.appendChild(h);const C=document.createElement("div");C.classList.add("forecast-icon-and-details"),C.appendChild(v),C.appendChild(E),f.appendChild(C),r.appendChild(f);const L=document.createElement("div");L.classList.add("future-weather"),L.appendChild(document.createElement("div")),L.appendChild(document.createElement("div")),L.appendChild(document.createElement("div")),r.appendChild(L);const b=document.createElement("div");b.classList.add("map"),b.setAttribute("id","map");const y=document.createElement("div");y.classList.add("coord");const g=document.createElement("div");g.classList.add("container"),g.appendChild(r);const j=document.createElement("div");j.classList.add("map-and-coord"),j.appendChild(b),j.appendChild(y),g.appendChild(j),document.body.appendChild(g)}});