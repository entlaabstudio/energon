var a=!0,aa=new THREE.A,ba=new THREE.B;ba.j(window.innerWidth,window.innerHeight);$(window).resize(function(){ba.j(window.innerWidth,window.innerHeight)});document.body.appendChild(ba.D);var g=[],k=5,ca,da,ea,fa,ga,ha,ia,ja,l=45,ka=1,m=0,n=1,p=Date.now();$(".info h1").a("Energon "+p+" - "+(k+1)+" nulov\u00fdch bod\u016f (verze 0.9.8.2)");$("title").a("Robert Rajs - Energenon 3D v0.9.8.2 - "+(k+1)+" nulov\u00fdch bod\u016f");
var la=0,ma=!1,na=0,oa=Math.pow(2,na/12),pa=0,q=!1,qa=!1,ra=!0,r=!0,u=!1,v=0,w=1,x=51200,z=1,A="",sa=String.fromCharCode(13)+String.fromCharCode(10),ta=0,ua=0,va=!1,B=[],C=[],D=2,F=1,G=!1,H=[],wa=0,xa=1,ya=0,I=1,J=0,za=0,Aa=!1,Ba=!1,Ca;k++;var K=1;g[0]=[];g[0].definice=new THREE.b(new THREE.c(.2,147,147),new THREE.g);g[0].definice.position.x=0;g[0].definice.position.y=0;g[0].definice.position.z=0;g[0].hmotnost=la;g[0].hmotnost_puvodni=la;g[0].rotaceX=0;g[0].rotaceY=0;g[0].rotaceZ=0;
g[0].zrychleniX=0;g[0].zrychleniY=0;g[0].zrychleniZ=0;g[0].raw=[];g[0].raw.pos_x=[];g[0].raw.pos_y=[];g[0].raw.pos_z=[];g[0].drawcolor=16777215;g[0].pan_lr=0;g[0].pan_fb=0;g[0].pan_topbot=0;aa.add(g[0].definice);
for(var L=1;L<k;L++)Ca=16777215*Math.random(),ca=160*(Math.random()-.5),da=160*(Math.random()-.5),ea=160*(Math.random()-.5),fa=5E4*Math.pow(10,Math.random())/10,koeficient_rotace=2*Math.random(),ga=.001*koeficient_rotace,ha=.01*koeficient_rotace,ia=.1*koeficient_rotace,g[L]=[],g[L].definice=new THREE.b(new THREE.c(fa/3E4,7*Math.random(),7*Math.random()),new THREE.g({color:Ca,M:!0})),g[L].definice.position.x=ca,g[L].definice.position.y=da,g[L].definice.position.z=ea,g[L].hmotnost=fa,g[L].hmotnost_puvodni=
fa,g[L].rotaceX=ga,g[L].rotaceY=ha,g[L].rotaceZ=ia,g[L].zrychleniX=0,g[L].zrychleniY=0,g[L].zrychleniZ=0,g[L].raw=[],g[L].raw.pos_x=[],g[L].raw.pos_y=[],g[L].raw.pos_z=[],g[L].drawcolor=Ca,g[L].pan_lr=Math.random(),g[L].pan_fb=Math.random(),g[L].pan_topbot=Math.random(),aa.add(g[L].definice);var M=new THREE.w(l,window.innerWidth/window.innerHeight,1E11,1E-11);M.position.z=15E4;M.position.x=0;M.position.y=0;var N=[];N.x=0;N.y=0;N.z=0;N.rotation_x=0;N.rotation_y=0;N.relativni_cd=!0;
N.rychlost_posuvu=0;var O=1,Da=0,P=!0,Q=1,R=.001,Ea=0,S=320,Fa=3,T=T=Math.pow(2,N.rychlost_posuvu/12);
$("body").I("keydown",function(d){45==d.which&&(Ba=Ba?!1:!0);if(!G&&!Ba){38==d.which&&(N.y+=5*T);40==d.which&&(N.y-=5*T);37==d.which&&(N.x-=5*T);39==d.which&&(N.x+=5*T);107==d.which&&(N.z+=5*T);109==d.which&&(N.z-=5*T);32==d.which&&(a?0==G&&(a=!1):a=!0);65==d.which&&(N.rotation_y+=.03);68==d.which&&(N.rotation_y-=.03);87==d.which&&(N.rotation_x+=.03);83==d.which&&(N.rotation_x-=.03);84==d.which&&(ya+=1,xa=Math.pow(2,ya/12));71==d.which&&(--ya,xa=Math.pow(2,ya/12));82==d.which&&(Da+=1,O=Math.pow(2,
Da/12));70==d.which&&(--Da,O=Math.pow(2,Da/12));if(17==d.which)for(var e in g)g[e].zrychleniX=0,g[e].zrychleniY=0,g[e].zrychleniZ=0;16==d.which&&0==G&&(P=P?!1:!0);27==d.which&&(0==g[0].hmotnost?g[0].hmotnost=la:(la=g[0].hmotnost,g[0].hmotnost=0));13==d.which&&(n=-1==n?1:-1,g[0].hmotnost*=-1);73==d.which&&(Q=-1==Q?1:-1);80==d.which&&0==G&&(Fa+=1,S=40*Math.pow(2,Fa));76==d.which&&0==G&&(--Fa,S=40*Math.pow(2,Fa));106==d.which&&(ma=ma?!1:!0);79==d.which&&(Ea+=1,R=.001*Math.pow(2,Ea/12));75==d.which&&
(--Ea,R=.001*Math.pow(2,Ea/12));96==d.which&&(g[0].definice.position.x+=(0-g[0].definice.position.x)/10,g[0].definice.position.y+=(0-g[0].definice.position.y)/10,g[0].definice.position.z+=(0-g[0].definice.position.z)/10);101==d.which&&(N.relativni_cd=N.relativni_cd?!1:!0);97==d.which&&(N.rotation_x=0,N.rotation_y=0);98==d.which&&(N.x=0,N.y=0,N.z=0);88==d.which&&(l+=1,N.z-=50);67==d.which&&1<=l&&(--l,N.z+=50);86==d.which&&("block"==$("div.info").f("display")?$("div.info, div.info2").f("display","none"):
$("div.info, div.info2").f("display","block"));190==d.which&&(qa=qa?!1:!0);if(188==d.which||110==d.which)q=q?!1:!0;99==d.which&&(ra=ra?!1:!0);103==d.which&&(--N.rychlost_posuvu,T=Math.pow(2,N.rychlost_posuvu/12));104==d.which&&(N.rychlost_posuvu+=1,T=Math.pow(2,N.rychlost_posuvu/12));102==d.which&&0==G&&(u?u=!1:(Ga(),u=!0));100==d.which&&0==G&&U();66==d.which&&1<w&&(Ga(),--w);78==d.which&&(Ga(),w+=1);72==d.which&&512<x&&(x-=512);74==d.which&&(x+=512);85==d.which&&(Ga(),6==z?z=1:z++);77==d.which&&
(1==r?(r=!1,ka=0):G||(r=!0,ka=5));33==d.which&&(m+=1,g[0].hmotnost=440*n*Math.pow(2,m/12));34==d.which&&(--m,g[0].hmotnost=440*n*Math.pow(2,m/12));36==d.which&&(m+=12,g[0].hmotnost=440*n*Math.pow(2,m/12));35==d.which&&(m-=12,g[0].hmotnost=440*n*Math.pow(2,m/12));if(49==d.which)for(e in--za,g)0!=e&&(g[e].hmotnost=g[e].hmotnost_puvodni*Math.pow(Math.pow(2,za/12),g[e].hmotnost_puvodni/1E4));if(50==d.which)for(e in za+=1,g)0!=e&&(g[e].hmotnost=g[e].hmotnost_puvodni*Math.pow(Math.pow(2,za/12),g[e].hmotnost_puvodni/
1E4));if(52==d.which)for(e in--J,I=Math.pow(2,J/12),g)0!=e&&(g[e].hmotnost=g[e].hmotnost_puvodni*I);if(53==d.which)for(e in J+=1,I=Math.pow(2,J/12),g)0!=e&&(g[e].hmotnost=g[e].hmotnost_puvodni*I);if(54==d.which)for(e in J-=12,I=Math.pow(2,J/12),g)0!=e&&(g[e].hmotnost=g[e].hmotnost_puvodni*I);if(55==d.which)for(e in J+=12,I=Math.pow(2,J/12),g)0!=e&&(g[e].hmotnost=g[e].hmotnost_puvodni*I);51==d.which&&(V=0);56==d.which&&(2==D?D=1:D++);57==d.which&&1<F&&--F;48==d.which&&(F+=1);59==d.which&&(Aa=Aa?!1:
!0);189==d.which&&1<oa&&(--na,oa=Math.pow(2,na/12));187==d.which&&(na+=1,oa=Math.pow(2,na/12))}81!=d.which||Ba||(G?(clearInterval(benchmark_interval),G=!1):(u=!1,Ga(),r=!1,H=[],S=40,a=!0,ka=0,G=!0,m=0,$("#info_zaznam_odhad").a(""),$("#info_zaznam_odhad_per_cas").a(""),g[0].hmotnost=440*n*Math.pow(2,m/12),benchmark_interval=setInterval(Ha,1E3)))});
function U(){if(1==z){var d=new Blob([A],{type:"application/csv;charset=utf-8;"});saveAs(d,"energonon-data-"+p+"-"+Date.now()+"-"+k+"nb.csv")}if(2==z){var d=new JSZip,e=Date.now(),f=[],c;for(c in g)f[c]=[],f[c].x=new Uint8Array(g[c].raw.pos_x),f[c].y=new Uint8Array(g[c].raw.pos_y),f[c].z=new Uint8Array(g[c].raw.pos_z),d.file("energonon-data-"+p+"-"+e+"-object-"+(10>c?"0"+c:c)+"-posX-"+8*w+"bit.raw",f[c].x),d.file("energonon-data-"+p+"-"+e+"-object-"+(10>c?"0"+c:c)+"-posY-"+8*w+"bit.raw",f[c].y),d.file("energonon-data-"+
p+"-"+e+"-object-"+(10>c?"0"+c:c)+"-posZ-"+8*w+"bit.raw",f[c].z);c=d.F({type:"blob"});saveAs(c,"energonon-data-"+p+"-"+e+"-"+8*w+"bit-"+k+"nb.raw.zip")}3==z&&(e=Date.now(),f=new Uint8Array(C),d=new Blob([f],{type:"audio/basic;"}),saveAs(d,"energonon-data-"+p+"-"+e+"-"+8*w+"bit-mono-"+k+"nb.raw"));4==z&&(e=Date.now(),f=new Uint8Array(C),d=new Blob([f],{type:"audio/basic;"}),saveAs(d,"energonon-data-"+p+"-"+e+"-"+8*w+"bit-stereo-"+k+"nb.raw"));5==z&&(e=Date.now(),f=new Uint8Array(C),d=new Blob([f],
{type:"audio/basic;"}),saveAs(d,"energonon-data-"+p+"-"+e+"-"+8*w+"bit-quattro-"+k+"nb.raw"));6==z&&(e=Date.now(),f=new Uint8Array(C),d=new Blob([f],{type:"audio/basic;"}),saveAs(d,"energonon-data-"+p+"-"+e+"-"+8*w+"bit-6ch-"+k+"nb.raw"));Ga()}var Ia=[],Ja=0,Ka=new THREE.c(.2,0,0),La=new THREE.v,Ma=1,V=0,W;
for(W in g)Math.abs(2*g[W].definice.position.x)>V&&(V=Math.abs(2*g[W].definice.position.x)),Math.abs(2*g[W].definice.position.y)>V&&(V=Math.abs(2*g[W].definice.position.y)),Math.abs(2*g[W].definice.position.z)>V&&(V=Math.abs(2*g[W].definice.position.z));var Na=new THREE.s({color:16711680});
function Oa(){function d(b){var d=[],c=Math.pow(2,8*w)-1;0>b&&(b=c-Math.abs(b));var e=!1;b>c&&(b=c,e=!0);0>b&&(b=0,e=!0);for(c=w;1<=c;c--)d[c]=b&255,b>>=8;b=[];b.hodnota=[];for(var f=1,c=w;1<=c;c--)b.hodnota[f]=d[c],f++;b.clip=e;return b}for(var e=0,f=Infinity,c=1;c<g.length;c++)g[c].hmotnost>e&&(e=g[c].hmotnost),g[c].hmotnost<f&&(f=g[c].hmotnost);$("#info_nejtezsi_objekt").a(Math.round(e));$("#info_nejlehci_objekt").a(Math.round(f));e=new THREE.m;M.J.H(l,window.innerWidth/window.innerHeight,1E11,
1E-11);if(P)ua=ta;else{pa=oa-1;g[0].hmotnost+=pa;if(3==z){snd_raw_sum=0;for(c=1;c<g.length;c++)snd_raw_sum+=g[c].definice.position.x,snd_raw_sum+=g[c].definice.position.y,snd_raw_sum+=g[c].definice.position.z;snd_raw_sum*=Math.pow(2,F);if(u){f=d(snd_raw_sum);if(10==K)for(c=1;c<=w;c++)C[C.length]=f.hodnota[c];v++;X()/1024>=x&&U()}}if(4==z){snd_raw_sum_R=snd_raw_sum_L=0;for(c=1;c<g.length;c++){var f=1-g[c].pan_lr,t=g[c].pan_lr;snd_raw_sum_L+=g[c].definice.position.x*f;snd_raw_sum_L+=g[c].definice.position.y*
f;snd_raw_sum_L+=g[c].definice.position.z*f;snd_raw_sum_R+=g[c].definice.position.x*t;snd_raw_sum_R+=g[c].definice.position.y*t;snd_raw_sum_R+=g[c].definice.position.z*t}snd_raw_sum_L*=Math.pow(2,F);snd_raw_sum_R*=Math.pow(2,F);snd_raw_sum=snd_raw_sum_L>snd_raw_sum_R?snd_raw_sum_L:snd_raw_sum_R;if(u){f=d(snd_raw_sum_L);t=d(snd_raw_sum_R);if(10==K){for(c=1;c<=w;c++)C[C.length]=f.hodnota[c];for(c=1;c<=w;c++)C[C.length]=t.hodnota[c]}v++;X()/1024>=x&&U()}}if(5==z){snd_raw_sum_B=snd_raw_sum_F=snd_raw_sum_R=
snd_raw_sum_L=0;for(c=1;c<g.length;c++){var f=1-g[c].pan_lr,t=g[c].pan_lr,y=1-g[c].pan_fb,E=g[c].pan_fb;snd_raw_sum_L+=g[c].definice.position.x*f;snd_raw_sum_L+=g[c].definice.position.y*f;snd_raw_sum_L+=g[c].definice.position.z*f;snd_raw_sum_R+=g[c].definice.position.x*t;snd_raw_sum_R+=g[c].definice.position.y*t;snd_raw_sum_R+=g[c].definice.position.z*t;snd_raw_sum_F+=g[c].definice.position.x*y;snd_raw_sum_F+=g[c].definice.position.y*y;snd_raw_sum_F+=g[c].definice.position.z*y;snd_raw_sum_B+=g[c].definice.position.x*
E;snd_raw_sum_B+=g[c].definice.position.y*E;snd_raw_sum_B+=g[c].definice.position.z*E}snd_raw_sum_L*=Math.pow(2,F);snd_raw_sum_R*=Math.pow(2,F);snd_raw_sum_F*=Math.pow(2,F);snd_raw_sum_B*=Math.pow(2,F);snd_raw_sum1=snd_raw_sum_L>snd_raw_sum_R?snd_raw_sum_L:snd_raw_sum_R;snd_raw_sum2=snd_raw_sum_F>snd_raw_sum_B?snd_raw_sum_F:snd_raw_sum_B;snd_raw_sum=snd_raw_sum1>snd_raw_sum2?snd_raw_sum1:snd_raw_sum2;if(u){f=d(snd_raw_sum_L);t=d(snd_raw_sum_R);y=d(snd_raw_sum_F);E=d(snd_raw_sum_B);if(10==K){for(c=
1;c<=w;c++)C[C.length]=f.hodnota[c];for(c=1;c<=w;c++)C[C.length]=t.hodnota[c];for(c=1;c<=w;c++)C[C.length]=y.hodnota[c];for(c=1;c<=w;c++)C[C.length]=E.hodnota[c]}v++;X()/1024>=x&&U()}}if(6==z){snd_raw_sum_BOT=snd_raw_sum_TOP=snd_raw_sum_B=snd_raw_sum_F=snd_raw_sum_R=snd_raw_sum_L=0;for(c=1;c<g.length;c++){var f=1-g[c].pan_lr,t=g[c].pan_lr,y=1-g[c].pan_fb,E=g[c].pan_fb,Y=1-g[c].pan_topbot,Z=g[c].pan_topbot;snd_raw_sum_L+=g[c].definice.position.x*f;snd_raw_sum_L+=g[c].definice.position.y*f;snd_raw_sum_L+=
g[c].definice.position.z*f;snd_raw_sum_R+=g[c].definice.position.x*t;snd_raw_sum_R+=g[c].definice.position.y*t;snd_raw_sum_R+=g[c].definice.position.z*t;snd_raw_sum_F+=g[c].definice.position.x*y;snd_raw_sum_F+=g[c].definice.position.y*y;snd_raw_sum_F+=g[c].definice.position.z*y;snd_raw_sum_B+=g[c].definice.position.x*E;snd_raw_sum_B+=g[c].definice.position.y*E;snd_raw_sum_B+=g[c].definice.position.z*E;snd_raw_sum_TOP+=g[c].definice.position.x*Y;snd_raw_sum_TOP+=g[c].definice.position.y*Y;snd_raw_sum_TOP+=
g[c].definice.position.z*Y;snd_raw_sum_BOT+=g[c].definice.position.x*Z;snd_raw_sum_BOT+=g[c].definice.position.y*Z;snd_raw_sum_BOT+=g[c].definice.position.z*Z}snd_raw_sum_L*=Math.pow(2,F);snd_raw_sum_R*=Math.pow(2,F);snd_raw_sum_F*=Math.pow(2,F);snd_raw_sum_B*=Math.pow(2,F);snd_raw_sum_TOP*=Math.pow(2,F);snd_raw_sum_BOT*=Math.pow(2,F);snd_raw_sum1=snd_raw_sum_L>snd_raw_sum_R?snd_raw_sum_L:snd_raw_sum_R;snd_raw_sum2=snd_raw_sum_F>snd_raw_sum_B?snd_raw_sum_F:snd_raw_sum_B;snd_raw_sum3=snd_raw_sum_TOP>
snd_raw_sum_BOT?snd_raw_sum_TOP:snd_raw_sum_BOT;snd_raw_sum01=snd_raw_sum1>snd_raw_sum2?snd_raw_sum1:snd_raw_sum2;snd_raw_sum=snd_raw_sum01>snd_raw_sum3?snd_raw_sum01:snd_raw_sum3;if(u){f=d(snd_raw_sum_L);t=d(snd_raw_sum_R);y=d(snd_raw_sum_F);E=d(snd_raw_sum_B);Y=d(snd_raw_sum_TOP);Z=d(snd_raw_sum_BOT);if(10==K){for(c=1;c<=w;c++)C[C.length]=f.hodnota[c];for(c=1;c<=w;c++)C[C.length]=t.hodnota[c];for(c=1;c<=w;c++)C[C.length]=y.hodnota[c];for(c=1;c<=w;c++)C[C.length]=E.hodnota[c];for(c=1;c<=w;c++)C[C.length]=
Y.hodnota[c];for(c=1;c<=w;c++)C[C.length]=Z.hodnota[c]}v++;X()/1024>=x&&U()}}ja=0;for(var b in g){g[b].definice.scale.x=g[b].definice.scale.y=g[b].definice.scale.z=xa;g[b].definice.visible=ra;for(var h in g)0==b&&0==g[0].hmotnost||h==b||(g[b].vzdalenost=Math.pow(Math.pow(g[b].definice.position.x-g[h].definice.position.x,2)+Math.pow(g[b].definice.position.y-g[h].definice.position.y,2)+Math.pow(g[b].definice.position.z-g[h].definice.position.z,2),1/3),g[b].vzdalenostX=Math.abs(g[b].definice.position.x-
g[h].definice.position.x),g[b].vzdalenostY=Math.abs(g[b].definice.position.y-g[h].definice.position.y),g[b].vzdalenostZ=Math.abs(g[b].definice.position.z-g[h].definice.position.z),1==D&&(g[h].definice.position.x>g[b].definice.position.x&&(g[b].zrychleniX+=R/g[b].vzdalenost*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost*Q),g[h].definice.position.x<g[b].definice.position.x&&(g[b].zrychleniX-=R/g[b].vzdalenost*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost*Q),g[h].definice.position.y>g[b].definice.position.y&&
(g[b].zrychleniY+=R/g[b].vzdalenost*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost*Q),g[h].definice.position.y<g[b].definice.position.y&&(g[b].zrychleniY-=R/g[b].vzdalenost*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost*Q),g[h].definice.position.z>g[b].definice.position.z&&(g[b].zrychleniZ+=R/g[b].vzdalenost*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost*Q),g[h].definice.position.z<g[b].definice.position.z&&(g[b].zrychleniZ-=R/g[b].vzdalenost*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost*Q)),2==D&&(g[h].definice.position.x>
g[b].definice.position.x&&(g[b].zrychleniX+=Q*R*.001*g[b].vzdalenostX*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost),g[h].definice.position.x<g[b].definice.position.x&&(g[b].zrychleniX-=Q*R*.001*g[b].vzdalenostX*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost),g[h].definice.position.y>g[b].definice.position.y&&(g[b].zrychleniY+=Q*R*.001*g[b].vzdalenostY*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost),g[h].definice.position.y<g[b].definice.position.y&&(g[b].zrychleniY-=Q*R*.001*g[b].vzdalenostY*(g[b].hmotnost+
g[h].hmotnost)/g[b].hmotnost),g[h].definice.position.z>g[b].definice.position.z&&(g[b].zrychleniZ+=Q*R*.001*g[b].vzdalenostZ*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost),g[h].definice.position.z<g[b].definice.position.z&&(g[b].zrychleniZ-=Q*R*.001*g[b].vzdalenostZ*(g[b].hmotnost+g[h].hmotnost)/g[b].hmotnost))),3>z?(Math.abs(2*g[h].definice.position.x*Math.pow(2,F))>V&&(V=Math.abs(2*g[h].definice.position.x*Math.pow(2,F))),Math.abs(2*g[h].definice.position.y*Math.pow(2,F))>V&&(V=Math.abs(2*g[h].definice.position.y*
Math.pow(2,F))),Math.abs(2*g[h].definice.position.z*Math.pow(2,F))>V&&(V=Math.abs(2*g[h].definice.position.z*Math.pow(2,F)))):2*snd_raw_sum>V&&(V=Math.abs(2*snd_raw_sum));if(a){g[b].definice.position.x>S/2&&(g[b].definice.position.x=S/2);g[b].definice.position.y>S/2&&(g[b].definice.position.y=S/2);g[b].definice.position.z>S/2&&(g[b].definice.position.z=S/2);g[b].definice.position.x<-1*S/2&&(g[b].definice.position.x=-1*S/2);g[b].definice.position.y<-1*S/2&&(g[b].definice.position.y=-1*S/2);g[b].definice.position.z<
-1*S/2&&(g[b].definice.position.z=-1*S/2);if(g[b].definice.position.x>S/2||g[b].definice.position.x<-1*S/2)g[b].zrychleniX*=-1;if(g[b].definice.position.y>S/2||g[b].definice.position.y<-1*S/2)g[b].zrychleniY*=-1;if(g[b].definice.position.z>S/2||g[b].definice.position.z<-1*S/2)g[b].zrychleniZ*=-1}if(0!=b||1==ma)q&&(Na.color.set(884400),e.l.push(new THREE.h(g[b].definice.position.x,g[b].definice.position.y,g[b].definice.position.z))),g[b].definice.position.x+=g[b].zrychleniX*O,g[b].definice.position.y+=
g[b].zrychleniY*O,g[b].definice.position.z+=g[b].zrychleniZ*O,g[b].definice.rotation.x+=g[b].rotaceX*O,g[b].definice.rotation.y+=g[b].rotaceY*O,g[b].definice.rotation.z+=g[b].rotaceZ*O,q&&e.l.push(new THREE.h(g[b].definice.position.x,g[b].definice.position.y,g[b].definice.position.z));q&&(line=new THREE.o(e,Na,THREE.u),aa.add(line));qa&&(Ia[Ja]=new THREE.b(Ka,La),Ia[Ja].position.x=g[b].definice.position.x,Ia[Ja].position.y=g[b].definice.position.y,Ia[Ja].position.z=g[b].definice.position.z);aa.add(Ia[Ja]);
u&&1==Ma&&1==z&&(0==A.length&&(A+="id_rec;id_castice;hmotnost_castice;castice_pozice_X;castice_pozice_Y;castice_pozice_Z;castice_rotace_X;castice_rotace_Y;castice_rotace_Z;castice_slozitost;kamera_pozice_X;kamera_pozice_Y;kamera_pozice_Z;kamera_rotace_X;kamera_rotace_Y;kamera_rotace_Z;kamera_relativni_cd;kamera_rychlost;kamera_ubeznik;kreslit;malovat;skok_zrychleni;real_zrychleni;rezim_pritazlivosti;velikost_mistnosti;rezim_mistnosti;energie_vesmiru;viditelnost_objektu;rozliseni_zaznamu;cas_zaznamu"+
sa),A+=v+";"+b+";"+g[b].hmotnost+";"+g[b].definice.position.x*Math.pow(2,F)+";"+g[b].definice.position.y*Math.pow(2,F)+";"+g[b].definice.position.z*Math.pow(2,F)+";"+g[b].definice.rotation.x+";"+g[b].definice.rotation.y+";"+g[b].definice.rotation.z+";"+g[b].definice.G.C.K+";"+M.position.x+";"+M.position.y+";"+M.position.z+";"+M.rotation.x+";"+M.rotation.y+";"+M.rotation.z+";"+N.relativni_cd+";"+T+";"+l+";"+q+";"+qa+";"+O+";"+R+";"+Q+";"+S+";"+a+";"+(b==g.length-1?ja:"N/A")+";"+ra+";1:"+w+";"+Date.now()+
sa,v++,A.length/1024>=x&&U());if(u&&2==z){f=d(g[b].definice.position.x*Math.pow(2,F));t=d(g[b].definice.position.y*Math.pow(2,F));y=d(g[b].definice.position.z*Math.pow(2,F));if(10==K)for(c=1;c<=w;c++)g[b].raw.pos_x[g[b].raw.pos_x.length]=f.hodnota[c],g[b].raw.pos_y[g[b].raw.pos_y.length]=t.hodnota[c],g[b].raw.pos_z[g[b].raw.pos_z.length]=y.hodnota[c];v++;X()/1024>=x&&U()}Ja++;G&&wa++;ja+=(Math.abs(g[b].zrychleniX*O)+Math.abs(g[b].zrychleniY*O)+Math.abs(g[b].zrychleniZ*O))/3}Ma<w?Ma++:Ma=1;if(Aa){c=
e=h=0;for(b in g)0!=b&&(h+=g[b].definice.position.x,e+=g[b].definice.position.y,c+=g[b].definice.position.z);h/=g.length;e/=g.length;c/=g.length;for(b in g)0!=b&&(g[b].definice.position.x-=h,g[b].definice.position.y-=e,g[b].definice.position.z-=c)}}u&&2<=z&&Infinity>z&&(10==K&&(K=0),K++);b=M.position.x;c=M.position.y;h=M.position.z;e=g[0].definice.position.x+N.x;f=g[0].definice.position.y+N.y;t=g[0].definice.position.z+600+N.z;y=M.rotation.x;E=M.rotation.y;Y=g[0].definice.rotation.x+N.rotation_x;
Z=g[0].definice.rotation.y+N.rotation_y;N.relativni_cd&&(M.position.x+=(e-b)/20,M.position.y+=(f-c)/20,M.position.z+=(t-h)/20);M.rotation.x+=(Y-y)/20;M.rotation.y+=(Z-E)/20;xround=function(b,c){return Math.round(b*Math.pow(10,c))/Math.pow(10,c)};r&&ba.L(aa,M);$("#info_nazev_hodnoty").a("Pozice \u010dern\u00e9 d\u00edry");$("#info_cerna_dira").a("X: "+Math.round(10*g[0].definice.position.x)/10+"<br>Y: "+Math.round(10*g[0].definice.position.y)/10+"<br>Z: "+Math.round(10*g[0].definice.position.z)/10);
$("#info_pruzor").a("X: "+Math.round(10*M.position.x)/10+"<br>Y: "+Math.round(10*M.position.y)/10+"<br>Z: "+Math.round(10*M.position.z)/10+"<br>Nato\u010den\u00ed X: "+Math.round(M.rotation.y/Math.PI*18E4)/1E3+"\u00b0<br>Nato\u010den\u00ed Y: "+Math.round(M.rotation.x/Math.PI*18E4)/1E3+"\u00b0");$("#info_g_koeficient").a(xround(O,7));$("#info_cd_hmotnost").a(xround(g[0].hmotnost,7));$("#info_obj_rezim").a(-1==Q?"odpuzov\u00e1n\u00ed":"p\u0159itahov\u00e1n\u00ed");$("#info_zdi_velikost").a(S);$("#info_zdi_rezim").a(a?
"zapnuto":"vypnuto");$("#info_cd_rezim").a(ma?"pohybliv\u00e1":"statick\u00e1");$("#info_cd_pernar").a(pa);$("#info_celkova_energie").a(xround(ja,1));$("#info_anim_rychlost").a(R);$("#info_kamera_relativni_cd").a(N.relativni_cd?"zapnuto":"vypnuto");$("#info_kamera_perspektiva").a(xround(l,3));$("#info_malovani").a(qa?"zapnuto":"vypnuto");$("#info_kresleni").a(q?"zapnuto":"vypnuto");$("#info_bench_stav").a(G?"zapnuto":"vypnuto");$("#info_viditelnost_objektu").a(ra?"viditeln\u00e9":"skryt\u00e9");$("#info_kamera_nasobek").a(xround(T,
7));$("#info_zaznam_kroky").a(Pa());1==z&&$("#info_zaznam_rozliseni").a("1:"+w);2<=z&&Infinity>z&&$("#info_zaznam_rozliseni").a(8*w+" bit");$("#info_zaznam_perioda").a(x+" kB");1==z&&$("#info_zaznam_rezim").a("CSV (Excel)");2==z&&$("#info_zaznam_rezim").a("ZIP / RAW (multitrack)");3==z&&$("#info_zaznam_rezim").a("RAW mono");4==z&&$("#info_zaznam_rezim").a("RAW stereo");5==z&&$("#info_zaznam_rezim").a("RAW quattro");6==z&&$("#info_zaznam_rezim").a("RAW 6ch");$("#info_zaznam_stav").a(u?"zapnuto":"vypnuto");
$("#info_centrovani").a(Aa?"zapnuto":"vypnuto");$("#info_vykreslovani").a(r?"zapnuto":"vypnuto");$("#info_blokovani_klaves").a(Ba?"zapnuto":"vypnuto");$("#info_transpozice_cd").a(m);$("#info_transpozice_tihy").a(za);$("#info_bit_clip").a(Math.ceil(V).toString(2).length+" bit");2<=z&&Infinity>=z&&(b=Math.round(100-(Math.pow(2,8*w)-1-V)/(Math.pow(2,8*w)-1)*100),100<b?$("#info_bit_clip").append(" <span class='red big'>("+b+"% RAW)</span>"):$("#info_bit_clip").append(" ("+b+"% RAW)"));$("#info_bit_clip_bin").a(Qa(Math.ceil(V).toString(2)));
$("#info_pauza").a(P?"ano":"ne");$("#info_npo").a(I);$("#info_dynamicky_nasobek").a(F);1==D&&$("#info_engine").a("Energonon LIVE");2==D&&$("#info_engine").a("Konven\u010dn\u00ed gravitace");setTimeout(Oa,ka)}Oa();export_cas_odhad_timer=setInterval(Ra,1E3);bit_clip_rep_timer=setInterval(Sa,125);
function Ra(){if(!P){if(u&&va){ua=X();var d=ua-ta;if(1800>B.length)B[B.length]=d;else{for(var e=[],f=1;f<B.length;f++)e[f-1]=B[f];e[e.length]=d;B=e}d=0;if(0<B.length)for(f=0;f<B.length;f++)d+=B[f];else d=B[0];d/=B.length;f=Math.round((1024*x-ua)/d);d=Math.floor(f/60);e=Math.floor(f/3600);d-=60*e;f-=60*d+3600*e;"Infinity"!=e&&($("#info_zaznam_odhad").a((10>e?"0"+e:e)+":"+(10>d?"0"+d:d)+":"+(10>f?"0"+f:f)),f=(new Date(1E3*(3600*e+60*d+f)+72E5+Date.now())).toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/),
$("#info_zaznam_odhad_per_cas").a(f[1]+" "+f[2]));ta=ua}va=!0}}function X(){var d=0;1==z&&(d=Math.round(A.length));if(2==z)for(var e in g)d+=g[e].raw.pos_x.length,d+=g[e].raw.pos_y.length,d+=g[e].raw.pos_z.length;3<=z&&(d+=C.length);return d}function Ga(){ua=ta=0;va=!1;A="";for(var d in g)g[d].raw.pos_x=[],g[d].raw.pos_y=[],g[d].raw.pos_z=[];C=[]}
function Sa(){var d=0;if(3>z)for(var e in g)Math.abs(2*g[e].definice.position.x)>d&&(d=Math.abs(2*g[e].definice.position.x*Math.pow(2,F))),Math.abs(2*g[e].definice.position.y)>d&&(d=Math.abs(2*g[e].definice.position.y*Math.pow(2,F))),Math.abs(2*g[e].definice.position.z)>d&&(d=Math.abs(2*g[e].definice.position.z*Math.pow(2,F)));else d=Math.abs(2*snd_raw_sum);$("#info_bit_clip_rep").a(Math.ceil(d).toString(2).length+" bit");2<=z&&Infinity>=z&&(e=Math.round(100-(Math.pow(2,8*w)-1-d)/(Math.pow(2,8*w)-
1)*100),100<e?$("#info_bit_clip_rep").append(" <span class='red big'>("+e+"% RAW)</span>"):$("#info_bit_clip_rep").append(" ("+e+"% RAW)"));$("#info_bit_clip_rep_bin").a(Qa(Math.ceil(d).toString(2)));return d}function Qa(d){String.prototype.i=function(c){return 0<c?this.substring(0,c)+" "+this.substring(c,this.length):" "+this};for(var e=d.length,f=0;f<Math.ceil(e/8);f++)d=d.i(d.length-8*f-f);return d}
function Pa(){var d=X();1024>d&&(navrat=d+" B");1024<d&&(navrat=xround(d/1024,2)+" kB");return navrat}
function Ha(){for(var d in g)g[d].zrychleniX=0,g[d].zrychleniY=0,g[d].zrychleniZ=0;P=!1;O=1;Da=0;Q=1;R=.001;Ea=0;n=1;0>g[0].hmotnost&&(g[0].hmotnost*=-1);1==r&&(clearInterval(benchmark_interval),G=!1);if(!r){if(600>H.length)H[H.length]=wa;else{var e=[];for(d=1;d<H.length;d++)e[d-1]=H[d];e[e.length]=wa;H=e}e=0;if(0<H.length)for(d=0;d<H.length;d++)e+=H[d];else e=H[0];benchmark_result=e/H.length;d=Math.round(H.length/6);$("#info_bench_vysledek").a(Math.round(benchmark_result/100));$("#info_bench_presnost").a(d+
"%");wa=0;100==d&&(clearInterval(benchmark_interval),G=!1,r=!0,ka=5,P=!0)}};