/* Motor Atlas catalogue pagination
   Keeps the existing catalogue/filter engine intact and paginates the rendered cards.
   All screen sizes: whole brands, combining small brands up to 12 cars. */
(()=>{
  const grid=document.getElementById('grid');
  if(!grid)return;

  let currentPage=1;
  let frame=0;

  const nav=document.createElement('nav');
  nav.id='cataloguePagination';
  nav.className='catalogue-pagination';
  nav.setAttribute('aria-label','Catalogue pages');
  grid.insertAdjacentElement('afterend',nav);

  const cards=()=>[...grid.querySelectorAll('.brand-group .card')];
  const escapeLabel=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function buildPages(){
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

  function renderNav(pages){
    const totalPages=pages.length;
    if(totalPages<=1){nav.hidden=true;nav.innerHTML='';return;}
    nav.hidden=false;
    const controls=pages.map((page,index)=>{
      const item=index+1;
      return `<button type="button" data-page="${item}" class="${item===currentPage?'active':''}" ${item===currentPage?'aria-current="page"':''}>${escapeLabel(page.brands.join(' + '))}</button>`;
    }).join('');
    const status=`Page ${currentPage} of ${totalPages} · ${pages[currentPage-1].cards.length} cars · ${escapeLabel(pages[currentPage-1].brands.join(' + '))}`;
    nav.innerHTML=`<div class="page-status" role="status">${status}</div><div class="page-controls"><button type="button" data-page="prev" class="page-arrow" aria-label="Previous page" ${currentPage===1?'disabled':''}>←</button>${controls}<button type="button" data-page="next" class="page-arrow" aria-label="Next page" ${currentPage===totalPages?'disabled':''}>→</button></div>`;
  }

  function apply(reset=false){
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      const allCards=cards();
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

  // Brand pages are identical at every width, so rotation preserves the current page.
  apply(true);
})();
