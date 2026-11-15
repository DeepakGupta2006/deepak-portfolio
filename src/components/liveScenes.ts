// @ts-nocheck
/* Firefly Forest: live animated background for the Realistic theme (canvas 2D, 1280x720 logical). */
export function createLiveEngine(canvas){
const W=1280,H=720,TAU=Math.PI*2;
const cv=canvas,g=cv.getContext('2d');
const R=Math.random,rnd=(a,b)=>a+R()*(b-a);
const hash=(a,b,c,d)=>{const x=Math.sin(a*127.1+b*311.7+c*74.7+d*19.3)*43758.5453;return x-Math.floor(x)};
function glow(x,y,r,col,a){const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,col.replace('A',a));gr.addColorStop(1,col.replace('A',0));g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}
function vgrad(stops,y0=0,y1=H){const gr=g.createLinearGradient(0,y0,0,y1);stops.forEach(s=>gr.addColorStop(s[0],s[1]));return gr}

/* ================= 1. DRAGON SKY ================= */
/* ================= cinematic finish ================= */
const off=document.createElement('canvas');off.width=320;off.height=180;const og=off.getContext('2d');
const nz=document.createElement('canvas');nz.width=nz.height=256;(()=>{const n=nz.getContext('2d'),im=n.createImageData(256,256);for(let i=0;i<im.data.length;i+=4){const v=Math.random()*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}n.putImageData(im,0,0)})();
const npat=g.createPattern(nz,'repeat');
function post(){
 og.drawImage(cv,0,0,320,180);
 g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.30;g.imageSmoothingEnabled=true;g.drawImage(off,0,0,W,H);g.restore();
 const vg=g.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*1.0);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.5)');g.fillStyle=vg;g.fillRect(0,0,W,H);
 g.save();g.globalAlpha=.07;g.globalCompositeOperation='overlay';g.translate(Math.floor(rnd(0,256)),Math.floor(rnd(0,256)));g.fillStyle=npat;g.fillRect(-256,-256,W+512,H+512);g.restore();
}

const S5={name:'Firefly Forest',
init(){this.fl=Array.from({length:75},()=>({x:rnd(0,W),y:rnd(120,H-60),a:rnd(.2,.7),b:rnd(.2,.7),c:rnd(.6,1.8),p:rnd(0,TAU),r:rnd(30,70)}));
 const tr=(n,wMin,wMax)=>Array.from({length:n},(_,i)=>({x:(i+rnd(0,1))*W/n,w:rnd(wMin,wMax),lean:rnd(-.02,.02)}));
 this.t1=tr(15,14,26);this.t2=tr(9,28,46);this.t3=[{x:40,w:110,lean:0},{x:W-70,w:130,lean:0},{x:300,w:70,lean:0}];
 this.fog=Array.from({length:7},()=>({x:rnd(0,W),y:rnd(380,640),w:rnd(400,700),v:rnd(5,14),a:rnd(.07,.14)}));
 this.mush=Array.from({length:7},(_,i)=>({x:120+i*170+rnd(-30,30),s:rnd(.7,1.4),c:i%2?'rgba(120,255,230,A)':'rgba(255,130,220,A)',p:rnd(0,TAU)}))},
draw(t,dt){
 g.fillStyle=vgrad([[0,'#020a0f'],[.5,'#06232a'],[1,'#0a3a3a']]);g.fillRect(0,0,W,H);
 glow(170,110,420,'rgba(160,220,255,A)',.35);
 g.fillStyle='#e8f6ff';g.beginPath();g.arc(170,110,38,0,TAU);g.fill();
 const trunks=(arr,col,al)=>{g.fillStyle=col;g.globalAlpha=al;arr.forEach(tr=>{g.beginPath();g.moveTo(tr.x-tr.w/2,H);g.lineTo(tr.x-tr.w/2*.7+tr.lean*H,0);g.lineTo(tr.x+tr.w/2*.7+tr.lean*H,0);g.lineTo(tr.x+tr.w/2,H);g.fill()});g.globalAlpha=1};
 trunks(this.t1,'#0a2c31',.8);
 // god rays
 g.globalCompositeOperation='lighter';
 for(let i=0;i<6;i++){const a=.05+.05*Math.sin(t*.6+i*1.3);g.fillStyle=`rgba(170,230,255,${a})`;const x=120+i*70+Math.sin(t*.3+i)*20;g.beginPath();g.moveTo(170,70);g.lineTo(x+380,H);g.lineTo(x+520,H);g.closePath();g.fill()}
 g.globalCompositeOperation='source-over';
 trunks(this.t2,'#061a1e',.92);
 this.fog.forEach(f=>{f.x+=f.v*dt;if(f.x>W+f.w)f.x=-f.w;g.save();g.translate(f.x,f.y);g.scale(1,.22);glow(0,0,f.w/2,'rgba(150,220,220,A)',f.a*2);g.restore()});
 // mushrooms
 this.mush.forEach(m=>{const pl=.55+.45*Math.sin(t*1.6+m.p);glow(m.x,H-40,90*m.s,m.c,.4*pl);g.fillStyle='#07201f';g.fillRect(m.x-4*m.s,H-48*m.s,8*m.s,36*m.s);g.fillStyle=m.c.replace('A',.85);g.beginPath();g.ellipse(m.x,H-48*m.s,22*m.s,13*m.s,0,Math.PI,TAU);g.fill()});
 // grass
 for(let layer=0;layer<2;layer++){g.strokeStyle=layer?'#041412':'#07302d';g.lineWidth=layer?3:2;g.beginPath();for(let x=0;x<W;x+=layer?9:6){const h=(layer?60:36)+hash(x,layer,1,1)*40,sw=Math.sin(t*1.2+x*.02+layer)*(layer?10:7);g.moveTo(x,H);g.quadraticCurveTo(x+sw*.3,H-h*.6,x+sw,H-h)}g.stroke()}
 trunks(this.t3,'#02090b',1);
 // fireflies
 g.globalCompositeOperation='lighter';
 this.fl.forEach(f=>{const x=f.x+Math.sin(t*f.a+f.p)*f.r,y=f.y+Math.cos(t*f.b+f.p)*f.r*.6,al=Math.pow((Math.sin(t*f.c+f.p)+1)/2,2);glow(x,y,22,'rgba(210,255,110,A)',.85*al);g.fillStyle=`rgba(255,255,200,${al})`;g.fillRect(x-1,y-1,2.4,2.4)});
 g.globalCompositeOperation='source-over';
 g.fillStyle=vgrad([[0,'rgba(0,0,0,.5)'],[.25,'rgba(0,0,0,0)']]);g.fillRect(0,0,W,H);
}};

/* ================= 6. LIGHTHOUSE STORM ================= */
return {init:()=>S5.init(),draw:(t,dt)=>S5.draw(t,dt),post};
}
