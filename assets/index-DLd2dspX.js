import{L as de,F as B,S as E,a as le,B as ue,b as U,C as fe,c as pe,W as V,A as Y,d as J,P as K,R as X,e as Z,H as Q,D as ee,G as I,M as R,f as te,g as oe,h as re,V as p,i as me,E as he,T as ge,j as _,k as ye,l as we,m as ve}from"./three-ST1E33s8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(r){if(r.ep)return;r.ep=!0;const t=n(r);fetch(r.href,t)}})();const O=new WeakMap;class be extends de{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,n,s,r){const t=new B(this.manager);t.setPath(this.path),t.setResponseType("arraybuffer"),t.setRequestHeader(this.requestHeader),t.setWithCredentials(this.withCredentials),t.load(e,o=>{this.parse(o,n,r)},s,r)}parse(e,n,s=()=>{}){this.decodeDracoFile(e,n,null,null,E,s).catch(s)}decodeDracoFile(e,n,s,r,t=le,o=()=>{}){const i={attributeIDs:s||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!s,vertexColorSpace:t};return this.decodeGeometry(e,i).then(n).catch(o)}decodeGeometry(e,n){const s=JSON.stringify(n);if(O.has(e)){const c=O.get(e);if(c.key===s)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r;const t=this.workerNextTaskID++,o=e.byteLength,i=this._getWorker(t,o).then(c=>(r=c,new Promise((f,u)=>{r._callbacks[t]={resolve:f,reject:u},r.postMessage({type:"decode",id:t,taskConfig:n,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return i.catch(()=>!0).then(()=>{r&&t&&this._releaseTask(r,t)}),O.set(e,{key:s,promise:i}),i}_createGeometry(e){const n=new ue;e.index&&n.setIndex(new U(e.index.array,1));for(let s=0;s<e.attributes.length;s++){const r=e.attributes[s],t=r.name,o=r.array,i=r.itemSize,c=new U(o,i);t==="color"&&(this._assignVertexColorSpace(c,r.vertexColorSpace),c.normalized=!(o instanceof Float32Array)),n.setAttribute(t,c)}return n}_assignVertexColorSpace(e,n){if(n!==E)return;const s=new fe;for(let r=0,t=e.count;r<t;r++)s.fromBufferAttribute(e,r),pe.colorSpaceToWorking(s,E),e.setXYZ(r,s.r,s.g,s.b)}_loadLibrary(e,n){const s=new B(this.manager);return s.setPath(this.decoderPath),s.setResponseType(n),s.setWithCredentials(this.withCredentials),new Promise((r,t)=>{s.load(e,r,void 0,t)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",n=[];return e?n.push(this._loadLibrary("draco_decoder.js","text")):(n.push(this._loadLibrary("draco_wasm_wrapper.js","text")),n.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(n).then(s=>{const r=s[0];e||(this.decoderConfig.wasmBinary=s[1]);const t=xe.toString(),o=["/* draco decoder */",r,"","/* worker */",t.substring(t.indexOf("{")+1,t.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,n){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(t){const o=t.data;switch(o.type){case"decode":r._callbacks[o.id].resolve(o);break;case"error":r._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,t){return r._taskLoad>t._taskLoad?-1:1});const s=this.workerPool[this.workerPool.length-1];return s._taskCosts[e]=n,s._taskLoad+=n,s})}_releaseTask(e,n){e._taskLoad-=e._taskCosts[n],delete e._callbacks[n],delete e._taskCosts[n]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function xe(){let a,e;onmessage=function(o){const i=o.data;switch(i.type){case"init":a=i.decoderConfig,e=new Promise(function(u){a.onModuleLoaded=function(m){u({draco:m})},DracoDecoderModule(a)});break;case"decode":const c=i.buffer,f=i.taskConfig;e.then(u=>{const m=u.draco,d=new m.Decoder;try{const l=n(m,d,new Int8Array(c),f),g=l.attributes.map(y=>y.array.buffer);l.index&&g.push(l.index.array.buffer),self.postMessage({type:"decode",id:i.id,geometry:l},g)}catch(l){console.error(l),self.postMessage({type:"error",id:i.id,error:l.message})}finally{m.destroy(d)}});break}};function n(o,i,c,f){const u=f.attributeIDs,m=f.attributeTypes;let d,l;const g=i.GetEncodedGeometryType(c);if(g===o.TRIANGULAR_MESH)d=new o.Mesh,l=i.DecodeArrayToMesh(c,c.byteLength,d);else if(g===o.POINT_CLOUD)d=new o.PointCloud,l=i.DecodeArrayToPointCloud(c,c.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!l.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+l.error_msg());const y={index:null,attributes:[]};for(const w in u){const P=self[m[w]];let S,h;if(f.useUniqueIDs)h=u[w],S=i.GetAttributeByUniqueId(d,h);else{if(h=i.GetAttributeId(d,o[u[w]]),h===-1)continue;S=i.GetAttribute(d,h)}const A=r(o,i,d,w,P,S);w==="color"&&(A.vertexColorSpace=f.vertexColorSpace),y.attributes.push(A)}return g===o.TRIANGULAR_MESH&&(y.index=s(o,i,d)),o.destroy(d),y}function s(o,i,c){const u=c.num_faces()*3,m=u*4,d=o._malloc(m);i.GetTrianglesUInt32Array(c,m,d);const l=new Uint32Array(o.HEAPF32.buffer,d,u).slice();return o._free(d),{array:l,itemSize:1}}function r(o,i,c,f,u,m){const d=m.num_components(),g=c.num_points()*d,y=g*u.BYTES_PER_ELEMENT,w=t(o,u),P=o._malloc(y);i.GetAttributeDataArrayForAllPoints(c,m,w,y,P);const S=new u(o.HEAPF32.buffer,P,g).slice();return o._free(P),{name:f,array:S,itemSize:d}}function t(o,i){switch(i){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}const q={cap:{scale:11.5,tintA:[.46,.34,.14],tintB:[.62,.5,.24],band:1,edge:0,speck:.16,streak:0,strength:1.55},bag:{scale:6.2,tintA:[.3,.28,.26],tintB:[.48,.44,.39],band:0,edge:1,speck:.05,streak:.85,strength:1.35}};function se(a,e,n="bag"){const s=q[n]??q.bag;e.computeBoundingBox();const r=e.boundingBox.min.clone(),t=e.boundingBox.max.clone().sub(r);t.set(Math.max(t.x,1e-5),Math.max(t.y,1e-5),Math.max(t.z,1e-5)),a.onBeforeCompile=o=>{o.uniforms.clean={value:0},o.uniforms.dirtMin={value:r},o.uniforms.dirtSize={value:t},a.userData.shader=o,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
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
vec3 dirtP = vDirtPosition * ${s.scale.toFixed(2)};
vec3 warp = vec3(dirtNoise(dirtP + 7.1), dirtNoise(dirtP + 23.4), dirtNoise(dirtP - 11.8));
float soil = dirtFbm(dirtP + warp * 2.6);
float film = 0.06 + smoothstep(0.10, 0.90, dirtFbm(dirtP * 0.55 + 31.0)) * 0.14;
float smudge = smoothstep(0.37, 0.70, soil);

// Aro de sudor: rodea la pieza a la altura de la banda y sube por el frente.
float band = 1.0 - smoothstep(0.0, 0.26, abs(vDirtPosition.y + 0.30));
band *= 0.45 + 0.55 * smoothstep(-0.1, 0.45, vDirtPosition.z);
band *= 0.75 + 0.45 * soil;

// Desgaste de uso: base y extremos laterales, donde la pieza se apoya y roza.
float edge = 1.0 - smoothstep(-0.42, -0.02, vDirtPosition.y);
edge = max(edge, smoothstep(0.30, 0.50, abs(vDirtPosition.x)) * 0.75);
edge *= 0.55 + 0.60 * soil;

// Rayas verticales de roce, alargadas en Y.
float streak = smoothstep(0.55, 0.95, dirtFbm(vec3(dirtP.x * 2.4, dirtP.y * 0.22, dirtP.z * 2.4) + 5.0));

float speck = smoothstep(0.72, 0.99, dirtNoise(vDirtPosition * 150.0));

float dirtMask = film + smudge * 0.42
  + band * ${s.band.toFixed(2)} * 0.62
  + edge * ${s.edge.toFixed(2)} * 0.55
  + streak * ${s.streak.toFixed(2)} * 0.30
  + speck * ${s.speck.toFixed(2)};
dirtMask = clamp(dirtMask * ${s.strength.toFixed(2)}, 0.0, 0.93);

float sweep = vDirtPosition.x + 0.5 + (soil - 0.5) * 0.12;
float sweepRemoval = smoothstep(sweep - 0.10, sweep + 0.10, clean * 1.20 - 0.10);
float dirtOpacity = dirtMask * (1.0 - sweepRemoval);
if (clean <= 0.0) dirtOpacity = dirtMask;
if (clean >= 1.0) dirtOpacity = 0.0;
vec3 soilTint = mix(vec3(${s.tintA.map(i=>i.toFixed(3)).join(", ")}), vec3(${s.tintB.map(i=>i.toFixed(3)).join(", ")}), soil);
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}let z;function Pe(){if(!z){const a=new be().setDecoderPath("/draco/");z=new te().setDRACOLoader(a).loadAsync("/assets/cap.glb").then(n=>{const s=n.scene;s.traverse(i=>{i.isMesh&&(i.material=new oe({color:15263196,roughness:.78,metalness:0}),se(i.material,i.geometry,"cap"))});const r=new re().setFromObject(s),t=r.getSize(new p);s.position.sub(r.getCenter(new p));const o=new I;return o.add(s),o.scale.setScalar(2.45/Math.max(t.x,t.y,t.z)),o})}return z.then(a=>a.clone(!0))}function C(a,e,n,s={}){const r=new oe({color:n,roughness:.72,...s});se(r,e,"bag");const t=new ye(e,r);return a.add(t),t}function G(a,e,n=13223353,s=.008){return C(a,new we(new ve(e),64,s,6,!1),n)}function Se(){const a=new I,e=new me;e.moveTo(-.94,-.74),e.quadraticCurveTo(-1.11,-.72,-1.09,-.49),e.lineTo(-.84,.67),e.quadraticCurveTo(-.81,.78,-.65,.78),e.lineTo(.65,.78),e.quadraticCurveTo(.81,.78,.84,.67),e.lineTo(1.09,-.49),e.quadraticCurveTo(1.11,-.72,.94,-.74),e.closePath();const n=C(a,new he(e,{depth:.64,bevelEnabled:!0,bevelSize:.12,bevelThickness:.1,bevelSegments:5,curveSegments:24}),14272941);n.position.z=-.32;for(const t of[-.43,.43]){G(a,[new p(-.91,-.65,t),new p(-1,-.5,t),new p(-.78,.65,t),new p(0,.7,t),new p(.78,.65,t),new p(1,-.5,t),new p(.91,-.65,t),new p(0,-.69,t),new p(-.91,-.65,t)],12167048,.009),G(a,[new p(-.52,.58,t),new p(-.52,1.18,t),new p(0,1.58,t),new p(.52,1.18,t),new p(.52,.58,t)],11770486,.047);for(const o of[-.52,.52])C(a,new ge(.075,.016,10,24),14137205,{metalness:.78,roughness:.26}).position.set(o,.62,t+.018),C(a,new _(.13,.29,.035),12165503).position.set(o,.42,t)}C(a,new _(1.4,.022,.065),10123594,{metalness:.65,roughness:.3}).position.set(0,.885,0);for(let t=0;t<26;t++)C(a,new _(.025,.024,.07),13678466,{metalness:.75,roughness:.28}).position.set(-.65+t*.052,.897,0);return C(a,new _(.3,.09,.025),13678466,{metalness:.7,roughness:.25}).position.set(0,.22,.436),a.position.y=-.35,a}function ke(){const a=matchMedia("(prefers-reduced-motion: reduce)"),e=[...document.querySelectorAll(".accessory-story")],n=new IntersectionObserver(async s=>{for(const r of s){const t=r.target.accessory;if(t){t.visible=r.isIntersecting;continue}if(!r.isIntersecting)continue;const o=r.target,i=o.querySelector(".accessory-stage");try{const c=new V({alpha:!0,antialias:!0,powerPreference:"low-power"});c.setPixelRatio(Math.min(devicePixelRatio,1.5)),c.toneMapping=Y,c.toneMappingExposure=1.05,i.append(c.domElement);const f=new J,u=new K(34,1,.1,50),m=new X,d=new Z(c);f.environment=d.fromScene(m,.04).texture,m.dispose(),d.dispose(),f.add(new Q(16777215,5527622,1.3));const l=new ee(16774119,2);l.position.set(3,5,4),f.add(l);const g=new I,y=o.dataset.model==="cap"?await Pe():Se();g.add(y),f.add(g);const w=[];y.traverse(k=>{k.isMesh&&w.push(k.material)});const P={visible:!0};o.accessory=P;const S=()=>{const k=i.clientWidth,M=i.clientHeight;c.setSize(k,M),u.aspect=k/M,u.position.set(0,.85,u.aspect<1?7.5:5.7),u.lookAt(0,.1,0),u.updateProjectionMatrix()};new ResizeObserver(S).observe(i),S();let h=0;const A=o.querySelector(".accessory-percent"),ae=o.querySelector(".accessory-progress"),ce=o.querySelector(".accessory-phase");c.setAnimationLoop(()=>{if(document.hidden||!P.visible)return;const k=o.querySelector(".accessory-sticky"),M=R.clamp((110-o.getBoundingClientRect().top)/Math.max(1,o.offsetHeight-k.offsetHeight),0,1);h=a.matches||Math.abs(h-M)<.001?M:R.lerp(h,M,.09),g.rotation.set(.03,a.matches?-.45:-.65+h*(Math.PI*2+.3),a.matches?0:Math.sin(h*Math.PI)*.035),w.forEach(N=>{N.userData.shader&&(N.userData.shader.uniforms.clean.value=h)}),A.textContent=`${Math.round(h*100)}%`,ae.style.width=`${h*100}%`,ce.textContent=h<.25?"01 — ANTES":h<.98?"02 — EL CUIDADO":"03 — LIMPIO",c.render(f,u)}),i.querySelector(".accessory-loading").remove()}catch{i.querySelector(".accessory-loading").textContent="Explora nuestro cuidado profesional en esta sección."}}},{rootMargin:"250px"});e.forEach(s=>n.observe(s))}const ie=document.querySelector("#shoe-stage"),F=document.querySelector("#loading"),Me=matchMedia("(prefers-reduced-motion: reduce)");let b,v;const j=document.querySelector(".contact");new IntersectionObserver((a,e)=>{a[0].isIntersecting&&(j.classList.add("bg-ready"),e.disconnect())},{rootMargin:"400px"}).observe(j);let ne=!0;new IntersectionObserver(([a])=>{ne=a.isIntersecting},{rootMargin:"120px"}).observe(document.querySelector(".hero"));let x=0,L=0;const T=new J,D=new K(32,1,.01,100);D.position.set(0,.45,4.6);const W=[];function H(){if(!b)return;const{width:a,height:e}=ie.getBoundingClientRect();b.setSize(a,e),D.aspect=a/e,D.position.z=D.aspect<1?7:4.6,D.lookAt(0,0,0),D.updateProjectionMatrix()}function $(){const a=document.querySelector(".scroll-story");x=R.clamp(-a.getBoundingClientRect().top/Math.max(1,a.offsetHeight-innerHeight),0,1),document.querySelector("#progress").style.width=`${x*100}%`,document.querySelector("#percent").textContent=`${Math.round(x*100)}%`,document.querySelector("#phase").textContent=x<.3?"01 — ANTES":x<.8?"02 — EL CUIDADO":"03 — LIMPIO"}try{b=new V({alpha:!0,antialias:!0,powerPreference:"low-power"}),b.setPixelRatio(Math.min(devicePixelRatio,1.7)),b.toneMapping=Y,b.toneMappingExposure=1.35,ie.appendChild(b.domElement);const a=new X,e=new Z(b);T.environment=e.fromScene(a,.04).texture,a.dispose(),e.dispose(),T.add(new Q(16777215,4475701,2));const n=new ee(16772834,4);n.position.set(2,4,4),T.add(n),new te().load("/assets/sneaker.glb",s=>{v=s.scene;const r=new re().setFromObject(v),t=r.getCenter(new p),o=r.getSize(new p);v.position.sub(t);const i=new I;i.add(v),i.scale.setScalar(2.75/Math.max(o.x,o.y,o.z)),v=i,T.add(v),v.traverse(c=>{if(!c.isMesh)return;c.material=c.material.clone();const f=c.material;c.geometry.computeBoundingBox();const u=c.geometry.boundingBox,m=u.min.clone(),d=u.getSize(new p);d.set(Math.max(d.x,1e-5),Math.max(d.y,1e-5),Math.max(d.z,1e-5)),W.push(f),f.onBeforeCompile=l=>{l.uniforms.clean={value:0},l.uniforms.dirtMin={value:m},l.uniforms.dirtSize={value:d},f.userData.shader=l,l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
uniform vec3 dirtMin;
uniform vec3 dirtSize;
varying vec3 vDirtPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vDirtPosition = (position - dirtMin) / dirtSize - 0.5;`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}),F.remove(),H()},void 0,()=>{F.textContent="No se pudo cargar el sneaker 3D. Recarga para intentarlo de nuevo."}),H(),addEventListener("resize",H),addEventListener("scroll",$,{passive:!0}),$(),b.setAnimationLoop(()=>{if(!(document.hidden||!ne)){if(L=Math.abs(x-L)<5e-4?x:L+(x-L)*.065,v){const s=Me.matches?x:L;v.rotation.set(.12+Math.sin(s*Math.PI)*.14,-.65+s*1.35,-.28+s*.32),v.position.y=Math.sin(s*Math.PI)*.08,W.forEach(r=>{r.userData.shader&&(r.userData.shader.uniforms.clean.value=R.clamp(s,0,1))})}b.render(T,D)}})}catch{F.textContent="La vista 3D no está disponible en este navegador. Puedes explorar nuestros servicios abajo."}ke();
