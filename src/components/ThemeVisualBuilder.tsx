import React, { useState, useEffect } from 'react';
import { 
  X, RotateCcw, LayoutTemplate, ShieldCheck, 
  HelpCircle, MessageSquare, Phone, ChevronDown, CheckCircle2,
  FileEdit, MapPin, Stethoscope, BookOpen, Sparkles, Save, Compass,
  Palette, Code2, Plus, Trash2, Check, Copy, ExternalLink, Building2, Eye
} from 'lucide-react';
import { 
  ThemeContent, 
  getThemeContent, 
  saveThemeContent, 
  resetThemeContent,
  useSectionToggles,
  SectionToggles,
  DEFAULT_SECTION_TOGGLES
} from '../utils/themeContent';
import { AppRoute } from '../utils/urlRouter';
import { 
  getAllCities, getCityBySlug, updateCityContent,
  getAllStates, getStateById, updateStateContent,
  getAllServices, getServiceById, updateServiceContent,
  getAllConditions, getConditionById, updateConditionContent,
  getAllArticles, getArticleBySlug, updateArticleContent,
  resetRouteContent
} from '../utils/routeContentStore';
import { 
  ThemeStyles, 
  getThemeStyles, 
  saveThemeStyles, 
  resetThemeStyles, 
  FONT_OPTIONS, 
  THEME_PRESETS, 
  applyThemeStyles 
} from '../utils/themeStyles';
import { 
  RouteSchemaConfig, 
  MedicalBusinessSchemaData,
  FAQItem, 
  getRouteKey, 
  getRouteSchemaConfig, 
  saveRouteSchemaConfig, 
  resetRouteSchemaConfig, 
  buildSchemaObjects 
} from '../utils/schemaStore';

interface ThemeVisualBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onContentChange?: (content: ThemeContent) => void;
  currentRoute?: AppRoute;
  onNavigateCity?: (slug: string) => void;
  onNavigateState?: (stateId: string) => void;
  onNavigateService?: (serviceId: string) => void;
  onNavigateCondition?: (conditionId: string) => void;
  onNavigateArticle?: (slug: string) => void;
  onNavigateHome?: () => void;
}

export const ThemeVisualBuilder: React.FC<ThemeVisualBuilderProps> = ({ 
  isOpen, 
  onClose,
  onContentChange,
  currentRoute = { type: 'home' },
  onNavigateCity,
  onNavigateState,
  onNavigateService,
  onNavigateCondition,
  onNavigateArticle,
  onNavigateHome
}) => {
  const [content, setContent] = useState<ThemeContent>(getThemeContent());
  const { toggles, toggleSection, setToggles } = useSectionToggles();
  const [activeTab, setActiveTab] = useState<'editor' | 'schemas' | 'styles' | 'toggles' | 'hero' | 'stats' | 'steps' | 'benefits' | 'reviews' | 'footer'>('editor');
  const [savedAlert, setSavedAlert] = useState(false);
  const [, setStoreTick] = useState(0);

  // Global Theme Styles state
  const [themeStyles, setThemeStyles] = useState<ThemeStyles>(getThemeStyles());

  // Dynamic Route SEO Schemas state
  const [schemaRouteKey, setSchemaRouteKey] = useState<string>(getRouteKey(currentRoute));
  const [schemaConfig, setSchemaConfig] = useState<RouteSchemaConfig>(getRouteSchemaConfig(getRouteKey(currentRoute)));
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [schemaEditorMode, setSchemaEditorMode] = useState<'structured' | 'raw'>('structured');
  const [rawJsonError, setRawJsonError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(getThemeContent());
      setThemeStyles(getThemeStyles());
      const rKey = getRouteKey(currentRoute);
      setSchemaRouteKey(rKey);
      setSchemaConfig(getRouteSchemaConfig(rKey));
    }
  }, [isOpen, currentRoute]);

  useEffect(() => {
    const handleUpdate = () => {
      setStoreTick((t) => t + 1);
    };
    const handleStylesUpdate = () => {
      setThemeStyles(getThemeStyles());
    };
    const handleSchemaUpdate = () => {
      setSchemaConfig(getRouteSchemaConfig(schemaRouteKey));
    };

    window.addEventListener('route-content-updated', handleUpdate);
    window.addEventListener('theme-styles-updated', handleStylesUpdate);
    window.addEventListener('route-schema-updated', handleSchemaUpdate);
    return () => {
      window.removeEventListener('route-content-updated', handleUpdate);
      window.removeEventListener('theme-styles-updated', handleStylesUpdate);
      window.removeEventListener('route-schema-updated', handleSchemaUpdate);
    };
  }, [schemaRouteKey]);

  if (!isOpen) return null;

  // Active route content dynamically fetched from reactive store
  const activeCity = currentRoute.type === 'city' ? getCityBySlug(currentRoute.slug) : undefined;
  const activeState = currentRoute.type === 'state' ? getStateById(currentRoute.stateId) : undefined;
  const activeService = currentRoute.type === 'service' ? getServiceById(currentRoute.serviceId) : undefined;
  const activeCondition = currentRoute.type === 'condition' ? getConditionById(currentRoute.conditionId) : undefined;
  const activeArticle = currentRoute.type === 'article' ? getArticleBySlug(currentRoute.articleSlug) : undefined;

  const handleFieldChange = (section: keyof ThemeContent, field: string, value: string) => {
    const updated = {
      ...content,
      [section]: {
        ...content[section],
        [field]: value
      }
    };
    setContent(updated);
    saveThemeContent(updated);
    if (onContentChange) onContentChange(updated);
  };

  const handleSave = () => {
    saveThemeContent(content);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  // Schema Handlers
  const handleSchemaRouteChange = (key: string) => {
    setSchemaRouteKey(key);
    const cfg = getRouteSchemaConfig(key);
    setSchemaConfig(cfg);
    setRawJsonError(null);
  };

  const handleMedicalBusinessChange = (field: keyof MedicalBusinessSchemaData, val: any) => {
    const updated: RouteSchemaConfig = {
      ...schemaConfig,
      medicalBusiness: {
        ...schemaConfig.medicalBusiness,
        [field]: val
      }
    };
    setSchemaConfig(updated);
    saveRouteSchemaConfig(schemaRouteKey, updated);
  };

  const handleFaqToggle = (enabled: boolean) => {
    const updated: RouteSchemaConfig = {
      ...schemaConfig,
      faqPage: {
        ...schemaConfig.faqPage,
        enabled
      }
    };
    setSchemaConfig(updated);
    saveRouteSchemaConfig(schemaRouteKey, updated);
  };

  const handleFaqItemChange = (idx: number, field: 'question' | 'answer', val: string) => {
    const newFaqs = [...schemaConfig.faqPage.faqs];
    newFaqs[idx] = { ...newFaqs[idx], [field]: val };
    const updated: RouteSchemaConfig = {
      ...schemaConfig,
      faqPage: {
        ...schemaConfig.faqPage,
        faqs: newFaqs
      }
    };
    setSchemaConfig(updated);
    saveRouteSchemaConfig(schemaRouteKey, updated);
  };

  const handleAddFaq = () => {
    const newFaqs = [
      ...schemaConfig.faqPage.faqs,
      { question: 'New Patient Question?', answer: 'Detailed clinical guidance and medical card policy.' }
    ];
    const updated: RouteSchemaConfig = {
      ...schemaConfig,
      faqPage: {
        ...schemaConfig.faqPage,
        faqs: newFaqs
      }
    };
    setSchemaConfig(updated);
    saveRouteSchemaConfig(schemaRouteKey, updated);
  };

  const handleRemoveFaq = (idx: number) => {
    const newFaqs = schemaConfig.faqPage.faqs.filter((_, i) => i !== idx);
    const updated: RouteSchemaConfig = {
      ...schemaConfig,
      faqPage: {
        ...schemaConfig.faqPage,
        faqs: newFaqs
      }
    };
    setSchemaConfig(updated);
    saveRouteSchemaConfig(schemaRouteKey, updated);
  };

  const handleCustomJsonToggle = (enabled: boolean) => {
    const currentSchemas = buildSchemaObjects(schemaConfig);
    const updated: RouteSchemaConfig = {
      ...schemaConfig,
      customJsonLd: {
        enabled,
        rawJson: schemaConfig.customJsonLd?.rawJson || JSON.stringify(currentSchemas.length === 1 ? currentSchemas[0] : currentSchemas, null, 2)
      }
    };
    setSchemaConfig(updated);
    saveRouteSchemaConfig(schemaRouteKey, updated);
  };

  const handleCustomJsonChange = (raw: string) => {
    try {
      JSON.parse(raw);
      setRawJsonError(null);
    } catch (e: any) {
      setRawJsonError(e.message || 'Invalid JSON syntax');
    }
    const updated: RouteSchemaConfig = {
      ...schemaConfig,
      customJsonLd: {
        enabled: true,
        rawJson: raw
      }
    };
    setSchemaConfig(updated);
    saveRouteSchemaConfig(schemaRouteKey, updated);
  };

  const handleCopySchema = () => {
    const schemas = buildSchemaObjects(schemaConfig);
    const text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
    navigator.clipboard?.writeText(text);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleResetSchema = () => {
    const def = resetRouteSchemaConfig(schemaRouteKey);
    setSchemaConfig(def);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  // Styles Handlers
  const handleStyleChange = (field: keyof ThemeStyles, val: string) => {
    const updated = { ...themeStyles, [field]: val };
    setThemeStyles(updated);
    saveThemeStyles(updated);
  };

  const handlePresetSelect = (preset: { name: string; styles: ThemeStyles }) => {
    setThemeStyles(preset.styles);
    saveThemeStyles(preset.styles);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  const handleResetStyles = () => {
    const def = resetThemeStyles();
    setThemeStyles(def);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  const handleReset = () => {
    if (activeTab === 'schemas') {
      handleResetSchema();
      return;
    }

    if (activeTab === 'styles') {
      handleResetStyles();
      return;
    }

    if (activeTab === 'editor') {
      if (currentRoute.type === 'city' && activeCity) {
        resetRouteContent('city', activeCity.slug);
      } else if (currentRoute.type === 'state' && activeState) {
        resetRouteContent('state', activeState.id);
      } else if (currentRoute.type === 'service' && activeService) {
        resetRouteContent('service', activeService.id);
      } else if (currentRoute.type === 'condition' && activeCondition) {
        resetRouteContent('condition', activeCondition.id);
      } else if (currentRoute.type === 'article' && activeArticle) {
        resetRouteContent('article', activeArticle.slug);
      } else {
        const def = resetThemeContent();
        setContent(def);
        if (onContentChange) onContentChange(def);
      }
      setSavedAlert(true);
      setTimeout(() => setSavedAlert(false), 2000);
      return;
    }

    if (window.confirm('Are you sure you want to reset all theme texts and blocks back to default?')) {
      const def = resetThemeContent();
      setContent(def);
      if (onContentChange) onContentChange(def);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Lists for route switcher
  const allCitiesList = getAllCities();
  const allStatesList = getAllStates();
  const allServicesList = getAllServices();
  const allConditionsList = getAllConditions();
  const allArticlesList = getAllArticles();

  return (
    <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] z-50 bg-white shadow-2xl border-l border-slate-200 flex flex-col font-sans animate-in slide-in-from-right duration-300">
      
      {/* Top Header - Elementor / Divi Pro Style */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#008f58] flex items-center justify-center text-white font-black text-sm shadow-sm">
            <LayoutTemplate className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-tight">Visual Theme & Route Builder</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">LIVE</span>
            </div>
            <p className="text-[11px] text-slate-400">Real-time on-page SEO & content editor</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tab Navigation across sections */}
      <div className="bg-slate-100 p-2 flex gap-1 overflow-x-auto text-xs font-bold border-b border-slate-200">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'editor' 
              ? 'bg-[#008f58] text-white shadow-xs font-black' 
              : 'text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>

        <button
          onClick={() => setActiveTab('schemas')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'schemas' 
              ? 'bg-[#008f58] text-white shadow-xs font-black' 
              : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>SEO Schemas</span>
        </button>

        <button
          onClick={() => setActiveTab('styles')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'styles' 
              ? 'bg-[#008f58] text-white shadow-xs font-black' 
              : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-purple-600" />
          <span>Theme Styles</span>
        </button>

        <button
          onClick={() => setActiveTab('toggles')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'toggles' 
              ? 'bg-[#008f58] text-white shadow-xs font-black' 
              : 'text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5 text-amber-600" />
          <span>Section Toggles</span>
        </button>

        <button
          onClick={() => { setActiveTab('hero'); scrollToSection('hero'); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'hero' ? 'bg-[#008f58] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Hero & Form
        </button>
        <button
          onClick={() => { setActiveTab('stats'); scrollToSection('trust-stats'); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'stats' ? 'bg-[#008f58] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Trust Stats
        </button>
        <button
          onClick={() => { setActiveTab('steps'); scrollToSection('how-it-works'); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'steps' ? 'bg-[#008f58] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          How It Works
        </button>
        <button
          onClick={() => { setActiveTab('benefits'); scrollToSection('benefits-comparison'); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'benefits' ? 'bg-[#008f58] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Benefits
        </button>
        <button
          onClick={() => { setActiveTab('reviews'); scrollToSection('reviews'); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'reviews' ? 'bg-[#008f58] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => { setActiveTab('footer'); scrollToSection('footer'); }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'footer' ? 'bg-[#008f58] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Footer
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-slate-800">

        {/* ============================================================== */}
        {/* TAB 0: DYNAMIC ROUTE CONTENT EDITOR PANEL                      */}
        {/* ============================================================== */}
        {activeTab === 'editor' && (
          <div className="space-y-5 animate-in fade-in">
            
            {/* Active Route Context Card */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                  Active Route: <span className="underline">{currentRoute.type.toUpperCase()}</span>
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-700 font-bold">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-700">
                Editing content for:{' '}
                <strong className="text-slate-900">
                  {currentRoute.type === 'city' && (activeCity?.cityName || currentRoute.slug)}
                  {currentRoute.type === 'state' && (activeState?.name || currentRoute.stateId)}
                  {currentRoute.type === 'service' && (activeService?.title || currentRoute.serviceId)}
                  {currentRoute.type === 'condition' && (activeCondition?.name || currentRoute.conditionId)}
                  {currentRoute.type === 'article' && (activeArticle?.title || currentRoute.articleSlug)}
                  {currentRoute.type === 'home' && 'Homepage Landing Platform'}
                  {currentRoute.type === 'book' && 'Direct Evaluation Intake Form'}
                  {currentRoute.type === 'blog' && 'Clinical Guides Knowledge Hub'}
                </strong>
              </p>
            </div>

            {/* Quick Route Switcher Dropdown */}
            <div className="space-y-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>Switch Page to Edit:</span>
                <span className="text-[10px] text-slate-400 font-normal">Jump to any route</span>
              </label>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  const [routeType, id] = val.split(':');
                  if (routeType === 'home' && onNavigateHome) onNavigateHome();
                  if (routeType === 'city' && onNavigateCity) onNavigateCity(id);
                  if (routeType === 'state' && onNavigateState) onNavigateState(id);
                  if (routeType === 'service' && onNavigateService) onNavigateService(id);
                  if (routeType === 'condition' && onNavigateCondition) onNavigateCondition(id);
                  if (routeType === 'article' && onNavigateArticle) onNavigateArticle(id);
                }}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-[#008f58] cursor-pointer"
                value={`${currentRoute.type}:${
                  currentRoute.type === 'city' ? currentRoute.slug :
                  currentRoute.type === 'state' ? currentRoute.stateId :
                  currentRoute.type === 'service' ? currentRoute.serviceId :
                  currentRoute.type === 'condition' ? currentRoute.conditionId :
                  currentRoute.type === 'article' ? currentRoute.articleSlug : ''
                }`}
              >
                <option value="home:">🏠 Homepage</option>
                
                <optgroup label="📍 Cities (Local SEO)">
                  {allCitiesList.map((c) => (
                    <option key={c.slug} value={`city:${c.slug}`}>
                      {c.cityName}, {c.stateCode} ({c.slug})
                    </option>
                  ))}
                </optgroup>

                <optgroup label="🌿 States (MMJ Law Guides)">
                  {allStatesList.map((s) => (
                    <option key={s.id} value={`state:${s.id}`}>
                      {s.name} ({s.code}) - ${s.price}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="🩺 Services">
                  {allServicesList.map((s) => (
                    <option key={s.id} value={`service:${s.id}`}>
                      {s.title} (${s.startingPrice})
                    </option>
                  ))}
                </optgroup>

                <optgroup label="🧬 Qualifying Conditions">
                  {allConditionsList.map((cond) => (
                    <option key={cond.id} value={`condition:${cond.id}`}>
                      {cond.name} ({cond.category})
                    </option>
                  ))}
                </optgroup>

                <optgroup label="📖 Clinical Articles">
                  {allArticlesList.map((art) => (
                    <option key={art.slug} value={`article:${art.slug}`}>
                      {art.title.slice(0, 40)}...
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* --- 1. CITY ROUTE EDITABLE FIELDS --- */}
            {currentRoute.type === 'city' && activeCity && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#008f58]" />
                    <span>City Page Live Content Fields</span>
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Auto-saves on keystroke</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Main H1 Headline</label>
                  <input
                    type="text"
                    value={activeCity.h1}
                    onChange={(e) => updateCityContent(activeCity.slug, { h1: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Hero Intro / Summary Paragraph</label>
                  <textarea
                    rows={3}
                    value={activeCity.heroSnippet}
                    onChange={(e) => updateCityContent(activeCity.slug, { heroSnippet: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">City Name</label>
                    <input
                      type="text"
                      value={activeCity.cityName}
                      onChange={(e) => updateCityContent(activeCity.slug, { cityName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Metro Area / Region</label>
                    <input
                      type="text"
                      value={activeCity.metroArea}
                      onChange={(e) => updateCityContent(activeCity.slug, { metroArea: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Local Phone</label>
                    <input
                      type="text"
                      value={activeCity.phone}
                      onChange={(e) => updateCityContent(activeCity.slug, { phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Clinic Street Address</label>
                    <input
                      type="text"
                      value={activeCity.address?.street || ''}
                      onChange={(e) => updateCityContent(activeCity.slug, { 
                        address: { ...(activeCity.address || {}), street: e.target.value } as any
                      })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Tax Savings %</label>
                    <input
                      type="text"
                      value={activeCity.localTaxSavingsPercent}
                      onChange={(e) => updateCityContent(activeCity.slug, { localTaxSavingsPercent: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Sample Yearly Savings</label>
                    <input
                      type="text"
                      value={activeCity.sampleYearlySavings}
                      onChange={(e) => updateCityContent(activeCity.slug, { sampleYearlySavings: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Recreational Tax Rate</label>
                    <input
                      type="text"
                      value={activeCity.localSalesTaxRate}
                      onChange={(e) => updateCityContent(activeCity.slug, { localSalesTaxRate: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Medical Patient Tax Rate</label>
                    <input
                      type="text"
                      value={activeCity.medicalTaxRate}
                      onChange={(e) => updateCityContent(activeCity.slug, { medicalTaxRate: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">SEO Meta Title</label>
                  <input
                    type="text"
                    value={activeCity.title}
                    onChange={(e) => updateCityContent(activeCity.slug, { title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={activeCity.metaDesc}
                    onChange={(e) => updateCityContent(activeCity.slug, { metaDesc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>
              </div>
            )}

            {/* --- 2. STATE ROUTE EDITABLE FIELDS --- */}
            {currentRoute.type === 'state' && activeState && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#008f58]" />
                    <span>State Guide Live Content Fields</span>
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Auto-saves on keystroke</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">State Full Name</label>
                  <input
                    type="text"
                    value={activeState.name}
                    onChange={(e) => updateStateContent(activeState.id, { name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Consultation Fee ($)</label>
                    <input
                      type="number"
                      value={activeState.price}
                      onChange={(e) => updateStateContent(activeState.id, { price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Renewal Fee ($)</label>
                    <input
                      type="number"
                      value={activeState.renewalPrice}
                      onChange={(e) => updateStateContent(activeState.id, { renewalPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Card Validity</label>
                    <input
                      type="text"
                      value={activeState.validity}
                      onChange={(e) => updateStateContent(activeState.id, { validity: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">State Registry Fee</label>
                    <input
                      type="text"
                      value={activeState.stateRegistryFee}
                      onChange={(e) => updateStateContent(activeState.id, { stateRegistryFee: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Possession Limit</label>
                  <input
                    type="text"
                    value={activeState.possessionLimit}
                    onChange={(e) => updateStateContent(activeState.id, { possessionLimit: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Home Cultivation Policy</label>
                  <input
                    type="text"
                    value={activeState.homeCultivation}
                    onChange={(e) => updateStateContent(activeState.id, { homeCultivation: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Legal Statute Summary & Rights</label>
                  <textarea
                    rows={4}
                    value={activeState.summary}
                    onChange={(e) => updateStateContent(activeState.id, { summary: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>
              </div>
            )}

            {/* --- 3. SERVICE ROUTE EDITABLE FIELDS --- */}
            {currentRoute.type === 'service' && activeService && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-[#008f58]" />
                    <span>Service Page Live Content Fields</span>
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Auto-saves on keystroke</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Service Title</label>
                  <input
                    type="text"
                    value={activeService.title}
                    onChange={(e) => updateServiceContent(activeService.id, { title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Starting Price ($)</label>
                    <input
                      type="number"
                      value={activeService.startingPrice}
                      onChange={(e) => updateServiceContent(activeService.id, { startingPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Timeframe</label>
                    <input
                      type="text"
                      value={activeService.timeframe}
                      onChange={(e) => updateServiceContent(activeService.id, { timeframe: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Short Card Teaser</label>
                  <input
                    type="text"
                    value={activeService.shortDesc}
                    onChange={(e) => updateServiceContent(activeService.id, { shortDesc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Description</label>
                  <textarea
                    rows={4}
                    value={activeService.fullDesc}
                    onChange={(e) => updateServiceContent(activeService.id, { fullDesc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>
              </div>
            )}

            {/* --- 4. CONDITION ROUTE EDITABLE FIELDS --- */}
            {currentRoute.type === 'condition' && activeCondition && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#008f58]" />
                    <span>Condition Page Live Content Fields</span>
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Auto-saves on keystroke</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Condition Name</label>
                  <input
                    type="text"
                    value={activeCondition.name}
                    onChange={(e) => updateConditionContent(activeCondition.id, { name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <input
                    type="text"
                    value={activeCondition.category}
                    onChange={(e) => updateConditionContent(activeCondition.id, { category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Clinical Overview</label>
                  <textarea
                    rows={3}
                    value={activeCondition.description}
                    onChange={(e) => updateConditionContent(activeCondition.id, { description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Cannabis Therapeutic Mechanism</label>
                  <textarea
                    rows={3}
                    value={activeCondition.cannabisBenefit}
                    onChange={(e) => updateConditionContent(activeCondition.id, { cannabisBenefit: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Recommended Type / Strain</label>
                    <input
                      type="text"
                      value={activeCondition.recommendedType}
                      onChange={(e) => updateConditionContent(activeCondition.id, { recommendedType: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Prevalence</label>
                    <input
                      type="text"
                      value={activeCondition.prevalence}
                      onChange={(e) => updateConditionContent(activeCondition.id, { prevalence: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- 5. ARTICLE ROUTE EDITABLE FIELDS --- */}
            {currentRoute.type === 'article' && activeArticle && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#008f58]" />
                    <span>Article Page Live Content Fields</span>
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Auto-saves on keystroke</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Article Title</label>
                  <input
                    type="text"
                    value={activeArticle.title}
                    onChange={(e) => updateArticleContent(activeArticle.slug, { title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Executive Summary</label>
                  <textarea
                    rows={3}
                    value={activeArticle.summary}
                    onChange={(e) => updateArticleContent(activeArticle.slug, { summary: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Author Name</label>
                    <input
                      type="text"
                      value={activeArticle.author?.name || ''}
                      onChange={(e) => updateArticleContent(activeArticle.slug, { 
                        author: { ...(activeArticle.author || {}), name: e.target.value } as any
                      })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Medical Reviewer</label>
                    <input
                      type="text"
                      value={activeArticle.reviewedBy || ''}
                      onChange={(e) => updateArticleContent(activeArticle.slug, { reviewedBy: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">SEO Meta Title</label>
                  <input
                    type="text"
                    value={activeArticle.metaTitle}
                    onChange={(e) => updateArticleContent(activeArticle.slug, { metaTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={activeArticle.metaDesc}
                    onChange={(e) => updateArticleContent(activeArticle.slug, { metaDesc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>
              </div>
            )}

            {/* --- 6. HOMEPAGE / DEFAULT ROUTE FIELDS --- */}
            {(currentRoute.type === 'home' || currentRoute.type === 'book' || currentRoute.type === 'blog') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <LayoutTemplate className="w-3.5 h-3.5 text-[#008f58]" />
                    <span>Homepage & Intake Live Content</span>
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Auto-saves on keystroke</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Hero Heading Prefix</label>
                  <input
                    type="text"
                    value={content.hero.headingPrefix}
                    onChange={(e) => handleFieldChange('hero', 'headingPrefix', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Heading Highlight (Green)</label>
                  <input
                    type="text"
                    value={content.hero.headingHighlight}
                    onChange={(e) => handleFieldChange('hero', 'headingHighlight', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Subheading Narrative</label>
                  <textarea
                    rows={3}
                    value={content.hero.subheading}
                    onChange={(e) => handleFieldChange('hero', 'subheading', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">State Button Label</label>
                    <input
                      type="text"
                      value={content.hero.statePickerButtonText}
                      onChange={(e) => handleFieldChange('hero', 'statePickerButtonText', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Form Title</label>
                    <input
                      type="text"
                      value={content.hero.formTitle}
                      onChange={(e) => handleFieldChange('hero', 'formTitle', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: SEO SCHEMA MANAGER PANEL                                */}
        {/* ============================================================== */}
        {activeTab === 'schemas' && (
          <div className="space-y-5 animate-in fade-in">
            
            {/* Header & Route Selector */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#008f58]" />
                  <span>SEO Schema Manager (JSON-LD)</span>
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-700 font-bold">
                  Injected in &lt;head&gt;
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Configure structured data markup (<code className="text-[#008f58] font-bold">application/ld+json</code>) to qualify for Google Rich Snippets, Star Ratings, and Knowledge Graphs without writing code.
              </p>

              {/* Route Selector */}
              <div className="pt-1 space-y-1">
                <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                  <span>Target Route Schema:</span>
                  <span className="text-[10px] text-slate-500 font-normal">Active: {schemaRouteKey}</span>
                </label>
                <select
                  value={schemaRouteKey}
                  onChange={(e) => handleSchemaRouteChange(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-[#008f58] cursor-pointer"
                >
                  <option value="home">🏠 Homepage (Root /)</option>
                  <option value="book">📝 Direct Evaluation Intake (/book-evaluation/)</option>
                  <option value="blog">📖 Clinical Knowledge Hub (/blog/)</option>
                  
                  <optgroup label="📍 Cities (Local SEO)">
                    {allCitiesList.map((c) => (
                      <option key={c.slug} value={`city:${c.slug}`}>
                        {c.cityName}, {c.stateCode} ({c.slug})
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="🌿 States (MMJ Law Guides)">
                    {allStatesList.map((s) => (
                      <option key={s.id} value={`state:${s.id}`}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="🩺 Services">
                    {allServicesList.map((s) => (
                      <option key={s.id} value={`service:${s.id}`}>
                        {s.title}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="🧬 Qualifying Conditions">
                    {allConditionsList.map((cond) => (
                      <option key={cond.id} value={`condition:${cond.id}`}>
                        {cond.name}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="📖 Clinical Articles">
                    {allArticlesList.map((art) => (
                      <option key={art.slug} value={`article:${art.slug}`}>
                        {art.title.slice(0, 40)}...
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Mode Switcher: Structured Builder vs Raw JSON-LD */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
              <button
                type="button"
                onClick={() => setSchemaEditorMode('structured')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-center transition-all cursor-pointer ${
                  schemaEditorMode === 'structured'
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Structured Fields Builder
              </button>
              <button
                type="button"
                onClick={() => setSchemaEditorMode('raw')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  schemaEditorMode === 'raw'
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Raw JSON-LD Code</span>
                {schemaConfig.customJsonLd?.enabled && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>
            </div>

            {/* 1. STRUCTURED MODE */}
            {schemaEditorMode === 'structured' && (
              <div className="space-y-5">
                
                {/* 1A. MEDICAL BUSINESS / CLINIC SCHEMA CARD */}
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#008f58] flex items-center justify-center font-bold">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">MedicalBusiness Schema</h4>
                        <p className="text-[10px] text-slate-400">Clinic NAP & Local SEO Knowledge Graph</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={schemaConfig.medicalBusiness.enabled}
                        onChange={(e) => handleMedicalBusinessChange('enabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#008f58]"></div>
                    </label>
                  </div>

                  {schemaConfig.medicalBusiness.enabled && (
                    <div className="space-y-3 pt-1 animate-in fade-in">
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Schema @type</label>
                          <select
                            value={schemaConfig.medicalBusiness.type}
                            onChange={(e) => handleMedicalBusinessChange('type', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58] bg-white cursor-pointer"
                          >
                            <option value="MedicalBusiness">MedicalBusiness</option>
                            <option value="MedicalClinic">MedicalClinic</option>
                            <option value="Physician">Physician</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Price Range</label>
                          <input
                            type="text"
                            value={schemaConfig.medicalBusiness.priceRange}
                            onChange={(e) => handleMedicalBusinessChange('priceRange', e.target.value)}
                            placeholder="$$ or $55-$199"
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Clinic / Practice Name</label>
                        <input
                          type="text"
                          value={schemaConfig.medicalBusiness.name}
                          onChange={(e) => handleMedicalBusinessChange('name', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Phone</label>
                          <input
                            type="text"
                            value={schemaConfig.medicalBusiness.telephone}
                            onChange={(e) => handleMedicalBusinessChange('telephone', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Email</label>
                          <input
                            type="email"
                            value={schemaConfig.medicalBusiness.email}
                            onChange={(e) => handleMedicalBusinessChange('email', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Street Address</label>
                        <input
                          type="text"
                          value={schemaConfig.medicalBusiness.streetAddress}
                          onChange={(e) => handleMedicalBusinessChange('streetAddress', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">City</label>
                          <input
                            type="text"
                            value={schemaConfig.medicalBusiness.addressLocality}
                            onChange={(e) => handleMedicalBusinessChange('addressLocality', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">State Code</label>
                          <input
                            type="text"
                            value={schemaConfig.medicalBusiness.addressRegion}
                            onChange={(e) => handleMedicalBusinessChange('addressRegion', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Postal Code</label>
                          <input
                            type="text"
                            value={schemaConfig.medicalBusiness.postalCode}
                            onChange={(e) => handleMedicalBusinessChange('postalCode', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Review Rating (1-5)</label>
                          <input
                            type="text"
                            value={schemaConfig.medicalBusiness.ratingValue}
                            onChange={(e) => handleMedicalBusinessChange('ratingValue', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Verified Reviews Count</label>
                          <input
                            type="text"
                            value={schemaConfig.medicalBusiness.reviewCount}
                            onChange={(e) => handleMedicalBusinessChange('reviewCount', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Description</label>
                        <textarea
                          rows={2}
                          value={schemaConfig.medicalBusiness.description}
                          onChange={(e) => handleMedicalBusinessChange('description', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 1B. FAQPAGE SCHEMA CARD */}
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">FAQPage Schema</h4>
                        <p className="text-[10px] text-slate-400">Expandable Google SERP Accordions</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={schemaConfig.faqPage.enabled}
                        onChange={(e) => handleFaqToggle(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#008f58]"></div>
                    </label>
                  </div>

                  {schemaConfig.faqPage.enabled && (
                    <div className="space-y-3 pt-1 animate-in fade-in">
                      <div className="space-y-3">
                        {schemaConfig.faqPage.faqs.map((faq, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                Question #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFaq(idx)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                title="Remove FAQ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleFaqItemChange(idx, 'question', e.target.value)}
                              placeholder="Enter FAQ Question"
                              className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                            />
                            <textarea
                              rows={2}
                              value={faq.answer}
                              onChange={(e) => handleFaqItemChange(idx, 'answer', e.target.value)}
                              placeholder="Enter Clinical Answer"
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-dashed border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add FAQ Question</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 2. RAW JSON-LD MODE */}
            {schemaEditorMode === 'raw' && (
              <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">Custom Raw JSON-LD Schema</h4>
                    <p className="text-[10px] text-slate-400">Override structured fields with custom Schema.org code</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schemaConfig.customJsonLd?.enabled || false}
                      onChange={(e) => handleCustomJsonToggle(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#008f58]"></div>
                  </label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">Paste or Edit JSON-LD:</span>
                    {rawJsonError ? (
                      <span className="text-red-500 font-bold text-[10px]">⚠️ {rawJsonError}</span>
                    ) : (
                      <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid JSON
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={12}
                    value={schemaConfig.customJsonLd?.rawJson || ''}
                    onChange={(e) => handleCustomJsonChange(e.target.value)}
                    placeholder='{\n  "@context": "https://schema.org",\n  "@type": "MedicalBusiness",\n  ...\n}'
                    className="w-full px-3 py-2 text-[11px] font-mono bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-500">
                    When enabled, this exact JSON-LD string is injected into the HTML &lt;head&gt; for this route.
                  </p>
                </div>
              </div>
            )}

            {/* Live Schema Output Preview & Verification Bar */}
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Injected JSON-LD Preview</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySchema}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSchema ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSchema ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-[10px] font-bold text-white transition-colors flex items-center gap-1"
                  >
                    <span>Test Rich Results</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <pre className="text-[10px] font-mono bg-slate-950 p-2.5 rounded-lg text-slate-300 overflow-x-auto max-h-44 border border-slate-800">
                {JSON.stringify(buildSchemaObjects(schemaConfig), null, 2)}
              </pre>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: GLOBAL THEME STYLES PANEL                               */}
        {/* ============================================================== */}
        {activeTab === 'styles' && (
          <div className="space-y-5 animate-in fade-in">
            
            {/* Header info */}
            <div className="p-3.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-purple-600" />
                  <span>Global Theme & Tailwind Styles</span>
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-purple-200 text-purple-700 font-bold">
                  Instant Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Customize primary, secondary, and accent colors, as well as the global font-family. Updates Tailwind CSS variables and web fonts dynamically without rebuilding.
              </p>
            </div>

            {/* Quick Palettes / Presets */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-xs">
              <label className="text-xs font-bold text-slate-900 block">Curated Medical Color Palettes</label>
              <div className="grid grid-cols-1 gap-2">
                {THEME_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      themeStyles.primaryColor === preset.styles.primaryColor && themeStyles.fontFamily === preset.styles.fontFamily
                        ? 'border-[#008f58] bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{preset.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{preset.styles.fontLabel}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: preset.styles.primaryColor }} title="Primary" />
                      <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: preset.styles.secondaryColor }} title="Secondary" />
                      <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: preset.styles.accentColor }} title="Accent" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Brand Colors */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3.5 shadow-xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Brand Palette Customization
              </h4>

              {/* Primary Color */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Primary Brand Color</label>
                  <span className="text-[10px] text-slate-400">Buttons, headings, icons</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeStyles.primaryColor}
                    onChange={(e) => handleStyleChange('primaryColor', e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={themeStyles.primaryColor}
                    onChange={(e) => handleStyleChange('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono uppercase font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>
              </div>

              {/* Primary Hover Color */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Primary Hover State</label>
                  <span className="text-[10px] text-slate-400">Darker tone for button hovers</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeStyles.primaryHoverColor}
                    onChange={(e) => handleStyleChange('primaryHoverColor', e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={themeStyles.primaryHoverColor}
                    onChange={(e) => handleStyleChange('primaryHoverColor', e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono uppercase font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Secondary Brand Color</label>
                  <span className="text-[10px] text-slate-400">Deep headers & dark backgrounds</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeStyles.secondaryColor}
                    onChange={(e) => handleStyleChange('secondaryColor', e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={themeStyles.secondaryColor}
                    onChange={(e) => handleStyleChange('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono uppercase font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Accent Call-to-Action Color</label>
                  <span className="text-[10px] text-slate-400">Orange step numbers & urgency badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeStyles.accentColor}
                    onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={themeStyles.accentColor}
                    onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono uppercase font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                  />
                </div>
              </div>
            </div>

            {/* Global Typography / Font-Family */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3.5 shadow-xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Global Font Family
              </h4>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Google / System Font</label>
                <select
                  value={themeStyles.fontFamily}
                  onChange={(e) => {
                    const opt = FONT_OPTIONS.find((f) => f.value === e.target.value);
                    const updated: ThemeStyles = {
                      ...themeStyles,
                      fontFamily: e.target.value,
                      fontLabel: opt?.label || e.target.value
                    };
                    setThemeStyles(updated);
                    saveThemeStyles(updated);
                  }}
                  className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-[#008f58] cursor-pointer"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500">
                  Google Fonts are asynchronously downloaded and rendered in real-time across all components.
                </p>
              </div>

              {/* Typography Preview Card */}
              <div 
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                style={{ fontFamily: themeStyles.fontFamily }}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Live Font Preview ({themeStyles.fontLabel}):
                </div>
                <div className="text-base font-extrabold text-slate-900 leading-snug">
                  Medical Marijuana Card Online
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connect 100% online with a compassionate MMJ doctor for legal medical cannabis evaluations in under 15 minutes.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: HOMEPAGE SECTION VISIBILITY TOGGLES                     */}
        {/* ============================================================== */}
        {activeTab === 'toggles' && (
          <div className="space-y-5 animate-in fade-in">
            {/* Header info */}
            <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <LayoutTemplate className="w-3.5 h-3.5 text-amber-600" />
                  <span>Homepage Section Toggles Bridge</span>
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-amber-200 text-amber-700 font-bold">
                  WP REST API
                </span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                Toggle any section on or off. Changes render immediately and sync with the WordPress backend through REST API calls.
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-amber-800">
                <span>Active Sections:</span>
                <span className="bg-amber-200/60 px-2 py-0.5 rounded-md text-amber-900">
                  {Object.values(toggles).filter(Boolean).length} / 16 Visible
                </span>
              </div>
            </div>

            {/* Quick Bulk Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setToggles(DEFAULT_SECTION_TOGGLES)}
                className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-colors cursor-pointer text-center"
              >
                Enable All Sections
              </button>
              <button
                onClick={() => {
                  setToggles({
                    ...DEFAULT_SECTION_TOGGLES,
                    doctors: false,
                    reciprocity: false,
                    seoContent: false,
                  });
                }}
                className="flex-1 py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold transition-colors cursor-pointer text-center"
              >
                Lean Mode (Essential)
              </button>
            </div>

            {/* 16 Sections Toggles List */}
            <div className="space-y-2">
              {[
                { key: 'hero' as keyof SectionToggles, label: '1. Hero Banner & Form', desc: 'Main headline, authority badges, and doctor booking form' },
                { key: 'trustStats' as keyof SectionToggles, label: '2. Trust Proof Bar', desc: '99.2% approval guarantee, 15m turnaround, 50k patients' },
                { key: 'howItWorks' as keyof SectionToggles, label: '3. How It Works (3 Steps)', desc: 'Intake, video consult, and instant digital recommendation' },
                { key: 'stateDirectory' as keyof SectionToggles, label: '4. State Directory & Laws', desc: 'Searchable grid of 20+ state telemedicine programs' },
                { key: 'benefits' as keyof SectionToggles, label: '5. Medical vs Recreational', desc: 'Tax savings calculator and higher possession limits' },
                { key: 'services' as keyof SectionToggles, label: '6. Telehealth Services', desc: 'New Patient, Renewal, and 99-Plant Cultivation' },
                { key: 'cities' as keyof SectionToggles, label: '7. California Cities Directory', desc: 'California telehealth coverage and city-specific savings' },
                { key: 'conditions' as keyof SectionToggles, label: '8. Qualifying Conditions', desc: 'Chronic pain, anxiety, PTSD, and pre-qual self-check' },
                { key: 'blogTeaser' as keyof SectionToggles, label: '9. Insights & Blog Teaser', desc: 'Latest physician guides and clinical cannabis research' },
                { key: 'reciprocity' as keyof SectionToggles, label: '10. State Reciprocity Checker', desc: 'Interactive out-of-state medical card travel checker' },
                { key: 'pricing' as keyof SectionToggles, label: '11. Pricing Packages', desc: 'Digital PDF, PVC Plastic ID Card, and Cultivation' },
                { key: 'doctors' as keyof SectionToggles, label: '12. Medical Advisory Team', desc: 'Licensed MD bios, medical specialties, and state licenses' },
                { key: 'whyTrust' as keyof SectionToggles, label: '13. Why Patients Trust Us', desc: 'Compassionate medical care philosophy and mission' },
                { key: 'reviews' as keyof SectionToggles, label: '14. Verified Patient Reviews', desc: '14,250+ reviews with 4.9/5 star average rating' },
                { key: 'seoContent' as keyof SectionToggles, label: '15. SEO Topical Authority', desc: 'In-depth medical marijuana guide with accordion tabs' },
                { key: 'faq' as keyof SectionToggles, label: '16. Frequently Asked Questions', desc: 'Common patient questions with expand/collapse answers' },
              ].map((sec) => {
                const isEnabled = toggles[sec.key];
                return (
                  <div
                    key={sec.key}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      isEnabled 
                        ? 'bg-white border-slate-200 shadow-xs' 
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="pr-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isEnabled ? 'text-slate-900' : 'text-slate-500'}`}>
                          {sec.label}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                          isEnabled 
                            ? 'bg-emerald-100 text-[#16a34a]' 
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isEnabled ? 'Active' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{sec.desc}</p>
                    </div>

                    <button
                      onClick={() => toggleSection(sec.key)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEnabled ? 'bg-[#008f58]' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={isEnabled}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSavedAlert(true);
                  setTimeout(() => setSavedAlert(false), 2000);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4 text-emerald-400" />
                <span>Save Section Visibility State</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. HERO TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
              💡 Changes reflect <strong>live in real-time</strong> on the page. Type below to edit headings, badges, and form labels.
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Top Authority Badge</label>
              <input
                type="text"
                value={content.hero.badgeText}
                onChange={(e) => handleFieldChange('hero', 'badgeText', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Heading Line 1 (Prefix)</label>
              <input
                type="text"
                value={content.hero.headingPrefix}
                onChange={(e) => handleFieldChange('hero', 'headingPrefix', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Heading Line 2 (Green Highlight)</label>
              <input
                type="text"
                value={content.hero.headingHighlight}
                onChange={(e) => handleFieldChange('hero', 'headingHighlight', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Heading Line 3 (Suffix)</label>
              <input
                type="text"
                value={content.hero.headingSuffix}
                onChange={(e) => handleFieldChange('hero', 'headingSuffix', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subheading Description</label>
              <textarea
                rows={3}
                value={content.hero.subheading}
                onChange={(e) => handleFieldChange('hero', 'subheading', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">State Picker Button Label</label>
              <input
                type="text"
                value={content.hero.statePickerButtonText}
                onChange={(e) => handleFieldChange('hero', 'statePickerButtonText', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
              />
            </div>

            <div className="pt-2 border-t border-slate-200">
              <h4 className="text-xs font-black uppercase text-slate-900 mb-2">60-Second Form Card Box</h4>
              
              <div className="space-y-1 mb-3">
                <label className="text-xs font-bold text-slate-700">Card Main Title</label>
                <input
                  type="text"
                  value={content.hero.formTitle}
                  onChange={(e) => handleFieldChange('hero', 'formTitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Starting Price Subtext</label>
                <input
                  type="text"
                  value={content.hero.formPriceSubtext}
                  onChange={(e) => handleFieldChange('hero', 'formPriceSubtext', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#008f58]"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. STATS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-xs font-black uppercase text-slate-900">Live Trust & Performance Counter Metrics</h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stat 1 Value</label>
                <input
                  type="text"
                  value={content.trustStats.stat1Value}
                  onChange={(e) => handleFieldChange('trustStats', 'stat1Value', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stat 1 Label</label>
                <input
                  type="text"
                  value={content.trustStats.stat1Label}
                  onChange={(e) => handleFieldChange('trustStats', 'stat1Label', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stat 2 Value</label>
                <input
                  type="text"
                  value={content.trustStats.stat2Value}
                  onChange={(e) => handleFieldChange('trustStats', 'stat2Value', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stat 2 Label</label>
                <input
                  type="text"
                  value={content.trustStats.stat2Label}
                  onChange={(e) => handleFieldChange('trustStats', 'stat2Label', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stat 3 Value</label>
                <input
                  type="text"
                  value={content.trustStats.stat3Value}
                  onChange={(e) => handleFieldChange('trustStats', 'stat3Value', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stat 3 Label</label>
                <input
                  type="text"
                  value={content.trustStats.stat3Label}
                  onChange={(e) => handleFieldChange('trustStats', 'stat3Label', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stat 4 Value</label>
                <input
                  type="text"
                  value={content.trustStats.stat4Value}
                  onChange={(e) => handleFieldChange('trustStats', 'stat4Value', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stat 4 Label</label>
                <input
                  type="text"
                  value={content.trustStats.stat4Label}
                  onChange={(e) => handleFieldChange('trustStats', 'stat4Label', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. STEPS TAB */}
        {activeTab === 'steps' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-xs font-black uppercase text-slate-900">How It Works (3 Steps)</h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Badge Text</label>
              <input
                type="text"
                value={content.howItWorks.badgeText}
                onChange={(e) => handleFieldChange('howItWorks', 'badgeText', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Section Title</label>
              <input
                type="text"
                value={content.howItWorks.heading}
                onChange={(e) => handleFieldChange('howItWorks', 'heading', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Section Subtitle</label>
              <input
                type="text"
                value={content.howItWorks.subheading}
                onChange={(e) => handleFieldChange('howItWorks', 'subheading', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* 4. BENEFITS TAB */}
        {activeTab === 'benefits' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-xs font-black uppercase text-slate-900">Medical vs Recreational Benefits</h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Section Heading</label>
              <input
                type="text"
                value={content.benefits.heading}
                onChange={(e) => handleFieldChange('benefits', 'heading', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tax Savings Headline</label>
              <input
                type="text"
                value={content.benefits.taxSavingsPercent}
                onChange={(e) => handleFieldChange('benefits', 'taxSavingsPercent', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Possession Limit Multiplier</label>
              <input
                type="text"
                value={content.benefits.possessionMultiplier}
                onChange={(e) => handleFieldChange('benefits', 'possessionMultiplier', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* 5. REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-xs font-black uppercase text-slate-900">Reviews & Ratings Proof</h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Section Title</label>
              <input
                type="text"
                value={content.reviews.heading}
                onChange={(e) => handleFieldChange('reviews', 'heading', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Rating Score</label>
                <input
                  type="text"
                  value={content.reviews.ratingScore}
                  onChange={(e) => handleFieldChange('reviews', 'ratingScore', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Review Count</label>
                <input
                  type="text"
                  value={content.reviews.reviewCount}
                  onChange={(e) => handleFieldChange('reviews', 'reviewCount', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* 6. FOOTER TAB */}
        {activeTab === 'footer' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-xs font-black uppercase text-slate-900">Footer & Disclaimers</h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Toll-Free Phone</label>
              <input
                type="text"
                value={content.footer.phone}
                onChange={(e) => handleFieldChange('footer', 'phone', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Operating Hours</label>
              <input
                type="text"
                value={content.footer.hours}
                onChange={(e) => handleFieldChange('footer', 'hours', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Copyright Line</label>
              <input
                type="text"
                value={content.footer.copyrightText}
                onChange={(e) => handleFieldChange('footer', 'copyrightText', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Medical Disclaimer</label>
              <textarea
                rows={3}
                value={content.footer.disclaimerText}
                onChange={(e) => handleFieldChange('footer', 'disclaimerText', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        )}

      </div>

      {/* Editor Action Bottom Bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold border border-slate-300 transition-colors cursor-pointer"
          title="Reset back to initial default data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset {activeTab === 'editor' ? 'Current Page' : activeTab === 'schemas' ? 'Route Schemas' : activeTab === 'styles' ? 'Theme Styles' : activeTab === 'toggles' ? 'Section Toggles' : 'Theme'}</span>
        </button>

        <div className="flex items-center gap-2">
          {savedAlert && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Saved Live!
            </span>
          )}

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All</span>
          </button>
        </div>
      </div>

    </div>
  );
};
