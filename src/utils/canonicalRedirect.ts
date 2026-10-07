import { AppRoute, getStateUrl, getCityUrl, getServiceUrl, getConditionUrl, getBlogUrl, getArticleUrl, getContactUrl, getBookUrl, parseCurrentUrl } from './urlRouter';
import { STATES_DATA, SERVICES_DATA, QUALIFYING_CONDITIONS } from '../data/mmjData';
import { LOCAL_CITIES_DATA } from '../data/localSeoData';
import { BLOG_ARTICLES_DATA } from '../data/blogArticlesData';
import { getBaseOrigin } from './seoMeta';

export interface CanonicalRedirectResult {
  isDuplicate: boolean;
  redirected: boolean;
  originalUrl: string;
  canonicalPath: string;
  canonicalUrl: string;
  reason?: string;
}

/**
 * Resolves the absolute primary-keyword canonical URL for any route.
 * Prioritizes high-ranking industry keywords:
 * - /medical-marijuana-card-{state}/
 * - /medical-marijuana-card-{city}/
 * - /medical-marijuana-card-renewal/
 * - /new-patient-medical-marijuana-card/
 * - /99-plant-cultivation-recommendation/
 * - /emotional-support-animal-letter/
 * - /medical-marijuana-for-{condition}/
 * - /medical-marijuana-insights/
 * - /contact-us/
 * - /book-evaluation/
 * - / (homepage)
 */
export function getPrimaryKeywordCanonicalPath(route: AppRoute): string {
  switch (route.type) {
    case 'state':
      return getStateUrl(route.stateId);
    case 'city':
      return getCityUrl(route.slug);
    case 'service':
      return getServiceUrl(route.serviceId);
    case 'condition':
      return getConditionUrl(route.conditionId);
    case 'blog':
      return route.viewMode === 'speed' ? '/medical-marijuana-insights/?view=speed' : getBlogUrl();
    case 'article':
      return getArticleUrl(route.articleSlug, route.isAmp);
    case 'book': {
      const params = new URLSearchParams();
      if (route.stateId) params.set('state', route.stateId);
      if (route.serviceId) params.set('service', route.serviceId);
      const qs = params.toString() ? `?${params.toString()}` : '';
      return `/book-evaluation/${qs}`;
    }
    case 'contact':
      return getContactUrl();
    case 'sitemap':
      return '/sitemap.xml';
    case 'custom-page':
      return `/${route.slug.replace(/^\/+|\/+$/g, '')}/`;
    case 'home':
    default:
      return '/';
  }
}

/**
 * Checks if a given path/URL is a duplicate or non-canonical variant of an authorized primary route.
 */
export function detectDuplicateContent(
  currentPath?: string,
  search?: string,
  hash?: string
): { isDuplicate: boolean; canonicalPath: string; canonicalUrl: string; reason?: string } {
  const origin = getBaseOrigin();
  const rawPath = (currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')).trim();
  const rawSearch = (search ?? (typeof window !== 'undefined' ? window.location.search : '')).trim();
  const rawHash = (hash ?? (typeof window !== 'undefined' ? window.location.hash : '')).trim();

  // Normalize path
  const lowerPath = rawPath.toLowerCase();
  const trimmedPath = lowerPath.replace(/^\/+|\/+$/g, '');

  // Check if WordPress page builder edit/preview canvas is active - do NOT redirect editor
  const lowerSearch = rawSearch.toLowerCase();
  const isPageBuilderEditor = 
    lowerSearch.includes('elementor') || 
    lowerSearch.includes('preview=true') || 
    lowerSearch.includes('et_fb=1') || 
    lowerSearch.includes('headless');

  if (isPageBuilderEditor) {
    const route = parseCurrentUrl(rawPath, rawSearch, rawHash);
    const canonicalPath = getPrimaryKeywordCanonicalPath(route);
    return {
      isDuplicate: false,
      canonicalPath,
      canonicalUrl: `${origin}${canonicalPath}${rawSearch}`,
    };
  }

  // 1. Detect duplicate hash routing (e.g. /#/medical-marijuana-card-ca or /path/#/path)
  const cleanHash = rawHash.replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase();
  if (cleanHash && (cleanHash === trimmedPath || trimmedPath.endsWith(cleanHash))) {
    const route = parseCurrentUrl(rawPath, rawSearch, rawHash);
    const canonicalPath = getPrimaryKeywordCanonicalPath(route);
    return {
      isDuplicate: true,
      canonicalPath,
      canonicalUrl: `${origin}${canonicalPath}${rawSearch}`,
      reason: 'Hash-based duplicate route detected',
    };
  }

  // 2. Detect non-lowercase URLs (e.g. /California/ -> /medical-marijuana-card-california/)
  const hasUppercase = rawPath !== lowerPath;

  // 3. Detect root homepage variants (e.g. /home, /index.html, /index.php)
  if (trimmedPath === 'home' || trimmedPath === 'index.html' || trimmedPath === 'index.php') {
    return {
      isDuplicate: true,
      canonicalPath: '/',
      canonicalUrl: `${origin}/${rawSearch}`,
      reason: 'Homepage duplicate variant detected',
    };
  }

  // 3b. Detect sitemap route variants (e.g. /sitemap, /sitemap/)
  if (trimmedPath === 'sitemap' || trimmedPath === 'sitemap.xml') {
    return {
      isDuplicate: rawPath !== '/sitemap.xml',
      canonicalPath: '/sitemap.xml',
      canonicalUrl: `${origin}/sitemap.xml`,
      reason: rawPath !== '/sitemap.xml' ? 'Sitemap variant redirected to /sitemap.xml' : undefined,
    };
  }

  // Parse current route to identify intended page using rawPath, rawSearch, rawHash
  const route = parseCurrentUrl(rawPath, rawSearch, rawHash);
  const canonicalPath = getPrimaryKeywordCanonicalPath(route);
  const canonicalPathNoQuery = canonicalPath.split('?')[0];

  // 4. Compare current path against canonical path
  const formattedCurrentPath = rawPath === '/' ? '/' : `/${trimmedPath}/`;

  if (formattedCurrentPath !== canonicalPathNoQuery) {
    return {
      isDuplicate: true,
      canonicalPath,
      canonicalUrl: `${origin}${canonicalPath}`,
      reason: `Non-canonical alias (${formattedCurrentPath}) redirected to primary keyword URL (${canonicalPathNoQuery})`,
    };
  }

  // 5. Detect missing trailing slash on sub-paths (e.g. /medical-marijuana-card-california -> /medical-marijuana-card-california/)
  if (rawPath !== '/' && !rawPath.endsWith('/')) {
    return {
      isDuplicate: true,
      canonicalPath,
      canonicalUrl: `${origin}${canonicalPath}${rawSearch}`,
      reason: 'Missing trailing slash on canonical SEO URL',
    };
  }

  if (hasUppercase) {
    return {
      isDuplicate: true,
      canonicalPath,
      canonicalUrl: `${origin}${canonicalPath}${rawSearch}`,
      reason: 'Uppercase URL characters normalized to lowercase',
    };
  }

  return {
    isDuplicate: false,
    canonicalPath,
    canonicalUrl: `${origin}${canonicalPath}${rawSearch}`,
  };
}

/**
 * Updates or injects the <link rel="canonical"> element in document head
 */
export function updateCanonicalHeadTag(canonicalUrl: string): void {
  if (typeof document === 'undefined') return;

  let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!linkEl) {
    linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'canonical');
    document.head.appendChild(linkEl);
  }
  linkEl.setAttribute('href', canonicalUrl);

  // Synchronize OpenGraph and Twitter URL tags
  let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
  if (ogUrl) {
    ogUrl.setAttribute('content', canonicalUrl);
  }
}

/**
 * Detects duplicate content URLs and automatically executes a seamless client-side
 * redirect (replaceState) to prioritize the primary keyword canonical URL.
 */
export function enforceCanonicalRedirect(currentRoute?: AppRoute): CanonicalRedirectResult {
  if (typeof window === 'undefined') {
    return {
      isDuplicate: false,
      redirected: false,
      originalUrl: '/',
      canonicalPath: '/',
      canonicalUrl: 'https://onlinemmjcard.com/',
    };
  }

  const originalUrl = window.location.href;
  const detection = detectDuplicateContent();

  // Always keep canonical tag strictly set to primary keyword canonical URL
  updateCanonicalHeadTag(detection.canonicalUrl);

  if (detection.isDuplicate) {
    try {
      const targetUrl = `${detection.canonicalPath}${window.location.search}`;
      window.history.replaceState(null, '', targetUrl);
      return {
        isDuplicate: true,
        redirected: true,
        originalUrl,
        canonicalPath: detection.canonicalPath,
        canonicalUrl: detection.canonicalUrl,
        reason: detection.reason,
      };
    } catch (e) {
      console.warn('Failed to replace duplicate URL state:', e);
    }
  }

  return {
    isDuplicate: false,
    redirected: false,
    originalUrl,
    canonicalPath: detection.canonicalPath,
    canonicalUrl: detection.canonicalUrl,
  };
}
