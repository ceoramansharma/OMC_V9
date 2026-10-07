import { useState, useEffect } from 'react';

export interface ThemeContent {
  hero: {
    badgeText: string;
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    subheading: string;
    statePickerButtonText: string;
    formTitle: string;
    formPriceSubtext: string;
    formButtonText: string;
    trustBadge1Title: string;
    trustBadge1Sub: string;
    trustBadge2Title: string;
    trustBadge2Sub: string;
    trustBadge3Title: string;
    trustBadge3Sub: string;
  };
  trustStats: {
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  howItWorks: {
    badgeText: string;
    heading: string;
    subheading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  services: {
    badgeText: string;
    heading: string;
    subheading: string;
  };
  benefits: {
    heading: string;
    subheading: string;
    taxSavingsPercent: string;
    possessionMultiplier: string;
    minAge: string;
  };
  cities: {
    badgeText: string;
    heading: string;
    subheading: string;
  };
  conditions: {
    badgeText: string;
    heading: string;
    subheading: string;
  };
  pricing: {
    badgeText: string;
    heading: string;
    subheading: string;
  };
  whyTrust: {
    heading: string;
    quote: string;
    subheading: string;
  };
  reviews: {
    heading: string;
    ratingScore: string;
    reviewCount: string;
  };
  faq: {
    heading: string;
    subheading: string;
  };
  footer: {
    phone: string;
    hours: string;
    copyrightText: string;
    disclaimerText: string;
  };
}

export const DEFAULT_THEME_CONTENT: ThemeContent = {
  hero: {
    badgeText: '#1 Telehealth MMJ Doctor & 420 Evaluations Clinic',
    headingPrefix: 'Apply For Your',
    headingHighlight: 'Medical Marijuana Card Online',
    headingSuffix: 'with a Licensed MMJ Doctor',
    subheading: 'Get certified fast with legal, HIPAA-compliant 420 evaluations and nationwide medical marijuana evaluations. Connect 100% online with a compassionate MMJ doctor for your new or renewal medical cannabis card in under 15 minutes.',
    statePickerButtonText: 'CHOOSE STATE',
    formTitle: 'BOOK YOUR MMJ EVALUATION',
    formPriceSubtext: 'Evaluation fee starts at',
    formButtonText: 'CONTINUE TO DOCTOR EVALUATION',
    trustBadge1Title: '100% Legal',
    trustBadge1Sub: 'State Certified',
    trustBadge2Title: 'No Risk Policy',
    trustBadge2Sub: '100% Refund',
    trustBadge3Title: 'Fast Process',
    trustBadge3Sub: 'Same-Day Cert'
  },
  trustStats: {
    stat1Value: '99.2%',
    stat1Label: 'Approval Guarantee',
    stat2Value: '15 Mins',
    stat2Label: 'Turnaround Time',
    stat3Value: '50,000+',
    stat3Label: 'Certified Patients',
    stat4Value: '100% HIPAA',
    stat4Label: 'Compliant & Private'
  },
  howItWorks: {
    badgeText: 'Simple 3-Step Process',
    heading: 'How to Get Your Medical Marijuana Card Online',
    subheading: 'From start to approval in under 15 minutes with our licensed telehealth physicians.',
    step1Title: '1. Fill Out Quick Intake',
    step1Desc: 'Complete our secure 3-minute medical questionnaire from any smartphone or computer.',
    step2Title: '2. Consult With Doctor',
    step2Desc: 'Connect with a compassionate, state-licensed MMJ physician via private video telehealth.',
    step3Title: '3. Instant Recommendation',
    step3Desc: 'Receive your official doctor certificate immediately via email for dispensary purchases.'
  },
  services: {
    badgeText: 'Official 420 Evaluations & MMJ Doctor Services',
    heading: 'Medical Marijuana Card & 420 Telehealth Evaluations',
    subheading: '100% online medical marijuana evaluations with licensed MMJ doctors. Rapid medical cannabis card approvals and instant digital recommendation letters.'
  },
  benefits: {
    heading: 'Medical Marijuana Card vs. Recreational Cannabis',
    subheading: 'Why smart patients keep their legal medical card even in adult-use states.',
    taxSavingsPercent: 'Up to 38%',
    possessionMultiplier: '8x Higher',
    minAge: '18+ Eligible'
  },
  cities: {
    badgeText: 'California Telehealth Coverage · 100% Online Consultations',
    heading: 'Where Our California Doctors Provide Care',
    subheading: 'Connect directly with our California-licensed physicians from the privacy of your home. We provide legal medical marijuana evaluations, renewals, and same-day digital certificates across California cities.'
  },
  conditions: {
    badgeText: 'Pre-Qualification Check',
    heading: 'Common Qualifying Conditions for an MMJ Card',
    subheading: 'State medical marijuana programs authorize licensed doctors to recommend medical cannabis for a wide variety of diagnosed conditions and symptoms.'
  },
  pricing: {
    badgeText: 'Transparent Pricing',
    heading: 'Simple, All-Inclusive Evaluation Packages',
    subheading: 'No recurring monthly charges. No hidden telehealth clinic fees. 100% money back if not approved.'
  },
  whyTrust: {
    heading: 'Why Patients Trust Online MMJ Card',
    quote: '"We deliver MMJ evaluations you can trust and a patient experience you will remember."',
    subheading: 'From your consultation to your recommendation, Online MMJ Card puts you first. We combine expert medical knowledge with compassionate care to deliver an MMJ consultation you can truly depend on.'
  },
  reviews: {
    heading: 'Trusted by Over 50,000 Patients Nationwide',
    ratingScore: '4.9',
    reviewCount: '14,250+'
  },
  faq: {
    heading: 'Frequently Asked Questions',
    subheading: 'Everything you need to know about getting your medical marijuana card online.'
  },
  footer: {
    phone: '(888) 420-6789',
    hours: 'Open 7 Days · 8:00 AM - 10:00 PM EST',
    copyrightText: '© 2026 Online MMJ Card Telehealth Inc. All rights reserved.',
    disclaimerText: 'Medical Disclaimer: Online MMJ Card connects patients with state-licensed physicians for medical cannabis evaluations in accordance with applicable state laws. Website content is for informational purposes only and does not constitute medical advice.'
  }
};

const THEME_CONTENT_KEY = 'online_mmj_theme_content_v1';

export function getThemeContent(): ThemeContent {
  if (typeof window === 'undefined') return DEFAULT_THEME_CONTENT;
  
  // 1. Check window.onlineMMJCardSettings passed from WordPress backend
  const wpSettings = (window as unknown as { onlineMMJCardSettings?: { themeContent?: Partial<ThemeContent> } })?.onlineMMJCardSettings;
  const wpContent = wpSettings?.themeContent;

  try {
    const raw = localStorage.getItem(THEME_CONTENT_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      ...DEFAULT_THEME_CONTENT,
      ...(wpContent || {}),
      ...(parsed || {}),
      hero: { ...DEFAULT_THEME_CONTENT.hero, ...(wpContent?.hero || {}), ...(parsed?.hero || {}) },
      trustStats: { ...DEFAULT_THEME_CONTENT.trustStats, ...(wpContent?.trustStats || {}), ...(parsed?.trustStats || {}) },
      howItWorks: { ...DEFAULT_THEME_CONTENT.howItWorks, ...(wpContent?.howItWorks || {}), ...(parsed?.howItWorks || {}) },
      services: { ...DEFAULT_THEME_CONTENT.services, ...(wpContent?.services || {}), ...(parsed?.services || {}) },
      benefits: { ...DEFAULT_THEME_CONTENT.benefits, ...(wpContent?.benefits || {}), ...(parsed?.benefits || {}) },
      cities: { ...DEFAULT_THEME_CONTENT.cities, ...(wpContent?.cities || {}), ...(parsed?.cities || {}) },
      conditions: { ...DEFAULT_THEME_CONTENT.conditions, ...(wpContent?.conditions || {}), ...(parsed?.conditions || {}) },
      pricing: { ...DEFAULT_THEME_CONTENT.pricing, ...(wpContent?.pricing || {}), ...(parsed?.pricing || {}) },
      whyTrust: { ...DEFAULT_THEME_CONTENT.whyTrust, ...(wpContent?.whyTrust || {}), ...(parsed?.whyTrust || {}) },
      reviews: { ...DEFAULT_THEME_CONTENT.reviews, ...(wpContent?.reviews || {}), ...(parsed?.reviews || {}) },
      faq: { ...DEFAULT_THEME_CONTENT.faq, ...(wpContent?.faq || {}), ...(parsed?.faq || {}) },
      footer: { ...DEFAULT_THEME_CONTENT.footer, ...(wpContent?.footer || {}), ...(parsed?.footer || {}) },
    };
  } catch (e) {
    console.error('Failed to parse theme content:', e);
    return DEFAULT_THEME_CONTENT;
  }
}

export function saveThemeContent(content: ThemeContent): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_CONTENT_KEY, JSON.stringify(content));
    window.dispatchEvent(new CustomEvent('theme-content-updated', { detail: content }));

    // Sync to WordPress backend if API is available
    const wpSettings = (window as unknown as { onlineMMJCardSettings?: { apiUrl?: string; apiNonce?: string } })?.onlineMMJCardSettings;
    if (wpSettings?.apiUrl) {
      fetch(`${wpSettings.apiUrl}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': wpSettings.apiNonce || ''
        },
        body: JSON.stringify(content)
      }).catch((err) => console.log('WordPress backend content sync:', err));
    }
  } catch (e) {
    console.error('Failed to save theme content:', e);
  }
}

export function resetThemeContent(): ThemeContent {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(THEME_CONTENT_KEY);
    window.dispatchEvent(new CustomEvent('theme-content-updated', { detail: DEFAULT_THEME_CONTENT }));
  }
  return DEFAULT_THEME_CONTENT;
}

export interface SectionToggles {
  hero: boolean;
  trustStats: boolean;
  howItWorks: boolean;
  stateDirectory: boolean;
  benefits: boolean;
  services: boolean;
  cities: boolean;
  conditions: boolean;
  blogTeaser: boolean;
  reciprocity: boolean;
  pricing: boolean;
  doctors: boolean;
  whyTrust: boolean;
  reviews: boolean;
  seoContent: boolean;
  faq: boolean;
}

export const DEFAULT_SECTION_TOGGLES: SectionToggles = {
  hero: true,
  trustStats: true,
  howItWorks: true,
  stateDirectory: true,
  benefits: true,
  services: true,
  cities: true,
  conditions: true,
  blogTeaser: true,
  reciprocity: true,
  pricing: true,
  doctors: true,
  whyTrust: true,
  reviews: true,
  seoContent: true,
  faq: true,
};

export const SECTION_TOGGLES_KEY = 'online_mmj_section_toggles_v1';

export function getSectionToggles(): SectionToggles {
  if (typeof window === 'undefined') return DEFAULT_SECTION_TOGGLES;

  const wpSettings = (window as unknown as { onlineMMJCardSettings?: { sectionToggles?: Partial<SectionToggles> } })?.onlineMMJCardSettings;
  const wpToggles = wpSettings?.sectionToggles;

  try {
    const raw = localStorage.getItem(SECTION_TOGGLES_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      ...DEFAULT_SECTION_TOGGLES,
      ...(wpToggles || {}),
      ...(parsed || {})
    };
  } catch (e) {
    return DEFAULT_SECTION_TOGGLES;
  }
}

export function saveSectionToggles(toggles: SectionToggles): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SECTION_TOGGLES_KEY, JSON.stringify(toggles));
    window.dispatchEvent(new CustomEvent('section-toggles-updated', { detail: toggles }));

    // Sync to WordPress REST API bridge
    const wpSettings = (window as unknown as { onlineMMJCardSettings?: { apiUrl?: string; apiNonce?: string } })?.onlineMMJCardSettings;
    const apiUrl = wpSettings?.apiUrl || '/wp-json/online-mmj/v1';
    fetch(`${apiUrl}/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpSettings?.apiNonce || ''
      },
      body: JSON.stringify({ sectionToggles: toggles })
    }).catch(() => {
      // Offline preview fallback
    });
  } catch (e) {
    console.error('Failed to save section toggles:', e);
  }
}

export function toggleSection(sectionKey: keyof SectionToggles, enabled?: boolean): void {
  const current = getSectionToggles();
  const nextValue = enabled !== undefined ? enabled : !current[sectionKey];
  const updated = {
    ...current,
    [sectionKey]: nextValue
  };
  saveSectionToggles(updated);
}

/**
 * React Hook for reactive section visibility toggles
 */
export function useSectionToggles(): {
  toggles: SectionToggles;
  setToggles: (t: SectionToggles) => void;
  toggleSection: (key: keyof SectionToggles, enabled?: boolean) => void;
} {
  const [toggles, setTogglesState] = useState<SectionToggles>(getSectionToggles);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<SectionToggles>;
      if (customEvent.detail) {
        setTogglesState(customEvent.detail);
      } else {
        setTogglesState(getSectionToggles());
      }
    };

    window.addEventListener('section-toggles-updated', handleUpdate);
    return () => window.removeEventListener('section-toggles-updated', handleUpdate);
  }, []);

  const setToggles = (newToggles: SectionToggles) => {
    saveSectionToggles(newToggles);
    setTogglesState(newToggles);
  };

  const handleToggle = (key: keyof SectionToggles, enabled?: boolean) => {
    toggleSection(key, enabled);
    setTogglesState(getSectionToggles());
  };

  return {
    toggles,
    setToggles,
    toggleSection: handleToggle
  };
}

/**
 * React Hook for automatic reactive subscription to WordPress and Theme content updates
 */
export function useThemeContent(): ThemeContent {
  const [content, setContent] = useState<ThemeContent>(getThemeContent);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeContent>;
      if (customEvent.detail) {
        setContent(customEvent.detail);
      } else {
        setContent(getThemeContent());
      }
    };

    window.addEventListener('theme-content-updated', handleUpdate);
    return () => window.removeEventListener('theme-content-updated', handleUpdate);
  }, []);

  return content;
}
