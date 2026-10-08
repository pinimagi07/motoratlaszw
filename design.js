/* Motor Atlas — Midnight Showroom interactions
   Adds a short welcome gesture, desktop side rail, restrained scroll reveals,
   and a tabbed navigation layer inside the existing vehicle-detail dialog. */
(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('atlas-design-v1');

  /* Welcome gesture: once per tab/session so repeat visitors are not delayed. */
  try{
    if(!reduced&&!sessionStorage.getItem('motorAtlasWelcomeSeen')){
      const splash=document.createElement('div');
      splash.className='atlas-welcome';
      splash.setAttribute('aria-hidden','true');
      splash.innerHTML='<div class="atlas-welcome-inner"><div class="atlas-welcome-mark">M∕</div><div class="atlas-welcome-name">MOTOR ATLAS</div><div class="atlas-welcome-line"></div></div>';
      document.body.appendChild(splash);
      sessionStorage.setItem('motorAtlasWelcomeSeen','1');
      window.setTimeout(()=>splash.classList.add('is-leaving'),1050);
      window.setTimeout(()=>splash.remove(),1550);
    }
  }catch(_){/* sessionStorage can be unavailable in strict private modes */}

  /* Desktop navigation rail: intentionally compact and hidden on tablets/mobile. */
  if(!document.querySelector('.atlas-side-rail')){
    const rail=document.createElement('aside');
    rail.className='atlas-side-rail';
    rail.setAttribute('aria-label','Motor Atlas quick navigation');
    rail.innerHTML=`
      <div class="atlas-rail-logo" aria-hidden="true">M∕</div>
      <nav>
        <button type="button" data-atlas-scroll="top"><span class="rail-icon">⌂</span><span>Home</span></button>
        <a href="#brandBrowser"><span class="rail-icon">◇</span><span>Brands</span></a>
        <button type="button" data-atlas-filter="JDM"><span class="rail-icon">J</span><span>JDM</span></button>
        <button type="button" data-atlas-filter="Pickups"><span class="rail-icon">▱</span><span>Pickups</span></button>
        <button type="button" data-atlas-filter="Electric"><span class="rail-icon">ϟ</span><span>EV</span></button>
        <button type="button" data-atlas-filter="3D"><span class="rail-icon">◫</span><span>3D</span></button>
      </nav>`;
    document.body.appendChild(rail);
    document.body.classList.add('atlas-rail-enabled');

    rail.addEventListener('click',e=>{
      const scroll=e.target.closest('[data-atlas-scroll]');
      if(scroll){window.scrollTo({top:0,behavior:reduced?'auto':'smooth'});return;}
      const filter=e.target.closest('[data-atlas-filter]');
      if(filter){
        const value=filter.dataset.atlasFilter;
        const target=document.querySelector(`[data-collection="${CSS.escape(value)}"]`);
        if(target){target.click();document.querySelector('#catalogue')?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});}
      }
    });
  }

  /* Reveal large sections as they enter the viewport; cards retain their own hover motion. */
  const markReveal=el=>{
    if(!el||el.dataset.atlasReveal==='1')return;
    el.dataset.atlasReveal='1';
    if(reduced){el.classList.add('atlas-reveal-visible');return;}
    el.classList.add('atlas-reveal-pending');
    revealObserver.observe(el);
  };
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.remove('atlas-reveal-pending');
        entry.target.classList.add('atlas-reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.08,rootMargin:'0px 0px -5% 0px'});

  document.querySelectorAll('.brand-browser,.toolbar,.scope,.brand-group,footer').forEach(markReveal);

  const grid=document.getElementById('grid');
  if(grid){
    const gridObserver=new MutationObserver(()=>grid.querySelectorAll('.brand-group').forEach(markReveal));
    gridObserver.observe(grid,{childList:true,subtree:true});
  }

  /* Convert the existing specification modal into a navigable showroom panel. */
  const dialog=document.getElementById('dialog');
  const content=document.getElementById('dialogContent');
  if(dialog&&content){
    const enhanceDialog=()=>{
      const hero=content.querySelector('.detailhero');
      if(!hero||content.querySelector('.atlas-detail-tabs'))return;

      hero.id='atlasOverview';
      const viewer=content.querySelector('.vehicle-viewer');
      const specs=content.querySelector('.specsections');
      const sources=content.querySelector('.sourcebox');
      if(viewer)viewer.id='atlasViewer';
      if(specs)specs.id='atlasSpecs';
      if(sources)sources.id='atlasSources';

      const tabs=document.createElement('div');
      tabs.className='atlas-detail-tabs';
      tabs.setAttribute('role','navigation');
      tabs.setAttribute('aria-label','Vehicle detail sections');
      tabs.innerHTML=`
        <button type="button" class="active" data-atlas-detail="atlasOverview">Overview</button>
        ${specs?'<button type="button" data-atlas-detail="atlasSpecs">Specifications</button>':''}
        ${viewer?'<button type="button" data-atlas-detail="atlasViewer">3D view</button>':''}
        ${sources?'<button type="button" data-atlas-detail="atlasSources">Sources</button>':''}`;
      hero.insertAdjacentElement('afterend',tabs);

      tabs.addEventListener('click',e=>{
        const btn=e.target.closest('[data-atlas-detail]');
        if(!btn)return;
        tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===btn));
        const target=content.querySelector('#'+CSS.escape(btn.dataset.atlasDetail));
        if(!target)return;
        const top=target===hero?0:Math.max(0,target.offsetTop-tabs.offsetHeight-72);
        dialog.scrollTo({top,behavior:reduced?'auto':'smooth'});
      });
    };

    const dialogObserver=new MutationObserver(enhanceDialog);
    dialogObserver.observe(content,{childList:true,subtree:true});
    dialog.addEventListener('close',()=>dialog.scrollTop=0);
  }
})();
