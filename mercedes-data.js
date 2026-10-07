/* Model-family coverage, not a claim of every historic trim or local stock. */
const mercedesUK='https://www.mercedes-benz.co.uk/passengercars/models.html?view=BODYTYPE';
const mercedesZA='https://www.mercedes-benz.co.za/passengercars/models.html';
const mercedesUsed='https://www.classifieds.co.zw/zimbabwe-cars/Mercedes-Benz';
const currentMercedes=[
 ['a-hatch','A-Class Hatchback','Hatchback','Compact five-door model family.'],
 ['cla-coupe','CLA Coupé','Coupe','Four-door coupé family listed separately from the newer CLA saloon in the regional catalogue.'],
 ['b','B-Class','MPV','Compact family people carrier.'],
 ['cla','CLA','Sedan','Compact four-door range; distinguish electric and combustion versions.'],
 ['cla-shooting','CLA Shooting Brake','Estate','Estate-bodied CLA range; availability depends on market.'],
 ['c','C-Class Sedan','Sedan','Executive saloon range, including performance and electrified derivatives.'],
 ['c-estate','C-Class Estate','Estate','Estate version of the C-Class model family.'],
 ['cle-coupe','CLE Coupé','Coupe','Two-door coupé range.'],
 ['cle-cab','CLE Cabriolet','Convertible','Open-top CLE model family.'],
 ['e','E-Class Sedan','Sedan','Executive saloon range.'],
 ['e-estate','E-Class Estate','Estate','Estate and All-Terrain derivatives vary by market.'],
 ['s','S-Class','Sedan','Luxury saloon range with wheelbase and powertrain choices.'],
 ['maybach-s','Mercedes-Maybach S-Class','Sedan','Maybach luxury saloon model family.'],
 ['gla','GLA','SUV','Compact SUV range.'],
 ['glb','GLB','SUV','Compact SUV family; seating and powertrain depend on derivative.'],
 ['glc','GLC','SUV','Mid-size SUV range; combustion and electric models have different specifications.'],
 ['glc-coupe','GLC Coupé','SUV','Coupé-roof SUV range.'],
 ['gle','GLE','SUV','Large SUV model family.'],
 ['gle-coupe','GLE Coupé','SUV','Coupé-roof GLE model family.'],
 ['gls','GLS','SUV','Full-size luxury SUV range.'],
 ['maybach-gls','Mercedes-Maybach GLS','SUV','Maybach version of the GLS luxury SUV.'],
 ['g','G-Class','SUV','Off-road model family; diesel, AMG petrol and electric derivatives differ substantially.'],
 ['eqa','EQA','SUV','Battery-electric compact SUV model family.'],
 ['eqb','EQB','SUV','Battery-electric compact SUV model family.'],
 ['eqe','EQE Saloon','Sedan','Battery-electric saloon range.'],
 ['eqe-suv','EQE SUV','SUV','SUV-bodied EQE range.'],
 ['eqs','EQS Saloon','Sedan','Battery-electric luxury saloon range.'],
 ['eqs-suv','EQS SUV','SUV','Battery-electric luxury SUV range.'],
 ['maybach-eqs','Mercedes-Maybach EQS SUV','SUV','Maybach electric luxury SUV model family.'],
 ['v','V-Class','MPV','People-carrier range; length and seating configurations vary.'],
 ['eqv','EQV','MPV','Battery-electric people-carrier range.'],
 ['vle','VLE','MPV','Electric people-carrier model listed in the UK range.'],
 ['marco-polo','Marco Polo','MPV','Camper-oriented model family.'],
 ['amg-gt','Mercedes-AMG GT Coupé','Coupe','AMG two-door sports coupé family.'],
 ['amg-gt-4','Mercedes-AMG GT 4-Door Coupé','Sedan','Four-door AMG GT family; distinct from the two-door GT.'],
 ['sl','Mercedes-AMG SL','Convertible','AMG roadster model family.'],
 ['maybach-sl','Mercedes-Maybach SL','Convertible','Maybach two-seat open-top model family.']
];
const usedMercedes=[
 ['a-v177','A-Class Sedan V177','Sedan','V177','Four-door A-Class sedan used-generation guide; confirm the original market and derivative.'],
 ['c-w203','C-Class W203','Sedan','W203','Earlier C-Class used-generation guide.'],
 ['c-w204','C-Class W204','Sedan','W204','C-Class saloon generation represented by the available 2007–2014 3D model.'],
 ['c-w205','C-Class W205','Sedan','W205','Previous-generation C-Class; check the engine and facelift when comparing imports.'],
 ['e-w211','E-Class W211','Sedan','W211','Earlier E-Class used-generation guide.'],
 ['e-w212','E-Class W212','Sedan','W212','E-Class saloon used-generation guide with an exterior 3D reference.'],
 ['e-w213','E-Class W213','Sedan','W213','Previous-generation E-Class saloon guide.'],
 ['s-w221','S-Class W221','Sedan','W221','Earlier S-Class luxury saloon guide.'],
 ['s-w222','S-Class W222','Sedan','W222','S-Class generation with an available detailed interior 3D reference.'],
 ['a-w176','A-Class W176','Hatchback','W176','Earlier five-door A-Class hatchback guide.'],
 ['cla-c117','CLA C117','Sedan','C117','Earlier CLA four-door model guide.'],
 ['gla-x156','GLA X156','SUV','X156','Earlier GLA compact SUV guide.'],
 ['glc-c253','GLC Coupé C253','SUV','C253','Earlier GLC Coupé generation; the 3D reference depicts a 2019 AMG-Line car.'],
 ['ml-w164','ML-Class W164','SUV','W164','M-Class used-generation guide.'],
 ['ml-w166','ML-Class W166','SUV','W166','M-Class generation sold before the GLE naming change.'],
 ['gl','GL-Class','SUV','Verify chassis','Earlier full-size SUV model family.'],
 ['glk','GLK','SUV','Verify chassis','Earlier compact SUV model family.'],
 ['cls','CLS','Sedan','Verify chassis','Used four-door coupé model family; multiple generations exist.']
];
const mercedesCars=[...currentMercedes.map(([id,model,type,summary])=>({id:'mb-'+id,make:'Mercedes-Benz',model,type,year:'Current range',trim:'Model-family guide · select the exact derivative at source',fuel:/^(EQ|VLE)/.test(model)||model.includes('EQS')?'Electric':'Varies by trim',drive:'Varies',power:null,torque:'Varies by trim',rating:null,review:null,ratingScope:'Not rated',market:'South Africa / UK range reference',summary,note:'This is a model-family entry, not a single engine or trim. Current means listed in the regional source catalogue checked 4–5 October 2026, not confirmed Zimbabwe stock. AMG, hybrid, body and equipment choices vary. Use the original manufacturer catalogue to identify the exact derivative.',groups:{'Model identification':{'Model family':model,'Body style':type,'Coverage':'Regional current model catalogue','Market':'South Africa / United Kingdom'},'Specification guidance':{'Power / torque':'Varies by engine and derivative','Transmission / drive':'Confirm exact derivative at manufacturer source','Equipment':'Market and optional-package dependent','Zimbabwe availability':'Not verified; this is a reference guide'}},sources:[['Mercedes-Benz South Africa — regional model catalogue',mercedesZA],['Mercedes-Benz UK — regional model catalogue',mercedesUK]],collection:'Current Mercedes-Benz',keywords:'Mercedes Benz Merc AMG '+model})),...usedMercedes.map(([id,model,type,code,summary])=>({id:'mb-'+id,make:'Mercedes-Benz',model,type,year:'Used-generation guide',trim:code+' · petrol / diesel / AMG variants differ',fuel:'Varies by trim',drive:'Varies',power:null,torque:'Varies by trim',rating:null,review:null,ratingScope:'Not rated',market:'Used-import reference; verify original market',summary,note:'A generation guide is not an exact vehicle specification. Engine, gearbox and equipment can change during a generation. Match the VIN/chassis, build date and engine code. Zimbabwe listings inform the used-model selection; they are not technical specification sources or an endorsement of sellers.',groups:{'Model identification':{'Model family / generation':model,'Chassis reference':code,'Body style':type,'Coverage':'Selected used generations'},'Before comparing a used import':{'Engine and output':'Verify exact engine code and build date','Transmission':'Check original specification or vehicle data card','Equipment and steering side':'Confirm on the individual vehicle','Expert score':'Not assigned to this model-family guide'}},sources:[['Mercedes-Benz — historical archive','https://mercedes-benz-publicarchive.com/'],['Zimbabwe Mercedes-Benz listings — market context only',mercedesUsed]],collection:'Used Mercedes-Benz',keywords:'Mercedes Benz Merc used import '+code}))];
// A specific, verified reference alongside broader family guides.
mercedesCars.unshift({id:'mb-glc-220d',make:'Mercedes-Benz',model:'GLC 220 d',year:'SA reference',type:'SUV',trim:'220 d · diesel mild hybrid',fuel:'Diesel hybrid',drive:'See derivative',power:145,torque:'440 Nm (engine)',rating:null,review:null,market:'South Africa',summary:'A diesel GLC reference with manufacturer-published engine output. The electric assistance figure is listed separately.',note:'145 kW is combustion-engine output. The manufacturer lists an additional 17 kW electrical boost; do not treat their sum as a certified combined power rating. Confirm trim and build date.',groups:{'Engine & output':{'Engine power':'145 kW','Electrical assistance':'17 kW boost, separately quoted','Engine torque':'440 Nm','Fuel':'Diesel with electric assistance'},'Specification context':{'Model':'GLC 220 d','Reference market':'South Africa','Other specifications':'See the manufacturer’s exact derivative table'}},sources:[['Mercedes-Benz South Africa — GLC technical data','https://www.mercedes-benz.co.za/passengercars/models/suv/glc/overview.html']],collection:'Current Mercedes-Benz',keywords:'GLC220d Mercedes Benz'});
