import{S as O,P as E,W as H,A as N,R,a as I,H as q,D as B,G as A,B as F,V as x,b as G,M as L}from"./three-CGWJgFp6.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function v(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=v(e);fetch(e.href,i)}})();const z=document.querySelector("#shoe-stage"),y=document.querySelector("#loading"),T=matchMedia("(prefers-reduced-motion: reduce)");let s,n;const b=document.querySelector(".contact");new IntersectionObserver((t,o)=>{t[0].isIntersecting&&(b.classList.add("bg-ready"),o.disconnect())},{rootMargin:"400px"}).observe(b);let D=!0;new IntersectionObserver(([t])=>{D=t.isIntersecting},{rootMargin:"120px"}).observe(document.querySelector(".hero"));let a=0,p=0;const m=new O,l=new E(32,1,.01,100);l.position.set(0,.45,4.6);const P=[];function w(){if(!s)return;const{width:t,height:o}=z.getBoundingClientRect();s.setSize(t,o),l.aspect=t/o,l.position.z=l.aspect<1?7:4.6,l.lookAt(0,0,0),l.updateProjectionMatrix()}function S(){const t=document.querySelector(".scroll-story");a=L.clamp(-t.getBoundingClientRect().top/Math.max(1,t.offsetHeight-innerHeight),0,1),document.querySelector("#progress").style.width=`${a*100}%`,document.querySelector("#percent").textContent=`${Math.round(a*100)}%`,document.querySelector("#phase").textContent=a<.3?"01 — ANTES":a<.8?"02 — EL CUIDADO":"03 — LIMPIO"}try{s=new H({alpha:!0,antialias:!0,powerPreference:"low-power"}),s.setPixelRatio(Math.min(devicePixelRatio,1.7)),s.toneMapping=N,s.toneMappingExposure=1.35,z.appendChild(s.domElement);const t=new R,o=new I(s);m.environment=o.fromScene(t,.04).texture,t.dispose(),o.dispose(),m.add(new q(16777215,4475701,2));const v=new B(16772834,4);v.position.set(2,4,4),m.add(v),new A().load("/assets/sneaker.glb",r=>{n=r.scene;const e=new F().setFromObject(n),i=e.getCenter(new x),d=e.getSize(new x);n.position.sub(i);const g=new G;g.add(n),g.scale.setScalar(2.75/Math.max(d.x,d.y,d.z)),n=g,m.add(n),n.traverse(u=>{if(!u.isMesh)return;u.material=u.material.clone();const h=u.material;u.geometry.computeBoundingBox();const M=u.geometry.boundingBox,C=M.min.clone(),f=M.getSize(new x);f.set(Math.max(f.x,1e-5),Math.max(f.y,1e-5),Math.max(f.z,1e-5)),P.push(h),h.onBeforeCompile=c=>{c.uniforms.clean={value:0},c.uniforms.dirtMin={value:C},c.uniforms.dirtSize={value:f},h.userData.shader=c,c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
uniform vec3 dirtMin;
uniform vec3 dirtSize;
varying vec3 vDirtPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vDirtPosition = (position - dirtMin) / dirtSize - 0.5;`),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}),y.remove(),w()},void 0,()=>{y.textContent="No se pudo cargar el sneaker 3D. Recarga para intentarlo de nuevo."}),w(),addEventListener("resize",w),addEventListener("scroll",S,{passive:!0}),S(),s.setAnimationLoop(()=>{if(!(document.hidden||!D)){if(p=Math.abs(a-p)<5e-4?a:p+(a-p)*.065,n){const r=T.matches?a:p;n.rotation.set(.12+Math.sin(r*Math.PI)*.14,-.65+r*1.35,-.28+r*.32),n.position.y=Math.sin(r*Math.PI)*.08,P.forEach(e=>{e.userData.shader&&(e.userData.shader.uniforms.clean.value=L.clamp(r,0,1))})}s.render(m,l)}})}catch{y.textContent="La vista 3D no está disponible en este navegador. Puedes explorar nuestros servicios abajo."}
