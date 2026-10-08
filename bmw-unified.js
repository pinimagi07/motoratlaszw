/* BMW catalogue adapter.
   BMW data stays in bmw-addon/bmw-models.json, but the cars are converted to
   the same card/specification structure as every other Motor Atlas brand. */
(()=>{
  const bodyMap={Saloon:'Sedan','Gran Coupé':'Coupé'};
  const torqueOf=specs=>{
    const entry=Object.entries(specs||{}).find(([k])=>k.toLowerCase().includes('torque'));
    return entry?entry[1]:'See reference';
  };
  const driveOf=b=>b.specs?.Drive||(/xdrive/i.test(b.trim)?'xDrive AWD':'See reference');
  const makeCar=b=>({
    id:`bmw-${b.id}`,
    make:'BMW',
    model:b.model,
    year:b.year,
    type:bodyMap[b.body]||b.body||'Car',
    trim:b.trim,
    fuel:b.fuel,
    drive:driveOf(b),
    power:b.power,
    torque:torqueOf(b.specs),
    rating:null,
    review:null,
    market:b.market,
    summary:`${b.trim} reference entry for the BMW ${b.model}.`,
    note:b.photo?.caption||'BMW model-family reference. Exact trim, year and equipment may differ.',
    image:`bmw-addon/photos/${b.photo?.file||`${b.id}.jpg`}`,
    imageAlt:`BMW ${b.model} ${b.trim} reference photo`,
    groups:{
      'Reference specifications':b.specs||{},
      'Catalogue context':{'Reference market':b.market,'Model family':b.model,'Photo scope':'Model-family reference'}
    },
    sources:b.source?[[`BMW — ${b.model} ${b.trim} reference`,b.source]]:[],
    collection:'BMW',
    keywords:`bmw ${b.model} ${b.trim} ${b.body||''} ${b.fuel||''}`
  });

  fetch('bmw-addon/bmw-models.json')
    .then(r=>{if(!r.ok)throw new Error(`BMW data ${r.status}`);return r.json();})
    .then(rows=>{
      const existing=new Set(cars.map(c=>c.id));
      rows.map(makeCar).filter(c=>!existing.has(c.id)).forEach(c=>cars.push(c));
      window.dispatchEvent(new CustomEvent('motoratlas:dataready',{detail:{source:'BMW'}}));
    })
    .catch(err=>console.error('BMW catalogue could not be loaded:',err));
})();
