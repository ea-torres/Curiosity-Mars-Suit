// Lógica de ARES-EVA. Los datos se editan en config.js
const $=id=>document.getElementById(id),cv=$("c"),cx=cv.getContext("2d"),st=$("stage");
let W=0,H=0,hd=SCENE.heading,ar=true,sc,hs=-1,armed=null,done=false,cur="nominal";
const R=Array.from({length:SCENE.rocks},(_,i)=>({b:(i*137.5)%360,z:((i*47)%100)/100})).sort((a,b)=>a.z-b.z);
const tr=(d,f,s)=>Math.sin(d*f+s)+.5*Math.sin(d*f*2.3+s*1.7)+.25*Math.sin(d*f*5.1+s*3.1);
const dx=b=>((b-hd)%360+540)%360-180;
sc=S.nominal;

function ridge(c,a,f,par,s,off){const p=W/90;cx.beginPath();cx.moveTo(0,H);for(let x=0;x<=W+4;x+=4){const d=(hd+(x-W/2)/p)*par;cx.lineTo(x,H*.5+off-a*H*(1+tr(d,f,s))/2.75)}cx.lineTo(W,H);cx.closePath();cx.fillStyle=c;cx.fill()}
function draw(){
  const hz=H*.5,p=W/90;
  let g=cx.createLinearGradient(0,0,0,hz);g.addColorStop(0,SCENE.sky[0]);g.addColorStop(.6,SCENE.sky[1]);g.addColorStop(1,SCENE.sky[2]);
  cx.fillStyle=g;cx.fillRect(0,0,W,H);
  const sx=dx(SCENE.sun)*p+W/2,sy=hz*.5,sg=cx.createRadialGradient(sx,sy,0,sx,sy,W*.3);
  sg.addColorStop(0,"rgba(255,248,236,1)");sg.addColorStop(.04,"rgba(255,236,210,.7)");sg.addColorStop(1,"rgba(255,222,185,0)");
  cx.fillStyle=sg;cx.fillRect(0,0,W,hz);
  SCENE.ridges.forEach(r=>ridge(r[0],r[1],r[2],r[3],r[4],r[5]*H));
  g=cx.createLinearGradient(0,hz+H*.06,0,H);g.addColorStop(0,SCENE.ground[0]);g.addColorStop(1,SCENE.ground[1]);
  cx.fillStyle=g;cx.fillRect(0,hz+H*.06,W,H);
  g=cx.createLinearGradient(0,hz-H*.04,0,hz+H*.16);g.addColorStop(0,"rgba(236,191,143,0)");g.addColorStop(.35,"rgba(236,191,143,.4)");g.addColorStop(1,"rgba(236,191,143,0)");
  cx.fillStyle=g;cx.fillRect(0,hz-H*.04,W,H*.2);
  R.forEach(r=>{const o=dx(r.b);if(Math.abs(o)>52)return;
    const x=W/2+o*p,y=hz+H*.08+(H*.5-H*.08)*Math.pow(r.z,1.5),s=3+r.z*r.z*H*.09;
    cx.fillStyle=SCENE.rock[0];cx.beginPath();cx.ellipse(x,y,s*1.3,s*.6,0,0,7);cx.fill();
    cx.fillStyle=SCENE.rock[1];cx.beginPath();cx.ellipse(x-s*.2,y-s*.18,s*.9,s*.35,0,0,7);cx.fill()});
}
function upd(){
  draw();const p=W/90;let h="";
  for(let d=0;d<360;d+=15){const o=dx(d);if(Math.abs(o)<46){const c=d%90===0?"NESO"[d/90]:d%45===0?["NE","SE","SO","NO"][(d-45)/90]:"|";h+=`<span style="left:${W/2+o*p}px">${c}</span>`}}
  $("tape").innerHTML=h;$("hdg").textContent=String(Math.round((hd%360+360)%360)).padStart(3,"0")+"°";
  M.forEach(m=>{const o=dx(m.b);if(!m.e){m.e=document.createElement("div");m.e.className="mk "+m.k;m.e.innerHTML=`<span class="lb">${m.n} · ${m.d} m</span><i></i>`;$("ar").appendChild(m.e)}
    if(Math.abs(o)>46){m.e.style.display="none";return}
    m.e.style.display="";m.e.style.left=(W/2+o*p)+"px";
    m.e.style.top=(H*.5+H*.5*(.1+.4*(1-Math.min(m.d,420)/420)))+"px"});
}
function size(){const r=st.getBoundingClientRect(),q=Math.min(devicePixelRatio||1,1.5);W=r.width;H=r.height;cv.width=W*q;cv.height=H*q;cx.setTransform(q,0,0,q,0,0);upd()}
let drag=false;
st.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;drag=true;st.setPointerCapture(e.pointerId)});
st.addEventListener("pointerup",()=>drag=false);
st.addEventListener("pointermove",e=>{if(!drag)return;hd=(hd-e.movementX/(W/90)*.9+360)%360;upd()});
st.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){hd=(hd-5+360)%360;upd()}if(e.key==="ArrowRight"){hd=(hd+5)%360;upd()}});
addEventListener("resize",size);

function render(){
  const al=$("al");al.className="pl ai "+(hs>=0?"crit":sc.l);
  $("vit").innerHTML=Object.keys(L).map(k=>`<div class="v ${sc.f[k]||""}"><small>${L[k][0]} · ${L[k][2]}</small><b>${sc.v[k]}</b> <small style="display:inline">${L[k][1]}</small></div>`).join("");
  $("glove").classList.toggle("on",cur==="herida"&&!done);
  $("hg").innerHTML=hs>=0?HG[hs]:"";
  armed=null;
  if(hs>=0){const q=HS[hs];al.innerHTML=`<h3>Paso ${hs+1} de 4 · ${q[0]}</h3><p>${q[1]}</p><div class="acts"><button id="nx">${hs===3?"Finalizar guía":"Siguiente paso"}</button></div>`;$("nx").onclick=nx;return}
  al.innerHTML=`<h3>${sc.t}</h3><p>${sc.m}</p><div class="acts"></div><small id="hint">${sc.a.length?"Powered by HoloConnect AI.":""}</small>`;
  const box=al.querySelector(".acts");
  sc.a.forEach(a=>{const b=document.createElement("button");b.textContent=a[0];if(a[1]==="inj")b.className="inj";b.onclick=()=>act(a,b);box.appendChild(b)});
  if(sc.a.length){const d=document.createElement("button");d.textContent="Call base's medic";d.onclick=()=>$("doc").classList.toggle("on");box.appendChild(d);
    const r=document.createElement("button");r.textContent="Reject";r.onclick=()=>$("hint").textContent="Proposal rejected. Monitoring ongoing";box.appendChild(r)}
}
function act(a,b){
  if(a[1]==="holo"){hs=0;render();return}
  if(a[1]==="inj"&&armed!==a[0]){armed=a[0];b.textContent="Confirm inyection now";$("hint").textContent="Confirmation 2 of 2: the protocol was validated by the base's doctor before the mission.";return}
  sc={...S.nominal,t:"Completed action",m:(a[1]==="inj"?"Inyection applied: ":a[1]==="top"?"Patch applied: ":"Do: ")+a[0].replace(/ \(.*\)/,"")+". Values back to safe range; reforced monitoring for the next 10 min."};
  render();
}
function nx(){
  if(hs<3){hs++;render();return}
  hs=-1;done=true;sc={...S.nominal,l:"warn",t:"Wound sealed",m:"Local pressure stable. Go back to base camp for medical check-up."};render();
}
document.querySelectorAll(".sc button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".sc button").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");
  cur=b.dataset.s;sc=S[cur];hs=-1;done=false;$("doc").classList.remove("on");render();
});
$("artog").onclick=e=>{ar=!ar;st.classList.toggle("noar",!ar);e.target.setAttribute("aria-pressed",ar);e.target.textContent="Augmented reality: "+(ar?"activada":"desactivada")};
const hm=m=>Math.floor(m/60)+":"+String(m%60).padStart(2,"0");
function res(){const t=+$("t").value,o=Math.round(100-t/480*88),p=Math.round(100-t/480*92);
  $("tt").textContent="T+"+hm(t);$("tr").textContent=hm(480-t);$("o2v").textContent=o+"%";$("pwv").textContent=p+"%";$("o2b").style.width=o+"%";$("pwb").style.width=p+"%";
  $("lat").textContent=480-t<=60?"Return to base camp: less than 1 h of battery":"3-22 min"}
$("t").oninput=res;
render();res();size();
