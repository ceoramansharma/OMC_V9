<?php
/**
 * Online MMJ Card - Inner Pages & Local City Content Manager
 *
 * Provides complete WordPress backend functionality to view, edit, and create:
 * 1. Local City Landing Pages (Los Angeles, San Diego, Miami, New York, etc.)
 * 2. State Telehealth Law & Pricing Pages (California, New York, Florida, etc.)
 * 3. Telehealth Services & Pricing (New Patient, Renewal, Cultivation, ESA)
 * 4. Qualifying Medical Conditions (Chronic Pain, Anxiety, Insomnia, etc.)
 * 5. 1-Click Page Generator: creates real, editable WordPress Pages in wp-admin > Pages
 *
 * @package Online_MMJ_Card
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Default Core Local Cities Data
 */
/**
 * 1. Default Core Local Cities Data (All 19 Target Metropolitan Areas)
 */
function online_mmj_get_default_cities() {
    return array(
        // --- CALIFORNIA CITIES ---
        'los-angeles' => array(
            'slug'         => 'los-angeles',
            'cityName'     => 'Los Angeles',
            'stateName'    => 'California',
            'stateCode'    => 'CA',
            'metroArea'    => 'Greater Los Angeles & San Fernando Valley',
            'price'        => '$39.99',
            'localPhone'   => '(213) 420-5690',
            'address'      => '700 S Flower St, Suite 1000',
            'zip'          => '90017',
            'taxSavings'   => 'Up to 34.5%',
            'recTax'       => '9.5% Sales + 15% State Excise + 10% City of LA Gross Receipts Tax',
            'medTax'       => '0% Sales Tax (Exempt from city/state retail sales taxes with MMIC)',
            'headline'     => 'Online Medical Marijuana Card Doctors in Los Angeles',
            'subheading'   => 'Connect with licensed 420 telehealth physicians across Los Angeles County. 100% online evaluations, same-day digital recommendation, and 100% money-back guarantee.',
            'dispensaries' => 'Valid at all licensed dispensaries across Downtown LA, West Hollywood, Venice, Santa Monica, and North Hollywood.',
            'lat'          => '34.0522',
            'lng'          => '-118.2437',
        ),
        'san-diego' => array(
            'slug'         => 'san-diego',
            'cityName'     => 'San Diego',
            'stateName'    => 'California',
            'stateCode'    => 'CA',
            'metroArea'    => 'San Diego County & Mission Valley',
            'price'        => '$39.99',
            'localPhone'   => '(619) 420-8192',
            'address'      => '401 B St, Suite 1200',
            'zip'          => '92101',
            'taxSavings'   => 'Up to 32.75%',
            'recTax'       => '7.75% Sales + 15% State Excise + 8% City Cannabis Tax',
            'medTax'       => 'Exempt from local sales tax with state MMIC recommendation',
            'headline'     => 'San Diego Online Medical Marijuana Evaluations & Doctors',
            'subheading'   => 'Fast 15-minute video evaluations with certified cannabis doctors in San Diego. Get approved from your smartphone or tablet.',
            'dispensaries' => 'Accepted at licensed San Diego dispensaries in Pacific Beach, North Park, Chula Vista, and Sorrento Valley.',
            'lat'          => '32.7157',
            'lng'          => '-117.1611',
        ),
        'san-francisco' => array(
            'slug'         => 'san-francisco',
            'cityName'     => 'San Francisco',
            'stateName'    => 'California',
            'stateCode'    => 'CA',
            'metroArea'    => 'San Francisco Bay Area & Peninsula',
            'price'        => '$39.99',
            'localPhone'   => '(415) 420-7419',
            'address'      => '505 Montgomery St, 11th Floor',
            'zip'          => '94111',
            'taxSavings'   => 'Up to 33.5%',
            'recTax'       => '8.625% Sales + 15% State Excise + up to 5% SF Gross Receipts Tax',
            'medTax'       => 'Sales tax exemption and access to higher medical potency allowances',
            'headline'     => 'San Francisco Medical Marijuana Doctor Telehealth & Certifications',
            'subheading'   => 'Compassionate medical cannabis evaluations in the historic birthplace of medical marijuana. 100% HIPAA compliant and legal.',
            'dispensaries' => 'Accepted across the Castro, Mission District, SoMa, and Sunset storefront dispensaries.',
            'lat'          => '37.7749',
            'lng'          => '-122.4194',
        ),
        'sacramento' => array(
            'slug'         => 'sacramento',
            'cityName'     => 'Sacramento',
            'stateName'    => 'California',
            'stateCode'    => 'CA',
            'metroArea'    => 'Sacramento Valley & Capitol Region',
            'price'        => '$39.99',
            'localPhone'   => '(916) 420-3321',
            'address'      => '980 9th St, 16th Floor',
            'zip'          => '95814',
            'taxSavings'   => 'Up to 31.75%',
            'recTax'       => '8.75% Sales + 15% State Excise + 4% City Cannabis Tax',
            'medTax'       => 'State MMIC exemption from sales tax and higher plant allowances',
            'headline'     => 'Sacramento Medical Marijuana Doctor Telehealth Clinic',
            'subheading'   => 'California board-certified physicians issuing same-day medical marijuana recommendations throughout Sacramento County.',
            'dispensaries' => 'Valid at licensed dispensaries across Midtown, Downtown Sacramento, Arden-Arcade, and Elk Grove.',
            'lat'          => '38.5816',
            'lng'          => '-121.4944',
        ),
        'san-jose' => array(
            'slug'         => 'san-jose',
            'cityName'     => 'San Jose',
            'stateName'    => 'California',
            'stateCode'    => 'CA',
            'metroArea'    => 'Silicon Valley & South Bay',
            'price'        => '$39.99',
            'localPhone'   => '(408) 420-8841',
            'address'      => '225 W Santa Clara St',
            'zip'          => '95113',
            'taxSavings'   => 'Up to 33.375%',
            'recTax'       => '9.375% Sales + 15% State Excise + 10% San Jose Cannabis Business Tax',
            'medTax'       => 'Retail sales tax exemption on all medical cannabis products',
            'headline'     => 'San Jose Medical Marijuana Card Doctor Evaluations',
            'subheading'   => 'Online medical cannabis cards in Silicon Valley. Speak with a doctor online from your home in San Jose.',
            'dispensaries' => 'Accepted at all registered San Jose collectives and dispensaries in Downtown, Willow Glen, and North San Jose.',
            'lat'          => '37.3382',
            'lng'          => '-121.8863',
        ),
        'fresno' => array(
            'slug'         => 'fresno',
            'cityName'     => 'Fresno',
            'stateName'    => 'California',
            'stateCode'    => 'CA',
            'metroArea'    => 'Central Valley & Fresno County',
            'price'        => '$39.99',
            'localPhone'   => '(559) 420-5120',
            'address'      => '5260 N Palm Ave, Suite 421',
            'zip'          => '93704',
            'taxSavings'   => 'Up to 31.35%',
            'recTax'       => '8.35% Sales + 15% State Excise + City Cannabis Tax',
            'medTax'       => 'Sales tax exemption and physician therapeutic protection',
            'headline'     => 'Fresno Medical Marijuana Card Doctors & Clinic',
            'subheading'   => 'Central Valley telehealth cannabis consultations with licensed California physicians.',
            'dispensaries' => 'Accepted across Fresno, Clovis, and Central Valley licensed storefront dispensaries and deliveries.',
            'lat'          => '36.7468',
            'lng'          => '-119.7726',
        ),
        'oakland' => array(
            'slug'         => 'oakland',
            'cityName'     => 'Oakland',
            'stateName'    => 'California',
            'stateCode'    => 'CA',
            'metroArea'    => 'East Bay & Alameda County',
            'price'        => '$39.99',
            'localPhone'   => '(510) 420-6922',
            'address'      => '1999 Harrison St, Suite 1800',
            'zip'          => '94612',
            'taxSavings'   => 'Up to 35.25%',
            'recTax'       => '10.25% Sales + 15% State Excise + 10% Oakland Business Tax',
            'medTax'       => 'Sales tax exemption plus reduced medical tax rates at East Bay dispensaries',
            'headline'     => 'Oakland Medical Marijuana Doctor Evaluations',
            'subheading'   => 'Historic home of medical cannabis activism. Compassionate online evaluations for East Bay patients.',
            'dispensaries' => 'Valid at all premier East Bay dispensaries in Uptown, Grand Lake, Jack London Square, and Berkeley.',
            'lat'          => '37.8044',
            'lng'          => '-122.2712',
        ),

        // --- FLORIDA CITIES ---
        'miami' => array(
            'slug'         => 'miami',
            'cityName'     => 'Miami',
            'stateName'    => 'Florida',
            'stateCode'    => 'FL',
            'metroArea'    => 'Miami-Dade & South Florida',
            'price'        => '$149.00',
            'localPhone'   => '(305) 420-3381',
            'address'      => '1111 Brickell Ave, Suite 1900',
            'zip'          => '33131',
            'taxSavings'   => 'Medical Only State',
            'recTax'       => 'Adult-Use Cannabis is NOT legal in Florida. Medical card required.',
            'medTax'       => 'FL Medical Card provides complete legal protection to purchase cannabis in Florida.',
            'headline'     => 'Miami Medical Marijuana Doctor Certifications & Telehealth Intake',
            'subheading'   => 'Schedule your appointment with certified Florida medical marijuana doctors. Same-day entry into the Florida OMMU registry.',
            'dispensaries' => 'Shop legally at Trulieve, Surterra, Curaleaf, and Fluent throughout Miami-Dade.',
            'lat'          => '25.7617',
            'lng'          => '-80.1918',
        ),
        'orlando' => array(
            'slug'         => 'orlando',
            'cityName'     => 'Orlando',
            'stateName'    => 'Florida',
            'stateCode'    => 'FL',
            'metroArea'    => 'Central Florida & Orange County',
            'price'        => '$149.00',
            'localPhone'   => '(407) 420-9110',
            'address'      => '300 S Orange Ave, Suite 1000',
            'zip'          => '32801',
            'taxSavings'   => 'Medical Only State',
            'recTax'       => 'Recreational cannabis is illegal in Florida without state OMMU approval.',
            'medTax'       => '100% legal medical access across Orange County MMTC dispensaries.',
            'headline'     => 'Orlando Medical Marijuana Doctor Certifications',
            'subheading'   => 'Fast appointments with qualified Florida cannabis physicians in Orlando and Central Florida.',
            'dispensaries' => 'Valid at Trulieve, MÜV, Curaleaf, and Sunburn dispensaries across Orlando, Winter Park, and Kissimmee.',
            'lat'          => '28.5383',
            'lng'          => '-81.3792',
        ),
        'tampa' => array(
            'slug'         => 'tampa',
            'cityName'     => 'Tampa',
            'stateName'    => 'Florida',
            'stateCode'    => 'FL',
            'metroArea'    => 'Tampa Bay & Hillsborough County',
            'price'        => '$149.00',
            'localPhone'   => '(813) 420-7215',
            'address'      => '100 N Tampa St, Suite 2100',
            'zip'          => '33602',
            'taxSavings'   => 'Medical Only State',
            'recTax'       => 'Adult-use is illegal in FL. Valid registry card required by law.',
            'medTax'       => 'Official Florida Department of Health OMMU patient registration.',
            'headline'     => 'Tampa Medical Marijuana Card Doctor Telehealth',
            'subheading'   => 'Board-certified medical cannabis physicians serving Tampa, St. Petersburg, and Clearwater.',
            'dispensaries' => 'Accepted at all Hillsborough County medical treatment centers including Trulieve, Surterra, and Ayr.',
            'lat'          => '27.9506',
            'lng'          => '-82.4572',
        ),
        'jacksonville' => array(
            'slug'         => 'jacksonville',
            'cityName'     => 'Jacksonville',
            'stateName'    => 'Florida',
            'stateCode'    => 'FL',
            'metroArea'    => 'First Coast & Duval County',
            'price'        => '$149.00',
            'localPhone'   => '(904) 420-8330',
            'address'      => '501 W Bay St, Suite 400',
            'zip'          => '32202',
            'taxSavings'   => 'Medical Only State',
            'recTax'       => 'Recreational possession prohibited in Florida.',
            'medTax'       => 'State certification granting 70-day orders for flower, edibles, and tinctures.',
            'headline'     => 'Jacksonville Medical Marijuana Doctor Evaluations',
            'subheading'   => 'Qualified Florida MMJ doctors serving Duval, St. Johns, and Nassau County patients.',
            'dispensaries' => 'Access all First Coast dispensaries in Downtown Jax, San Marco, and Jacksonville Beach.',
            'lat'          => '30.3322',
            'lng'          => '-81.6557',
        ),

        // --- NEW YORK CITIES ---
        'new-york-city' => array(
            'slug'         => 'new-york-city',
            'cityName'     => 'New York City',
            'stateName'    => 'New York',
            'stateCode'    => 'NY',
            'metroArea'    => 'Five Boroughs & New York Metro',
            'price'        => '$49.00',
            'localPhone'   => '(212) 420-9920',
            'address'      => '140 Broadway, 26th Floor',
            'zip'          => '10005',
            'taxSavings'   => 'Up to 13% Tax Savings',
            'recTax'       => '13% State & Local Adult-Use Cannabis Tax + THC Potency Tax',
            'medTax'       => '7% State Medical Tax (Zero NYC local sales tax on medical cannabis)',
            'headline'     => 'New York City Medical Cannabis Doctor Telehealth Evaluations',
            'subheading'   => 'Connect with registered New York State cannabis physicians. Immediate digital certification for instant dispensary shopping.',
            'dispensaries' => 'Accepted at all registered medical dispensaries across Manhattan, Brooklyn, Queens, Bronx, and Staten Island.',
            'lat'          => '40.7128',
            'lng'          => '-74.0060',
        ),
        'buffalo' => array(
            'slug'         => 'buffalo',
            'cityName'     => 'Buffalo',
            'stateName'    => 'New York',
            'stateCode'    => 'NY',
            'metroArea'    => 'Western New York & Erie County',
            'price'        => '$49.00',
            'localPhone'   => '(716) 420-6540',
            'address'      => '50 Fountain Plaza, Suite 1400',
            'zip'          => '14202',
            'taxSavings'   => 'Up to 13% Tax Savings',
            'recTax'       => '13% NY adult-use cannabis tax + THC potency surcharge',
            'medTax'       => 'Exempt from local adult-use surcharges with medical certification',
            'headline'     => 'Buffalo Medical Cannabis Doctor Telehealth Clinic',
            'subheading'   => 'Western New York patients connect with registered NY medical marijuana doctors online in 15 minutes.',
            'dispensaries' => 'Shop legally at MedMen, Verilife, and Botanist dispensaries throughout Buffalo and Amherst.',
            'lat'          => '42.8864',
            'lng'          => '-78.8784',
        ),
        'rochester' => array(
            'slug'         => 'rochester',
            'cityName'     => 'Rochester',
            'stateName'    => 'New York',
            'stateCode'    => 'NY',
            'metroArea'    => 'Finger Lakes & Monroe County',
            'price'        => '$49.00',
            'localPhone'   => '(585) 420-7810',
            'address'      => '100 Clinton Square, Suite 600',
            'zip'          => '14604',
            'taxSavings'   => 'Up to 13% Tax Savings',
            'recTax'       => '13% adult-use cannabis tax',
            'medTax'       => 'Reduced medical tax rate and priority patient supply',
            'headline'     => 'Rochester Medical Cannabis Doctor Evaluations',
            'subheading'   => 'Monroe County cannabis evaluations from certified NY telehealth doctors.',
            'dispensaries' => 'Valid at Columbia Care, FP Wellness, and local Monroe County medical cannabis dispensaries.',
            'lat'          => '43.1566',
            'lng'          => '-77.6088',
        ),

        // --- PENNSYLVANIA CITIES ---
        'philadelphia' => array(
            'slug'         => 'philadelphia',
            'cityName'     => 'Philadelphia',
            'stateName'    => 'Pennsylvania',
            'stateCode'    => 'PA',
            'metroArea'    => 'Greater Philadelphia & Delaware Valley',
            'price'        => '$99.00',
            'localPhone'   => '(215) 420-6640',
            'address'      => '1735 Market St, Suite 3750',
            'zip'          => '19103',
            'taxSavings'   => 'Medical Only State',
            'recTax'       => 'Recreational cannabis is NOT legal in Pennsylvania. Medical card mandatory.',
            'medTax'       => 'PA medical card unlocks 100% legal access to state-approved dispensaries.',
            'headline'     => 'Philadelphia Medical Marijuana Doctor Telehealth',
            'subheading'   => 'Board-approved PA medical marijuana doctors for Philadelphia, Bucks, Montgomery, and Chester County.',
            'dispensaries' => 'Valid at Ethos, Restore, Sunnyside, Curaleaf, and Beyond/Hello throughout Philadelphia.',
            'lat'          => '39.9526',
            'lng'          => '-75.1652',
        ),
        'pittsburgh' => array(
            'slug'         => 'pittsburgh',
            'cityName'     => 'Pittsburgh',
            'stateName'    => 'Pennsylvania',
            'stateCode'    => 'PA',
            'metroArea'    => 'Western Pennsylvania & Allegheny County',
            'price'        => '$99.00',
            'localPhone'   => '(412) 420-8910',
            'address'      => '600 Grant St, Suite 4900',
            'zip'          => '15219',
            'taxSavings'   => 'Medical Only State',
            'recTax'       => 'Adult-use cannabis remains prohibited in PA.',
            'medTax'       => 'Official certification issued directly into the PA Department of Health registry.',
            'headline'     => 'Pittsburgh Medical Marijuana Doctor Certifications',
            'subheading'   => 'Allegheny County patients: complete your medical marijuana evaluation 100% online in 15 minutes.',
            'dispensaries' => 'Accepted at Organic Remedies, Trulieve, Sunnyside, and Maitri Medicinals across Pittsburgh.',
            'lat'          => '40.4406',
            'lng'          => '-79.9959',
        ),

        // --- OHIO CITIES ---
        'columbus' => array(
            'slug'         => 'columbus',
            'cityName'     => 'Columbus',
            'stateName'    => 'Ohio',
            'stateCode'    => 'OH',
            'metroArea'    => 'Central Ohio & Franklin County',
            'price'        => '$89.00',
            'localPhone'   => '(614) 420-5570',
            'address'      => '100 E Broad St, Suite 1400',
            'zip'          => '43215',
            'taxSavings'   => 'Save 10% Excise Surcharge',
            'recTax'       => '10% Adult-Use Cannabis Excise Tax + 7.5% Sales Tax',
            'medTax'       => 'Exempt from 10% adult-use cannabis tax surcharge with medical card',
            'headline'     => 'Columbus Medical Marijuana Doctor Telehealth Evaluations',
            'subheading'   => 'Ohio State Medical Board certified doctors providing same-day medical marijuana recommendations.',
            'dispensaries' => 'Valid at Terrasana, The Botanist, Verdant Creations, and Trulieve across Columbus.',
            'lat'          => '39.9612',
            'lng'          => '-82.9988',
        ),
        'cleveland' => array(
            'slug'         => 'cleveland',
            'cityName'     => 'Cleveland',
            'stateName'    => 'Ohio',
            'stateCode'    => 'OH',
            'metroArea'    => 'Northeast Ohio & Cuyahoga County',
            'price'        => '$89.00',
            'localPhone'   => '(216) 420-7630',
            'address'      => '200 Public Square, Suite 2800',
            'zip'          => '44114',
            'taxSavings'   => 'Save 10% Excise Surcharge',
            'recTax'       => '10% Adult-Use Excise Tax + 8% Cuyahoga County Sales Tax',
            'medTax'       => 'Medical patients pay 0% excise surcharge and receive dedicated supply',
            'headline'     => 'Cleveland Medical Marijuana Doctor Certifications',
            'subheading'   => 'Compassionate cannabis consultations for patients across Cleveland, Lakewood, and Parma.',
            'dispensaries' => 'Shop legally at RISE, The Botanist, and Body and Mind dispensaries across Cuyahoga County.',
            'lat'          => '41.4993',
            'lng'          => '-81.6944',
        ),
        'cincinnati' => array(
            'slug'         => 'cincinnati',
            'cityName'     => 'Cincinnati',
            'stateName'    => 'Ohio',
            'stateCode'    => 'OH',
            'metroArea'    => 'Greater Cincinnati & Hamilton County',
            'price'        => '$89.00',
            'localPhone'   => '(513) 420-9410',
            'address'      => '312 Walnut St, Suite 1600',
            'zip'          => '45202',
            'taxSavings'   => 'Save 10% Excise Surcharge',
            'recTax'       => '10% Adult-Use Excise Tax + 7.8% Sales Tax',
            'medTax'       => 'Medical card eliminates the 10% adult-use tax and ensures medical dosing limits',
            'headline'     => 'Cincinnati Medical Marijuana Doctor Consultations',
            'subheading'   => 'Connect online with licensed Ohio cannabis physicians for Hamilton and Butler County patients.',
            'dispensaries' => 'Accepted at Verilife, Zen Leaf, and Sunnyside dispensaries throughout Greater Cincinnati.',
            'lat'          => '39.1031',
            'lng'          => '-84.5120',
        ),
    );
}

/**
 * 2. Get Merged Cities Data
 */
function online_mmj_get_cities() {
    $defaults = online_mmj_get_default_cities();
    $saved = get_option('online_mmj_custom_cities', array());
    $merged = is_array($saved) ? array_merge($defaults, $saved) : $defaults;

    $final = array();
    foreach ($merged as $k => $c) {
        $clean_k = preg_replace('/^medical-marijuana-card-/', '', $k);
        $clean_k = preg_replace('/-(ca|fl|ny|pa|oh)$/i', '', $clean_k);
        $canonical_key = 'medical-marijuana-card-' . $clean_k;
        $c['slug'] = $canonical_key;
        $final[$canonical_key] = $c;
        $final[$clean_k] = $c; // alias
        if (!empty($c['stateCode'])) {
            $final[$clean_k . '-' . strtolower($c['stateCode'])] = $c; // alias e.g. fresno-ca
        }
    }
    return $final;
}

/**
 * 3. Default Core States Data (All 15 Target States)
 */
function online_mmj_get_default_states() {
    return array(
        'california' => array(
            'name'             => 'California',
            'code'             => 'CA',
            'price'            => 39.99,
            'renewalPrice'     => 39.99,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to 8 oz concentrated or dried cannabis flower',
            'cultivation'      => 'Up to 6 mature plants, or 99 plants with 99-Plant Rec',
            'registryUrl'      => 'https://www.cdph.ca.gov/Programs/CHSI/Pages/MMICP.aspx',
            'summary'          => 'California was the first state to legalize medical cannabis under Prop 215. A medical recommendation saves you up to 34% in retail cannabis taxes and allows 18+ patients legal access.',
        ),
        'new-york' => array(
            'name'             => 'New York',
            'code'             => 'NY',
            'price'            => 49.00,
            'renewalPrice'     => 49.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to a 60-day supply of medical cannabis',
            'cultivation'      => 'Up to 3 mature and 3 immature plants per patient',
            'registryUrl'      => 'https://cannabis.ny.gov/medical-cannabis',
            'summary'          => 'Under the MRTA, any condition certified by a licensed physician qualifies in New York. Patients save the 13% adult-use cannabis tax and have priority dispensary access.',
        ),
        'florida' => array(
            'name'             => 'Florida',
            'code'             => 'FL',
            'price'            => 149.00,
            'renewalPrice'     => 99.00,
            'validity'         => '7 Months (State mandated doctor visit cycle)',
            'possessionLimit'  => 'Up to a 70-day supply (2.5 oz smokable flower per 35-day order)',
            'cultivation'      => 'Home cultivation is currently prohibited by FL state law',
            'registryUrl'      => 'https://knowthefactsmmj.com/',
            'summary'          => 'Florida requires certification by a qualified Florida physician registered with the OMMU. Evaluations grant legal access to all licensed medical dispensaries.',
        ),
        'pennsylvania' => array(
            'name'             => 'Pennsylvania',
            'code'             => 'PA',
            'price'            => 99.00,
            'renewalPrice'     => 79.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to a 90-day medical supply',
            'cultivation'      => 'Home cultivation is not permitted in Pennsylvania',
            'registryUrl'      => 'https://www.health.pa.gov/topics/programs/Medical-Marijuana/Pages/Patients.aspx',
            'summary'          => 'Pennsylvania has 24 state-approved qualifying conditions including chronic pain, anxiety, and PTSD. Telehealth consultations are 100% legal statewide.',
        ),
        'ohio' => array(
            'name'             => 'Ohio',
            'code'             => 'OH',
            'price'            => 89.00,
            'renewalPrice'     => 69.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to a 90-day supply tiered by tier I and tier II cannabis',
            'cultivation'      => 'Up to 6 plants per individual (max 12 per household)',
            'registryUrl'      => 'https://www.medicalmarijuana.ohio.gov/',
            'summary'          => 'Ohio medical patients enjoy dedicated dispensary stock, lower prices, and exemption from adult-use cannabis surcharges.',
        ),
        'oklahoma' => array(
            'name'             => 'Oklahoma',
            'code'             => 'OK',
            'price'            => 99.00,
            'renewalPrice'     => 79.00,
            'validity'         => '2 Years',
            'possessionLimit'  => 'Up to 3 oz on person, 8 oz at home, 1 oz concentrates',
            'cultivation'      => 'Up to 6 mature plants and 6 seedling plants',
            'registryUrl'      => 'https://oklahoma.gov/omma.html',
            'summary'          => 'Oklahoma has no restrictive qualifying condition list; physician discretion determines certification under SQ 788. Telehealth evaluations are fully supported statewide.',
        ),
        'massachusetts' => array(
            'name'             => 'Massachusetts',
            'code'             => 'MA',
            'price'            => 129.00,
            'renewalPrice'     => 99.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to a 60-day supply (typically 10 oz)',
            'cultivation'      => 'Up to 6 plants per person (max 12 per household)',
            'registryUrl'      => 'https://masscannabiscontrol.com/',
            'summary'          => 'Massachusetts medical cardholders are exempt from the 20% state and local retail cannabis excise taxes, saving patients hundreds of dollars each year.',
        ),
        'illinois' => array(
            'name'             => 'Illinois',
            'code'             => 'IL',
            'price'            => 129.00,
            'renewalPrice'     => 99.00,
            'validity'         => '1 to 3 Years',
            'possessionLimit'  => 'Up to 2.5 oz (71 grams) per 14-day period',
            'cultivation'      => 'Up to 5 plants per household for medical registered patients only',
            'registryUrl'      => 'https://dph.illinois.gov/topics-services/prevention-wellness/medical-cannabis.html',
            'summary'          => 'Illinois medical cannabis patients save up to 35% in high potency taxes and possess exclusive rights to cultivate cannabis plants at home.',
        ),
        'michigan' => array(
            'name'             => 'Michigan',
            'code'             => 'MI',
            'price'            => 89.00,
            'renewalPrice'     => 69.00,
            'validity'         => '2 Years',
            'possessionLimit'  => 'Up to 2.5 oz of medical cannabis flower',
            'cultivation'      => 'Up to 12 plants per qualified patient',
            'registryUrl'      => 'https://www.michigan.gov/cra',
            'summary'          => 'Michigan MMMP cardholders avoid the 10% adult-use excise tax and gain reciprocal purchase privileges across numerous other medical cannabis states.',
        ),
        'arizona' => array(
            'name'             => 'Arizona',
            'code'             => 'AZ',
            'price'            => 149.00,
            'renewalPrice'     => 119.00,
            'validity'         => '2 Years',
            'possessionLimit'  => 'Up to 2.5 oz every 14 days',
            'cultivation'      => 'Up to 12 plants if patient resides over 25 miles from nearest dispensary',
            'registryUrl'      => 'https://www.azdhs.gov/licensing/medical-marijuana/',
            'summary'          => 'Arizona medical cardholders are exempt from the 16% recreational cannabis excise tax and are permitted higher medical purchase limits.',
        ),
        'connecticut' => array(
            'name'             => 'Connecticut',
            'code'             => 'CT',
            'price'            => 129.00,
            'renewalPrice'     => 99.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to 5.0 oz per month',
            'cultivation'      => 'Up to 3 mature and 3 immature plants per patient (max 12 per home)',
            'registryUrl'      => 'https://portal.ct.gov/dcp/medical-marijuana-program',
            'summary'          => 'Connecticut medical patients enjoy dedicated dispensary supply queues, higher monthly purchase allowances, and exemption from retail cannabis taxes.',
        ),
        'maryland' => array(
            'name'             => 'Maryland',
            'code'             => 'MD',
            'price'            => 119.00,
            'renewalPrice'     => 89.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to 120 grams of flower or 36 grams of THC concentrates per 30 days',
            'cultivation'      => 'Up to 4 plants for medical patients (vs 2 for recreational adults)',
            'registryUrl'      => 'https://mmcc.maryland.gov/',
            'summary'          => 'Maryland medical patients avoid the 9% adult-use cannabis sales tax and receive priority dispensary ordering and higher potency allowances.',
        ),
        'missouri' => array(
            'name'             => 'Missouri',
            'code'             => 'MO',
            'price'            => 99.00,
            'renewalPrice'     => 79.00,
            'validity'         => '3 Years',
            'possessionLimit'  => 'Up to 6 oz per 30-day period',
            'cultivation'      => 'Up to 6 flowering plants with patient cultivator authorization',
            'registryUrl'      => 'https://health.mo.gov/safety/medical-marijuana/',
            'summary'          => 'Missouri medical cards are valid for 3 full years, provide lower tax rates (4% vs 6%+ local surcharges), and offer patient employment protections.',
        ),
        'new-jersey' => array(
            'name'             => 'New Jersey',
            'code'             => 'NJ',
            'price'            => 129.00,
            'renewalPrice'     => 99.00,
            'validity'         => '1 to 2 Years',
            'possessionLimit'  => 'Up to 3 oz (84 grams) per 30-day period',
            'cultivation'      => 'Home cultivation is not currently permitted in New Jersey',
            'registryUrl'      => 'https://www.nj.gov/cannabis/',
            'summary'          => 'New Jersey completely phased out all state sales tax on medical cannabis (0% tax), saving patients significantly compared to adult-use purchases.',
        ),
        'virginia' => array(
            'name'             => 'Virginia',
            'code'             => 'VA',
            'price'            => 99.00,
            'renewalPrice'     => 79.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to a 90-day medical supply',
            'cultivation'      => 'Up to 4 plants per household for personal medical use',
            'registryUrl'      => 'https://www.cca.virginia.gov/',
            'summary'          => 'In Virginia, a written physician certification provides immediate legal access to all state licensed medical cannabis dispensaries.',
        ),
        'colorado' => array(
            'name'             => 'Colorado',
            'code'             => 'CO',
            'price'            => 89.00,
            'renewalPrice'     => 69.00,
            'validity'         => '1 Year',
            'possessionLimit'  => '2 oz flower, 8g concentrates',
            'cultivation'      => '6 plants (up to 3 flowering)',
            'registryUrl'      => 'https://cdphe.colorado.gov/medical-marijuana',
            'summary'          => 'Colorado medical patients save substantial retail excise taxes, pay just 2.9% state sales tax, and can obtain extended plant count recommendations.',
        ),
        'nevada' => array(
            'name'             => 'Nevada',
            'code'             => 'NV',
            'price'            => 99.00,
            'renewalPrice'     => 79.00,
            'validity'         => '1 or 2 Years',
            'possessionLimit'  => '2.5 oz of usable cannabis or 10,000mg THC concentrates',
            'cultivation'      => 'Up to 12 plants per household if 25+ miles from dispensary',
            'registryUrl'      => 'https://ccb.nv.gov/medical/',
            'summary'          => 'Nevada medical cardholders save the 10% retail excise tax at dispensaries in Las Vegas and Reno, and enjoy dedicated medical queues.',
        ),
        'washington' => array(
            'name'             => 'Washington',
            'code'             => 'WA',
            'price'            => 119.00,
            'renewalPrice'     => 89.00,
            'validity'         => '1 Year',
            'possessionLimit'  => '3 oz usable cannabis, 48 oz solid infused',
            'cultivation'      => 'Up to 15 plants with medical recognition card authorization',
            'registryUrl'      => 'https://doh.wa.gov/you-and-your-family/cannabis/medical-cannabis',
            'summary'          => 'Washington state recognition cardholders save the enormous 37% state cannabis excise tax and grow up to 15 plants at home.',
        ),
        'maine' => array(
            'name'             => 'Maine',
            'code'             => 'ME',
            'price'            => 79.00,
            'renewalPrice'     => 59.00,
            'validity'         => '1 Year',
            'possessionLimit'  => '2.5 oz of prepared medical cannabis',
            'cultivation'      => 'Up to 6 mature flowering plants and 12 immature plants',
            'registryUrl'      => 'https://www.maine.gov/dafs/ocp/medical-use',
            'summary'          => 'Maine grants certifying physicians full clinical discretion with zero state registry fees and instant digital certificates.',
        ),
        'oregon' => array(
            'name'             => 'Oregon',
            'code'             => 'OR',
            'price'            => 139.00,
            'renewalPrice'     => 109.00,
            'validity'         => '1 Year',
            'possessionLimit'  => '24 oz of usable cannabis, 16 oz cannabinoid products',
            'cultivation'      => 'Up to 6 mature plants and 12 seedlings per patient',
            'registryUrl'      => 'https://www.oregon.gov/oha/ph/diseasesconditions/chronicdisease/medicalmarijuanaprogram/pages/index.aspx',
            'summary'          => 'Oregon Medical Marijuana Program (OMMP) patients enjoy complete exemption from the 17% state cannabis tax.',
        ),
        'utah' => array(
            'name'             => 'Utah',
            'code'             => 'UT',
            'price'            => 169.00,
            'renewalPrice'     => 139.00,
            'validity'         => '1 Year',
            'possessionLimit'  => '113 grams of unprocessed cannabis or 20 grams total composite THC',
            'cultivation'      => 'Not permitted under Utah law',
            'registryUrl'      => 'https://medicalcannabis.utah.gov/',
            'summary'          => 'Utah allows qualified medical providers to certify patients via telehealth for chronic pain lasting 2+ weeks and other conditions.',
        ),
        'louisiana' => array(
            'name'             => 'Louisiana',
            'code'             => 'LA',
            'price'            => 149.00,
            'renewalPrice'     => 119.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to a 30-day physician-prescribed supply (2.5 oz flower per 14 days)',
            'cultivation'      => 'Not permitted in Louisiana',
            'registryUrl'      => 'https://ldh.la.gov/page/medical-marijuana',
            'summary'          => 'Louisiana gives physicians complete therapeutic discretion to recommend medical cannabis for any debilitating condition.',
        ),
        'new-mexico' => array(
            'name'             => 'New Mexico',
            'code'             => 'NM',
            'price'            => 119.00,
            'renewalPrice'     => 89.00,
            'validity'         => '3 Years',
            'possessionLimit'  => '425 units (approximately 15 oz) per 90-day period',
            'cultivation'      => 'Up to 16 plants for personal medical production',
            'registryUrl'      => 'https://www.nmhealth.org/about/mcp/svcs/',
            'summary'          => 'New Mexico medical cards are valid for 3 full years! Medical cardholders pay zero gross receipts tax on cannabis medicine.',
        ),
        'rhode-island' => array(
            'name'             => 'Rhode Island',
            'code'             => 'RI',
            'price'            => 139.00,
            'renewalPrice'     => 109.00,
            'validity'         => '1 Year',
            'possessionLimit'  => '2.5 oz of usable cannabis',
            'cultivation'      => 'Up to 12 plants and 12 seedlings per patient home',
            'registryUrl'      => 'https://health.ri.gov/programs/detail.php?pgm_id=139',
            'summary'          => 'Rhode Island medical patients are exempt from the 10% state cannabis excise tax and 3% municipal tax, saving 13% at compassion centers.',
        ),
        'delaware' => array(
            'name'             => 'Delaware',
            'code'             => 'DE',
            'price'            => 149.00,
            'renewalPrice'     => 119.00,
            'validity'         => '1 to 2 Years',
            'possessionLimit'  => 'Up to 3 oz of usable cannabis',
            'cultivation'      => 'Not currently permitted for patients',
            'registryUrl'      => 'https://dhss.delaware.gov/dhss/dph/hsp/medmarhome.html',
            'summary'          => 'Delaware medical cannabis patients have legal access to compassionate compassion centers with fast telehealth approvals.',
        ),
        'hawaii' => array(
            'name'             => 'Hawaii',
            'code'             => 'HI',
            'price'            => 159.00,
            'renewalPrice'     => 129.00,
            'validity'         => '1 to 2 Years',
            'possessionLimit'  => '4 oz of usable cannabis per 15-day period',
            'cultivation'      => 'Up to 10 plants per patient across all stages of growth',
            'registryUrl'      => 'https://health.hawaii.gov/medicalcannabisregistry/',
            'summary'          => 'Hawaii 329 medical cannabis cards protect patients across all islands with rapid doctor certifications.',
        ),
        'arkansas' => array(
            'name'             => 'Arkansas',
            'code'             => 'AR',
            'price'            => 159.00,
            'renewalPrice'     => 129.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to 2.5 oz every 14-day rolling cycle',
            'cultivation'      => 'Not permitted under Arkansas law',
            'registryUrl'      => 'https://www.healthy.arkansas.gov/programs-services/topics/medical-marijuana',
            'summary'          => 'Arkansas medical marijuana certifications by our licensed physicians grant full access to all 38 licensed dispensaries statewide.',
        ),
        'new-hampshire' => array(
            'name'             => 'New Hampshire',
            'code'             => 'NH',
            'price'            => 149.00,
            'renewalPrice'     => 119.00,
            'validity'         => '1 Year',
            'possessionLimit'  => '2 oz of usable cannabis in a 10-day period',
            'cultivation'      => 'Up to 3 mature plants and 3 immature plants per patient',
            'registryUrl'      => 'https://www.dhhs.nh.gov/programs-services/population-health/therapeutic-cannabis-program',
            'summary'          => 'New Hampshire Therapeutic Cannabis Program provides patients home grow rights up to 3 mature plants and ATCs access.',
        ),
        'west-virginia' => array(
            'name'             => 'West Virginia',
            'code'             => 'WV',
            'price'            => 149.00,
            'renewalPrice'     => 119.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to a 30-day medical supply as determined by physician',
            'cultivation'      => 'Not permitted for patients',
            'registryUrl'      => 'https://medcanwv.org/',
            'summary'          => 'West Virginia medical cannabis program allows patients with intractable pain and debilitating conditions to obtain certifications online.',
        ),
        'mississippi' => array(
            'name'             => 'Mississippi',
            'code'             => 'MS',
            'price'            => 159.00,
            'renewalPrice'     => 129.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to 6 MMCEUs per 7 days, max 24 MMCEUs per 30 days',
            'cultivation'      => 'Not permitted under Mississippi Medical Cannabis Act',
            'registryUrl'      => 'https://www.mmcp.ms.gov/',
            'summary'          => 'Mississippi Medical Cannabis Program (MMCP) connects patients with registered practitioners for 100% compliant evaluations.',
        ),
        'alabama' => array(
            'name'             => 'Alabama',
            'code'             => 'AL',
            'price'            => 169.00,
            'renewalPrice'     => 139.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Tablets, capsules, tinctures, and topicals up to daily doctor dosage',
            'cultivation'      => 'Not permitted',
            'registryUrl'      => 'https://amcc.alabama.gov/',
            'summary'          => 'Alabama Compassionate Care Act allows certified medical doctors to recommend medicinal cannabis products for refractory neuropathic pain.',
        ),
        'kentucky' => array(
            'name'             => 'Kentucky',
            'code'             => 'KY',
            'price'            => 149.00,
            'renewalPrice'     => 119.00,
            'validity'         => '1 Year',
            'possessionLimit'  => 'Up to a 30-day therapeutic medical cannabis supply',
            'cultivation'      => 'Not permitted',
            'registryUrl'      => 'https://kymedcan.ky.gov/',
            'summary'          => 'Kentucky Medical Cannabis Program allows patients with severe or chronic pain to obtain physician certifications online with dispensary access.',
        ),
        'iowa' => array(
            'name'             => 'Iowa',
            'code'             => 'IA',
            'price'            => 149.00,
            'renewalPrice'     => 119.00,
            'validity'         => '1 Year',
            'possessionLimit'  => '4.5 grams total THC per 90-day period',
            'cultivation'      => 'Not permitted',
            'registryUrl'      => 'https://hhs.iowa.gov/programs/programs-and-services/medical-cannabidiol',
            'summary'          => 'Iowa Medical Cannabidiol Program allows qualified patients to obtain physician certification for tinctures, capsules, and vaporized formulations.',
        ),
    );
}

/**
 * 4. Get Merged States Data
 */
function online_mmj_get_states() {
    $defaults = online_mmj_get_default_states();
    $saved = get_option('online_mmj_custom_states', array());
    $merged = is_array($saved) ? array_merge($defaults, $saved) : $defaults;

    $final = array();
    foreach ($merged as $k => $s) {
        $clean_k = preg_replace('/^medical-marijuana-card-/', '', $k);
        $canonical_key = 'medical-marijuana-card-' . $clean_k;
        $s['slug'] = $canonical_key;
        $final[$canonical_key] = $s;
        $final[$clean_k] = $s; // alias e.g. california
        if (!empty($s['code'])) {
            $final[strtolower($s['code'])] = $s; // alias e.g. ca
        }
    }
    return $final;
}

/**
 * 5. Register Admin Submenus under "MMJ Leads & Emails"
 */
function online_mmj_register_pages_admin_menu() {
    // 1. State Laws & Pricing Manager
    add_submenu_page(
        'online-mmj-leads',
        __('State Laws & Pricing', 'online-mmj-card'),
        __('State Laws & Pricing', 'online-mmj-card'),
        'manage_options',
        'online-mmj-states',
        'online_mmj_render_states_manager_page'
    );

    // 2. 1-Click Sync to WordPress Pages
    add_submenu_page(
        'online-mmj-leads',
        __('Sync / Publish All Core Pages', 'online-mmj-card'),
        __('Sync / Publish Pages', 'online-mmj-card'),
        'manage_options',
        'online-mmj-sync-pages',
        'online_mmj_render_sync_pages_screen'
    );

    // 3. Pages & Posts Content Manager (Add & Edit Pages / Add & Edit Posts)
    add_submenu_page(
        'online-mmj-leads',
        __('Pages & Posts Manager (Add & Edit)', 'online-mmj-card'),
        __('Add & Edit Pages / Posts', 'online-mmj-card'),
        'manage_options',
        'online-mmj-pages-posts',
        'online_mmj_render_pages_posts_manager_page'
    );
}
add_action('admin_menu', 'online_mmj_register_pages_admin_menu');

/**
 * 6. Render Local Cities Manager Page
 */
function online_mmj_render_cities_manager_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('Unauthorized', 'online-mmj-card'));
    }

    $cities = online_mmj_get_cities();
    $action = isset($_GET['action']) ? sanitize_text_field($_GET['action']) : '';
    $city_slug = isset($_GET['city']) ? sanitize_text_field($_GET['city']) : '';

    // Handle Save / Update City
    if (isset($_POST['online_mmj_save_city_nonce']) && wp_verify_nonce($_POST['online_mmj_save_city_nonce'], 'online_mmj_save_city_action')) {
        $slug = sanitize_title($_POST['city_slug']);
        if (!empty($slug)) {
            $cities[$slug] = array(
                'slug'         => $slug,
                'cityName'     => sanitize_text_field($_POST['cityName']),
                'stateName'    => sanitize_text_field($_POST['stateName']),
                'stateCode'    => strtoupper(sanitize_text_field($_POST['stateCode'])),
                'metroArea'    => sanitize_text_field($_POST['metroArea']),
                'price'        => sanitize_text_field($_POST['price']),
                'localPhone'   => sanitize_text_field($_POST['localPhone']),
                'address'      => sanitize_text_field($_POST['address']),
                'zip'          => sanitize_text_field($_POST['zip']),
                'taxSavings'   => sanitize_text_field($_POST['taxSavings']),
                'recTax'       => sanitize_text_field($_POST['recTax']),
                'medTax'       => sanitize_text_field($_POST['medTax']),
                'headline'     => sanitize_text_field($_POST['headline']),
                'subheading'   => sanitize_textarea_field($_POST['subheading']),
                'dispensaries' => sanitize_textarea_field($_POST['dispensaries']),
                'lat'          => sanitize_text_field($_POST['lat']),
                'lng'          => sanitize_text_field($_POST['lng']),
            );
            update_option('online_mmj_custom_cities', $cities);
            echo '<div class="notice notice-success is-dismissible"><p><strong>&check; ' . sprintf(esc_html__('City "%s" saved successfully! The live website and local landing page now use this data.', 'online-mmj-card'), esc_html($_POST['cityName'])) . '</strong></p></div>';
            $city_slug = '';
            $action = '';
        }
    }

    // Handle Delete City
    if ($action === 'delete' && !empty($city_slug)) {
        check_admin_referer('delete_city_' . $city_slug);
        unset($cities[$city_slug]);
        update_option('online_mmj_custom_cities', $cities);
        echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('City deleted.', 'online-mmj-card') . '</p></div>';
        $city_slug = '';
        $action = '';
    }

    $is_editing = ($action === 'edit' && !empty($city_slug) && isset($cities[$city_slug])) || ($action === 'new');
    $current_city = ($is_editing && isset($cities[$city_slug])) ? $cities[$city_slug] : array(
        'slug'         => '',
        'cityName'     => '',
        'stateName'    => 'California',
        'stateCode'    => 'CA',
        'metroArea'    => '',
        'price'        => '$39.99',
        'localPhone'   => '(800) 420-6652',
        'address'      => '700 S Flower St',
        'zip'          => '90017',
        'taxSavings'   => 'Up to 34%',
        'recTax'       => 'Sales tax + 15% state excise',
        'medTax'       => 'Exempt from retail sales tax',
        'headline'     => '',
        'subheading'   => '',
        'dispensaries' => '',
        'lat'          => '34.0522',
        'lng'          => '-118.2437',
    );

    ?>
    <div class="wrap mmj-admin-wrap" style="max-width: 1100px;">
        <h1 class="wp-heading-inline">
            <span class="dashicons dashicons-location-alt" style="font-size:28px; width:28px; height:28px; vertical-align:middle; margin-right:6px; color:#008f58;"></span>
            <?php esc_html_e('Local City Pages & Clinic Content Manager', 'online-mmj-card'); ?>
        </h1>

        <?php if (!$is_editing) : ?>
            <a href="<?php echo esc_url(admin_url('admin.php?page=online-mmj-cities&action=new')); ?>" class="page-title-action button-primary" style="background:#008f58; border-color:#007a4a;">
                + <?php esc_html_e('Add New Local City Page', 'online-mmj-card'); ?>
            </a>
            <a href="<?php echo esc_url(admin_url('admin.php?page=online-mmj-sync-pages')); ?>" class="page-title-action button">
                <?php esc_html_e('Publish as WordPress Pages', 'online-mmj-card'); ?> &rarr;
            </a>
        <?php endif; ?>

        <hr class="wp-header-end">

        <?php if ($is_editing) : ?>
            <!-- Edit / Add City Form -->
            <div class="postbox" style="margin-top:20px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                    <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                        <?php echo !empty($city_slug) ? esc_html__('Edit Local City Page: ' . $current_city['cityName'], 'online-mmj-card') : esc_html__('Add New Local City Landing Page', 'online-mmj-card'); ?>
                    </h2>
                </div>
                <div class="inside" style="padding:18px;">
                    <form method="post" action="<?php echo esc_url(admin_url('admin.php?page=online-mmj-cities')); ?>">
                        <?php wp_nonce_field('online_mmj_save_city_action', 'online_mmj_save_city_nonce'); ?>

                        <table class="form-table" style="margin:0; width:100%;">
                            <tr>
                                <th scope="row"><label><?php esc_html_e('City Slug (URL path):', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <code><?php echo esc_url(home_url('/')); ?></code>
                                    <input type="text" name="city_slug" value="<?php echo esc_attr($current_city['slug']); ?>" placeholder="e.g. los-angeles" required style="width:200px;" <?php if (!empty($current_city['slug']) && $action === 'edit') echo 'readonly'; ?> />
                                    <p class="description"><?php esc_html_e('The single-slug clean URL for this city (e.g. /los-angeles, /san-diego).', 'online-mmj-card'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('City & State:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="text" name="cityName" value="<?php echo esc_attr($current_city['cityName']); ?>" placeholder="City Name (e.g. Los Angeles)" required style="width:240px; margin-right:10px;" />
                                    <input type="text" name="stateName" value="<?php echo esc_attr($current_city['stateName']); ?>" placeholder="State Name (e.g. California)" required style="width:200px; margin-right:10px;" />
                                    <input type="text" name="stateCode" value="<?php echo esc_attr($current_city['stateCode']); ?>" placeholder="Code (CA)" required style="width:70px;" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Page Headline (H1):', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="text" name="headline" value="<?php echo esc_attr($current_city['headline'] ?: 'Online Medical Marijuana Card Doctors in ' . $current_city['cityName']); ?>" style="width:100%;" required />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Page Subheadline:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <textarea name="subheading" rows="2" style="width:100%;"><?php echo esc_textarea($current_city['subheading']); ?></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Local Phone & Price:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="text" name="localPhone" value="<?php echo esc_attr($current_city['localPhone']); ?>" placeholder="Local Phone (213) 420-5690" style="width:240px; margin-right:10px;" />
                                    <input type="text" name="price" value="<?php echo esc_attr($current_city['price']); ?>" placeholder="Price $39.99" style="width:120px;" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Physical Clinic Address & Zip:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="text" name="address" value="<?php echo esc_attr($current_city['address']); ?>" placeholder="Address (e.g. 700 S Flower St, Suite 1000)" style="width:360px; margin-right:10px;" />
                                    <input type="text" name="zip" value="<?php echo esc_attr($current_city['zip']); ?>" placeholder="Zip Code (90017)" style="width:100px;" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Tax Savings Info:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="text" name="taxSavings" value="<?php echo esc_attr($current_city['taxSavings']); ?>" placeholder="e.g. Up to 34.5%" style="width:200px; margin-bottom:8px; display:block;" />
                                    <input type="text" name="recTax" value="<?php echo esc_attr($current_city['recTax']); ?>" placeholder="Adult-Use Tax Rate (e.g. 9.5% sales + 15% excise)" style="width:100%; margin-bottom:6px;" />
                                    <input type="text" name="medTax" value="<?php echo esc_attr($current_city['medTax']); ?>" placeholder="Medical Patient Rate (e.g. 0% sales tax exempt)" style="width:100%;" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Dispensary Regulations Note:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <textarea name="dispensaries" rows="2" style="width:100%;"><?php echo esc_textarea($current_city['dispensaries']); ?></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Map Coordinates:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="text" name="lat" value="<?php echo esc_attr($current_city['lat']); ?>" placeholder="Latitude (34.0522)" style="width:160px; margin-right:10px;" />
                                    <input type="text" name="lng" value="<?php echo esc_attr($current_city['lng']); ?>" placeholder="Longitude (-118.2437)" style="width:160px;" />
                                </td>
                            </tr>
                        </table>

                        <p class="submit" style="margin-top:20px;">
                            <input type="submit" name="submit" class="button button-primary button-large" value="<?php esc_attr_e('Save City Page', 'online-mmj-card'); ?>" style="background:#008f58; border-color:#007a4a; font-weight:700;" />
                            <a href="<?php echo esc_url(admin_url('admin.php?page=online-mmj-cities')); ?>" class="button" style="margin-left:8px;"><?php esc_html_e('Cancel', 'online-mmj-card'); ?></a>
                        </p>
                    </form>
                </div>
            </div>
        <?php else : ?>
            <!-- City List Table -->
            <p class="description" style="margin:16px 0;">
                <?php esc_html_e('Manage all local city landing pages. Click "Edit" on any city to change phone numbers, local addresses, pricing, tax calculations, or dispensary legal rules.', 'online-mmj-card'); ?>
            </p>

            <table class="wp-list-table widefat fixed striped table-view-list">
                <thead>
                    <tr>
                        <th scope="col" style="width:180px;"><?php esc_html_e('City & Metro Area', 'online-mmj-card'); ?></th>
                        <th scope="col" style="width:100px;"><?php esc_html_e('State', 'online-mmj-card'); ?></th>
                        <th scope="col" style="width:140px;"><?php esc_html_e('Local Phone', 'online-mmj-card'); ?></th>
                        <th scope="col"><?php esc_html_e('Local Clinic Address', 'online-mmj-card'); ?></th>
                        <th scope="col" style="width:80px;"><?php esc_html_e('Price', 'online-mmj-card'); ?></th>
                        <th scope="col" style="width:100px;"><?php esc_html_e('Tax Savings', 'online-mmj-card'); ?></th>
                        <th scope="col" style="width:140px; text-align:right;"><?php esc_html_e('Actions', 'online-mmj-card'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($cities as $s => $ct) : 
                        $edit_url = admin_url('admin.php?page=online-mmj-cities&action=edit&city=' . $s);
                        $delete_url = wp_nonce_url(admin_url('admin.php?page=online-mmj-cities&action=delete&city=' . $s), 'delete_city_' . $s);
                        $preview_url = home_url('/' . $s . '/');
                    ?>
                        <tr>
                            <td>
                                <strong><a href="<?php echo esc_url($edit_url); ?>" style="font-size:14px; color:#1d2327; text-decoration:none;"><?php echo esc_html($ct['cityName']); ?></a></strong>
                                <div style="font-size:11px; color:#646970; margin-top:2px;">/<?php echo esc_html($s); ?>/</div>
                            </td>
                            <td>
                                <span class="badge" style="background:#e6f4ea; color:#137333; padding:2px 8px; border-radius:10px; font-weight:700; font-size:11px;">
                                    <?php echo esc_html($ct['stateCode']); ?>
                                </span>
                            </td>
                            <td>
                                <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', $ct['localPhone'])); ?>" style="font-weight:600; text-decoration:none; color:#0f172a;">
                                    <?php echo esc_html($ct['localPhone']); ?>
                                </a>
                            </td>
                            <td>
                                <div style="font-size:12px; color:#334155;"><?php echo esc_html($ct['address']); ?></div>
                                <div style="font-size:11px; color:#646970;"><?php echo esc_html($ct['zip']); ?></div>
                            </td>
                            <td>
                                <strong style="color:#008f58;"><?php echo esc_html($ct['price']); ?></strong>
                            </td>
                            <td>
                                <span style="font-size:12px; font-weight:600; color:#2271b1;"><?php echo esc_html($ct['taxSavings']); ?></span>
                            </td>
                            <td style="text-align:right;">
                                <a href="<?php echo esc_url($preview_url); ?>" target="_blank" class="button button-small" title="View live page on website">
                                    View &rarr;
                                </a>
                                <a href="<?php echo esc_url($edit_url); ?>" class="button button-small button-primary" style="background:#008f58; border-color:#007a4a; margin-left:4px;">
                                    Edit
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * 7. Render State Laws & Pricing Manager Page
 */
function online_mmj_render_states_manager_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('Unauthorized', 'online-mmj-card'));
    }

    $states = online_mmj_get_states();

    if (isset($_POST['online_mmj_save_states_nonce']) && wp_verify_nonce($_POST['online_mmj_save_states_nonce'], 'online_mmj_save_states_action')) {
        $submitted_states = isset($_POST['states']) ? (array)$_POST['states'] : array();
        foreach ($submitted_states as $code => $st_data) {
            if (isset($states[$code])) {
                $states[$code]['price']           = floatval($st_data['price']);
                $states[$code]['renewalPrice']    = floatval($st_data['renewalPrice']);
                $states[$code]['validity']        = sanitize_text_field($st_data['validity']);
                $states[$code]['possessionLimit'] = sanitize_text_field($st_data['possessionLimit']);
                $states[$code]['cultivation']     = sanitize_text_field($st_data['cultivation']);
                $states[$code]['registryUrl']     = esc_url_raw($st_data['registryUrl']);
                if (isset($st_data['summary'])) {
                    $states[$code]['summary']     = sanitize_textarea_field($st_data['summary']);
                }
            }
        }
        update_option('online_mmj_custom_states', $states);
        echo '<div class="notice notice-success is-dismissible"><p><strong>&check; ' . esc_html__('State telemedicine laws and pricing updated successfully! The calculator and state pages now reflect these values.', 'online-mmj-card') . '</strong></p></div>';
    }

    ?>
    <div class="wrap mmj-admin-wrap" style="max-width: 1100px;">
        <h1>
            <span class="dashicons dashicons-admin-site-alt3" style="font-size:28px; width:28px; height:28px; vertical-align:middle; margin-right:6px; color:#008f58;"></span>
            <?php esc_html_e('State Telehealth Laws, Pricing & Regulations', 'online-mmj-card'); ?>
        </h1>
        <p class="description">
            <?php esc_html_e('Edit the telemedicine consultation fees, renewal rates, legal possession limits, and state health department registry URLs for all states.', 'online-mmj-card'); ?>
        </p>

        <form method="post" action="">
            <?php wp_nonce_field('online_mmj_save_states_action', 'online_mmj_save_states_nonce'); ?>

            <?php foreach ($states as $key => $st) : 
                $state_url = home_url('/' . $key . '/');
            ?>
                <div class="postbox" style="margin-top:20px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                    <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px; display:flex; justify-content:space-between; align-items:center;">
                        <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                            <?php echo esc_html($st['name']); ?> (<?php echo esc_html($st['code']); ?>)
                            <span style="font-size:11px; color:#646970; font-weight:normal; margin-left:8px;">
                                /<?php echo esc_html($key); ?>/
                            </span>
                        </h2>
                        <a href="<?php echo esc_url($state_url); ?>" target="_blank" class="button button-small" style="font-weight:600;">
                            View Page &rarr;
                        </a>
                    </div>
                    <div class="inside" style="padding:18px;">
                        <table class="form-table" style="margin:0; width:100%;">
                            <tr>
                                <th scope="row" style="width:180px;"><label><?php esc_html_e('Pricing (New / Renewal):', 'online-mmj-card'); ?></label></th>
                                <td>
                                    New Patient: $ <input type="number" step="0.01" name="states[<?php echo esc_attr($key); ?>][price]" value="<?php echo esc_attr($st['price']); ?>" style="width:90px; margin-right:20px;" />
                                    Card Renewal: $ <input type="number" step="0.01" name="states[<?php echo esc_attr($key); ?>][renewalPrice]" value="<?php echo esc_attr($st['renewalPrice']); ?>" style="width:90px; margin-right:20px;" />
                                    Validity: <input type="text" name="states[<?php echo esc_attr($key); ?>][validity]" value="<?php echo esc_attr($st['validity']); ?>" placeholder="1 Year" style="width:140px;" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Possession Limits:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="text" name="states[<?php echo esc_attr($key); ?>][possessionLimit]" value="<?php echo esc_attr($st['possessionLimit']); ?>" style="width:100%;" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Home Cultivation Policy:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="text" name="states[<?php echo esc_attr($key); ?>][cultivation]" value="<?php echo esc_attr($st['cultivation']); ?>" style="width:100%;" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('State Registry URL:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <input type="url" name="states[<?php echo esc_attr($key); ?>][registryUrl]" value="<?php echo esc_attr($st['registryUrl']); ?>" style="width:100%;" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label><?php esc_html_e('Legal Summary:', 'online-mmj-card'); ?></label></th>
                                <td>
                                    <textarea name="states[<?php echo esc_attr($key); ?>][summary]" rows="2" style="width:100%;"><?php echo esc_textarea($st['summary']); ?></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            <?php endforeach; ?>

            <p class="submit" style="margin-top:20px;">
                <input type="submit" name="submit" class="button button-primary button-large" value="<?php esc_attr_e('Save All State Pricing & Laws', 'online-mmj-card'); ?>" style="background:#008f58; border-color:#007a4a; font-weight:700; padding:6px 28px;" />
            </p>
        </form>
    </div>
    <?php
}

/**
 * =========================================================================
 * 7.5 Core Page Synchronization & Generator Logic
 * =========================================================================
 */

/**
 * Look up existing published or draft page by slug
 */
function online_mmj_get_page_by_slug($slug) {
    global $wpdb;
    $slug = sanitize_title($slug);
    $page_id = $wpdb->get_var($wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type = 'page' AND post_status IN ('publish', 'draft', 'private') LIMIT 1",
        $slug
    ));
    return $page_id ? intval($page_id) : null;
}

/**
 * Look up existing post by slug
 */
function online_mmj_get_post_by_slug($slug) {
    global $wpdb;
    $slug = sanitize_title($slug);
    $post_id = $wpdb->get_var($wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type = 'post' AND post_status IN ('publish', 'draft', 'private') LIMIT 1",
        $slug
    ));
    return $post_id ? intval($post_id) : null;
}

/**
 * Default Qualifying Conditions Data
 */
function online_mmj_get_default_conditions() {
    return array(
        'medical-marijuana-for-chronic-pain' => array(
            'id'       => 'chronic-pain',
            'title'    => 'Medical Marijuana for Chronic Pain & Neuropathy',
            'desc'     => 'Learn how medical cannabis relieves neuropathic pain, arthritis, fibromyalgia, and chronic inflammatory pain.',
            'category' => 'Pain Management',
        ),
        'medical-marijuana-for-anxiety' => array(
            'id'       => 'anxiety',
            'title'    => 'Medical Marijuana for Anxiety & Stress Relief',
            'desc'     => 'Clinical guidelines on using CBD and balanced THC formulations for generalized anxiety and panic symptoms.',
            'category' => 'Mental Health',
        ),
        'medical-marijuana-for-insomnia' => array(
            'id'       => 'insomnia',
            'title'    => 'Medical Marijuana for Insomnia & Sleep Disorders',
            'desc'     => 'Discover how terpene profiles like myrcene and linalool paired with cannabinoids improve REM cycle restoration.',
            'category' => 'Sleep Medicine',
        ),
        'medical-marijuana-for-ptsd' => array(
            'id'       => 'ptsd',
            'title'    => 'Medical Marijuana for PTSD & Trauma Relief',
            'desc'     => 'Evidence-based cannabinoid therapy for combat veterans, trauma survivors, and individuals experiencing hyperarousal.',
            'category' => 'Mental Health',
        ),
        'medical-marijuana-for-cancer' => array(
            'id'       => 'cancer',
            'title'    => 'Medical Marijuana for Cancer & Chemotherapy Support',
            'desc'     => 'Palliative medical cannabis therapies for managing chemotherapy-induced nausea, pain, cachexia, and appetite stimulation.',
            'category' => 'Oncology Support',
        ),
        'medical-marijuana-for-glaucoma' => array(
            'id'       => 'glaucoma',
            'title'    => 'Medical Marijuana for Glaucoma & Ocular Pressure',
            'desc'     => 'How cannabinoids temporarily reduce intraocular pressure (IOP) and protect retinal ganglion nerve health.',
            'category' => 'Ophthalmology',
        ),
        'medical-marijuana-for-epilepsy' => array(
            'id'       => 'epilepsy',
            'title'    => 'Medical Marijuana for Epilepsy & Seizure Disorders',
            'desc'     => 'Doctor guidelines on anticonvulsant properties of high-CBD medical cannabis for refractory seizure disorders.',
            'category' => 'Neurology',
        ),
        'medical-marijuana-for-multiple-sclerosis' => array(
            'id'       => 'multiple-sclerosis',
            'title'    => 'Medical Marijuana for Multiple Sclerosis & Spasticity',
            'desc'     => 'Clinical insights into relieving painful muscle spasms, mobility challenges, and neuropathic stiffness.',
            'category' => 'Neurology',
        ),
        'medical-marijuana-for-migraines' => array(
            'id'       => 'migraines',
            'title'    => 'Medical Marijuana for Severe Migraines & Headaches',
            'desc'     => 'Endocannabinoid tone restoration for aborting acute migraine attacks and reducing monthly migraine days.',
            'category' => 'Neurology',
        ),
        'medical-marijuana-for-arthritis' => array(
            'id'       => 'arthritis',
            'title'    => 'Medical Marijuana for Arthritis & Joint Inflammation',
            'desc'     => 'Topical and oral medical cannabis solutions targeting rheumatoid and osteoarthritis inflammation.',
            'category' => 'Pain Management',
        ),
        'medical-marijuana-for-crohns-disease' => array(
            'id'       => 'crohns-disease',
            'title'    => 'Medical Marijuana for Crohn\'s Disease & Gastrointestinal Health',
            'desc'     => 'Anti-inflammatory cannabinoid treatment for Crohn\'s flare-ups, ulcerative colitis, and abdominal pain.',
            'category' => 'Gastroenterology',
        ),
        'medical-marijuana-for-nausea' => array(
            'id'       => 'nausea',
            'title'    => 'Medical Marijuana for Severe Nausea & Cachexia',
            'desc'     => 'Rapid-acting antiemetic cannabinoid formulations restoring appetite and preventing involuntary weight loss.',
            'category' => 'General Medicine',
        ),
    );
}

/**
 * Default Services Data
 */
function online_mmj_get_default_services() {
    return array(
        'new-patient-medical-marijuana-card' => array(
            'title'       => 'New Patient Medical Marijuana Card Online',
            'short_title' => 'New Patient Recommendation',
            'price'       => '$39.99',
            'time'        => '10-15 Minutes',
            'desc'        => 'First-time medical marijuana certification evaluation with board-certified 420 doctors. Same-day digital recommendation letter included with 100% money back guarantee.',
        ),
        'medical-marijuana-card-renewal' => array(
            'title'       => 'Medical Marijuana Card Renewal Online',
            'short_title' => 'Card Renewal Evaluation',
            'price'       => '$39.99',
            'time'        => '5-10 Minutes',
            'desc'        => 'Renew your expiring medical cannabis card online in minutes. Maintain unbroken dispensary access, tax exemptions, and possession protections without office visits.',
        ),
        '99-plant-cultivation-recommendation' => array(
            'title'       => '99-Plant Cultivation Grower Recommendation',
            'short_title' => 'Extended Grow Recommendation',
            'price'       => '$199.00',
            'time'        => '15 Minutes',
            'desc'        => 'Official California physician medical grower certification under Health & Safety Code 11362.775, permitting cultivation of up to 99 plants for personal medical treatment.',
        ),
        'emotional-support-animal-letter' => array(
            'title'       => 'Emotional Support Animal (ESA) Letter Evaluation',
            'short_title' => 'ESA Housing Letter',
            'price'       => '$99.00',
            'time'        => '10-15 Minutes',
            'desc'        => 'Official Fair Housing Act compliant Emotional Support Animal certification letter issued by licensed mental health professionals. Waives no-pet rules and pet rent fees.',
        ),
    );
}

/**
 * Default Clinical Blog Posts Data
 */
function online_mmj_get_default_posts() {
    return array(
        'medical-marijuana-card-vs-recreational-cannabis' => array(
            'title'    => 'Medical Marijuana Card vs Recreational Cannabis: Why Patients Still Save Thousands',
            'category' => 'Patient Savings & Laws',
            'excerpt'  => 'Why having a medical marijuana card saves regular consumers up to 34% in retail cannabis taxes, unlocks higher potency limits, and lowers age requirements.',
            'content'  => '<h2>Why a Medical Marijuana Card Still Matters in Adult-Use States</h2><p>Even in states where recreational adult-use cannabis is fully legalized, over 5 million Americans maintain an active medical marijuana card. Why? The financial and legal benefits far outweigh the nominal cost of an annual physician evaluation.</p><h3>1. Massive Tax Exemptions (Up to 34.5% Savings)</h3><p>Adult-use cannabis is subject to cumulative state excise, sales, and municipal business taxes. For example, recreational buyers in Los Angeles face combined tax rates of approximately 34.5%. With an official medical recommendation and state MMIC, patients are legally exempt from sales tax and qualify for medicinal patient pricing.</p><h3>2. Access to Higher Potency Concentrates & Edibles</h3><p>Recreational regulations cap THC potency (often 100mg per edible package). Medical cannabis patients requiring higher therapeutic doses can purchase concentrated RSO, high-dose tinctures, and higher mg products not legally accessible to recreational consumers.</p><h3>3. Lower Legal Age Requirement (18+ vs 21+)</h3><p>While adult-use cannabis strictly requires consumers to be 21 years of age or older, state medical marijuana programs legally allow individuals 18 years of age and older (or minors with designated caregiver guardians) to access physician-supervised cannabis medicine.</p>[online_mmj_booking button_text="Get Your Medical Card & Start Saving" service="new-patient"]',
        ),
        'how-to-talk-to-doctor-about-medical-marijuana' => array(
            'title'    => 'How to Talk to Your Doctor About Medical Marijuana: A Patient Guide',
            'category' => 'Doctor Consultations',
            'excerpt'  => 'Practical advice on preparing for your 420 telehealth evaluation, discussing chronic symptoms, and asking the right questions about dosing and terpenes.',
            'content'  => '<h2>Preparing for Your Telehealth Medical Marijuana Evaluation</h2><p>Scheduling a consultation with a cannabis-informed physician is a safe, compassionate, and HIPAA-protected medical appointment. Here is how to prepare to ensure an informative consultation.</p><h3>1. Outline Your Primary Health Symptoms</h3><p>Focus on how your health condition impacts your daily quality of life. Common primary symptoms evaluated by medical cannabis physicians include chronic pain, muscle spasticity, insomnia, anxiety attacks, and migraine recurrence.</p><h3>2. Bring a List of Current Medications</h3><p>Cannabinoids are metabolized through the liver\'s cytochrome P450 pathway. Reviewing your current prescription medications with your MMJ physician ensures safe integration without adverse pharmaceutical interactions.</p><h3>3. Ask Specific Questions Regarding Delivery Methods</h3><p>Whether you prefer sublingual tinctures, low-temperature vaporization, transdermal patches, or edibles, your cannabis doctor can help determine the ideal cannabinoid ratios (such as 1:1 THC:CBD or 20:1 CBD:THC) for your lifestyle.</p>[online_mmj_booking button_text="Schedule Your Physician Consultation" service="new-patient"]',
        ),
        'california-ab-2188-workplace-cannabis-rights' => array(
            'title'    => 'California AB 2188: Employee Cannabis Rights and Drug Testing Protections',
            'category' => 'Cannabis Employment Law',
            'excerpt'  => 'Understanding California Assembly Bill 2188 and SB 700: What protections medical marijuana patients have against discrimination in hiring and workplace drug tests.',
            'content'  => '<h2>Historic Workplace Protections for California Cannabis Patients</h2><p>California Assembly Bill 2188 (AB 2188) and Senate Bill 700 (SB 700) fundamentally transformed California labor law by protecting employees and job applicants from discrimination based on off-duty cannabis use.</p><h3>Key Provisions of AB 2188</h3><p>Employers can no longer discriminate against workers based on traditional urine or hair tests that detect non-psychoactive cannabis metabolites (which remain in the body for weeks after consumption). Only tests measuring active, psychoactive THC impairment at the workplace are permitted.</p><h3>Exceptions for Federal and Safety-Sensitive Roles</h3><p>Workers in safety-sensitive construction trades, federal government contractors, commercial drivers governed by DOT regulations, and law enforcement are exempt from AB 2188 protections.</p>[online_mmj_booking button_text="Renew Your California Recommendation" service="renewal"]',
        ),
        'understanding-terpenes-cannabinoids-guide' => array(
            'title'    => 'Understanding Terpenes and Cannabinoids: Clinical Guide for Patients',
            'category' => 'Cannabis Science',
            'excerpt'  => 'A deep dive into the entourage effect, major cannabinoids (THC, CBD, CBG, CBN), and the therapeutic properties of dominant terpenes like myrcene, limonene, and caryophyllene.',
            'content'  => '<h2>Beyond THC: The Entourage Effect Explained</h2><p>The therapeutic benefits of the cannabis plant extend far beyond THC alone. Whole-plant medicine functions through the "entourage effect," wherein minor cannabinoids and aromatic terpenes work synergistically with the human endocannabinoid system.</p><h3>Dominant Therapeutic Terpenes</h3><ul><li><strong>Myrcene:</strong> Known for deeply relaxing, sedative, and anti-inflammatory properties. Common in indica-dominant chemovars.</li><li><strong>Caryophyllene:</strong> The only known terpene that directly binds to peripheral CB2 receptors, delivering potent anti-inflammatory and gastrointestinal benefits without psychoactivity.</li><li><strong>Limonene:</strong> Citrus-scented terpene associated with elevated mood, anti-anxiety benefits, and enhanced gastric absorption.</li><li><strong>Linalool:</strong> Floral, lavender-scented terpene providing calming, anticonvulsant, and sleep-inducing support.</li></ul>[online_mmj_booking button_text="Consult with an MMJ Physician" service="new-patient"]',
        ),
        'medical-marijuana-travel-rules-state-reciprocity' => array(
            'title'    => 'Traveling with Medical Marijuana: State Laws & Reciprocity Explained',
            'category' => 'Travel & Reciprocity',
            'excerpt'  => 'Can you take medical marijuana across state lines? Learn how reciprocity works and which states recognize out-of-state medical cards.',
            'content'  => '<h2>Traveling with Medical Cannabis: Legal Realities & Reciprocity</h2><p>Navigating cannabis laws when traveling between states requires clear understanding of federal jurisdictions and state reciprocity agreements.</p><h3>Federal Jurisdiction: Never Cross State Lines or Fly with Cannabis</h3><p>Because cannabis remains a Schedule I controlled substance under federal law, taking cannabis across state lines (even between two states where cannabis is legal) constitutes interstate trafficking. Air travel falls under federal FAA and TSA jurisdiction.</p><h3>What is Medical Marijuana Reciprocity?</h3><p>Reciprocity occurs when a destination state legally honors out-of-state medical cannabis cards, allowing visitors to purchase medicine at local licensed dispensaries upon arrival. States with strong visitor reciprocity programs include Oklahoma (temporary visitor licenses), Hawaii, Nevada, Arizona, Maine, and Michigan.</p>[online_mmj_booking button_text="Check Your State Reciprocity" service="new-patient"]',
        ),
        'cannabis-for-sleep-insomnia-science' => array(
            'title'    => 'Cannabis for Sleep & Insomnia: What Clinical Research Says',
            'category' => 'Sleep Medicine',
            'excerpt'  => 'How cannabinoids like CBN and THC interact with sleep architecture, reduce sleep latency, and manage nighttime awakenings.',
            'content'  => '<h2>Restoring Sleep Architecture with Medical Cannabis</h2><p>Chronic insomnia affects more than 30% of adults, contributing to cardiovascular risk, anxiety, and immune dysfunction. Research demonstrates that targeted cannabinoid therapies can reduce sleep latency (time to fall asleep) and decrease nighttime awakenings.</p><h3>The Role of Cannabinol (CBN)</h3><p>As THC ages and oxidizes, it converts into Cannabinol (CBN). When combined with small doses of THC and sedating terpenes such as myrcene and terpinolene, CBN promotes deep physiological relaxation without the heavy morning grogginess common to synthetic pharmaceuticals.</p>[online_mmj_booking button_text="Book an Evaluation for Insomnia" service="new-patient"]',
        ),
    );
}

/**
 * 1-Click Complete Synchronization of ALL Core Pages & Posts
 * Creates real, editable WordPress Pages and Blog Posts in wp-admin
 */
/**
 * Generate Full, Rich, Beautiful HTML for Local City Landing Pages
 * Matches Design.png pixel-for-pixel and remains 100% editable in Elementor, Divi, and Gutenberg.
 */
function online_mmj_generate_city_html($ct) {
    $city        = esc_html($ct['cityName']);
    $state       = esc_html($ct['stateName']);
    $code        = esc_html($ct['stateCode']);
    $phone       = esc_html(!empty($ct['localPhone']) ? $ct['localPhone'] : '(888) 420-6789');
    $price       = esc_html(!empty($ct['price']) ? $ct['price'] : '$39.99');
    $subheading  = esc_html($ct['subheading']);
    $savings     = esc_html(!empty($ct['taxSavings']) ? $ct['taxSavings'] : 'Up to 34.5%');
    $rec_tax     = esc_html(!empty($ct['recTax']) ? $ct['recTax'] : 'State Excise + Sales + Local Business Tax');
    $med_tax     = esc_html(!empty($ct['medTax']) ? $ct['medTax'] : 'Exempt from local sales tax with physician recommendation');
    $disp        = esc_html(!empty($ct['dispensaries']) ? $ct['dispensaries'] : 'Valid at all licensed dispensaries across ' . $city . ' and surrounding areas.');

    $areas = array(
        $city . ' Downtown & Arts District',
        $city . ' Metro & Midtown',
        $city . ' North Suburbs',
        $city . ' Westside & Hills',
        $city . ' South County Corridor',
        $city . ' Surrounding Regional Area',
    );

    ob_start();
    ?>
    <!-- HERO SECTION (Matches Design.png) -->
    <section class="mmj-hero-section" style="padding: 40px 16px 56px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 60%, #ffffff 100%); border-bottom: 1px solid #f1f5f9; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: center;">
        
        <!-- Left Column -->
        <div>
          <div class="mmj-badge-emerald" style="display: inline-flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 16px;">
            <span>&#9679; Dedicated Telehealth Clinic &middot; Serving <?php echo $city; ?>, <?php echo $code; ?></span>
          </div>

          <h1 style="font-size: 38px; line-height: 1.15; font-weight: 900; color: #0f172a; margin: 0 0 16px; letter-spacing: -0.5px;">
            Online Medical Marijuana Doctor in <span style="color: #16a34a;"><?php echo $city; ?></span>
          </h1>

          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 24px;">
            Connect directly with our board-certified cannabis physicians from the comfort of your home. We provide 100% online telehealth evaluations, medical cannabis renewals, and same-day digital recommendations with zero office visits required.
          </p>

          <!-- Metrics Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 24px;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px;">
              <div style="font-size: 11px; color: #64748b; font-weight: 700;">Consultation Type</div>
              <div style="font-size: 14px; font-weight: 900; color: #0f172a;">100% Online Telehealth</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px;">
              <div style="font-size: 11px; color: #64748b; font-weight: 700;">Recommendation</div>
              <div style="font-size: 14px; font-weight: 900; color: #16a34a;">Same-Day Digital PDF</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px;">
              <div style="font-size: 11px; color: #64748b; font-weight: 700;">Dispensary Tax Savings</div>
              <div style="font-size: 14px; font-weight: 900; color: #d97706;"><?php echo $savings; ?></div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
            <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="background: #008f58; color: #fff; padding: 14px 28px; border-radius: 12px; font-size: 13px; font-weight: 900; text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 6px -1px rgba(0,143,88,0.3);">
              <span>Book <?php echo $city; ?> Doctor Evaluation</span>
              <span>&rarr;</span>
            </a>
            <a href="#pricing" class="mmj-btn-secondary" style="background: #f1f5f9; color: #1e293b; padding: 14px 24px; border-radius: 12px; font-size: 13px; font-weight: 800; text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; border: 1px solid #e2e8f0;">
              <span>Renew Existing Card</span>
            </a>
          </div>

          <!-- Trust Badges Under Buttons -->
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px; font-size: 12px; color: #475569; font-weight: 700;">
            <span style="display: inline-flex; align-items: center; gap: 4px; color: #15803d;">&#10003; 100% HIPAA Compliant</span>
            <span>&middot;</span>
            <span style="display: inline-flex; align-items: center; gap: 4px; color: #15803d;">&#10003; 15-Min Video / Phone Call</span>
            <span>&middot;</span>
            <span style="display: inline-flex; align-items: center; gap: 4px; color: #15803d;">&#10003; 100% Money-Back Guarantee</span>
          </div>
        </div>

        <!-- Right Column: Practice Care Card (Matches Design.png) -->
        <div>
          <div class="mmj-practice-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08); padding: 28px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 48px; height: 48px; border-radius: 14px; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                  &#x2695;
                </div>
                <div>
                  <h3 style="font-size: 16px; font-weight: 900; color: #0f172a; margin: 0;">Direct Telehealth Care</h3>
                  <div style="font-size: 12px; color: #64748b;"><?php echo $state; ?> Licensed Physicians</div>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">Consultation Fee</div>
                <div style="font-size: 24px; font-weight: 900; color: #16a34a;"><?php echo $price; ?></div>
              </div>
            </div>

            <!-- Bullet Points -->
            <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px; color: #475569; margin-bottom: 20px;">
              <div style="display: flex; align-items: flex-start; gap: 10px;">
                <span style="color: #16a34a; font-weight: 900;">&#10003;</span>
                <div><strong style="color: #0f172a;">100% Online Telemedicine:</strong> No physical office visit required. Meet with our physician from home anywhere in <?php echo $city; ?> via phone or laptop.</div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 10px;">
                <span style="color: #16a34a; font-weight: 900;">&#10003;</span>
                <div><strong style="color: #0f172a;">Board-Certified Doctors:</strong> Consult directly with our experienced medical doctors registered with the state medical board.</div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 10px;">
                <span style="color: #16a34a; font-weight: 900;">&#10003;</span>
                <div><strong style="color: #0f172a;">Patient Care Line:</strong> <a href="tel:8884206789" style="color: #16a34a; font-weight: 800; text-decoration: underline;"><?php echo $phone; ?></a> (Toll-Free Patient Support)</div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 10px;">
                <span style="color: #16a34a; font-weight: 900;">&#10003;</span>
                <div><strong style="color: #0f172a;">Telehealth Hours:</strong> Mon &ndash; Sun: 8:00 AM &ndash; 10:00 PM</div>
              </div>
            </div>

            <!-- Tax Alert Card -->
            <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 14px; padding: 14px; margin-bottom: 20px; font-size: 12px; color: #92400e; line-height: 1.5;">
              <strong style="color: #78350f; display: block; margin-bottom: 4px;">&dollar; Estimated Annual Savings in <?php echo $city; ?>:</strong>
              Our patients save an estimated <strong>$1,250+ per year</strong> in state and municipal taxes compared to adult-use recreational retail.
            </div>

            <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="display: block; width: 100%; text-align: center; background: #008f58; color: #fff; padding: 14px; border-radius: 12px; font-size: 13px; font-weight: 900; text-transform: uppercase; text-decoration: none; box-sizing: border-box;">
              Start Online 420 Evaluation &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>

    <!-- TRUST STATS BAR -->
    <section class="mmj-stats-proof-bar" style="background: #0f172a; color: #ffffff; padding: 32px 16px; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; text-align: center;">
        <div>
          <div style="font-size: 30px; font-weight: 900; color: #34d399;">250,000+</div>
          <div style="font-size: 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-top: 4px;">Approved Patients</div>
        </div>
        <div>
          <div style="font-size: 30px; font-weight: 900; color: #34d399;">99.4%</div>
          <div style="font-size: 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-top: 4px;">Doctor Approval Rate</div>
        </div>
        <div>
          <div style="font-size: 30px; font-weight: 900; color: #34d399;">15 Minutes</div>
          <div style="font-size: 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-top: 4px;">Average Consultation</div>
        </div>
        <div>
          <div style="font-size: 30px; font-weight: 900; color: #34d399;">100% Free</div>
          <div style="font-size: 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-top: 4px;">If Not Approved Guarantee</div>
        </div>
      </div>
    </section>

    <!-- IN-DEPTH CLINICAL & LEGAL OVERVIEW -->
    <section style="padding: 64px 16px; background: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 10px;">Why Patients in <?php echo $city; ?> Choose a Medical Marijuana Card</h2>
          <p style="font-size: 15px; color: #64748b; margin: 0;">While adult-use retail stores exist in certain regions, obtaining an official medical cannabis recommendation from our physicians provides significant financial, legal, and clinical therapeutic protections.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div class="mmj-feature-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
            <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin: 0 0 8px;">1. Substantial Dispensary Tax Exemptions in <?php echo $city; ?></h3>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">Recreational buyers face cumulative retail taxes: <strong><?php echo $rec_tax; ?></strong>. With medical status, you receive: <strong><?php echo $med_tax; ?></strong>. Save hundreds each year.</p>
          </div>
          <div class="mmj-feature-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
            <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin: 0 0 8px;">2. Higher Potency Formulations & Clinical Strengths</h3>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">Recreational dispensaries cap THC potency. Certified medical patients can purchase high-potency clinical formulations, concentrated RSO, and high-dose therapeutic tinctures.</p>
          </div>
          <div class="mmj-feature-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
            <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin: 0 0 8px;">3. Age 18+ Access and Legal Caregiver Recognition</h3>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">Adults aged 18 to 20 can be legally certified by our doctors to purchase and consume medical cannabis. Designated caregiver cards can also be issued for family assistance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FINANCIAL TAX SAVINGS CALCULATOR -->
    <section style="padding: 64px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #16a34a; letter-spacing: 0.5px; margin-bottom: 6px;">Financial Savings Calculator</div>
        <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px;">Calculate Your Tax Savings in <?php echo $city; ?></h2>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 32px;">See how much you save with our physician recommendation compared to adult-use recreational retail taxes.</p>

        <div class="mmj-tax-calc-box" data-rec-rate="0.30" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 13px; font-weight: 700; color: #475569;">Estimated Monthly Dispensary Spend:</span>
            <span class="mmj-calc-monthly-spend" style="font-size: 22px; font-weight: 900; color: #16a34a;">$200 / month</span>
          </div>
          <input type="range" class="mmj-tax-slider" min="50" max="800" step="25" value="200" style="width: 100%; accent-color: #16a34a; margin-bottom: 24px; cursor: pointer;">

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; padding-top: 16px; border-top: 1px solid #f1f5f9; text-align: center;">
            <div style="background: #f8fafc; border-radius: 12px; padding: 14px;">
              <div style="font-size: 11px; color: #64748b;">Yearly Retail Spend</div>
              <div style="font-size: 18px; font-weight: 800; color: #0f172a;">$2,400</div>
            </div>
            <div style="background: #fff1f2; border-radius: 12px; padding: 14px;">
              <div style="font-size: 11px; color: #e11d48;">Recreational Tax Incurred</div>
              <div class="mmj-calc-rec-tax" style="font-size: 18px; font-weight: 800; color: #be123c;">$720</div>
            </div>
            <div style="background: #ecfdf5; border-radius: 12px; padding: 14px;">
              <div style="font-size: 11px; color: #065f46; font-weight: 800;">Your Net Savings</div>
              <div class="mmj-calc-savings" style="font-size: 22px; font-weight: 900; color: #16a34a;">$600</div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="background: #008f58; color: #fff; padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 800; text-decoration: none; display: inline-flex;">
              Save Money at Dispensaries &mdash; Get Certified &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- DISPENSARY ACCEPTANCE DIRECTORY -->
    <section style="padding: 64px 16px; background: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 10px;">Accepted at Licensed Dispensaries in & around <?php echo $city; ?></h2>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 32px;">Our physician-signed medical certificates are 100% legal and recognized by state-licensed dispensaries and delivery services across:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px;">
          <?php foreach ($areas as $area) : ?>
            <div class="mmj-dispensary-tag" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 12px;">
              <div style="font-size: 18px; margin-bottom: 4px;">&#x1F4CD;</div>
              <div style="font-size: 13px; font-weight: 800; color: #0f172a;"><?php echo esc_html($area); ?></div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Same-Day Delivery & Pickup</div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- 3-STEP TELEHEALTH PROCESS -->
    <section style="padding: 64px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px;">Our Simple 3-Step Telehealth Process in <?php echo $city; ?></h2>
          <p style="font-size: 14px; color: #64748b; margin: 0;">Get certified from your living room in three quick steps.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <div class="mmj-step-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #008f58; color: #fff; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 14px; margin-bottom: 14px;">1</div>
            <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin: 0 0 8px;">5-Min Online Intake</h3>
            <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0;">Complete your basic medical intake and state identification on our secure, HIPAA-compliant patient portal.</p>
          </div>
          <div class="mmj-step-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #008f58; color: #fff; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 14px; margin-bottom: 14px;">2</div>
            <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin: 0 0 8px;">15-Min Telehealth Call</h3>
            <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0;">Meet directly with our board-certified physician over an encrypted video or phone consultation to discuss your health needs.</p>
          </div>
          <div class="mmj-step-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #008f58; color: #fff; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 14px; margin-bottom: 14px;">3</div>
            <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin: 0 0 8px;">Instant Digital Delivery</h3>
            <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0;">Upon physician approval, your official signed medical marijuana recommendation is emailed immediately for instant dispensary use.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PROVIDER ASSURANCE GRID -->
    <section style="padding: 64px 16px; background: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1100px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #16a34a; letter-spacing: 0.5px; margin-bottom: 6px;">Dedicated Care Provider</div>
          <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px;">Why Patients Trust Online MMJ Card in <?php echo $city; ?></h2>
          <p style="font-size: 14px; color: #64748b; margin: 0;">We are a dedicated medical cannabis telemedicine clinic with our own board-certified physicians, providing direct evaluations, continuous patient support, and guaranteed legal certifications.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
            <div style="font-size: 24px; margin-bottom: 8px;">&#x2695;</div>
            <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">In-House Certified Doctors</h4>
            <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin: 0;">Consult directly with our licensed physicians. We never outsource your care to third-party providers.</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
            <div style="font-size: 24px; margin-bottom: 8px;">&#x1F6E1;</div>
            <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">HIPAA-Compliant Privacy</h4>
            <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin: 0;">Your medical history and video sessions are strictly protected under federal medical confidentiality laws.</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
            <div style="font-size: 24px; margin-bottom: 8px;">&#x2705;</div>
            <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">100% State Legality</h4>
            <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin: 0;">Every certificate contains an official state physician registry ID, ensuring seamless verification at dispensaries.</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
            <div style="font-size: 24px; margin-bottom: 8px;">&#x1F4B5;</div>
            <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">Zero-Risk Refund Policy</h4>
            <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin: 0;">If our physician determines you do not qualify for a medical recommendation, you are immediately refunded 100%.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TRANSPARENT SERVICES & PRICING PLANS -->
    <section id="pricing" style="padding: 64px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1100px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px;">Telemedicine Services & Pricing Plans in <?php echo $city; ?></h2>
          <p style="font-size: 14px; color: #64748b; margin: 0;">Flat-rate, transparent medical cannabis pricing with zero hidden clinic fees.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 20px;">
          <!-- Card 1 -->
          <div class="mmj-pricing-card" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; text-align: center;">
            <div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase;">New Patient</div>
            <div style="font-size: 32px; font-weight: 900; color: #0f172a; margin: 8px 0;"><?php echo $price; ?></div>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Full 1-year doctor recommendation, digital verification, and instant dispensary access.</p>
            <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="display: block; width: 100%; text-decoration: none; padding: 10px; font-size: 12px; box-sizing: border-box;">Book Evaluation &rarr;</a>
          </div>

          <!-- Card 2 -->
          <div class="mmj-pricing-card featured" style="background: #ffffff; border: 2px solid #16a34a; border-radius: 16px; padding: 24px; text-align: center; position: relative;">
            <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #16a34a; color: #fff; font-size: 10px; font-weight: 800; padding: 2px 10px; border-radius: 9999px; text-transform: uppercase;">Most Popular</div>
            <div style="font-size: 12px; font-weight: 800; color: #16a34a; text-transform: uppercase;">Card Renewal</div>
            <div style="font-size: 32px; font-weight: 900; color: #0f172a; margin: 8px 0;"><?php echo $price; ?></div>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Fast renewal from any previous physician or clinic. Maintain unbroken dispensary access.</p>
            <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="display: block; width: 100%; text-decoration: none; padding: 10px; font-size: 12px; box-sizing: border-box;">Renew Online &rarr;</a>
          </div>

          <!-- Card 3 -->
          <div class="mmj-pricing-card" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; text-align: center;">
            <div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase;">99-Plant Cultivation</div>
            <div style="font-size: 32px; font-weight: 900; color: #0f172a; margin: 8px 0;">$149.00</div>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Grow up to 99 plants legally with certified medical grower recommendation.</p>
            <a href="#get-card" class="mmj-btn-secondary mmj-open-evaluation-btn" data-open-modal="evaluation" style="display: block; width: 100%; text-decoration: none; padding: 10px; font-size: 12px; box-sizing: border-box;">Apply Now &rarr;</a>
          </div>

          <!-- Card 4 -->
          <div class="mmj-pricing-card" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; text-align: center;">
            <div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase;">ESA Pet Letter</div>
            <div style="font-size: 32px; font-weight: 900; color: #0f172a; margin: 8px 0;">$129.00</div>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Fair Housing Act compliant Emotional Support Animal housing letter.</p>
            <a href="#get-card" class="mmj-btn-secondary mmj-open-evaluation-btn" data-open-modal="evaluation" style="display: block; width: 100%; text-decoration: none; padding: 10px; font-size: 12px; box-sizing: border-box;">Apply Now &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <!-- QUALIFYING MEDICAL CONDITIONS -->
    <section style="padding: 64px 16px; background: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1000px; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px;">Qualifying Conditions for Medical Cannabis in <?php echo $state; ?></h2>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 28px;">Our licensed physicians evaluate patients for a wide range of state-qualifying medical conditions, including:</p>

        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
          <span class="mmj-condition-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">&#9679; Chronic Back & Neck Pain</span>
          <span class="mmj-condition-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">&#9679; Severe Anxiety & Panic</span>
          <span class="mmj-condition-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">&#9679; Insomnia & Sleep Disorders</span>
          <span class="mmj-condition-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">&#9679; PTSD & Trauma Recovery</span>
          <span class="mmj-condition-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">&#9679; Cancer & Chemotherapy Support</span>
          <span class="mmj-condition-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">&#9679; Migraines & Headaches</span>
          <span class="mmj-condition-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">&#9679; Arthritis & Joint Stiffness</span>
          <span class="mmj-condition-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">&#9679; Glaucoma & Ocular Pressure</span>
        </div>
      </div>
    </section>

    <!-- CLINICAL FAQS ACCORDION -->
    <section style="padding: 64px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 850px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 36px;">
          <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px;"><?php echo $city; ?> Medical Marijuana FAQs</h2>
          <p style="font-size: 14px; color: #64748b; margin: 0;">Frequently asked questions answered by our licensed <?php echo $state; ?> medical team.</p>
        </div>

        <div class="mmj-faq-container">
          <div class="mmj-faq-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 12px; overflow: hidden;">
            <button type="button" class="mmj-faq-question" style="width: 100%; text-align: left; padding: 18px 20px; font-size: 15px; font-weight: 800; color: #0f172a; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
              <span>How do I get my medical marijuana card online in <?php echo $city; ?>?</span>
              <span class="mmj-faq-arrow" style="font-size: 14px; color: #64748b;">&#9660;</span>
            </button>
            <div class="mmj-faq-answer" style="padding: 0 20px 18px; font-size: 13px; color: #475569; line-height: 1.6;">
              Getting certified online in <?php echo $city; ?> takes just three quick steps: fill out our secure intake questionnaire, consult with our licensed cannabis doctor over a confidential 10-15 minute video call, and receive your official digital medical marijuana recommendation immediately upon approval.
            </div>
          </div>

          <div class="mmj-faq-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 12px; overflow: hidden;">
            <button type="button" class="mmj-faq-question" style="width: 100%; text-align: left; padding: 18px 20px; font-size: 15px; font-weight: 800; color: #0f172a; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
              <span>Can I use my recommendation at <?php echo $city; ?> dispensaries immediately?</span>
              <span class="mmj-faq-arrow" style="font-size: 14px; color: #64748b;">&#9660;</span>
            </button>
            <div class="mmj-faq-answer" style="padding: 0 20px 18px; font-size: 13px; color: #475569; line-height: 1.6;">
              Yes! Your digital doctor recommendation contains an official state physician registry number and QR verification code that licensed storefront dispensaries and courier delivery services across <?php echo $city; ?> accept immediately.
            </div>
          </div>

          <div class="mmj-faq-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 12px; overflow: hidden;">
            <button type="button" class="mmj-faq-question" style="width: 100%; text-align: left; padding: 18px 20px; font-size: 15px; font-weight: 800; color: #0f172a; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
              <span>How much do I save on cannabis taxes in <?php echo $city; ?>?</span>
              <span class="mmj-faq-arrow" style="font-size: 14px; color: #64748b;">&#9660;</span>
            </button>
            <div class="mmj-faq-answer" style="padding: 0 20px 18px; font-size: 13px; color: #475569; line-height: 1.6;">
              Medical marijuana patients save significantly on retail cannabis transactions. While recreational adult-use cannabis carries cumulative sales, excise, and local business taxes totaling up to 34.5%, certified medical patients are exempt from retail sales tax and receive medicinal compassionate pricing.
            </div>
          </div>

          <div class="mmj-faq-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 12px; overflow: hidden;">
            <button type="button" class="mmj-faq-question" style="width: 100%; text-align: left; padding: 18px 20px; font-size: 15px; font-weight: 800; color: #0f172a; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
              <span>What happens if I am not approved by the physician?</span>
              <span class="mmj-faq-arrow" style="font-size: 14px; color: #64748b;">&#9660;</span>
            </button>
            <div class="mmj-faq-answer" style="padding: 0 20px 18px; font-size: 13px; color: #475569; line-height: 1.6;">
              We offer a strict 100% Money-Back Guarantee. In the rare event that our physician determines that you do not qualify for a medical cannabis recommendation under <?php echo $state; ?> law, your consultation fee is refunded immediately in full.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PATIENT REVIEWS -->
    <section style="padding: 64px 16px; background: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1000px; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px;">Real Patient Reviews from <?php echo $city; ?></h2>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 36px;">Over 250,000 patients have received their legal medical recommendation through our telehealth platform.</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; text-align: left;">
          <div class="mmj-review-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
            <div style="color: #f59e0b; margin-bottom: 8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p style="font-size: 13px; color: #334155; line-height: 1.6; margin: 0 0 12px;">"Easiest doctor appointment I have ever had. The video call lasted maybe 10 minutes, the doctor listened to my chronic back pain symptoms, and my PDF recommendation arrived in my inbox before I even hung up."</p>
            <div style="font-size: 12px; font-weight: 800; color: #0f172a;">Marcus T. &middot; <span style="font-weight: 600; color: #16a34a;">Verified <?php echo $city; ?> Patient</span></div>
          </div>
          <div class="mmj-review-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
            <div style="color: #f59e0b; margin-bottom: 8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p style="font-size: 13px; color: #334155; line-height: 1.6; margin: 0 0 12px;">"Renewed my card during my lunch break. Saved over $40 on taxes at my local dispensary the very same afternoon. Truly worth every penny."</p>
            <div style="font-size: 12px; font-weight: 800; color: #0f172a;">Elena R. &middot; <span style="font-weight: 600; color: #16a34a;">Verified <?php echo $city; ?> Patient</span></div>
          </div>
          <div class="mmj-review-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
            <div style="color: #f59e0b; margin-bottom: 8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p style="font-size: 13px; color: #334155; line-height: 1.6; margin: 0 0 12px;">"As someone with severe anxiety, going to physical medical offices was stressful. Being able to do this securely from my living room was such a relief."</p>
            <div style="font-size: 12px; font-weight: 800; color: #0f172a;">David K. &middot; <span style="font-weight: 600; color: #16a34a;">Verified <?php echo $city; ?> Patient</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CALL TO ACTION BANNER -->
    <section style="padding: 64px 16px; background: #ffffff; font-family: 'Open Sans', system-ui, sans-serif;">
      <div class="mmj-cta-banner" style="max-width: 1000px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border-radius: 24px; padding: 48px 24px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);">
        <h2 style="font-size: 32px; font-weight: 900; margin: 0 0 12px; color: #ffffff;">Ready to Get Your Legal MMJ Card in <?php echo $city; ?>?</h2>
        <p style="font-size: 15px; color: #cbd5e1; max-width: 600px; margin: 0 auto 28px; line-height: 1.6;">Get certified online in 15 minutes with our licensed cannabis physicians. 99% approval guarantee or 100% refund.</p>
        <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="background: #008f58; color: #ffffff; padding: 16px 36px; border-radius: 14px; font-size: 14px; font-weight: 900; text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
          <span>Book Your <?php echo $city; ?> Evaluation Now &rarr;</span>
        </a>
      </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Generate Full, Rich HTML for State Landing Pages
 */
function online_mmj_generate_state_html($st) {
    $state      = esc_html($st['name']);
    $code       = esc_html($st['code']);
    $price      = esc_html('$' . number_format($st['price'], 2));
    $renewal    = esc_html('$' . number_format($st['renewalPrice'], 2));
    $validity   = esc_html($st['validity']);
    $possession = esc_html($st['possessionLimit']);
    $cult       = esc_html(!empty($st['cultivation']) ? $st['cultivation'] : 'Consult with licensed doctor');
    $summary    = esc_html($st['summary']);

    ob_start();
    ?>
    <section class="mmj-hero-section" style="padding: 40px 16px 56px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 60%, #ffffff 100%); border-bottom: 1px solid #f1f5f9; font-family: 'Open Sans', system-ui, sans-serif;">
      <div style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: center;">
        <div>
          <div class="mmj-badge-emerald" style="display: inline-flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 16px;">
            <span>&#9679; Official State Legal Guide &middot; <?php echo $state; ?> (<?php echo $code; ?>)</span>
          </div>

          <h1 style="font-size: 38px; line-height: 1.15; font-weight: 900; color: #0f172a; margin: 0 0 16px;">
            <?php echo $state; ?> Medical Marijuana Card <span style="color: #16a34a;">Online Telehealth</span>
          </h1>

          <p style="font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 24px;">
            <?php echo $summary; ?>
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 24px;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px;">
              <div style="font-size: 11px; color: #64748b; font-weight: 700;">New Patient Fee</div>
              <div style="font-size: 16px; font-weight: 900; color: #0f172a;"><?php echo $price; ?></div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px;">
              <div style="font-size: 11px; color: #64748b; font-weight: 700;">Card Validity</div>
              <div style="font-size: 16px; font-weight: 900; color: #16a34a;"><?php echo $validity; ?></div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px;">
              <div style="font-size: 11px; color: #64748b; font-weight: 700;">Renewal Fee</div>
              <div style="font-size: 16px; font-weight: 900; color: #d97706;"><?php echo $renewal; ?></div>
            </div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="background: #008f58; color: #fff; padding: 14px 28px; border-radius: 12px; font-size: 13px; font-weight: 900; text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              <span>Book <?php echo $code; ?> Evaluation Now &rarr;</span>
            </a>
          </div>
        </div>

        <div>
          <div class="mmj-practice-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08); padding: 28px;">
            <h3 style="font-size: 18px; font-weight: 900; color: #0f172a; margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
              <?php echo $state; ?> State Cannabis Statutes
            </h3>
            <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px; color: #475569;">
              <div>
                <strong style="color: #0f172a; display: block;">Legal Possession Limit:</strong>
                <span><?php echo $possession; ?></span>
              </div>
              <div>
                <strong style="color: #0f172a; display: block;">Cultivation Guidelines:</strong>
                <span><?php echo $cult; ?></span>
              </div>
              <div>
                <strong style="color: #0f172a; display: block;">Evaluation Method:</strong>
                <span>100% Online Encrypted Video Telehealth Consultation</span>
              </div>
            </div>
            <div style="margin-top: 24px;">
              <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="display: block; width: 100%; text-align: center; box-sizing: border-box; text-decoration: none;">
                Get Certified in <?php echo $state; ?> &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Generate Full, Rich HTML for Telehealth Services
 */
function online_mmj_generate_service_html($slug, $s) {
    $title = esc_html($s['title']);
    $price = esc_html($s['price']);
    $desc  = esc_html($s['desc']);
    $time  = esc_html(!empty($s['time']) ? $s['time'] : '10-15 Minutes');

    ob_start();
    ?>
    <section class="mmj-hero-section" style="padding: 48px 16px 64px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif; text-align: center;">
      <div style="max-width: 800px; margin: 0 auto;">
        <div class="mmj-badge-emerald" style="display: inline-flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 16px;">
          <span>Official Telehealth Service Package</span>
        </div>
        <h1 style="font-size: 38px; font-weight: 900; color: #0f172a; margin: 0 0 16px;"><?php echo $title; ?></h1>
        <p style="font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 24px;"><?php echo $desc; ?></p>
        
        <div style="display: inline-flex; gap: 20px; align-items: center; justify-content: center; background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px 32px; border-radius: 16px; margin-bottom: 28px;">
          <div>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700;">Price</div>
            <div style="font-size: 28px; font-weight: 900; color: #16a34a;"><?php echo $price; ?></div>
          </div>
          <div style="width: 1px; height: 36px; background: #cbd5e1;"></div>
          <div>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700;">Turnaround</div>
            <div style="font-size: 20px; font-weight: 800; color: #0f172a;"><?php echo $time; ?></div>
          </div>
        </div>

        <div>
          <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="background: #008f58; color: #fff; padding: 16px 36px; border-radius: 12px; font-size: 14px; font-weight: 900; text-transform: uppercase; text-decoration: none; display: inline-flex;">
            Start Online Consultation Now &rarr;
          </a>
        </div>
      </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Generate Full HTML for Qualifying Condition Guide Pages
 */
function online_mmj_generate_condition_html($slug, $cd) {
    $title    = esc_html($cd['title']);
    $desc     = esc_html($cd['desc']);
    $category = esc_html(!empty($cd['category']) ? $cd['category'] : 'Medical Marijuana Evaluation');

    ob_start();
    ?>
    <section class="mmj-hero-section" style="padding: 48px 16px 64px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); border-bottom: 1px solid #e2e8f0; font-family: 'Open Sans', system-ui, sans-serif; text-align: center;">
      <div style="max-width: 800px; margin: 0 auto;">
        <div class="mmj-badge-emerald" style="display: inline-flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 16px;">
          <span>Category: <?php echo $category; ?></span>
        </div>
        <h1 style="font-size: 38px; font-weight: 900; color: #0f172a; margin: 0 0 16px;"><?php echo $title; ?></h1>
        <p style="font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 24px;"><?php echo $desc; ?></p>
        
        <div>
          <a href="#get-card" class="mmj-btn-primary mmj-open-evaluation-btn" data-open-modal="evaluation" style="background: #008f58; color: #fff; padding: 16px 36px; border-radius: 12px; font-size: 14px; font-weight: 900; text-transform: uppercase; text-decoration: none; display: inline-flex;">
            Schedule Physician Evaluation for <?php echo $title; ?> &rarr;
          </a>
        </div>
      </div>
    </section>
    <?php
    return ob_get_clean();
}

// Fallback HTML helpers for templates
function online_mmj_get_city_fallback_html($post_id) {
    $slug = get_post_field('post_name', $post_id);
    $clean = preg_replace('/^medical-marijuana-card-/', '', $slug);
    $cities = online_mmj_get_cities();
    if (isset($cities['medical-marijuana-card-' . $clean])) {
        return online_mmj_generate_city_html($cities['medical-marijuana-card-' . $clean]);
    }
    if (isset($cities[$clean])) {
        return online_mmj_generate_city_html($cities[$clean]);
    }
    return '';
}

function online_mmj_get_state_fallback_html($post_id) {
    $slug = get_post_field('post_name', $post_id);
    $clean = preg_replace('/^medical-marijuana-card-/', '', $slug);
    $states = online_mmj_get_states();
    if (isset($states['medical-marijuana-card-' . $clean])) {
        return online_mmj_generate_state_html($states['medical-marijuana-card-' . $clean]);
    }
    if (isset($states[$clean])) {
        return online_mmj_generate_state_html($states[$clean]);
    }
    return '';
}

function online_mmj_get_service_fallback_html($post_id) {
    $slug = get_post_field('post_name', $post_id);
    $services = online_mmj_get_default_services();
    if (isset($services[$slug])) {
        return online_mmj_generate_service_html($slug, $services[$slug]);
    }
    return '';
}

function online_mmj_get_condition_fallback_html($post_id) {
    $slug = get_post_field('post_name', $post_id);
    $conditions = online_mmj_get_default_conditions();
    if (isset($conditions[$slug])) {
        return online_mmj_generate_condition_html($slug, $conditions[$slug]);
    }
    return '';
}

function online_mmj_sync_all_core_pages($force = false) {
    $created_pages = array();
    $existing_pages = array();

    // 1. Core General Pages
    $core_pages = array(
        'contact-us' => array(
            'title'            => 'Contact Us & Telehealth Support Desk',
            'slug'             => 'contact-us',
            'template'         => 'template-contact.php',
            'seo_title'        => 'Contact Us | Online MMJ Card Telehealth Support',
            'meta_description' => 'Get in touch with our board-certified medical cannabis doctors and HIPAA-compliant patient support team.',
            'content'          => '<!-- wp:paragraph --><p>Our dedicated medical marijuana telehealth clinic and patient support desk are available 7 days a week. Complete the contact form below or call our support line at (888) 420-6789.</p><!-- /wp:paragraph -->[online_mmj_booking button_text="Contact Physician Support Desk" service="new-patient"]',
        ),
        'book-evaluation' => array(
            'title'            => 'Book Online MMJ Doctor Evaluation',
            'slug'             => 'book-evaluation',
            'template'         => 'template-builder.php',
            'seo_title'        => 'Schedule 420 Evaluation Online | Same-Day MMJ Rec',
            'meta_description' => 'Fast 15-minute video appointment with licensed medical marijuana doctors. Same-day digital cannabis recommendation upon approval.',
            'content'          => '<!-- wp:paragraph --><p>Select your state and schedule your 100% online video consultation with a licensed cannabis doctor.</p><!-- /wp:paragraph -->[online_mmj_booking button_text="Launch Telehealth Video Room" service="new-patient"]',
        ),
        'patient-portal' => array(
            'title'            => 'Patient Records & Recommendation Portal',
            'slug'             => 'patient-portal',
            'template'         => 'template-builder.php',
            'seo_title'        => 'Patient Portal Login & Recommendation Verification',
            'meta_description' => 'Access your digital medical marijuana recommendation, renewal dates, and dispensary verification letters 24/7.',
            'content'          => '<!-- wp:paragraph --><p>Secure HIPAA-compliant patient records system. Download your signed recommendation letter and digital card.</p><!-- /wp:paragraph -->[online_mmj_booking button_text="Access Patient Records" service="renewal"]',
        ),
        'qualifying-conditions' => array(
            'title'            => 'Qualifying Medical Conditions for Medical Marijuana',
            'slug'             => 'qualifying-conditions',
            'template'         => 'template-builder.php',
            'seo_title'        => 'Qualifying Conditions for Medical Cannabis | MMJ Doctors',
            'meta_description' => 'Comprehensive directory of state-approved qualifying medical conditions including chronic pain, PTSD, anxiety, insomnia, cancer, and arthritis.',
            'content'          => '<!-- wp:paragraph --><p>Review qualifying medical conditions recognized by state health departments. Our licensed doctors evaluate patients for pain, anxiety, sleep, and neurological conditions.</p><!-- /wp:paragraph -->[online_mmj_booking button_text="See If You Qualify" service="new-patient"]',
        ),
        'medical-marijuana-insights' => array(
            'title'            => 'Medical Marijuana Insights & Clinical Guides',
            'slug'             => 'medical-marijuana-insights',
            'template'         => 'template-builder.php',
            'seo_title'        => 'Medical Marijuana Insights, Research & Laws | MMJ Blog',
            'meta_description' => 'Clinical articles, state cannabis legislation updates, dosing guides, and terpene science written by medical marijuana physicians.',
            'content'          => '<!-- wp:paragraph --><p>Authoritative cannabis medicine articles, legal analyses, and patient education guides curated by licensed telehealth doctors.</p><!-- /wp:paragraph -->',
        ),
        'medical-marijuana-reciprocity' => array(
            'title'            => 'State Medical Marijuana Reciprocity & Travel Laws',
            'slug'             => 'medical-marijuana-reciprocity',
            'template'         => 'template-builder.php',
            'seo_title'        => 'Medical Marijuana Reciprocity Guide by State | Travel Rules',
            'meta_description' => 'Check which states accept out-of-state medical marijuana cards. Interactive reciprocity checker and legal cannabis travel guidelines.',
            'content'          => '<!-- wp:paragraph --><p>Use our interactive reciprocity checker to see which states honor your medical cannabis recommendation when traveling across state lines.</p><!-- /wp:paragraph -->[online_mmj_booking button_text="Check State Reciprocity" service="new-patient"]',
        ),
        'doctor-directory' => array(
            'title'            => 'Directory of Licensed Medical Marijuana Doctors',
            'slug'             => 'doctor-directory',
            'template'         => 'template-builder.php',
            'seo_title'        => 'Licensed Medical Marijuana Doctors & Telehealth Physicians',
            'meta_description' => 'Meet our team of board-certified, state-licensed medical marijuana telehealth physicians specializing in integrative cannabis therapeutics.',
            'content'          => '<!-- wp:paragraph --><p>All physicians on our telehealth platform are board-certified and active license holders in good standing with state medical boards.</p><!-- /wp:paragraph -->[online_mmj_booking button_text="Meet Our Clinical Team" service="new-patient"]',
        ),
    );

    foreach ($core_pages as $slug => $p) {
        $existing_id = online_mmj_get_page_by_slug($slug);
        if ($existing_id && !$force) {
            $existing_pages[] = $p['title'] . ' (/' . $slug . '/)';
        } else {
            $page_data = array(
                'post_title'   => sanitize_text_field($p['title']),
                'post_name'    => sanitize_title($slug),
                'post_content' => wp_kses_post($p['content']),
                'post_status'  => 'publish',
                'post_type'    => 'page',
            );
            if ($existing_id && $force) {
                $page_data['ID'] = $existing_id;
                wp_update_post($page_data);
                $pid = $existing_id;
            } else {
                $pid = wp_insert_post($page_data);
            }
            if ($pid && !is_wp_error($pid)) {
                update_post_meta($pid, '_wp_page_template', $p['template']);
                update_post_meta($pid, '_yoast_wpseo_title', $p['seo_title']);
                update_post_meta($pid, '_seo_title', $p['seo_title']);
                update_post_meta($pid, '_yoast_wpseo_metadesc', $p['meta_description']);
                update_post_meta($pid, '_meta_description', $p['meta_description']);
                $created_pages[] = $p['title'] . ' (/' . $slug . '/)';
            }
        }
    }

    // 2. Telehealth Services Pages (Full Rich Content)
    $services = online_mmj_get_default_services();
    foreach ($services as $slug => $s) {
        $existing_id = online_mmj_get_page_by_slug($slug);
        if ($existing_id && !$force) {
            $existing_pages[] = $s['title'] . ' (/' . $slug . '/)';
        } else {
            $content = online_mmj_generate_service_html($slug, $s);
            $page_data = array(
                'post_title'   => sanitize_text_field($s['title']),
                'post_name'    => sanitize_title($slug),
                'post_content' => $content,
                'post_status'  => 'publish',
                'post_type'    => 'page',
            );
            if ($existing_id && $force) {
                $page_data['ID'] = $existing_id;
                wp_update_post($page_data);
                $pid = $existing_id;
            } else {
                $pid = wp_insert_post($page_data);
            }
            if ($pid && !is_wp_error($pid)) {
                update_post_meta($pid, '_wp_page_template', 'template-service.php');
                update_post_meta($pid, '_yoast_wpseo_title', $s['title'] . ' | Fast 15-Min Telehealth');
                update_post_meta($pid, '_seo_title', $s['title'] . ' | Fast 15-Min Telehealth');
                update_post_meta($pid, '_yoast_wpseo_metadesc', $s['desc']);
                update_post_meta($pid, '_meta_description', $s['desc']);
                $created_pages[] = $s['title'] . ' (/' . $slug . '/)';
            }
        }
    }

    // 3. State Telehealth Law & Pricing Pages (Keyword Slugs: medical-marijuana-card-{state})
    $states = online_mmj_get_states();
    $processed_states = array();
    foreach ($states as $raw_slug => $st) {
        $clean_slug = preg_replace('/^medical-marijuana-card-/', '', $raw_slug);
        $canonical_slug = 'medical-marijuana-card-' . $clean_slug;
        if (in_array($canonical_slug, $processed_states, true)) continue;
        $processed_states[] = $canonical_slug;

        // Check if old short slug (e.g. 'california') exists and clean up duplicate
        $short_id = online_mmj_get_page_by_slug($clean_slug);
        $target_id = online_mmj_get_page_by_slug($canonical_slug);

        if ($short_id && $target_id && $short_id !== $target_id) {
            wp_delete_post($short_id, true);
        } elseif ($short_id && !$target_id) {
            wp_update_post(array('ID' => $short_id, 'post_name' => $canonical_slug));
            $target_id = $short_id;
        }

        $title = sprintf('%s Medical Marijuana Card Online & Doctor Evaluations', $st['name']);
        $content = online_mmj_generate_state_html($st);

        $page_data = array(
            'post_title'   => sanitize_text_field($title),
            'post_name'    => sanitize_title($canonical_slug),
            'post_content' => $content,
            'post_status'  => 'publish',
            'post_type'    => 'page',
        );
        if ($target_id && $force) {
            $page_data['ID'] = $target_id;
            wp_update_post($page_data);
            $pid = $target_id;
        } elseif ($target_id && !$force) {
            $existing_pages[] = $st['name'] . ' MMJ Telehealth (/' . $canonical_slug . '/)';
            $pid = $target_id;
        } else {
            $pid = wp_insert_post($page_data);
        }

        if ($pid && !is_wp_error($pid)) {
            update_post_meta($pid, '_wp_page_template', 'template-state.php');
            update_post_meta($pid, '_mmj_state_name', $st['name']);
            update_post_meta($pid, '_mmj_state_code', $st['code']);
            update_post_meta($pid, '_mmj_consult_price', '$' . number_format($st['price'], 2));
            update_post_meta($pid, '_yoast_wpseo_title', $st['name'] . ' Medical Marijuana Card Online | Fast ' . $st['code'] . ' Evaluations');
            update_post_meta($pid, '_seo_title', $st['name'] . ' Medical Marijuana Card Online | Fast ' . $st['code'] . ' Evaluations');
            update_post_meta($pid, '_yoast_wpseo_metadesc', $st['summary']);
            update_post_meta($pid, '_meta_description', $st['summary']);
            if (!$target_id || $force) {
                $created_pages[] = $st['name'] . ' MMJ Telehealth (/' . $canonical_slug . '/)';
            }
        }
    }

    // 4. Local City Landing Pages (Keyword Slugs: medical-marijuana-card-{city}, Full Rich Layout)
    $cities = online_mmj_get_cities();
    $processed_cities = array();
    foreach ($cities as $raw_slug => $ct) {
        $clean_slug = preg_replace('/^medical-marijuana-card-/', '', $raw_slug);
        $clean_slug = preg_replace('/-(ca|fl|ny|pa|oh)$/i', '', $clean_slug);
        $canonical_slug = 'medical-marijuana-card-' . $clean_slug;
        if (in_array($canonical_slug, $processed_cities, true)) continue;
        $processed_cities[] = $canonical_slug;

        // Check if old short slug (e.g. 'fresno') exists and clean up duplicate
        $short_id = online_mmj_get_page_by_slug($clean_slug);
        $target_id = online_mmj_get_page_by_slug($canonical_slug);

        if ($short_id && $target_id && $short_id !== $target_id) {
            wp_delete_post($short_id, true);
        } elseif ($short_id && !$target_id) {
            wp_update_post(array('ID' => $short_id, 'post_name' => $canonical_slug));
            $target_id = $short_id;
        }

        $title = sprintf('%s Medical Marijuana Card Online | %s 420 Doctor', $ct['cityName'], $ct['stateCode']);
        $content = online_mmj_generate_city_html($ct);

        $page_data = array(
            'post_title'   => sanitize_text_field($title),
            'post_name'    => sanitize_title($canonical_slug),
            'post_content' => $content,
            'post_status'  => 'publish',
            'post_type'    => 'page',
        );
        if ($target_id && $force) {
            $page_data['ID'] = $target_id;
            wp_update_post($page_data);
            $pid = $target_id;
        } elseif ($target_id && !$force) {
            $existing_pages[] = $ct['cityName'] . ', ' . $ct['stateCode'] . ' (/' . $canonical_slug . '/)';
            $pid = $target_id;
        } else {
            $pid = wp_insert_post($page_data);
        }

        if ($pid && !is_wp_error($pid)) {
            update_post_meta($pid, '_wp_page_template', 'template-location.php');
            update_post_meta($pid, '_mmj_city_name', $ct['cityName']);
            update_post_meta($pid, '_mmj_state_name', $ct['stateName']);
            update_post_meta($pid, '_mmj_state_code', $ct['stateCode']);
            update_post_meta($pid, '_mmj_consult_price', $ct['price']);
            update_post_meta($pid, '_mmj_local_phone', $ct['localPhone']);
            update_post_meta($pid, '_yoast_wpseo_title', $title);
            update_post_meta($pid, '_seo_title', $title);
            update_post_meta($pid, '_yoast_wpseo_metadesc', $ct['subheading']);
            update_post_meta($pid, '_meta_description', $ct['subheading']);
            if (!$target_id || $force) {
                $created_pages[] = $ct['cityName'] . ', ' . $ct['stateCode'] . ' (/' . $canonical_slug . '/)';
            }
        }
    }

    // 5. Qualifying Condition Landing Pages (Keyword Slugs: medical-marijuana-for-{condition})
    $conditions = online_mmj_get_default_conditions();
    foreach ($conditions as $slug => $cd) {
        $existing_id = online_mmj_get_page_by_slug($slug);
        if ($existing_id && !$force) {
            $existing_pages[] = $cd['title'] . ' (/' . $slug . '/)';
        } else {
            $content = online_mmj_generate_condition_html($slug, $cd);
            $page_data = array(
                'post_title'   => sanitize_text_field($cd['title']),
                'post_name'    => sanitize_title($slug),
                'post_content' => $content,
                'post_status'  => 'publish',
                'post_type'    => 'page',
            );
            if ($existing_id && $force) {
                $page_data['ID'] = $existing_id;
                wp_update_post($page_data);
                $pid = $existing_id;
            } else {
                $pid = wp_insert_post($page_data);
            }
            if ($pid && !is_wp_error($pid)) {
                update_post_meta($pid, '_wp_page_template', 'template-condition.php');
                update_post_meta($pid, '_mmj_condition_category', $cd['category']);
                update_post_meta($pid, '_yoast_wpseo_title', $cd['title'] . ' | Medical Marijuana Doctors');
                update_post_meta($pid, '_seo_title', $cd['title'] . ' | Medical Marijuana Doctors');
                update_post_meta($pid, '_yoast_wpseo_metadesc', $cd['desc']);
                update_post_meta($pid, '_meta_description', $cd['desc']);
                $created_pages[] = $cd['title'] . ' (/' . $slug . '/)';
            }
        }
    }

    // 6. Blog Posts (All 6 Clinical Cannabis Research Articles)
    $posts = online_mmj_get_default_posts();
    foreach ($posts as $slug => $post_item) {
        $existing_post_id = online_mmj_get_post_by_slug($slug);
        if ($existing_post_id && !$force) {
            $existing_pages[] = 'Article: ' . $post_item['title'] . ' (/' . $slug . '/)';
        } else {
            $post_data = array(
                'post_title'   => sanitize_text_field($post_item['title']),
                'post_name'    => sanitize_title($slug),
                'post_content' => wp_kses_post($post_item['content']),
                'post_excerpt' => sanitize_textarea_field($post_item['excerpt']),
                'post_status'  => 'publish',
                'post_type'    => 'post',
            );
            if ($existing_post_id && $force) {
                $post_data['ID'] = $existing_post_id;
                wp_update_post($post_data);
                $pid = $existing_post_id;
            } else {
                $pid = wp_insert_post($post_data);
            }
            if ($pid && !is_wp_error($pid)) {
                if (!empty($post_item['category'])) {
                    wp_set_object_terms($pid, $post_item['category'], 'category');
                }
                update_post_meta($pid, '_yoast_wpseo_title', $post_item['title']);
                update_post_meta($pid, '_seo_title', $post_item['title']);
                update_post_meta($pid, '_yoast_wpseo_metadesc', $post_item['excerpt']);
                update_post_meta($pid, '_meta_description', $post_item['excerpt']);
                $created_pages[] = 'Article: ' . $post_item['title'] . ' (/' . $slug . '/)';
            }
        }
    }

    update_option('online_mmj_core_pages_synced_v5_full_design', 'yes');
    update_option('online_mmj_last_sync_timestamp', current_time('mysql'));

    return array(
        'created'  => $created_pages,
        'existing' => $existing_pages,
    );
}

// Automatically sync on admin_init if not previously run
add_action('admin_init', 'online_mmj_auto_sync_on_init');
function online_mmj_auto_sync_on_init() {
    if (get_option('online_mmj_core_pages_synced_v5_full_design') !== 'yes') {
        online_mmj_sync_all_core_pages(false);
    }
}

/**
 * 8. Render 1-Click Sync to WordPress Pages Screen
 *
 * Automatically creates real, fully editable WordPress pages in `wp-admin > Pages`
 * for every city, state, service, and condition!
 */
function online_mmj_render_sync_pages_screen() {
    if (!current_user_can('manage_options')) {
        wp_die(__('Unauthorized', 'online-mmj-card'));
    }

    $created_pages = array();
    $existing_pages = array();

    // Handle 1-Click Page Creation Action
    if (isset($_POST['online_mmj_sync_pages_nonce']) && wp_verify_nonce($_POST['online_mmj_sync_pages_nonce'], 'online_mmj_sync_pages_action')) {
        $sync_results = online_mmj_sync_all_core_pages(true);
        $created_pages = $sync_results['created'];
        $existing_pages = $sync_results['existing'];
    }

    ?>
    <div class="wrap mmj-admin-wrap" style="max-width: 900px;">
        <h1>
            <span class="dashicons dashicons-admin-page" style="font-size:28px; width:28px; height:28px; vertical-align:middle; margin-right:6px; color:#008f58;"></span>
            <?php esc_html_e('1-Click Sync to WordPress Pages', 'online-mmj-card'); ?>
        </h1>
        <p class="description">
            <?php esc_html_e('Automatically creates and connects real WordPress Pages in your "Pages" menu for all service, state, and local city landing pages.', 'online-mmj-card'); ?>
        </p>

        <?php if (!empty($created_pages)) : ?>
            <div class="notice notice-success is-dismissible" style="padding:12px;">
                <p><strong>&check; <?php printf(esc_html__('Successfully published %d new WordPress pages! You can now view and edit them in WordPress Admin > Pages or with Elementor:', 'online-mmj-card'), count($created_pages)); ?></strong></p>
                <ul style="margin:8px 0 0 16px; list-style:disc;">
                    <?php foreach ($created_pages as $cp) : ?>
                        <li><?php echo esc_html($cp); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <?php if (!empty($existing_pages) && !empty($created_pages)) : ?>
            <div class="notice notice-info is-dismissible">
                <p><?php printf(esc_html__('%d page(s) were already published in your WordPress Pages list.', 'online-mmj-card'), count($existing_pages)); ?></p>
            </div>
        <?php endif; ?>

        <div class="postbox" style="margin-top:20px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,.08); padding:20px;">
            <h2 style="font-size:18px; font-weight:800; color:#0f172a; margin-top:0;">
                <?php esc_html_e('Publish All Inner & Local City Pages as Native WordPress Pages', 'online-mmj-card'); ?>
            </h2>
            <p style="font-size:14px; color:#475569; line-height:1.6;">
                <?php esc_html_e('Clicking the button below creates official WordPress Page entries for:', 'online-mmj-card'); ?>
            </p>
            <ul style="margin:10px 0 20px 20px; list-style:disc; color:#334155; font-size:13px; line-height:1.7;">
                <li><strong><?php esc_html_e('Local City Pages:', 'online-mmj-card'); ?></strong> /los-angeles/, /san-diego/, /san-francisco/, /miami/, /new-york-city/</li>
                <li><strong><?php esc_html_e('State Telehealth Pages:', 'online-mmj-card'); ?></strong> /california/, /new-york/, /florida/, /pennsylvania/, /ohio/</li>
                <li><strong><?php esc_html_e('Service Pages:', 'online-mmj-card'); ?></strong> /new-patient-medical-marijuana-card/, /medical-marijuana-card-renewal/, /99-plant-cultivation-recommendation/, /emotional-support-animal-letter/</li>
                <li><strong><?php esc_html_e('Clinical & Portal Pages:', 'online-mmj-card'); ?></strong> /book-evaluation/, /qualifying-conditions/, /medical-marijuana-insights/</li>
            </ul>

            <form method="post" action="">
                <?php wp_nonce_field('online_mmj_sync_pages_action', 'online_mmj_sync_pages_nonce'); ?>
                <button type="submit" class="button button-primary button-large" style="background:#008f58; border-color:#007a4a; font-weight:800; font-size:15px; padding:8px 28px;">
                    <span class="dashicons dashicons-yes-alt" style="vertical-align:text-top; margin-right:6px;"></span>
                    <?php esc_html_e('Publish / Sync All Pages to WordPress Now', 'online-mmj-card'); ?>
                </button>
            </form>
        </div>

        <div style="margin-top:24px; padding:16px; background:#f0fdf4; border-radius:8px; border:1px solid #bbf7d0;">
            <h3 style="margin:0 0 6px; font-size:14px; font-weight:700; color:#166534;">
                <?php esc_html_e('&starf; Editable with Gutenberg, Elementor, or Divi Pro', 'online-mmj-card'); ?>
            </h3>
            <p style="margin:0; font-size:13px; color:#15803d; line-height:1.5;">
                <?php esc_html_e('Once created, you can navigate to "Pages > All Pages" in your WordPress admin bar at any time to edit text, swap photos, add sections, or edit with Elementor.', 'online-mmj-card'); ?>
            </p>
        </div>
    </div>
    <?php
}

/**
 * =========================================================================
 * 9. Core Public Functions: Add, Edit, Delete Pages & Posts
 * =========================================================================
 */

/**
 * Add or create a WordPress Page programmatically
 */
function online_mmj_add_page($args = array()) {
    $defaults = array(
        'title'    => 'New Telehealth Page',
        'slug'     => '',
        'content'  => '',
        'template' => 'template-builder.php',
        'status'   => 'publish',
    );
    $params = wp_parse_args($args, $defaults);

    $page_data = array(
        'post_title'   => sanitize_text_field($params['title']),
        'post_name'    => !empty($params['slug']) ? sanitize_title($params['slug']) : sanitize_title($params['title']),
        'post_content' => wp_kses_post($params['content']),
        'post_status'  => in_array($params['status'], array('publish', 'draft', 'pending')) ? $params['status'] : 'publish',
        'post_type'    => 'page',
    );

    $page_id = wp_insert_post($page_data);
    if (!is_wp_error($page_id) && $page_id > 0) {
        if (!empty($params['template'])) {
            update_post_meta($page_id, '_wp_page_template', sanitize_text_field($params['template']));
        }
        if (isset($params['seo_title'])) {
            update_post_meta($page_id, '_yoast_wpseo_title', sanitize_text_field($params['seo_title']));
            update_post_meta($page_id, '_seo_title', sanitize_text_field($params['seo_title']));
        }
        if (isset($params['meta_description'])) {
            update_post_meta($page_id, '_yoast_wpseo_metadesc', sanitize_textarea_field($params['meta_description']));
            update_post_meta($page_id, '_meta_description', sanitize_textarea_field($params['meta_description']));
        }
        if (isset($params['canonical_url'])) {
            update_post_meta($page_id, '_yoast_wpseo_canonical', esc_url_raw($params['canonical_url']));
            update_post_meta($page_id, '_canonical_url', esc_url_raw($params['canonical_url']));
        }
        if (isset($params['show_in_nav'])) {
            update_post_meta($page_id, '_show_in_nav', $params['show_in_nav'] ? '1' : '0');
        }
        if (isset($params['nav_order'])) {
            update_post_meta($page_id, '_nav_order', intval($params['nav_order']));
        }
    }
    return $page_id;
}

/**
 * Edit or update an existing WordPress Page programmatically
 */
function online_mmj_edit_page($page_id, $args = array()) {
    $page_id = intval($page_id);
    if (!$page_id || get_post_type($page_id) !== 'page') {
        return new WP_Error('invalid_page', 'Invalid page ID provided');
    }

    $update_data = array('ID' => $page_id);
    if (isset($args['title'])) {
        $update_data['post_title'] = sanitize_text_field($args['title']);
    }
    if (isset($args['slug']) && !empty($args['slug'])) {
        $update_data['post_name'] = sanitize_title($args['slug']);
    }
    if (isset($args['content'])) {
        $update_data['post_content'] = wp_kses_post($args['content']);
    }
    if (isset($args['status'])) {
        $update_data['post_status'] = in_array($args['status'], array('publish', 'draft', 'pending')) ? $args['status'] : 'publish';
    }

    $res = wp_update_post($update_data);
    if (!is_wp_error($res)) {
        if (isset($args['template']) && !empty($args['template'])) {
            update_post_meta($page_id, '_wp_page_template', sanitize_text_field($args['template']));
        }
        if (isset($args['seo_title'])) {
            update_post_meta($page_id, '_yoast_wpseo_title', sanitize_text_field($args['seo_title']));
            update_post_meta($page_id, '_seo_title', sanitize_text_field($args['seo_title']));
        }
        if (isset($args['meta_description'])) {
            update_post_meta($page_id, '_yoast_wpseo_metadesc', sanitize_textarea_field($args['meta_description']));
            update_post_meta($page_id, '_meta_description', sanitize_textarea_field($args['meta_description']));
        }
        if (isset($args['canonical_url'])) {
            update_post_meta($page_id, '_yoast_wpseo_canonical', esc_url_raw($args['canonical_url']));
            update_post_meta($page_id, '_canonical_url', esc_url_raw($args['canonical_url']));
        }
        if (isset($args['show_in_nav'])) {
            update_post_meta($page_id, '_show_in_nav', $args['show_in_nav'] ? '1' : '0');
        }
        if (isset($args['nav_order'])) {
            update_post_meta($page_id, '_nav_order', intval($args['nav_order']));
        }
    }
    return $res;
}

/**
 * Delete a WordPress Page programmatically
 */
function online_mmj_delete_page($page_id, $force = false) {
    $page_id = intval($page_id);
    if (!$page_id) return false;
    return $force ? wp_delete_post($page_id, true) : wp_trash_post($page_id);
}

/**
 * Add or create a WordPress Blog Post programmatically
 */
function online_mmj_add_post($args = array()) {
    $defaults = array(
        'title'    => 'New Medical Cannabis Article',
        'slug'     => '',
        'content'  => '',
        'excerpt'  => '',
        'category' => 'Medical Insights',
        'status'   => 'publish',
    );
    $params = wp_parse_args($args, $defaults);

    $post_data = array(
        'post_title'   => sanitize_text_field($params['title']),
        'post_name'    => !empty($params['slug']) ? sanitize_title($params['slug']) : sanitize_title($params['title']),
        'post_content' => wp_kses_post($params['content']),
        'post_excerpt' => sanitize_textarea_field($params['excerpt']),
        'post_status'  => in_array($params['status'], array('publish', 'draft', 'pending')) ? $params['status'] : 'publish',
        'post_type'    => 'post',
    );

    $post_id = wp_insert_post($post_data);
    if (!is_wp_error($post_id) && $post_id > 0) {
        if (!empty($params['category'])) {
            $cat_term = term_exists($params['category'], 'category');
            if (!$cat_term) {
                $cat_term = wp_insert_term($params['category'], 'category');
            }
            if (!is_wp_error($cat_term) && isset($cat_term['term_id'])) {
                wp_set_post_categories($post_id, array($cat_term['term_id']));
            }
        }
    }
    return $post_id;
}

/**
 * Edit or update an existing WordPress Blog Post programmatically
 */
function online_mmj_edit_post($post_id, $args = array()) {
    $post_id = intval($post_id);
    if (!$post_id || get_post_type($post_id) !== 'post') {
        return new WP_Error('invalid_post', 'Invalid post ID provided');
    }

    $update_data = array('ID' => $post_id);
    if (isset($args['title'])) {
        $update_data['post_title'] = sanitize_text_field($args['title']);
    }
    if (isset($args['slug']) && !empty($args['slug'])) {
        $update_data['post_name'] = sanitize_title($args['slug']);
    }
    if (isset($args['content'])) {
        $update_data['post_content'] = wp_kses_post($args['content']);
    }
    if (isset($args['excerpt'])) {
        $update_data['post_excerpt'] = sanitize_textarea_field($args['excerpt']);
    }
    if (isset($args['status'])) {
        $update_data['post_status'] = in_array($args['status'], array('publish', 'draft', 'pending')) ? $args['status'] : 'publish';
    }

    $res = wp_update_post($update_data);
    if (!is_wp_error($res) && isset($args['category']) && !empty($args['category'])) {
        $cat_term = term_exists($args['category'], 'category');
        if (!$cat_term) {
            $cat_term = wp_insert_term($args['category'], 'category');
        }
        if (!is_wp_error($cat_term) && isset($cat_term['term_id'])) {
            wp_set_post_categories($post_id, array($cat_term['term_id']));
        }
    }
    return $res;
}

/**
 * Delete a WordPress Post programmatically
 */
function online_mmj_delete_post($post_id, $force = false) {
    $post_id = intval($post_id);
    if (!$post_id) return false;
    return $force ? wp_delete_post($post_id, true) : wp_trash_post($post_id);
}

/**
 * =========================================================================
 * 10. REST API Endpoints for Pages & Posts
 * =========================================================================
 */
add_action('rest_api_init', 'online_mmj_register_pages_posts_rest_endpoints');
function online_mmj_register_pages_posts_rest_endpoints() {
    // 1. Pages (GET & POST Create)
    register_rest_route('online-mmj/v1', '/pages', array(
        array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => 'online_mmj_rest_get_pages',
            'permission_callback' => '__return_true',
        ),
        array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => 'online_mmj_rest_create_page',
            'permission_callback' => 'online_mmj_rest_permissions_check',
        ),
    ));

    // 2. Page Edit & Delete
    register_rest_route('online-mmj/v1', '/pages/edit', array(
        'methods'             => WP_REST_Server::CREATABLE,
        'callback'            => 'online_mmj_rest_edit_page',
        'permission_callback' => 'online_mmj_rest_permissions_check',
    ));
    register_rest_route('online-mmj/v1', '/pages/delete', array(
        'methods'             => WP_REST_Server::CREATABLE,
        'callback'            => 'online_mmj_rest_delete_page',
        'permission_callback' => 'online_mmj_rest_permissions_check',
    ));

    // 3. Posts (GET & POST Create)
    register_rest_route('online-mmj/v1', '/posts', array(
        array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => 'online_mmj_rest_get_posts',
            'permission_callback' => '__return_true',
        ),
        array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => 'online_mmj_rest_create_post',
            'permission_callback' => 'online_mmj_rest_permissions_check',
        ),
    ));

    // 4. Post Edit & Delete
    register_rest_route('online-mmj/v1', '/posts/edit', array(
        'methods'             => WP_REST_Server::CREATABLE,
        'callback'            => 'online_mmj_rest_edit_post',
        'permission_callback' => 'online_mmj_rest_permissions_check',
    ));
    register_rest_route('online-mmj/v1', '/posts/delete', array(
        'methods'             => WP_REST_Server::CREATABLE,
        'callback'            => 'online_mmj_rest_delete_post',
        'permission_callback' => 'online_mmj_rest_permissions_check',
    ));
}

function online_mmj_rest_get_pages($request) {
    $pages = get_posts(array(
        'post_type'      => 'page',
        'posts_per_page' => 100,
        'post_status'    => array('publish', 'draft'),
        'orderby'        => 'date',
        'order'          => 'DESC',
    ));

    $data = array();
    foreach ($pages as $p) {
        $data[] = array(
            'id'       => $p->ID,
            'title'    => $p->post_title,
            'slug'     => $p->post_name,
            'url'      => get_permalink($p->ID),
            'status'   => $p->post_status,
            'template' => get_post_meta($p->ID, '_wp_page_template', true),
            'date'     => get_the_date('Y-m-d H:i:s', $p->ID),
        );
    }
    return rest_ensure_response(array('success' => true, 'count' => count($data), 'pages' => $data));
}

function online_mmj_rest_create_page($request) {
    $params = $request->get_json_params();
    if (!is_array($params)) $params = $request->get_body_params();

    $page_id = online_mmj_add_page($params);
    if (is_wp_error($page_id) || !$page_id) {
        return new WP_Error('page_creation_failed', 'Could not create page', array('status' => 500));
    }
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Page created successfully',
        'page_id' => $page_id,
        'url'     => get_permalink($page_id)
    ));
}

function online_mmj_rest_edit_page($request) {
    $params = $request->get_json_params();
    if (!is_array($params)) $params = $request->get_body_params();
    $page_id = isset($params['id']) ? intval($params['id']) : 0;

    $res = online_mmj_edit_page($page_id, $params);
    if (is_wp_error($res)) {
        return $res;
    }
    return rest_ensure_response(array('success' => true, 'message' => 'Page updated successfully', 'page_id' => $page_id));
}

function online_mmj_rest_delete_page($request) {
    $params = $request->get_json_params();
    if (!is_array($params)) $params = $request->get_body_params();
    $page_id = isset($params['id']) ? intval($params['id']) : 0;

    $res = online_mmj_delete_page($page_id, false);
    return rest_ensure_response(array('success' => (bool)$res, 'message' => 'Page deleted', 'page_id' => $page_id));
}

function online_mmj_rest_get_posts($request) {
    $posts = get_posts(array(
        'post_type'      => 'post',
        'posts_per_page' => 100,
        'post_status'    => array('publish', 'draft'),
        'orderby'        => 'date',
        'order'          => 'DESC',
    ));

    $data = array();
    foreach ($posts as $p) {
        $cats = wp_get_post_categories($p->ID, array('fields' => 'names'));
        $data[] = array(
            'id'       => $p->ID,
            'title'    => $p->post_title,
            'slug'     => $p->post_name,
            'url'      => get_permalink($p->ID),
            'status'   => $p->post_status,
            'category' => !empty($cats) ? implode(', ', $cats) : 'Uncategorized',
            'excerpt'  => $p->post_excerpt,
            'date'     => get_the_date('Y-m-d H:i:s', $p->ID),
        );
    }
    return rest_ensure_response(array('success' => true, 'count' => count($data), 'posts' => $data));
}

function online_mmj_rest_create_post($request) {
    $params = $request->get_json_params();
    if (!is_array($params)) $params = $request->get_body_params();

    $post_id = online_mmj_add_post($params);
    if (is_wp_error($post_id) || !$post_id) {
        return new WP_Error('post_creation_failed', 'Could not create post', array('status' => 500));
    }
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Post created successfully',
        'post_id' => $post_id,
        'url'     => get_permalink($post_id)
    ));
}

function online_mmj_rest_edit_post($request) {
    $params = $request->get_json_params();
    if (!is_array($params)) $params = $request->get_body_params();
    $post_id = isset($params['id']) ? intval($params['id']) : 0;

    $res = online_mmj_edit_post($post_id, $params);
    if (is_wp_error($res)) {
        return $res;
    }
    return rest_ensure_response(array('success' => true, 'message' => 'Post updated successfully', 'post_id' => $post_id));
}

function online_mmj_rest_delete_post($request) {
    $params = $request->get_json_params();
    if (!is_array($params)) $params = $request->get_body_params();
    $post_id = isset($params['id']) ? intval($params['id']) : 0;

    $res = online_mmj_delete_post($post_id, false);
    return rest_ensure_response(array('success' => (bool)$res, 'message' => 'Post deleted', 'post_id' => $post_id));
}

/**
 * =========================================================================
 * 11. Render Pages & Posts Content Manager Screen in WordPress Admin
 * =========================================================================
 */
function online_mmj_render_pages_posts_manager_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('Unauthorized access', 'online-mmj-card'));
    }

    $active_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'pages';
    $message = '';
    $message_type = 'success';

    // Handle Add New Page
    if (isset($_POST['online_mmj_add_page_nonce']) && wp_verify_nonce($_POST['online_mmj_add_page_nonce'], 'online_mmj_add_page_action')) {
        $pid = online_mmj_add_page(array(
            'title'    => sanitize_text_field($_POST['page_title']),
            'slug'     => sanitize_title($_POST['page_slug']),
            'template' => sanitize_text_field($_POST['page_template']),
            'status'   => sanitize_text_field($_POST['page_status']),
            'content'  => wp_kses_post($_POST['page_content']),
        ));
        if ($pid && !is_wp_error($pid)) {
            $message = sprintf(__('Page "%s" successfully created & published!', 'online-mmj-card'), esc_html($_POST['page_title']));
        } else {
            $message = __('Failed to create page. Please check input.', 'online-mmj-card');
            $message_type = 'error';
        }
    }

    // Handle Edit Page
    if (isset($_POST['online_mmj_edit_page_nonce']) && wp_verify_nonce($_POST['online_mmj_edit_page_nonce'], 'online_mmj_edit_page_action')) {
        $pid = intval($_POST['edit_page_id']);
        $res = online_mmj_edit_page($pid, array(
            'title'    => sanitize_text_field($_POST['edit_page_title']),
            'slug'     => sanitize_title($_POST['edit_page_slug']),
            'template' => sanitize_text_field($_POST['edit_page_template']),
            'status'   => sanitize_text_field($_POST['edit_page_status']),
            'content'  => wp_kses_post($_POST['edit_page_content']),
        ));
        if ($res && !is_wp_error($res)) {
            $message = sprintf(__('Page ID #%d updated successfully!', 'online-mmj-card'), $pid);
        } else {
            $message = __('Failed to update page.', 'online-mmj-card');
            $message_type = 'error';
        }
    }

    // Handle Delete Page
    if (isset($_GET['action']) && $_GET['action'] === 'delete_page' && isset($_GET['page_id']) && check_admin_referer('delete_page_' . $_GET['page_id'])) {
        online_mmj_delete_page(intval($_GET['page_id']));
        $message = __('Page moved to trash.', 'online-mmj-card');
    }

    // Handle Add New Post
    if (isset($_POST['online_mmj_add_post_nonce']) && wp_verify_nonce($_POST['online_mmj_add_post_nonce'], 'online_mmj_add_post_action')) {
        $pid = online_mmj_add_post(array(
            'title'    => sanitize_text_field($_POST['post_title']),
            'slug'     => sanitize_title($_POST['post_slug']),
            'category' => sanitize_text_field($_POST['post_category']),
            'excerpt'  => sanitize_textarea_field($_POST['post_excerpt']),
            'status'   => sanitize_text_field($_POST['post_status']),
            'content'  => wp_kses_post($_POST['post_content']),
        ));
        if ($pid && !is_wp_error($pid)) {
            $message = sprintf(__('Post "%s" successfully published!', 'online-mmj-card'), esc_html($_POST['post_title']));
        } else {
            $message = __('Failed to create post.', 'online-mmj-card');
            $message_type = 'error';
        }
    }

    // Handle Edit Post
    if (isset($_POST['online_mmj_edit_post_nonce']) && wp_verify_nonce($_POST['online_mmj_edit_post_nonce'], 'online_mmj_edit_post_action')) {
        $pid = intval($_POST['edit_post_id']);
        $res = online_mmj_edit_post($pid, array(
            'title'    => sanitize_text_field($_POST['edit_post_title']),
            'slug'     => sanitize_title($_POST['edit_post_slug']),
            'category' => sanitize_text_field($_POST['edit_post_category']),
            'excerpt'  => sanitize_textarea_field($_POST['edit_post_excerpt']),
            'status'   => sanitize_text_field($_POST['edit_post_status']),
            'content'  => wp_kses_post($_POST['edit_post_content']),
        ));
        if ($res && !is_wp_error($res)) {
            $message = sprintf(__('Post ID #%d updated successfully!', 'online-mmj-card'), $pid);
        } else {
            $message = __('Failed to update post.', 'online-mmj-card');
            $message_type = 'error';
        }
    }

    // Handle Delete Post
    if (isset($_GET['action']) && $_GET['action'] === 'delete_post' && isset($_GET['post_id']) && check_admin_referer('delete_post_' . $_GET['post_id'])) {
        online_mmj_delete_post(intval($_GET['post_id']));
        $message = __('Post moved to trash.', 'online-mmj-card');
    }

    // Fetch existing pages and posts
    $all_pages = get_posts(array(
        'post_type'      => 'page',
        'posts_per_page' => 50,
        'post_status'    => array('publish', 'draft'),
        'orderby'        => 'date',
        'order'          => 'DESC',
    ));

    $all_posts = get_posts(array(
        'post_type'      => 'post',
        'posts_per_page' => 50,
        'post_status'    => array('publish', 'draft'),
        'orderby'        => 'date',
        'order'          => 'DESC',
    ));

    $available_templates = array(
        'template-builder.php'             => 'Interactive Telehealth Builder (Default)',
        'template-elementor-canvas.php'    => 'Elementor Canvas (Header & Footer Off)',
        'template-elementor-fullwidth.php' => 'Elementor Fullwidth (Header & Footer On)',
        'template-fullwidth.php'           => 'Fullwidth Container',
        'template-location.php'            => 'City / Location Landing Page',
        'template-state.php'               => 'State Law & Pricing Page',
        'template-service.php'             => 'Telehealth Service Page',
        'template-condition.php'           => 'Qualifying Condition Guide',
        'template-contact.php'             => 'Contact Us & Patient Support Desk',
        'default'                          => 'Standard WordPress Page Template',
    );

    ?>
    <div class="wrap mmj-admin-wrap" style="max-width: 1100px;">
        <h1 style="display:flex; align-items:center; gap:8px;">
            <span class="dashicons dashicons-admin-page" style="font-size:30px; width:30px; height:30px; color:#008f58;"></span>
            <span><?php esc_html_e('Pages & Posts Content Manager', 'online-mmj-card'); ?></span>
            <span style="font-size:12px; background:#008f58; color:#fff; padding:3px 8px; border-radius:4px; font-weight:700;">Active Admin Feature</span>
        </h1>
        <p class="description">
            <?php esc_html_e('Add, edit, or customize any WordPress Page or Blog Post directly from this central management dashboard.', 'online-mmj-card'); ?>
        </p>

        <?php if (!empty($message)) : ?>
            <div class="notice notice-<?php echo esc_attr($message_type); ?> is-dismissible">
                <p><strong><?php echo esc_html($message); ?></strong></p>
            </div>
        <?php endif; ?>

        <!-- Tab Navigation -->
        <h2 class="nav-tab-wrapper" style="margin:20px 0 16px;">
            <a href="?page=online-mmj-pages-posts&tab=pages" class="nav-tab <?php echo $active_tab === 'pages' ? 'nav-tab-active' : ''; ?>">
                <span class="dashicons dashicons-admin-page" style="vertical-align:text-top; margin-right:4px;"></span>
                <?php esc_html_e('Manage Pages (Add & Edit)', 'online-mmj-card'); ?> (<?php echo count($all_pages); ?>)
            </a>
            <a href="?page=online-mmj-pages-posts&tab=posts" class="nav-tab <?php echo $active_tab === 'posts' ? 'nav-tab-active' : ''; ?>">
                <span class="dashicons dashicons-admin-post" style="vertical-align:text-top; margin-right:4px;"></span>
                <?php esc_html_e('Manage Posts (Add & Edit)', 'online-mmj-card'); ?> (<?php echo count($all_posts); ?>)
            </a>
            <a href="?page=online-mmj-pages-posts&tab=blueprints" class="nav-tab <?php echo $active_tab === 'blueprints' ? 'nav-tab-active' : ''; ?>">
                <span class="dashicons dashicons-layout" style="vertical-align:text-top; margin-right:4px;"></span>
                <?php esc_html_e('1-Click MMJ Blueprints', 'online-mmj-card'); ?>
            </a>
        </h2>

        <!-- ============================================================= -->
        <!-- TAB 1: PAGES MANAGER                                          -->
        <!-- ============================================================= -->
        <?php if ($active_tab === 'pages') : ?>
            <div style="display:grid; grid-template-columns: 1fr; gap:24px;">
                
                <!-- Add New Page Box -->
                <div class="postbox" style="border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08); border:1px solid #cbd5e1;">
                    <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                        <h2 class="hndle" style="font-size:16px; font-weight:800; color:#0f172a; margin:0;">
                            <span class="dashicons dashicons-plus-alt" style="color:#008f58; margin-right:4px;"></span>
                            <?php esc_html_e('Add New WordPress Page', 'online-mmj-card'); ?>
                        </h2>
                    </div>
                    <div class="inside" style="padding:18px;">
                        <form method="post" action="">
                            <?php wp_nonce_field('online_mmj_add_page_action', 'online_mmj_add_page_nonce'); ?>
                            
                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:14px;">
                                <div>
                                    <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Page Title *', 'online-mmj-card'); ?></label>
                                    <input type="text" name="page_title" required placeholder="e.g. Los Angeles 420 Doctor Clinic" style="width:100%;" />
                                </div>
                                <div>
                                    <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('URL Slug (Optional)', 'online-mmj-card'); ?></label>
                                    <input type="text" name="page_slug" placeholder="e.g. los-angeles-420-doctor" style="width:100%;" />
                                </div>
                            </div>

                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:14px;">
                                <div>
                                    <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Page Template', 'online-mmj-card'); ?></label>
                                    <select name="page_template" style="width:100%;">
                                        <?php foreach ($available_templates as $tpl_file => $tpl_name) : ?>
                                            <option value="<?php echo esc_attr($tpl_file); ?>"><?php echo esc_html($tpl_name); ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div>
                                    <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Status', 'online-mmj-card'); ?></label>
                                    <select name="page_status" style="width:100%;">
                                        <option value="publish"><?php esc_html_e('Published (Live on Website)', 'online-mmj-card'); ?></option>
                                        <option value="draft"><?php esc_html_e('Draft (Unpublished)', 'online-mmj-card'); ?></option>
                                    </select>
                                </div>
                            </div>

                            <div style="margin-bottom:16px;">
                                <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Page Content (HTML, Shortcodes, or Text)', 'online-mmj-card'); ?></label>
                                <textarea name="page_content" rows="6" style="width:100%; font-family:monospace; font-size:12px;" placeholder="[online_mmj_app] or your custom text / Elementor content..."></textarea>
                            </div>

                            <button type="submit" class="button button-primary button-large" style="background:#008f58; border-color:#007a4a; font-weight:800; padding:6px 24px;">
                                <?php esc_html_e('+ Create & Publish Page', 'online-mmj-card'); ?>
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Existing Pages List Table with Inline Edit -->
                <div class="postbox" style="border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08); border:1px solid #cbd5e1;">
                    <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                        <h2 class="hndle" style="font-size:16px; font-weight:800; color:#0f172a; margin:0;">
                            <?php esc_html_e('Existing WordPress Pages (Click Edit to Modify)', 'online-mmj-card'); ?>
                        </h2>
                    </div>
                    <div class="inside" style="padding:0;">
                        <table class="wp-list-table widefat fixed striped table-view-list" style="border:none; margin:0;">
                            <thead>
                                <tr>
                                    <th style="width:50px;">ID</th>
                                    <th>Title</th>
                                    <th>Slug / URL</th>
                                    <th>Template</th>
                                    <th style="width:80px;">Status</th>
                                    <th style="width:200px; text-align:right;">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (!empty($all_pages)) : foreach ($all_pages as $page) : 
                                    $tpl = get_post_meta($page->ID, '_wp_page_template', true);
                                    $permalink = get_permalink($page->ID);
                                    $edit_link = get_edit_post_link($page->ID);
                                    $del_url = wp_nonce_url(admin_url('admin.php?page=online-mmj-pages-posts&tab=pages&action=delete_page&page_id=' . $page->ID), 'delete_page_' . $page->ID);
                                ?>
                                    <tr>
                                        <td><strong>#<?php echo esc_html($page->ID); ?></strong></td>
                                        <td>
                                            <strong><?php echo esc_html($page->post_title); ?></strong>
                                        </td>
                                        <td><code>/<?php echo esc_html($page->post_name); ?>/</code></td>
                                        <td><span style="font-size:11px; color:#475569;"><?php echo esc_html($tpl ? $tpl : 'default'); ?></span></td>
                                        <td>
                                            <span style="font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; background:<?php echo $page->post_status === 'publish' ? '#dcfce7' : '#f1f5f9'; ?>; color:<?php echo $page->post_status === 'publish' ? '#15803d' : '#475569'; ?>;">
                                                <?php echo esc_html(strtoupper($page->post_status)); ?>
                                            </span>
                                        </td>
                                        <td style="text-align:right;">
                                            <button type="button" class="button button-small" onclick="document.getElementById('edit-page-row-<?php echo esc_attr($page->ID); ?>').style.display = document.getElementById('edit-page-row-<?php echo esc_attr($page->ID); ?>').style.display === 'none' ? 'table-row' : 'none';">
                                                ✏️ Edit
                                            </button>
                                            <a href="<?php echo esc_url($permalink); ?>" target="_blank" class="button button-small">View</a>
                                            <a href="<?php echo esc_url($del_url); ?>" onclick="return confirm('Move this page to trash?');" class="button button-small" style="color:#b91c1c;">Trash</a>
                                        </td>
                                    </tr>

                                    <!-- Inline Edit Row (Hidden by default) -->
                                    <tr id="edit-page-row-<?php echo esc_attr($page->ID); ?>" style="display:none; background:#f0fdf4;">
                                        <td colspan="6" style="padding:16px;">
                                            <form method="post" action="">
                                                <?php wp_nonce_field('online_mmj_edit_page_action', 'online_mmj_edit_page_nonce'); ?>
                                                <input type="hidden" name="edit_page_id" value="<?php echo esc_attr($page->ID); ?>" />
                                                
                                                <h4 style="margin:0 0 10px; color:#166534; font-size:13px; font-weight:800;">
                                                    Editing Page: <?php echo esc_html($page->post_title); ?> (#<?php echo esc_html($page->ID); ?>)
                                                </h4>

                                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:10px;">
                                                    <div>
                                                        <label style="font-size:11px; font-weight:700;">Page Title:</label>
                                                        <input type="text" name="edit_page_title" value="<?php echo esc_attr($page->post_title); ?>" style="width:100%;" />
                                                    </div>
                                                    <div>
                                                        <label style="font-size:11px; font-weight:700;">Slug:</label>
                                                        <input type="text" name="edit_page_slug" value="<?php echo esc_attr($page->post_name); ?>" style="width:100%;" />
                                                    </div>
                                                </div>

                                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:10px;">
                                                    <div>
                                                        <label style="font-size:11px; font-weight:700;">Template:</label>
                                                        <select name="edit_page_template" style="width:100%;">
                                                            <?php foreach ($available_templates as $tpl_file => $tpl_name) : ?>
                                                                <option value="<?php echo esc_attr($tpl_file); ?>" <?php selected($tpl, $tpl_file); ?>><?php echo esc_html($tpl_name); ?></option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label style="font-size:11px; font-weight:700;">Status:</label>
                                                        <select name="edit_page_status" style="width:100%;">
                                                            <option value="publish" <?php selected($page->post_status, 'publish'); ?>>Published</option>
                                                            <option value="draft" <?php selected($page->post_status, 'draft'); ?>>Draft</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div style="margin-bottom:10px;">
                                                    <label style="font-size:11px; font-weight:700;">Content:</label>
                                                    <textarea name="edit_page_content" rows="4" style="width:100%; font-family:monospace; font-size:12px;"><?php echo esc_textarea($page->post_content); ?></textarea>
                                                </div>

                                                <div style="display:flex; gap:8px;">
                                                    <button type="submit" class="button button-primary" style="background:#008f58; border-color:#007a4a; font-weight:700;">
                                                        Save Page Changes
                                                    </button>
                                                    <button type="button" class="button" onclick="document.getElementById('edit-page-row-<?php echo esc_attr($page->ID); ?>').style.display='none';">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </td>
                                    </tr>

                                <?php endforeach; else: ?>
                                    <tr>
                                        <td colspan="6" style="text-align:center; padding:20px; color:#64748b;">
                                            No pages found. Use the form above to create your first page!
                                        </td>
                                    </tr>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        <?php endif; ?>

        <!-- ============================================================= -->
        <!-- TAB 2: POSTS MANAGER                                          -->
        <!-- ============================================================= -->
        <?php if ($active_tab === 'posts') : ?>
            <div style="display:grid; grid-template-columns: 1fr; gap:24px;">
                
                <!-- Add New Post Box -->
                <div class="postbox" style="border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08); border:1px solid #cbd5e1;">
                    <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                        <h2 class="hndle" style="font-size:16px; font-weight:800; color:#0f172a; margin:0;">
                            <span class="dashicons dashicons-edit" style="color:#008f58; margin-right:4px;"></span>
                            <?php esc_html_e('Add New Medical Cannabis Article / Blog Post', 'online-mmj-card'); ?>
                        </h2>
                    </div>
                    <div class="inside" style="padding:18px;">
                        <form method="post" action="">
                            <?php wp_nonce_field('online_mmj_add_post_action', 'online_mmj_add_post_nonce'); ?>
                            
                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:14px;">
                                <div>
                                    <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Post Title *', 'online-mmj-card'); ?></label>
                                    <input type="text" name="post_title" required placeholder="e.g. Medical Marijuana Card vs Adult-Use Cannabis" style="width:100%;" />
                                </div>
                                <div>
                                    <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('URL Slug (Optional)', 'online-mmj-card'); ?></label>
                                    <input type="text" name="post_slug" placeholder="e.g. mmj-card-vs-recreational" style="width:100%;" />
                                </div>
                            </div>

                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:14px;">
                                <div>
                                    <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Category', 'online-mmj-card'); ?></label>
                                    <input type="text" name="post_category" value="Medical Insights" placeholder="e.g. State Laws, Research, Dosing" style="width:100%;" />
                                </div>
                                <div>
                                    <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Status', 'online-mmj-card'); ?></label>
                                    <select name="post_status" style="width:100%;">
                                        <option value="publish"><?php esc_html_e('Published (Live on Insights Blog)', 'online-mmj-card'); ?></option>
                                        <option value="draft"><?php esc_html_e('Draft (Unpublished)', 'online-mmj-card'); ?></option>
                                    </select>
                                </div>
                            </div>

                            <div style="margin-bottom:14px;">
                                <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Article Excerpt / Summary', 'online-mmj-card'); ?></label>
                                <textarea name="post_excerpt" rows="2" style="width:100%;" placeholder="Short 1-2 sentence overview of the article..."></textarea>
                            </div>

                            <div style="margin-bottom:16px;">
                                <label style="font-weight:700; font-size:12px; display:block; margin-bottom:4px;"><?php esc_html_e('Article Full Body Content', 'online-mmj-card'); ?></label>
                                <textarea name="post_content" rows="6" style="width:100%; font-family:monospace; font-size:12px;" placeholder="Full article content, clinical insights, patient recommendations..."></textarea>
                            </div>

                            <button type="submit" class="button button-primary button-large" style="background:#008f58; border-color:#007a4a; font-weight:800; padding:6px 24px;">
                                <?php esc_html_e('+ Create & Publish Article', 'online-mmj-card'); ?>
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Existing Posts List Table with Inline Edit -->
                <div class="postbox" style="border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08); border:1px solid #cbd5e1;">
                    <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                        <h2 class="hndle" style="font-size:16px; font-weight:800; color:#0f172a; margin:0;">
                            <?php esc_html_e('Existing Blog Posts & Articles (Click Edit to Modify)', 'online-mmj-card'); ?>
                        </h2>
                    </div>
                    <div class="inside" style="padding:0;">
                        <table class="wp-list-table widefat fixed striped table-view-list" style="border:none; margin:0;">
                            <thead>
                                <tr>
                                    <th style="width:50px;">ID</th>
                                    <th>Title</th>
                                    <th>Slug</th>
                                    <th>Category</th>
                                    <th style="width:80px;">Status</th>
                                    <th style="width:200px; text-align:right;">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (!empty($all_posts)) : foreach ($all_posts as $post) : 
                                    $cats = wp_get_post_categories($post->ID, array('fields' => 'names'));
                                    $cat_str = !empty($cats) ? implode(', ', $cats) : 'Uncategorized';
                                    $permalink = get_permalink($post->ID);
                                    $del_url = wp_nonce_url(admin_url('admin.php?page=online-mmj-pages-posts&tab=posts&action=delete_post&post_id=' . $post->ID), 'delete_post_' . $post->ID);
                                ?>
                                    <tr>
                                        <td><strong>#<?php echo esc_html($post->ID); ?></strong></td>
                                        <td><strong><?php echo esc_html($post->post_title); ?></strong></td>
                                        <td><code>/<?php echo esc_html($post->post_name); ?>/</code></td>
                                        <td><span style="font-size:11px; color:#475569;"><?php echo esc_html($cat_str); ?></span></td>
                                        <td>
                                            <span style="font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; background:<?php echo $post->post_status === 'publish' ? '#dcfce7' : '#f1f5f9'; ?>; color:<?php echo $post->post_status === 'publish' ? '#15803d' : '#475569'; ?>;">
                                                <?php echo esc_html(strtoupper($post->post_status)); ?>
                                            </span>
                                        </td>
                                        <td style="text-align:right;">
                                            <button type="button" class="button button-small" onclick="document.getElementById('edit-post-row-<?php echo esc_attr($post->ID); ?>').style.display = document.getElementById('edit-post-row-<?php echo esc_attr($post->ID); ?>').style.display === 'none' ? 'table-row' : 'none';">
                                                ✏️ Edit
                                            </button>
                                            <a href="<?php echo esc_url($permalink); ?>" target="_blank" class="button button-small">View</a>
                                            <a href="<?php echo esc_url($del_url); ?>" onclick="return confirm('Move this post to trash?');" class="button button-small" style="color:#b91c1c;">Trash</a>
                                        </td>
                                    </tr>

                                    <!-- Inline Edit Row (Hidden by default) -->
                                    <tr id="edit-post-row-<?php echo esc_attr($post->ID); ?>" style="display:none; background:#f0fdf4;">
                                        <td colspan="6" style="padding:16px;">
                                            <form method="post" action="">
                                                <?php wp_nonce_field('online_mmj_edit_post_action', 'online_mmj_edit_post_nonce'); ?>
                                                <input type="hidden" name="edit_post_id" value="<?php echo esc_attr($post->ID); ?>" />
                                                
                                                <h4 style="margin:0 0 10px; color:#166534; font-size:13px; font-weight:800;">
                                                    Editing Article: <?php echo esc_html($post->post_title); ?> (#<?php echo esc_html($post->ID); ?>)
                                                </h4>

                                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:10px;">
                                                    <div>
                                                        <label style="font-size:11px; font-weight:700;">Article Title:</label>
                                                        <input type="text" name="edit_post_title" value="<?php echo esc_attr($post->post_title); ?>" style="width:100%;" />
                                                    </div>
                                                    <div>
                                                        <label style="font-size:11px; font-weight:700;">Slug:</label>
                                                        <input type="text" name="edit_post_slug" value="<?php echo esc_attr($post->post_name); ?>" style="width:100%;" />
                                                    </div>
                                                </div>

                                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:10px;">
                                                    <div>
                                                        <label style="font-size:11px; font-weight:700;">Category:</label>
                                                        <input type="text" name="edit_post_category" value="<?php echo esc_attr($cat_str); ?>" style="width:100%;" />
                                                    </div>
                                                    <div>
                                                        <label style="font-size:11px; font-weight:700;">Status:</label>
                                                        <select name="edit_post_status" style="width:100%;">
                                                            <option value="publish" <?php selected($post->post_status, 'publish'); ?>>Published</option>
                                                            <option value="draft" <?php selected($post->post_status, 'draft'); ?>>Draft</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div style="margin-bottom:10px;">
                                                    <label style="font-size:11px; font-weight:700;">Excerpt:</label>
                                                    <textarea name="edit_post_excerpt" rows="2" style="width:100%;"><?php echo esc_textarea($post->post_excerpt); ?></textarea>
                                                </div>

                                                <div style="margin-bottom:10px;">
                                                    <label style="font-size:11px; font-weight:700;">Body Content:</label>
                                                    <textarea name="edit_post_content" rows="4" style="width:100%; font-family:monospace; font-size:12px;"><?php echo esc_textarea($post->post_content); ?></textarea>
                                                </div>

                                                <div style="display:flex; gap:8px;">
                                                    <button type="submit" class="button button-primary" style="background:#008f58; border-color:#007a4a; font-weight:700;">
                                                        Save Post Changes
                                                    </button>
                                                    <button type="button" class="button" onclick="document.getElementById('edit-post-row-<?php echo esc_attr($post->ID); ?>').style.display='none';">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </td>
                                    </tr>

                                <?php endforeach; else: ?>
                                    <tr>
                                        <td colspan="6" style="text-align:center; padding:20px; color:#64748b;">
                                            No blog posts found. Use the form above to publish your first article!
                                        </td>
                                    </tr>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        <?php endif; ?>

        <!-- ============================================================= -->
        <!-- TAB 3: MMJ BLUEPRINTS                                         -->
        <!-- ============================================================= -->
        <?php if ($active_tab === 'blueprints') : ?>
            <div class="postbox" style="border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08); padding:20px;">
                <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin-top:0;">
                    <?php esc_html_e('Quick MMJ Page & Post Generator Blueprints', 'online-mmj-card'); ?>
                </h3>
                <p style="font-size:13px; color:#475569; line-height:1.6;">
                    <?php esc_html_e('Generate official high-converting templates for your medical marijuana telehealth practice with 1 click:', 'online-mmj-card'); ?>
                </p>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:16px;">
                    <div style="border:1px solid #e2e8f0; border-radius:8px; padding:16px; background:#f8fafc;">
                        <h4 style="margin:0 0 8px; color:#0f172a; font-size:14px; font-weight:700;">🏙️ California City Landing Page</h4>
                        <p style="font-size:12px; color:#64748b; margin-bottom:12px;">Creates a city telehealth consultation page with local dispensary zones and sales tax calculator.</p>
                        <a href="?page=online-mmj-sync-pages" class="button button-secondary">Open City Generator &rarr;</a>
                    </div>

                    <div style="border:1px solid #e2e8f0; border-radius:8px; padding:16px; background:#f8fafc;">
                        <h4 style="margin:0 0 8px; color:#0f172a; font-size:14px; font-weight:700;">🗺️ State Telehealth Laws Page</h4>
                        <p style="font-size:12px; color:#64748b; margin-bottom:12px;">Creates a state-level cannabis medical card evaluation and reciprocity guide.</p>
                        <a href="?page=online-mmj-states" class="button button-secondary">Open State Generator &rarr;</a>
                    </div>

                    <div style="border:1px solid #e2e8f0; border-radius:8px; padding:16px; background:#f8fafc;">
                        <h4 style="margin:0 0 8px; color:#0f172a; font-size:14px; font-weight:700;">📝 Physician Clinical Guide Post</h4>
                        <p style="font-size:12px; color:#64748b; margin-bottom:12px;">Creates an authoritative medical cannabis post optimized for patient education.</p>
                        <a href="?page=online-mmj-pages-posts&tab=posts" class="button button-secondary">Create Post Now &rarr;</a>
                    </div>
                </div>
            </div>
        <?php endif; ?>

    </div>
    <?php
}

