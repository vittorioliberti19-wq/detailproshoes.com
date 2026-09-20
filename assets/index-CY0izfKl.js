import{W as V,A as X,S as Y,P as Z,R as $,a as U,H as W,D as K,G as R,M as N,b as G,V as l,B as T,c as J,E as Q,T as ee,d as ie,e as ne,f as re,C as se,g as ae,h as ce,i as de}from"./three-DH9XJ7oF.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function u(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=u(o);fetch(o.href,i)}})();function le(e,n){n.computeBoundingBox();const u=n.boundingBox.min.clone(),s=n.boundingBox.max.clone().sub(u);s.set(Math.max(s.x,1e-5),Math.max(s.y,1e-5),Math.max(s.z,1e-5)),e.onBeforeCompile=o=>{o.uniforms.clean={value:0},o.uniforms.dirtMin={value:u},o.uniforms.dirtSize={value:s},e.userData.shader=o,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}function g(e,n,u,s={}){const o=new ie({color:u,roughness:.72,...s});le(o,n);const i=new ne(n,o);return e.add(i),i}function q(e,n,u=13223353,s=.008){return g(e,new re(new se(n),64,s,6,!1),u)}function ue(){const e=new R,n=(t,r,a=0)=>{const c=Math.pow(Math.sin(t),.78);return new l((.82+a)*c*Math.cos(r),.73*Math.cos(t)+a,(1+a)*c*Math.sin(r)-.08*Math.cos(t))},u=new G(1,72,36,0,Math.PI*2,0,Math.PI/2),s=u.attributes.position;for(let t=0;t<s.count;t++){const r=Math.acos(N.clamp(s.getY(t),0,1)),a=Math.atan2(s.getZ(t),s.getX(t)),c=n(r,a);s.setXYZ(t,c.x,c.y,c.z)}const o=u.index.array,i=[];for(let t=0;t<o.length;t+=3){const r=[o[t],o[t+1],o[t+2]],a=r.reduce((v,C)=>v+s.getX(C),0)/3,c=r.reduce((v,C)=>v+s.getY(C),0)/3;r.reduce((v,C)=>v+s.getZ(C),0)/3<-.78&&(a/.3)**2+(c/.28)**2<1||i.push(...r)}u.setIndex(i),u.computeVertexNormals(),g(e,u,15001058,{side:ae,roughness:.94});const d=[];for(let t=0;t<=100;t++){const r=-Math.PI/2+.37+t/100*(Math.PI*2-.74);d.push(n(Math.PI/2,r,.005))}q(e,d,13027522,.022);const m=[];for(let t=0;t<=36;t++){const r=Math.PI*t/36,a=.3*Math.cos(r);m.push(new l(a,.28*Math.sin(r),-Math.sqrt(1-(a/.82)**2)-.008))}q(e,m,13817038,.012),g(e,new T(.53,.075,.035),13159363).position.set(.035,.025,-1.012),g(e,new T(.085,.09,.045),6712166,{metalness:.7,roughness:.4}).position.set(.18,.025,-1.036);const f=new J;f.moveTo(-.73,.42),f.bezierCurveTo(-.86,.89,-.78,1.64,-.48,1.77),f.quadraticCurveTo(0,1.95,.48,1.77),f.bezierCurveTo(.78,1.64,.86,.89,.73,.42),f.quadraticCurveTo(0,.86,-.73,.42);const z=new Q(f,{depth:.026,bevelEnabled:!0,bevelSize:.012,bevelThickness:.008,bevelSegments:3,steps:1,curveSegments:36}),x=(t,r)=>{const a=Math.sqrt(Math.max(0,1-(t/.82)**2)),c=Math.max(0,r-a);return .005-(.23*(t/.82)**2+.1)*c},h=(t,r)=>{const a=Math.sqrt(Math.max(0,1-(t/.82)**2));return r>a?a+(r-a)*.6:r},b=z.attributes.position;for(let t=0;t<b.count;t++){const r=b.getX(t),a=h(r,b.getY(t)),c=b.getZ(t);b.setXYZ(t,r,x(r,a)-c,a)}z.computeVertexNormals(),g(e,z,14935521,{roughness:.95});for(let t=0;t<3;t++){const r=[];for(let a=0;a<=60;a++){const c=Math.PI*a/60,P=Math.cos(c)*(.72-t*.06),v=h(P,.78+Math.sin(c)*(1.05-t*.075));r.push(new l(P,x(P,v)+.004,v))}q(e,r,13488328,.0025)}for(let t=0;t<6;t++){const r=Math.PI/6+t*Math.PI/3,a=[];for(let v=0;v<=36;v++)a.push(n(v/36*Math.PI/2,r,.005));q(e,a,13619659,.004);const c=n(1.02,r,.012),P=g(e,new ee(.018,.005,6,14),11909552);P.position.copy(c),P.lookAt(c.clone().add(new l(Math.cos(r),.4,Math.sin(r))))}const H=g(e,new G(.048,20,12),14146259);return H.position.set(0,.735,-.08),H.scale.y=.4,q(e,[new l(-.1,.32,.894),new l(.01,.35,.88),new l(.1,.4,.854)],15749667,.014),e.position.set(0,-.25,-.3),e.rotation.x=.08,e}function pe(){const e=new R,n=new J;n.moveTo(-.94,-.74),n.quadraticCurveTo(-1.11,-.72,-1.09,-.49),n.lineTo(-.84,.67),n.quadraticCurveTo(-.81,.78,-.65,.78),n.lineTo(.65,.78),n.quadraticCurveTo(.81,.78,.84,.67),n.lineTo(1.09,-.49),n.quadraticCurveTo(1.11,-.72,.94,-.74),n.closePath();const u=g(e,new Q(n,{depth:.64,bevelEnabled:!0,bevelSize:.12,bevelThickness:.1,bevelSegments:5,curveSegments:24}),14272941);u.position.z=-.32;for(const i of[-.43,.43]){q(e,[new l(-.91,-.65,i),new l(-1,-.5,i),new l(-.78,.65,i),new l(0,.7,i),new l(.78,.65,i),new l(1,-.5,i),new l(.91,-.65,i),new l(0,-.69,i),new l(-.91,-.65,i)],12167048,.009),q(e,[new l(-.52,.58,i),new l(-.52,1.18,i),new l(0,1.58,i),new l(.52,1.18,i),new l(.52,.58,i)],11770486,.047);for(const d of[-.52,.52])g(e,new ee(.075,.016,10,24),14137205,{metalness:.78,roughness:.26}).position.set(d,.62,i+.018),g(e,new T(.13,.29,.035),12165503).position.set(d,.42,i)}g(e,new T(1.4,.022,.065),10123594,{metalness:.65,roughness:.3}).position.set(0,.885,0);for(let i=0;i<26;i++)g(e,new T(.025,.024,.07),13678466,{metalness:.75,roughness:.28}).position.set(-.65+i*.052,.897,0);return g(e,new T(.3,.09,.025),13678466,{metalness:.7,roughness:.25}).position.set(0,.22,.436),e.position.y=-.35,e}function fe(){const e=matchMedia("(prefers-reduced-motion: reduce)"),n=[...document.querySelectorAll(".accessory-story")],u=new IntersectionObserver(s=>{for(const o of s){const i=o.target.accessory;if(i){i.visible=o.isIntersecting;continue}if(!o.isIntersecting)continue;const d=o.target,m=d.querySelector(".accessory-stage");try{const p=new V({alpha:!0,antialias:!0,powerPreference:"low-power"});p.setPixelRatio(Math.min(devicePixelRatio,1.5)),p.toneMapping=X,p.toneMappingExposure=1.05,m.append(p.domElement);const w=new Y,f=new Z(34,1,.1,50),z=new $,x=new U(p);w.environment=x.fromScene(z,.04).texture,z.dispose(),x.dispose(),w.add(new W(16777215,5527622,1.3));const h=new K(16774119,2);h.position.set(3,5,4),w.add(h);const b=new R,H=d.dataset.model==="cap"?ue():pe();b.add(H),w.add(b);const t=[];H.traverse(D=>{D.isMesh&&t.push(D.material)});const r={visible:!0};d.accessory=r;const a=()=>{const D=m.clientWidth,I=m.clientHeight;p.setSize(D,I),f.aspect=D/I,f.position.set(0,.85,f.aspect<1?7.5:5.7),f.lookAt(0,.1,0),f.updateProjectionMatrix()};new ResizeObserver(a).observe(m),a();let c=0;const P=d.querySelector(".accessory-percent"),v=d.querySelector(".accessory-progress"),C=d.querySelector(".accessory-phase");p.setAnimationLoop(()=>{if(document.hidden||!r.visible)return;const D=d.querySelector(".accessory-sticky"),I=N.clamp((110-d.getBoundingClientRect().top)/Math.max(1,d.offsetHeight-D.offsetHeight),0,1);c=e.matches||Math.abs(c-I)<.001?I:N.lerp(c,I,.09),b.rotation.set(.03,e.matches?-.45:-.65+c*(Math.PI*2+.3),e.matches?0:Math.sin(c*Math.PI)*.035),t.forEach(A=>{A.userData.shader&&(A.userData.shader.uniforms.clean.value=c)}),P.textContent=`${Math.round(c*100)}%`,v.style.width=`${c*100}%`,C.textContent=c<.25?"01 — ANTES":c<.98?"02 — EL CUIDADO":"03 — LIMPIO",p.render(w,f)}),m.querySelector(".accessory-loading").remove()}catch{m.querySelector(".accessory-loading").textContent="Explora nuestro cuidado profesional en esta sección."}}},{rootMargin:"250px"});n.forEach(s=>u.observe(s))}const te=document.querySelector("#shoe-stage"),B=document.querySelector("#loading"),me=matchMedia("(prefers-reduced-motion: reduce)");let y,M;const F=document.querySelector(".contact");new IntersectionObserver((e,n)=>{e[0].isIntersecting&&(F.classList.add("bg-ready"),n.disconnect())},{rootMargin:"400px"}).observe(F);let oe=!0;new IntersectionObserver(([e])=>{oe=e.isIntersecting},{rootMargin:"120px"}).observe(document.querySelector(".hero"));let S=0,O=0;const L=new Y,E=new Z(32,1,.01,100);E.position.set(0,.45,4.6);const j=[];function k(){if(!y)return;const{width:e,height:n}=te.getBoundingClientRect();y.setSize(e,n),E.aspect=e/n,E.position.z=E.aspect<1?7:4.6,E.lookAt(0,0,0),E.updateProjectionMatrix()}function _(){const e=document.querySelector(".scroll-story");S=N.clamp(-e.getBoundingClientRect().top/Math.max(1,e.offsetHeight-innerHeight),0,1),document.querySelector("#progress").style.width=`${S*100}%`,document.querySelector("#percent").textContent=`${Math.round(S*100)}%`,document.querySelector("#phase").textContent=S<.3?"01 — ANTES":S<.8?"02 — EL CUIDADO":"03 — LIMPIO"}try{y=new V({alpha:!0,antialias:!0,powerPreference:"low-power"}),y.setPixelRatio(Math.min(devicePixelRatio,1.7)),y.toneMapping=X,y.toneMappingExposure=1.35,te.appendChild(y.domElement);const e=new $,n=new U(y);L.environment=n.fromScene(e,.04).texture,e.dispose(),n.dispose(),L.add(new W(16777215,4475701,2));const u=new K(16772834,4);u.position.set(2,4,4),L.add(u),new ce().load("/assets/sneaker.glb",s=>{M=s.scene;const o=new de().setFromObject(M),i=o.getCenter(new l),d=o.getSize(new l);M.position.sub(i);const m=new R;m.add(M),m.scale.setScalar(2.75/Math.max(d.x,d.y,d.z)),M=m,L.add(M),M.traverse(p=>{if(!p.isMesh)return;p.material=p.material.clone();const w=p.material;p.geometry.computeBoundingBox();const f=p.geometry.boundingBox,z=f.min.clone(),x=f.getSize(new l);x.set(Math.max(x.x,1e-5),Math.max(x.y,1e-5),Math.max(x.z,1e-5)),j.push(w),w.onBeforeCompile=h=>{h.uniforms.clean={value:0},h.uniforms.dirtMin={value:z},h.uniforms.dirtSize={value:x},w.userData.shader=h,h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
uniform vec3 dirtMin;
uniform vec3 dirtSize;
varying vec3 vDirtPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vDirtPosition = (position - dirtMin) / dirtSize - 0.5;`),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}),B.remove(),k()},void 0,()=>{B.textContent="No se pudo cargar el sneaker 3D. Recarga para intentarlo de nuevo."}),k(),addEventListener("resize",k),addEventListener("scroll",_,{passive:!0}),_(),y.setAnimationLoop(()=>{if(!(document.hidden||!oe)){if(O=Math.abs(S-O)<5e-4?S:O+(S-O)*.065,M){const s=me.matches?S:O;M.rotation.set(.12+Math.sin(s*Math.PI)*.14,-.65+s*1.35,-.28+s*.32),M.position.y=Math.sin(s*Math.PI)*.08,j.forEach(o=>{o.userData.shader&&(o.userData.shader.uniforms.clean.value=N.clamp(s,0,1))})}y.render(L,E)}})}catch{B.textContent="La vista 3D no está disponible en este navegador. Puedes explorar nuestros servicios abajo."}fe();
