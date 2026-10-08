/* Japanese-market families integrated into their real manufacturers.
   The original jdm-data.js archive is kept in the repository for future
   exact-trim browsing; these four cards are the clean catalogue entry points. */
const jdmFamilies=[
  {
    id:'jdm-serena',make:'Nissan',model:'Serena',year:'1994–2026',type:'MPV',
    trim:'Japanese-market family · 1,431 archived trim records',fuel:'Varies by generation',drive:'FWD / 4WD by trim',
    power:null,torque:'Varies by trim',rating:null,review:null,market:'Japan · imported vehicle reference',
    summary:'The Nissan Serena family, grouped under Nissan while retaining its Japanese-market archive identity.',
    note:'Specifications vary substantially by generation, engine, hybrid system, drivetrain and accessibility conversion. Match the exact chassis code and build period before using a figure.',
    image:'assets/serena.jpg',imageAlt:'Nissan Serena Japanese-market family reference photo',
    groups:{'Archive scope':{'Family':'Nissan Serena','Archived trim records':'1,431','Coverage':'1994–2026','Market':'Japan'},'Buying context':{'Body':'MPV / minivan','Specifications':'Vary by generation and trim','Archive tag':'JDM'}},
    sources:[],collection:'JDM',tags:['JDM'],keywords:'jdm japan import nissan serena c23 c24 c25 c26 c27 c28 mpv minivan'
  },
  {
    id:'jdm-mark-ii',make:'Toyota',model:'Mark II',year:'1989–2004',type:'Sedan',
    trim:'Japanese-market family · 290 archived trim records',fuel:'Petrol / diesel by generation',drive:'RWD / 4WD by trim',
    power:null,torque:'Varies by trim',rating:null,review:null,market:'Japan · imported vehicle reference',
    summary:'Toyota Mark II generations are now grouped directly with Toyota rather than separated into a standalone JDM section.',
    note:'Engine, drivetrain and equipment vary across generations and trims. Confirm the chassis code and production period for the individual vehicle.',
    image:'assets/markii.jpg',imageAlt:'Toyota Mark II Japanese-market family reference photo',
    groups:{'Archive scope':{'Family':'Toyota Mark II','Archived trim records':'290','Coverage':'1989–2004','Market':'Japan'},'Buying context':{'Body':'Sedan','Specifications':'Vary by generation and trim','Archive tag':'JDM'}},
    sources:[],collection:'JDM',tags:['JDM'],keywords:'jdm japan import toyota mark ii mark 2 jzx90 jzx100 jzx110 sedan'
  },
  {
    id:'jdm-mark-x',make:'Toyota',model:'Mark X',year:'2004–2019',type:'Sedan',
    trim:'Japanese-market family · 115 archived trim records',fuel:'Petrol',drive:'RWD / 4WD by trim',
    power:null,torque:'Varies by trim',rating:null,review:null,market:'Japan · imported vehicle reference',
    summary:'Toyota Mark X references sit with the rest of the Toyota catalogue and can also be isolated with the JDM filter.',
    note:'Figures differ by generation, engine and drivetrain. Match the exact vehicle code and model year before comparing specifications.',
    image:'assets/markx.jpg',imageAlt:'Toyota Mark X Japanese-market family reference photo',
    groups:{'Archive scope':{'Family':'Toyota Mark X','Archived trim records':'115','Coverage':'2004–2019','Market':'Japan'},'Buying context':{'Body':'Sedan','Specifications':'Vary by generation and trim','Archive tag':'JDM'}},
    sources:[],collection:'JDM',tags:['JDM'],keywords:'jdm japan import toyota mark x grx120 grx130 sedan'
  },
  {
    id:'jdm-funcargo',make:'Toyota',model:'Funcargo',year:'1999–2004',type:'MPV',
    trim:'Japanese-market family · 90 archived trim records',fuel:'Petrol',drive:'FWD / 4WD by trim',
    power:null,torque:'Varies by trim',rating:null,review:null,market:'Japan · imported vehicle reference',
    summary:'Toyota Funcargo is listed as a Toyota model in the main catalogue while retaining a JDM archive tag.',
    note:'Specifications vary by engine, drivetrain and production period. Confirm the exact Japanese-market trim for an individual vehicle.',
    image:'assets/funcargo.jpg',imageAlt:'Toyota Funcargo Japanese-market family reference photo',
    groups:{'Archive scope':{'Family':'Toyota Funcargo','Archived trim records':'90','Coverage':'1999–2004','Market':'Japan'},'Buying context':{'Body':'Compact MPV','Specifications':'Vary by generation and trim','Archive tag':'JDM'}},
    sources:[],collection:'JDM',tags:['JDM'],keywords:'jdm japan import toyota funcargo fun cargo yaris verso mpv'
  }
];
cars.push(...jdmFamilies);
