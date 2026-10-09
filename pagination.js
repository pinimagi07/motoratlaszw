/* Motor Atlas catalogue pagination
   Keeps the existing catalogue/filter engine intact and paginates the rendered cards.
   Desktop/tablet: whole brands, combining small brands up to 12 cars.
   Phones: existing 8-car numbered pages. */
(()=>{
  const grid=document.getElementById('grid');
  if(!grid)return;

  let currentPage=1;
  let lastPageSize=0;
  let frame=0;

  const nav=document.createElement('nav');
  nav.id='cataloguePagination';
  nav.className='catalogue-pagination';
  nav.setAttribute('aria-label','Catalogue pages');
  grid.insertAdjacentElement('afterend',nav);

  const pageSize=()=>window.innerWidth<=767?8:12;
  const cards=()=>[...grid.querySelectorAll('.brand-group .card')];
  const escapeLabel=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function buildPages(){
    const allCards=cards();
    if(pageSize()===8){
      return Array.from({length:Math.ceil(allCards.length/8)},(_,i)=>({cards:allCards.slice(i*8,i*8+8),brands:[]}));
    }
    const pages=[];
    let shared=null;
    for(const group of grid.querySelectorAll('.brand-group')){
      const groupCards=[...group.querySelectorAll('.card')];
      if(!groupCards.length)continue;
      const brand=group.dataset.brandGroup||group.querySelector('h2')?.textContent||'Cars';
      if(groupCards.length>=12){
        pages.push({cards:groupCards,brands:[brand]});
        shared=null;
      }else{
        if(!shared||shared.cards.length+groupCards.length>12){
          shared={cards:[],brands:[]};
          pages.push(shared);
        }
        shared.cards.push(...groupCards);
        shared.brands.push(brand);
      }
    }
    return pages;
  }

  const pageButtons=(page,total)=>{
    if(total<=7)return Array.from({length:total},(_,i)=>i+1);
    const values=[1,total,page-1,page,page+1].filter(n=>n>=1&&n<=total).sort((a,b)=>a-b);
    const unique=[...new Set(values)];
    const out=[];
    unique.forEach((n,i)=>{
      if(i&&n-unique[i-1]>1)out.push('…');
      out.push(n);
    });
    return out;
  };

  function renderNav(pages){
    const totalPages=pages.length;
    if(totalPages<=1){nav.hidden=true;nav.innerHTML='';return;}
    nav.hidden=false;
    const phone=pageSize()===8;
    const totalCards=pages.reduce((sum,page)=>sum+page.cards.length,0);
    const start=pages.slice(0,currentPage-1).reduce((sum,page)=>sum+page.cards.length,0)+1;
    const end=start+pages[currentPage-1].cards.length-1;
    const items=phone?pageButtons(currentPage,totalPages):pages.map((_,i)=>i+1);
    const controls=items.map(item=>item==='…'
      ? '<span class="page-ellipsis" aria-hidden="true">…</span>'
      : `<button type="button" data-page="${item}" class="${item===currentPage?'active':''}" ${item===currentPage?'aria-current="page"':''}>${phone?item:escapeLabel(pages[item-1].brands.join(' + '))}</button>`).join('');
    const status=phone?`Showing ${start}–${end} of ${totalCards} cars`:`Page ${currentPage} of ${totalPages} · ${pages[currentPage-1].cards.length} cars · ${escapeLabel(pages[currentPage-1].brands.join(' + '))}`;
    nav.innerHTML=`<div class="page-status" role="status">${status}</div><div class="page-controls"><button type="button" data-page="prev" class="page-arrow" aria-label="Previous page" ${currentPage===1?'disabled':''}>←</button>${controls}<button type="button" data-page="next" class="page-arrow" aria-label="Next page" ${currentPage===totalPages?'disabled':''}>→</button></div>`;
  }

  function apply(reset=false){
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      const allCards=cards();
      const perPage=pageSize();
      const pages=buildPages();
      const totalPages=Math.max(1,pages.length);
      if(reset)currentPage=1;
      currentPage=Math.min(Math.max(currentPage,1),totalPages);

      const visible=new Set(pages[currentPage-1]?.cards||[]);
      allCards.forEach(card=>{card.hidden=!visible.has(card);});

      grid.querySelectorAll('.brand-group').forEach(group=>{
        group.hidden=![...group.querySelectorAll('.card')].some(card=>!card.hidden);
      });

      renderNav(pages);
      lastPageSize=perPage;
    });
  }

  nav.addEventListener('click',e=>{
    const button=e.target.closest('button[data-page]');
    if(!button||button.disabled)return;
    const totalPages=Math.max(1,buildPages().length);
    const target=button.dataset.page;
    if(target==='prev')currentPage=Math.max(1,currentPage-1);
    else if(target==='next')currentPage=Math.min(totalPages,currentPage+1);
    else currentPage=Number(target)||1;
    apply(false);
    const catalogue=document.getElementById('catalogue');
    if(catalogue)catalogue.scrollIntoView({behavior:'smooth',block:'start'});
  });

  /* Reset to page 1 only when the catalogue itself is re-rendered by filters/search.
     Card-internal changes such as community ratings must not kick users back to page 1. */
  const observer=new MutationObserver(records=>{
    const structuralChange=records.some(record=>{
      if(record.type!=='childList')return false;
      const target=record.target;
      return target===grid || target?.classList?.contains('brand-grid') || target?.classList?.contains('brand-group');
    });
    if(structuralChange)apply(true);
  });
  observer.observe(grid,{childList:true,subtree:true});

  let resizeTimer=0;
  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{
      if(pageSize()!==lastPageSize)apply(true);
    },120);
  },{passive:true});

  apply(true);
})();
