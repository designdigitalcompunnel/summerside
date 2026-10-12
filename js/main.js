const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>45),{passive:true});

const menu=document.querySelector('.menu-btn');
menu?.addEventListener('click',()=>{
  document.body.classList.toggle('mobile-open');
  menu.setAttribute('aria-expanded',document.body.classList.contains('mobile-open'));
  let panel=document.querySelector('.mobile-panel');
  if(!panel){
    panel=document.createElement('div');
    panel.className='mobile-panel';
    const isServicesPage=window.location.pathname.endsWith('services.html');
    panel.innerHTML=isServicesPage?`<button class="mobile-close" aria-label="Close menu">×</button><a href="index.html#top">HOME</a><a href="services.html#popular">SERVICES</a><a href="#departments">DEPARTMENTS</a><a href="#categories">RESIDENTS</a><a href="#categories">BUSINESS</a><a href="index.html#government">GOVERNMENT</a><a href="index.html#news">NEWS & EVENTS</a>`:`<button class="mobile-close" aria-label="Close menu">×</button><a href="#services">SERVICES</a><a href="#departments">DEPARTMENTS</a><a href="#residents">RESIDENTS</a><a href="#business">BUSINESS</a><a href="#government">GOVERNMENT</a><a href="#news">NEWS & EVENTS</a><a href="#top">HOME</a>`;
    if(!document.body.classList.contains('light-theme')) panel.classList.add('dark-mode');
    document.body.appendChild(panel);
    panel.querySelector('.mobile-close').onclick=()=>{document.body.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false')};
    panel.querySelectorAll('a').forEach(a=>a.onclick=()=>{document.body.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false')});
    const s=document.createElement('style');
    s.textContent=`.mobile-panel{position:fixed;z-index:140;inset:0;background:#f5f9fb;color:#17232b;display:flex;flex-direction:column;justify-content:center;padding:10vw;gap:24px;transform:translateX(100%);transition:.4s}.mobile-open .mobile-panel{transform:none}.mobile-panel a{font:800 48px/.95 'Barlow Condensed';text-transform:uppercase}.mobile-panel a:hover{color:#C8102E}.mobile-close{position:absolute;top:24px;right:7vw;background:none;border:0;color:#17232b;font-size:42px}.mobile-panel.dark-mode{background:#171717;color:#fff}.mobile-panel.dark-mode .mobile-close{color:#fff}`;
    document.head.appendChild(s);
  }
});

const searchPanel=document.getElementById('searchPanel');
const searchTrigger=document.getElementById('searchTrigger');
const searchClose=document.getElementById('searchClose');
const siteSearch=document.getElementById('siteSearch');
searchTrigger?.addEventListener('click',()=>{searchPanel.classList.add('open');searchPanel.setAttribute('aria-hidden','false');setTimeout(()=>siteSearch.focus(),80)});
searchClose?.addEventListener('click',()=>{searchPanel.classList.remove('open');searchPanel.setAttribute('aria-hidden','true')});
window.addEventListener('keydown',e=>{if(e.key==='Escape'){searchPanel.classList.remove('open');searchPanel.setAttribute('aria-hidden','true')}});
document.getElementById('searchForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const value=siteSearch.value.trim();
  document.getElementById('searchResult').textContent=value?`Search interface ready for “${value}”. Connect this field to the final CMS/search index in development.`:'Enter a service, department, document, news topic or event.';
});

const revealItems=document.querySelectorAll('.quick-card,.service-card,.department-card,.news-card,.event-list article,.number-block');
revealItems.forEach(el=>el.classList.add('reveal'));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
revealItems.forEach(el=>observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href'));
  if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}
}));

document.addEventListener('DOMContentLoaded',()=>{
  const a=document.getElementById('assistanceSearch');
  const input=document.getElementById('serviceInput');
  if(a && input) a.addEventListener('click',()=>setTimeout(()=>input.focus(),250));
});



// Floating accessibility options shared by both pages.
(()=>{
 const fab=document.getElementById('accessibilityFab'),panel=document.getElementById('accessibilityPanel'),close=document.getElementById('accessibilityClose');
 if(!fab||!panel)return;
 const setOpen=open=>{panel.hidden=!open;fab.setAttribute('aria-expanded',String(open));if(open)panel.querySelector('button')?.focus()};
 fab.addEventListener('click',()=>setOpen(panel.hidden));close?.addEventListener('click',()=>{setOpen(false);fab.focus()});
 panel.querySelectorAll('[data-accessibility]').forEach(button=>button.addEventListener('click',()=>{
  const action=button.dataset.accessibility,body=document.body;
  if(action==='larger'){body.classList.remove('a11y-smaller');body.classList.add('a11y-larger')}
  else if(action==='smaller'){body.classList.remove('a11y-larger');body.classList.add('a11y-smaller')}
  else if(action==='contrast')body.classList.toggle('a11y-high-contrast');
  else if(action==='links')body.classList.toggle('a11y-underline');
  else if(action==='theme'){body.classList.toggle('light-theme');button.setAttribute('aria-pressed',String(!body.classList.contains('light-theme')));button.textContent=body.classList.contains('light-theme')?'Switch to dark theme':'Switch to light theme';}
  else {body.classList.remove('a11y-larger','a11y-smaller','a11y-high-contrast','a11y-underline');body.classList.add('light-theme');const themeButton=panel.querySelector('[data-accessibility="theme"]');if(themeButton){themeButton.setAttribute('aria-pressed','false');themeButton.textContent='Switch to dark theme';}}
 }));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){setOpen(false);fab.focus()}});
})();
