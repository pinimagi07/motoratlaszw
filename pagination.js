/* Motor Atlas catalogue pagination
   Keeps the existing catalogue/filter engine intact and paginates the rendered cards.
   Desktop/tablet: 12 cars per page. Phones: 8 cars per page. */
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

  function renderNav(totalCards,perPage,totalPages){
    if(totalCards<=perPage){nav.hidden=true;nav.innerHTML='';return;}
    nav.hidden=false;
    const start=(currentPage-1)*perPage+1;
    const end=Math.min(currentPage*perPage,totalCards);
    const controls=pageButtons(currentPage,totalPages).map(item=>item==='…'
      ? '<span class="page-ellipsis" aria-hidden="true">…</span>'
      : `<button type="button" data-page="${item}" class="${item===currentPage?'active':''}" ${item===currentPage?'aria-current="page"':''}>${item}</button>`).join('');
    nav.innerHTML=`<div class="page-status">Showing ${start}–${end} of ${totalCards} cars</div><div class="page-controls"><button type="button" data-page="prev" class="page-arrow" aria-label="Previous page" ${currentPage===1?'disabled':''}>←</button>${controls}<button type="button" data-page="next" class="page-arrow" aria-label="Next page" ${currentPage===totalPages?'disabled':''}>→</button></div>`;
  }

  function apply(reset=false){
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      const allCards=cards();
      const perPage=pageSize();
      const totalPages=Math.max(1,Math.ceil(allCards.length/perPage));
      if(reset)currentPage=1;
      currentPage=Math.min(Math.max(currentPage,1),totalPages);

      const first=(currentPage-1)*perPage;
      const last=first+perPage;
      allCards.forEach((card,index)=>{card.hidden=index<first||index>=last;});

      grid.querySelectorAll('.brand-group').forEach(group=>{
        group.hidden=![...group.querySelectorAll('.card')].some(card=>!card.hidden);
      });

      renderNav(allCards.length,perPage,totalPages);
      lastPageSize=perPage;
    });
  }

  nav.addEventListener('click',e=>{
    const button=e.target.closest('button[data-page]');
    if(!button||button.disabled)return;
    const totalPages=Math.max(1,Math.ceil(cards().length/pageSize()));
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
