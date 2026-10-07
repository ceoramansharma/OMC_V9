import { LOCAL_CITIES_DATA, LocalCityData } from '../data/localSeoData';
import { STATES_DATA, StateInfo, SERVICES_DATA, ServiceItem, QUALIFYING_CONDITIONS, ConditionItem } from '../data/mmjData';
import { BLOG_ARTICLES_DATA, BlogArticle } from '../data/blogArticlesData';

const STORAGE_KEY = 'online_mmj_custom_route_content_v1';

export interface RouteContentOverrides {
  cities: Record<string, Partial<LocalCityData>>;
  states: Record<string, Partial<StateInfo>>;
  services: Record<string, Partial<ServiceItem>>;
  conditions: Record<string, Partial<ConditionItem>>;
  articles: Record<string, Partial<BlogArticle>>;
}

function loadOverrides(): RouteContentOverrides {
  if (typeof window === 'undefined') {
    return { cities: {}, states: {}, services: {}, conditions: {}, articles: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        cities: parsed.cities || {},
        states: parsed.states || {},
        services: parsed.services || {},
        conditions: parsed.conditions || {},
        articles: parsed.articles || {},
      };
    }
  } catch (e) {
    console.error('Failed to load route overrides:', e);
  }
  return { cities: {}, states: {}, services: {}, conditions: {}, articles: {} };
}

function saveOverrides(overrides: RouteContentOverrides) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new CustomEvent('route-content-updated', { detail: overrides }));
  } catch (e) {
    console.error('Failed to save route overrides:', e);
  }
}

let cachedOverrides = loadOverrides();

export function reloadRouteContentOverrides(): RouteContentOverrides {
  cachedOverrides = loadOverrides();
  return cachedOverrides;
}

export function getAllCities(): LocalCityData[] {
  return LOCAL_CITIES_DATA.map((city) => {
    const override = cachedOverrides.cities[city.slug];
    return override ? { ...city, ...override } : city;
  });
}

export function getCityBySlug(slug: string): LocalCityData | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim().replace(/^medical-marijuana-card-/, '').replace(/^medical-marijuana-doctor-/, '');
  const cleanNoState = clean.replace(/-[a-z]{2}$/i, '');

  const base = LOCAL_CITIES_DATA.find((c) => {
    const cClean = c.slug.toLowerCase().replace(/-[a-z]{2}$/i, '');
    const cName = c.cityName.toLowerCase().replace(/\s+/g, '-');
    return (
      c.slug.toLowerCase() === slug.toLowerCase() ||
      c.slug.toLowerCase() === clean ||
      cClean === clean ||
      cClean === cleanNoState ||
      cName === clean ||
      cName === cleanNoState
    );
  });
  if (!base) return undefined;
  const override = cachedOverrides.cities[base.slug] || cachedOverrides.cities[slug];
  return override ? { ...base, ...override } : base;
}

export function getAllStates(): StateInfo[] {
  return STATES_DATA.map((state) => {
    const override = cachedOverrides.states[state.id];
    return override ? { ...state, ...override } : state;
  });
}

export function getStateById(stateId: string): StateInfo | undefined {
  if (!stateId) return undefined;
  const clean = stateId.toLowerCase().trim().replace(/^medical-marijuana-card-/, '').replace(/^medical-marijuana-doctor-/, '').replace(/^state\//, '');
  const cleanHyphen = clean.replace(/\s+/g, '-');

  const base = STATES_DATA.find((s) => {
    const sId = s.id.toLowerCase();
    const sCode = s.code.toLowerCase();
    const sNameHyphen = s.name.toLowerCase().replace(/\s+/g, '-');
    const sNameClean = s.name.toLowerCase().replace(/[^a-z]/g, '');
    const cleanAlpha = clean.replace(/[^a-z]/g, '');
    return (
      sId === clean ||
      sId === cleanHyphen ||
      sCode === clean ||
      sNameHyphen === clean ||
      sNameHyphen === cleanHyphen ||
      sNameClean === cleanAlpha ||
      clean.startsWith(sId)
    );
  });
  if (!base) return undefined;
  const override = cachedOverrides.states[base.id] || cachedOverrides.states[stateId];
  return override ? { ...base, ...override } : base;
}

export function getAllServices(): ServiceItem[] {
  return SERVICES_DATA.map((service) => {
    const override = cachedOverrides.services[service.id];
    return override ? { ...service, ...override } : service;
  });
}

export function getServiceById(serviceId: string): ServiceItem | undefined {
  if (!serviceId) return undefined;
  const clean = serviceId.toLowerCase().trim().replace(/^service\//, '');
  const base = SERVICES_DATA.find((s) => {
    const sId = s.id.toLowerCase();
    return sId === clean || (clean === 'renewal' && sId === 'renewal') || (clean === 'cultivation' && sId === 'cultivation') || (clean === 'esa-letter' && sId === 'esa-letter');
  });
  if (!base) {
    // Check known service slugs
    if (clean === 'medical-marijuana-card-renewal' || clean === 'renewal') {
      return SERVICES_DATA.find((s) => s.id === 'renewal');
    }
    if (clean === '99-plant-cultivation-recommendation' || clean === 'cultivation') {
      return SERVICES_DATA.find((s) => s.id === 'cultivation');
    }
    if (clean === 'emotional-support-animal-letter' || clean === 'esa-letter' || clean === 'esa') {
      return SERVICES_DATA.find((s) => s.id === 'esa-letter');
    }
    if (clean === 'new-patient-medical-marijuana-card' || clean === 'new-patient') {
      return SERVICES_DATA.find((s) => s.id === 'new-patient');
    }
    return SERVICES_DATA[0];
  }
  const override = cachedOverrides.services[base.id] || cachedOverrides.services[serviceId];
  return override ? { ...base, ...override } : base;
}

export function getAllConditions(): ConditionItem[] {
  return QUALIFYING_CONDITIONS.map((cond) => {
    const override = cachedOverrides.conditions[cond.id];
    return override ? { ...cond, ...override } : cond;
  });
}

export function getConditionById(conditionId: string): ConditionItem | undefined {
  if (!conditionId) return undefined;
  const clean = conditionId.toLowerCase().trim().replace(/^condition\//, '').replace(/^medical-marijuana-for-/, '');
  const base = QUALIFYING_CONDITIONS.find((c) => {
    const cId = c.id.toLowerCase();
    const cName = c.name.toLowerCase().replace(/\s+/g, '-');
    return cId === clean || cId === clean.replace(/-+/g, '-') || cName.includes(clean);
  });
  if (!base) return undefined;
  const override = cachedOverrides.conditions[base.id] || cachedOverrides.conditions[conditionId];
  return override ? { ...base, ...override } : base;
}

export function getAllArticles(): BlogArticle[] {
  return BLOG_ARTICLES_DATA.map((article) => {
    const override = cachedOverrides.articles[article.slug] || cachedOverrides.articles[article.id];
    return override ? { ...article, ...override } : article;
  });
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  const base = BLOG_ARTICLES_DATA.find((a) => a.slug === slug || a.id === slug);
  if (!base) return undefined;
  const override = cachedOverrides.articles[slug] || cachedOverrides.articles[base.id];
  return override ? { ...base, ...override } : base;
}

// Live update mutations that update application state in real-time
export function updateCityContent(slug: string, updates: Partial<LocalCityData>) {
  cachedOverrides.cities[slug] = {
    ...(cachedOverrides.cities[slug] || {}),
    ...updates,
  };
  saveOverrides(cachedOverrides);
}

export function updateStateContent(stateId: string, updates: Partial<StateInfo>) {
  cachedOverrides.states[stateId] = {
    ...(cachedOverrides.states[stateId] || {}),
    ...updates,
  };
  saveOverrides(cachedOverrides);
}

export function updateServiceContent(serviceId: string, updates: Partial<ServiceItem>) {
  cachedOverrides.services[serviceId] = {
    ...(cachedOverrides.services[serviceId] || {}),
    ...updates,
  };
  saveOverrides(cachedOverrides);
}

export function updateConditionContent(conditionId: string, updates: Partial<ConditionItem>) {
  cachedOverrides.conditions[conditionId] = {
    ...(cachedOverrides.conditions[conditionId] || {}),
    ...updates,
  };
  saveOverrides(cachedOverrides);
}

export function updateArticleContent(slug: string, updates: Partial<BlogArticle>) {
  cachedOverrides.articles[slug] = {
    ...(cachedOverrides.articles[slug] || {}),
    ...updates,
  };
  saveOverrides(cachedOverrides);
}

export function resetRouteContent(category: 'city' | 'state' | 'service' | 'condition' | 'article', key: string) {
  if (category === 'city') delete cachedOverrides.cities[key];
  if (category === 'state') delete cachedOverrides.states[key];
  if (category === 'service') delete cachedOverrides.services[key];
  if (category === 'condition') delete cachedOverrides.conditions[key];
  if (category === 'article') delete cachedOverrides.articles[key];
  saveOverrides(cachedOverrides);
}

export function resetAllRouteContents() {
  cachedOverrides = { cities: {}, states: {}, services: {}, conditions: {}, articles: {} };
  saveOverrides(cachedOverrides);
}
