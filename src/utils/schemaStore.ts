import { AppRoute } from './urlRouter';
import { STATES_DATA } from '../data/mmjData';
import { LOCAL_CITIES_DATA } from '../data/localSeoData';
import { SERVICES_DATA, QUALIFYING_CONDITIONS } from '../data/mmjData';
import { BLOG_ARTICLES_DATA } from '../data/blogArticlesData';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MedicalBusinessSchemaData {
  enabled: boolean;
  type: 'MedicalBusiness' | 'MedicalClinic' | 'Physician';
  name: string;
  telephone: string;
  email: string;
  url: string;
  priceRange: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  ratingValue: string;
  reviewCount: string;
  description: string;
}

export interface RouteSchemaConfig {
  medicalBusiness: MedicalBusinessSchemaData;
  faqPage: {
    enabled: boolean;
    faqs: FAQItem[];
  };
  customJsonLd: {
    enabled: boolean;
    rawJson: string;
  };
}

const STORAGE_KEY = 'online_mmj_schema_configs_v2';
const SCRIPT_TAG_ID = 'online-mmj-dynamic-route-schema';

export function getRouteKey(route: AppRoute): string {
  switch (route.type) {
    case 'city':
      return `city:${route.slug}`;
    case 'state':
      return `state:${route.stateId}`;
    case 'service':
      return `service:${route.serviceId}`;
    case 'condition':
      return `condition:${route.conditionId}`;
    case 'article':
      return `article:${route.articleSlug}`;
    case 'book':
      return 'book';
    case 'contact':
      return 'contact';
    case 'blog':
      return 'blog';
    case 'home':
    default:
      return 'home';
  }
}

export function getDefaultSchemaForRoute(routeKey: string): RouteSchemaConfig {
  const [type, id] = routeKey.split(':');

  // Base MedicalBusiness defaults
  let businessName = 'Online MMJ Card Telehealth Clinic';
  let locality = 'Los Angeles';
  let region = 'CA';
  let street = '700 S Flower St, Suite 1000';
  let postal = '90017';
  let phone = '+1-800-420-6652';
  let description = 'Board-certified telehealth medical marijuana card evaluations, physician consultations, and state cannabis certifications in 15 minutes with 99% approval rate.';

  const defaultFaqs: FAQItem[] = [
    {
      question: 'How do I get a medical marijuana card online with an MMJ doctor?',
      answer: 'Complete our simple HIPAA-compliant intake form, select your state, and connect with a licensed medical marijuana doctor for a 10-15 minute telehealth consultation. Once approved, you receive your official digital medical cannabis certificate immediately via email.'
    },
    {
      question: 'What is a 420 evaluation and what happens during the appointment?',
      answer: 'A 420 evaluation is a clinical consultation between a patient and a state-licensed MMJ doctor to evaluate qualifying symptoms such as chronic pain, anxiety, PTSD, and insomnia. The doctor discusses safe therapeutic cannabis use.'
    },
    {
      question: 'Can I get my medical cannabis card on the same day?',
      answer: 'Yes! In most states, our MMJ doctors issue your official medical cannabis card certification immediately after your video evaluation, allowing same-day dispensary purchases.'
    },
    {
      question: 'Why should I get a medical marijuana card if recreational cannabis is legal?',
      answer: 'An official medical marijuana card exempts patients from high state and municipal excise taxes (saving up to 35%), provides access to higher potency medicine, unlocks higher possession limits, and lowers the legal purchasing age to 18.'
    }
  ];

  if (type === 'city' && id) {
    const city = LOCAL_CITIES_DATA.find((c) => c.slug === id);
    if (city) {
      businessName = `Online MMJ Card - ${city.cityName} Clinic`;
      locality = city.cityName;
      region = city.stateCode;
      street = city.address?.street || '100 Medical Center Blvd';
      postal = city.address?.zip || '90001';
      phone = city.phone || '+1-800-420-6652';
      description = `Certified medical marijuana evaluations in ${city.cityName}, ${city.stateCode}. Same-day approval with licensed physicians or 100% money back guarantee.`;
    }
  } else if (type === 'state' && id) {
    const state = STATES_DATA.find((s) => s.id === id);
    if (state) {
      businessName = `Online MMJ Card ${state.name} Telehealth`;
      region = state.code;
      description = `Official ${state.name} medical marijuana card evaluations. Certified state physicians, instant recommendation certificate, starting at $${state.price}.`;
    }
  } else if (type === 'service' && id) {
    const service = SERVICES_DATA.find((s) => s.id === id);
    if (service) {
      businessName = `Online MMJ Card - ${service.title}`;
      description = `${service.title} online starting at $${service.startingPrice}. 15-minute video consultation with state-licensed physicians.`;
    }
  } else if (type === 'condition' && id) {
    const condition = QUALIFYING_CONDITIONS.find((c) => c.id === id);
    if (condition) {
      businessName = `Online MMJ Card - ${condition.name} Care`;
      description = `Medical cannabis evaluations for ${condition.name}. Consult with certified MMJ physicians online.`;
    }
  } else if (type === 'article' && id) {
    const article = BLOG_ARTICLES_DATA.find((a) => a.slug === id || a.id === id);
    if (article) {
      businessName = 'Online MMJ Card Clinical Publications';
      description = article.metaDesc;
    }
  }

  return {
    medicalBusiness: {
      enabled: true,
      type: 'MedicalBusiness',
      name: businessName,
      telephone: phone,
      email: 'support@onlinemmjcard.com',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://onlinemmjcard.com',
      priceRange: '$$',
      streetAddress: street,
      addressLocality: locality,
      addressRegion: region,
      postalCode: postal,
      addressCountry: 'US',
      ratingValue: '4.9',
      reviewCount: '14250',
      description
    },
    faqPage: {
      enabled: true,
      faqs: defaultFaqs
    },
    customJsonLd: {
      enabled: false,
      rawJson: ''
    }
  };
}

function loadAllSavedConfigs(): Record<string, RouteSchemaConfig> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load saved schema configs:', e);
  }
  return {};
}

export function getRouteSchemaConfig(routeKey: string): RouteSchemaConfig {
  const allConfigs = loadAllSavedConfigs();
  const saved = allConfigs[routeKey];
  const defaults = getDefaultSchemaForRoute(routeKey);

  if (!saved) return defaults;

  return {
    ...defaults,
    ...saved,
    medicalBusiness: {
      ...defaults.medicalBusiness,
      ...(saved.medicalBusiness || {})
    },
    faqPage: {
      ...defaults.faqPage,
      ...(saved.faqPage || {})
    },
    customJsonLd: {
      enabled: saved.customJsonLd?.enabled ?? defaults.customJsonLd.enabled,
      rawJson: saved.customJsonLd?.rawJson ?? defaults.customJsonLd.rawJson
    }
  };
}

export function saveRouteSchemaConfig(routeKey: string, config: RouteSchemaConfig): void {
  if (typeof window === 'undefined') return;
  try {
    const allConfigs = loadAllSavedConfigs();
    allConfigs[routeKey] = config;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allConfigs));

    // Re-apply to head if current active route
    const currentRouteKey = getRouteKey({ type: 'home' }); // Will re-evaluate in caller
    window.dispatchEvent(new CustomEvent('route-schema-updated', { detail: { routeKey, config } }));
  } catch (e) {
    console.error('Failed to save route schema config:', e);
  }
}

export function resetRouteSchemaConfig(routeKey: string): RouteSchemaConfig {
  if (typeof window === 'undefined') return getDefaultSchemaForRoute(routeKey);
  try {
    const allConfigs = loadAllSavedConfigs();
    delete allConfigs[routeKey];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allConfigs));
    const defaults = getDefaultSchemaForRoute(routeKey);
    window.dispatchEvent(new CustomEvent('route-schema-updated', { detail: { routeKey, config: defaults } }));
    return defaults;
  } catch (e) {
    console.error('Failed to reset route schema config:', e);
    return getDefaultSchemaForRoute(routeKey);
  }
}

/**
 * Builds array of JSON-LD schema objects according to config
 */
export function buildSchemaObjects(config: RouteSchemaConfig): object[] {
  const schemas: object[] = [];

  // 1. Custom Raw JSON-LD overrides if enabled and valid
  if (config.customJsonLd?.enabled && config.customJsonLd.rawJson?.trim()) {
    try {
      const parsed = JSON.parse(config.customJsonLd.rawJson);
      if (Array.isArray(parsed)) {
        schemas.push(...parsed);
      } else if (typeof parsed === 'object' && parsed !== null) {
        schemas.push(parsed);
      }
      return schemas;
    } catch (e) {
      console.warn('Custom JSON-LD schema is invalid JSON, falling back to structured fields:', e);
    }
  }

  // 2. MedicalBusiness / MedicalClinic Schema
  if (config.medicalBusiness.enabled) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': config.medicalBusiness.type,
      name: config.medicalBusiness.name,
      alternateName: 'Online MMJ Card',
      telephone: config.medicalBusiness.telephone,
      email: config.medicalBusiness.email,
      url: config.medicalBusiness.url,
      priceRange: config.medicalBusiness.priceRange,
      currenciesAccepted: 'USD',
      paymentAccepted: 'Credit Card, Debit Card, HSA, FSA',
      description: config.medicalBusiness.description,
      medicalSpecialty: [
        'Cannabis Medicine',
        'Integrative Medicine',
        'Pain Management',
        'Primary Care'
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.medicalBusiness.streetAddress,
        addressLocality: config.medicalBusiness.addressLocality,
        addressRegion: config.medicalBusiness.addressRegion,
        postalCode: config.medicalBusiness.postalCode,
        addressCountry: config.medicalBusiness.addressCountry
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: config.medicalBusiness.ratingValue,
        reviewCount: config.medicalBusiness.reviewCount,
        bestRating: '5',
        worstRating: '1'
      }
    });
  }

  // 3. FAQPage Schema
  if (config.faqPage.enabled && config.faqPage.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: config.faqPage.faqs
        .filter((f) => f.question.trim() && f.answer.trim())
        .map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
    });
  }

  return schemas;
}

/**
 * Injects or dynamically updates the `<script id="online-mmj-dynamic-route-schema" type="application/ld+json">`
 * tag in document.head
 */
export function applyDynamicRouteSchema(route: AppRoute): void {
  if (typeof document === 'undefined') return;

  const routeKey = getRouteKey(route);
  const config = getRouteSchemaConfig(routeKey);
  const schemas = buildSchemaObjects(config);

  let scriptEl = document.getElementById(SCRIPT_TAG_ID) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = SCRIPT_TAG_ID;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  if (schemas.length === 0) {
    scriptEl.textContent = '';
  } else if (schemas.length === 1) {
    scriptEl.textContent = JSON.stringify(schemas[0], null, 2);
  } else {
    scriptEl.textContent = JSON.stringify(schemas, null, 2);
  }
}
