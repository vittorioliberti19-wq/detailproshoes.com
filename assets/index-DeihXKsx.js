import{W as _,A as j,S as $,P as U,R as V,a as W,H as K,D as J,G as E,M as C,b as B,C as ne,c as Q,E as X,V as c,T as Y,B as z,d as re,e as se,f as A,g as ae,h as ce,i as de,j as le}from"./three-2TtRXbHK.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function d(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(o){if(o.ep)return;o.ep=!0;const t=d(o);fetch(o.href,t)}})();function ue(e,i){i.computeBoundingBox();const d=i.boundingBox.min.clone(),n=i.boundingBox.max.clone().sub(d);n.set(Math.max(n.x,1e-5),Math.max(n.y,1e-5),Math.max(n.z,1e-5)),e.onBeforeCompile=o=>{o.uniforms.clean={value:0},o.uniforms.dirtMin={value:d},o.uniforms.dirtSize={value:n},e.userData.shader=o,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
uniform vec3 dirtMin;
uniform vec3 dirtSize;
varying vec3 vDirtPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vDirtPosition = (position - dirtMin) / dirtSize - 0.5;`),o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
uniform float clean;
varying vec3 vDirtPosition;
float dirtHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.11, 0.37, 0.73));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float dirtNoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(dirtHash(i), dirtHash(i+vec3(1,0,0)), f.x),
                 mix(dirtHash(i+vec3(0,1,0)), dirtHash(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(dirtHash(i+vec3(0,0,1)), dirtHash(i+vec3(1,0,1)), f.x),
                 mix(dirtHash(i+vec3(0,1,1)), dirtHash(i+vec3(1,1,1)), f.x), f.y), f.z);
}
float dirtFbm(vec3 p) {
  float n = 0.0, weight = 0.55;
  for(int i=0; i<4; i++) {
    n += weight * dirtNoise(p);
    p = p * 2.13 + vec3(4.7, 9.2, 2.8);
    weight *= 0.48;
  }
  return n;
}`).replace("#include <color_fragment>",`#include <color_fragment>

vec3 dirtP = vDirtPosition * 8.0;
vec3 warp = vec3(dirtNoise(dirtP + 7.1), dirtNoise(dirtP + 23.4), dirtNoise(dirtP - 11.8));
float soil = dirtFbm(dirtP + warp * 2.6);
float lowEdge = 1.0 - smoothstep(-0.16, 0.13, vDirtPosition.y);
float smudge = smoothstep(0.37, 0.70, soil);
float dust = smoothstep(0.24, 0.63, soil) * 0.15;
float film = 0.08 + smoothstep(0.10, 0.90, dirtFbm(dirtP * 0.55 + 31.0)) * 0.16;
float grain = dirtNoise(vDirtPosition * 190.0);
float dirtMask = clamp(film + smudge * (0.48 + lowEdge * 0.45) + dust + lowEdge * grain * 0.07, 0.0, 0.84);
float sweep = vDirtPosition.x + 0.5 + (soil - 0.5) * 0.12;
float sweepRemoval = smoothstep(sweep - 0.10, sweep + 0.10, clean * 1.20 - 0.10);
dirtMask = min(dirtMask * 1.7, 0.93);
float dirtOpacity = dirtMask * (1.0 - sweepRemoval);
if (clean <= 0.0) dirtOpacity = dirtMask;
if (clean >= 1.0) dirtOpacity = 0.0;
vec3 soilTint = mix(vec3(0.35, 0.27, 0.19), vec3(0.53, 0.43, 0.31), soil);
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}function p(e,i,d,n={}){const o=new re({color:d,roughness:.72,...n});ue(o,i);const t=new se(i,o);return e.add(t),t}function D(e,i,d=13223353,n=.008){return p(e,new ae(new ce(i),64,n,6,!1),d)}function pe(){const e=new E;p(e,new B(1,64,32,0,Math.PI*2,0,Math.PI/2),15197402,{side:A}).scale.set(1,.83,1.02);const d=p(e,new ne(.995,.995,.08,64,1,!0),13749954,{side:A});d.position.y=.025;const n=new Q;n.moveTo(-.88,.26),n.bezierCurveTo(-1.12,.85,-.94,1.85,0,1.94),n.bezierCurveTo(.94,1.85,1.12,.85,.88,.26),n.quadraticCurveTo(0,.62,-.88,.26);const o=p(e,new X(n,{depth:.045,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:3,steps:1,curveSegments:32}),15065816);o.rotation.x=Math.PI/2,o.position.y=.015;for(let a=0;a<4;a++){const s=[];for(let l=0;l<=50;l++){const u=Math.PI*l/50;s.push(new c(Math.cos(u)*(.84-a*.075),.048,.6+Math.sin(u)*(1.22-a*.09)))}D(e,s,13157560,.004)}for(let a=0;a<6;a++){const s=a*Math.PI/3,l=[];for(let w=0;w<=28;w++){const f=w/28*Math.PI/2;l.push(new c(Math.sin(f)*Math.cos(s)*1.006,Math.cos(f)*.837,Math.sin(f)*Math.sin(s)*1.027))}D(e,l);const u=p(e,new Y(.033,.009,8,16),12368045);u.position.set(Math.cos(s)*.88,.4,Math.sin(s)*.9),u.lookAt(u.position.clone().multiplyScalar(2))}const t=p(e,new B(.075,20,12),14671055);t.position.y=.84,t.scale.y=.45;const r=p(e,new z(.27,.15,.024),15749667);return r.position.set(0,.4,.905),r.rotation.x=-.43,e.position.set(0,-.3,-.35),e.rotation.x=.12,e}function fe(){const e=new E,i=new Q;i.moveTo(-.94,-.74),i.quadraticCurveTo(-1.11,-.72,-1.09,-.49),i.lineTo(-.84,.67),i.quadraticCurveTo(-.81,.78,-.65,.78),i.lineTo(.65,.78),i.quadraticCurveTo(.81,.78,.84,.67),i.lineTo(1.09,-.49),i.quadraticCurveTo(1.11,-.72,.94,-.74),i.closePath();const d=p(e,new X(i,{depth:.64,bevelEnabled:!0,bevelSize:.12,bevelThickness:.1,bevelSegments:5,curveSegments:24}),14272941);d.position.z=-.32;for(const t of[-.43,.43]){D(e,[new c(-.91,-.65,t),new c(-1,-.5,t),new c(-.78,.65,t),new c(0,.7,t),new c(.78,.65,t),new c(1,-.5,t),new c(.91,-.65,t),new c(0,-.69,t),new c(-.91,-.65,t)],12167048,.009),D(e,[new c(-.52,.58,t),new c(-.52,1.18,t),new c(0,1.58,t),new c(.52,1.18,t),new c(.52,.58,t)],11770486,.047);for(const r of[-.52,.52])p(e,new Y(.075,.016,10,24),14137205,{metalness:.78,roughness:.26}).position.set(r,.62,t+.018),p(e,new z(.13,.29,.035),12165503).position.set(r,.42,t)}p(e,new z(1.4,.022,.065),10123594,{metalness:.65,roughness:.3}).position.set(0,.885,0);for(let t=0;t<26;t++)p(e,new z(.025,.024,.07),13678466,{metalness:.75,roughness:.28}).position.set(-.65+t*.052,.897,0);return p(e,new z(.3,.09,.025),13678466,{metalness:.7,roughness:.25}).position.set(0,.22,.436),e.position.y=-.35,e}function me(){const e=matchMedia("(prefers-reduced-motion: reduce)"),i=[...document.querySelectorAll(".accessory-story")],d=new IntersectionObserver(n=>{for(const o of n){const t=o.target.accessory;if(t){t.visible=o.isIntersecting;continue}if(!o.isIntersecting)continue;const r=o.target,a=r.querySelector(".accessory-stage");try{const s=new _({alpha:!0,antialias:!0,powerPreference:"low-power"});s.setPixelRatio(Math.min(devicePixelRatio,1.5)),s.toneMapping=j,s.toneMappingExposure=1.05,a.append(s.domElement);const l=new $,u=new U(34,1,.1,50),w=new V,f=new W(s);l.environment=f.fromScene(w,.04).texture,w.dispose(),f.dispose(),l.add(new K(16777215,5527622,1.3));const m=new J(16774119,2);m.position.set(3,5,4),l.add(m);const H=new E,I=r.dataset.model==="cap"?pe():fe();H.add(I),l.add(H);const O=[];I.traverse(y=>{y.isMesh&&O.push(y.material)});const L={visible:!0};r.accessory=L;const N=()=>{const y=a.clientWidth,b=a.clientHeight;s.setSize(y,b),u.aspect=y/b,u.position.set(0,.85,u.aspect<1?7.5:5.7),u.lookAt(0,.1,0),u.updateProjectionMatrix()};new ResizeObserver(N).observe(a),N();let v=0;const te=r.querySelector(".accessory-percent"),oe=r.querySelector(".accessory-progress"),ie=r.querySelector(".accessory-phase");s.setAnimationLoop(()=>{if(document.hidden||!L.visible)return;const y=r.querySelector(".accessory-sticky"),b=C.clamp((110-r.getBoundingClientRect().top)/Math.max(1,r.offsetHeight-y.offsetHeight),0,1);v=e.matches||Math.abs(v-b)<.001?b:C.lerp(v,b,.09),H.rotation.set(.03,e.matches?-.45:-.65+v*(Math.PI*2+.3),e.matches?0:Math.sin(v*Math.PI)*.035),O.forEach(R=>{R.userData.shader&&(R.userData.shader.uniforms.clean.value=v)}),te.textContent=`${Math.round(v*100)}%`,oe.style.width=`${v*100}%`,ie.textContent=v<.25?"01 — ANTES":v<.98?"02 — EL CUIDADO":"03 — LIMPIO",s.render(l,u)}),a.querySelector(".accessory-loading").remove()}catch{a.querySelector(".accessory-loading").textContent="Explora nuestro cuidado profesional en esta sección."}}},{rootMargin:"250px"});i.forEach(n=>d.observe(n))}const Z=document.querySelector("#shoe-stage"),T=document.querySelector("#loading"),ve=matchMedia("(prefers-reduced-motion: reduce)");let g,h;const k=document.querySelector(".contact");new IntersectionObserver((e,i)=>{e[0].isIntersecting&&(k.classList.add("bg-ready"),i.disconnect())},{rootMargin:"400px"}).observe(k);let ee=!0;new IntersectionObserver(([e])=>{ee=e.isIntersecting},{rootMargin:"120px"}).observe(document.querySelector(".hero"));let x=0,S=0;const P=new $,M=new U(32,1,.01,100);M.position.set(0,.45,4.6);const G=[];function q(){if(!g)return;const{width:e,height:i}=Z.getBoundingClientRect();g.setSize(e,i),M.aspect=e/i,M.position.z=M.aspect<1?7:4.6,M.lookAt(0,0,0),M.updateProjectionMatrix()}function F(){const e=document.querySelector(".scroll-story");x=C.clamp(-e.getBoundingClientRect().top/Math.max(1,e.offsetHeight-innerHeight),0,1),document.querySelector("#progress").style.width=`${x*100}%`,document.querySelector("#percent").textContent=`${Math.round(x*100)}%`,document.querySelector("#phase").textContent=x<.3?"01 — ANTES":x<.8?"02 — EL CUIDADO":"03 — LIMPIO"}try{g=new _({alpha:!0,antialias:!0,powerPreference:"low-power"}),g.setPixelRatio(Math.min(devicePixelRatio,1.7)),g.toneMapping=j,g.toneMappingExposure=1.35,Z.appendChild(g.domElement);const e=new V,i=new W(g);P.environment=i.fromScene(e,.04).texture,e.dispose(),i.dispose(),P.add(new K(16777215,4475701,2));const d=new J(16772834,4);d.position.set(2,4,4),P.add(d),new de().load("/assets/sneaker.glb",n=>{h=n.scene;const o=new le().setFromObject(h),t=o.getCenter(new c),r=o.getSize(new c);h.position.sub(t);const a=new E;a.add(h),a.scale.setScalar(2.75/Math.max(r.x,r.y,r.z)),h=a,P.add(h),h.traverse(s=>{if(!s.isMesh)return;s.material=s.material.clone();const l=s.material;s.geometry.computeBoundingBox();const u=s.geometry.boundingBox,w=u.min.clone(),f=u.getSize(new c);f.set(Math.max(f.x,1e-5),Math.max(f.y,1e-5),Math.max(f.z,1e-5)),G.push(l),l.onBeforeCompile=m=>{m.uniforms.clean={value:0},m.uniforms.dirtMin={value:w},m.uniforms.dirtSize={value:f},l.userData.shader=m,m.vertexShader=m.vertexShader.replace("#include <common>",`#include <common>
uniform vec3 dirtMin;
uniform vec3 dirtSize;
varying vec3 vDirtPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vDirtPosition = (position - dirtMin) / dirtSize - 0.5;`),m.fragmentShader=m.fragmentShader.replace("#include <common>",`#include <common>
uniform float clean;
varying vec3 vDirtPosition;
float dirtHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.11, 0.37, 0.73));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float dirtNoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(dirtHash(i), dirtHash(i+vec3(1,0,0)), f.x),
                 mix(dirtHash(i+vec3(0,1,0)), dirtHash(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(dirtHash(i+vec3(0,0,1)), dirtHash(i+vec3(1,0,1)), f.x),
                 mix(dirtHash(i+vec3(0,1,1)), dirtHash(i+vec3(1,1,1)), f.x), f.y), f.z);
}
float dirtFbm(vec3 p) {
  float n = 0.0, weight = 0.55;
  for(int i=0; i<4; i++) {
    n += weight * dirtNoise(p);
    p = p * 2.13 + vec3(4.7, 9.2, 2.8);
    weight *= 0.48;
  }
  return n;
}`).replace("#include <color_fragment>",`#include <color_fragment>
float shade = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
diffuseColor.rgb = vec3(mix(0.62, 0.96, shade));
vec3 dirtP = vDirtPosition * 8.0;
vec3 warp = vec3(dirtNoise(dirtP + 7.1), dirtNoise(dirtP + 23.4), dirtNoise(dirtP - 11.8));
float soil = dirtFbm(dirtP + warp * 2.6);
float lowEdge = 1.0 - smoothstep(-0.16, 0.13, vDirtPosition.y);
float smudge = smoothstep(0.37, 0.70, soil);
float dust = smoothstep(0.24, 0.63, soil) * 0.15;
float film = 0.08 + smoothstep(0.10, 0.90, dirtFbm(dirtP * 0.55 + 31.0)) * 0.16;
float grain = dirtNoise(vDirtPosition * 190.0);
float dirtMask = clamp(film + smudge * (0.48 + lowEdge * 0.45) + dust + lowEdge * grain * 0.07, 0.0, 0.84);
float sweep = vDirtPosition.x + 0.5 + (soil - 0.5) * 0.12;
float sweepRemoval = smoothstep(sweep - 0.10, sweep + 0.10, clean * 1.20 - 0.10);
float dirtOpacity = dirtMask * (1.0 - sweepRemoval);
if (clean <= 0.0) dirtOpacity = dirtMask;
if (clean >= 1.0) dirtOpacity = 0.0;
vec3 soilTint = mix(vec3(0.35, 0.27, 0.19), vec3(0.53, 0.43, 0.31), soil);
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}),T.remove(),q()},void 0,()=>{T.textContent="No se pudo cargar el sneaker 3D. Recarga para intentarlo de nuevo."}),q(),addEventListener("resize",q),addEventListener("scroll",F,{passive:!0}),F(),g.setAnimationLoop(()=>{if(!(document.hidden||!ee)){if(S=Math.abs(x-S)<5e-4?x:S+(x-S)*.065,h){const n=ve.matches?x:S;h.rotation.set(.12+Math.sin(n*Math.PI)*.14,-.65+n*1.35,-.28+n*.32),h.position.y=Math.sin(n*Math.PI)*.08,G.forEach(o=>{o.userData.shader&&(o.userData.shader.uniforms.clean.value=C.clamp(n,0,1))})}g.render(P,M)}})}catch{T.textContent="La vista 3D no está disponible en este navegador. Puedes explorar nuestros servicios abajo."}me();
