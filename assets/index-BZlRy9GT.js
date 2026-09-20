import{W as j,A as V,S as X,P as Y,R as Z,a as $,H as U,D as W,G as N,M as L,b as A,V as d,B as T,c as K,E as J,T as Q,d as ie,e as ne,f as re,C as se,g as ae,h as ce,i as de}from"./three-DH9XJ7oF.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function l(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=l(o);fetch(o.href,i)}})();function le(e,n){n.computeBoundingBox();const l=n.boundingBox.min.clone(),r=n.boundingBox.max.clone().sub(l);r.set(Math.max(r.x,1e-5),Math.max(r.y,1e-5),Math.max(r.z,1e-5)),e.onBeforeCompile=o=>{o.uniforms.clean={value:0},o.uniforms.dirtMin={value:l},o.uniforms.dirtSize={value:r},e.userData.shader=o,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}function x(e,n,l,r={}){const o=new ie({color:l,roughness:.72,...r});le(o,n);const i=new ne(n,o);return e.add(i),i}function I(e,n,l=13223353,r=.008){return x(e,new re(new se(n),64,r,6,!1),l)}function ue(){const e=new N,n=(t,s,a=0)=>{const u=Math.pow(Math.sin(t),.78);return new d((.82+a)*u*Math.cos(s),.73*Math.cos(t)+a,(1+a)*u*Math.sin(s)-.08*Math.cos(t))},l=new A(1,72,36,0,Math.PI*2,0,Math.PI/2),r=l.attributes.position;for(let t=0;t<r.count;t++){const s=Math.acos(L.clamp(r.getY(t),0,1)),a=Math.atan2(r.getZ(t),r.getX(t)),u=n(s,a);r.setXYZ(t,u.x,u.y,u.z)}const o=l.index.array,i=[];for(let t=0;t<o.length;t+=3){const s=[o[t],o[t+1],o[t+2]],a=s.reduce((g,z)=>g+r.getX(z),0)/3,u=s.reduce((g,z)=>g+r.getY(z),0)/3;s.reduce((g,z)=>g+r.getZ(z),0)/3<-.78&&(a/.3)**2+(u/.28)**2<1||i.push(...s)}l.setIndex(i),l.computeVertexNormals(),x(e,l,15001058,{side:ae,roughness:.94});const c=[];for(let t=0;t<=100;t++){const s=-Math.PI/2+.37+t/100*(Math.PI*2-.74);c.push(n(Math.PI/2,s,.005))}I(e,c,13027522,.022);const v=[];for(let t=0;t<=36;t++){const s=Math.PI*t/36,a=.3*Math.cos(s);v.push(new d(a,.28*Math.sin(s),-Math.sqrt(1-(a/.82)**2)-.008))}I(e,v,13817038,.012),x(e,new T(.53,.075,.035),13159363).position.set(.035,.025,-1.012),x(e,new T(.085,.09,.045),6712166,{metalness:.7,roughness:.4}).position.set(.18,.025,-1.036);const h=new K;h.moveTo(-.73,.42),h.bezierCurveTo(-.86,.89,-.78,1.64,-.48,1.77),h.quadraticCurveTo(0,1.95,.48,1.77),h.bezierCurveTo(.78,1.64,.86,.89,.73,.42),h.quadraticCurveTo(0,.86,-.73,.42);const S=new J(h,{depth:.026,bevelEnabled:!0,bevelSize:.012,bevelThickness:.008,bevelSegments:3,steps:1,curveSegments:36}),w=(t,s)=>{const a=Math.sqrt(Math.max(0,1-(t/.82)**2)),u=Math.max(0,s-a);return .005-(.23*(t/.82)**2+.1)*u},f=S.attributes.position;for(let t=0;t<f.count;t++){const s=f.getX(t),a=f.getY(t),u=f.getZ(t);f.setXYZ(t,s,w(s,a)-u,a)}S.computeVertexNormals(),x(e,S,14935521,{roughness:.95});for(let t=0;t<3;t++){const s=[];for(let a=0;a<=60;a++){const u=Math.PI*a/60,m=Math.cos(u)*(.72-t*.06),g=.78+Math.sin(u)*(1.05-t*.075);s.push(new d(m,w(m,g)+.004,g))}I(e,s,13488328,.0025)}for(let t=0;t<6;t++){const s=Math.PI/6+t*Math.PI/3,a=[];for(let g=0;g<=36;g++)a.push(n(g/36*Math.PI/2,s,.005));I(e,a,13619659,.004);const u=n(1.02,s,.012),m=x(e,new Q(.018,.005,6,14),11909552);m.position.copy(u),m.lookAt(u.clone().add(new d(Math.cos(s),.4,Math.sin(s))))}const q=x(e,new A(.048,20,12),14146259);return q.position.set(0,.735,-.08),q.scale.y=.4,I(e,[new d(-.1,.32,.894),new d(.01,.35,.88),new d(.1,.4,.854)],15749667,.014),e.position.set(0,-.25,-.3),e.rotation.x=.08,e}function pe(){const e=new N,n=new K;n.moveTo(-.94,-.74),n.quadraticCurveTo(-1.11,-.72,-1.09,-.49),n.lineTo(-.84,.67),n.quadraticCurveTo(-.81,.78,-.65,.78),n.lineTo(.65,.78),n.quadraticCurveTo(.81,.78,.84,.67),n.lineTo(1.09,-.49),n.quadraticCurveTo(1.11,-.72,.94,-.74),n.closePath();const l=x(e,new J(n,{depth:.64,bevelEnabled:!0,bevelSize:.12,bevelThickness:.1,bevelSegments:5,curveSegments:24}),14272941);l.position.z=-.32;for(const i of[-.43,.43]){I(e,[new d(-.91,-.65,i),new d(-1,-.5,i),new d(-.78,.65,i),new d(0,.7,i),new d(.78,.65,i),new d(1,-.5,i),new d(.91,-.65,i),new d(0,-.69,i),new d(-.91,-.65,i)],12167048,.009),I(e,[new d(-.52,.58,i),new d(-.52,1.18,i),new d(0,1.58,i),new d(.52,1.18,i),new d(.52,.58,i)],11770486,.047);for(const c of[-.52,.52])x(e,new Q(.075,.016,10,24),14137205,{metalness:.78,roughness:.26}).position.set(c,.62,i+.018),x(e,new T(.13,.29,.035),12165503).position.set(c,.42,i)}x(e,new T(1.4,.022,.065),10123594,{metalness:.65,roughness:.3}).position.set(0,.885,0);for(let i=0;i<26;i++)x(e,new T(.025,.024,.07),13678466,{metalness:.75,roughness:.28}).position.set(-.65+i*.052,.897,0);return x(e,new T(.3,.09,.025),13678466,{metalness:.7,roughness:.25}).position.set(0,.22,.436),e.position.y=-.35,e}function fe(){const e=matchMedia("(prefers-reduced-motion: reduce)"),n=[...document.querySelectorAll(".accessory-story")],l=new IntersectionObserver(r=>{for(const o of r){const i=o.target.accessory;if(i){i.visible=o.isIntersecting;continue}if(!o.isIntersecting)continue;const c=o.target,v=c.querySelector(".accessory-stage");try{const p=new j({alpha:!0,antialias:!0,powerPreference:"low-power"});p.setPixelRatio(Math.min(devicePixelRatio,1.5)),p.toneMapping=V,p.toneMappingExposure=1.05,v.append(p.domElement);const M=new X,h=new Y(34,1,.1,50),S=new Z,w=new $(p);M.environment=w.fromScene(S,.04).texture,S.dispose(),w.dispose(),M.add(new U(16777215,5527622,1.3));const f=new W(16774119,2);f.position.set(3,5,4),M.add(f);const q=new N,t=c.dataset.model==="cap"?ue():pe();q.add(t),M.add(q);const s=[];t.traverse(C=>{C.isMesh&&s.push(C.material)});const a={visible:!0};c.accessory=a;const u=()=>{const C=v.clientWidth,D=v.clientHeight;p.setSize(C,D),h.aspect=C/D,h.position.set(0,.85,h.aspect<1?7.5:5.7),h.lookAt(0,.1,0),h.updateProjectionMatrix()};new ResizeObserver(u).observe(v),u();let m=0;const g=c.querySelector(".accessory-percent"),z=c.querySelector(".accessory-progress"),oe=c.querySelector(".accessory-phase");p.setAnimationLoop(()=>{if(document.hidden||!a.visible)return;const C=c.querySelector(".accessory-sticky"),D=L.clamp((110-c.getBoundingClientRect().top)/Math.max(1,c.offsetHeight-C.offsetHeight),0,1);m=e.matches||Math.abs(m-D)<.001?D:L.lerp(m,D,.09),q.rotation.set(.03,e.matches?-.45:-.65+m*(Math.PI*2+.3),e.matches?0:Math.sin(m*Math.PI)*.035),s.forEach(k=>{k.userData.shader&&(k.userData.shader.uniforms.clean.value=m)}),g.textContent=`${Math.round(m*100)}%`,z.style.width=`${m*100}%`,oe.textContent=m<.25?"01 — ANTES":m<.98?"02 — EL CUIDADO":"03 — LIMPIO",p.render(M,h)}),v.querySelector(".accessory-loading").remove()}catch{v.querySelector(".accessory-loading").textContent="Explora nuestro cuidado profesional en esta sección."}}},{rootMargin:"250px"});n.forEach(r=>l.observe(r))}const ee=document.querySelector("#shoe-stage"),R=document.querySelector("#loading"),me=matchMedia("(prefers-reduced-motion: reduce)");let b,y;const G=document.querySelector(".contact");new IntersectionObserver((e,n)=>{e[0].isIntersecting&&(G.classList.add("bg-ready"),n.disconnect())},{rootMargin:"400px"}).observe(G);let te=!0;new IntersectionObserver(([e])=>{te=e.isIntersecting},{rootMargin:"120px"}).observe(document.querySelector(".hero"));let P=0,H=0;const O=new X,E=new Y(32,1,.01,100);E.position.set(0,.45,4.6);const F=[];function B(){if(!b)return;const{width:e,height:n}=ee.getBoundingClientRect();b.setSize(e,n),E.aspect=e/n,E.position.z=E.aspect<1?7:4.6,E.lookAt(0,0,0),E.updateProjectionMatrix()}function _(){const e=document.querySelector(".scroll-story");P=L.clamp(-e.getBoundingClientRect().top/Math.max(1,e.offsetHeight-innerHeight),0,1),document.querySelector("#progress").style.width=`${P*100}%`,document.querySelector("#percent").textContent=`${Math.round(P*100)}%`,document.querySelector("#phase").textContent=P<.3?"01 — ANTES":P<.8?"02 — EL CUIDADO":"03 — LIMPIO"}try{b=new j({alpha:!0,antialias:!0,powerPreference:"low-power"}),b.setPixelRatio(Math.min(devicePixelRatio,1.7)),b.toneMapping=V,b.toneMappingExposure=1.35,ee.appendChild(b.domElement);const e=new Z,n=new $(b);O.environment=n.fromScene(e,.04).texture,e.dispose(),n.dispose(),O.add(new U(16777215,4475701,2));const l=new W(16772834,4);l.position.set(2,4,4),O.add(l),new ce().load("/assets/sneaker.glb",r=>{y=r.scene;const o=new de().setFromObject(y),i=o.getCenter(new d),c=o.getSize(new d);y.position.sub(i);const v=new N;v.add(y),v.scale.setScalar(2.75/Math.max(c.x,c.y,c.z)),y=v,O.add(y),y.traverse(p=>{if(!p.isMesh)return;p.material=p.material.clone();const M=p.material;p.geometry.computeBoundingBox();const h=p.geometry.boundingBox,S=h.min.clone(),w=h.getSize(new d);w.set(Math.max(w.x,1e-5),Math.max(w.y,1e-5),Math.max(w.z,1e-5)),F.push(M),M.onBeforeCompile=f=>{f.uniforms.clean={value:0},f.uniforms.dirtMin={value:S},f.uniforms.dirtSize={value:w},M.userData.shader=f,f.vertexShader=f.vertexShader.replace("#include <common>",`#include <common>
uniform vec3 dirtMin;
uniform vec3 dirtSize;
varying vec3 vDirtPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vDirtPosition = (position - dirtMin) / dirtSize - 0.5;`),f.fragmentShader=f.fragmentShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}),R.remove(),B()},void 0,()=>{R.textContent="No se pudo cargar el sneaker 3D. Recarga para intentarlo de nuevo."}),B(),addEventListener("resize",B),addEventListener("scroll",_,{passive:!0}),_(),b.setAnimationLoop(()=>{if(!(document.hidden||!te)){if(H=Math.abs(P-H)<5e-4?P:H+(P-H)*.065,y){const r=me.matches?P:H;y.rotation.set(.12+Math.sin(r*Math.PI)*.14,-.65+r*1.35,-.28+r*.32),y.position.y=Math.sin(r*Math.PI)*.08,F.forEach(o=>{o.userData.shader&&(o.userData.shader.uniforms.clean.value=L.clamp(r,0,1))})}b.render(O,E)}})}catch{R.textContent="La vista 3D no está disponible en este navegador. Puedes explorar nuestros servicios abajo."}fe();
