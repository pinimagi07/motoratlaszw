const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});

async function ensureTable(DB){
  await DB.prepare(`CREATE TABLE IF NOT EXISTS site_feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_id TEXT,
    car_label TEXT,
    name TEXT,
    email TEXT,
    message TEXT NOT NULL,
    page_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();
}

export async function onRequestPost({env,request}){
  if(!env.DB)return json({error:'Feedback database is not connected yet.'},503);
  await ensureTable(env.DB);
  let body;try{body=await request.json();}catch{return json({error:'Invalid request.'},400);}
  if(String(body.website||'').trim())return json({ok:true});
  const message=String(body.message||'').trim();
  if(message.length<3)return json({error:'Please write a little more detail.'},400);
  if(message.length>2000)return json({error:'Please keep feedback under 2,000 characters.'},400);
  const name=String(body.name||'').trim().slice(0,100);
  const email=String(body.email||'').trim().slice(0,160);
  const carId=String(body.carId||'').trim().slice(0,120);
  const carLabel=String(body.carLabel||'').trim().slice(0,180);
  const pageUrl=String(body.pageUrl||'').trim().slice(0,500);
  await env.DB.prepare('INSERT INTO site_feedback (car_id,car_label,name,email,message,page_url) VALUES (?,?,?,?,?,?)').bind(carId||null,carLabel||null,name||null,email||null,message,pageUrl||null).run();
  return json({ok:true,message:'Thanks — your feedback was sent to Motor Atlas for review.'},201);
}
