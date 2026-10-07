export interface ThemeStyles {
  primaryColor: string;
  primaryHoverColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontLabel: string;
}

export const FONT_OPTIONS = [
  { label: 'Open Sans (Default Clean)', value: "'Open Sans', sans-serif", googleFont: 'Open+Sans:ital,wght@0,300..800;1,300..800' },
  { label: 'Inter (Modern Tech)', value: "'Inter', sans-serif", googleFont: 'Inter:wght@300;400;500;600;700;800' },
  { label: 'Plus Jakarta Sans (Medical Modern)', value: "'Plus Jakarta Sans', sans-serif", googleFont: 'Plus+Jakarta+Sans:wght@300;400;500;600;700;800' },
  { label: 'Poppins (Friendly & Bold)', value: "'Poppins', sans-serif", googleFont: 'Poppins:wght@300;400;500;600;700;800' },
  { label: 'Roboto (Clinical Standard)', value: "'Roboto', sans-serif", googleFont: 'Roboto:wght@300;400;500;700;900' },
  { label: 'Montserrat (Geometric Authority)', value: "'Montserrat', sans-serif", googleFont: 'Montserrat:wght@300;400;500;600;700;800' },
  { label: 'Merriweather (Editorial Serif)', value: "'Merriweather', serif", googleFont: 'Merriweather:wght@300;400;700' },
  { label: 'System Native (Zero Network)', value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", googleFont: '' }
];

export const THEME_PRESETS: { name: string; styles: ThemeStyles }[] = [
  {
    name: 'Emerald Health (Default)',
    styles: {
      primaryColor: '#008f58',
      primaryHoverColor: '#007a4a',
      secondaryColor: '#065f46',
      accentColor: '#f97316',
      fontFamily: "'Open Sans', sans-serif",
      fontLabel: 'Open Sans (Default Clean)'
    }
  },
  {
    name: 'Medical Navy & Cyan',
    styles: {
      primaryColor: '#0284c7',
      primaryHoverColor: '#0369a1',
      secondaryColor: '#0f172a',
      accentColor: '#10b981',
      fontFamily: "'Inter', sans-serif",
      fontLabel: 'Inter (Modern Tech)'
    }
  },
  {
    name: 'Botanical Sage & Amber',
    styles: {
      primaryColor: '#15803d',
      primaryHoverColor: '#166534',
      secondaryColor: '#14532d',
      accentColor: '#d97706',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontLabel: 'Plus Jakarta Sans (Medical Modern)'
    }
  },
  {
    name: 'Teal Telehealth & Coral',
    styles: {
      primaryColor: '#0d9488',
      primaryHoverColor: '#0f766e',
      secondaryColor: '#134e4a',
      accentColor: '#f43f5e',
      fontFamily: "'Poppins', sans-serif",
      fontLabel: 'Poppins (Friendly & Bold)'
    }
  },
  {
    name: 'High-Potency Purple',
    styles: {
      primaryColor: '#7c3aed',
      primaryHoverColor: '#6d28d9',
      secondaryColor: '#4c1d95',
      accentColor: '#10b981',
      fontFamily: "'Montserrat', sans-serif",
      fontLabel: 'Montserrat (Geometric Authority)'
    }
  }
];

export const DEFAULT_THEME_STYLES: ThemeStyles = {
  primaryColor: '#008f58',
  primaryHoverColor: '#007a4a',
  secondaryColor: '#065f46',
  accentColor: '#f97316',
  fontFamily: "'Open Sans', sans-serif",
  fontLabel: 'Open Sans (Default Clean)'
};

const STORAGE_KEY = 'online_mmj_theme_styles_v1';
const DYNAMIC_STYLE_ID = 'online-mmj-dynamic-theme-styles';
const GOOGLE_FONT_LINK_ID = 'online-mmj-dynamic-google-font';

export function getThemeStyles(): ThemeStyles {
  if (typeof window === 'undefined') return DEFAULT_THEME_STYLES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_THEME_STYLES,
        ...parsed
      };
    }
  } catch (e) {
    console.error('Failed to load theme styles:', e);
  }
  return DEFAULT_THEME_STYLES;
}

export function saveThemeStyles(styles: ThemeStyles): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(styles));
    applyThemeStyles(styles);
    window.dispatchEvent(new CustomEvent('theme-styles-updated', { detail: styles }));
  } catch (e) {
    console.error('Failed to save theme styles:', e);
  }
}

export function resetThemeStyles(): ThemeStyles {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    applyThemeStyles(DEFAULT_THEME_STYLES);
    window.dispatchEvent(new CustomEvent('theme-styles-updated', { detail: DEFAULT_THEME_STYLES }));
  }
  return DEFAULT_THEME_STYLES;
}

/**
 * Injects Google Fonts stylesheet if necessary and updates dynamic CSS custom properties
 * and Tailwind utility classes across the application.
 */
export function applyThemeStyles(styles: ThemeStyles = getThemeStyles()): void {
  if (typeof document === 'undefined') return;

  // 1. Load Google Font if needed
  const selectedFontOption = FONT_OPTIONS.find((f) => f.value === styles.fontFamily);
  if (selectedFontOption && selectedFontOption.googleFont) {
    let fontLink = document.getElementById(GOOGLE_FONT_LINK_ID) as HTMLLinkElement | null;
    const fontHref = `https://fonts.googleapis.com/css2?family=${selectedFontOption.googleFont}&display=swap`;
    if (!fontLink) {
      fontLink = document.createElement('link');
      fontLink.id = GOOGLE_FONT_LINK_ID;
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }
    if (fontLink.href !== fontHref) {
      fontLink.href = fontHref;
    }
  }

  // 2. Inject or update CSS stylesheet for CSS variables and Tailwind classes
  let styleEl = document.getElementById(DYNAMIC_STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = DYNAMIC_STYLE_ID;
    document.head.appendChild(styleEl);
  }

  // Generate dynamic CSS overrides for colors and typography
  styleEl.textContent = `
    :root {
      --color-brand-primary: ${styles.primaryColor};
      --color-brand-primary-hover: ${styles.primaryHoverColor};
      --color-brand-secondary: ${styles.secondaryColor};
      --color-brand-accent: ${styles.accentColor};
      --font-family-global: ${styles.fontFamily};
    }

    body, html, #root, #online-mmj-card-root {
      font-family: ${styles.fontFamily} !important;
    }

    /* Primary color overrides */
    .bg-\\[\\#008f58\\],
    .bg-\\[\\#16a34a\\],
    .bg-\\[\\#15803d\\] {
      background-color: ${styles.primaryColor} !important;
    }

    .hover\\:bg-\\[\\#007a4a\\]:hover,
    .hover\\:bg-\\[\\#15803d\\]:hover,
    .hover\\:bg-\\[\\#166534\\]:hover {
      background-color: ${styles.primaryHoverColor} !important;
    }

    .text-\\[\\#008f58\\],
    .text-\\[\\#16a34a\\],
    .text-\\[\\#15803d\\] {
      color: ${styles.primaryColor} !important;
    }

    .hover\\:text-\\[\\#16a34a\\]:hover,
    .hover\\:text-\\[\\#008f58\\]:hover {
      color: ${styles.primaryHoverColor} !important;
    }

    .border-\\[\\#008f58\\],
    .border-\\[\\#16a34a\\] {
      border-color: ${styles.primaryColor} !important;
    }

    /* Accent color overrides (Orange badges, highlight pills) */
    .bg-\\[\\#f97316\\] {
      background-color: ${styles.accentColor} !important;
    }
    .text-\\[\\#f97316\\] {
      color: ${styles.accentColor} !important;
    }

    /* Secondary brand color */
    .online-mmj-secondary {
      background-color: ${styles.secondaryColor} !important;
    }
  `;
}
