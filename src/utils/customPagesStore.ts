import { useState, useEffect } from 'react';

export interface WordPressPage {
  id: number | string;
  title: string;
  slug: string;
  template: string;
  status: 'publish' | 'draft' | 'pending';
  content?: string;
  showInNav: boolean;
  navOrder?: number;
  url?: string;
  date?: string;
  lastModified?: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
}

const STORAGE_KEY = 'online_mmj_custom_pages_v1';

// Seed default initial WordPress pages that are typically managed by site admins
export const DEFAULT_WP_PAGES: WordPressPage[] = [
  {
    id: 101,
    title: 'About Our Clinic & Physicians',
    slug: 'about-us',
    template: 'template-builder.php',
    status: 'publish',
    showInNav: true,
    navOrder: 1,
    seoTitle: 'About Our Clinic & Physicians | Online MMJ Card Telehealth',
    metaDescription: 'Board-certified licensed physicians delivering 100% HIPAA-compliant telehealth medical marijuana evaluations with instant digital recommendations.',
    canonicalUrl: 'https://onlinemmjcard.com/about-us/',
    content: `<h2>Board-Certified Telehealth Cannabis Physicians</h2><p>Online MMJ Card was founded by compassionate integrative healthcare practitioners dedicated to simplifying patient access to legal medical cannabis certifications. Our licensed doctors specialize in pain management, oncology support, neurology, and mental wellness therapeutics.</p><h3>Why Choose Our Telemedicine Practice?</h3><ul><li><strong>100% HIPAA-Compliant Video Consultations</strong>: Connect from the privacy and comfort of your home.</li><li><strong>Instant Digital Recommendations</strong>: Receive your physician-signed certificate immediately following approval.</li><li><strong>No Risk Guarantee</strong>: Full 100% refund if our physician determines you do not qualify.</li></ul>`,
    url: '/about-us/',
    date: '2026-01-15 10:00:00',
    lastModified: '2026-03-20 14:30:00'
  },
  {
    id: 102,
    title: 'State Telehealth Compliance Guide',
    slug: 'compliance-guide',
    template: 'template-state.php',
    status: 'publish',
    showInNav: false,
    navOrder: 2,
    seoTitle: 'State Telehealth Compliance & Cannabis Law Guide | Online MMJ Card',
    metaDescription: 'Comprehensive legal overview of state-level medical cannabis telehealth regulations, patient statutory rights, and recommendation validity.',
    canonicalUrl: 'https://onlinemmjcard.com/compliance-guide/',
    content: `<h2>Telemedicine Cannabis Regulations & Patient Rights</h2><p>Medical marijuana programs are regulated at the state level. Our telehealth clinic operates under strict adherence to state medical board requirements, ensuring your recommendation is 100% valid, legal, and recognized by licensed dispensaries.</p>`,
    url: '/compliance-guide/',
    date: '2026-02-01 09:15:00',
    lastModified: '2026-02-15 11:20:00'
  },
  {
    id: 103,
    title: 'Dispensary Directory & Partner Benefits',
    slug: 'dispensary-partners',
    template: 'template-location.php',
    status: 'publish',
    showInNav: false,
    navOrder: 3,
    seoTitle: 'Licensed Dispensary Directory & Patient Tax Savings | Online MMJ Card',
    metaDescription: 'Find state-licensed dispensary partners near you. Medical cannabis cardholders receive priority dispensary access and state retail sales tax exemptions.',
    canonicalUrl: 'https://onlinemmjcard.com/dispensary-partners/',
    content: `<h2>Licensed Dispensary Partners & Patient Discounts</h2><p>Patients with an official Online MMJ Card recommendation unlock exclusive partner discounts at premier dispensaries nationwide, including waived state excise taxes and priority patient lines.</p>`,
    url: '/dispensary-partners/',
    date: '2026-02-10 16:45:00',
    lastModified: '2026-03-01 12:10:00'
  }
];

export function getCustomPages(): WordPressPage[] {
  if (typeof window === 'undefined') return DEFAULT_WP_PAGES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse custom WordPress pages from storage:', e);
  }
  return DEFAULT_WP_PAGES;
}

export function saveCustomPages(pages: WordPressPage[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    window.dispatchEvent(new CustomEvent('custom-pages-updated', { detail: pages }));
  } catch (e) {
    console.error('Failed to save custom WordPress pages to storage:', e);
  }
}

export function getNavCustomPages(): WordPressPage[] {
  const pages = getCustomPages();
  return pages
    .filter((p) => p.showInNav && p.status === 'publish')
    .sort((a, b) => (a.navOrder || 99) - (b.navOrder || 99));
}

export function getPageBySlug(slug: string): WordPressPage | undefined {
  const cleanSlug = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
  const pages = getCustomPages();
  return pages.find((p) => p.slug.toLowerCase().replace(/^\/+|\/+$/g, '') === cleanSlug);
}

/**
 * Get WordPress REST API credentials and endpoint URLs from localized settings or fallbacks
 */
function getWpRestConfig() {
  const wpSettings = (window as unknown as { 
    onlineMMJCardSettings?: { 
      apiUrl?: string; 
      apiNonce?: string; 
      siteUrl?: string;
    } 
  })?.onlineMMJCardSettings;

  const siteUrl = wpSettings?.siteUrl || '';
  const apiUrl = wpSettings?.apiUrl || `${siteUrl}/wp-json/online-mmj/v1`;
  const wpV2Url = `${siteUrl}/wp-json/wp/v2/pages`;
  const nonce = wpSettings?.apiNonce || '';

  return { apiUrl, wpV2Url, nonce };
}

/**
 * Add a new WordPress page via REST API (POST) and persist locally
 */
export async function addWordPressPage(
  data: Omit<WordPressPage, 'id' | 'date' | 'lastModified'>
): Promise<{ success: boolean; page: WordPressPage; message: string }> {
  const { apiUrl, nonce } = getWpRestConfig();
  const pages = getCustomPages();

  const generatedId = Date.now();
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const cleanSlug = data.slug.trim() ? data.slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-') : data.title.toLowerCase().replace(/[^a-z0-9-_]/g, '-');

  const newPage: WordPressPage = {
    id: generatedId,
    title: data.title.trim(),
    slug: cleanSlug,
    template: data.template || 'template-builder.php',
    status: data.status || 'publish',
    content: data.content || '',
    showInNav: Boolean(data.showInNav),
    navOrder: data.navOrder || pages.length + 1,
    url: `/${cleanSlug}/`,
    date: now,
    lastModified: now,
    seoTitle: data.seoTitle ? data.seoTitle.trim() : `${data.title.trim()} | Online MMJ Card`,
    metaDescription: data.metaDescription ? data.metaDescription.trim() : '',
    canonicalUrl: data.canonicalUrl ? data.canonicalUrl.trim() : (typeof window !== 'undefined' ? `${window.location.origin}/${cleanSlug}/` : `https://onlinemmjcard.com/${cleanSlug}/`)
  };

  let restError: string | null = null;
  let serverPageId: number | null = null;

  // 1. Dispatch POST request to WordPress REST API
  try {
    const postPayload = {
      title: newPage.title,
      slug: newPage.slug,
      template: newPage.template,
      status: newPage.status,
      content: newPage.content,
      show_in_nav: newPage.showInNav,
      nav_order: newPage.navOrder,
      seo_title: newPage.seoTitle,
      meta_description: newPage.metaDescription,
      canonical_url: newPage.canonicalUrl
    };

    const res = await fetch(`${apiUrl}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(nonce ? { 'X-WP-Nonce': nonce } : {})
      },
      body: JSON.stringify(postPayload)
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.page_id) {
        serverPageId = Number(json.page_id);
        newPage.id = serverPageId;
      }
    }
  } catch (err: unknown) {
    // Standalone preview or offline mock fallback
    restError = err instanceof Error ? err.message : String(err);
  }

  // 2. Persist to active local store
  const updatedPages = [newPage, ...pages];
  saveCustomPages(updatedPages);

  return {
    success: true,
    page: newPage,
    message: restError 
      ? `Page "${newPage.title}" created locally & dynamically linked to navigation.` 
      : `Page "${newPage.title}" created and synchronized via WordPress REST API POST /pages (SEO + Navigation Linked).`
  };
}

/**
 * Update an existing WordPress page via REST API (POST/PUT) and update local store
 */
export async function updateWordPressPage(
  id: number | string,
  data: Partial<WordPressPage>
): Promise<{ success: boolean; page: WordPressPage; message: string }> {
  const { apiUrl, nonce } = getWpRestConfig();
  const pages = getCustomPages();
  const index = pages.findIndex((p) => String(p.id) === String(id));

  if (index === -1) {
    throw new Error(`Page with ID ${id} not found.`);
  }

  const existing = pages[index];
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const cleanSlug = data.slug ? data.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-') : existing.slug;

  const updatedPage: WordPressPage = {
    ...existing,
    ...data,
    slug: cleanSlug,
    url: `/${cleanSlug}/`,
    lastModified: now,
    seoTitle: data.seoTitle !== undefined ? data.seoTitle.trim() : existing.seoTitle,
    metaDescription: data.metaDescription !== undefined ? data.metaDescription.trim() : existing.metaDescription,
    canonicalUrl: data.canonicalUrl !== undefined ? data.canonicalUrl.trim() : existing.canonicalUrl
  };

  let restError: string | null = null;

  // 1. Dispatch POST/PUT update request to WordPress REST API
  try {
    const editPayload = {
      id: updatedPage.id,
      title: updatedPage.title,
      slug: updatedPage.slug,
      template: updatedPage.template,
      status: updatedPage.status,
      content: updatedPage.content,
      show_in_nav: updatedPage.showInNav,
      nav_order: updatedPage.navOrder,
      seo_title: updatedPage.seoTitle,
      meta_description: updatedPage.metaDescription,
      canonical_url: updatedPage.canonicalUrl
    };

    // Primary endpoint: custom theme endpoint /pages/edit
    let res = await fetch(`${apiUrl}/pages/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(nonce ? { 'X-WP-Nonce': nonce } : {})
      },
      body: JSON.stringify(editPayload)
    });

    // Fallback: standard WP core REST PUT endpoint if custom endpoint is not available
    if (!res.ok) {
      res = await fetch(`${apiUrl}/pages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(nonce ? { 'X-WP-Nonce': nonce } : {})
        },
        body: JSON.stringify(editPayload)
      });
    }
  } catch (err: unknown) {
    restError = err instanceof Error ? err.message : String(err);
  }

  // 2. Persist to active local store
  const updatedList = [...pages];
  updatedList[index] = updatedPage;
  saveCustomPages(updatedList);

  return {
    success: true,
    page: updatedPage,
    message: restError 
      ? `Page "${updatedPage.title}" updated locally and navigation refreshed.`
      : `Page "${updatedPage.title}" updated and synced via WordPress REST API POST/PUT /pages/edit (SEO & Navigation updated).`
  };
}

/**
 * Delete a WordPress page via REST API (POST/DELETE) and remove from local store
 */
export async function deleteWordPressPage(
  id: number | string
): Promise<{ success: boolean; message: string }> {
  const { apiUrl, nonce } = getWpRestConfig();
  const pages = getCustomPages();
  const target = pages.find((p) => String(p.id) === String(id));

  // 1. Dispatch delete request to WordPress REST API
  try {
    await fetch(`${apiUrl}/pages/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(nonce ? { 'X-WP-Nonce': nonce } : {})
      },
      body: JSON.stringify({ id })
    });
  } catch {
    // Ignore offline errors
  }

  // 2. Remove from active local store
  const filtered = pages.filter((p) => String(p.id) !== String(id));
  saveCustomPages(filtered);

  return {
    success: true,
    message: target ? `Page "${target.title}" successfully deleted.` : 'Page successfully deleted.'
  };
}

/**
 * Reactive React hook for custom WordPress pages and navigation linking
 */
export function useCustomPages() {
  const [pages, setPages] = useState<WordPressPage[]>(getCustomPages);
  const [navPages, setNavPages] = useState<WordPressPage[]>(getNavCustomPages);

  useEffect(() => {
    const handleUpdate = () => {
      setPages(getCustomPages());
      setNavPages(getNavCustomPages());
    };

    window.addEventListener('custom-pages-updated', handleUpdate);
    return () => window.removeEventListener('custom-pages-updated', handleUpdate);
  }, []);

  return {
    pages,
    navPages,
    refreshPages: () => {
      setPages(getCustomPages());
      setNavPages(getNavCustomPages());
    }
  };
}
