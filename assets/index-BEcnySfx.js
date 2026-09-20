import{L as ce,F as q,S as E,a as de,B as le,b as B,C as ue,c as fe,W as V,A as $,d as J,P as K,R as X,e as Y,H as Z,D as Q,G as I,M as R,f as ee,g as te,h as oe,V as p,i as pe,E as me,T as he,j as A,k as ge,l as ye,m as we}from"./three-ST1E33s8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const O=new WeakMap;class ve extends ce{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,s,i,t){const o=new q(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,r=>{this.parse(r,s,t)},i,t)}parse(e,s,i=()=>{}){this.decodeDracoFile(e,s,null,null,E,i).catch(i)}decodeDracoFile(e,s,i,t,o=de,r=()=>{}){const n={attributeIDs:i||this.defaultAttributeIDs,attributeTypes:t||this.defaultAttributeTypes,useUniqueIDs:!!i,vertexColorSpace:o};return this.decodeGeometry(e,n).then(s).catch(r)}decodeGeometry(e,s){const i=JSON.stringify(s);if(O.has(e)){const c=O.get(e);if(c.key===i)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let t;const o=this.workerNextTaskID++,r=e.byteLength,n=this._getWorker(o,r).then(c=>(t=c,new Promise((f,u)=>{t._callbacks[o]={resolve:f,reject:u},t.postMessage({type:"decode",id:o,taskConfig:s,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return n.catch(()=>!0).then(()=>{t&&o&&this._releaseTask(t,o)}),O.set(e,{key:i,promise:n}),n}_createGeometry(e){const s=new le;e.index&&s.setIndex(new B(e.index.array,1));for(let i=0;i<e.attributes.length;i++){const t=e.attributes[i],o=t.name,r=t.array,n=t.itemSize,c=new B(r,n);o==="color"&&(this._assignVertexColorSpace(c,t.vertexColorSpace),c.normalized=!(r instanceof Float32Array)),s.setAttribute(o,c)}return s}_assignVertexColorSpace(e,s){if(s!==E)return;const i=new ue;for(let t=0,o=e.count;t<o;t++)i.fromBufferAttribute(e,t),fe.colorSpaceToWorking(i,E),e.setXYZ(t,i.r,i.g,i.b)}_loadLibrary(e,s){const i=new q(this.manager);return i.setPath(this.decoderPath),i.setResponseType(s),i.setWithCredentials(this.withCredentials),new Promise((t,o)=>{i.load(e,t,void 0,o)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",s=[];return e?s.push(this._loadLibrary("draco_decoder.js","text")):(s.push(this._loadLibrary("draco_wasm_wrapper.js","text")),s.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(s).then(i=>{const t=i[0];e||(this.decoderConfig.wasmBinary=i[1]);const o=xe.toString(),r=["/* draco decoder */",t,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([r]))}),this.decoderPending}_getWorker(e,s){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const t=new Worker(this.workerSourceURL);t._callbacks={},t._taskCosts={},t._taskLoad=0,t.postMessage({type:"init",decoderConfig:this.decoderConfig}),t.onmessage=function(o){const r=o.data;switch(r.type){case"decode":t._callbacks[r.id].resolve(r);break;case"error":t._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(t)}else this.workerPool.sort(function(t,o){return t._taskLoad>o._taskLoad?-1:1});const i=this.workerPool[this.workerPool.length-1];return i._taskCosts[e]=s,i._taskLoad+=s,i})}_releaseTask(e,s){e._taskLoad-=e._taskCosts[s],delete e._callbacks[s],delete e._taskCosts[s]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function xe(){let a,e;onmessage=function(r){const n=r.data;switch(n.type){case"init":a=n.decoderConfig,e=new Promise(function(u){a.onModuleLoaded=function(m){u({draco:m})},DracoDecoderModule(a)});break;case"decode":const c=n.buffer,f=n.taskConfig;e.then(u=>{const m=u.draco,d=new m.Decoder;try{const l=s(m,d,new Int8Array(c),f),g=l.attributes.map(y=>y.array.buffer);l.index&&g.push(l.index.array.buffer),self.postMessage({type:"decode",id:n.id,geometry:l},g)}catch(l){console.error(l),self.postMessage({type:"error",id:n.id,error:l.message})}finally{m.destroy(d)}});break}};function s(r,n,c,f){const u=f.attributeIDs,m=f.attributeTypes;let d,l;const g=n.GetEncodedGeometryType(c);if(g===r.TRIANGULAR_MESH)d=new r.Mesh,l=n.DecodeArrayToMesh(c,c.byteLength,d);else if(g===r.POINT_CLOUD)d=new r.PointCloud,l=n.DecodeArrayToPointCloud(c,c.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!l.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+l.error_msg());const y={index:null,attributes:[]};for(const w in u){const P=self[m[w]];let S,h;if(f.useUniqueIDs)h=u[w],S=n.GetAttributeByUniqueId(d,h);else{if(h=n.GetAttributeId(d,r[u[w]]),h===-1)continue;S=n.GetAttribute(d,h)}const _=t(r,n,d,w,P,S);w==="color"&&(_.vertexColorSpace=f.vertexColorSpace),y.attributes.push(_)}return g===r.TRIANGULAR_MESH&&(y.index=i(r,n,d)),r.destroy(d),y}function i(r,n,c){const u=c.num_faces()*3,m=u*4,d=r._malloc(m);n.GetTrianglesUInt32Array(c,m,d);const l=new Uint32Array(r.HEAPF32.buffer,d,u).slice();return r._free(d),{array:l,itemSize:1}}function t(r,n,c,f,u,m){const d=m.num_components(),g=c.num_points()*d,y=g*u.BYTES_PER_ELEMENT,w=o(r,u),P=r._malloc(y);n.GetAttributeDataArrayForAllPoints(c,m,w,y,P);const S=new u(r.HEAPF32.buffer,P,g).slice();return r._free(P),{name:f,array:S,itemSize:d}}function o(r,n){switch(n){case Float32Array:return r.DT_FLOAT32;case Int8Array:return r.DT_INT8;case Int16Array:return r.DT_INT16;case Int32Array:return r.DT_INT32;case Uint8Array:return r.DT_UINT8;case Uint16Array:return r.DT_UINT16;case Uint32Array:return r.DT_UINT32}}}function re(a,e){e.computeBoundingBox();const s=e.boundingBox.min.clone(),i=e.boundingBox.max.clone().sub(s);i.set(Math.max(i.x,1e-5),Math.max(i.y,1e-5),Math.max(i.z,1e-5)),a.onBeforeCompile=t=>{t.uniforms.clean={value:0},t.uniforms.dirtMin={value:s},t.uniforms.dirtSize={value:i},a.userData.shader=t,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
uniform vec3 dirtMin;
uniform vec3 dirtSize;
varying vec3 vDirtPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vDirtPosition = (position - dirtMin) / dirtSize - 0.5;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}let z;function be(){if(!z){const a=new ve().setDecoderPath("/draco/");z=new ee().setDRACOLoader(a).loadAsync("/assets/cap.glb").then(s=>{const i=s.scene;i.traverse(n=>{n.isMesh&&(n.material=new te({color:15263196,roughness:.78,metalness:0}),re(n.material,n.geometry))});const t=new oe().setFromObject(i),o=t.getSize(new p);i.position.sub(t.getCenter(new p));const r=new I;return r.add(i),r.scale.setScalar(2.45/Math.max(o.x,o.y,o.z)),r})}return z.then(a=>a.clone(!0))}function k(a,e,s,i={}){const t=new te({color:s,roughness:.72,...i});re(t,e);const o=new ge(e,t);return a.add(o),o}function F(a,e,s=13223353,i=.008){return k(a,new ye(new we(e),64,i,6,!1),s)}function Pe(){const a=new I,e=new pe;e.moveTo(-.94,-.74),e.quadraticCurveTo(-1.11,-.72,-1.09,-.49),e.lineTo(-.84,.67),e.quadraticCurveTo(-.81,.78,-.65,.78),e.lineTo(.65,.78),e.quadraticCurveTo(.81,.78,.84,.67),e.lineTo(1.09,-.49),e.quadraticCurveTo(1.11,-.72,.94,-.74),e.closePath();const s=k(a,new me(e,{depth:.64,bevelEnabled:!0,bevelSize:.12,bevelThickness:.1,bevelSegments:5,curveSegments:24}),14272941);s.position.z=-.32;for(const o of[-.43,.43]){F(a,[new p(-.91,-.65,o),new p(-1,-.5,o),new p(-.78,.65,o),new p(0,.7,o),new p(.78,.65,o),new p(1,-.5,o),new p(.91,-.65,o),new p(0,-.69,o),new p(-.91,-.65,o)],12167048,.009),F(a,[new p(-.52,.58,o),new p(-.52,1.18,o),new p(0,1.58,o),new p(.52,1.18,o),new p(.52,.58,o)],11770486,.047);for(const r of[-.52,.52])k(a,new he(.075,.016,10,24),14137205,{metalness:.78,roughness:.26}).position.set(r,.62,o+.018),k(a,new A(.13,.29,.035),12165503).position.set(r,.42,o)}k(a,new A(1.4,.022,.065),10123594,{metalness:.65,roughness:.3}).position.set(0,.885,0);for(let o=0;o<26;o++)k(a,new A(.025,.024,.07),13678466,{metalness:.75,roughness:.28}).position.set(-.65+o*.052,.897,0);return k(a,new A(.3,.09,.025),13678466,{metalness:.7,roughness:.25}).position.set(0,.22,.436),a.position.y=-.35,a}function Se(){const a=matchMedia("(prefers-reduced-motion: reduce)"),e=[...document.querySelectorAll(".accessory-story")],s=new IntersectionObserver(async i=>{for(const t of i){const o=t.target.accessory;if(o){o.visible=t.isIntersecting;continue}if(!t.isIntersecting)continue;const r=t.target,n=r.querySelector(".accessory-stage");try{const c=new V({alpha:!0,antialias:!0,powerPreference:"low-power"});c.setPixelRatio(Math.min(devicePixelRatio,1.5)),c.toneMapping=$,c.toneMappingExposure=1.05,n.append(c.domElement);const f=new J,u=new K(34,1,.1,50),m=new X,d=new Y(c);f.environment=d.fromScene(m,.04).texture,m.dispose(),d.dispose(),f.add(new Z(16777215,5527622,1.3));const l=new Q(16774119,2);l.position.set(3,5,4),f.add(l);const g=new I,y=r.dataset.model==="cap"?await be():Pe();g.add(y),f.add(g);const w=[];y.traverse(M=>{M.isMesh&&w.push(M.material)});const P={visible:!0};r.accessory=P;const S=()=>{const M=n.clientWidth,C=n.clientHeight;c.setSize(M,C),u.aspect=M/C,u.position.set(0,.85,u.aspect<1?7.5:5.7),u.lookAt(0,.1,0),u.updateProjectionMatrix()};new ResizeObserver(S).observe(n),S();let h=0;const _=r.querySelector(".accessory-percent"),ne=r.querySelector(".accessory-progress"),ae=r.querySelector(".accessory-phase");c.setAnimationLoop(()=>{if(document.hidden||!P.visible)return;const M=r.querySelector(".accessory-sticky"),C=R.clamp((110-r.getBoundingClientRect().top)/Math.max(1,r.offsetHeight-M.offsetHeight),0,1);h=a.matches||Math.abs(h-C)<.001?C:R.lerp(h,C,.09),g.rotation.set(.03,a.matches?-.45:-.65+h*(Math.PI*2+.3),a.matches?0:Math.sin(h*Math.PI)*.035),w.forEach(U=>{U.userData.shader&&(U.userData.shader.uniforms.clean.value=h)}),_.textContent=`${Math.round(h*100)}%`,ne.style.width=`${h*100}%`,ae.textContent=h<.25?"01 — ANTES":h<.98?"02 — EL CUIDADO":"03 — LIMPIO",c.render(f,u)}),n.querySelector(".accessory-loading").remove()}catch{n.querySelector(".accessory-loading").textContent="Explora nuestro cuidado profesional en esta sección."}}},{rootMargin:"250px"});e.forEach(i=>s.observe(i))}const ie=document.querySelector("#shoe-stage"),H=document.querySelector("#loading"),Me=matchMedia("(prefers-reduced-motion: reduce)");let x,v;const G=document.querySelector(".contact");new IntersectionObserver((a,e)=>{a[0].isIntersecting&&(G.classList.add("bg-ready"),e.disconnect())},{rootMargin:"400px"}).observe(G);let se=!0;new IntersectionObserver(([a])=>{se=a.isIntersecting},{rootMargin:"120px"}).observe(document.querySelector(".hero"));let b=0,L=0;const T=new J,D=new K(32,1,.01,100);D.position.set(0,.45,4.6);const j=[];function N(){if(!x)return;const{width:a,height:e}=ie.getBoundingClientRect();x.setSize(a,e),D.aspect=a/e,D.position.z=D.aspect<1?7:4.6,D.lookAt(0,0,0),D.updateProjectionMatrix()}function W(){const a=document.querySelector(".scroll-story");b=R.clamp(-a.getBoundingClientRect().top/Math.max(1,a.offsetHeight-innerHeight),0,1),document.querySelector("#progress").style.width=`${b*100}%`,document.querySelector("#percent").textContent=`${Math.round(b*100)}%`,document.querySelector("#phase").textContent=b<.3?"01 — ANTES":b<.8?"02 — EL CUIDADO":"03 — LIMPIO"}try{x=new V({alpha:!0,antialias:!0,powerPreference:"low-power"}),x.setPixelRatio(Math.min(devicePixelRatio,1.7)),x.toneMapping=$,x.toneMappingExposure=1.35,ie.appendChild(x.domElement);const a=new X,e=new Y(x);T.environment=e.fromScene(a,.04).texture,a.dispose(),e.dispose(),T.add(new Z(16777215,4475701,2));const s=new Q(16772834,4);s.position.set(2,4,4),T.add(s),new ee().load("/assets/sneaker.glb",i=>{v=i.scene;const t=new oe().setFromObject(v),o=t.getCenter(new p),r=t.getSize(new p);v.position.sub(o);const n=new I;n.add(v),n.scale.setScalar(2.75/Math.max(r.x,r.y,r.z)),v=n,T.add(v),v.traverse(c=>{if(!c.isMesh)return;c.material=c.material.clone();const f=c.material;c.geometry.computeBoundingBox();const u=c.geometry.boundingBox,m=u.min.clone(),d=u.getSize(new p);d.set(Math.max(d.x,1e-5),Math.max(d.y,1e-5),Math.max(d.z,1e-5)),j.push(f),f.onBeforeCompile=l=>{l.uniforms.clean={value:0},l.uniforms.dirtMin={value:m},l.uniforms.dirtSize={value:d},f.userData.shader=l,l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb *= mix(vec3(1.0), soilTint, dirtOpacity);`)}}),H.remove(),N()},void 0,()=>{H.textContent="No se pudo cargar el sneaker 3D. Recarga para intentarlo de nuevo."}),N(),addEventListener("resize",N),addEventListener("scroll",W,{passive:!0}),W(),x.setAnimationLoop(()=>{if(!(document.hidden||!se)){if(L=Math.abs(b-L)<5e-4?b:L+(b-L)*.065,v){const i=Me.matches?b:L;v.rotation.set(.12+Math.sin(i*Math.PI)*.14,-.65+i*1.35,-.28+i*.32),v.position.y=Math.sin(i*Math.PI)*.08,j.forEach(t=>{t.userData.shader&&(t.userData.shader.uniforms.clean.value=R.clamp(i,0,1))})}x.render(T,D)}})}catch{H.textContent="La vista 3D no está disponible en este navegador. Puedes explorar nuestros servicios abajo."}Se();
