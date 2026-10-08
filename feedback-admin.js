(()=>{
  const tokenInput=document.getElementById('adminToken'),loadBtn=document.getElementById('loadInbox'),status=document.getElementById('adminStatus'),list=document.getElementById('feedbackList'),ratingsBody=document.getElementById('ratingsBody');
  tokenInput.value=sessionStorage.getItem('motorAtlasAdminToken')||'';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function load(){
    const token=tokenInput.value.trim();if(!token){status.textContent='Enter your token.';return;}
    sessionStorage.setItem('motorAtlasAdminToken',token);status.textContent='Loading…';status.className='status';
    try{
      const res=await fetch('/api/admin-feedback',{headers:{authorization:`Bearer ${token}`,accept:'application/json'}});const data=await res.json();if(!res.ok)throw new Error(data.error||'Could not load inbox.');
      const feedback=data.feedback||[];
      list.innerHTML=feedback.length?feedback.map(f=>`<article class="feedback-item ${esc(f.status)}" data-id="${f.id}"><div class="meta"><span>${esc(f.created_at)}</span><span>${esc(f.status)}</span>${f.car_label?`<span>Car: ${esc(f.car_label)}</span>`:''}</div><h3>${esc(f.name||'Anonymous visitor')}${f.email?` · ${esc(f.email)}`:''}</h3><p>${esc(f.message)}</p><div class="actions"><button data-status="reviewed">Mark reviewed</button><button data-status="archived">Archive</button><button data-status="pending">Return to pending</button></div></article>`).join(''):'<p class="status">No feedback yet.</p>';
      ratingsBody.innerHTML=(data.ratings||[]).length?(data.ratings||[]).map(r=>`<tr><td>${esc(r.car_id)}</td><td>★ ${Number(r.average).toFixed(1)} / 5</td><td>${r.count}</td></tr>`).join(''):'<tr><td colspan="3" class="status">No ratings yet.</td></tr>';
      status.textContent=`${feedback.filter(x=>x.status==='pending').length} pending comment(s)`;
    }catch(err){status.textContent=err.message;status.className='status error';}
  }
  loadBtn.addEventListener('click',load);tokenInput.addEventListener('keydown',e=>{if(e.key==='Enter')load();});
  list.addEventListener('click',async e=>{
    const b=e.target.closest('[data-status]');if(!b)return;const item=b.closest('[data-id]'),id=Number(item?.dataset.id),newStatus=b.dataset.status,token=tokenInput.value.trim();if(!id||!token)return;
    b.disabled=true;
    try{const res=await fetch('/api/admin-feedback',{method:'PATCH',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify({id,status:newStatus})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Update failed.');await load();}catch(err){status.textContent=err.message;status.className='status error';}finally{b.disabled=false;}
  });
})();
