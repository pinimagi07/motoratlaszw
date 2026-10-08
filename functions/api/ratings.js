const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});

async function ensureTables(DB){
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
  if(!env.DB)return json({error:'Community database is not connected yet.'},503);
  await ensureTables(env.DB);
  const url=new URL(request.url),carId=(url.searchParams.get('car_id')||'').trim();
  if(carId){
    const row=await env.DB.prepare('SELECT car_id, ROUND(AVG(rating),2) AS average, COUNT(*) AS count FROM community_ratings WHERE car_id=? GROUP BY car_id').bind(carId).first();
    return json(row||{car_id:carId,average:null,count:0});
  }
  const {results=[]}=await env.DB.prepare('SELECT car_id, ROUND(AVG(rating),2) AS average, COUNT(*) AS count FROM community_ratings GROUP BY car_id').all();
  return json({ratings:results});
}

export async function onRequestPost({env,request}){
  if(!env.DB)return json({error:'Community database is not connected yet.'},503);
  await ensureTables(env.DB);
  let body;try{body=await request.json();}catch{return json({error:'Invalid request.'},400);}
  const carId=String(body.carId||'').trim().slice(0,120);
  const visitorId=String(body.visitorId||'').trim().slice(0,120);
  const rating=Number(body.rating);
  if(!carId||!visitorId||!Number.isInteger(rating)||rating<1||rating>5)return json({error:'Car, visitor and a 1–5 star rating are required.'},400);
  await env.DB.prepare(`INSERT INTO community_ratings (car_id,visitor_id,rating) VALUES (?,?,?)
    ON CONFLICT(car_id,visitor_id) DO UPDATE SET rating=excluded.rating, updated_at=CURRENT_TIMESTAMP`).bind(carId,visitorId,rating).run();
  const row=await env.DB.prepare('SELECT car_id, ROUND(AVG(rating),2) AS average, COUNT(*) AS count FROM community_ratings WHERE car_id=? GROUP BY car_id').bind(carId).first();
  return json({ok:true,...row});
}
