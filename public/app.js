const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
matchMedia('(min-width:821px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const dialog=document.querySelector('#art-dialog');
for(const button of document.querySelectorAll('[data-art]'))button.addEventListener('click',()=>{document.querySelector('#art-title').textContent=button.dataset.title;const art=document.querySelector('#art-image');art.src=button.dataset.art;art.alt=button.dataset.title;document.querySelector('#art-caption').textContent=button.dataset.caption;dialog.showModal();});
document.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
const store={get(key){try{return localStorage.getItem(key);}catch{return null;}},set(key,value){try{localStorage.setItem(key,value);}catch{}},remove(key){try{localStorage.removeItem(key);}catch{}}};
const reader=document.querySelector('.reader-prose');
if(reader){
 let size=Number(store.get('fyre-reader-size'))||24;size=Math.min(32,Math.max(20,size));
 let light=store.get('fyre-reader-light')==='true';
 const apply=()=>{reader.style.setProperty('--reader-size',size+'px');document.body.classList.toggle('reader-light',light);const toggle=document.querySelector('[data-reader="theme"]');toggle.textContent=light?'Dark page':'Light page';toggle.setAttribute('aria-pressed',String(light));document.querySelector('[data-reader="smaller"]').disabled=size<=20;document.querySelector('[data-reader="larger"]').disabled=size>=32;};
 apply();
 for(const button of document.querySelectorAll('[data-reader]'))button.addEventListener('click',()=>{if(button.dataset.reader==='theme')light=!light;else size=Math.max(20,Math.min(32,size+(button.dataset.reader==='larger'?2:-2)));apply();store.set('fyre-reader-size',String(size));store.set('fyre-reader-light',String(light));document.querySelector('#reader-status').textContent=`Reading text ${size} pixels, ${light?'light':'dark'} page.`;});
 let ticking=false;
 const update=()=>{const rect=reader.getBoundingClientRect();const total=Math.max(1,reader.offsetHeight-innerHeight);document.querySelector('.reading-progress').style.width=Math.max(0,Math.min(100,(-rect.top/total)*100))+'%';ticking=false;};
 addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});update();
}
document.querySelector('#clear-preferences')?.addEventListener('click',()=>{store.remove('fyre-reader-size');store.remove('fyre-reader-light');document.querySelector('#privacy-status').textContent='Reading preferences cleared.';});
