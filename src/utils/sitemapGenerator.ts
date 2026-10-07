import { STATES_DATA, SERVICES_DATA, QUALIFYING_CONDITIONS } from '../data/mmjData';
import { LOCAL_CITIES_DATA } from '../data/localSeoData';
import { BLOG_ARTICLES_DATA } from '../data/blogArticlesData';
import { getCustomPages, WordPressPage } from './customPagesStore';

export interface SitemapEntry {
  url: string;
  path: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  category: 'Home' | 'States' | 'Cities' | 'Services' | 'Conditions' | 'Blog' | 'Articles' | 'AMP';
  title: string;
  imageUrl?: string;
}

export interface SitemapStats {
  totalUrls: number;
  byCategory: Record<string, number>;
  lastGenerated: string;
  fileSizeBytes: number;
}

const STORAGE_KEY = 'online_mmj_sitemap_xml_v1';
const STATS_KEY = 'online_mmj_sitemap_stats_v1';

/**
 * Crawls and extracts all application routes from app state
 */
export function crawlAppRoutes(baseUrl = 'https://onlinemmjcard.com'): SitemapEntry[] {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  // 1. Home Page
  entries.push({
    url: `${cleanBase}/`,
    path: '/',
    lastmod: today,
    changefreq: 'daily',
    priority: 1.0,
    category: 'Home',
    title: 'Online MMJ Card - Certified Telehealth 420 Doctors & Evaluations Clinic',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
  });

  // 2. Evaluation Booking Page
  entries.push({
    url: `${cleanBase}/book-evaluation/`,
    path: '/book-evaluation/',
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.95,
    category: 'Services',
    title: 'Book Online MMJ Doctor Evaluation'
  });

  // 2b. Contact Patient Support Desk
  entries.push({
    url: `${cleanBase}/contact-us/`,
    path: '/contact-us/',
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.8,
    category: 'Services',
    title: 'Contact Patient Support Desk | Online MMJ Card Telehealth'
  });

  // 3. Telehealth Services (4 Core Packages)
  SERVICES_DATA.forEach((service) => {
    let slug = 'new-patient-medical-marijuana-card';
    if (service.id === 'renewal') slug = 'medical-marijuana-card-renewal';
    if (service.id === 'cultivation') slug = '99-plant-cultivation-recommendation';
    if (service.id === 'esa-letter') slug = 'emotional-support-animal-letter';

    entries.push({
      url: `${cleanBase}/${slug}/`,
      path: `/${slug}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
      category: 'Services',
      title: `${service.title} - Online Telehealth Evaluation`,
      imageUrl: service.features[0] ? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' : undefined
    });
  });

  // 4. All 31 Covered States
  STATES_DATA.forEach((state) => {
    const slug = `medical-marijuana-card-${state.id.toLowerCase()}`;
    entries.push({
      url: `${cleanBase}/${slug}/`,
      path: `/${slug}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
      category: 'States',
      title: `${state.name} Medical Marijuana Card Online Evaluation & Telehealth Guide`,
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'
    });
  });

  // 5. Local Cities Landing Pages
  LOCAL_CITIES_DATA.forEach((city) => {
    const cleanCitySlug = city.slug.replace(/-[a-z]{2}$/i, '');
    const slug = `medical-marijuana-card-${cleanCitySlug}`;
    entries.push({
      url: `${cleanBase}/${slug}/`,
      path: `/${slug}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
      category: 'Cities',
      title: `Medical Marijuana Card in ${city.cityName}, ${city.stateCode} - Local Telehealth Doctors`,
      imageUrl: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1200&q=80'
    });
  });

  // 6. Qualifying Medical Conditions (12 Guides)
  QUALIFYING_CONDITIONS.forEach((condition) => {
    const slug = `medical-marijuana-for-${condition.id}`;
    entries.push({
      url: `${cleanBase}/${slug}/`,
      path: `/${slug}/`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
      category: 'Conditions',
      title: `Medical Marijuana for ${condition.name} - Qualifying Conditions & Telehealth Approval`,
      imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80'
    });
  });

  // 7. Medical Marijuana Insights (Blog Hub)
  entries.push({
    url: `${cleanBase}/medical-marijuana-insights/`,
    path: '/medical-marijuana-insights/',
    lastmod: today,
    changefreq: 'daily',
    priority: 0.85,
    category: 'Blog',
    title: 'Medical Marijuana Insights, Clinical Research & Patient Education Hub',
    imageUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=1200&q=80'
  });

  // 8. Individual Clinical Articles (Standard + AMP Speed-Optimized Versions)
  BLOG_ARTICLES_DATA.forEach((article) => {
    // Standard Canonical Article
    entries.push({
      url: `${cleanBase}/${article.slug}/`,
      path: `/${article.slug}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.75,
      category: 'Articles',
      title: `${article.title} | Physician Clinical Guide`,
      imageUrl: article.featuredImage
    });

    // Speed-Optimized AMP Mobile Version
    entries.push({
      url: `${cleanBase}/${article.slug}/?amp=1`,
      path: `/${article.slug}/?amp=1`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7,
      category: 'AMP',
      title: `⚡ AMP View: ${article.title}`,
      imageUrl: article.featuredImage
    });
  });

  // 9. Custom WordPress dynamic pages
  const customPages = getCustomPages();
  customPages.forEach((cp: WordPressPage) => {
    const slug = cp.slug.replace(/^\/+|\/+$/g, '');
    entries.push({
      url: `${cleanBase}/${slug}/`,
      path: `/${slug}/`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
      category: 'Services',
      title: `${cp.title} | Online MMJ Card`,
    });
  });

  // Primary Keyword Prioritization:
  // Sort entries so URLs containing high-ranking search keywords (e.g. medical-marijuana-card, new-patient, etc.)
  // appear at the top with highest priority to maximize search engine indexation.
  const keywordWeight = (path: string): number => {
    let score = 0;
    if (path === '/') return 1000;
    if (path.includes('medical-marijuana-card-')) score += 100;
    if (path.includes('new-patient')) score += 90;
    if (path.includes('renewal')) score += 80;
    if (path.includes('cultivation')) score += 70;
    if (path.includes('medical-marijuana-for-')) score += 60;
    if (path.includes('medical-marijuana-insights')) score += 50;
    if (path.includes('book-evaluation')) score += 85;
    return score;
  };

  entries.sort((a, b) => {
    const weightDiff = keywordWeight(b.path) - keywordWeight(a.path);
    if (weightDiff !== 0) return weightDiff;
    return b.priority - a.priority;
  });

  return entries;
}

/**
 * Generate standard Sitemaps.org XML string with Google image extensions
 */
export function generateSitemapXml(baseUrl = 'https://onlinemmjcard.com'): string {
  const entries = crawlAppRoutes(baseUrl);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
  xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.url)}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority.toFixed(2)}</priority>\n`;

    if (entry.imageUrl) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(entry.imageUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(entry.title)}</image:title>\n`;
      xml += `    </image:image>\n`;
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/[<]/g, '&lt;')
    .replace(/[>]/g, '&gt;')
    .replace(/["']/g, '&quot;')
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, '&amp;');
}

/**
 * Computes sitemap summary metrics
 */
export function getSitemapStats(baseUrl = 'https://onlinemmjcard.com'): SitemapStats {
  const entries = crawlAppRoutes(baseUrl);
  const byCategory: Record<string, number> = {};

  entries.forEach((e) => {
    byCategory[e.category] = (byCategory[e.category] || 0) + 1;
  });

  const savedXml = getStoredSitemapXml();
  const xmlLength = savedXml ? new Blob([savedXml]).size : 0;

  return {
    totalUrls: entries.length,
    byCategory,
    lastGenerated: getStoredLastGeneratedDate() || new Date().toISOString(),
    fileSizeBytes: xmlLength || 18450
  };
}

/**
 * Storage helpers
 */
export function getStoredSitemapXml(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getStoredLastGeneratedDate(): string | null {
  try {
    return localStorage.getItem(STATS_KEY);
  } catch {
    return null;
  }
}

export function saveSitemapLocally(xml: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, xml);
    localStorage.setItem(STATS_KEY, new Date().toISOString());
    window.dispatchEvent(new CustomEvent('online-mmj-sitemap-updated'));
  } catch (err) {
    console.warn('Could not cache sitemap in localStorage', err);
  }
}

/**
 * Download generated sitemap.xml file directly in browser
 */
export function downloadSitemapFile(baseUrl = 'https://onlinemmjcard.com'): void {
  const xml = generateSitemapXml(baseUrl);
  saveSitemapLocally(xml);

  const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Save sitemap directly to WordPress root directory (ABSPATH/sitemap.xml)
 */
export async function saveSitemapToWordPressRoot(baseUrl = 'https://onlinemmjcard.com'): Promise<{ success: boolean; message: string }> {
  const xml = generateSitemapXml(baseUrl);
  saveSitemapLocally(xml);

  const wpSettings = (window as unknown as { onlineMMJCardSettings?: { ajaxUrl?: string; nonce?: string } })?.onlineMMJCardSettings;
  const ajaxUrl = wpSettings?.ajaxUrl || '/wp-admin/admin-ajax.php';

  try {
    const formData = new FormData();
    formData.append('action', 'online_mmj_save_sitemap');
    formData.append('xml', xml);
    if (wpSettings?.nonce) formData.append('nonce', wpSettings.nonce);

    const res = await fetch(ajaxUrl, {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success) {
        return { success: true, message: data.data?.message || 'Successfully saved sitemap.xml to WordPress root directory (ABSPATH).' };
      }
    }
  } catch (err) {
    // If running in client preview or dev server
  }

  return { success: false, message: 'Could not write directly to WordPress root. Sitemap downloaded/cached locally.' };
}

/**
 * Periodic automated sitemap generator hook / scheduler
 * Automatically recrawls app state every 2 minutes or on route changes
 */
let periodicIntervalId: any = null;

export function startPeriodicSitemapGenerator(intervalMs = 120000, baseUrl = 'https://onlinemmjcard.com'): () => void {
  if (periodicIntervalId) {
    clearInterval(periodicIntervalId);
  }

  // Initial immediate generation
  const initialXml = generateSitemapXml(baseUrl);
  saveSitemapLocally(initialXml);

  // Periodic crawl
  periodicIntervalId = setInterval(() => {
    const freshXml = generateSitemapXml(baseUrl);
    saveSitemapLocally(freshXml);
  }, intervalMs);

  return () => {
    if (periodicIntervalId) {
      clearInterval(periodicIntervalId);
      periodicIntervalId = null;
    }
  };
}


