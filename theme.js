/* v16: aspetto personalizzabile (tema, colori, contorni, immagini) e testi lunghi accorciati.
   Le impostazioni stanno in localStorage 'ddth' (pochi byte); le immagini in IndexedDB 'ddimg',
   così non rubano spazio ai personaggi salvati in 'dd'. */
(function(){
var K='ddth',DOC=document.documentElement;
var PR={
 auto:{n:'Automatico',d:'Chiaro o scuro come il telefono'},
 light:{n:'Chiaro',v:{bg:'#eef0f2',cd:'#ffffff',ink:'#1c2230',mu:'#667085',ac:'#2a6f69',hp:'#b3372f',ln:'#d5d9de'}},
 dark:{n:'Scuro',v:{bg:'#11151c',cd:'#1a202b',ink:'#e7eaf0',mu:'#8e98a9',ac:'#6cc4bb',hp:'#e0645c',ln:'#2b3343'}},
 perg:{n:'Pergamena',v:{bg:'#e9dcc0',cd:'#f6eedb',ink:'#3b2a1a',mu:'#7a6248',ac:'#8a4b1e',hp:'#a3261b',ln:'#cdb68a'},tf:1},
 arc:{n:'Notte arcana',v:{bg:'#14101f',cd:'#1f1930',ink:'#ece6ff',mu:'#a197bd',ac:'#b18cff',hp:'#ff6b81',ln:'#3a2f55'}},
 for:{n:'Foresta',v:{bg:'#e3ebe0',cd:'#f6f9f4',ink:'#1d2a1d',mu:'#5c6d5a',ac:'#3b7a37',hp:'#b03a2e',ln:'#c3d2bd'}},
 bra:{n:'Brace di drago',v:{bg:'#1a0f0c',cd:'#27160f',ink:'#f6e7dc',mu:'#b89c8b',ac:'#ff8a3d',hp:'#ff5252',ln:'#47291d'}},
 mar:{n:'Abissi',v:{bg:'#0b1822',cd:'#112536',ink:'#e2f1fb',mu:'#8fb0c4',ac:'#4cc3ff',hp:'#ff6b6b',ln:'#1f3b52'}},
 ner:{n:'Inchiostro',v:{bg:'#000000',cd:'#121212',ink:'#f2f2f2',mu:'#a0a0a0',ac:'#e8c547',hp:'#ff5c5c',ln:'#2c2c2c'}}
};
var VARS=[['bg','Sfondo'],['cd','Riquadri'],['ink','Testo'],['mu','Testo secondario'],['ac','Pulsanti e accento'],['hp','PF e pericolo'],['ln','Contorni']];
var SLOTS=[['bg',"Sfondo dell'app",1600,80],['cd','Riquadri delle schede',900,82],['bt','Pulsanti',600,55],['sh','Finestre a comparsa',1200,85],['nv','Barra in basso',900,85]];
var FONTS=[['Georgia,serif','Classico'],["'Palatino Linotype',Palatino,'Book Antiqua',Georgia,serif",'Libro antico'],["'Trebuchet MS',system-ui,sans-serif",'Moderno'],["'Courier New',Courier,monospace",'Macchina da scrivere'],["Papyrus,'Comic Sans MS',fantasy,Georgia,serif",'Fantasy']];
var DEF={p:'auto',c:{},bw:1,rad:10,tf:-1,v:{},cl:1,an:1};
var st=load(),URLS={},db=null;
function load(){var o;try{o=JSON.parse(localStorage.getItem(K)||'null')}catch(e){}return clean(o)}
/* accetta solo valori noti: vale per localStorage e per i file importati */
function clean(o){o=o&&typeof o=='object'&&!Array.isArray(o)?o:{};var r=JSON.parse(JSON.stringify(DEF)),hex=/^#[0-9a-f]{6}$/i,num=function(v,a,b,d){v=+v;return isFinite(v)?Math.min(b,Math.max(a,Math.round(v))):d};
 if(PR[o.p])r.p=o.p;if(o.c&&typeof o.c=='object')VARS.forEach(function(x){if(hex.test(o.c[x[0]]))r.c[x[0]]=o.c[x[0]]});
 r.bw=num(o.bw,0,4,1);r.rad=num(o.rad,0,24,10);r.tf=num(o.tf,-1,FONTS.length-1,-1);r.cl=o.cl===0?0:1;r.an=o.an===0?0:1;
 if(o.v&&typeof o.v=='object')SLOTS.forEach(function(x){if(o.v[x[0]]!=null)r.v[x[0]]=num(o.v[x[0]],0,100,x[3])});return r}
function save(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
var mq=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null;
function base(){return st.p=='auto'?PR[mq&&mq.matches?'dark':'light']:PR[st.p]}
function cur(){var b=base().v,o={};VARS.forEach(function(x){o[x[0]]=st.c[x[0]]||b[x[0]]});return o}
function rgb(h){h=String(h||'').replace('#','');if(h.length==3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);return isNaN(n)?[0,0,0]:[n>>16&255,n>>8&255,n&255]}
function lum(h){return rgb(h).map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce(function(a,v,i){return a+v*[.2126,.7152,.0722][i]},0)}
function on(h){var l=lum(h);return (1.05/(l+.05))>=((l+.05)/.05)?'#ffffff':'#111418'}
function apply(){
 var s=DOC.style,custom=st.p!='auto'||Object.keys(st.c).length;
 VARS.forEach(function(x){s.removeProperty('--'+x[0])});['--on-ac','--on-hp'].forEach(function(p){s.removeProperty(p)});
 var v=cur(),dark=lum(v.bg)<.2;
 if(custom){VARS.forEach(function(x){s.setProperty('--'+x[0],v[x[0]])});s.setProperty('--on-ac',on(v.ac));s.setProperty('--on-hp',on(v.hp));DOC.setAttribute('data-theme',dark?'dark':'light')}else DOC.removeAttribute('data-theme');
 s.colorScheme=dark?'dark':'light';DOC.classList.toggle('noan',!st.an);
 s.setProperty('--bw',(+st.bw)+'px');s.setProperty('--rad',(+st.rad)+'px');
 var tf=st.tf>=0?FONTS[st.tf]:(base().tf?FONTS[1]:null);if(tf)s.setProperty('--tf',tf[0]);else s.removeProperty('--tf');
 SLOTS.forEach(function(x){var k=x[0],u=URLS[k];DOC.classList.toggle('ti-'+k,!!u);if(u){s.setProperty('--i-'+k,'url("'+u+'")');s.setProperty('--v-'+k,(st.v[k]!=null?st.v[k]:x[3])+'%')}else s.removeProperty('--i-'+k)});
 var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',v.cd);
}
if(mq&&mq.addEventListener)mq.addEventListener('change',function(){apply();if(document.getElementById('thx'))draw()});
apply();

/* immagini in IndexedDB */
function idb(){return new Promise(function(ok,ko){if(db)return ok(db);if(!window.indexedDB)return ko(new Error('IndexedDB non disponibile'));var r=indexedDB.open('ddimg',1);r.onupgradeneeded=function(){r.result.createObjectStore('i')};r.onsuccess=function(){db=r.result;ok(db)};r.onerror=function(){ko(r.error)}})}
function tx(mode,f){return idb().then(function(d){return new Promise(function(ok,ko){var t=d.transaction('i',mode),q=f(t.objectStore('i'));t.oncomplete=function(){ok(q&&q.result)};t.onerror=t.onabort=function(){ko(t.error)}})})}
function setU(k,b){if(URLS[k])URL.revokeObjectURL(URLS[k]);if(b)URLS[k]=URL.createObjectURL(b);else delete URLS[k]}
tx('readonly',function(o){return o.getAllKeys()}).then(function(keys){return Promise.all((keys||[]).map(function(k){return tx('readonly',function(o){return o.get(k)}).then(function(b){if(b)setU(k,b)})}))}).then(apply).catch(function(){});
function shrink(f,max){return new Promise(function(ok,ko){var u=URL.createObjectURL(f),im=new Image();im.onload=function(){var sc=Math.min(1,max/Math.max(im.naturalWidth,im.naturalHeight)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.naturalWidth*sc));c.height=Math.max(1,Math.round(im.naturalHeight*sc));c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(function(b){b?ok(b):ko(new Error('conversione'))},f.type=='image/png'?'image/png':'image/jpeg',.85)};im.onerror=function(){URL.revokeObjectURL(u);ko(new Error('formato non leggibile'))};im.src=u})}
function msg(h){try{T(h)}catch(e){}}

/* pannello */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function draw(){
 var mo=document.getElementById('mo');if(!mo)return;var old=mo.querySelector('.sh'),top=old?old.scrollTop:0,v=cur();
 var h='<div class="r" style="justify-content:space-between"><h3>Personalizza l\'aspetto</h3><button class="b o" onclick="closeTh()">Chiudi</button></div>';
 h+='<div class="ths">Tema</div><div class="thp">'+Object.keys(PR).map(function(k){var p=PR[k],c=k=='auto'?[PR.light.v.bg,PR.light.v.ac,PR.dark.v.bg,PR.dark.v.ac]:[p.v.bg,p.v.cd,p.v.ac,p.v.hp];return '<button class="'+(st.p==k?'on':'')+'" onclick="thSet(\'p\',\''+k+'\')" style="background:'+(k=='auto'?PR.light.v.cd:p.v.cd)+';color:'+(k=='auto'?PR.light.v.ink:p.v.ink)+'"><i>'+c.map(function(x){return '<span style="background:'+x+'"></span>'}).join('')+'</i><small>'+p.n+'</small></button>'}).join('')+'</div>';
 h+='<div class="ths">Colori</div><div class="thc">'+VARS.map(function(x){return '<label><input type="color" value="'+v[x[0]]+'" oninput="thCol(\''+x[0]+'\',this.value)"><span>'+x[1]+(st.c[x[0]]?' *':'')+'</span></label>'}).join('')+'</div>';
 h+=(Object.keys(st.c).length?'<button class="b o" style="margin-top:6px" onclick="thSet(\'c\',{})">Torna ai colori del tema</button>':'<small class="mu">Cambia un colore per sovrascrivere quello del tema (segnato con *).</small>');
 h+='<div class="ths">Contorni e forme</div><label>Spessore dei contorni: <b id="thbw">'+st.bw+' px</b><input type="range" min="0" max="4" step="1" value="'+st.bw+'" oninput="thNum(\'bw\',this.value,\'thbw\',\' px\')"></label><label>Angoli: <b id="thrad">'+st.rad+' px</b><input type="range" min="0" max="24" step="1" value="'+st.rad+'" oninput="thNum(\'rad\',this.value,\'thrad\',\' px\')"></label>';
 h+='<label>Carattere dei titoli<select onchange="thSet(\'tf\',+this.value)"><option value="-1"'+(st.tf<0?' selected':'')+'>Quello del tema</option>'+FONTS.map(function(f,i){return '<option value="'+i+'"'+(st.tf==i?' selected':'')+' style="font-family:'+esc(f[0])+'">'+f[1]+'</option>'}).join('')+'</select></label>';
 h+='<div class="ths">Immagini</div><small class="mu">Una foto o un disegno per ogni parte. Il velo copre l\'immagine col colore del tema, così il testo resta leggibile: più è alto, più l\'immagine è tenue.</small>';
 h+=SLOTS.map(function(x){var k=x[0],u=URLS[k],vv=st.v[k]!=null?st.v[k]:x[3];return '<div class="thi"><div class="pv" style="'+(u?'background-image:url(&quot;'+u+'&quot;)':'')+'"></div><div class="bd"><b>'+x[1]+'</b>'+(u?'<label style="margin:2px 0">Velo: <b id="thv'+k+'">'+vv+'%</b><input type="range" min="0" max="100" step="5" value="'+vv+'" oninput="thVeil(\''+k+'\',this.value)"></label>':'<br><small class="mu">Nessuna immagine</small>')+'</div><div class="r" style="flex:none;flex-direction:column;align-items:stretch;gap:4px"><label class="b o" style="margin:0;text-align:center">'+(u?'Cambia':'Scegli')+'<input type="file" accept="image/*" hidden onchange="thImg(\''+k+'\',this)"></label>'+(u?'<button class="b o" onclick="thImg(\''+k+'\',null)">Togli</button>':'')+'</div></div>'}).join('');
 h+='<div class="ths">Lettura e movimento</div><label style="display:flex;gap:8px;align-items:center;color:var(--ink)"><input type="checkbox" '+(st.cl?'checked':'')+' onchange="thSet(\'cl\',this.checked?1:0)"> Accorcia le descrizioni lunghe (tocca "Mostra tutto" per leggerle)</label><label style="display:flex;gap:8px;align-items:center;color:var(--ink)"><input type="checkbox" '+(st.an?'checked':'')+' onchange="thSet(\'an\',this.checked?1:0)"> Animazioni (pulsanti, schermate, finestre)</label>';
 h+='<div class="ths">Salva l\'aspetto</div><small class="mu">Tema, colori e immagini vanno in un file a parte, oppure insieme a giocatori e mostri da Salva e importa.</small><div class="r" style="margin-top:6px"><button class="b o" onclick="closeTh();sxAsp()">Salva o importa l\'aspetto</button></div>';
 h+='<div class="r" style="margin-top:14px;justify-content:space-between"><button class="b d" onclick="thReset()">Ripristina tutto</button><small class="mu">Scheda D&amp;D v'+esc(window.APP_VER||'')+'</small></div>';
 mo.innerHTML='<div class="ov" onclick="if(event.target==this)closeTh()"><div class="sh" id="thx">'+h+'</div></div>';
 var nw=mo.querySelector('.sh');if(nw)nw.scrollTop=top;
}
window.thOpen=function(){draw()};
window.closeTh=function(){var mo=document.getElementById('mo');if(mo)mo.innerHTML=''};
window.thSet=function(k,v){st[k]=v;if(k=='p')st.c={};save();apply();draw()};
window.thCol=function(k,v){st.c[k]=v;save();apply()};
window.thNum=function(k,v,id,u){st[k]=+v;save();apply();var e=document.getElementById(id);if(e)e.textContent=v+u};
window.thVeil=function(k,v){st.v[k]=+v;save();apply();var e=document.getElementById('thv'+k);if(e)e.textContent=v+'%'};
window.thImg=function(k,inp){var sl=SLOTS.filter(function(x){return x[0]==k})[0];if(!sl)return;
 if(!inp){tx('readwrite',function(o){return o.delete(k)}).catch(function(){}).then(function(){setU(k,null);apply();draw()});return}
 var f=inp.files&&inp.files[0];if(!f)return;
 shrink(f,sl[2]).then(function(b){return tx('readwrite',function(o){return o.put(b,k)}).then(function(){setU(k,b);apply();draw()})}).catch(function(e){msg('<b>Immagine non caricata</b><small>'+esc(e&&e.message||e)+'</small>')})};
window.thReset=function(){if(!confirm('Tornare al tema automatico, senza colori e immagini personalizzati?'))return;st=JSON.parse(JSON.stringify(DEF));save();tx('readwrite',function(o){return o.clear()}).catch(function(){}).then(function(){Object.keys(URLS).forEach(function(k){setU(k,null)});apply();draw();clampAll(document)})};

/* aspetto dentro un file: le immagini viaggiano come data URL, al rientro tornano blob in IndexedDB */
function b2u(b){return new Promise(function(ok,ko){var r=new FileReader();r.onload=function(){ok(String(r.result))};r.onerror=function(){ko(r.error)};r.readAsDataURL(b)})}
window.thHasImg=function(){return Object.keys(URLS).length};
window.thExport=function(){var o={v:1,st:JSON.parse(JSON.stringify(st)),img:{}};return tx('readonly',function(s){return s.getAllKeys()}).catch(function(){return []}).then(function(keys){return Promise.all((keys||[]).filter(function(k){return SLOTS.some(function(x){return x[0]==k})}).map(function(k){return tx('readonly',function(s){return s.get(k)}).then(function(b){return b?b2u(b).then(function(u){o.img[k]=u}):null})}))}).then(function(){return o})};
var DURL=/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+\/=]+$/;
window.thValid=function(o){return !!(o&&typeof o=='object'&&o.st&&typeof o.st=='object'&&PR[o.st.p])};
window.thImport=function(o){if(!thValid(o))return Promise.reject(new Error('aspetto non valido'));var im=o.img&&typeof o.img=='object'?o.img:{},n=0;
 st=clean(o.st);save();
 return tx('readwrite',function(s){return s.clear()}).catch(function(){}).then(function(){Object.keys(URLS).forEach(function(k){setU(k,null)});
  return Promise.all(SLOTS.map(function(x){var u=im[x[0]];if(typeof u!='string'||u.length>8e6||!DURL.test(u))return null;return fetch(u).then(function(r){return r.blob()}).then(function(b){return tx('readwrite',function(s){return s.put(b,x[0])}).then(function(){setU(x[0],b);n++})}).catch(function(){})}))}).then(function(){apply();clampAll(document);return n})};

/* testi lunghi: 3 righe e un tasto "Mostra tutto"; lo stato aperto sopravvive ai ridisegni */
var OPEN={},MIN=180;
function key(t){return t.length+':'+t.slice(0,60)}
function clampOne(e){
 if(e.dataset.clp||!e.offsetParent)return;
 if(e.closest('.t,#tt,summary,button,label,.clp,#thx,.tbl,.hd,.spv,.bk')||e.classList.contains('spd')||e.classList.contains('sps'))return;
 if(e.querySelector('button,input,select,textarea,details,p,div,.c,ul,ol,table'))return;
 var t=(e.textContent||'').trim();if(t.length<MIN)return;
 var pa=e.parentElement,cs=pa&&getComputedStyle(pa);if(cs&&/flex|grid/.test(cs.display)&&!/column/.test(cs.flexDirection))return;
 e.dataset.clp=1;e.classList.add('clp');
 if(e.scrollHeight<=e.clientHeight+2){e.classList.remove('clp');return}
 var k=key(t),b=document.createElement('button');b.type='button';b.className='more';
 var set=function(o){e.classList.toggle('op',o);b.textContent=o?'Mostra meno':'Mostra tutto'};set(!!OPEN[k]);
 b.onclick=function(ev){ev.stopPropagation();ev.preventDefault();var o=!e.classList.contains('op');if(o)OPEN[k]=1;else delete OPEN[k];set(o)};
 e.insertAdjacentElement('afterend',b);
}
/* righe fatte solo di pulsanti: colonne uguali; se un'etichetta non ci sta si dimezzano (4 -> 2x2 -> 1), mai 3+1 */
function btnRows(root){(root||document).querySelectorAll('#app .r,#mo .r').forEach(function(r){if(!r.offsetParent||r.classList.contains('g3')||r.querySelector(':scope>.pip')||r.closest('.znq,.its'))return;var k=r.children;if(k.length<2||r.dataset.bto==k.length)return;
 for(var i=0;i<k.length;i++){var e=k[i];if(!(e.tagName=='BUTTON'||e.classList.contains('b')||e.classList.contains('chip'))||e.tagName=='SPAN'&&!e.onclick&&!e.getAttribute('onclick'))return}
 if(k.length>6)return;r.dataset.bto=k.length;r.classList.add('bto');var n=k.length;
 var fits=function(){for(var j=0;j<k.length;j++)if(k[j].scrollWidth>k[j].clientWidth+1)return false;return true};
 while(true){r.style.setProperty('--n',n);r.classList.toggle('odd',n>1&&k.length%n!=0&&n==2);if(n==1||fits())break;n=n>3?Math.ceil(n/2):n-1}})}
function clampAll(root){
 btnRows(root);
 /* un pulsante che anche da solo sulla riga non ci sta: meglio due righe che il testo tagliato */
 (root||document).querySelectorAll('#app .b:not(.wr),#app .chip:not(.wr),#mo .b:not(.wr),#mo .chip:not(.wr)').forEach(function(b){if(b.offsetParent&&b.scrollWidth>b.clientWidth+1)b.classList.add('wr')});
 if(!st.cl){document.querySelectorAll('.clp').forEach(function(e){e.classList.remove('clp','op');delete e.dataset.clp;var n=e.nextElementSibling;if(n&&n.className=='more')n.remove()});return}
 (root||document).querySelectorAll('#app p,#app small,#app .mu,#app .tx,#mo p,#mo small,#mo .mu').forEach(clampOne)}
window.thClamp=clampAll;
var pend=0;function soon(){if(pend)return;pend=requestAnimationFrame(function(){pend=0;clampAll(document)})}
/* animazioni: partono solo quando cambia davvero schermata, finestra o messaggio, non a ogni ridisegno */
var lastK=null,lastHp=null,hadOv=false,animT=0;
function scrKey(){try{return [S.role,S.ch?S.chs.indexOf(S.ch):'-',S.ch?TAB:'',S.role=='dm'?DT:'',W&&W.on?W.s:''].join('|')}catch(e){return ''}}
function onApp(){if(!st.an)return;var k=scrKey(),hp=document.querySelector('#app .hp');
 if(k!==lastK){lastK=k;DOC.classList.add('an-enter');clearTimeout(animT);animT=setTimeout(function(){DOC.classList.remove('an-enter')},700);var on=document.querySelector('nav .on');if(on)on.classList.add('in');lastHp=hp?hp.textContent:null;return}
 if(hp){var v=hp.textContent;if(lastHp!=null&&v!==lastHp)hp.classList.add('bump');lastHp=v}}
function onMo(){var mo=document.getElementById('mo'),ov=mo&&mo.querySelector('.ov');if(ov&&!hadOv&&st.an)ov.classList.add('in');hadOv=!!ov}
function onTt(){var e=document.querySelector('#tt .t');if(e&&st.an)e.classList.add('in')}
function ripple(ev){if(!st.an)return;var b=ev.target&&ev.target.closest&&ev.target.closest('.b,.chip,.role,.tile,.hp,.rb,nav button,.thp button');if(!b||b.disabled)return;var r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),s=document.createElement('span');s.className='rip';s.style.width=s.style.height=d+'px';s.style.left=(ev.clientX-r.left-d/2)+'px';s.style.top=(ev.clientY-r.top-d/2)+'px';b.appendChild(s);setTimeout(function(){s.remove()},600)}
/* il toggle arriva anche quando un ridisegno ricrea un details gia aperto: si anima solo quello toccato */
var sumD=null;document.addEventListener('click',function(ev){var s=ev.target&&ev.target.closest&&ev.target.closest('summary');sumD=s?s.parentElement:null},true);
function watch(){var ap=document.getElementById('app'),mo=document.getElementById('mo'),tt=document.getElementById('tt');
 if(ap)new MutationObserver(function(){onApp();soon()}).observe(ap,{childList:true,subtree:true});
 if(mo)new MutationObserver(function(){onMo();soon()}).observe(mo,{childList:true,subtree:true});
 if(tt)new MutationObserver(onTt).observe(tt,{childList:true,subtree:true});
 document.addEventListener('pointerdown',ripple,true);document.addEventListener('toggle',function(ev){var d=ev.target;if(d&&d.tagName=='DETAILS'){if(d.open&&st.an&&d===sumD){sumD=null;d.classList.add('dop');setTimeout(function(){d.classList.remove('dop')},400)}soon()}},true);addEventListener('resize',soon);soon()}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',watch);else watch();
})();
