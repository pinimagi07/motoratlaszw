/* Motor Atlas — Midnight Showroom interaction layer
   Adds: welcome gesture, desktop navigation rail, scroll progress,
   micro-interactions, and tabbed premium vehicle details. */
(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Welcome gesture: once per browser session so repeat visits stay quick.
  if(!reduced && !sessionStorage.getItem('motorAtlasWelcomeSeen')){
    const welcome=document.createElement('div');
    welcome.className='atlas-welcome';
    welcome.setAttribute('aria-hidden','true');
    welcome.innerHTML='<div class="atlas-welcome-inner"><div class="atlas-welcome-mark">M∕</div><div class="atlas-welcome-name">MOTOR ATLAS</div><div class="atlas-welcome-sub">DRIVE A BRIGHTER TOMORROW</div></div>';
    document.body.appendChild(welcome);
    sessionStorage.setItem('motorAtlasWelcomeSeen','1');
    setTimeout(()=>welcome.classList.add('hide'),1450);
    setTimeout(()=>welcome.remove(),2000);
  }

  // Left-side showroom navigation for larger screens.
  const rail=document.createElement('aside');
  rail.className='atlas-rail';
  rail.setAttribute('aria-label','Quick showroom navigation');
  const railItems=[
    ['⌂','Home',()=>window.scrollTo({top:0,behavior:'smooth'})],
    ['◇','Brands',()=>document.getElementById('brandBrowser')?.scrollIntoView({behavior:'smooth',block:'start'})],
    ['▦','Cars',()=>document.getElementById('catalogue')?.scrollIntoView({behavior:'smooth',block:'start'})],
    ['▱','Pickups',()=>document.querySelector('[data-collection="Pickups"]')?.click()],
    ['ϟ','Electric',()=>document.querySelector('[data-collection="Electric"]')?.click()],
    ['◉','3D',()=>document.querySelector('[data-collection="3D"]')?.click()],
    ['≡','Compare',()=>document.getElementById('comparebar')?.scrollIntoView({behavior:'smooth',block:'center'})]
  ];
  railItems.forEach(([icon,label,action],index)=>{
    const b=document.createElement('button');
    b.type='button';b.dataset.label=label;b.setAttribute('aria-label',label);b.textContent=icon;
    if(index===0)b.classList.add('active');
    b.addEventListener('click',()=>{rail.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');action();});
    rail.appendChild(b);
  });
  document.body.appendChild(rail);

  // Right-side scroll progress.
  const progress=document.createElement('div');
  progress.className='atlas-progress';progress.setAttribute('aria-hidden','true');progress.innerHTML='<i></i>';
  document.body.appendChild(progress);
  const updateProgress=()=>{
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    const pct=Math.max(0,Math.min(100,(scrollY/max)*100));
    progress.firstElementChild.style.height=pct+'%';
    const buttons=rail.querySelectorAll('button');
    if(scrollY<220){buttons.forEach(x=>x.classList.remove('active'));buttons[0]?.classList.add('active');}
  };
  updateProgress();addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress,{passive:true});

  // Gentle pointer parallax on the hero, disabled for touch/reduced-motion.
  const intro=document.querySelector('.intro');
  if(intro && !reduced && matchMedia('(pointer:fine)').matches){
    intro.addEventListener('pointermove',e=>{
      const r=intro.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      intro.style.setProperty('--mx',`${x*10}px`);intro.style.setProperty('--my',`${y*7}px`);
    });
    intro.addEventListener('pointerleave',()=>{intro.style.removeProperty('--mx');intro.style.removeProperty('--my');});
  }

  // Button press glow/ripple without changing the site's semantics.
  document.addEventListener('pointerdown',e=>{
    const el=e.target.closest('button,.brand-switch button,.card');
    if(!el||reduced)return;
    el.animate([{filter:'brightness(1.12)'},{filter:'brightness(1)'}],{duration:220,easing:'ease-out'});
  });

  // Premium vehicle-detail tabs are injected only for actual vehicle dialogs.
  const dialogContent=document.getElementById('dialogContent');
  const enhanceVehicleDialog=()=>{
    if(!dialogContent?.querySelector('.detailhero')||dialogContent.querySelector('.showroom-tabs'))return;

    const detailHero=dialogContent.querySelector('.detailhero');
    const note=dialogContent.querySelector('.detailnote');
    const viewer=dialogContent.querySelector('.vehicle-viewer');
    const specs=dialogContent.querySelector('.specsections');
    const sources=dialogContent.querySelector('.sourcebox');

    // Pull a few high-value stats from the specification rows.
    if(specs){
      const pairs=[...specs.querySelectorAll('dl>div')].map(row=>({
        key:row.querySelector('dt')?.textContent?.trim()||'',
        value:row.querySelector('dd')?.textContent?.trim()||''
      }));
      const wanted=[/power/i,/torque/i,/drive/i,/fuel|engine/i];
      const used=new Set(),stats=[];
      wanted.forEach(rx=>{
        const p=pairs.find(x=>rx.test(x.key)&&!used.has(x.key));
        if(p){used.add(p.key);stats.push(p);}
      });
      if(stats.length){
        const wrap=document.createElement('div');wrap.className='showroom-stats';
        wrap.innerHTML=stats.slice(0,4).map(s=>`<div class="showroom-stat"><span>${s.key}</span><b>${s.value}</b></div>`).join('');
        detailHero.insertAdjacentElement('afterend',wrap);
      }
    }

    const tabs=document.createElement('div');tabs.className='showroom-tabs';tabs.setAttribute('role','tablist');
    const panels=[
      {name:'Overview',nodes:[note].filter(Boolean)},
      {name:'Specifications',nodes:[specs].filter(Boolean)},
      {name:'3D View',nodes:[viewer].filter(Boolean)},
      {name:'Sources',nodes:[sources].filter(Boolean)}
    ].filter(x=>x.nodes.length);

    const allNodes=panels.flatMap(x=>x.nodes);
    const activate=index=>{
      tabs.querySelectorAll('button').forEach((b,i)=>{const on=i===index;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on));});
      allNodes.forEach(n=>n.hidden=true);
      panels[index].nodes.forEach(n=>n.hidden=false);
    };
    panels.forEach((p,i)=>{
      const b=document.createElement('button');b.type='button';b.role='tab';b.textContent=p.name;b.setAttribute('aria-selected',String(i===0));if(i===0)b.classList.add('active');b.addEventListener('click',()=>activate(i));tabs.appendChild(b);
    });
    const stats=dialogContent.querySelector('.showroom-stats');
    (stats||detailHero).insertAdjacentElement('afterend',tabs);
    activate(0);
  };

  if(dialogContent){
    new MutationObserver(()=>requestAnimationFrame(enhanceVehicleDialog)).observe(dialogContent,{childList:true,subtree:true});
  }

  // Animate manufacturer chips when they are clicked.
  document.addEventListener('click',e=>{
    const brand=e.target.closest('[data-brand]');
    if(brand&&!reduced){brand.animate([{transform:'scale(.96)'},{transform:'scale(1.025)'},{transform:'scale(1)'}],{duration:320,easing:'ease-out'});}
  });
})();
