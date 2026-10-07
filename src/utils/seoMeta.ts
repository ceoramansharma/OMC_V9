import { AppRoute, getStateUrl, getCityUrl, getServiceUrl, getConditionUrl, getBlogUrl, getArticleUrl } from './urlRouter';
import { STATES_DATA, SERVICES_DATA, QUALIFYING_CONDITIONS } from '../data/mmjData';
import { LOCAL_CITIES_DATA } from '../data/localSeoData';
import { BLOG_ARTICLES_DATA } from '../data/blogArticlesData';

export interface PageSEOMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  keywords?: string;
  imageUrl?: string;
}

const DEFAULT_ORIGIN = 'https://onlinemmjcard.com';

/**
 * Gets the clean canonical base URL (using window.location.origin in browser, or production fallback)
 */
export function getBaseOrigin(): string {
  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')) {
    return window.location.origin;
  }
  return DEFAULT_ORIGIN;
}

/**
 * Resolves full SEO metadata for any AppRoute
 */
export function getRouteSEOMeta(route: AppRoute): PageSEOMeta {
  switch (route.type) {
    case 'state': {
      const state = STATES_DATA.find((s) => s.id === route.stateId) || STATES_DATA[0];
      const cleanPath = getStateUrl(state.id);
      return {
        title: `Medical Marijuana Card in ${state.name} | Online 420 Doctor Evaluation`,
        description: `Get your official ${state.name} medical marijuana card online starting at $${state.price}. Same-day approval with licensed ${state.name} cannabis physicians or 100% money back.`,
        canonicalPath: cleanPath,
        keywords: `${state.name} medical marijuana card, ${state.name} mmj card, get mmj card ${state.name}, 420 evaluation ${state.name}, ${state.name} cannabis doctor`,
      };
    }

    case 'city': {
      const city = LOCAL_CITIES_DATA.find((c) => c.slug === route.slug) || LOCAL_CITIES_DATA[0];
      const cleanPath = getCityUrl(city.slug);
      return {
        title: `Medical Marijuana Card ${city.cityName}, ${city.stateCode} | 420 Doctor Telehealth`,
        description: `Get your official medical marijuana card in ${city.cityName}, ${city.stateCode} online in 15 minutes. Certified local telehealth doctors, 99% approval, full refund guarantee.`,
        canonicalPath: cleanPath,
        keywords: `medical marijuana card ${city.cityName}, ${city.cityName} mmj card, 420 evaluation ${city.cityName}, cannabis doctor ${city.cityName} ${city.stateCode}`,
      };
    }

    case 'service': {
      const service = SERVICES_DATA.find((s) => s.id === route.serviceId) || SERVICES_DATA[0];
      const cleanPath = getServiceUrl(service.id);
      return {
        title: `${service.title} | Online MMJ Doctor Telemedicine`,
        description: `Book your ${service.title} online starting at $${service.startingPrice}. 15-minute video consultation with licensed doctors, instant signed certificate or 100% refund.`,
        canonicalPath: cleanPath,
        keywords: `${service.title.toLowerCase()}, online mmj service, telehealth cannabis recommendation, medical marijuana doctor appointment`,
      };
    }

    case 'condition': {
      const condition = QUALIFYING_CONDITIONS.find((c) => c.id === route.conditionId) || QUALIFYING_CONDITIONS[0];
      const cleanPath = getConditionUrl(condition.id);
      return {
        title: `Medical Marijuana for ${condition.name} | Qualifying Condition Evaluation`,
        description: `Discover how medical cannabis helps relieve ${condition.name}. Book an online 420 evaluation with licensed physicians. 99% approval or 100% money back.`,
        canonicalPath: cleanPath,
        keywords: `medical marijuana for ${condition.name.toLowerCase()}, cannabis for ${condition.name.toLowerCase()}, mmj qualifying condition ${condition.name.toLowerCase()}`,
      };
    }

    case 'blog': {
      return {
        title: 'Medical Marijuana Insights & Clinical Research | Online MMJ Card',
        description: 'Explore physician-authored medical cannabis guides, state law comparisons, dosing protocols, and clinical research for qualified patients.',
        canonicalPath: getBlogUrl(),
        keywords: 'medical marijuana blog, cannabis research, mmj guides, doctor cannabis insights, medical marijuana laws',
      };
    }

    case 'article': {
      const article = BLOG_ARTICLES_DATA.find((a) => a.slug === route.articleSlug || a.id === route.articleSlug) || BLOG_ARTICLES_DATA[0];
      return {
        title: `${article.metaTitle} | Online MMJ Card Insights`,
        description: article.metaDesc,
        canonicalPath: getArticleUrl(article.slug),
        ogType: 'article',
        imageUrl: article.featuredImage,
        keywords: `${article.category.toLowerCase()}, medical cannabis research, ${article.title.toLowerCase()}`,
      };
    }

    case 'book': {
      return {
        title: 'Book Your MMJ Evaluation | Certified Telehealth Clinic',
        description: 'Book your online medical marijuana doctor evaluation starting at $55. 100% HIPAA-compliant, licensed telehealth physicians, instant same-day approval.',
        canonicalPath: '/book-evaluation/',
        keywords: 'book mmj evaluation, medical marijuana doctor appointment, 420 evaluation booking, get mmj card online',
      };
    }

    case 'contact': {
      return {
        title: 'Contact Patient Support Desk | Online MMJ Card Telehealth',
        description: 'Need assistance with your medical marijuana card evaluation? Contact our licensed telehealth clinic support desk 7 days a week at (888) 420-6789 or via online intake.',
        canonicalPath: '/contact-us/',
        keywords: 'contact mmj doctor, medical marijuana customer service, 420 evaluations support, telehealth cannabis clinic contact',
      };
    }

    case 'home':
    default: {
      return {
        title: 'Medical Marijuana Card Online | 420 Evaluations with Top MMJ Doctor',
        description: 'Get your legal medical marijuana card online in 15 mins with board-certified MMJ doctors. Fast 420 evaluations, medical cannabis card renewals & 99% approval guaranteed.',
        canonicalPath: '/',
        keywords: 'medical marijuana card, medical marijuana doctor, mmj card, 420 evaluations, mmj doctor, medical cannabis card',
      };
    }
  }
}

/**
 * Updates DOM head elements dynamically on route changes
 * Ensures Google Search indexes only canonical URLs with zero duplicate content issues
 */
export function applySEOMeta(meta: PageSEOMeta): void {
  if (typeof document === 'undefined') return;

  const origin = getBaseOrigin();
  // Ensure canonical path has leading and trailing slashes if not root
  const formattedPath = meta.canonicalPath === '/' ? '/' : `/${meta.canonicalPath.replace(/^\/+|\/+$/g, '')}/`;
  const absoluteCanonicalUrl = `${origin}${formattedPath}`;

  // 1. Update <title>
  document.title = meta.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentVal);
  };

  // 3. Helper to set or create link tag
  const setLinkTag = (rel: string, hrefVal: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', hrefVal);
  };

  // Meta Description
  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);

  // Canonical Link
  setLinkTag('canonical', absoluteCanonicalUrl);

  // OpenGraph Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', absoluteCanonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
  if (meta.imageUrl) {
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.imageUrl);
  }

  // Twitter Tags
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  if (meta.imageUrl) {
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.imageUrl);
  }

  // Keywords if present
  if (meta.keywords) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
  }
}
