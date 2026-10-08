/* Motor Atlas responsive behaviour
   - Normalises viewport support.
   - Adds a touch-friendly hamburger menu only on small screens.
   - Closes the menu on navigation, Escape, outside click, resize/orientation.
   The desktop navigation structure and branding stay unchanged. */
(()=>{
  const MOBILE_MAX=767;

  // Ensure the viewport definition requested by the responsive audit is exact.
  let viewport=document.querySelector('meta[name="viewport"]');
  if(!viewport){
    viewport=document.createElement('meta');
    viewport.name='viewport';
    document.head.prepend(viewport);
  }
  viewport.setAttribute('content','width=device-width, initial-scale=1.0');

  const header=document.querySelector('header');
  const nav=header?.querySelector('nav');
  if(!header||!nav)return;

  // Give the existing navigation an accessible relationship with the new toggle.
  if(!nav.id)nav.id='siteNavigation';

  let toggle=document.getElementById('mobileMenuToggle');
  if(!toggle){
    toggle=document.createElement('button');
    toggle.id='mobileMenuToggle';
    toggle.className='mobile-menu-toggle';
    toggle.type='button';
    toggle.setAttribute('aria-label','Open navigation menu');
    toggle.setAttribute('aria-controls',nav.id);
    toggle.setAttribute('aria-expanded','false');
    toggle.innerHTML='<span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>';

    const regional=header.querySelector('.regional');
    header.insertBefore(toggle,regional||nav.nextSibling);
  }

  const closeMenu=(returnFocus=false)=>{
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation menu');
    if(returnFocus)toggle.focus();
  };

  const openMenu=()=>{
    header.classList.add('nav-open');
    toggle.setAttribute('aria-expanded','true');
    toggle.setAttribute('aria-label','Close navigation menu');
  };

  toggle.addEventListener('click',()=>{
    header.classList.contains('nav-open')?closeMenu():openMenu();
  });

  // Close after a menu item is used so the destination is immediately visible.
  nav.addEventListener('click',e=>{
    if(e.target.closest('a,button')&&window.innerWidth<=MOBILE_MAX)closeMenu();
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&header.classList.contains('nav-open'))closeMenu(true);
  });

  document.addEventListener('pointerdown',e=>{
    if(window.innerWidth<=MOBILE_MAX&&header.classList.contains('nav-open')&&!header.contains(e.target))closeMenu();
  });

  const syncLayout=()=>{
    if(window.innerWidth>MOBILE_MAX)closeMenu();
  };
  window.addEventListener('resize',syncLayout,{passive:true});
  window.addEventListener('orientationchange',syncLayout,{passive:true});

  // Improve image decode/loading behaviour without changing the visual presentation.
  document.querySelectorAll('img').forEach((img,index)=>{
    if(index>0&&!img.hasAttribute('loading'))img.loading='lazy';
    if(!img.hasAttribute('decoding'))img.decoding='async';
  });

  // BMW cards are injected later; apply the same image hints when they appear.
  const observer=new MutationObserver(records=>{
    for(const record of records){
      record.addedNodes.forEach(node=>{
        if(!(node instanceof Element))return;
        const images=node.matches('img')?[node]:[...node.querySelectorAll('img')];
        images.forEach(img=>{
          if(!img.hasAttribute('loading'))img.loading='lazy';
          if(!img.hasAttribute('decoding'))img.decoding='async';
        });
      });
    }
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
