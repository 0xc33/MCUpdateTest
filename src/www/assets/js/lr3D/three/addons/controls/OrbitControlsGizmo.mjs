import{Vector2 as e,Vector3 as t,Matrix4 as n}from"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";class i{constructor(i,o){o=Object.assign({size:90,padding:8,bubbleSizePrimary:8,bubbleSizeSecondary:6,lineWidth:2,fontSize:"12px",fontFamily:"arial",fontWeight:"bold",fontColor:"#222222",className:"obit-controls-gizmo",colors:{x:["#f73c3c","#942424"],y:["#6ccb26","#417a17"],z:["#178cf0","#0e5490"]}},o),this.lock=!1,this.lockX=!1,this.lockY=!1,this.update=()=>{if(!this.lock){l.updateMatrix(),c.extractRotation(l.matrix).invert();for(let e=0,t=v.length;e<t;e++)j(v[e]);v.sort(((e,t)=>e.position.z>t.position.z?1:-1)),P(!0)}},this.dispose=()=>{r.removeEventListener("change",this.update),r.removeEventListener("start",(()=>this.domElement.classList.add("inactive"))),r.removeEventListener("end",(()=>this.domElement.classList.remove("inactive"))),this.domElement.removeEventListener("pointerdown",x,!1),this.domElement.removeEventListener("pointerenter",b,!1),this.domElement.removeEventListener("pointermove",g,!1),this.domElement.removeEventListener("click",F,!1),window.removeEventListener("pointermove",L,!1),window.removeEventListener("pointerup",z,!1),this.domElement.remove()};const s=this,r=i,l=i.object,c=new n,a=new t,d=new e,m=new e,p=new e,h=new t(o.size/2,o.size/2,0),v=function(){const e=o.colors,n=o.lineWidth,i={primary:o.bubbleSizePrimary,secondary:o.bubbleSizeSecondary};return[{axis:"x",direction:new t(1,0,0),size:i.primary,color:e.x,line:n,label:"X",position:new t(0,0,0)},{axis:"y",direction:new t(0,1,0),size:i.primary,color:e.y,line:n,label:"Y",position:new t(0,0,0)},{axis:"z",direction:new t(0,0,1),size:i.primary,color:e.z,line:n,label:"Z",position:new t(0,0,0)},{axis:"-x",direction:new t(-1,0,0),size:i.secondary,color:e.x,position:new t(0,0,0)},{axis:"-y",direction:new t(0,-1,0),size:i.secondary,color:e.y,position:new t(0,0,0)},{axis:"-z",direction:new t(0,0,-1),size:i.secondary,color:e.z,position:new t(0,0,0)}]}();let u,f,E,w=null,y=!1;function x(e){d.set(e.clientX,e.clientY),E=r.enabled,r.enabled=!1,window.addEventListener("pointermove",L,!1),window.addEventListener("pointerup",z,!1)}function z(){setTimeout((()=>y=!1),0),s.domElement.classList.remove("dragging"),r.enabled=E,window.removeEventListener("pointermove",L,!1),window.removeEventListener("pointerup",z,!1)}function b(){f=s.domElement.getBoundingClientRect()}function g(e){if(y||s.lock)return;const t=w;w=null,e&&a.set(e.clientX-f.left,e.clientY-f.top,0);for(let e=0,t=v.length;e<t;e++){a.distanceTo(v[e].position)<v[e].size&&(w=v[e])}t!==w&&P()}function L(e){s.lock||(y||s.domElement.classList.add("dragging"),y=!0,w=null,m.set(e.clientX,e.clientY),p.subVectors(m,d).multiplyScalar(.5),s.lockX||r.rotateLeft(2*Math.PI*p.x/s.domElement.height),s.lockY||r.rotateUp(2*Math.PI*p.y/s.domElement.height),d.copy(m),r.update())}function F(){if(y||!w)return;const e=w.direction.clone(),t=l.position.distanceTo(r.target);e.multiplyScalar(t);const n=performance.now();!function t(){const i=performance.now()-n,o=Math.min(i/400,1);if(l.position.lerp(e,o),r.update(),1!==o)return requestAnimationFrame(t);g()}(),w=null}function S(e,t=10,n="#FF0000"){u.beginPath(),u.arc(e.x,e.y,t,0,2*Math.PI,!1),u.fillStyle=n,u.fill(),u.closePath()}function k(e,t,n=1,i="#FF0000"){u.beginPath(),u.moveTo(e.x,e.y),u.lineTo(t.x,t.y),u.lineWidth=n,u.strokeStyle=i,u.stroke(),u.closePath()}function P(e){e&&u.clearRect(0,0,s.domElement.width,s.domElement.height);for(let e=0,t=v.length;e<t;e++){const t=v[e],n=w===t,i=t.position.z>=-.01?t.color[0]:t.color[1];t.line&&k(h,t.position,t.line,i),S(t.position,t.size,n?"#FFFFFF":i),t.label&&(u.font=[o.fontWeight,o.fontSize,o.fontFamily].join(" "),u.fillStyle=o.fontColor,u.textBaseline="middle",u.textAlign="center",u.fillText(t.label,t.position.x,t.position.y))}}function j(e){const t=e.direction.clone().applyMatrix4(c),n=e.size;e.position.set(t.x*(h.x-n/2-o.padding)+h.x,h.y-t.y*(h.y-n/2-o.padding),t.z)}r.addEventListener("change",this.update),r.addEventListener("start",(()=>this.domElement.classList.add("inactive"))),r.addEventListener("end",(()=>this.domElement.classList.remove("inactive"))),this.domElement=function(){const e=document.createElement("canvas");return e.width=o.size,e.height=o.size,e.classList.add(o.className),e.addEventListener("pointerdown",x,!1),e.addEventListener("pointerenter",b,!1),e.addEventListener("pointermove",g,!1),e.addEventListener("click",F,!1),u=e.getContext("2d"),e}(),this.update()}}export{i as OrbitControlsGizmo};