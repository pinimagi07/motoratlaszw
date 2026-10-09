// Motor Atlas — Range Rover Autobiography additions (October 2026)
// Autobiography is a high-luxury trim line; these entries make it directly searchable in the catalogue.

const rrOfficial='https://www.rangerover.com/en-za/range-rover/models-and-specifications.html';
const rrSportOfficial='https://www.rangerover.com/en-za/range-rover-sport/models-and-specifications.html';

cars.push(...[
  {
    id:'rr-l405-autobiography',
    make:'Land Rover',
    model:'Range Rover L405 Autobiography',
    year:'2012–2021',
    type:'SUV',
    trim:'Autobiography · L405 luxury trim family',
    fuel:'Varies by derivative',
    drive:'4WD',
    power:null,
    torque:'Varies by derivative',
    rating:null,
    market:'Used-generation guide',
    collection:'Range Rover',
    keywords:'Range Rover L405 Autobiography Vogue SDV6 SDV8 TDV6 P400e P525 luxury 2012 2013 2014 2015 2016 2017 2018 2019 2020 2021',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Land_Rover_Range_Rover_Autobiography_L405_Corris_Grey_%281%29.jpg?width=1280',
    imageAlt:'Range Rover L405 Autobiography in Corris Grey',
    summary:'The Autobiography version of the fourth-generation Range Rover, focused on richer materials, comfort equipment and higher luxury specification than regular L405 trims.',
    note:'Autobiography was offered with different petrol, diesel and electrified powertrains depending on year and market. Treat this as a trim-family guide and verify the exact VIN, engine and build date before comparing figures.',
    groups:{
      'Model identification':{
        'Generation':'L405',
        'Trim family':'Autobiography',
        'Production guide':'2012–2021',
        'Body style':'5-door luxury SUV'
      },
      'Autobiography guidance':{
        'Powertrains':'Petrol, diesel and hybrid choices vary by model year',
        'Wheelbase':'Standard and long-wheelbase versions exist',
        'Luxury focus':'Premium leather, richer trim and expanded comfort equipment',
        'Exact specification':'Confirm original-market build sheet or VIN'
      }
    },
    sources:[
      ['Range Rover — current Autobiography positioning',rrOfficial],
      ['Range Rover L405 generation reference','https://en.wikipedia.org/wiki/Range_Rover_(L405)'],
      ['Wikimedia Commons — L405 Autobiography photo','https://commons.wikimedia.org/wiki/File:Land_Rover_Range_Rover_Autobiography_L405_Corris_Grey_(1).jpg']
    ]
  },
  {
    id:'rr-l460-autobiography',
    make:'Land Rover',
    model:'Range Rover L460 Autobiography',
    year:'Current generation',
    type:'SUV',
    trim:'Autobiography · fifth-generation Range Rover',
    fuel:'Petrol / diesel / plug-in hybrid / electric, market dependent',
    drive:'AWD',
    power:null,
    torque:'Varies by derivative',
    rating:null,
    market:'South Africa / global current-range reference',
    collection:'Range Rover',
    keywords:'Range Rover L460 Autobiography P530 D350 P460e EV550 LWB SWB luxury current',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Land_Rover_Range_Rover_P530_Autobiography_LWB_L460_Santorini_Black_%288%29.jpg?width=1280',
    imageAlt:'Range Rover L460 P530 Autobiography LWB in Santorini Black',
    summary:'The flagship luxury-focused Autobiography specification of the current Range Rover, available with multiple powertrains and both standard- and long-wheelbase configurations depending on market.',
    note:'The current South African catalogue lists Autobiography with multiple powertrains, so this entry is intentionally not tied to one output figure. Availability and equipment can change by market and model year.',
    groups:{
      'Model identification':{
        'Generation':'L460',
        'Trim':'Autobiography',
        'Body style':'Luxury SUV',
        'Drivetrain':'All-wheel drive'
      },
      'Current Autobiography highlights':{
        'Powertrain choices':'EV550, P460e, D350 and P530 appear in the current regional catalogue',
        'Transmission':'Automatic on combustion / hybrid derivatives',
        'Chassis':'Electronic air suspension; all-wheel steering on current specification',
        'Luxury equipment':'Digital LED lighting, panoramic roof, premium audio and massage-seat equipment vary by configuration'
      }
    },
    sources:[
      ['Range Rover South Africa — Autobiography models and specifications',rrOfficial],
      ['Wikimedia Commons — L460 P530 Autobiography LWB photo','https://commons.wikimedia.org/wiki/File:Land_Rover_Range_Rover_P530_Autobiography_LWB_L460_Santorini_Black_(8).jpg']
    ]
  },
  {
    id:'rr-sport-l494-autobiography',
    make:'Land Rover',
    model:'Range Rover Sport L494 Autobiography Dynamic',
    year:'2013–2022',
    type:'SUV',
    trim:'Autobiography Dynamic · L494',
    fuel:'Varies by derivative',
    drive:'4WD',
    power:null,
    torque:'Varies by derivative',
    rating:null,
    market:'Used-generation guide',
    collection:'Range Rover',
    keywords:'Range Rover Sport L494 Autobiography Dynamic SDV6 SDV8 petrol diesel P400e 2013 2014 2015 2016 2017 2018 2019 2020 2021 2022',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2015_Land_Rover_Range_Rover_Sport_Autobiography_Dynamic_SDV6_3.0_Front.jpg?width=1280',
    imageAlt:'Range Rover Sport L494 Autobiography Dynamic reference photo',
    summary:'A high-specification L494 Range Rover Sport combining the Sport chassis with Autobiography-grade cabin materials, equipment and Dynamic styling.',
    note:'The pictured vehicle is an SDV6 reference, but Autobiography Dynamic existed with different engines and model-year specifications. Verify the exact derivative before using performance, economy or import figures.',
    groups:{
      'Model identification':{
        'Generation':'L494',
        'Trim family':'Autobiography Dynamic',
        'Production guide':'2013–2022 generation',
        'Body style':'5-door luxury performance SUV'
      },
      'Specification guidance':{
        'Powertrains':'Petrol, diesel and later electrified derivatives vary by year',
        'Transmission':'Automatic; exact calibration depends on derivative',
        'Luxury focus':'Higher-grade leather, trim and comfort specification',
        'Dynamic focus':'Sport-oriented exterior and chassis specification varies by model year'
      }
    },
    sources:[
      ['Range Rover Sport — current Autobiography positioning',rrSportOfficial],
      ['Range Rover Sport generation reference','https://en.wikipedia.org/wiki/Range_Rover_Sport'],
      ['Wikimedia Commons — L494 Autobiography Dynamic photo','https://commons.wikimedia.org/wiki/File:2015_Land_Rover_Range_Rover_Sport_Autobiography_Dynamic_SDV6_3.0_Front.jpg']
    ]
  },
  {
    id:'rr-sport-l461-autobiography',
    make:'Land Rover',
    model:'Range Rover Sport L461 Autobiography',
    year:'Current generation',
    type:'SUV',
    trim:'Autobiography · third-generation Range Rover Sport',
    fuel:'Petrol / diesel / plug-in hybrid, market dependent',
    drive:'AWD',
    power:null,
    torque:'Varies by derivative',
    rating:null,
    market:'South Africa / global current-range reference',
    collection:'Range Rover',
    keywords:'Range Rover Sport L461 Autobiography P360 P460e P530 D350 luxury performance current',
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Land_Rover_Range_Rover_Sport_P400_Autobiography_L461_Santorini_Black_%2812%29.jpg?width=1280',
    imageAlt:'Range Rover Sport L461 Autobiography in Santorini Black',
    summary:'The Autobiography specification of the current Range Rover Sport, combining the L461 platform’s dynamic character with the range’s richer comfort and luxury equipment.',
    note:'Current regional catalogues offer Autobiography with several engines. Output, battery, wheels and equipment therefore depend on the selected derivative and market.',
    groups:{
      'Model identification':{
        'Generation':'L461',
        'Trim':'Autobiography',
        'Body style':'Luxury performance SUV',
        'Drivetrain':'All-wheel drive'
      },
      'Current Autobiography highlights':{
        'Powertrain choices':'P460e, P360, P530 and D350 appear in the current South African catalogue',
        'Lighting':'Digital LED headlights with signature DRL and image projection on current specification',
        'Seating':'Heated / ventilated massage front seats and power-recline rear seating on current specification',
        'Cabin':'Autobiography badging, premium trim and four-zone climate equipment'
      }
    },
    sources:[
      ['Range Rover Sport South Africa — Autobiography models and specifications',rrSportOfficial],
      ['Wikimedia Commons — L461 Autobiography photo','https://commons.wikimedia.org/wiki/File:Land_Rover_Range_Rover_Sport_P400_Autobiography_L461_Santorini_Black_(12).jpg']
    ]
  }
]);
