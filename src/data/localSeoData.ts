export interface LocalCityData {
  slug: string;
  cityName: string;
  stateId: string;
  stateName: string;
  stateCode: string;
  metroArea: string;
  title: string;
  metaDesc: string;
  h1: string;
  heroSnippet: string;
  localKeywords: string[];
  localTaxSavingsPercent: string;
  localSalesTaxRate: string;
  medicalTaxRate: string;
  sampleYearlySavings: string;
  popularDispensaryAreas: string[];
  geo: {
    lat: number;
    lng: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  cityFaqs: {
    q: string;
    a: string;
  }[];
}

export const LOCAL_CITIES_DATA: LocalCityData[] = [
  // --- CALIFORNIA ---
  {
    slug: 'los-angeles-ca',
    cityName: 'Los Angeles',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'Greater Los Angeles & San Fernando Valley',
    title: 'Medical Marijuana Doctor Los Angeles | Fast 420 Evaluations LA',
    metaDesc: 'Get your Los Angeles medical marijuana card online in 15 mins. Board-certified MMJ doctors, same-day 420 evaluations, save up to 34.5% LA cannabis taxes.',
    h1: 'Medical Marijuana Doctor Los Angeles & 420 Evaluations',
    heroSnippet: 'Skip the traffic on the 405. Connect 100% online with a licensed Los Angeles MMJ doctor for your 420 evaluation. Receive your official California medical cannabis recommendation on the same day with immediate dispensary validity.',
    localKeywords: [
      'medical marijuana doctor los angeles',
      '420 evaluations los angeles',
      'mmj card los angeles',
      'medical cannabis card la',
      'los angeles 420 doctor near me',
      'same day mmj card los angeles',
      'cheap 420 evaluations downtown la'
    ],
    localTaxSavingsPercent: 'Up to 34.5%',
    localSalesTaxRate: '9.5% + 15% State Excise + 10% LA City Business Tax (Total ~34.5%)',
    medicalTaxRate: '15% State Excise (Exempt from 9.5% sales tax and local tax breaks)',
    sampleYearlySavings: '$1,380/year',
    popularDispensaryAreas: ['Downtown LA (DTLA)', 'West Hollywood', 'Venice & Santa Monica', 'North Hollywood (NoHo)', 'Silver Lake & Echo Park', 'Culver City'],
    geo: { lat: 34.0522, lng: -118.2437 },
    address: { street: '700 S Flower St, Suite 1000', city: 'Los Angeles', state: 'CA', zip: '90017' },
    phone: '(213) 420-5690',
    cityFaqs: [
      {
        q: 'Do I need to visit an MMJ clinic in Los Angeles in person?',
        a: 'No. Under California telehealth law (Telehealth Advancement Act), 100% of your 420 evaluation with our licensed physician is completed via encrypted video or phone from home in Los Angeles.'
      },
      {
        q: 'How much do I save at Los Angeles dispensaries with an MMJ card?',
        a: 'Recreational buyers in LA face combined taxes of roughly 34.5% (state excise, sales tax, and city cannabis taxes). Holding an MMJ card exempts you from the 9.5% sales tax and qualifies you for medical dispensary pricing, saving over $1,200 annually for regular patients.'
      },
      {
        q: 'Can I use my LA medical recommendation at dispensaries right away?',
        a: 'Yes! As soon as your video consultation finishes, your signed physician recommendation letter with a 24/7 digital verification ID is sent to your email for immediate shopping.'
      }
    ]
  },
  {
    slug: 'san-diego-ca',
    cityName: 'San Diego',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'San Diego County & Pacific Beach',
    title: 'San Diego Medical Marijuana Card Online | 420 Doctor SD',
    metaDesc: 'Apply for your San Diego medical cannabis card online. 15-minute 420 evaluation with certified MMJ physicians. Save on San Diego dispensary taxes.',
    h1: 'San Diego Medical Marijuana Card & 420 Evaluations',
    heroSnippet: 'Certified medical marijuana evaluations in San Diego. Connect with a licensed MMJ doctor from Pacific Beach, La Jolla, Chula Vista, or Downtown San Diego in 15 minutes.',
    localKeywords: [
      'san diego medical marijuana card',
      '420 evaluations san diego',
      'mmj doctor san diego',
      'medical cannabis card sd',
      '420 doctor chula vista'
    ],
    localTaxSavingsPercent: 'Up to 32%',
    localSalesTaxRate: '7.75% Sales + 15% State Excise + 8% City Cannabis Tax',
    medicalTaxRate: 'Medical patients save ~8-15% on local city levies and sales taxes',
    sampleYearlySavings: '$1,150/year',
    popularDispensaryAreas: ['Mission Valley', 'Sorrento Valley', 'Pacific Beach', 'Barrio Logan', 'El Cajon'],
    geo: { lat: 32.7157, lng: -117.1611 },
    address: { street: '600 B St, Suite 300', city: 'San Diego', state: 'CA', zip: '92101' },
    phone: '(619) 420-7734',
    cityFaqs: [
      {
        q: 'How quickly will I receive my San Diego MMJ card?',
        a: 'Your PDF recommendation letter is emailed immediately following your 15-minute video call. You can present it on your smartphone or print it for entry into any licensed San Diego dispensary.'
      },
      {
        q: 'Can I grow my own plants in San Diego with a medical recommendation?',
        a: 'Yes, California medical patients can grow up to 6 mature or 12 immature plants standard, and with our 99-plant extended cultivation recommendation, qualified patients can legally grow larger gardens.'
      }
    ]
  },
  {
    slug: 'san-francisco-ca',
    cityName: 'San Francisco',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'San Francisco Bay Area & Oakland',
    title: 'San Francisco Medical Marijuana Doctor | Bay Area 420 Evaluations',
    metaDesc: 'San Francisco telehealth medical marijuana evaluations. Same-day MMJ card with licensed California doctors. Dispensary discounts across the Bay Area.',
    h1: 'San Francisco Medical Marijuana Card & Telehealth Doctor',
    heroSnippet: 'Get evaluated by a licensed Bay Area MMJ doctor in 15 minutes. Save on high SF cannabis retail taxes, access high-dose edibles, and enjoy compassionate patient care.',
    localKeywords: [
      'san francisco medical marijuana doctor',
      '420 evaluations san francisco',
      'mmj card bay area',
      'sf cannabis card doctor',
      'oakland 420 evaluations'
    ],
    localTaxSavingsPercent: 'Up to 33%',
    localSalesTaxRate: '8.625% Sales + 15% State Excise + City Gross Receipts Tax',
    medicalTaxRate: 'Sales tax exemption saves medical patients 8.625% on every purchase',
    sampleYearlySavings: '$1,290/year',
    popularDispensaryAreas: ['SoMa', 'The Mission', 'Haight-Ashbury', 'Marina District', 'Castro'],
    geo: { lat: 37.7749, lng: -122.4194 },
    address: { street: '100 Pine St, Suite 1250', city: 'San Francisco', state: 'CA', zip: '94111' },
    phone: '(415) 420-9182',
    cityFaqs: [
      {
        q: 'Are online 420 evaluations legal in San Francisco?',
        a: 'Yes! California Business and Professions Code strictly permits licensed medical physicians to conduct telehealth evaluations and issue valid recommendations.'
      }
    ]
  },
  {
    slug: 'sacramento-ca',
    cityName: 'Sacramento',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'Greater Sacramento & Central Valley',
    title: 'Sacramento Medical Marijuana Card | 420 Doctor Evaluations',
    metaDesc: 'Get your Sacramento medical cannabis card online in 15 minutes. Licensed MMJ doctors, same-day California recommendations, and money-back guarantee.',
    h1: 'Sacramento Medical Marijuana Doctor & 420 Evaluations',
    heroSnippet: 'Fast, secure online consultations for Sacramento patients. Complete your evaluation on your lunch break and receive your digital medical recommendation immediately.',
    localKeywords: [
      'sacramento medical marijuana card',
      '420 evaluations sacramento',
      'sacramento mmj doctor',
      'california cannabis doctor sacramento'
    ],
    localTaxSavingsPercent: 'Up to 31%',
    localSalesTaxRate: '8.75% Sales + 15% State Excise + 4% City Cannabis Tax',
    medicalTaxRate: 'Exempt from state and local sales tax with state medical card',
    sampleYearlySavings: '$1,120/year',
    popularDispensaryAreas: ['Midtown Sacramento', 'Downtown', 'Arden-Arcade', 'Roseville Area'],
    geo: { lat: 38.5816, lng: -121.4944 },
    address: { street: '980 9th St, 16th Floor', city: 'Sacramento', state: 'CA', zip: '95814' },
    phone: '(916) 420-6310',
    cityFaqs: [
      {
        q: 'Can Sacramento patients buy medical cannabis at age 18?',
        a: 'Yes! While recreational cannabis is strictly 21+, patients with a valid medical marijuana card can purchase legally at age 18.'
      }
    ]
  },
  {
    slug: 'lodi-ca',
    cityName: 'Lodi',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'San Joaquin County & Stockton Area',
    title: 'Lodi CA Medical Marijuana Doctor | 420 Evaluations Lodi',
    metaDesc: 'Lodi CA medical marijuana card evaluations online. Connect with licensed MMJ physicians for fast approval and dispensary-approved recommendations.',
    h1: 'Lodi California Medical Marijuana Card & 420 Doctor',
    heroSnippet: 'Compassionate telehealth medical cannabis evaluations for Lodi and San Joaquin County residents. No crowded waiting rooms—consult from the privacy of your home.',
    localKeywords: [
      'lodi medical marijuana doctor',
      '420 evaluations lodi ca',
      'mmj card lodi california',
      'stockton 420 doctor'
    ],
    localTaxSavingsPercent: 'Up to 30%',
    localSalesTaxRate: '8.25% Sales + 15% State Excise Tax',
    medicalTaxRate: 'Exempt from standard sales taxes with medical verification',
    sampleYearlySavings: '$980/year',
    popularDispensaryAreas: ['Central Lodi', 'North Stockton', 'Modesto Corridors'],
    geo: { lat: 38.1341, lng: -121.2722 },
    address: { street: '215 W Pine St', city: 'Lodi', state: 'CA', zip: '95240' },
    phone: '(209) 420-8819',
    cityFaqs: [
      {
        q: 'Do Lodi residents need to drive to Stockton or Sacramento for an MMJ doctor?',
        a: 'No! You can complete your entire evaluation online with our state-certified doctor from your smartphone in Lodi.'
      }
    ]
  },
  {
    slug: 'san-jose-ca',
    cityName: 'San Jose',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'Silicon Valley & Santa Clara County',
    title: 'San Jose Medical Marijuana Card Online | Silicon Valley 420 Doctor',
    metaDesc: 'Apply for your San Jose medical marijuana card online in 15 minutes. Connect with licensed California cannabis physicians, same-day approval guarantee.',
    h1: 'San Jose Medical Marijuana Card & Silicon Valley 420 Doctor',
    heroSnippet: 'Fast, secure telehealth cannabis evaluations for San Jose and Silicon Valley residents. Save on city cannabis excise taxes and access high-potency medical cannabis.',
    localKeywords: [
      'san jose medical marijuana card',
      '420 doctor san jose',
      'mmj card silicon valley',
      'santa clara county 420 evaluations'
    ],
    localTaxSavingsPercent: 'Up to 33.5%',
    localSalesTaxRate: '9.375% Sales + 15% State Excise + up to 10% City Cannabis Tax',
    medicalTaxRate: 'Exempt from local sales tax with state MMIC recommendation',
    sampleYearlySavings: '$1,280/year',
    popularDispensaryAreas: ['Downtown San Jose', 'Willow Glen', 'North San Jose', 'Santana Row Area'],
    geo: { lat: 37.3382, lng: -121.8863 },
    address: { street: '200 S 1st St', city: 'San Jose', state: 'CA', zip: '95113' },
    phone: '(408) 420-7719',
    cityFaqs: [
      {
        q: 'Can I use my San Jose medical recommendation at all local dispensaries?',
        a: 'Yes! All state-licensed dispensaries in San Jose and Santa Clara County accept our official doctor recommendation letters.'
      }
    ]
  },
  {
    slug: 'long-beach-ca',
    cityName: 'Long Beach',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'Los Angeles Harbor & South Bay Area',
    title: 'Long Beach Medical Marijuana Doctor | Fast 420 Evaluations Long Beach',
    metaDesc: 'Get your Long Beach MMJ card certified online in 15 mins. Licensed California doctors, same-day digital recommendation, full refund guarantee.',
    h1: 'Long Beach Medical Marijuana Card & 420 Doctor Consultations',
    heroSnippet: 'Certified telehealth cannabis doctors serving Long Beach and South Bay. Consult privately from your phone and receive your digital medical cannabis certification immediately.',
    localKeywords: [
      'long beach medical marijuana card',
      '420 evaluations long beach',
      'mmj doctor south bay ca',
      'long beach 420 clinic'
    ],
    localTaxSavingsPercent: 'Up to 34%',
    localSalesTaxRate: '10.25% Sales + 15% State Excise + 8% City Cannabis Tax',
    medicalTaxRate: 'Sales tax exemption saves medical patients 10.25% on every dispensary purchase',
    sampleYearlySavings: '$1,350/year',
    popularDispensaryAreas: ['Downtown Long Beach', 'Belmont Shore', 'Bixby Knolls', 'East Long Beach'],
    geo: { lat: 33.7701, lng: -118.1937 },
    address: { street: '100 W Broadway', city: 'Long Beach', state: 'CA', zip: '90802' },
    phone: '(562) 420-6810',
    cityFaqs: [
      {
        q: 'How long does the Long Beach video evaluation take?',
        a: 'Most appointments take just 10 to 15 minutes. Our compassionate physician reviews your health symptoms and issues your recommendation right away.'
      }
    ]
  },
  {
    slug: 'oakland-ca',
    cityName: 'Oakland',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'East Bay & Alameda County',
    title: 'Oakland Medical Marijuana Doctor | East Bay 420 Evaluations',
    metaDesc: 'Oakland online medical marijuana evaluations. Same-day digital cannabis recommendation from state-licensed California physicians.',
    h1: 'Oakland Medical Marijuana Card & East Bay 420 Doctor',
    heroSnippet: 'Connect with licensed 420 physicians in Oakland and the East Bay. Telehealth visits from the comfort of home, 100% HIPAA compliant and legal.',
    localKeywords: [
      'oakland medical marijuana card',
      '420 doctor oakland',
      'east bay mmj evaluations',
      'berkeley cannabis doctor'
    ],
    localTaxSavingsPercent: 'Up to 32%',
    localSalesTaxRate: '10.25% Sales + 15% State Excise + City Gross Receipts Tax',
    medicalTaxRate: 'Exempt from local sales tax with verified recommendation',
    sampleYearlySavings: '$1,200/year',
    popularDispensaryAreas: ['Uptown Oakland', 'Grand Lake', 'Jack London Square', 'Rockridge Area'],
    geo: { lat: 37.8044, lng: -122.2712 },
    address: { street: '1999 Harrison St', city: 'Oakland', state: 'CA', zip: '94612' },
    phone: '(510) 420-9421',
    cityFaqs: [
      {
        q: 'Does Oakland recognize the California 99-plant cultivation license?',
        a: 'Yes. Qualified medical patients with our physician-certified 99-plant cultivation recommendation are legally authorized to grow extended amounts.'
      }
    ]
  },
  {
    slug: 'anaheim-ca',
    cityName: 'Anaheim',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'Orange County Metro',
    title: 'Anaheim Medical Marijuana Card | Orange County 420 Doctor',
    metaDesc: 'Anaheim medical marijuana doctor consultations online. Fast 15-minute 420 evaluations for Orange County patients.',
    h1: 'Anaheim Medical Marijuana Card & Orange County 420 Evaluations',
    heroSnippet: 'Compassionate medical cannabis evaluations for Anaheim, Santa Ana, and Orange County patients. Simple 100% online intake.',
    localKeywords: [
      'anaheim medical marijuana card',
      'orange county 420 doctor',
      'mmj evaluations anaheim',
      'santa ana cannabis doctor'
    ],
    localTaxSavingsPercent: 'Up to 31%',
    localSalesTaxRate: '7.75% Sales + 15% State Excise + City Cannabis Taxes',
    medicalTaxRate: 'Medical card discounts and exemption from sales tax',
    sampleYearlySavings: '$1,100/year',
    popularDispensaryAreas: ['Santa Ana Cannabis Corridor', 'Orange County Delivery Zones', 'Anaheim Hills'],
    geo: { lat: 33.8366, lng: -117.9143 },
    address: { street: '200 S Anaheim Blvd', city: 'Anaheim', state: 'CA', zip: '92805' },
    phone: '(714) 420-5590',
    cityFaqs: [
      {
        q: 'How do Orange County delivery services verify my recommendation?',
        a: 'Every recommendation we issue includes a unique patient verification ID and 24/7 web verification portal so dispensaries and delivery drivers confirm validity instantly.'
      }
    ]
  },
  {
    slug: 'fresno-ca',
    cityName: 'Fresno',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'Central Valley & Fresno County',
    title: 'Fresno Medical Marijuana Card | Central Valley 420 Doctor Online',
    metaDesc: 'Get your Fresno medical marijuana card certification online. 15-minute consultations with licensed California cannabis physicians.',
    h1: 'Fresno Medical Marijuana Doctor & 420 Evaluations',
    heroSnippet: 'Fast, discreet telehealth medical marijuana evaluations for Fresno and Central Valley patients. No clinic visits required.',
    localKeywords: [
      'fresno medical marijuana card',
      'fresno 420 doctor',
      'central valley mmj evaluations',
      'clovis cannabis doctor'
    ],
    localTaxSavingsPercent: 'Up to 30%',
    localSalesTaxRate: '8.35% Sales + 15% State Excise + City Cannabis Business Tax',
    medicalTaxRate: 'Exempt from sales tax for verified patients',
    sampleYearlySavings: '$990/year',
    popularDispensaryAreas: ['Tower District', 'North Fresno', 'Clovis Area', 'Downtown Fresno'],
    geo: { lat: 36.7468, lng: -119.7726 },
    address: { street: '1060 Fulton St', city: 'Fresno', state: 'CA', zip: '93721' },
    phone: '(559) 420-7210',
    cityFaqs: [
      {
        q: 'Can 18-year-old patients in Fresno get a medical card?',
        a: 'Yes! California law allows individuals aged 18 and older with qualifying medical conditions to obtain a medical cannabis recommendation.'
      }
    ]
  },
  {
    slug: 'irvine-ca',
    cityName: 'Irvine',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'South Orange County & Irvine Spectrum',
    title: 'Irvine Medical Marijuana Card Online | Orange County Telehealth Doctor',
    metaDesc: 'Apply for your Irvine medical cannabis card online in 15 mins. Board-certified MMJ doctors, same-day approval guarantee.',
    h1: 'Irvine Medical Marijuana Card & Telehealth Cannabis Doctor',
    heroSnippet: 'Discreet telemedicine medical cannabis evaluations for Irvine and South Orange County professionals. Complete your visit from your home or office.',
    localKeywords: [
      'irvine medical marijuana card',
      'irvine 420 doctor',
      'south orange county mmj doctor',
      'telehealth cannabis irvine'
    ],
    localTaxSavingsPercent: 'Up to 31%',
    localSalesTaxRate: '7.75% Sales + 15% State Excise Tax',
    medicalTaxRate: 'Medical patients save on tax and enjoy priority delivery access',
    sampleYearlySavings: '$1,050/year',
    popularDispensaryAreas: ['Irvine Spectrum Area', 'Costa Mesa', 'Newport Beach Delivery Zones'],
    geo: { lat: 33.6846, lng: -117.8265 },
    address: { street: '100 Spectrum Center Dr', city: 'Irvine', state: 'CA', zip: '92618' },
    phone: '(949) 420-8320',
    cityFaqs: [
      {
        q: 'Is my Irvine consultation private?',
        a: '100%. All consultations are conducted via encrypted, HIPAA-compliant video. Your employer or insurance will never be notified.'
      }
    ]
  },
  {
    slug: 'riverside-ca',
    cityName: 'Riverside',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'Inland Empire & Riverside County',
    title: 'Riverside Medical Marijuana Card | Inland Empire 420 Evaluations',
    metaDesc: 'Riverside MMJ card evaluations online. Connect with state-licensed California physicians for same-day digital cannabis recommendation.',
    h1: 'Riverside Medical Marijuana Doctor & Inland Empire 420 Cards',
    heroSnippet: 'Convenient telehealth 420 evaluations for Riverside and Inland Empire patients. Instant PDF recommendation emailed immediately upon approval.',
    localKeywords: [
      'riverside medical marijuana card',
      'inland empire 420 doctor',
      'riverside mmj clinic',
      'corona cannabis doctor'
    ],
    localTaxSavingsPercent: 'Up to 32%',
    localSalesTaxRate: '8.75% Sales + 15% State Excise + City Cannabis Taxes',
    medicalTaxRate: 'Full sales tax exemption with medical certification',
    sampleYearlySavings: '$1,150/year',
    popularDispensaryAreas: ['Downtown Riverside', 'Corona Corridor', 'Moreno Valley Area'],
    geo: { lat: 33.9806, lng: -117.3755 },
    address: { street: '3900 Main St', city: 'Riverside', state: 'CA', zip: '92501' },
    phone: '(951) 420-6180',
    cityFaqs: [
      {
        q: 'How fast can I visit a dispensary in Riverside after my call?',
        a: 'Immediately! Your digital recommendation certificate is emailed in minutes, allowing same-day dispensary shopping.'
      }
    ]
  },
  {
    slug: 'bakersfield-ca',
    cityName: 'Bakersfield',
    stateId: 'california',
    stateName: 'California',
    stateCode: 'CA',
    metroArea: 'Kern County & Southern Central Valley',
    title: 'Bakersfield Medical Marijuana Doctor | Kern County 420 Evaluations',
    metaDesc: 'Bakersfield online medical marijuana evaluations. Same-day digital recommendations from certified California cannabis physicians.',
    h1: 'Bakersfield Medical Marijuana Card & Kern County 420 Doctor',
    heroSnippet: 'Skip the drive and consult online with a certified MMJ doctor in Bakersfield. 100% legal California telehealth with 99% approval rate.',
    localKeywords: [
      'bakersfield medical marijuana card',
      'bakersfield 420 doctor',
      'kern county mmj evaluations',
      'telehealth cannabis bakersfield'
    ],
    localTaxSavingsPercent: 'Up to 31%',
    localSalesTaxRate: '8.25% Sales + 15% State Excise Tax',
    medicalTaxRate: 'Exempt from state and local sales tax with recommendation',
    sampleYearlySavings: '$1,020/year',
    popularDispensaryAreas: ['Downtown Bakersfield', 'Rosedale Area', 'Kern County Delivery'],
    geo: { lat: 35.3733, lng: -119.0187 },
    address: { street: '1600 Truxtun Ave', city: 'Bakersfield', state: 'CA', zip: '93301' },
    phone: '(661) 420-7490',
    cityFaqs: [
      {
        q: 'What medical conditions qualify in Bakersfield?',
        a: 'California recognizes chronic pain, anxiety, insomnia, arthritis, PTSD, migraines, cancer, and any other chronic health condition that impairs daily quality of life.'
      }
    ]
  },

  // --- FLORIDA ---
  {
    slug: 'jacksonville-fl',
    cityName: 'Jacksonville',
    stateId: 'florida',
    stateName: 'Florida',
    stateCode: 'FL',
    metroArea: 'Duval County & Northeast Florida',
    title: 'Medical Marijuana Doctor Jacksonville FL | Fast Florida MMJ Card',
    metaDesc: 'Get evaluated by a certified medical marijuana doctor in Jacksonville FL. Same-day registration into the Florida OMMU registry. 99% approval rate.',
    h1: 'Jacksonville Medical Marijuana Doctor & Florida MMJ Cards',
    heroSnippet: 'Licensed Florida medical cannabis doctors serving Jacksonville, St. Augustine, and Orange Park. Seamless telemedicine assistance and same-day OMMU registry submission.',
    localKeywords: [
      'medical marijuana doctor jacksonville fl',
      'jacksonville mmj card',
      '420 doctor jacksonville',
      'florida medical cannabis doctor duval county',
      'cheap mmj card jacksonville'
    ],
    localTaxSavingsPercent: 'Medical Only State',
    localSalesTaxRate: 'Florida has NO recreational cannabis. A medical card is required to legally purchase.',
    medicalTaxRate: '0% Sales Tax on Medical Cannabis in Florida',
    sampleYearlySavings: 'Full Legal Immunity & 0% Sales Tax',
    popularDispensaryAreas: ['Southside Jacksonville', 'Riverside & San Marco', 'Jacksonville Beach', 'Orange Park'],
    geo: { lat: 30.3322, lng: -81.6557 },
    address: { street: '501 W Bay St', city: 'Jacksonville', state: 'FL', zip: '32202' },
    phone: '(904) 420-5120',
    cityFaqs: [
      {
        q: 'How does the Florida OMMU registry work in Jacksonville?',
        a: 'After our doctor approves you, we immediately enter your patient profile into the Florida Department of Health OMMU portal. You can complete your state fee online and receive a temporary approval email to shop at Jacksonville dispensaries like Trulieve, MÜV, and Surterra.'
      }
    ]
  },
  {
    slug: 'miami-fl',
    cityName: 'Miami',
    stateId: 'florida',
    stateName: 'Florida',
    stateCode: 'FL',
    metroArea: 'Miami-Dade & South Florida',
    title: 'Miami Medical Marijuana Doctor | Florida MMJ Card Evaluations',
    metaDesc: 'Miami medical cannabis evaluations with state-certified physicians. Fast OMMU portal approval, 210-day order entries, and 100% money back guarantee.',
    h1: 'Miami Medical Marijuana Doctor & Telehealth Consultations',
    heroSnippet: 'Get certified for medical cannabis in Miami without leaving home. Our bilingual evaluating doctors help qualifying patients across Miami-Dade and Fort Lauderdale.',
    localKeywords: [
      'miami medical marijuana doctor',
      'mmj card miami fl',
      '420 evaluations miami',
      'medical cannabis card south florida',
      'doctor de marihuana medicinal miami'
    ],
    localTaxSavingsPercent: 'Medical Only State',
    localSalesTaxRate: 'Recreational sale is illegal in Florida. MMJ card provides 100% legal protection.',
    medicalTaxRate: 'Tax-exempt medical medicine',
    sampleYearlySavings: 'Full Legal Access',
    popularDispensaryAreas: ['Wynwood', 'Coral Gables', 'Miami Beach', 'Doral', 'Brickell'],
    geo: { lat: 25.7617, lng: -80.1918 },
    address: { street: '1111 Brickell Ave, 11th Floor', city: 'Miami', state: 'FL', zip: '33131' },
    phone: '(305) 420-9941',
    cityFaqs: [
      {
        q: 'Do you offer consultations in Spanish in Miami?',
        a: 'Yes, our evaluating doctors and clinical support team offer consultations in both English and Spanish for all Miami patients.'
      }
    ]
  },
  {
    slug: 'tampa-fl',
    cityName: 'Tampa',
    stateId: 'florida',
    stateName: 'Florida',
    stateCode: 'FL',
    metroArea: 'Tampa Bay & St. Petersburg',
    title: 'Tampa Medical Marijuana Card | 420 Evaluations Tampa FL',
    metaDesc: 'Tampa FL medical marijuana doctor evaluations. Fast approval for chronic pain, anxiety, insomnia, and PTSD. Same-day Florida OMMU registration.',
    h1: 'Tampa Medical Marijuana Doctor & MMJ Card Evaluations',
    heroSnippet: 'Top-rated medical cannabis evaluations in Tampa Bay. Fast, professional physician consultations with high approval ratings and ongoing patient guidance.',
    localKeywords: [
      'tampa medical marijuana doctor',
      '420 evaluations tampa',
      'mmj card tampa bay',
      'st petersburg medical cannabis doctor'
    ],
    localTaxSavingsPercent: 'Medical Only State',
    localSalesTaxRate: 'Exclusive legal access through state MMJ registry',
    medicalTaxRate: '0% sales tax',
    sampleYearlySavings: 'Safe & Legal Access',
    popularDispensaryAreas: ['Ybor City', 'South Tampa', 'Carrollwood', 'Downtown St. Pete'],
    geo: { lat: 27.9506, lng: -82.4572 },
    address: { street: '400 N Tampa St, Suite 2100', city: 'Tampa', state: 'FL', zip: '33602' },
    phone: '(813) 420-7201',
    cityFaqs: [
      {
        q: 'How long does a Florida recommendation last in Tampa?',
        a: 'Under Florida law, a physician order is valid for up to 210 days (7 months), after which an online recertification check-in is required.'
      }
    ]
  },
  {
    slug: 'orlando-fl',
    cityName: 'Orlando',
    stateId: 'florida',
    stateName: 'Florida',
    stateCode: 'FL',
    metroArea: 'Orange County & Central Florida',
    title: 'Orlando Medical Marijuana Doctor | Online Florida MMJ Card',
    metaDesc: 'Orlando FL medical marijuana card certifications. Connect with licensed Florida physicians online. Fast approval and patient-first care.',
    h1: 'Orlando Medical Marijuana Doctor & 420 Evaluations',
    heroSnippet: 'Get your medical cannabis card in Orlando. Virtual consultations with licensed medical professionals serving Orange, Osceola, and Seminole counties.',
    localKeywords: [
      'orlando medical marijuana doctor',
      '420 evaluations orlando fl',
      'mmj card orlando',
      'florida cannabis clinic orlando'
    ],
    localTaxSavingsPercent: 'Medical Only State',
    localSalesTaxRate: 'Cannabis is only legally available to state medical cardholders',
    medicalTaxRate: '0% sales tax',
    sampleYearlySavings: 'Full Legal Protection',
    popularDispensaryAreas: ['Downtown Orlando', 'Winter Park', 'International Drive', 'Kissimmee'],
    geo: { lat: 28.5383, lng: -81.3792 },
    address: { street: '200 S Orange Ave', city: 'Orlando', state: 'FL', zip: '32801' },
    phone: '(407) 420-3329',
    cityFaqs: [
      {
        q: 'Can snowbirds or seasonal residents in Orlando get an MMJ card?',
        a: 'Yes! Florida permits seasonal residents who reside in Florida for at least 31 consecutive days per year to qualify with two proofs of residential address.'
      }
    ]
  },

  // --- TEXAS (CUP) ---
  {
    slug: 'houston-tx',
    cityName: 'Houston',
    stateId: 'texas',
    stateName: 'Texas',
    stateCode: 'TX',
    metroArea: 'Greater Houston & Harris County',
    title: 'Houston Texas Medical Marijuana Doctor | Texas CUP Evaluation',
    metaDesc: 'Get certified for the Texas Compassionate Use Program (CUP) in Houston. Online doctor evaluations and direct entry into the CURT registry.',
    h1: 'Houston Medical Marijuana Doctor & Texas CURT Certifications',
    heroSnippet: 'Certified physicians registered with the Texas Department of Public Safety (DPS). We evaluate Houston patients for low-THC medical cannabis prescriptions under the Texas Compassionate Use Program.',
    localKeywords: [
      'houston medical marijuana doctor',
      'texas compassionate use program houston',
      'curt registry doctor houston',
      'medical cannabis prescription houston tx',
      '420 doctor houston'
    ],
    localTaxSavingsPercent: 'Prescription Based',
    localSalesTaxRate: 'No legal recreational market in Texas. CUP prescription is the ONLY legal path.',
    medicalTaxRate: 'Medical cannabis is exempt from state sales taxes in Texas',
    sampleYearlySavings: '100% Legal State Exemption',
    popularDispensaryAreas: ['Galleria & Uptown', 'The Heights', 'Medical Center Area', 'Sugar Land & Katy Delivery Hubs'],
    geo: { lat: 29.7604, lng: -95.3698 },
    address: { street: '1000 Louisiana St, Suite 3900', city: 'Houston', state: 'TX', zip: '77002' },
    phone: '(713) 420-8021',
    cityFaqs: [
      {
        q: 'How does the Texas Compassionate Use Registry (CURT) work in Houston?',
        a: 'Unlike states that mail physical cards, Texas uses the online CURT system. Once our doctor inputs your prescription into CURT, any licensed dispensing organization (such as Texas Original or fluent) can verify your ID and fulfill your medicine with home delivery.'
      },
      {
        q: 'What conditions qualify in Texas?',
        a: 'Qualifying conditions in Texas include PTSD, Neuropathy, Cancer, Epilepsy, Multiple Sclerosis, Autism Spectrum Disorders, ALS, and over 100 neurodegenerative conditions.'
      }
    ]
  },
  {
    slug: 'dallas-tx',
    cityName: 'Dallas',
    stateId: 'texas',
    stateName: 'Texas',
    stateCode: 'TX',
    metroArea: 'Dallas-Fort Worth Metroplex',
    title: 'Dallas Medical Marijuana Doctor | Texas CUP Telehealth',
    metaDesc: 'Dallas Texas medical cannabis doctor consultations online. Get your CURT prescription for PTSD, chronic neuropathy, and qualifying conditions.',
    h1: 'Dallas Medical Marijuana Doctor & CURT Registry Access',
    heroSnippet: 'Compassionate medical cannabis evaluations across Dallas, Fort Worth, Plano, and Arlington. Registered CURT physicians provide secure 15-minute telehealth visits.',
    localKeywords: [
      'dallas medical marijuana doctor',
      'texas cup doctor dallas',
      'curt registry prescription dallas',
      'fort worth medical cannabis doctor'
    ],
    localTaxSavingsPercent: 'Prescription Exemption',
    localSalesTaxRate: 'Texas only allows low-THC medicine through certified CURT doctors',
    medicalTaxRate: '0% sales tax',
    sampleYearlySavings: 'Safe & Legal Medicine',
    popularDispensaryAreas: ['Downtown Dallas', 'Oak Lawn', 'Fort Worth Cultural District', 'Plano Hubs'],
    geo: { lat: 32.7767, lng: -96.7970 },
    address: { street: '2001 Ross Ave, Suite 700', city: 'Dallas', state: 'TX', zip: '75201' },
    phone: '(214) 420-1934',
    cityFaqs: [
      {
        q: 'Do Dallas patients have access to medical cannabis delivery?',
        a: 'Yes, Texas dispensing organizations offer statewide prescription home delivery and scheduled pickup locations throughout the Dallas-Fort Worth area.'
      }
    ]
  },
  {
    slug: 'austin-tx',
    cityName: 'Austin',
    stateId: 'texas',
    stateName: 'Texas',
    stateCode: 'TX',
    metroArea: 'Central Texas & Travis County',
    title: 'Austin Texas Medical Marijuana Doctor | Online CUP Telehealth',
    metaDesc: 'Austin medical marijuana doctor evaluations online. Registered with Texas DPS CURT database. Safe, legal medical cannabis prescriptions.',
    h1: 'Austin Medical Marijuana Doctor & Texas CUP Consultations',
    heroSnippet: 'Austin patients can now legally access medical cannabis through certified telemedicine evaluations. Fast, caring consultations for Austin and Central Texas residents.',
    localKeywords: [
      'austin medical marijuana doctor',
      'texas cup doctor austin',
      'austin cannabis prescription',
      '420 doctor austin tx'
    ],
    localTaxSavingsPercent: 'Prescription Based',
    localSalesTaxRate: 'Strictly prescription only under Texas statute',
    medicalTaxRate: '0% sales tax',
    sampleYearlySavings: 'Full Legal Compliance',
    popularDispensaryAreas: ['South Congress', 'Downtown Austin', 'Domain Area', 'Round Rock'],
    geo: { lat: 30.2672, lng: -97.7431 },
    address: { street: '500 W 2nd St, 19th Floor', city: 'Austin', state: 'TX', zip: '78701' },
    phone: '(512) 420-6640',
    cityFaqs: [
      {
        q: 'Does Texas charge a state registration fee for medical patients?',
        a: 'No! Texas has $0 in state application fees. Once our doctor inputs your prescription into CURT, there are no extra state card fees.'
      }
    ]
  },
  {
    slug: 'tyler-tx',
    cityName: 'Tyler',
    stateId: 'texas',
    stateName: 'Texas',
    stateCode: 'TX',
    metroArea: 'East Texas & Smith County',
    title: 'Tyler TX Medical Marijuana Doctor | East Texas CUP Clinic',
    metaDesc: 'Tyler Texas medical cannabis doctor consultations. 100% online telehealth evaluations for East Texas patients under Texas Compassionate Use.',
    h1: 'Tyler TX Medical Marijuana Doctor & Telehealth Clinic',
    heroSnippet: 'Connecting East Texas residents with licensed CURT physicians. Get evaluated from Tyler, Longview, or Marshall without having to travel to Dallas.',
    localKeywords: [
      'tyler medical marijuana doctor',
      'tyler tx cannabis clinic',
      'east texas mmj doctor',
      'curt registry tyler texas'
    ],
    localTaxSavingsPercent: 'Prescription Exemption',
    localSalesTaxRate: 'Medical exemption path under Texas law',
    medicalTaxRate: '0% sales tax',
    sampleYearlySavings: 'Legal Protection in TX',
    popularDispensaryAreas: ['Tyler Metro', 'Longview Delivery Zones', 'Athens Area'],
    geo: { lat: 32.3513, lng: -95.3011 },
    address: { street: '100 E Ferguson St', city: 'Tyler', state: 'TX', zip: '75702' },
    phone: '(903) 420-4112',
    cityFaqs: [
      {
        q: 'Are Tyler residents eligible for home delivery?',
        a: 'Yes, Texas licensed dispensing organizations deliver medical cannabis directly to qualifying patients in Tyler and throughout East Texas.'
      }
    ]
  },

  // --- ARIZONA ---
  {
    slug: 'phoenix-az',
    cityName: 'Phoenix',
    stateId: 'arizona',
    stateName: 'Arizona',
    stateCode: 'AZ',
    metroArea: 'Valley of the Sun & Maricopa County',
    title: 'Phoenix Medical Marijuana Card | Fast 420 Evaluations AZ',
    metaDesc: 'Get your Phoenix medical marijuana card online. Save 16% Arizona adult-use excise tax. 15-minute evaluation with certified AZ doctors.',
    h1: 'Phoenix Medical Marijuana Card & 420 Doctor Evaluations',
    heroSnippet: 'Save up to 24% in taxes at Phoenix dispensaries. Telehealth evaluations with licensed Arizona doctors for patients across Phoenix, Scottsdale, and Tempe.',
    localKeywords: [
      'phoenix medical marijuana card',
      '420 evaluations phoenix',
      'mmj doctor phoenix az',
      'arizona cannabis card scottsdale'
    ],
    localTaxSavingsPercent: 'Up to 24.6%',
    localSalesTaxRate: '8.6% Sales + 16% Adult-Use Excise Tax (Total ~24.6%)',
    medicalTaxRate: 'Medical cardholders pay 0% excise tax, saving 16% on every single purchase',
    sampleYearlySavings: '$960/year',
    popularDispensaryAreas: ['Central Phoenix', 'Old Town Scottsdale', 'Tempe Mill Ave', 'Glendale & Peoria'],
    geo: { lat: 33.4484, lng: -112.0740 },
    address: { street: '2 N Central Ave, 18th Floor', city: 'Phoenix', state: 'AZ', zip: '85004' },
    phone: '(602) 420-8431',
    cityFaqs: [
      {
        q: 'How much tax do medical cardholders save in Phoenix?',
        a: 'Recreational buyers in Phoenix pay an extra 16% state excise tax on top of standard sales tax. Having an MMJ card exempts you from the 16% excise tax completely!'
      }
    ]
  },
  {
    slug: 'mesa-az',
    cityName: 'Mesa',
    stateId: 'arizona',
    stateName: 'Arizona',
    stateCode: 'AZ',
    metroArea: 'East Valley Phoenix Metro',
    title: 'Mesa AZ Medical Marijuana Card | Telehealth 420 Doctor',
    metaDesc: 'Mesa Arizona medical marijuana card consultations online. Fast evaluation, digital AZDHS card certification, and high patient savings.',
    h1: 'Mesa Medical Marijuana Doctor & AZDHS Card Evaluations',
    heroSnippet: 'Fast, secure telehealth MMJ evaluations for Mesa, Chandler, and Gilbert residents. Skip the 16% recreational cannabis tax and enjoy higher purchase limits.',
    localKeywords: [
      'mesa medical marijuana card',
      '420 doctor mesa az',
      'mmj evaluations east valley',
      'chandler cannabis doctor'
    ],
    localTaxSavingsPercent: '16% Tax Exemption',
    localSalesTaxRate: '24% combined recreational tax',
    medicalTaxRate: 'Medical patients save 16% state excise tax',
    sampleYearlySavings: '$920/year',
    popularDispensaryAreas: ['Downtown Mesa', 'East Mesa Corridors', 'Gilbert Crossroads'],
    geo: { lat: 33.4152, lng: -111.8315 },
    address: { street: '1 E Main St', city: 'Mesa', state: 'AZ', zip: '85201' },
    phone: '(480) 420-5592',
    cityFaqs: [
      {
        q: 'How long is an Arizona medical card valid?',
        a: 'Arizona medical marijuana cards issued through the AZDHS are valid for 2 full years!'
      }
    ]
  },
  {
    slug: 'prescott-valley-az',
    cityName: 'Prescott Valley',
    stateId: 'arizona',
    stateName: 'Arizona',
    stateCode: 'AZ',
    metroArea: 'Yavapai County & Northern Arizona',
    title: 'Prescott Valley Medical Marijuana Card | 420 Evaluations AZ',
    metaDesc: 'Prescott Valley AZ medical cannabis evaluations online. Certified Arizona physicians, fast digital certification, and 2-year state cards.',
    h1: 'Prescott Valley Medical Marijuana Card & Telehealth Clinic',
    heroSnippet: 'Compassionate medical marijuana consultations for Prescott Valley, Prescott, and Sedona residents. Virtual appointments from the comfort of home.',
    localKeywords: [
      'prescott valley medical marijuana card',
      '420 evaluations prescott az',
      'yavapai county mmj doctor',
      'sedona medical cannabis clinic'
    ],
    localTaxSavingsPercent: '16% Tax Exemption',
    localSalesTaxRate: 'Save 16% excise tax at local dispensaries',
    medicalTaxRate: 'Full medical tax exemption',
    sampleYearlySavings: '$890/year',
    popularDispensaryAreas: ['Prescott Valley Center', 'Hwy 69 Corridor', 'Sedona'],
    geo: { lat: 34.6100, lng: -112.3157 },
    address: { street: '7501 E Civic Cir', city: 'Prescott Valley', state: 'AZ', zip: '86314' },
    phone: '(928) 420-3129',
    cityFaqs: [
      {
        q: 'Do I have to travel to Phoenix for an MMJ doctor?',
        a: 'No! All Prescott Valley patients can meet with our licensed Arizona physician via video or phone.'
      }
    ]
  },

  // --- NEW YORK ---
  {
    slug: 'new-york-city-ny',
    cityName: 'New York City',
    stateId: 'new-york',
    stateName: 'New York',
    stateCode: 'NY',
    metroArea: 'Five Boroughs: Manhattan, Brooklyn, Queens, Bronx, Staten Island',
    title: 'New York City Medical Marijuana Doctor | Fast NYC MMJ Card',
    metaDesc: 'Get your NYC medical marijuana card online in 15 mins. Board-certified NY physicians, instant electronic certificate, save 13% adult-use tax.',
    h1: 'New York City Medical Marijuana Doctor & 420 Evaluations',
    heroSnippet: 'Certified New York medical cannabis evaluations across Manhattan, Brooklyn, Queens, Bronx, and Staten Island. Instant electronic certification accepted at all licensed NY dispensaries.',
    localKeywords: [
      'new york city medical marijuana doctor',
      'nyc mmj card online',
      '420 evaluations manhattan',
      'brooklyn cannabis doctor',
      'queens medical marijuana card'
    ],
    localTaxSavingsPercent: 'Up to 20%',
    localSalesTaxRate: '13% Adult-Use Tax + THC Potency Tax (Total ~20%)',
    medicalTaxRate: 'Medical cannabis is exempt from adult-use retail taxes (only 7% state medical tax)',
    sampleYearlySavings: '$1,200/year',
    popularDispensaryAreas: ['Midtown Manhattan', 'Williamsburg Brooklyn', 'Astoria Queens', 'SoHo', 'Upper East Side'],
    geo: { lat: 40.7128, lng: -74.0060 },
    address: { street: '350 5th Ave, 59th Floor', city: 'New York', state: 'NY', zip: '10118' },
    phone: '(212) 420-7119',
    cityFaqs: [
      {
        q: 'Do NYC patients still need to register with the state OCM?',
        a: 'Under updated New York law, you no longer have to wait weeks for a state card! Your physician certification itself acts as your legal patient card and is immediately recognized at dispensaries.'
      }
    ]
  },

  // --- OHIO ---
  {
    slug: 'columbus-oh',
    cityName: 'Columbus',
    stateId: 'ohio',
    stateName: 'Ohio',
    stateCode: 'OH',
    metroArea: 'Central Ohio & Franklin County',
    title: 'Columbus Ohio Medical Marijuana Doctor | Ohio MMJ Card Online',
    metaDesc: 'Columbus OH medical marijuana card consultations. Direct entry into Ohio Patient Registry, fast same-day approval, and 10% tax savings.',
    h1: 'Columbus Ohio Medical Marijuana Doctor & Telehealth Consultations',
    heroSnippet: 'Fast, secure online consultations with CTR-certified Ohio physicians. Immediate submission to the Ohio Medical Marijuana Registry for same-day shopping.',
    localKeywords: [
      'columbus ohio medical marijuana doctor',
      'ohio mmj card columbus',
      '420 evaluations columbus oh',
      'franklin county medical cannabis doctor'
    ],
    localTaxSavingsPercent: '10% Tax Exemption',
    localSalesTaxRate: '10% Adult-Use Excise Tax + 7.5% Local Sales Tax',
    medicalTaxRate: 'Medical patients do NOT pay the 10% adult-use cannabis tax',
    sampleYearlySavings: '$780/year',
    popularDispensaryAreas: ['Short North', 'Grandview Heights', 'East Columbus', 'Dublin'],
    geo: { lat: 39.9612, lng: -82.9988 },
    address: { street: '100 E Broad St, Suite 1400', city: 'Columbus', state: 'OH', zip: '43215' },
    phone: '(614) 420-9281',
    cityFaqs: [
      {
        q: 'How fast can I visit a Columbus dispensary after my doctor consultation?',
        a: 'Within 15 to 30 minutes! Once our doctor approves your condition and inputs your data, you activate your card in the Ohio registry and can shop immediately.'
      }
    ]
  },

  // --- PENNSYLVANIA ---
  {
    slug: 'philadelphia-pa',
    cityName: 'Philadelphia',
    stateId: 'pennsylvania',
    stateName: 'Pennsylvania',
    stateCode: 'PA',
    metroArea: 'Greater Philadelphia & Delaware Valley',
    title: 'Philadelphia Medical Marijuana Doctor | PA DOH MMJ Card',
    metaDesc: 'Philadelphia PA medical marijuana card doctor evaluations online. Approved certification submitted to PA Department of Health portal.',
    h1: 'Philadelphia Medical Marijuana Doctor & PA Patient Certifications',
    heroSnippet: 'Consult with state-approved Pennsylvania Department of Health physicians. Fast 15-minute telehealth visits serving Philadelphia, Montgomery, and Bucks counties.',
    localKeywords: [
      'philadelphia medical marijuana doctor',
      'pa mmj card philadelphia',
      '420 evaluations philly',
      'pennsylvania cannabis doctor center city'
    ],
    localTaxSavingsPercent: 'Medical Only State',
    localSalesTaxRate: 'Pennsylvania has no legal adult-use market. MMJ card is strictly required.',
    medicalTaxRate: '0% Patient Sales Tax on Medical Marijuana in PA',
    sampleYearlySavings: 'Full Legal Immunity',
    popularDispensaryAreas: ['Center City', 'Fishtown', 'South Philly', 'King of Prussia', 'Main Line'],
    geo: { lat: 39.9526, lng: -75.1652 },
    address: { street: '1500 Market St, 12th Floor', city: 'Philadelphia', state: 'PA', zip: '19102' },
    phone: '(215) 420-6550',
    cityFaqs: [
      {
        q: 'What is the 6-digit PA patient number needed for my appointment?',
        a: 'Before your appointment, register for free on the PA DOH portal (medicalmarijuana.pa.gov) to get your 6-digit patient ID. Our doctor enters your certification directly against that number.'
      }
    ]
  }
];

/**
 * Returns city landing page data merged with any live custom overrides set in WordPress backend
 */
export function getMergedCitiesData(): LocalCityData[] {
  if (typeof window === 'undefined') return LOCAL_CITIES_DATA;
  const wpCustom = (window as unknown as { onlineMMJCardSettings?: { customCities?: Record<string, Record<string, string>> } })?.onlineMMJCardSettings?.customCities;
  if (!wpCustom || typeof wpCustom !== 'object') return LOCAL_CITIES_DATA;

  const map = new Map<string, LocalCityData>();
  LOCAL_CITIES_DATA.forEach((c) => map.set(c.slug, c));

  Object.values(wpCustom).forEach((raw) => {
    if (!raw || !raw.cityName) return;
    const baseSlug = raw.slug || raw.cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = map.get(baseSlug) || Array.from(map.values()).find((c) => c.cityName.toLowerCase() === raw.cityName.toLowerCase());

    if (existing) {
      map.set(existing.slug, {
        ...existing,
        cityName: raw.cityName || existing.cityName,
        phone: raw.localPhone || existing.phone,
        h1: raw.headline || existing.h1,
        heroSnippet: raw.subheading || existing.heroSnippet,
        localTaxSavingsPercent: raw.taxSavings || existing.localTaxSavingsPercent,
        address: {
          ...existing.address,
          street: raw.address || existing.address.street,
          zip: raw.zip || existing.address.zip,
        }
      });
    } else {
      // Add newly created city from WordPress backend
      const stateCode = (raw.stateCode || 'CA').toUpperCase();
      const newCitySlug = `${baseSlug}-${stateCode.toLowerCase()}`;
      map.set(newCitySlug, {
        slug: newCitySlug,
        cityName: raw.cityName,
        stateId: (raw.stateName || 'California').toLowerCase().replace(/\s+/g, '-'),
        stateName: raw.stateName || 'California',
        stateCode: stateCode,
        metroArea: raw.metroArea || `${raw.cityName} Metro`,
        title: `Medical Marijuana Doctor ${raw.cityName} | 420 Evaluations`,
        metaDesc: `Get your official ${raw.cityName} medical marijuana card online in 15 mins. Certified doctors, same day approval.`,
        h1: raw.headline || `Medical Marijuana Doctor ${raw.cityName} & 420 Evaluations`,
        heroSnippet: raw.subheading || `Connect 100% online with certified cannabis doctors serving ${raw.cityName}.`,
        localKeywords: [`medical marijuana doctor ${raw.cityName.toLowerCase()}`, `420 evaluations ${raw.cityName.toLowerCase()}`],
        localTaxSavingsPercent: raw.taxSavings || 'Up to 30%',
        localSalesTaxRate: raw.recTax || 'Standard State & Local Sales Tax',
        medicalTaxRate: raw.medTax || 'Exempt from local retail sales tax',
        sampleYearlySavings: '$1,200/year',
        popularDispensaryAreas: [`Downtown ${raw.cityName}`],
        geo: {
          lat: parseFloat(raw.lat || '34.0522') || 34.0522,
          lng: parseFloat(raw.lng || '-118.2437') || -118.2437,
        },
        address: {
          street: raw.address || 'Medical Suite 100',
          city: raw.cityName,
          state: stateCode,
          zip: raw.zip || '90001',
        },
        phone: raw.localPhone || '(800) 420-6652',
        cityFaqs: [
          {
            q: `How do I consult with an MMJ doctor in ${raw.cityName}?`,
            a: `Complete our simple intake form, choose your appointment time, and connect with a certified physician via phone or video from the comfort of home.`
          }
        ]
      });
    }
  });

  return Array.from(map.values());
}

