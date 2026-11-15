// @ts-nocheck
/* Live animated scenes for the Realistic theme (canvas 2D, 1280x720 logical). */
export function createLiveEngine(canvas){
const W=1280,H=720,TAU=Math.PI*2;
const cv=canvas,g=cv.getContext('2d');
const R=Math.random,rnd=(a,b)=>a+R()*(b-a);
const hash=(a,b,c,d)=>{const x=Math.sin(a*127.1+b*311.7+c*74.7+d*19.3)*43758.5453;return x-Math.floor(x)};
function glow(x,y,r,col,a){const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,col.replace('A',a));gr.addColorStop(1,col.replace('A',0));g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}
function vgrad(stops,y0=0,y1=H){const gr=g.createLinearGradient(0,y0,0,y1);stops.forEach(s=>gr.addColorStop(s[0],s[1]));return gr}

/* ================= 1. DRAGON SKY ================= */
function wing(px,py,ang,sc,col,rim,alpha){
  g.save();g.translate(px,py);g.rotate(ang);g.scale(sc,sc);g.globalAlpha=alpha;
  g.beginPath();g.moveTo(0,0);
  g.quadraticCurveTo(-25,-70,-60,-120);
  g.quadraticCurveTo(-100,-170,-190,-175);
  g.quadraticCurveTo(-150,-120,-170,-80);
  g.quadraticCurveTo(-120,-80,-125,-35);
  g.quadraticCurveTo(-85,-45,-70,-5);
  g.quadraticCurveTo(-35,-25,0,0);g.closePath();
  g.fillStyle=col;g.fill();g.strokeStyle=rim;g.lineWidth=1.6;g.stroke();
  g.strokeStyle='rgba(170,130,240,.35)';g.lineWidth=1.2;
  [[-190,-175],[-170,-80],[-125,-35],[-70,-5]].forEach(p=>{g.beginPath();g.moveTo(-60,-120);g.lineTo(p[0],p[1]);g.stroke()});
  g.restore();g.globalAlpha=1;
}
function drawDragon(t,breathing){
  const flap=Math.sin(t*3.4),col='#080511',rim='rgba(190,150,255,.6)';
  wing(10,-16,flap*.6-.1+.25,.9,'#05030c',rim,.85);
  // tail
  let prev=[-40,8];g.lineCap='round';g.strokeStyle=col;
  for(let i=1;i<=26;i++){const px=-40-i*11,py=8+Math.sin(t*3.2-i*.5)*(4+i*1.1)+i*.9;g.lineWidth=Math.max(2,19*(1-i/27));g.beginPath();g.moveTo(prev[0],prev[1]);g.lineTo(px,py);g.stroke();prev=[px,py]}
  g.fillStyle=col;g.beginPath();g.moveTo(prev[0]+4,prev[1]);g.lineTo(prev[0]-26,prev[1]-12);g.lineTo(prev[0]-18,prev[1]);g.lineTo(prev[0]-26,prev[1]+12);g.closePath();g.fill();
  // back spikes
  for(let i=0;i<9;i++){const x=-48+i*11;g.beginPath();g.moveTo(x,-20);g.lineTo(x+4,-33-Math.sin(i)*3);g.lineTo(x+9,-20);g.fill()}
  // body
  g.beginPath();g.ellipse(0,0,58,23,-.08,0,TAU);g.fill();g.strokeStyle='rgba(180,140,255,.35)';g.lineWidth=1.2;g.stroke();
  // legs
  g.strokeStyle=col;g.lineWidth=7;g.beginPath();g.moveTo(24,16);g.lineTo(40,38);g.lineTo(54,32);g.stroke();g.beginPath();g.moveTo(-20,18);g.lineTo(-10,40);g.lineTo(4,36);g.stroke();
  // neck + head
  g.lineWidth=17;g.beginPath();g.moveTo(40,-4);g.quadraticCurveTo(85,0,102,-34);g.stroke();
  g.fillStyle=col;g.beginPath();g.moveTo(96,-48);g.lineTo(142,-35);g.lineTo(132,-25);g.lineTo(104,-21);g.closePath();g.fill();
  g.beginPath();g.moveTo(98,-46);g.lineTo(72,-68);g.lineTo(92,-40);g.fill();g.beginPath();g.moveTo(104,-48);g.lineTo(84,-76);g.lineTo(110,-44);g.fill();
  g.fillStyle='#ff7a1a';g.beginPath();g.arc(118,-38,2.6,0,TAU);g.fill();glow(118,-38,16,'rgba(255,120,30,A)',.8);
  if(breathing)glow(140,-30,46,'rgba(255,170,60,A)',.9);
  // near wing
  wing(14,-18,flap*.6-.1,1,col,rim,1);
}
const S1={name:'Dragon Sky',
init(){this.stars=Array.from({length:170},()=>({x:rnd(0,W),y:rnd(0,H*.62),r:rnd(.3,1.3),p:rnd(0,TAU)}));
 this.clouds=Array.from({length:9},()=>({x:rnd(0,W),y:rnd(60,420),w:rnd(260,520),a:rnd(.1,.25),v:rnd(6,18)}));
 this.fire=[];this.emb=[]},
draw(t,dt){
 g.fillStyle=vgrad([[0,'#060a20'],[.5,'#241848'],[.82,'#5d2a5c'],[1,'#7f3350']]);g.fillRect(0,0,W,H);
 this.stars.forEach(s=>{g.globalAlpha=.35+.65*Math.abs(Math.sin(t*1.5+s.p));g.fillStyle='#fff';g.beginPath();g.arc(s.x,s.y,s.r,0,TAU);g.fill()});g.globalAlpha=1;
 glow(1030,150,300,'rgba(190,200,255,A)',.35);
 let mg=g.createRadialGradient(1015,135,5,1030,150,64);mg.addColorStop(0,'#fff');mg.addColorStop(1,'#cfd6f5');g.fillStyle=mg;g.beginPath();g.arc(1030,150,62,0,TAU);g.fill();
 g.fillStyle='rgba(120,130,170,.25)';[[1010,135,12],[1050,170,9],[1035,120,6]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,TAU);g.fill()});
 this.clouds.forEach(c=>{c.x-=c.v*dt;if(c.x<-c.w)c.x=W+c.w;g.save();g.translate(c.x,c.y);g.scale(1,.28);glow(0,0,c.w/2,'rgba(150,140,200,A)',c.a*2);g.restore()});
 // mountains
 g.fillStyle='#1a1236';g.beginPath();g.moveTo(0,H);g.lineTo(0,520);g.lineTo(140,470);g.lineTo(260,540);g.lineTo(420,450);g.lineTo(560,540);g.lineTo(720,490);g.lineTo(900,560);g.lineTo(1080,500);g.lineTo(1280,560);g.lineTo(1280,H);g.fill();
 // dragon
 const dx=((t*190+160)%(W+600))-300,dy=235+Math.sin(t*1.1)*38+Math.sin(t*3.4)*7;
 const per=t%4.5,breathing=per>1.8&&per<3.4;
 g.save();g.translate(dx,dy);g.scale(.95,.95);g.rotate(Math.sin(t*1.1)*.05-.04);drawDragon(t,breathing);g.restore();
 if(breathing)for(let i=0;i<5;i++)this.fire.push({x:dx+138*.95,y:dy-30*.95,vx:rnd(280,380),vy:rnd(-25,25),l:0,L:rnd(.6,1.1),s:rnd(9,15)});
 g.globalCompositeOperation='lighter';
 this.fire=this.fire.filter(p=>p.l<p.L);this.fire.forEach(p=>{p.l+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt-20*dt;const k=p.l/p.L;glow(p.x,p.y,p.s*(1+k*3),`rgba(255,${Math.floor(215-170*k)},${Math.floor(70-60*k)},A)`,.6*(1-k))});
 g.globalCompositeOperation='source-over';
 // front mountain + castle
 g.fillStyle='#0a0716';g.beginPath();g.moveTo(0,H);g.lineTo(0,620);g.lineTo(120,560);g.lineTo(160,520);g.lineTo(360,520);g.lineTo(420,580);g.lineTo(640,620);g.lineTo(900,600);g.lineTo(1100,640);g.lineTo(1280,610);g.lineTo(1280,H);g.fill();
 [[170,34,130],[215,50,170],[275,30,110],[315,36,90]].forEach(([x,w,h])=>{g.fillRect(x,520-h,w,h);g.beginPath();g.moveTo(x-5,520-h);g.lineTo(x+w/2,520-h-w*.9);g.lineTo(x+w+5,520-h);g.fill()});g.fillRect(170,480,185,45);
 for(let i=0;i<9;i++){const on=hash(i,1,2,Math.floor(t*2))>.25;if(on){g.fillStyle='#ffc766';g.fillRect(180+i*18,400+((i*37)%110),5,8)}}
 // embers
 if(R()<.7)this.emb.push({x:rnd(120,380),y:rnd(500,530),vx:rnd(-14,14),vy:rnd(-70,-30),l:0,L:rnd(2,4)});
 g.globalCompositeOperation='lighter';
 this.emb=this.emb.filter(p=>p.l<p.L);this.emb.forEach(p=>{p.l+=dt;p.x+=(p.vx+Math.sin(p.l*3)*10)*dt;p.y+=p.vy*dt;glow(p.x,p.y,7,'rgba(255,150,50,A)',.9*(1-p.l/p.L))});
 g.globalCompositeOperation='source-over';
}};

/* ================= 2. SERVER ROOM ================= */
const S2={name:'Server Room',
init(){this.pk=Array.from({length:44},(_,i)=>({o:rnd(-1,1),sp:rnd(.12,.3),u:R(),c:['#22d3ee','#a78bfa','#34d399','#f472b6'][i%4]}))},
draw(t,dt){
 const cx=W/2,cy=330;
 g.fillStyle='#030810';g.fillRect(0,0,W,H);
 // floor
 g.fillStyle=vgrad([[0,'#071428'],[1,'#0a2748']],cy,H);g.beginPath();g.moveTo(cx,cy+22);g.lineTo(0,H);g.lineTo(W,H);g.closePath();g.fill();
 g.strokeStyle='rgba(56,189,248,.16)';g.lineWidth=1.2;for(let i=-10;i<=10;i++){g.beginPath();g.moveTo(cx,cy+22);g.lineTo(cx+i*190,H);g.stroke()}
 // ceiling
 g.fillStyle=vgrad([[0,'#04070d'],[1,'#0a1626']],0,cy);g.beginPath();g.moveTo(cx,cy-30);g.lineTo(0,0);g.lineTo(W,0);g.closePath();g.fill();
 glow(cx,cy,340,'rgba(56,189,248,A)',.4);
 // ceiling light bars + racks
 for(let k=0;k<10;k++){
  const s=.1+.9*Math.pow(k/9,1.6),inner=20+330*s,w=270*s,top=cy-335*s,bot=cy+300*s;
  g.fillStyle='rgba(200,235,255,.9)';g.fillRect(cx-inner,top-5*s-2,inner*2,3*s+1);glow(cx,top-4*s,inner*.9,'rgba(120,200,255,A)',.18);
  for(const side of [-1,1]){
   const x0=side<0?cx-inner-w:cx+inner;
   let gr=g.createLinearGradient(x0,0,x0+w,0);gr.addColorStop(0,side<0?'#0a1220':'#142238');gr.addColorStop(1,side<0?'#142238':'#0a1220');
   g.fillStyle=gr;g.fillRect(x0,top,w,bot-top);g.strokeStyle='rgba(90,150,210,.3)';g.lineWidth=Math.max(1,s*2);g.strokeRect(x0,top,w,bot-top);
   const units=14,uh=(bot-top)/units;
   for(let u=0;u<units;u++){
    const y=top+u*uh;g.fillStyle='#0a1527';g.fillRect(x0+4*s,y+2*s,w-8*s,uh-4*s);
    g.fillStyle='rgba(120,170,220,.16)';for(let l=0;l<5;l++)g.fillRect(x0+10*s,y+uh*.25+l*uh*.12,w*.38,Math.max(1,s*1.2));
    for(let li=0;li<4;li++){
     const on=hash(k*2+(side>0?1:0),u,li,Math.floor(t*(1.2+li*.9)))>.45;
     const col=['#22c55e','#38bdf8','#f59e0b','#22c55e'][(li+u)%4];
     if(on){g.globalAlpha=.28;g.fillStyle=col;const sz=uh*.46;g.fillRect(x0+w*.58+li*w*.095-sz*.3,y+uh*.5-sz*.8,sz*1.6,sz*1.6);g.globalAlpha=1;g.fillRect(x0+w*.58+li*w*.095,y+uh*.5-uh*.1,Math.max(2,uh*.2),Math.max(2,uh*.2))}
    }
   }
  }
 }
 // data packets on floor
 g.globalCompositeOperation='lighter';
 this.pk.forEach(p=>{p.u+=p.sp*dt;if(p.u>1)p.u-=1;const u=p.u,x=cx+p.o*u*620,y=cy+24+u*u*(H-cy-24),sz=2+u*7;
  g.fillStyle=p.c;g.globalAlpha=.9*Math.min(1,u*3);g.fillRect(x-sz/2,y-sz*.4,sz*(1+u*2),sz*.5);glow(x,y,sz*3,'rgba(120,220,255,A)',.25*u)});
 g.globalAlpha=1;
 // scan beam
 const bx=((t*220)%(W+300))-150;let bg=g.createLinearGradient(bx-90,0,bx+90,0);bg.addColorStop(0,'rgba(34,211,238,0)');bg.addColorStop(.5,'rgba(34,211,238,.14)');bg.addColorStop(1,'rgba(34,211,238,0)');g.fillStyle=bg;g.fillRect(bx-90,0,180,H);
 g.globalCompositeOperation='source-over';
 g.fillStyle=vgrad([[0,'rgba(0,0,0,.45)'],[.3,'rgba(0,0,0,0)'],[.8,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.5)']]);g.fillRect(0,0,W,H);
}};

/* ================= 3. DEEP SPACE ================= */
const S3={name:'Deep Space',
init(){this.layers=[{v:5,r:.9,n:150},{v:12,r:1.2,n:90},{v:28,r:1.8,n:45}].map(l=>({...l,s:Array.from({length:l.n},()=>({x:rnd(0,W),y:rnd(0,H),p:rnd(0,TAU)}))}));this.ss=[]},
draw(t,dt){
 g.fillStyle=vgrad([[0,'#02030a'],[1,'#070a1c']]);g.fillRect(0,0,W,H);
 g.globalCompositeOperation='lighter';
 const neb=['rgba(120,60,220,A)','rgba(40,120,255,A)','rgba(220,60,160,A)','rgba(30,200,190,A)','rgba(100,60,200,A)'];
 for(let i=0;i<5;i++)glow(W*(.12+.2*i)+Math.sin(t*.07+i)*70,H*(.3+.14*(i%3))+Math.cos(t*.05+i*2)*40,520,neb[i],.42);
 g.globalCompositeOperation='source-over';
 this.layers.forEach(l=>l.s.forEach(s=>{s.x-=l.v*dt;if(s.x<0)s.x+=W;g.globalAlpha=.35+.65*Math.abs(Math.sin(t*1.2+s.p));g.fillStyle='#fff';g.fillRect(s.x,s.y,l.r,l.r)}));g.globalAlpha=1;
 const cx=950,cy=480,Rr=200;
 // back ring
 g.save();g.translate(cx,cy);g.rotate(-.35);g.scale(1,.28);
 [[330,26,.5],[372,10,.35],[290,8,.3]].forEach(([r,w,a])=>{g.strokeStyle=`rgba(232,212,170,${a})`;g.lineWidth=w;g.beginPath();g.arc(0,0,r,Math.PI,TAU);g.stroke()});g.restore();
 glow(cx,cy,Rr*1.4,'rgba(120,160,255,A)',.3);
 // planet
 g.save();g.beginPath();g.arc(cx,cy,Rr,0,TAU);g.clip();
 let pg=g.createLinearGradient(cx-Rr,cy-Rr,cx+Rr,cy+Rr);pg.addColorStop(0,'#7da2ff');pg.addColorStop(.5,'#3f5fc4');pg.addColorStop(1,'#1a2260');g.fillStyle=pg;g.fillRect(cx-Rr,cy-Rr,Rr*2,Rr*2);
 for(let j=0;j<14;j++){g.fillStyle=j%2?'rgba(255,255,255,.07)':'rgba(10,20,80,.18)';g.fillRect(cx-Rr,cy-Rr+j*29,Rr*2,16+Math.sin(j)*6)}
 for(let j=0;j<10;j++){const sp=10+j*3,x=((t*sp+j*140)%(Rr*2+240))-Rr-120;g.fillStyle='rgba(255,255,255,.10)';g.beginPath();g.ellipse(cx+x,cy-Rr+30+j*38,60,7,0,0,TAU);g.fill()}
 let sh=g.createRadialGradient(cx-80,cy-90,20,cx-30,cy-30,Rr*1.25);sh.addColorStop(0,'rgba(0,0,12,0)');sh.addColorStop(.55,'rgba(0,0,12,.25)');sh.addColorStop(1,'rgba(0,0,12,.9)');g.fillStyle=sh;g.fillRect(cx-Rr,cy-Rr,Rr*2,Rr*2);g.restore();
 // front ring
 g.save();g.translate(cx,cy);g.rotate(-.35);g.scale(1,.28);
 [[330,26,.6],[372,10,.4],[290,8,.35]].forEach(([r,w,a])=>{g.strokeStyle=`rgba(232,212,170,${a})`;g.lineWidth=w;g.beginPath();g.arc(0,0,r,0,Math.PI);g.stroke()});g.restore();
 // satellite
 const a=t*.35,sx=cx+Math.cos(a)*400*Math.cos(-.35)-Math.sin(a)*95*Math.sin(-.35),sy=cy+Math.cos(a)*400*Math.sin(-.35)+Math.sin(a)*95*Math.cos(-.35);
 g.fillStyle='#cbd5e1';g.fillRect(sx-5,sy-3,10,6);g.fillStyle='#38bdf8';g.fillRect(sx-14,sy-2,8,4);g.fillRect(sx+6,sy-2,8,4);
 if(Math.sin(t*4)>0)glow(sx,sy-6,16,'rgba(255,80,80,A)',.9);
 // shooting stars
 if(R()<dt*.6)this.ss.push({x:rnd(W*.25,W),y:rnd(0,H*.35),l:0,L:.9});
 this.ss=this.ss.filter(s=>s.l<s.L);g.globalCompositeOperation='lighter';
 this.ss.forEach(s=>{s.l+=dt;s.x-=720*dt;s.y+=400*dt;const gr=g.createLinearGradient(s.x,s.y,s.x+160,s.y-90);gr.addColorStop(0,`rgba(255,255,255,${1-s.l/s.L})`);gr.addColorStop(1,'rgba(255,255,255,0)');g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(s.x,s.y);g.lineTo(s.x+160,s.y-90);g.stroke()});
 g.globalCompositeOperation='source-over';
}};

/* ================= 4. CYBER CITY RAIN ================= */
function skyline(n,hMin,hMax,wMin,wMax,seed){let x=-10,a=[];let i=0;while(x<W){const w=rnd(wMin,wMax);a.push({x,w,h:rnd(hMin,hMax),i:i++});x+=w+rnd(0,4)}return a}
const S4={name:'Cyber City Rain',
init(){this.far=skyline(0,200,420,50,110);this.mid=skyline(0,280,520,70,140);
 this.signs=this.mid.filter((_,i)=>i%2==0).map((b,i)=>({x:b.x+b.w*.2,y:H-90-b.h+rnd(30,120),w:b.w*.6,h:rnd(18,34),c:['#22d3ee','#f472b6','#facc15','#a78bfa'][i%4],id:i}));
 this.cars=Array.from({length:10},(_,i)=>({y:120+(i%5)*55,v:(i%2?-1:1)*rnd(130,360),x:rnd(0,W)}));
 this.rain=Array.from({length:320},()=>({x:rnd(0,W+200),y:rnd(0,H),v:rnd(700,1100),l:rnd(12,26)}))},
draw(t,dt){
 g.fillStyle=vgrad([[0,'#0d0530'],[.4,'#3b0f7a'],[.75,'#d32f8a'],[1,'#5a1580']]);g.fillRect(0,0,W,H);
 glow(W*.5,H*.7,700,'rgba(255,120,190,A)',.45);
 this.far.forEach(b=>{g.fillStyle='#34177a';g.fillRect(b.x,H-60-b.h,b.w,b.h+60);
  for(let r=0;r<b.h/12;r++)for(let c=0;c<b.w/10;c++)if(hash(b.i,r,c,Math.floor(t*.3))>.55){g.fillStyle=hash(c,r,b.i,1)>.5?'rgba(255,150,210,.9)':'rgba(140,230,255,.9)';g.fillRect(b.x+4+c*10,H-56-b.h+r*12,4,5)}});
 // billboard
 const bx=820,by=170;g.fillStyle='#0b0620';g.fillRect(bx,by,230,130);g.strokeStyle='#22d3ee';g.lineWidth=2;g.strokeRect(bx,by,230,130);glow(bx+115,by+65,170,'rgba(34,211,238,A)',.18);
 for(let j=0;j<12;j++){const h=30+40*Math.abs(Math.sin(t*2.6+j*.7));g.fillStyle=['#22d3ee','#f472b6','#a78bfa'][j%3];g.fillRect(bx+12+j*18,by+118-h,12,h)}
 this.mid.forEach(b=>{g.fillStyle='#14082e';g.fillRect(b.x,H-90-b.h,b.w,b.h+90);g.strokeStyle='rgba(160,110,255,.45)';g.strokeRect(b.x,H-90-b.h,b.w,b.h+90);for(let r=0;r<b.h/16;r++)for(let c=0;c<b.w/13;c++)if(hash(b.i,r,c,7+Math.floor(t*.2))>.5){g.fillStyle=hash(r,c,b.i,2)>.7?'#ffd166':'rgba(150,230,255,.85)';g.fillRect(b.x+6+c*13,H-86-b.h+r*16,5,7)}});
 g.globalCompositeOperation='lighter';
 this.signs.forEach(s=>{const on=hash(s.id,3,3,Math.floor(t*6))>.12?1:.25;g.globalAlpha=on;g.strokeStyle=s.c;g.lineWidth=3;g.strokeRect(s.x,s.y,s.w,s.h);glow(s.x+s.w/2,s.y+s.h/2,s.w*.9,s.c==='#22d3ee'?'rgba(34,211,238,A)':s.c==='#f472b6'?'rgba(244,114,182,A)':s.c==='#facc15'?'rgba(250,204,21,A)':'rgba(167,139,250,A)',.35);
   // reflection on ground
   let rg=g.createLinearGradient(0,H-70,0,H);rg.addColorStop(0,'rgba(255,255,255,.16)');rg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=rg;g.fillRect(s.x+s.w*.2,H-70,s.w*.6,70);g.globalAlpha=1});
 // cars
 this.cars.forEach(c=>{c.x+=c.v*dt;if(c.x>W+200)c.x=-200;if(c.x<-200)c.x=W+200;const d=Math.sign(c.v);
  let tr=g.createLinearGradient(c.x,0,c.x-d*150,0);tr.addColorStop(0,'rgba(255,60,90,.9)');tr.addColorStop(1,'rgba(255,60,90,0)');g.fillStyle=tr;g.fillRect(Math.min(c.x,c.x-d*150),c.y,150,3);
  g.fillStyle='#fff';g.fillRect(c.x-8*(d<0?-1:1)-(d>0?0:0),c.y-2,16,7);glow(c.x+d*10,c.y+1,26,'rgba(255,240,200,A)',.6)});
 g.globalCompositeOperation='source-over';
 // street
 g.fillStyle=vgrad([[0,'#0a0418'],[1,'#1b0838']],H-90,H);g.fillRect(0,H-90,W,90);
 g.fillStyle='rgba(255,255,255,.06)';for(let i=0;i<10;i++)g.fillRect(0,H-85+i*9,W,1);
 // rain
 g.strokeStyle='rgba(170,210,255,.28)';g.lineWidth=1;g.beginPath();
 this.rain.forEach(r=>{r.y+=r.v*dt;r.x-=r.v*.2*dt;if(r.y>H){r.y=-20;r.x=rnd(0,W+200)}g.moveTo(r.x,r.y);g.lineTo(r.x+r.l*.2,r.y-r.l)});g.stroke();
}};

/* ================= 5. FIREFLY FOREST ================= */
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
const S6={name:'Lighthouse Storm',
init(){this.rain=Array.from({length:420},()=>({x:rnd(0,W+300),y:rnd(0,H),v:rnd(900,1400),l:rnd(14,30)}));this.flash=0;this.nextL=1.3;this.bolt=null;
 this.clouds=Array.from({length:11},()=>({x:rnd(0,W),y:rnd(10,280),w:rnd(420,820),a:rnd(.25,.45),v:rnd(10,30)}))},
draw(t,dt){
 const hy=450;
 g.fillStyle=vgrad([[0,'#04070d'],[.5,'#17222f'],[1,'#3a4d66']],0,hy);g.fillRect(0,0,W,hy);
 this.clouds.forEach(c=>{c.x-=c.v*dt;if(c.x<-c.w)c.x=W+c.w;g.save();g.translate(c.x,c.y);g.scale(1,.3);glow(0,0,c.w/2,'rgba(14,20,30,A)',c.a*2.2);g.restore()});
 this.nextL-=dt;if(this.nextL<=0){this.flash=1;this.nextL=rnd(3,5.5);let x=rnd(250,900),y=0,pts=[[x,y]],br=[];while(y<hy-10){x+=rnd(-38,38);y+=rnd(26,52);pts.push([x,y]);if(R()<.18){let bx=x,by=y,b=[[bx,by]];for(let k=0;k<4;k++){bx+=rnd(-40,50);by+=rnd(20,40);b.push([bx,by])}br.push(b)}}this.bolt={pts,br}}
 this.flash=Math.max(0,this.flash-dt*2.6);const fe=this.flash*(.65+.35*Math.sin(t*70));
 if(fe>0.02&&this.bolt){g.fillStyle=`rgba(190,210,255,${fe*.32})`;g.fillRect(0,0,W,hy);g.globalCompositeOperation='lighter';[[10,.08],[4,.3],[1.6,.95]].forEach(([w,a])=>{g.strokeStyle=`rgba(200,220,255,${a*Math.min(1,fe*1.6)})`;g.lineWidth=w;[this.bolt.pts,...this.bolt.br].forEach(p=>{g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke()})});g.globalCompositeOperation='source-over'}
 glow(W*.5,hy,650,'rgba(120,150,190,A)',.18);
 // sea layers
 for(let L=0;L<7;L++){const base=hy+Math.pow(L/6,1.5)*270,A=2+L*3.6,k=.012*(1-L*.07),sp=.8+L*.25;
  g.beginPath();g.moveTo(0,H);const ys=[];for(let x=0;x<=W;x+=8){const y=base+A*Math.sin(k*x+t*sp+L)+A*.5*Math.sin(2.3*k*x-t*sp*1.3+L*2);ys.push([x,y]);g.lineTo(x,y)}g.lineTo(W,H);g.closePath();
  g.fillStyle=`rgb(${10+L*3+Math.floor(fe*40)},${24+L*6+Math.floor(fe*45)},${36+L*7+Math.floor(fe*55)})`;g.fill();
  g.strokeStyle=`rgba(210,230,245,${.12+L*.05})`;g.lineWidth=1+L*.35;g.beginPath();ys.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke()}
 // lighthouse
 const lx=1040;g.fillStyle='#070a0e';g.beginPath();g.moveTo(940,H);g.lineTo(960,590);g.lineTo(1010,560);g.lineTo(1070,566);g.lineTo(1120,600);g.lineTo(1150,H);g.fill();
 g.save();g.beginPath();g.moveTo(lx-34,566);g.lineTo(lx+34,566);g.lineTo(lx+20,310);g.lineTo(lx-20,310);g.closePath();g.clip();
 for(let b=0;b<6;b++){g.fillStyle=b%2?'#d9dde3':'#a8272d';g.fillRect(lx-40,310+b*43,80,44)}
 let sh=g.createLinearGradient(lx-34,0,lx+34,0);sh.addColorStop(0,'rgba(0,0,0,.05)');sh.addColorStop(1,'rgba(0,0,0,.55)');g.fillStyle=sh;g.fillRect(lx-40,300,80,270);g.restore();
 g.fillStyle='#14181d';g.fillRect(lx-30,300,60,9);g.fillStyle='#ffe9a8';g.fillRect(lx-15,274,30,26);g.fillStyle='#14181d';g.beginPath();g.moveTo(lx-20,274);g.lineTo(lx,252);g.lineTo(lx+20,274);g.fill();
 const ph=t*1.1,cs=Math.cos(ph),dir=cs<0?-1:1,ba=Math.pow(Math.abs(cs),1.6);
 g.globalCompositeOperation='lighter';
 glow(lx,287,150,'rgba(255,235,170,A)',.35+.5*Math.abs(cs));
 let bg=g.createLinearGradient(lx,0,lx+dir*1300,0);bg.addColorStop(0,`rgba(255,240,190,${.55*ba})`);bg.addColorStop(1,'rgba(255,240,190,0)');g.fillStyle=bg;g.beginPath();g.moveTo(lx,287);g.lineTo(lx+dir*1300,287-60-120*ba);g.lineTo(lx+dir*1300,287+60+160*ba);g.closePath();g.fill();
 g.globalCompositeOperation='source-over';
 // spray at rock
 for(let i=0;i<6;i++){const a=.2+.2*Math.sin(t*2+i);g.fillStyle=`rgba(230,240,250,${a})`;g.beginPath();g.ellipse(980+i*30,592+Math.sin(t*2.4+i)*3,26,5,0,0,TAU);g.fill()}
 // rain
 g.strokeStyle='rgba(190,210,230,.3)';g.lineWidth=1;g.beginPath();this.rain.forEach(r=>{r.y+=r.v*dt;r.x-=r.v*.22*dt;if(r.y>H){r.y=-30;r.x=rnd(0,W+300)}g.moveTo(r.x,r.y);g.lineTo(r.x+r.l*.22,r.y-r.l)});g.stroke();
 g.fillStyle=`rgba(180,200,255,${fe*.12})`;g.fillRect(0,0,W,H);
}};

/* ================= 7. AURORA LAKE ================= */
function pine(x,by,h,col){g.fillStyle=col;for(let k=0;k<5;k++){const y0=by-h*(k/5),w=h*.34*(1-k/6.5);g.beginPath();g.moveTo(x,y0-h*.3);g.lineTo(x-w,y0);g.lineTo(x+w,y0);g.fill()}g.fillRect(x-2,by,4,8)}
const S7={name:'Aurora Lake',
init(){this.stars=Array.from({length:280},()=>({x:rnd(0,W),y:rnd(0,420),r:rnd(.3,1.2),p:rnd(0,TAU)}));this.ss=[];this.fire=[];this.trees=Array.from({length:24},()=>({x:rnd(-20,W+20),h:rnd(70,170),side:0}))},
draw(t,dt){
 const hy=470;
 g.fillStyle=vgrad([[0,'#02040c'],[.7,'#07162b'],[1,'#0e3140']],0,hy);g.fillRect(0,0,W,hy);
 this.stars.forEach(s=>{g.globalAlpha=.3+.7*Math.abs(Math.sin(t*1.4+s.p));g.fillStyle='#fff';g.fillRect(s.x,s.y,s.r*1.4,s.r*1.4)});g.globalAlpha=1;
 g.globalCompositeOperation='lighter';
 for(let L=0;L<3;L++){const base=310+L*26;for(let x=0;x<W;x+=4){const h=140+85*Math.sin(x*.008+t*.35+L*1.7)+45*Math.sin(x*.021-t*.55+L)+25*Math.sin(x*.05+t*1.1),a=(.2-L*.045)*(.6+.4*Math.sin(x*.013+t*.9+L));
  const gr=g.createLinearGradient(0,base,0,base-h);gr.addColorStop(0,`rgba(40,255,160,${a})`);gr.addColorStop(.55,`rgba(40,200,235,${a*.8})`);gr.addColorStop(1,'rgba(160,80,255,0)');g.fillStyle=gr;g.fillRect(x,base-h,5,h)}}
 g.globalCompositeOperation='source-over';
 g.fillStyle='#050d18';g.beginPath();g.moveTo(0,hy);for(let x=0;x<=W;x+=16)g.lineTo(x,hy-50-70*Math.abs(Math.sin(x*.0045+1))-26*Math.sin(x*.021)-hash(x,3,1,1)*16);g.lineTo(W,hy);g.fill();
 g.fillStyle=vgrad([[0,'#0b2a38'],[1,'#02080f']],hy,H);g.fillRect(0,hy,W,H-hy);
 for(let j=0;j<hy;j+=14){const off=Math.sin(j*.16+t*1.6)*(2+j*.014);g.globalAlpha=.62*(1-j/(hy+120));g.drawImage(cv,0,hy-j-14,W,14,off,hy+j*.55,W,14*.55+.8)}g.globalAlpha=1;
 g.fillStyle='rgba(2,10,18,.28)';g.fillRect(0,hy,W,H-hy);
 for(let i=0;i<10;i++){g.fillStyle=`rgba(200,230,255,${.04+.03*Math.sin(t*2+i)})`;g.fillRect(rnd(0,W),hy+rnd(10,230),rnd(40,120),1)}
 // shore pines
 this.trees.forEach((tr,i)=>{if(tr.x>250&&tr.x<1000)return;pine(tr.x,H-24-(i%3)*10,tr.h,i%2?'#03080e':'#040b13')});
 g.fillStyle='#02060b';g.fillRect(0,H-26,W,26);
 // campfire
 const fx=300,fy=H-34,fl=.8+.2*Math.sin(t*9)+.1*Math.sin(t*17);
 g.globalCompositeOperation='lighter';glow(fx,fy-10,220,'rgba(255,140,50,A)',.38*fl);
 for(let i=0;i<3;i++)this.fire.push({x:fx+rnd(-10,10),y:fy,vx:rnd(-14,14),vy:rnd(-110,-60),l:0,L:rnd(.5,1)});
 this.fire=this.fire.filter(p=>p.l<p.L);this.fire.forEach(p=>{p.l+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;const k=p.l/p.L;glow(p.x,p.y,12*(1-k*.5),`rgba(255,${Math.floor(190-120*k)},40,A)`,.7*(1-k))});
 g.globalCompositeOperation='source-over';g.fillStyle='#1a0d06';g.fillRect(fx-16,fy+2,32,6);
 if(R()<dt*.3)this.ss.push({x:rnd(W*.3,W),y:rnd(0,200),l:0,L:.8});
 this.ss=this.ss.filter(s=>s.l<s.L);g.globalCompositeOperation='lighter';this.ss.forEach(s=>{s.l+=dt;s.x-=700*dt;s.y+=300*dt;const gr=g.createLinearGradient(s.x,s.y,s.x+150,s.y-65);gr.addColorStop(0,`rgba(255,255,255,${1-s.l/s.L})`);gr.addColorStop(1,'rgba(255,255,255,0)');g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(s.x,s.y);g.lineTo(s.x+150,s.y-65);g.stroke()});g.globalCompositeOperation='source-over';
}};

/* ================= 8. VOLCANO ================= */
const S8={name:'Volcano Eruption',
init(){this.sm=[];this.bomb=[];this.emb=[];this.nextE=.4},
draw(t,dt){
 g.fillStyle=vgrad([[0,'#060206'],[.5,'#220b10'],[1,'#6b1d10']]);g.fillRect(0,0,W,H);
 for(let i=0;i<4;i++)this.sm.push({x:640+rnd(-22,22),y:285,vx:rnd(-12,34),vy:rnd(-120,-70),r:rnd(30,56),l:0,L:rnd(4,6.5)});
 this.sm=this.sm.filter(p=>p.l<p.L);this.sm.forEach(p=>{p.l+=dt;p.x+=(p.vx+p.l*8)*dt;p.y+=p.vy*dt;p.r+=dt*26;const k=p.l/p.L;glow(p.x,p.y,p.r,`rgba(${Math.floor(130-95*k)},${Math.floor(56-24*k)},${Math.floor(30+12*k)},A)`,.3*(1-k*.55))});
 g.fillStyle='#0b0507';g.beginPath();g.moveTo(0,H);g.lineTo(0,600);g.lineTo(250,560);g.lineTo(430,470);g.lineTo(590,300);g.lineTo(612,285);g.lineTo(668,285);g.lineTo(690,300);g.lineTo(850,470);g.lineTo(1030,560);g.lineTo(1280,600);g.lineTo(1280,H);g.fill();
 g.globalCompositeOperation='lighter';
 glow(640,285,240,'rgba(255,120,30,A)',.55+.2*Math.sin(t*3));
 [[[610,288],[575,360],[545,430],[485,520],[455,600]],[[670,288],[700,350],[742,432],[800,540],[830,600]],[[640,290],[628,370],[640,450],[610,540]]].forEach((p,i)=>{
  g.lineCap='round';g.lineJoin='round';g.strokeStyle=`rgba(255,80,20,${.35+.15*Math.sin(t*2+i)})`;g.lineWidth=7;g.beginPath();p.forEach((q,j)=>j?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke();
  g.setLineDash([26,34]);g.lineDashOffset=-t*42;g.strokeStyle='rgba(255,210,120,.85)';g.lineWidth=3;g.beginPath();p.forEach((q,j)=>j?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke();g.setLineDash([])});
 this.nextE-=dt;if(this.nextE<=0){for(let i=0;i<16;i++)this.bomb.push({x:640+rnd(-15,15),y:285,vx:rnd(-180,180),vy:rnd(-560,-300)});this.nextE=rnd(1.3,2.4)}
 this.bomb=this.bomb.filter(b=>{b.vy+=520*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;glow(b.x,b.y,14,'rgba(255,170,60,A)',.9);glow(b.x-b.vx*.02,b.y-b.vy*.02,9,'rgba(255,90,20,A)',.6);if(b.y>560){for(let k=0;k<2;k++)this.emb.push({x:b.x,y:b.y,vx:rnd(-30,30),vy:rnd(-90,-30),l:0,L:rnd(1.5,3)});return false}return true});
 if(R()<.8)this.emb.push({x:rnd(100,1180),y:rnd(560,H),vx:rnd(-10,25),vy:rnd(-60,-20),l:0,L:rnd(2,4)});
 this.emb=this.emb.filter(p=>p.l<p.L);this.emb.forEach(p=>{p.l+=dt;p.x+=(p.vx+Math.sin(p.l*3)*14)*dt;p.y+=p.vy*dt;glow(p.x,p.y,6,'rgba(255,140,40,A)',.9*(1-p.l/p.L))});
 g.globalCompositeOperation='source-over';
 g.fillStyle='#050203';g.beginPath();g.moveTo(0,H);g.lineTo(0,650);for(let x=0;x<=W;x+=40)g.lineTo(x,650+Math.sin(x*.05)*14+(x%80?6:-8));g.lineTo(W,H);g.fill();
 g.globalCompositeOperation='lighter';g.strokeStyle=`rgba(255,90,20,${.5+.3*Math.sin(t*2.2)})`;g.lineWidth=2;for(let i=0;i<9;i++){const x=80+i*140;g.beginPath();g.moveTo(x,H);g.lineTo(x+rnd(-1,1)+30,H-30-(i%3)*14);g.lineTo(x+14,H-60-(i%2)*10);g.stroke()}g.globalCompositeOperation='source-over';
}};

/* ================= 9. SNOWY CABIN ================= */
const S9={name:'Snowy Cabin',
init(){this.snow=Array.from({length:260},()=>({x:rnd(0,W),y:rnd(0,H),z:R(),p:rnd(0,TAU)}));this.smoke=[];this.st=Array.from({length:150},()=>({x:rnd(0,W),y:rnd(0,330),r:rnd(.3,1.2),p:rnd(0,TAU)}));this.spk=Array.from({length:60},()=>({x:rnd(0,W),y:rnd(500,H),p:rnd(0,TAU)}));this.tr=Array.from({length:30},()=>({x:rnd(-20,W+20),h:rnd(60,130)}))},
draw(t,dt){
 g.fillStyle=vgrad([[0,'#050a1c'],[.55,'#14284d'],[1,'#27406b']],0,480);g.fillRect(0,0,W,480);
 this.st.forEach(s=>{g.globalAlpha=.3+.7*Math.abs(Math.sin(t*1.3+s.p));g.fillStyle='#fff';g.fillRect(s.x,s.y,s.r*1.4,s.r*1.4)});g.globalAlpha=1;
 glow(240,120,260,'rgba(190,210,255,A)',.35);g.fillStyle='#eef3ff';g.beginPath();g.arc(240,120,34,0,TAU);g.fill();
 g.fillStyle='#16294d';g.beginPath();g.moveTo(0,480);for(let x=0;x<=W;x+=20)g.lineTo(x,430-30*Math.sin(x*.006+1)-14*Math.sin(x*.02));g.lineTo(W,480);g.fill();
 this.tr.forEach((tr,i)=>pine(tr.x,480,tr.h*.8,i%2?'#0b1830':'#0e1d3a'));
 g.fillStyle=vgrad([[0,'#34507f'],[1,'#13234a']],470,H);g.fillRect(0,470,W,H-470);
 this.spk.forEach(s=>{g.globalAlpha=Math.max(0,Math.sin(t*2+s.p))*.8;g.fillStyle='#fff';g.fillRect(s.x,s.y,1.6,1.6)});g.globalAlpha=1;
 const fl=.85+.1*Math.sin(t*7)+.05*Math.sin(t*13);
 g.globalCompositeOperation='lighter';g.save();g.translate(680,590);g.scale(1,.35);glow(0,0,260,'rgba(255,170,70,A)',.55*fl);g.restore();g.globalCompositeOperation='source-over';
 // cabin
 g.fillStyle='#2a1c12';g.fillRect(610,480,200,100);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=2;for(let i=1;i<7;i++){g.beginPath();g.moveTo(610,480+i*14.3);g.lineTo(810,480+i*14.3);g.stroke()}
 g.fillStyle='#1d130c';g.fillRect(764,420,24,60);g.fillStyle='#dbe7fb';g.fillRect(760,414,32,10);
 g.fillStyle='#2b2018';g.beginPath();g.moveTo(592,486);g.lineTo(710,408);g.lineTo(828,486);g.fill();g.fillStyle='#e3ecfb';g.beginPath();g.moveTo(598,484);g.lineTo(710,414);g.lineTo(822,484);g.lineTo(808,486);g.lineTo(710,426);g.lineTo(612,486);g.fill();
 let wg=g.createLinearGradient(0,505,0,545);wg.addColorStop(0,`rgba(255,214,120,${fl})`);wg.addColorStop(1,`rgba(255,150,60,${fl})`);g.fillStyle=wg;g.fillRect(640,505,54,40);g.fillStyle='#1a0f08';g.fillRect(665,505,3,40);g.fillRect(640,523,54,3);
 g.fillStyle='#120b06';g.fillRect(734,500,38,80);g.fillStyle=`rgba(255,190,90,${fl*.9})`;g.fillRect(744,510,18,16);
 g.globalCompositeOperation='lighter';glow(667,525,120,'rgba(255,170,70,A)',.4*fl);g.globalCompositeOperation='source-over';
 // chimney smoke
 if(R()<dt*9)this.smoke.push({x:776,y:412,vx:rnd(6,22),vy:rnd(-46,-28),r:rnd(8,13),l:0,L:rnd(4,6)});
 this.smoke=this.smoke.filter(p=>p.l<p.L);this.smoke.forEach(p=>{p.l+=dt;p.x+=(p.vx+Math.sin(p.l*1.4)*10)*dt;p.y+=p.vy*dt;p.r+=dt*7;glow(p.x,p.y,p.r,'rgba(190,200,220,A)',.28*(1-p.l/p.L))});
 g.fillStyle='#1a120c';for(let i=0;i<8;i++){g.fillRect(470+i*30,570,4,26);}g.fillRect(470,578,214,3);
 pine(110,H-6,260,'#050c1a');pine(1190,H-6,300,'#050c1a');pine(40,H,190,'#040a16');
 this.snow.forEach(s=>{s.y+=(26+s.z*90)*dt;s.x+=Math.sin(t*.8+s.p)*14*dt+14*dt;if(s.y>H){s.y=-10;s.x=rnd(0,W)}if(s.x>W)s.x=0;g.globalAlpha=.4+s.z*.5;g.fillStyle='#fff';g.beginPath();g.arc(s.x,s.y,.8+s.z*2.4,0,TAU);g.fill()});g.globalAlpha=1;
}};

/* ================= 10. CODE RAIN ================= */
const S10={name:'Code Rain',
init(){this.cols=[];for(let layer=0;layer<2;layer++){const fs=layer?13:21,n=Math.floor(W/fs);for(let i=0;i<n;i++)this.cols.push({x:i*fs+fs/2,fs,y:rnd(-H,H),v:rnd(120,320)*(layer?.65:1),len:Math.floor(rnd(10,26)),layer})}
 this.ch='01<>/{}[]=+*#$%&;ABCDEF'.split('')},
draw(t,dt){
 g.fillStyle=vgrad([[0,'#00110a'],[1,'#00200f']]);g.fillRect(0,0,W,H);glow(W/2,H/2,760,'rgba(0,255,120,A)',.1);
 g.textAlign='center';
 for(const c of this.cols){c.y+=c.v*dt;if(c.y-c.len*c.fs>H){c.y=rnd(-250,-20);c.v=rnd(120,320)*(c.layer?.65:1);c.len=Math.floor(rnd(10,26))}
  g.font=`${c.fs}px monospace`;
  for(let k=0;k<c.len;k++){const y=c.y-k*c.fs;if(y<-20||y>H+20)continue;const ci=Math.floor(hash(c.x,k,Math.floor(t*(k?3:14))+c.layer*7,1)*this.ch.length),a=1-k/c.len;
   g.fillStyle=k?`rgba(0,${190+Math.floor(65*a)},90,${a*(c.layer?.42:.9)})`:`rgba(220,255,235,${c.layer?.7:1})`;g.fillText(this.ch[ci],c.x,y)}
  if(!c.layer){g.globalCompositeOperation='lighter';glow(c.x,c.y,26,'rgba(120,255,170,A)',.35);g.globalCompositeOperation='source-over'}}
 g.textAlign='start';
}};

/* ================= 11. NEURAL NETWORK ================= */
const S11={name:'Neural Network',
init(){const layers=[5,8,9,8,4];this.nodes=[];layers.forEach((n,li)=>{for(let i=0;i<n;i++)this.nodes.push({l:li,x:190+li*(W-380)/(layers.length-1),y:H/2+(i-(n-1)/2)*72,ph:rnd(0,TAU),act:0,out:[]})});
 this.edges=[];this.nodes.forEach(a=>this.nodes.forEach(b=>{if(b.l===a.l+1){const e={a,b};this.edges.push(e);a.out.push(e)}}));this.pulses=[];
 this.dust=Array.from({length:110},()=>({x:rnd(0,W),y:rnd(0,H),r:rnd(.5,2.4),v:rnd(4,16),p:rnd(0,TAU)}))},
draw(t,dt){
 g.fillStyle=vgrad([[0,'#050816'],[1,'#0b1030']]);g.fillRect(0,0,W,H);glow(W*.5,H*.5,700,'rgba(110,80,255,A)',.16);
 this.dust.forEach(d=>{d.y-=d.v*dt;if(d.y<0)d.y=H;g.globalAlpha=.25+.5*Math.abs(Math.sin(t+d.p));g.fillStyle='#9fb4ff';g.beginPath();g.arc(d.x+Math.sin(t*.4+d.p)*12,d.y,d.r,0,TAU);g.fill()});g.globalAlpha=1;
 this.nodes.forEach(n=>{n.px=n.x+Math.sin(t*.6+n.ph)*10;n.py=n.y+Math.cos(t*.5+n.ph)*10});
 g.strokeStyle='rgba(120,150,255,.09)';g.lineWidth=1;g.beginPath();this.edges.forEach(e=>{g.moveTo(e.a.px,e.a.py);g.lineTo(e.b.px,e.b.py)});g.stroke();
 if(R()<dt*11){const n=this.nodes.filter(x=>x.l===0)[Math.floor(R()*5)];n.act=1;n.out.forEach(e=>{if(R()<.7)this.pulses.push({e,u:0,sp:rnd(.5,.9)})})}
 g.globalCompositeOperation='lighter';
 this.pulses=this.pulses.filter(p=>{p.u+=p.sp*dt;if(p.u>=1){p.e.b.act=1;p.e.b.out.forEach(e=>{if(R()<.62)this.pulses.push({e,u:0,sp:rnd(.6,1)})});return false}
  const a=p.e.a,b=p.e.b,x=a.px+(b.px-a.px)*p.u,y=a.py+(b.py-a.py)*p.u,u2=Math.max(0,p.u-.12),x2=a.px+(b.px-a.px)*u2,y2=a.py+(b.py-a.py)*u2;
  const col=p.e.a.l%2?'rgba(244,114,182,A)':'rgba(34,211,238,A)';g.strokeStyle=col.replace('A',.6);g.lineWidth=2;g.beginPath();g.moveTo(x2,y2);g.lineTo(x,y);g.stroke();glow(x,y,14,col,.9);return true});
 this.nodes.forEach(n=>{n.act=Math.max(0,n.act-dt*1.4);glow(n.px,n.py,20+n.act*34,n.l%2?'rgba(167,139,250,A)':'rgba(56,189,248,A)',.3+.6*n.act)});
 g.globalCompositeOperation='source-over';
 this.nodes.forEach(n=>{g.fillStyle=n.act>.1?'#fff':'#c7d2fe';g.beginPath();g.arc(n.px,n.py,5+n.act*3,0,TAU);g.fill()});
}};

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

const scenes=[S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11];
return {count:scenes.length,names:scenes.map(s=>s.name),init:i=>scenes[i].init(),draw:(i,t,dt)=>scenes[i].draw(t,dt),post};
}
