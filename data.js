const TG='https://www.topgear.com/car-reviews/';
const cars=[
{id:'hilux',make:'Toyota',model:'Hilux',year:2023,type:'Pickup',trim:'2.8 D-4D GR Sport · 6-speed auto',fuel:'Diesel',drive:'4WD',power:150,torque:'500 Nm',rating:6,review:TG+'toyota/first-drive-9',ratingScope:'2023 UK GR Sport road test',market:'United Kingdom',summary:'A rugged double-cab pickup with low-range four-wheel drive and a strong towing capacity. The review highlights its off-road ability but finds the ride and drivetrain unrefined.',note:'The UK GR Sport specification differs from South African and other GR Sport versions. Confirm the exact vehicle specification before comparing.',groups:{'Engine & drivetrain':{'Engine':'2.8-litre, 4-cylinder turbo diesel','Power':'150 kW / 204 PS','Torque':'500 Nm','Transmission':'6-speed automatic','Drive':'Selectable 4WD with low range','Rear differential':'Locking'},'Capability & chassis':{'Body':'Double-cab pickup','Braked towing':'Up to 3,500 kg','Payload':'Up to 1,000 kg','Wheels':'17-inch alloys','Rear suspension':'Leaf springs','Rear brakes':'Drums'},'Comfort & equipment':{'Air conditioning':'Dual-zone climate control','Headlights':'LED','Audio':'JBL','Navigation':'Included','Seats':'Heated front and rear','Hill descent':'Downhill Assist Control'}},sources:[['Toyota UK — GR Sport specification','https://www.toyota.co.uk/discover-toyota/stories-news-events/hilux-gr-sport']]},
{id:'rav4',make:'Toyota',model:'RAV4',year:2019,type:'SUV',trim:'2.5 Hybrid · Front-wheel drive',fuel:'Hybrid',drive:'FWD',power:160,torque:'221 Nm (engine)',rating:7,review:TG+'toyota/rav4-2018-2025',ratingScope:'UK RAV4 generation review, 2018–2025',market:'United Kingdom',summary:'A practical hybrid SUV with a large boot and an efficiency-focused drivetrain. The published score covers the wider model generation.',note:'This entry is the front-wheel-drive hybrid, not AWD-i or the plug-in hybrid. Engine torque is not a combined hybrid-system torque figure.',groups:{'Engine & drivetrain':{'Engine':'2.5-litre, 4-cylinder petrol hybrid','System power':'160 kW / 218 PS','Engine torque':'221 Nm','Transmission':'Hybrid e-CVT','Drive':'Front-wheel drive','0–100 km/h':'8.4 seconds'},'Dimensions & capacity':{'Length':'4,600 mm','Width (body)':'1,855 mm','Height':'1,685 mm','Wheelbase':'2,690 mm','Ground clearance':'190 mm','Boot (VDA)':'580 litres'},'Performance & weights':{'Maximum speed':'180 km/h (112 mph)','Kerb weight':'1,590–1,680 kg','Seats':'5','Body':'5-door SUV','Fuel economy':'See source; test-cycle dependent','Fuel tank':'Not verified in this catalogue'}},sources:[['Toyota — launch technical specifications','https://media.toyota.co.uk/the-new-toyota-rav4/']]},
{id:'ranger',make:'Ford',model:'Ranger',year:2021,type:'Pickup',trim:'Wildtrak 2.0 Bi-Turbo · 10-speed auto',fuel:'Diesel',drive:'4WD',power:157,torque:'500 Nm',rating:7,review:TG+'ford/ranger-2011-2022',ratingScope:'UK Ranger generation review, 2011–2022',market:'Australia (specification reference)',summary:'A double-cab pickup pairing a twin-turbo diesel with a ten-speed automatic. The expert score is for the UK model generation, rather than this individual Australian trim.',note:'Australian MY2021 Wildtrak reference specification. Zimbabwe and South African equipment and homologation figures can differ.',groups:{'Engine & drivetrain':{'Engine':'2.0-litre, 4-cylinder twin-turbo diesel','Power':'157 kW at 3,750 rpm','Torque':'500 Nm at 1,750 rpm','Transmission':'10-speed automatic','Drive':'Four-wheel drive','Fuel':'Diesel'},'Body & reference':{'Body':'Double-cab pickup','Doors':'4','Model year':'2021','Trim':'Wildtrak 2.0','Specification market':'Australia','Rating market':'United Kingdom'},'Further specifications':{'Dimensions':'See full specification source','Fuel consumption':'See full specification source','Payload & towing':'Check vehicle compliance plate','Safety equipment':'Confirm market and build date'}},sources:[['CarExpert — exact Wildtrak variant','https://www.carexpert.com.au/ford/ranger/2021-wildtrak-2l-utility-4x4-diesel-automatic-jowwk55w20201126']]},
{id:'swift',make:'Suzuki',model:'Swift',year:2021,type:'Hatchback',trim:'1.2 Dualjet mild hybrid · Manual',fuel:'Mild hybrid',drive:'FWD',power:61,torque:'107 Nm',rating:6,review:TG+'suzuki/swift-2017-2023',ratingScope:'UK Swift generation review, 2017–2023',market:'United Kingdom',summary:'A compact, light hatchback with a mild-hybrid petrol engine. The review praises its agility and equipment, while finding the engine performance modest.',note:'This is the UK mild-hybrid model. The regular 1.2 petrol Swift sold in southern Africa has a different powertrain; the photo shows the same-generation GLX.',groups:{'Engine & drivetrain':{'Engine':'1.2-litre, 4-cylinder petrol','Hybrid system':'12V mild hybrid','Power':'61 kW / 83 PS','Torque':'107 Nm','Transmission':'Manual','Drive':'Front-wheel drive'},'Performance & efficiency':{'0–100 km/h':'13.1 seconds','Fuel consumption':'4.9 L/100 km (converted)','Published economy':'57.2 UK mpg','Published CO₂':'111 g/km','Charging':'No plug-in charging','Body':'5-door hatchback'},'Model identification':{'Generation':'2017–2023','Reference year':'2021','Specification market':'United Kingdom','Dimensions & equipment':'See original review and variant brochure'}},sources:[['Top Gear — engine and economy details',TG+'suzuki/swift-2017-2023']]},
{id:'jazz',make:'Honda',model:'Jazz / Fit',year:2020,type:'Hatchback',trim:'Jazz 1.5 e:HEV · Hybrid automatic',fuel:'Hybrid',drive:'FWD',power:80,torque:'253 Nm (motor)',rating:6,review:TG+'honda/jazz-0',ratingScope:'UK fourth-generation Jazz review (2022)',market:'Europe (Jazz, standard body)',summary:'A space-efficient hybrid hatchback with flexible rear seating. The expert review focuses on everyday usability and a practical cabin.',note:'Jazz is related to the Japanese-market Fit, but this entry uses European Jazz e:HEV specifications. It does not describe older Fit imports or every Japanese trim.',groups:{'Engine & drivetrain':{'Engine':'1.5-litre DOHC i-VTEC petrol hybrid','Propulsion power':'80 kW / 109 PS','Electric motor torque':'253 Nm','Transmission':'Hybrid fixed-gear automatic','Drive':'Front-wheel drive','0–100 km/h':'9.4 seconds'},'Dimensions & capacity':{'Length':'4,044 mm','Width (body)':'1,694 mm','Height':'1,526 mm','Wheelbase':'2,517 mm','Boot (seats up, VDA)':'304 litres','Fuel tank':'40 litres'},'Efficiency & practicality':{'Fuel economy (WLTP, from)':'4.5 L/100 km','CO₂ (WLTP, from)':'102 g/km','Maximum speed':'175 km/h','Kerb weight':'1,228–1,246 kg','Boot, seats down to roof':'1,205 litres','Seats':'5'}},sources:[['Honda — 2020 Jazz technical specifications','https://hondanews.eu/nl/nl/cars/media/pressreleases/311941/2020-honda-jazz-and-jazz-crosstar-1']]},
{id:'corolla',make:'Toyota',model:'Corolla',year:2023,type:'Hatchback',trim:'1.8 Hybrid Icon · e-CVT',fuel:'Hybrid',drive:'FWD',power:103,torque:'142 Nm (engine)',rating:6,review:TG+'toyota/corolla',ratingScope:'UK Corolla hatchback range review (2025)',market:'United Kingdom',summary:'A hybrid hatchback designed for relaxed daily driving. The expert review favours its calm character but finds some rivals more practical or engaging.',note:'UK 1.8 Hybrid Icon hatchback reference. This is not the Corolla sedan, Axio or Fielder. The photo shows GR Sport styling, not Icon equipment.',groups:{'Engine & drivetrain':{'Engine':'1,798 cc, 4-cylinder petrol hybrid','System power':'103 kW / 140 PS','Engine torque':'142 Nm at 3,600 rpm','Motor torque':'185 Nm','Transmission':'Hybrid e-CVT','Drive':'Front-wheel drive'},'Dimensions & capacity':{'Length':'4,370 mm','Width (body)':'1,790 mm','Height':'1,460 mm','Wheelbase':'2,640 mm','Ground clearance':'135 mm','Boot':'361 litres'},'Performance & equipment':{'0–100 km/h':'9.1 seconds','Maximum speed':'180 km/h (112 mph)','Braked towing':'750 kg','Wheels (Icon)':'16-inch alloys','Multimedia display':'10.5 inches','Driver display':'12.3 inches'}},sources:[['Toyota — 2023 Corolla technical specifications','https://mag.toyota.co.uk/2023-toyota-corolla/comment-page-3/']]}
];

cars.push(...[
  {
    "id": "jimny",
    "make": "Suzuki",
    "model": "Jimny",
    "year": 2019,
    "type": "SUV",
    "trim": "1.5 ALLGRIP · 5-speed manual",
    "fuel": "Petrol",
    "drive": "4WD",
    "power": 75,
    "torque": "130 Nm",
    "rating": 7,
    "review": "https://www.topgear.com/car-reviews/suzuki/jimny-0",
    "ratingScope": "UK model-generation review; not a Zimbabwe-specific trim assessment",
    "market": "United Kingdom",
    "summary": "A compact off-roader with a ladder chassis, rigid axles and low-range gearing. Its road manners and economy reflect that off-road focus.",
    "groups": {
      "Engine & drivetrain": {
        "Engine": "1.5-litre, 4-cylinder petrol",
        "Power": "75 kW (rounded)",
        "Torque": "130 Nm (rounded)",
        "Transmission": "5-speed manual",
        "Drive": "Part-time 4WD",
        "Low range": "Included"
      },
      "Chassis & capability": {
        "Construction": "Ladder frame",
        "Front suspension": "3-link rigid axle, coil springs",
        "Rear suspension": "3-link rigid axle, coil springs",
        "Hill descent control": "Included",
        "Maximum speed": "145 km/h (90 mph)",
        "0–100 km/h": "Not published by manufacturer"
      },
      "Efficiency & body": {
        "Body": "3-door SUV",
        "Seats": "4 (passenger model)",
        "Fuel economy (WLTP)": "36.7 UK mpg / 7.7 L/100 km",
        "CO₂ (WLTP)": "173 g/km"
      }
    },
    "sources": [
      [
        "Suzuki — Jimny chassis and equipment",
        "https://www.globalsuzuki.com/automobile/lineup/jimny/"
      ],
      [
        "Top Gear — UK Jimny reference",
        "https://www.topgear.com/car-reviews/suzuki/jimny-0"
      ]
    ],
    "note": "Three-door passenger model, not the later two-seat commercial Jimny or five-door version. Power and torque are rounded from the published UK figures."
  },
  {
    "id": "xtrail",
    "make": "Nissan",
    "model": "X-Trail",
    "year": 2017,
    "type": "SUV",
    "trim": "1.6 dCi · 4WD manual",
    "fuel": "Diesel",
    "drive": "4WD",
    "power": 96,
    "torque": "320 Nm",
    "rating": 6,
    "review": "https://www.topgear.com/car-reviews/nissan/x-trail-2013-2022",
    "ratingScope": "UK model-generation review; not a Zimbabwe-specific trim assessment",
    "market": "United Kingdom",
    "summary": "A family SUV with flexible seating and an available third row. The review values its space but notes that some rivals offer more modern cabins.",
    "groups": {
      "Engine & drivetrain": {
        "Engine": "1.6-litre dCi turbo diesel",
        "Power": "96 kW / 130 PS", "Torque": "320 Nm at 1,750 rpm",
        "Transmission": "6-speed manual",
        "Drive": "All Mode 4x4-i",
        "Body": "5-door SUV"
      },
      "Cabin & practicality": {
        "Seating": "5; optional third row for 7",
        "Second row": "Sliding, reclining and split-folding",
        "Rear suspension": "Multi-link",
        "Air conditioning": "Included",
        "Cruise control": "Included",
        "Bluetooth": "Included"
      },
      "Reference details": {
        "Generation": "T32 / 2013–2022 review",
        "Reference model year": "2017",
        "Exact dimensions": "Verify trim specification",
        "Fuel economy": "Not verified in this catalogue"
      }
    },
    "sources": [
      [
        "Top Gear — generation and engine range",
        "https://www.topgear.com/car-reviews/nissan/x-trail-2013-2022"
      ],
      [
        "Top Gear — 1.6 dCi 4WD road test",
        "https://www.topgear.com/car-reviews/nissan/x-trail-diesel-station-wagon-2014/16-dci-tekna-5dr-4wd/first-drive"
      ]
    ],
    "note": "European diesel specification. Many Japanese-market X-Trail imports use petrol or hybrid powertrains; those are not described here."
  },
  {
    "id": "cx5",
    "make": "Mazda",
    "model": "CX-5",
    "year": 2020,
    "type": "SUV",
    "trim": "2.0 Skyactiv-G SE-L · Manual",
    "fuel": "Petrol",
    "drive": "FWD",
    "power": 121,
    "torque": "213 Nm",
    "rating": 7,
    "review": "https://www.topgear.com/car-reviews/mazda/cx-5-2017-2025",
    "ratingScope": "UK model-generation review; not a Zimbabwe-specific trim assessment",
    "market": "United Kingdom",
    "summary": "A petrol SUV offering a conventional manual gearbox. The generation review highlights a driver-focused approach with a broad choice of engines.",
    "groups": {
      "Engine & drivetrain": {
        "Engine": "1,998 cc, 4-cylinder petrol",
        "Power": "121 kW at 6,000 rpm",
        "Torque": "213 Nm",
        "Transmission": "6-speed manual",
        "Drive": "Front-wheel drive",
        "Compression ratio": "13.0:1"
      },
      "Performance & capacity": {
        "0–100 km/h": "10.3 seconds",
        "Maximum speed": "201 km/h (125 mph)",
        "Fuel tank": "56 litres",
        "Boot, seats up": "506 litres",
        "Seats": "5",
        "Doors": "5"
      },
      "Wheels & weights": {
        "Wheelbase": "2,700 mm",
        "Minimum kerb weight": "1,505 kg",
        "Gross vehicle weight": "2,020 kg",
        "Braked towing": "1,800 kg",
        "Wheels": "17-inch alloys",
        "Tyres": "225/65 R17"
      }
    },
    "sources": [
      [
        "Top Gear — 2.0 SE-L specification",
        "https://www.topgear.com/car-reviews/mazda/cx-5/20-se-l-5dr/spec"
      ]
    ],
    "note": "UK 2.0 petrol manual reference. Do not apply these figures to the 2.2 diesel, AWD or automatic versions; equipment can vary by build date."
  },
  {
    "id": "yaris",
    "make": "Toyota",
    "model": "Yaris",
    "year": 2022,
    "type": "Hatchback",
    "trim": "1.5 Hybrid Icon · e-CVT",
    "fuel": "Hybrid",
    "drive": "FWD",
    "power": 85,
    "torque": "120 Nm (engine)",
    "rating": 7,
    "review": "https://www.topgear.com/car-reviews/toyota/yaris",
    "ratingScope": "UK model-generation review; not a Zimbabwe-specific trim assessment",
    "market": "United Kingdom",
    "summary": "A small hybrid hatchback with compact dimensions and an automatic drivetrain. This entry covers the 116 PS powertrain rather than the later 130 PS version.",
    "groups": {
      "Engine & drivetrain": {
        "Engine": "1,490 cc, 3-cylinder petrol hybrid",
        "System power": "85 kW / 116 PS",
        "Engine torque": "120 Nm at 3,600 rpm",
        "Motor torque": "141 Nm",
        "Transmission": "Hybrid e-CVT",
        "Drive": "Front-wheel drive"
      },
      "Dimensions & capacity": {
        "Length": "3,940 mm",
        "Width (body)": "1,745 mm",
        "Height": "1,500 mm",
        "Wheelbase": "2,560 mm",
        "Boot": "286 litres",
        "Fuel tank": "36 litres"
      },
      "Performance & chassis": {
        "0–100 km/h": "9.7 seconds",
        "Maximum speed": "175 km/h (109 mph)",
        "Kerb weight": "1,085–1,160 kg",
        "Braked towing": "450 kg",
        "Front suspension": "MacPherson struts",
        "Rear suspension": "Torsion beam"
      }
    },
    "sources": [
      [
        "Toyota — February 2022 technical specification",
        "https://media.toyota.co.uk/wp-content/uploads/sites/5/pdf/220208M-Yaris-Tech-Spec.pdf"
      ]
    ],
    "note": "UK fourth-generation hybrid hatchback. The photograph represents this generation; this is not a Vitz, Yaris sedan or GR Yaris."
  },
  {
    "id": "crv",
    "make": "Honda",
    "model": "CR-V",
    "year": 2019,
    "type": "SUV",
    "trim": "2.0 i-MMD Hybrid · FWD",
    "fuel": "Hybrid",
    "drive": "FWD",
    "power": 135,
    "torque": "315 Nm (motor)",
    "rating": 6,
    "review": "https://www.topgear.com/car-reviews/honda/cr-v-2016-2023",
    "ratingScope": "UK model-generation review; not a Zimbabwe-specific trim assessment",
    "market": "United Kingdom",
    "summary": "A five-seat hybrid family SUV with a roomy cabin. Its powertrain switches between electric, hybrid and direct engine drive.",
    "groups": {
      "Engine & drivetrain": {
        "Engine": "2.0-litre i-VTEC Atkinson-cycle petrol",
        "Engine power": "107 kW / 145 PS",
        "Electric propulsion power": "135 kW / 184 PS",
        "Motor torque": "315 Nm",
        "Transmission": "Hybrid fixed-gear automatic",
        "Drive": "Front-wheel drive"
      },
      "Dimensions & capacity": {
        "Length": "4,600 mm",
        "Width, including mirrors": "2,117.2 mm",
        "Height": "1,679 mm",
        "Wheelbase": "2,663 mm",
        "Ground clearance": "182 mm",
        "Boot (VDA)": "497 litres"
      },
      "Performance & weights": {
        "0–100 km/h": "8.8 seconds",
        "Maximum speed": "180 km/h",
        "Kerb weight": "1,614–1,657 kg",
        "Braked towing": "750 kg",
        "Fuel tank": "57 litres",
        "Seats": "5"
      }
    },
    "sources": [
      [
        "Honda — 2019 CR-V Hybrid technical release",
        "https://hondanews.eu/eu/en/cars/media/pressreleases/159191/2019-honda-cr-v-hybrid56"
      ]
    ],
    "note": "European 2019 front-wheel-drive hybrid. AWD and turbo-petrol CR-Vs have different specifications. Engine and motor powers must not be added together."
  },
  {
    "id": "dmax",
    "make": "Isuzu",
    "model": "D-Max",
    "year": 2021,
    "type": "Pickup",
    "trim": "1.9 Double Cab 4x4 · Manual",
    "fuel": "Diesel",
    "drive": "4WD",
    "power": 121,
    "torque": "360 Nm",
    "rating": 6,
    "review": "https://www.topgear.com/car-reviews/isuzu/d-max",
    "ratingScope": "UK model-generation review; not a Zimbabwe-specific trim assessment",
    "market": "United Kingdom",
    "summary": "A work-focused pickup with a diesel engine and substantial towing capability. Double-cab versions gained additional driver-assistance systems at the 2021 UK launch.",
    "groups": {
      "Engine & drivetrain": {
        "Engine": "1.9-litre, 4-cylinder turbo diesel",
        "Power": "121 kW (164 PS, rounded)",
        "Torque": "360 Nm",
        "Transmission": "6-speed manual",
        "Drive": "Selectable 4WD",
        "Emissions standard": "Euro 6D"
      },
      "Body & capability": {
        "Body": "Double-cab pickup",
        "Braked towing": "Up to 3,500 kg",
        "Payload": "Over 1,000 kg; trim dependent",
        "Construction": "Ladder chassis",
        "Rear suspension": "Leaf springs",
        "Dimensions": "Check exact trim specification"
      },
      "Driver assistance": {
        "Automatic emergency braking": "Included",
        "Traffic sign recognition": "Included",
        "Lane departure warning": "Included",
        "Blind-spot monitor": "Double-cab models",
        "Rear cross-traffic alert": "Double-cab models",
        "Emergency lane keeping": "Double-cab models"
      }
    },
    "sources": [
      [
        "Isuzu — 2021 UK launch specifications",
        "https://www.isuzu.co.uk/news/the-all-new-isuzu-d-max-arrives-in-showrooms-march-2021/"
      ]
    ],
    "note": "UK 1.9 diesel double-cab reference, not a southern African 3.0-litre model or the electric D-Max. Payload and equipment vary by trim."
  }
]);

cars.find(c=>c.id==="xtrail").sources.push(["Nissan — dCi 130 engine specification","https://europe.nissannews.com/en-GB/releases/nissan-strengthens-grip-on-crossover-sector-with-all-new-x-trail-1"]);
