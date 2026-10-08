const $=s=>document.querySelector(s), selected=new Set();
let type='All', collection='All', activeCar=null;
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const E=escapeHTML;
const carImage=c=>c.image||(!c.collection?`assets/${c.id}.jpg`:null);
const viewAssets=c=>typeof vehicleViews!=='undefined' ? vehicleViews[c.id]||{} : {};
const has3D=c=>Object.values(viewAssets(c)).some(Boolean);
const sourcesOf=c=>Array.isArray(c.sources)?c.sources:[];
const groupsOf=c=>c.groups&&typeof c.groups==='object'?c.groups:{};

function imageMarkup(c){return carImage(c)?`<img src="${E(carImage(c))}" alt="${E(c.imageAlt||`${c.make} ${c.model}, reference model photo`)}" loading="lazy" width="800" height="450">`:`<div class="model-art"><span>${E(c.make)}</span><strong>${E(c.model)}</strong><small>${E(c.type)} · MODEL GUIDE</small></div>`;}

function collectionMatches(c){
  if(collection==='All')return true;
  if(collection==='JDM')return c.collection==='JDM'||(c.tags||[]).includes('JDM');
  if(collection==='Pickups')return c.type==='Pickup';
  if(collection==='Electric')return /electric|ev\b/i.test(`${c.fuel||''} ${c.keywords||''}`);
  if(collection==='3D')return has3D(c);
  return c.collection===collection;
}

function filtered(){
  const q=$('#search').value.trim().toLowerCase();
  const make=$('#make').value;
  let list=cars.filter(c=>(type==='All'||c.type===type)&&(make==='all'||c.make===make)&&collectionMatches(c)&&[c.make,c.model,c.trim,c.fuel,c.year,c.keywords,c.collection].join(' ').toLowerCase().includes(q));
  const sort=$('#sort').value;
  if(sort==='rating')list.sort((a,b)=>(b.rating??-1)-(a.rating??-1));
  if(sort==='power')list.sort((a,b)=>(b.power??-1)-(a.power??-1));
  if(sort==='name')list.sort((a,b)=>(a.model||'').localeCompare(b.model||''));
  return list;
}

function cardMarkup(c,i){return `<article class="card" style="--order:${Math.min(i,5)}"><div class="photo"><button class="photo-open" data-detail="${E(c.id)}" aria-label="Explore ${E(c.make+' '+c.model+' '+c.trim)}">${imageMarkup(c)}</button><span class="bodytag">${E(c.type)}</span>${c.rating!=null?`<div class="rating" aria-label="Top Gear rating ${c.rating} out of 10"><b>${c.rating}</b><small> / 10</small><span>TOP GEAR</span></div>`:has3D(c)?'<span class="view-badge">↻ 3D VIEW AVAILABLE</span>':''}</div><div class="cardbody"><div class="modelyear">${E(c.make)} <span> / </span> ${E(c.year)}</div><h2><button class="title-open" data-detail="${E(c.id)}">${E(c.model)}</button></h2><p class="trim">${E(c.trim)}</p><div class="specstrip"><div><span>POWER</span><b>${c.power==null?'Varies by trim':`${c.power} <small>kW</small>`}</b></div><div><span>FUEL</span><b>${E(c.fuel||'See reference')}</b></div><div><span>DRIVETRAIN</span><b>${E(c.drive||'See reference')}</b></div></div><div class="cardactions"><button class="view" data-detail="${E(c.id)}">Explore car ↗</button><label class="compare"><input type="checkbox" data-compare="${E(c.id)}" ${selected.has(c.id)?'checked':''} aria-label="Compare ${E(c.make+' '+c.model+' '+c.trim)}">Compare</label></div></div></article>`;}

function render(){
  const list=filtered();
  const grouped=new Map();
  list.forEach(c=>{if(!grouped.has(c.make))grouped.set(c.make,[]);grouped.get(c.make).push(c);});
  const makes=[...grouped.keys()].sort((a,b)=>a.localeCompare(b));
  $('#grid').innerHTML=makes.map(make=>{
    const items=grouped.get(make);
    return `<section class="brand-group" data-brand-group="${E(make)}"><div class="brand-group-heading"><div><div class="eyebrow">MANUFACTURER</div><h2>${E(make)}</h2></div><span>${items.length} ${items.length===1?'model':'models'}</span></div><div class="brand-grid">${items.map((c,i)=>cardMarkup(c,i)).join('')}</div></section>`;
  }).join('');
  $('#count').textContent=`${list.length} ${list.length===1?'car':'cars'} across ${makes.length} ${makes.length===1?'manufacturer':'manufacturers'}`;
  $('#empty').hidden=!!list.length;
  if($('#loadMore'))$('#loadMore').hidden=true;
  updateBar();
}

function brandCounts(){const counts={};cars.forEach(c=>counts[c.make]=(counts[c.make]||0)+1);return counts;}
function buildBrandControls(){
  const counts=brandCounts(), makes=Object.keys(counts).sort((a,b)=>a.localeCompare(b));
  const current=$('#make').value;
  $('#make').innerHTML='<option value="all">All manufacturers</option>'+makes.map(m=>`<option value="${E(m)}">${E(m)}</option>`).join('');
  $('#make').value=makes.includes(current)?current:'all';
  $('#brands').innerHTML=`<button class="${$('#make').value==='all'?'active':''}" data-brand="all" aria-pressed="${$('#make').value==='all'}">All brands <small>${cars.length}</small></button>`+makes.map(m=>`<button class="${$('#make').value===m?'active':''}" data-brand="${E(m)}" aria-pressed="${$('#make').value===m}">${E(m)} <small>${counts[m]}</small></button>`).join('');
}
function buildTypeControls(){
  const available=['All',...new Set(cars.map(c=>c.type).filter(Boolean))];
  if(!available.includes(type))type='All';
  $('#types').innerHTML=available.map(t=>`<button class="${t===type?'active':''}" data-type="${E(t)}" aria-pressed="${t===type}">${t==='All'?'All body styles':E(t)}${t==='All'?` <span id="allTotal">${cars.length}</span>`:''}</button>`).join('');
}
function refreshCatalogue(){
  buildBrandControls();buildTypeControls();
  $('#modelTotal').textContent=cars.length.toLocaleString();
  $('#catalogueSubtitle').textContent=`${cars.length} model guides & reference variants · organised by manufacturer`;
  render();
}
window.refreshCatalogue=refreshCatalogue;

function setBrand(value){
  $('#make').value=value;
  document.querySelectorAll('[data-brand]').forEach(b=>{const on=b.dataset.brand===value;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  render();
}
function chooseCollection(value){
  collection=value;
  document.querySelectorAll('[data-collection]').forEach(b=>{const on=b.dataset.collection===value;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  render();
}

function updateBar(){$('#comparebar').hidden=!selected.size;$('#selectedCount').textContent=`${selected.size} / 3 cars selected`;$('#compareNow').disabled=selected.size<2;document.querySelectorAll('[data-compare]').forEach(e=>{e.checked=selected.has(e.dataset.compare);e.disabled=selected.size===3&&!e.checked;});}
function openDialog(html,label){$('#dialogLabel').textContent=label;$('#dialogContent').innerHTML=html;if(!$('#dialog').open)$('#dialog').showModal();$('#dialog').scrollTop=0;}
function viewerMarkup(c){return `<section class="vehicle-viewer" aria-label="Interactive vehicle views"><div class="viewer-heading"><div><div class="eyebrow">LOOK AROUND</div><h3>Get a closer look.</h3></div><span>Drag to rotate · Scroll or pinch to zoom</span></div><div class="viewer-tabs" role="group" aria-label="Choose exterior or interior view"><button class="active" data-view-mode="exterior" aria-pressed="true">Exterior 3D</button><button data-view-mode="interior" aria-pressed="false">Interior 3D</button></div><div id="vehicleStage" class="vehicle-stage" aria-live="polite"></div></section>`;}
function renderViewer(mode){if(!activeCar)return;const c=activeCar,a=viewAssets(c)[mode],stage=$('#vehicleStage');document.querySelectorAll('[data-view-mode]').forEach(b=>{b.classList.toggle('active',b.dataset.viewMode===mode);b.setAttribute('aria-pressed',String(b.dataset.viewMode===mode));});if(!a){stage.innerHTML=`<div class="viewer-empty"><span class="orbit-symbol" aria-hidden="true">◎</span><h4>${mode==='interior'?'Interior':'Exterior'} 3D view not available yet</h4><p>We don’t yet have a verified, licensed ${mode} model for ${E(c.make+' '+c.model)}. You can still browse its specifications below.</p><p class="viewer-small">No generic car is substituted for this model.</p></div>`;return;}stage.innerHTML=`<div class="viewer-ready"><span class="orbit-symbol" aria-hidden="true">↻</span><h4>${E(a.title)}</h4><p>${E(a.note)}</p><button class="accent" data-load-view="${mode}">Load ${mode} 3D view</button><p class="viewer-small">Interactive model hosted by Sketchfab. Loading it connects to Sketchfab; large models may take longer on mobile data.</p></div>${viewCredit(a)}`;}
function viewCredit(a){return `<p class="view-credit"><a href="${E(a.url)}" target="_blank" rel="noopener noreferrer">${E(a.title)}</a> by ${E(a.author)} · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a> · Unmodified third-party model. ${E(a.note)}</p>`;}
function loadViewer(mode){const a=viewAssets(activeCar)[mode];if(!a)return;const stage=$('#vehicleStage');stage.innerHTML=`<p class="viewer-status" role="status">Loading interactive ${mode} view… If it stays blank, use the original model link below.</p><iframe title="${E(a.title+' interactive '+mode+' 3D view')}" src="https://sketchfab.com/models/${a.uid}/embed?autostart=1&preload=1&ui_infos=1" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>${viewCredit(a)}<p class="viewer-small">${mode==='interior'?'Use the viewer’s navigation controls to look around the cabin; camera and controls depend on the creator’s model.':'Drag to orbit the exterior; use two fingers to pan and pinch to zoom on touch screens.'} <a href="${E(a.url)}" target="_blank" rel="noopener noreferrer">Open original viewer ↗</a></p>`;stage.querySelector('iframe').addEventListener('load',()=>{const s=stage.querySelector('.viewer-status');if(s)s.textContent='The model may take a moment to appear. If it stays blank, open the original viewer below.';});}
function detail(id){
  const c=cars.find(c=>c.id===id);if(!c)return;activeCar=c;
  const sourceLinks=sourcesOf(c).map(([n,u])=>`<br><a href="${E(u)}" target="_blank" rel="noopener noreferrer">${E(n)}</a>`).join('');
  openDialog(`<div class="detailhero"><div class="detail-photo">${imageMarkup(c)}</div><div><div class="eyebrow">${E(c.year)} · ${E(c.market||'Reference catalogue')}</div><h2>${E(c.make+' '+c.model)}</h2><p>${E(c.trim)}</p>${c.rating!=null?`<div class="score">${c.rating}<small> / 10 · Top Gear expert rating</small></div>`:'<span class="unrated">Expert rating not available</span>'}<p>${E(c.summary||'Reference model guide.')}</p></div></div>${viewerMarkup(c)}<p class="detailnote">${E(c.note||'Specifications and equipment can vary by exact trim and market.')}</p><div class="specsections">${Object.entries(groupsOf(c)).map(([group,rows])=>`<section><h3>${E(group)}</h3><dl>${Object.entries(rows).map(([k,v])=>`<div><dt>${E(k)}</dt><dd>${E(v)}</dd></div>`).join('')}</dl></section>`).join('')}</div><div class="sourcebox"><strong>Sources & context</strong>${c.review?`<br>Rating scope: ${E(c.ratingScope)}. Expert scores are not owner or safety ratings.<br><a href="${E(c.review)}" target="_blank" rel="noopener noreferrer">Read the Top Gear review</a>`:'<br>No verified numerical review score has been assigned to this entry.'}${sourceLinks||'<br>Detailed source links are retained in the underlying archive where available.'}<br>Model-family entries do not describe every trim. Match the vehicle’s build date, engine and original market.</div>`,'VEHICLE SPECIFICATIONS & 3D');renderViewer('exterior');
}
function compare(){
  const list=cars.filter(c=>selected.has(c.id));if(list.length<2)return;
  const rows=[['Reference year / coverage',c=>c.year],['Reference market',c=>c.market],['Variant / family',c=>c.trim],['Body',c=>c.type],['Expert score',c=>c.rating==null?'Not rated':c.rating+' / 10 — Top Gear'],['Power (kW)',c=>c.power??'Varies by trim'],['Fuel',c=>c.fuel],['Drive',c=>c.drive],['Torque basis',c=>c.torque],['Exterior 3D',c=>viewAssets(c).exterior?'Available — see model notes':'Not available'],['Interior 3D',c=>viewAssets(c).interior?'Available — see model notes':'Not available']];
  const keys=[...new Set(list.flatMap(c=>Object.values(groupsOf(c)).flatMap(g=>Object.keys(g))))];
  keys.forEach(k=>{if(!['Power','Fuel','Drive','Body','Specification market','Model year','Trim'].includes(k))rows.push([k,c=>Object.values(groupsOf(c)).find(g=>k in g)?.[k]||'Not listed']);});
  openDialog(`<h2>Side-by-side comparison</h2><p class="detailnote">Model-family figures vary by trim. Engine output and hybrid-system output are not interchangeable. Match the exact variant before comparing.</p><div class="tablewrap"><table><thead><tr><th scope="col">Specification</th>${list.map(c=>`<th scope="col">${E(c.make+' '+c.model)}</th>`).join('')}</tr></thead><tbody>${rows.map(([k,f])=>`<tr><th scope="row">${E(k)}</th>${list.map(c=>`<td>${E(f(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,'COMPARE CARS');
}
function methodology(){
  const viewRows=typeof vehicleViews!=='undefined'?Object.values(vehicleViews).flatMap(v=>Object.values(v)):[];
  openDialog(`<div class="method"><h2>Real sources. Clear context.</h2><p>Motor Atlas is an independent car guide for Zimbabwean drivers. The catalogue is organised by manufacturer so BMW, Mercedes-Benz, Toyota, Nissan, Ford and every other make live in one consistent system.</p><h3>Japanese-market coverage</h3><p>Serena, Mark II, Mark X and Funcargo now appear under Nissan or Toyota like any other model. Use the JDM filter to isolate these Japanese-market families. The original detailed trim dataset remains preserved separately from the main browsing layout.</p><h3>Ratings and specifications</h3><p>The original Top Gear scores are retained with their review scope. Newly added entries are unscored unless a verified score is supplied. Missing specifications are labelled rather than estimated. Imported cars can differ from regional references.</p><h3>Interactive exterior and interior views</h3><p>Available views are creator-hosted Sketchfab models with an explicit Creative Commons Attribution licence. They load only when requested. These are visual references, not manufacturer-verified equipment diagrams.</p><h3>3D asset credits</h3>${viewRows.map(a=>viewCredit(a)).join('')}<h3>Source directory</h3>${cars.map(c=>`<p><strong>${E(c.make+' '+c.model+' · '+c.trim)}</strong>${sourcesOf(c).map(([n,u])=>`<br><a href="${E(u)}" target="_blank" rel="noopener noreferrer">${E(n)}</a>`).join('')}${c.review?`<br><a href="${E(c.review)}" target="_blank" rel="noopener noreferrer">Expert review</a>`:''}</p>`).join('')}<h3>Photography and model cards</h3><p>Photos are model-family references and may show another trim. Text-only model cards are used where no matching photo has been added.</p><div id="photoCredits"></div></div>`,'SOURCES & METHODOLOGY');
  fetch('assets/photo-sources.json').then(r=>r.json()).then(rows=>{const el=$('#photoCredits');if(el)el.innerHTML=rows.map(([name,url])=>`<p><a href="${E(url)}" target="_blank" rel="noopener noreferrer">${E(name)} photo source</a></p>`).join('');}).catch(()=>{});
}

$('#search').addEventListener('input',render);
$('#make').addEventListener('change',()=>setBrand($('#make').value));
$('#sort').addEventListener('change',render);
$('#brands').addEventListener('click',e=>{const b=e.target.closest('[data-brand]');if(b)setBrand(b.dataset.brand);});
$('#types').addEventListener('click',e=>{const b=e.target.closest('[data-type]');if(!b)return;type=b.dataset.type;document.querySelectorAll('[data-type]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render();});
document.querySelectorAll('[data-collection]').forEach(b=>b.addEventListener('click',()=>chooseCollection(b.dataset.collection)));
$('#grid').addEventListener('click',e=>{const b=e.target.closest('[data-detail]');if(b)detail(b.dataset.detail);});
$('#grid').addEventListener('change',e=>{const id=e.target.dataset.compare;if(!id)return;if(e.target.checked&&selected.size<3)selected.add(id);else selected.delete(id);updateBar();});
$('#clearCompare').onclick=()=>{selected.clear();updateBar();};
$('#compareNow').onclick=compare;
$('#closeDialog').onclick=()=>$('#dialog').close();
$('#dialog').addEventListener('close',()=>{$('#dialogContent').innerHTML='';activeCar=null;});
$('#dialog').addEventListener('click',e=>{const mode=e.target.closest('[data-view-mode]'),load=e.target.closest('[data-load-view]');if(mode)renderViewer(mode.dataset.viewMode);if(load)loadViewer(load.dataset.loadView);if(e.target===$('#dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('#ratingsInfo').onclick=methodology;
$('#sourcesInfo').onclick=methodology;
$('#reset').onclick=()=>{type='All';collection='All';$('#search').value='';$('#sort').value='featured';buildTypeControls();document.querySelectorAll('[data-collection]').forEach(b=>{const on=b.dataset.collection==='All';b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});setBrand('all');};
window.addEventListener('motoratlas:dataready',refreshCatalogue);
refreshCatalogue();
