const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});

function authorised(request,env){
  if(!env.ADMIN_TOKEN)return false;
  const auth=request.headers.get('authorization')||'';
  return auth===`Bearer ${env.ADMIN_TOKEN}`;
}

async function ensureTables(DB){
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
  await DB.prepare(`CREATE TABLE IF NOT EXISTS community_ratings (
    car_id TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (car_id, visitor_id)
  )`).run();
}

export async function onRequestGet({env,request}){
  if(!env.DB)return json({error:'Database not connected.'},503);
  if(!authorised(request,env))return json({error:'Unauthorised.'},401);
  await ensureTables(env.DB);
  const {results:feedback=[]}=await env.DB.prepare(`SELECT id,car_id,car_label,name,email,message,page_url,status,created_at
    FROM site_feedback ORDER BY CASE status WHEN 'pending' THEN 0 ELSE 1 END, datetime(created_at) DESC LIMIT 250`).all();
  const {results:ratings=[]}=await env.DB.prepare(`SELECT car_id, ROUND(AVG(rating),2) AS average, COUNT(*) AS count
    FROM community_ratings GROUP BY car_id ORDER BY count DESC, average DESC`).all();
  return json({feedback,ratings});
}

export async function onRequestPatch({env,request}){
  if(!env.DB)return json({error:'Database not connected.'},503);
  if(!authorised(request,env))return json({error:'Unauthorised.'},401);
  await ensureTables(env.DB);
  let body;try{body=await request.json();}catch{return json({error:'Invalid request.'},400);}
  const id=Number(body.id),status=String(body.status||'');
  if(!Number.isInteger(id)||!['pending','reviewed','archived'].includes(status))return json({error:'Invalid feedback update.'},400);
  await env.DB.prepare('UPDATE site_feedback SET status=? WHERE id=?').bind(status,id).run();
  return json({ok:true});
}
