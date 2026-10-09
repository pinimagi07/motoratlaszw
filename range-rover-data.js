// Motor Atlas — Range Rover additions (October 2026)
// Model-family and generation guides; exact specifications vary by engine, trim, market and model year.

const rangeRoverFamily='https://www.landrover.com/families/range-rover';
const rangeRoverCurrent='https://www.landrover.com/range-rover/range-rover/highlights.html';
const rangeRoverSportCurrent='https://jamaica.landrover.com/range-rover/range-rover-sport/models-and-specifications';
const rangeRoverVelarCurrent='https://www.landrover.com/range-rover/range-rover-velar/models.html';
const rangeRoverEvoqueCurrent='https://jamaica.landrover.com/range-rover/range-rover-evoque/models-and-specifications';

cars.push(...[
  {
    id:'rr-l405',make:'Land Rover',model:'Range Rover L405',year:'2012–2021',type:'SUV',
    trim:'Fourth-generation Range Rover · petrol / diesel / hybrid variants differ',fuel:'Varies by trim',drive:'4WD',power:null,torque:'Varies by trim',rating:null,
    market:'Used-generation guide',collection:'Range Rover',keywords:'Range Rover L405 Vogue Autobiography SDV6 TDV6 SDV8 P400e 2012 2013 2014 2015 2016 2017 2018 2019 2020 2021',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Land_Rover_Range_Rover_L405_black_%281%29.jpg?width=1280',
    imageAlt:'Black Range Rover L405 reference photo',
    summary:'Fourth-generation flagship Range Rover, notable for its aluminium-intensive body structure and broad petrol, diesel and electrified derivative range.',
    note:'Generation guide only. Engine, gearbox, wheelbase and equipment vary substantially by year and derivative. Match the exact VIN, build date and engine before using figures for buying or import decisions.',
    groups:{
      'Model identification':{'Generation':'L405','Production guide':'2012–2021','Body style':'5-door luxury SUV','Drivetrain':'Four-wheel drive'},
      'Specification guidance':{'Engines':'Petrol, diesel and hybrid derivatives vary by year','Transmission':'Mostly 8-speed automatic; verify exact derivative','Wheelbase':'Standard and long-wheelbase versions exist','Equipment':'Vogue, Autobiography and performance-oriented trims differ'}
    },
    sources:[['Range Rover family — official',rangeRoverFamily],['Range Rover L405 generation reference','https://en.wikipedia.org/wiki/Range_Rover_(L405)'],['Wikimedia Commons — L405 reference image','https://commons.wikimedia.org/wiki/File:Land_Rover_Range_Rover_L405_black_(1).jpg']]
  },
  {
    id:'rr-l460',make:'Land Rover',model:'Range Rover L460',year:'Current generation',type:'SUV',
    trim:'Fifth-generation Range Rover · exact derivative varies by market',fuel:'Varies by trim',drive:'AWD',power:null,torque:'Varies by trim',rating:null,
    market:'Current Range Rover reference',collection:'Range Rover',keywords:'Range Rover L460 SE HSE Autobiography SV P460e P550e P530 D350 current',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Land_Rover_RANGE_ROVER_Autobiography_P530_Standard-wheelbase_%28L460%29_front.jpg?width=1280',
    imageAlt:'Range Rover L460 Autobiography reference photo',
    summary:'Fifth-generation Range Rover combining the marque’s flagship luxury focus with petrol, diesel and electrified powertrains depending on market.',
    note:'This is a current model-family guide, not one fixed engine or trim. Power, seating, wheelbase, battery and equipment vary by derivative and market.',
    groups:{
      'Model identification':{'Generation':'L460','Body style':'Luxury SUV','Wheelbase':'Standard and long-wheelbase choices','Drivetrain':'All-wheel drive'},
      'Specification guidance':{'Powertrains':'Petrol, diesel and electrified derivatives','Transmission':'Automatic; confirm exact derivative','Seats':'Configuration varies by body and wheelbase','Equipment':'SE, HSE, Autobiography and SV specifications vary'}
    },
    sources:[['Range Rover — official current model',rangeRoverCurrent],['Range Rover family — official',rangeRoverFamily],['Wikimedia Commons — L460 reference image','https://commons.wikimedia.org/wiki/File:Land_Rover_RANGE_ROVER_Autobiography_P530_Standard-wheelbase_(L460)_front.jpg']]
  },
  {
    id:'rr-sport-l320',make:'Land Rover',model:'Range Rover Sport L320',year:'2005–2013',type:'SUV',
    trim:'First-generation Range Rover Sport · petrol / diesel / supercharged variants differ',fuel:'Varies by trim',drive:'4WD',power:null,torque:'Varies by trim',rating:null,
    market:'Used-generation guide',collection:'Range Rover',keywords:'Range Rover Sport L320 TDV6 TDV8 HSE Supercharged 2005 2006 2007 2008 2009 2010 2011 2012 2013',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Range_Rover_Sport_front.jpg?width=1280',
    imageAlt:'First-generation Range Rover Sport L320 reference photo',
    summary:'First-generation Range Rover Sport, positioned as the more road-focused and performance-oriented member of the Range Rover family.',
    note:'Used-generation guide. Engines, suspension specification, facelift details and equipment vary by year and market; verify the exact derivative before comparing.',
    groups:{
      'Model identification':{'Generation':'L320','Production guide':'2005–2013','Body style':'5-door SUV','Drivetrain':'Four-wheel drive'},
      'Specification guidance':{'Engines':'Petrol and diesel choices vary by year','Performance versions':'Supercharged derivatives available in some markets','Transmission':'Automatic; verify model year','Suspension':'Air-suspension specification varies by derivative'}
    },
    sources:[['Range Rover family — official',rangeRoverFamily],['Range Rover Sport generation reference','https://en.wikipedia.org/wiki/Range_Rover_Sport'],['Wikimedia Commons — L320 reference image','https://commons.wikimedia.org/wiki/File:Range_Rover_Sport_front.jpg']]
  },
  {
    id:'rr-sport-l494',make:'Land Rover',model:'Range Rover Sport L494',year:'2013–2022',type:'SUV',
    trim:'Second-generation Range Rover Sport · petrol / diesel / PHEV / SVR variants differ',fuel:'Varies by trim',drive:'4WD',power:null,torque:'Varies by trim',rating:null,
    market:'Used-generation guide',collection:'Range Rover',keywords:'Range Rover Sport L494 HSE Autobiography Dynamic SVR SDV6 SDV8 P400e 2013 2014 2015 2016 2017 2018 2019 2020 2021 2022',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Land_Rover_RANGE_ROVER_SPORT_HSE_%28L494%29_front.jpg?width=1280',
    imageAlt:'Range Rover Sport L494 HSE reference photo',
    summary:'Second-generation Range Rover Sport with a lighter platform, broad engine choice and performance derivatives including SVR.',
    note:'Generation guide only. Facelift, engine, hybrid system, brake, suspension and equipment details can differ substantially across the L494 production run.',
    groups:{
      'Model identification':{'Generation':'L494','Production guide':'2013–2022','Body style':'5-door SUV','Drivetrain':'Four-wheel drive'},
      'Specification guidance':{'Engines':'Petrol, diesel and plug-in hybrid derivatives','Performance':'SVR offered in selected years and markets','Transmission':'Automatic; verify exact derivative','Equipment':'HSE, Autobiography and Dynamic specifications vary'}
    },
    sources:[['Range Rover family — official',rangeRoverFamily],['Range Rover Sport generation reference','https://en.wikipedia.org/wiki/Range_Rover_Sport'],['Wikimedia Commons — L494 reference image','https://commons.wikimedia.org/wiki/File:Land_Rover_RANGE_ROVER_SPORT_HSE_(L494)_front.jpg']]
  },
  {
    id:'rr-sport-l461',make:'Land Rover',model:'Range Rover Sport L461',year:'Current generation',type:'SUV',
    trim:'Third-generation Range Rover Sport · exact derivative varies by market',fuel:'Varies by trim',drive:'AWD',power:null,torque:'Varies by trim',rating:null,
    market:'Current Range Rover Sport reference',collection:'Range Rover',keywords:'Range Rover Sport L461 S SE Dynamic Autobiography SV D300 P530 PHEV current',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Land_Rover_RANGE_ROVER_SPORT_DYNAMIC_HSE_D300_%28L461%29_front.jpg?width=1280',
    imageAlt:'Range Rover Sport L461 Dynamic HSE reference photo',
    summary:'Current Range Rover Sport generation, blending luxury with a more dynamic chassis focus and a mix of combustion and electrified derivatives.',
    note:'Current model-family guide. Engine, battery, output, suspension and trim specifications vary by derivative and regional catalogue.',
    groups:{
      'Model identification':{'Generation':'L461','Body style':'5-door luxury performance SUV','Drivetrain':'All-wheel drive','Coverage':'Current generation'},
      'Specification guidance':{'Powertrains':'Petrol, diesel and electrified derivatives','Transmission':'Automatic','Performance versions':'SV and other high-output versions vary by market','Equipment':'S, SE, Dynamic and Autobiography specifications differ'}
    },
    sources:[['Range Rover Sport — official models',rangeRoverSportCurrent],['Range Rover family — official',rangeRoverFamily],['Wikimedia Commons — L461 reference image','https://commons.wikimedia.org/wiki/File:Land_Rover_RANGE_ROVER_SPORT_DYNAMIC_HSE_D300_(L461)_front.jpg']]
  },
  {
    id:'rr-velar',make:'Land Rover',model:'Range Rover Velar',year:'Current range',type:'SUV',
    trim:'Velar model-family guide · petrol / diesel / electric-hybrid derivatives vary',fuel:'Varies by trim',drive:'AWD',power:null,torque:'Varies by trim',rating:null,
    market:'Current Range Rover reference',collection:'Range Rover',keywords:'Range Rover Velar S Dynamic SE Autobiography P400e petrol diesel AWD',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Range-Rover_Velar_R-Dynamic_front.jpg?width=1280',
    imageAlt:'Range Rover Velar R-Dynamic reference photo',
    summary:'Mid-size Range Rover positioned between Evoque and Sport, with a strong design focus and petrol, diesel and electric-hybrid choices depending on market.',
    note:'Model-family guide. Exact engine, battery, wheel, trim and equipment specification must be checked against the original-market vehicle.',
    groups:{
      'Model identification':{'Model family':'Range Rover Velar','Body style':'Mid-size luxury SUV','Seats':'5','Drivetrain':'All-wheel drive'},
      'Specification guidance':{'Powertrains':'Petrol, diesel and electric-hybrid derivatives','Transmission':'Automatic','Infotainment':'Pivi Pro on current models','Equipment':'S, Dynamic SE and Autobiography specifications vary'}
    },
    sources:[['Range Rover Velar — official models',rangeRoverVelarCurrent],['Range Rover family — official',rangeRoverFamily],['Wikimedia Commons — Velar reference image','https://commons.wikimedia.org/wiki/File:Range-Rover_Velar_R-Dynamic_front.jpg']]
  },
  {
    id:'rr-evoque',make:'Land Rover',model:'Range Rover Evoque',year:'Current range',type:'SUV',
    trim:'Evoque model-family guide · petrol / diesel / electric-hybrid derivatives vary',fuel:'Varies by trim',drive:'AWD',power:null,torque:'Varies by trim',rating:null,
    market:'Current Range Rover reference',collection:'Range Rover',keywords:'Range Rover Evoque L551 S Autobiography PHEV petrol diesel AWD compact SUV',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Range_Rover_Evoque_%28L551%29_IMG_0367.jpg?width=1280',
    imageAlt:'Range Rover Evoque L551 reference photo',
    summary:'Compact Range Rover with a coupé-like profile, luxury-focused cabin and combustion or electrified powertrains depending on derivative and market.',
    note:'Model-family guide. The Evoque spans multiple model years and derivatives; verify exact engine, transmission, battery and equipment from the individual vehicle.',
    groups:{
      'Model identification':{'Model family':'Range Rover Evoque','Current generation':'L551','Body style':'Compact luxury SUV','Drivetrain':'All-wheel drive on many derivatives; verify exact model'},
      'Specification guidance':{'Powertrains':'Petrol, diesel and electric-hybrid derivatives','Transmission':'Automatic on current range','Technology':'Current models include modern driver-assistance and connected infotainment','Equipment':'S and Autobiography specifications vary by market'}
    },
    sources:[['Range Rover Evoque — official models',rangeRoverEvoqueCurrent],['Range Rover family — official',rangeRoverFamily],['Wikimedia Commons — Evoque L551 reference image','https://commons.wikimedia.org/wiki/File:Range_Rover_Evoque_(L551)_IMG_0367.jpg']]
  }
]);
