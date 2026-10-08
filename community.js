/* Motor Atlas community interactions: shared 1–5 star ratings + private feedback. */
(()=>{
  const ratings=new Map();
  const localRatings=JSON.parse(localStorage.getItem('motorAtlasRatings')||'{}');
  let ratingsOnline=true,lastCar=null;
  const visitorKey='motorAtlasVisitorId';
  let visitorId=localStorage.getItem(visitorKey);
  if(!visitorId){visitorId=(crypto.randomUUID?.()||('v-'+Date.now()+'-'+Math.random().toString(36).slice(2)));localStorage.setItem(visitorKey,visitorId);}

  const ratingText=id=>{
    const r=ratings.get(id);
    if(!r||!r.count)return '<strong><span class="community-star">★</span> Community</strong><small>Be the first to rate</small>';
    return `<strong><span class="community-star">★</span> ${Number(r.average).toFixed(1)} / 5</strong><small>${r.count} ${r.count===1?'rating':'ratings'}</small>`;
  };
  const refreshOne=id=>{
    document.querySelectorAll(`[data-community-rating="${CSS.escape(id)}"]`).forEach(el=>el.innerHTML=ratingText(id));
    const panel=document.querySelector(`.community-rating-panel[data-car-id="${CSS.escape(id)}"]`);
    if(panel){const r=ratings.get(id);const value=panel.querySelector('.community-rating-value');if(value)value.textContent=r?.count?`${Number(r.average).toFixed(1)} / 5 from ${r.count} ${r.count===1?'viewer':'viewers'}`:'No community ratings yet';}
  };
  const enhanceCards=()=>{
    document.querySelectorAll('.card').forEach(card=>{
      if(card.dataset.communityEnhanced)return;
      const trigger=card.querySelector('[data-detail]');if(!trigger)return;
      const id=trigger.dataset.detail,body=card.querySelector('.cardbody'),actions=card.querySelector('.cardactions');if(!id||!body)return;
      card.dataset.communityEnhanced='1';
      const box=document.createElement('div');box.className='community-card-rating';box.dataset.communityRating=id;box.innerHTML=ratingText(id);
      body.insertBefore(box,actions||null);
    });
  };
  const loadRatings=async()=>{
    try{
      const res=await fetch('/api/ratings',{headers:{accept:'application/json'}});
      if(!res.ok)throw new Error('ratings offline');
      const data=await res.json();(data.ratings||[]).forEach(r=>ratings.set(r.car_id,r));ratingsOnline=true;enhanceCards();ratings.forEach((_,id)=>refreshOne(id));
    }catch{ratingsOnline=false;enhanceCards();}
  };

  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-detail]');if(t){
      const card=t.closest('.card'),id=t.dataset.detail;
      const title=card?.querySelector('h2')?.textContent?.trim()||'';
      const make=card?.querySelector('.modelyear')?.textContent?.split('/')[0]?.trim()||'';
      lastCar={id,label:[make,title].filter(Boolean).join(' ')};
    }
  },true);

  const enhanceDialog=()=>{
    const content=document.getElementById('dialogContent');if(!content?.querySelector('.detailhero')||content.querySelector('.community-rating-panel')||!lastCar?.id)return;
    const panel=document.createElement('section');panel.className='community-rating-panel';panel.dataset.carId=lastCar.id;
    const my=Number(localRatings[lastCar.id]||0),r=ratings.get(lastCar.id);
    panel.innerHTML=`<div><h3>Viewer rating</h3><p><span class="community-rating-value">${r?.count?`${Number(r.average).toFixed(1)} / 5 from ${r.count} ${r.count===1?'viewer':'viewers'}`:'No community ratings yet'}</span><br>Rate this exact model guide from your own experience or impression.</p></div><div class="community-stars" role="group" aria-label="Rate this car out of five stars">${[1,2,3,4,5].map(n=>`<button type="button" data-community-star="${n}" aria-label="${n} star${n===1?'':'s'}" class="${n<=my?'selected':''}">★</button>`).join('')}</div>`;
    const tabs=content.querySelector('.showroom-tabs'),stats=content.querySelector('.showroom-stats'),hero=content.querySelector('.detailhero');
    (tabs||stats||hero).insertAdjacentElement('afterend',panel);
  };

  document.addEventListener('click',async e=>{
    const star=e.target.closest('[data-community-star]');if(!star)return;
    const panel=star.closest('.community-rating-panel'),carId=panel?.dataset.carId,rating=Number(star.dataset.communityStar);if(!carId)return;
    panel.querySelectorAll('[data-community-star]').forEach(b=>b.disabled=true);
    try{
      const res=await fetch('/api/ratings',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({carId,visitorId,rating})});
      const data=await res.json();if(!res.ok)throw new Error(data.error||'Rating could not be saved.');
      ratings.set(carId,{car_id:carId,average:data.average,count:data.count});localRatings[carId]=rating;localStorage.setItem('motorAtlasRatings',JSON.stringify(localRatings));
      panel.querySelectorAll('[data-community-star]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.communityStar)<=rating));refreshOne(carId);
    }catch(err){const value=panel.querySelector('.community-rating-value');if(value)value.textContent=ratingsOnline?'Could not save rating. Please try again.':'Community ratings are being connected.';}
    finally{panel.querySelectorAll('[data-community-star]').forEach(b=>b.disabled=false);}
  });

  const launcher=document.createElement('button');launcher.type='button';launcher.className='feedback-launcher';launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-controls','feedbackPanel');launcher.innerHTML='<b>✎</b><span>Send feedback</span>';
  const panel=document.createElement('aside');panel.id='feedbackPanel';panel.className='feedback-panel';panel.setAttribute('aria-label','Send feedback to Motor Atlas');
  panel.innerHTML=`<div class="feedback-panel-head"><div><h2>Help improve Motor Atlas.</h2><p>Spot an error, missing spec or something we should improve? Send it privately for review.</p></div><button class="feedback-close" type="button" aria-label="Close feedback">✕</button></div><div class="feedback-context"></div><form class="feedback-form"><label>Name <span>(optional)</span><input name="name" maxlength="100" autocomplete="name"></label><label>Email <span>(optional, only if you want a reply)</span><input name="email" type="email" maxlength="160" autocomplete="email"></label><label>Comment or correction<textarea name="message" maxlength="2000" required placeholder="Tell us what should be corrected or improved…"></textarea></label><label class="feedback-hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><button class="feedback-submit" type="submit">Send privately to Motor Atlas</button><p class="feedback-privacy">This feedback goes to the site owner for review and is not published publicly.</p><p class="feedback-status" role="status"></p></form>`;
  document.body.append(launcher,panel);
  const closeFeedback=()=>{panel.classList.remove('open');launcher.setAttribute('aria-expanded','false');};
  const openFeedback=()=>{
    const ctx=panel.querySelector('.feedback-context'),dialog=document.getElementById('dialog');
    if(lastCar&&dialog?.open){ctx.classList.add('visible');ctx.innerHTML=`About: <strong>${lastCar.label||lastCar.id}</strong>`;}else{ctx.classList.remove('visible');ctx.textContent='';}
    panel.classList.add('open');launcher.setAttribute('aria-expanded','true');setTimeout(()=>panel.querySelector('textarea')?.focus(),120);
  };
  launcher.addEventListener('click',()=>panel.classList.contains('open')?closeFeedback():openFeedback());
  panel.querySelector('.feedback-close').addEventListener('click',closeFeedback);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))closeFeedback();});
  panel.querySelector('form').addEventListener('submit',async e=>{
    e.preventDefault();const form=e.currentTarget,submit=form.querySelector('.feedback-submit'),status=form.querySelector('.feedback-status'),dialog=document.getElementById('dialog');
    submit.disabled=true;status.className='feedback-status';status.textContent='Sending…';
    const fd=new FormData(form),payload={name:fd.get('name'),email:fd.get('email'),message:fd.get('message'),website:fd.get('website'),pageUrl:location.href,carId:dialog?.open&&lastCar?lastCar.id:'',carLabel:dialog?.open&&lastCar?lastCar.label:''};
    try{const res=await fetch('/api/feedback',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});const data=await res.json();if(!res.ok)throw new Error(data.error||'Could not send feedback.');status.classList.add('ok');status.textContent=data.message||'Thanks — sent for review.';form.reset();setTimeout(closeFeedback,1800);}catch(err){status.classList.add('error');status.textContent=err.message||'Could not send feedback.';}finally{submit.disabled=false;}
  });

  const grid=document.getElementById('grid'),dialogContent=document.getElementById('dialogContent');
  if(grid)new MutationObserver(()=>requestAnimationFrame(enhanceCards)).observe(grid,{childList:true,subtree:true});
  if(dialogContent)new MutationObserver(()=>requestAnimationFrame(enhanceDialog)).observe(dialogContent,{childList:true,subtree:true});
  enhanceCards();loadRatings();
})();
