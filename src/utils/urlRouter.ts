import { STATES_DATA, SERVICES_DATA, QUALIFYING_CONDITIONS } from '../data/mmjData';
import { LOCAL_CITIES_DATA } from '../data/localSeoData';
import { BLOG_ARTICLES_DATA } from '../data/blogArticlesData';
import { getPageBySlug } from './customPagesStore';

export type AppRoute =
  | { type: 'home' }
  | { type: 'contact' }
  | { type: 'city'; slug: string }
  | { type: 'state'; stateId: string }
  | { type: 'service'; serviceId: string }
  | { type: 'condition'; conditionId: string }
  | { type: 'blog'; viewMode?: 'standard' | 'speed' }
  | { type: 'article'; articleSlug: string; isAmp?: boolean }
  | { type: 'book'; stateId?: string; serviceId?: string }
  | { type: 'sitemap' }
  | { type: 'custom-page'; slug: string };

/**
 * Generates Contact Us URL
 */
export function getContactUrl(): string {
  return '/contact-us/';
}

/**
 * Generates OnlineMMJCard Evaluation booking URL
 */
export function getBookUrl(stateId?: string, serviceId?: string): string {
  const params = new URLSearchParams();
  if (stateId) params.set('state', stateId);
  if (serviceId) params.set('service', serviceId);
  const query = params.toString() ? `?${params.toString()}` : '';
  return `/book-evaluation/${query}`;
}

/**
 * Generates exact competitor-style SEO URLs:
 * e.g. /medical-marijuana-card-massachusetts/
 */
export function getStateUrl(stateId: string): string {
  const cleanId = stateId.toLowerCase().trim();
  return `/medical-marijuana-card-${cleanId}/`;
}

/**
 * Generates exact competitor-style local city URLs:
 * e.g. /medical-marijuana-card-los-angeles/
 */
export function getCityUrl(citySlug: string): string {
  const cleanCity = citySlug.replace(/-[a-z]{2}$/i, '');
  return `/medical-marijuana-card-${cleanCity}/`;
}

/**
 * Generates competitor-style service URLs:
 * e.g. /medical-marijuana-card-renewal/
 */
export function getServiceUrl(serviceId: string): string {
  switch (serviceId) {
    case 'renewal':
      return '/medical-marijuana-card-renewal/';
    case 'cultivation':
      return '/99-plant-cultivation-recommendation/';
    case 'esa-letter':
      return '/emotional-support-animal-letter/';
    case 'new-patient':
    default:
      return '/new-patient-medical-marijuana-card/';
  }
}

/**
 * Generates competitor-style condition URLs:
 * e.g. /medical-marijuana-for-chronic-pain/
 */
export function getConditionUrl(conditionId: string): string {
  return `/medical-marijuana-for-${conditionId}/`;
}

/**
 * Generates Medical Marijuana Insights blog main URL
 */
export function getBlogUrl(isSpeedMode = false): string {
  return isSpeedMode ? '/medical-marijuana-insights/?view=speed' : '/medical-marijuana-insights/';
}

/**
 * Generates Medical Marijuana Insights individual article URL
 * Supports standard canonical URL and speed-optimized AMP URL (?amp=1)
 */
export function getArticleUrl(slug: string, isAmp = false): string {
  return isAmp ? `/${slug}/?amp=1` : `/${slug}/`;
}

/**
 * Parses current browser URL (both pathname and hash) into an AppRoute.
 * Can also accept explicit pathname, search, and hash for canonical duplicate checks.
 */
export function parseCurrentUrl(explicitPath?: string, explicitSearch?: string, explicitHash?: string): AppRoute {
  const pathname = explicitPath !== undefined ? explicitPath : (typeof window !== 'undefined' ? window.location.pathname : '/');
  const search = explicitSearch !== undefined ? explicitSearch : (typeof window !== 'undefined' ? window.location.search : '');
  const hash = explicitHash !== undefined ? explicitHash : (typeof window !== 'undefined' ? window.location.hash : '');

  const rawPath = pathname.toLowerCase().replace(/\/+$/, '');
  const rawHash = hash.toLowerCase().replace(/^#\/?/, '').replace(/\/+$/, '');
  const searchParams = new URLSearchParams(search);
  const hashSearchParams = rawHash.includes('?') ? new URLSearchParams(rawHash.split('?')[1]) : null;

  const isAmpRequested = searchParams.get('amp') === '1' || (hashSearchParams && hashSearchParams.get('amp') === '1') || rawPath.endsWith('/amp') || rawHash.endsWith('/amp');
  const isSpeedRequested = isAmpRequested || searchParams.get('view') === 'speed' || (hashSearchParams && hashSearchParams.get('view') === 'speed');

  // Prioritize pathname if it represents a sub-route; otherwise fallback to hash
  let candidate = '';
  if (rawPath && rawPath !== '' && rawPath !== '/') {
    candidate = rawPath.replace(/^\//, '');
  } else if (rawHash) {
    candidate = rawHash.split('?')[0];
  }

  // Strip trailing /amp if present
  if (candidate.endsWith('/amp')) {
    candidate = candidate.replace(/\/amp$/, '');
  }

  // Anchor links or default home
  const homeAnchors = ['home', 'local-cities', 'states-directory', 'conditions', 'education', 'why-trust', 'reviews', 'faq', 'benefits-comparison'];
  if (!candidate || homeAnchors.includes(candidate)) {
    return { type: 'home' };
  }

  // Contact Desk Route
  if (
    candidate === 'contact' ||
    candidate === 'contact-us' ||
    candidate === 'contactus' ||
    candidate === 'contact-support' ||
    candidate === 'support' ||
    candidate.startsWith('contact')
  ) {
    return { type: 'contact' };
  }

  // XML Sitemap Route
  if (candidate === 'sitemap.xml' || candidate === 'sitemap') {
    return { type: 'sitemap' };
  }

  // 0. Book Evaluation Form (mymmjdoctor.com style)
  if (
    candidate === 'book' ||
    candidate === 'book-evaluation' ||
    candidate === 'evaluate' ||
    candidate.startsWith('book-evaluation') ||
    candidate.startsWith('book/')
  ) {
    const urlParams = searchParams;
    const stateParam = urlParams.get('state') || undefined;
    const serviceParam = urlParams.get('service') || undefined;
    return { type: 'book', stateId: stateParam, serviceId: serviceParam };
  }

  // 1. Blog Main Directory
  if (candidate === 'medical-marijuana-insights' || candidate === 'blog' || candidate === 'insights') {
    return { type: 'blog', viewMode: isSpeedRequested ? 'speed' : 'standard' };
  }

  // 2. Blog Single Article Check
  if (
    candidate.startsWith('medical-marijuana-insights/') ||
    candidate.startsWith('blog/') ||
    candidate.startsWith('insights/')
  ) {
    const slug = candidate.split('/')[1];
    const foundArticle = BLOG_ARTICLES_DATA.find((a) => a.slug === slug || a.id === slug);
    if (foundArticle) {
      return { type: 'article', articleSlug: foundArticle.slug, isAmp: isAmpRequested };
    }
  }

  // Direct article slug check
  const directArticle = BLOG_ARTICLES_DATA.find((a) => a.slug === candidate || a.id === candidate);
  if (directArticle) {
    return { type: 'article', articleSlug: directArticle.slug, isAmp: isAmpRequested };
  }

  // 3. Services Check
  if (candidate === 'medical-marijuana-card-renewal' || candidate === 'renewal' || candidate === 'service/renewal') {
    return { type: 'service', serviceId: 'renewal' };
  }
  if (candidate === '99-plant-cultivation-recommendation' || candidate === 'cultivation' || candidate === 'service/cultivation') {
    return { type: 'service', serviceId: 'cultivation' };
  }
  if (candidate === 'emotional-support-animal-letter' || candidate === 'esa-letter' || candidate === 'service/esa-letter') {
    return { type: 'service', serviceId: 'esa-letter' };
  }
  if (candidate === 'new-patient-medical-marijuana-card' || candidate === 'new-patient' || candidate === 'service/new-patient') {
    return { type: 'service', serviceId: 'new-patient' };
  }

  // 4. Conditions Check
  if (candidate.startsWith('medical-marijuana-for-')) {
    const condId = candidate.replace('medical-marijuana-for-', '');
    const foundCond = QUALIFYING_CONDITIONS.find(
      (c) => c.id === condId || c.id === condId.replace(/-+/g, '-')
    );
    if (foundCond) {
      return { type: 'condition', conditionId: foundCond.id };
    }
  } else if (candidate.startsWith('condition/')) {
    const condId = candidate.replace('condition/', '');
    return { type: 'condition', conditionId: condId };
  }

  // 5. States & Cities Check for pattern "medical-marijuana-card-{target}" or "medical-marijuana-doctor-{target}"
  let target = '';
  if (candidate.startsWith('medical-marijuana-card-')) {
    target = candidate.replace('medical-marijuana-card-', '');
  } else if (candidate.startsWith('medical-marijuana-doctor-')) {
    target = candidate.replace('medical-marijuana-doctor-', '');
  } else if (candidate.startsWith('state/')) {
    target = candidate.replace('state/', '');
  } else if (candidate.startsWith('states/')) {
    target = candidate.replace('states/', '');
  } else if (candidate.startsWith('local/')) {
    target = candidate.replace('local/', '');
  } else if (candidate.startsWith('locations/')) {
    target = candidate.replace('locations/', '');
  } else if (candidate.endsWith('-medical-marijuana-card')) {
    target = candidate.replace(/-medical-marijuana-card$/, '');
  } else if (candidate.endsWith('-mmj-card')) {
    target = candidate.replace(/-mmj-card$/, '');
  }

  if (target) {
    // Check if target is a known state (e.g. massachusetts, california, florida, texas)
    const matchedState = STATES_DATA.find(
      (s) => s.id === target || s.code.toLowerCase() === target || s.name.toLowerCase().replace(/\s+/g, '-') === target
    );
    if (matchedState) {
      return { type: 'state', stateId: matchedState.id };
    }

    // Check if target is a known local city (e.g. los-angeles, miami, houston)
    const matchedCity = LOCAL_CITIES_DATA.find((c) => {
      const cleanSlug = c.slug.replace(/-[a-z]{2}$/i, '');
      const cityNameSlug = c.cityName.toLowerCase().replace(/\s+/g, '-');
      return c.slug === target || cleanSlug === target || cityNameSlug === target;
    });
    if (matchedCity) {
      return { type: 'city', slug: matchedCity.slug };
    }
  }

  // 5b. Direct state match (e.g. /california, /new-york, /florida)
  const directState = STATES_DATA.find(
    (s) => s.id === candidate || s.code.toLowerCase() === candidate || s.name.toLowerCase().replace(/\s+/g, '-') === candidate
  );
  if (directState) {
    return { type: 'state', stateId: directState.id };
  }

  // 5c. Direct local city match (e.g. /los-angeles-ca, /los-angeles, /san-diego)
  const directCity = LOCAL_CITIES_DATA.find((c) => {
    const cleanSlug = c.slug.replace(/-[a-z]{2}$/i, '');
    const cityNameSlug = c.cityName.toLowerCase().replace(/\s+/g, '-');
    return c.slug === candidate || cleanSlug === candidate || cityNameSlug === candidate;
  });
  if (directCity) {
    return { type: 'city', slug: directCity.slug };
  }

  // 5d. Direct condition match (e.g. /chronic-pain, /anxiety-ptsd)
  const directCondition = QUALIFYING_CONDITIONS.find(
    (c) => c.id === candidate || c.id === candidate.replace(/-+/g, '-')
  );
  if (directCondition) {
    return { type: 'condition', conditionId: directCondition.id };
  }

  // 6. Check custom dynamic WordPress pages
  const customPage = getPageBySlug(candidate);
  if (customPage) {
    return { type: 'custom-page', slug: customPage.slug };
  }

  return { type: 'home' };
}
