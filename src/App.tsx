/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStatsBar } from './components/TrustStatsBar';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LocalCitiesDirectorySection } from './components/LocalCitiesDirectorySection';
import { StateDirectorySection } from './components/StateDirectorySection';
import { BenefitsComparisonSection } from './components/BenefitsComparisonSection';
import { ServicesSection } from './components/ServicesSection';
import { QualifyingConditionsSection } from './components/QualifyingConditionsSection';
import { ReciprocityCheckerSection } from './components/ReciprocityCheckerSection';
import { PricingPlansSection } from './components/PricingPlansSection';
import { DoctorDirectorySection } from './components/DoctorDirectorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { SEOContentSection } from './components/SEOContentSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { LiveChatSupport } from './components/LiveChatSupport';
import { ContactModal } from './components/ContactModal';
import { ContactPage } from './components/ContactPage';
import { CustomPageView } from './components/CustomPageView';
import { WhyTrustSection } from './components/WhyTrustSection';
import { useSectionToggles } from './utils/themeContent';
import { getPageBySlug } from './utils/customPagesStore';

// Sub-pages
import { LocalCityPage } from './components/LocalCityPage';
import { StateDetailPage } from './components/StateDetailPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { ConditionDetailPage } from './components/ConditionDetailPage';
import { BlogInsightsPage } from './components/BlogInsightsPage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { BlogHomeTeaserSection } from './components/BlogHomeTeaserSection';

// Datasets
import { LOCAL_CITIES_DATA } from './data/localSeoData';
import { STATES_DATA, SERVICES_DATA, QUALIFYING_CONDITIONS } from './data/mmjData';
import { BLOG_ARTICLES_DATA } from './data/blogArticlesData';

import { 
  AppRoute, 
  parseCurrentUrl, 
  getStateUrl, 
  getCityUrl, 
  getServiceUrl, 
  getConditionUrl,
  getBlogUrl,
  getArticleUrl,
  getBookUrl
} from './utils/urlRouter';
import { applySEOMeta, getRouteSEOMeta } from './utils/seoMeta';
import { MyMMJDoctorEvaluationForm } from './components/MyMMJDoctorEvaluationForm';
import { LeadManagerModal } from './components/LeadManagerModal';
import { SitemapModal } from './components/SitemapModal';
import { ThemeVisualBuilder } from './components/ThemeVisualBuilder';
import { 
  getCityBySlug, 
  getStateById, 
  getServiceById, 
  getConditionById, 
  getArticleBySlug,
  reloadRouteContentOverrides
} from './utils/routeContentStore';
import { applyDynamicRouteSchema } from './utils/schemaStore';
import { applyThemeStyles } from './utils/themeStyles';
import { enforceCanonicalRedirect, detectDuplicateContent } from './utils/canonicalRedirect';

interface AppProps {
  isHeadlessMode?: boolean;
}

export default function App({ isHeadlessMode = false }: AppProps) {
  // Check if headless mode or WordPress page builder canvas is active
  const isHeadlessActive = (() => {
    if (isHeadlessMode) return true;
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const search = window.location.search.toLowerCase();
    return (
      params.get('headless-mode') === '1' ||
      params.get('headless-mode') === 'true' ||
      params.get('headless') === '1' ||
      params.get('headless') === 'true' ||
      search.includes('elementor-preview') ||
      params.get('action') === 'elementor' ||
      search.includes('et_fb=1') ||
      document.body.classList.contains('elementor-editor-active') ||
      document.body.classList.contains('et-fb')
    );
  })();

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => parseCurrentUrl());
  const { toggles } = useSectionToggles();
  const [liveSyncToast, setLiveSyncToast] = useState<{ message: string; timestamp: number } | null>(null);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState<string>('california');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('new-patient');
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isLeadManagerOpen, setIsLeadManagerOpen] = useState(false);
  const [isVisualBuilderOpen, setIsVisualBuilderOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [, setStoreRevision] = useState(0);

  // -------------------------------------------------------------------------
  // Extended 'headless-mode' & WordPress Page Builder Live Save Listener
  // -------------------------------------------------------------------------
  // When Elementor, Divi, Gutenberg, or any WordPress Page Builder finishes saving,
  // trigger real-time data refetch and component re-render without a hard browser refresh.
  useEffect(() => {
    const handleBuilderSaveCommit = (sourceName?: string) => {
      // 1. Refetch & reload route content overrides from localStorage/API
      reloadRouteContentOverrides();

      // 2. Re-apply global dynamic theme styles
      applyThemeStyles();

      // 3. Re-apply SEO Schema structured data
      const freshRoute = parseCurrentUrl();
      applyDynamicRouteSchema(freshRoute);

      // 4. Trigger state re-render in React SPA without a hard refresh
      setStoreRevision((prev) => prev + 1);
      setCurrentRoute(freshRoute);

      // 5. Notify user/editor of live synchronized changes
      setLiveSyncToast({
        message: `Live edits synchronized with WordPress ${sourceName || 'Page Builder'}`,
        timestamp: Date.now(),
      });

      // 6. Broadcast event back to WordPress editor canvas if inside iframe
      try {
        if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'online-mmj:preview-refreshed', timestamp: Date.now() }, '*');
        }
      } catch (e) {
        // ignore
      }
    };

    // A. Custom DOM events dispatched by WordPress theme scripts
    const onWpBuilderSaved = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      handleBuilderSaveCommit(detail?.source ? `${detail.source}` : 'Page Builder');
    };
    window.addEventListener('wp-page-builder-saved', onWpBuilderSaved);
    window.addEventListener('route-content-updated', () => handleBuilderSaveCommit('Visual Customizer'));

    // B. Window postMessage listener (Elementor / Divi / Gutenberg iframe communication)
    const onMessage = (e: MessageEvent) => {
      if (!e.data) return;
      if (
        e.data?.name === 'elementor:saved' ||
        e.data?.type === 'elementor/editor/saved' ||
        e.data === 'elementor:saved' ||
        e.data?.action === 'elementor_saved'
      ) {
        handleBuilderSaveCommit('Elementor');
      } else if (
        e.data?.action === 'et_pb_saved' ||
        e.data?.action === 'et_fb_saved' ||
        e.data === 'et_builder_saved'
      ) {
        handleBuilderSaveCommit('Divi Builder');
      } else if (
        e.data?.type === 'gutenberg:saved' ||
        e.data?.action === 'wp_editor_saved' ||
        e.data?.name === 'wp-editor-saved' ||
        e.data?.type === 'core/editor:savePost'
      ) {
        handleBuilderSaveCommit('Gutenberg Editor');
      } else if (
        e.data?.action === 'fl_builder_saved' ||
        e.data?.type === 'fl-builder-saved'
      ) {
        handleBuilderSaveCommit('Beaver Builder');
      } else if (
        e.data?.type === 'page-builder-saved' ||
        e.data?.type === 'headless:save-complete' ||
        e.data?.action === 'wp_save_complete'
      ) {
        handleBuilderSaveCommit(e.data?.source || 'Page Builder');
      }
    };
    window.addEventListener('message', onMessage);

    // B2. Gutenberg Core Block Editor Live State Subscriber (if wp.data is active)
    let wpUnsubscribe: (() => void) | null = null;
    try {
      const wpData = (window as any).wp?.data || (window.parent as any)?.wp?.data;
      if (wpData?.subscribe && wpData?.select) {
        let wasSavingPost = false;
        wpUnsubscribe = wpData.subscribe(() => {
          try {
            const isSaving = wpData.select('core/editor')?.isSavingPost?.() || false;
            if (wasSavingPost && !isSaving) {
              handleBuilderSaveCommit('Gutenberg Block Editor');
            }
            wasSavingPost = isSaving;
          } catch (err) {
            // ignore
          }
        });
      }
    } catch (e) {
      // ignore
    }

    // C. Cross-tab BroadcastChannel listener
    let broadcastChannel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        broadcastChannel = new BroadcastChannel('online-mmj-builder');
        broadcastChannel.onmessage = (e) => {
          if (e.data?.type === 'page-builder-saved') {
            handleBuilderSaveCommit(e.data?.source || 'Page Builder');
          }
        };
      } catch (e) {
        // ignore
      }
    }

    // D. Storage event listener (syncs across tabs when page builder saves localStorage)
    const onStorage = (e: StorageEvent) => {
      if (e.key && (e.key.startsWith('online_mmj_') || e.key === 'wp_live_edit')) {
        handleBuilderSaveCommit('Storage Sync');
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('wp-page-builder-saved', onWpBuilderSaved);
      window.removeEventListener('message', onMessage);
      window.removeEventListener('storage', onStorage);
      if (broadcastChannel) {
        broadcastChannel.close();
      }
      if (wpUnsubscribe) {
        wpUnsubscribe();
      }
    };
  }, []);

  // Auto-dismiss live synchronization notification toast
  useEffect(() => {
    if (!liveSyncToast) return;
    const timer = setTimeout(() => {
      setLiveSyncToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [liveSyncToast]);

  // If in headless-mode or page-builder canvas mode, safely render empty null to prevent any clashing
  if (isHeadlessActive) {
    return null;
  }

  // Sync route with competitor URL pattern
  useEffect(() => {
    // If browser loaded with duplicate hash (e.g. /path/#/path or /path/#path), clean up cleanly
    const rawPath = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/+$/, '');
    if (rawHash && rawPath && (rawPath.endsWith(rawHash) || rawPath === `/${rawHash}`)) {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {
        // ignore
      }
    }

    const handleRouteChange = () => {
      const parsed = parseCurrentUrl();
      setCurrentRoute(parsed);
    };

    const params = new URLSearchParams(window.location.search);
    const hasAdminFlag = params.get('builder') === '1' || params.get('editor') === '1' || params.get('admin') === '1';
    const wpAdmin = (window as unknown as { onlineMMJCardSettings?: { isUserAdmin?: boolean } })?.onlineMMJCardSettings?.isUserAdmin;
    if (hasAdminFlag || wpAdmin) {
      setIsAdminUser(true);
      if (params.get('builder') === '1' || params.get('editor') === '1') {
        setIsVisualBuilderOpen(true);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut Ctrl+Shift+E or Cmd+Shift+E toggles Elementor-style visual builder
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsAdminUser(true);
        setIsVisualBuilderOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize global theme styles and listeners
  useEffect(() => {
    applyThemeStyles();
    const handleStylesUpdated = () => applyThemeStyles();
    const handleSchemaUpdated = () => applyDynamicRouteSchema(currentRoute);

    window.addEventListener('theme-styles-updated', handleStylesUpdated);
    window.addEventListener('route-schema-updated', handleSchemaUpdated);
    return () => {
      window.removeEventListener('theme-styles-updated', handleStylesUpdated);
      window.removeEventListener('route-schema-updated', handleSchemaUpdated);
    };
  }, [currentRoute]);

  // Dynamically update Canonical URL, Meta Description, OpenGraph tags, and JSON-LD schema
  useEffect(() => {
    // Detect duplicate content and automatically redirect to primary keyword URL
    const redirectResult = enforceCanonicalRedirect(currentRoute);
    if (redirectResult.redirected) {
      const freshRoute = parseCurrentUrl();
      setCurrentRoute(freshRoute);
      return;
    }

    const meta = getRouteSEOMeta(currentRoute);
    applySEOMeta(meta);
    applyDynamicRouteSchema(currentRoute);
  }, [currentRoute]);

  const handleOpenApply = (stateId?: string, serviceId?: string) => {
    if (stateId) setSelectedStateId(stateId);
    if (serviceId) setSelectedServiceId(serviceId);
    setIsApplyModalOpen(true);
  };

  const handleOpenPortal = () => {
    setIsPortalModalOpen(true);
  };

  const handleOpenRenewal = () => {
    setSelectedServiceId('renewal');
    setIsApplyModalOpen(true);
  };

  // Helper to transition URL and view without appending duplicate hashes/slugs
  const transitionTo = (urlPath: string, route: AppRoute) => {
    let pushSucceeded = false;
    try {
      window.history.pushState({ route }, '', urlPath);
      pushSucceeded = true;
    } catch (e) {
      // Safe fallback if origin constraints in restricted iframe
      pushSucceeded = false;
    }

    if (!pushSucceeded) {
      window.location.hash = `#${urlPath}`;
    } else if (window.location.hash) {
      // Clear out any old lingering hash so the URL remains clean without double slugs
      try {
        window.history.replaceState({ route }, '', urlPath);
      } catch (e) {
        // ignore
      }
    }

    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation handlers adhering to competitor URL structure
  const handleNavigateHome = () => {
    transitionTo('/', { type: 'home' });
  };

  const handleNavigateCity = (slug: string) => {
    const url = getCityUrl(slug);
    transitionTo(url, { type: 'city', slug });
  };

  const handleNavigateState = (stateId: string) => {
    const url = getStateUrl(stateId);
    transitionTo(url, { type: 'state', stateId });
  };

  const handleNavigateService = (serviceId: string) => {
    const url = getServiceUrl(serviceId);
    transitionTo(url, { type: 'service', serviceId });
  };

  const handleNavigateCondition = (conditionId: string) => {
    const url = getConditionUrl(conditionId);
    transitionTo(url, { type: 'condition', conditionId });
  };

  const handleNavigateBlog = () => {
    const url = getBlogUrl();
    transitionTo(url, { type: 'blog' });
  };

  const handleNavigateArticle = (articleSlug: string) => {
    const url = getArticleUrl(articleSlug);
    transitionTo(url, { type: 'article', articleSlug });
  };

  const handleNavigateBook = (stateId?: string, serviceId?: string) => {
    const url = getBookUrl(stateId, serviceId);
    transitionTo(url, { type: 'book', stateId, serviceId });
  };

  const handleNavigateContact = () => {
    transitionTo('/contact-us/', { type: 'contact' });
  };

  const handleNavigateCustomPage = (slug: string) => {
    transitionTo(`/${slug}/`, { type: 'custom-page', slug });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      
      {/* Top Header & Sticky Navigation (Rendered on standard pages; book route has its own dedicated focused clinic header) */}
      {currentRoute.type !== 'book' && (
        <Header
          onOpenApply={handleOpenApply}
          onOpenPortal={handleOpenPortal}
          onOpenContact={() => setIsContactModalOpen(true)}
          onNavigateHome={handleNavigateHome}
          onNavigateCity={handleNavigateCity}
          onNavigateState={handleNavigateState}
          onNavigateService={handleNavigateService}
          onNavigateCondition={handleNavigateCondition}
          onNavigateBlog={handleNavigateBlog}
          onNavigateArticle={handleNavigateArticle}
          onNavigateBook={handleNavigateBook}
          onNavigateContact={handleNavigateContact}
          onNavigateCustomPage={handleNavigateCustomPage}
          onOpenAdminSettings={() => setIsLeadManagerOpen(true)}
        />
      )}

      {/* Main Dynamic View Controller */}
      <main className="flex-1">
        {currentRoute.type === 'home' && (
          <>
            {/* Hero Section with Live Evaluation Intake Form & State Calculator */}
            {toggles.hero && (
              <HeroSection 
                onOpenApply={handleOpenApply} 
                onNavigateBook={handleNavigateBook}
                onOpenAdminSettings={() => setIsLeadManagerOpen(true)}
              />
            )}

            {/* Trust Proof Bar (99.2% approval, 15m turnaround, 50k patients, HIPAA) */}
            {toggles.trustStats && <TrustStatsBar />}

            {/* How It Works (3 Steps) */}
            {toggles.howItWorks && <HowItWorksSection onOpenApply={() => handleOpenApply()} />}

            {/* State-by-State Pricing & Law Guide (Directory & Filter) */}
            {toggles.stateDirectory && (
              <StateDirectorySection 
                onOpenApply={(stateId) => handleOpenApply(stateId)}
                onNavigateState={handleNavigateState}
              />
            )}

            {/* Benefits Comparison: Medical vs Recreational + Interactive Tax Savings Calculator */}
            {toggles.benefits && <BenefitsComparisonSection onOpenApply={() => handleOpenApply()} />}

            {/* Comprehensive Services (New Card, Renewal, Cultivation 99-Plant) */}
            {toggles.services && (
              <ServicesSection 
                onOpenApply={handleOpenApply} 
                onNavigateService={handleNavigateService}
              />
            )}

            {/* California Telehealth Cities Coverage Directory */}
            {toggles.cities && (
              <LocalCitiesDirectorySection
                onNavigateCity={handleNavigateCity}
                onOpenApply={handleOpenApply}
              />
            )}

            {/* Qualifying Conditions & 30-Second Pre-Qualification Self-Check */}
            {toggles.conditions && (
              <QualifyingConditionsSection 
                onOpenApply={() => handleOpenApply()} 
                onNavigateCondition={handleNavigateCondition}
              />
            )}

            {/* Medical Marijuana Insights & Educational Blog Showcase */}
            {toggles.blogTeaser && (
              <BlogHomeTeaserSection 
                onNavigateBlog={handleNavigateBlog}
                onNavigateArticle={handleNavigateArticle}
              />
            )}

            {/* Interactive State Reciprocity Checker */}
            {toggles.reciprocity && (
              <ReciprocityCheckerSection onOpenApply={(stateId) => handleOpenApply(stateId)} />
            )}

            {/* Transparent Pricing Packages */}
            {toggles.pricing && <PricingPlansSection onOpenApply={handleOpenApply} />}

            {/* Medical Advisory Board & Licensed MDs */}
            {toggles.doctors && <DoctorDirectorySection />}

            {/* Why Patients Trust Online MMJ Card (About Section Anchor) */}
            {toggles.whyTrust && <WhyTrustSection onOpenApply={() => handleOpenApply()} />}

            {/* Verified Patient Reviews */}
            {toggles.reviews && <ReviewsSection />}

            {/* SEO Topical Authority & Complete Patient Guide */}
            {toggles.seoContent && <SEOContentSection onOpenApply={handleOpenApply} />}

            {/* Frequently Asked Questions */}
            {toggles.faq && (
              <FAQSection 
                onOpenApply={() => handleOpenApply()} 
                onOpenContact={() => setIsContactModalOpen(true)} 
              />
            )}
          </>
        )}

        {/* Local City Page */}
        {currentRoute.type === 'city' && (() => {
          const city = getCityBySlug(currentRoute.slug);
          if (!city) {
            return (
              <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">City Not Found</h1>
                <button onClick={handleNavigateHome} className="mt-4 text-[#16a34a] font-bold underline">
                  Return to Home
                </button>
              </div>
            );
          }
          return (
            <LocalCityPage
              cityData={city}
              onOpenApply={handleOpenApply}
              onNavigateHome={handleNavigateHome}
              onNavigateCity={handleNavigateCity}
              onNavigateState={handleNavigateState}
            />
          );
        })()}

        {/* State Detail Page */}
        {currentRoute.type === 'state' && (() => {
          const state = getStateById(currentRoute.stateId);
          if (!state) {
            return (
              <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">State Not Found</h1>
                <button onClick={handleNavigateHome} className="mt-4 text-[#16a34a] font-bold underline">
                  Return to Home
                </button>
              </div>
            );
          }
          return (
            <StateDetailPage
              stateData={state}
              onOpenApply={handleOpenApply}
              onNavigateHome={handleNavigateHome}
              onNavigateCity={handleNavigateCity}
            />
          );
        })()}

        {/* Service Detail Page */}
        {currentRoute.type === 'service' && (() => {
          const service = getServiceById(currentRoute.serviceId);
          if (!service) {
            return (
              <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">Service Not Found</h1>
                <button onClick={handleNavigateHome} className="mt-4 text-[#16a34a] font-bold underline">
                  Return to Home
                </button>
              </div>
            );
          }
          return (
            <ServiceDetailPage
              serviceData={service}
              onOpenApply={handleOpenApply}
              onNavigateHome={handleNavigateHome}
            />
          );
        })()}

        {/* Condition Detail Page */}
        {currentRoute.type === 'condition' && (() => {
          const condition = getConditionById(currentRoute.conditionId);
          if (!condition) {
            return (
              <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">Condition Not Found</h1>
                <button onClick={handleNavigateHome} className="mt-4 text-[#16a34a] font-bold underline">
                  Return to Home
                </button>
              </div>
            );
          }
          return (
            <ConditionDetailPage
              conditionData={condition}
              onOpenApply={handleOpenApply}
              onNavigateHome={handleNavigateHome}
              onNavigateCondition={handleNavigateCondition}
            />
          );
        })()}

        {/* Medical Marijuana Insights Blog Listing */}
        {currentRoute.type === 'blog' && (
          <BlogInsightsPage
            onNavigateHome={handleNavigateHome}
            onNavigateArticle={handleNavigateArticle}
            onOpenApply={() => handleOpenApply()}
          />
        )}

        {/* Dedicated Article View */}
        {currentRoute.type === 'article' && (() => {
          const article = getArticleBySlug(currentRoute.articleSlug) || BLOG_ARTICLES_DATA[0];
          return (
            <ArticleDetailPage
              article={article}
              onNavigateHome={handleNavigateHome}
              onNavigateBlog={handleNavigateBlog}
              onNavigateArticle={handleNavigateArticle}
              onOpenApply={() => handleOpenApply()}
            />
          );
        })()}
        {/* Dedicated OnlineMMJCard Evaluation Intake Landing Page */}
        {currentRoute.type === 'book' && (
          <MyMMJDoctorEvaluationForm
            initialStateId={currentRoute.stateId || selectedStateId}
            initialServiceId={currentRoute.serviceId || selectedServiceId}
            onOpenAdminSettings={() => setIsLeadManagerOpen(true)}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {/* Dedicated Patient Contact Desk View */}
        {currentRoute.type === 'contact' && (
          <ContactPage
            onNavigateHome={handleNavigateHome}
            onOpenApply={handleOpenApply}
          />
        )}

        {/* Dynamic XML Sitemap Full-Page Interactive Generator */}
        {currentRoute.type === 'sitemap' && (
          <div className="py-12 px-4 max-w-5xl mx-auto min-h-[60vh]">
            <SitemapModal
              isOpen={true}
              onClose={handleNavigateHome}
              onNavigateHome={handleNavigateHome}
              onNavigateBlog={handleNavigateBlog}
              onNavigateArticle={handleNavigateArticle}
            />
          </div>
        )}

        {/* Dynamic WordPress Custom Pages (CRUD Managed) */}
        {currentRoute.type === 'custom-page' && (() => {
          const page = getPageBySlug(currentRoute.slug);
          if (!page) {
            return (
              <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">Page Not Found</h1>
                <p className="text-slate-500 mt-2 text-sm">The requested WordPress page could not be located.</p>
                <button onClick={handleNavigateHome} className="mt-4 text-[#16a34a] font-bold underline cursor-pointer">
                  Return to Home
                </button>
              </div>
            );
          }
          return (
            <CustomPageView
              page={page}
              onNavigateHome={handleNavigateHome}
              onOpenApply={handleOpenApply}
              onOpenAdminSettings={() => setIsLeadManagerOpen(true)}
            />
          );
        })()}
      </main>

      {/* High-Authority Healthcare Footer */}
      {currentRoute.type !== 'book' && (
        <Footer
          onOpenApply={handleOpenApply}
          onOpenPortal={handleOpenPortal}
          onOpenContact={() => setIsContactModalOpen(true)}
          onNavigateState={handleNavigateState}
          onNavigateCity={handleNavigateCity}
          onNavigateBlog={handleNavigateBlog}
          onNavigateArticle={handleNavigateArticle}
          onOpenAdminSettings={() => setIsLeadManagerOpen(true)}
        />
      )}

      {/* Patient Support & Contact Desk Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onOpenLiveChat={() => {
          window.dispatchEvent(new CustomEvent('open-live-chat'));
        }}
      />

      {/* Multi-Step Patient Telehealth Intake Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialStateId={selectedStateId}
        initialServiceId={selectedServiceId}
      />

      {/* Patient Portal & Verification Modal */}
      <PatientPortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        onOpenRenewal={handleOpenRenewal}
      />

      {/* Patient Leads & Notification Settings Modal */}
      <LeadManagerModal
        isOpen={isLeadManagerOpen}
        onClose={() => setIsLeadManagerOpen(false)}
      />

      {/* Elementor / Divi Pro Style Visual Theme Customizer (Admin only) */}
      <ThemeVisualBuilder
        isOpen={isVisualBuilderOpen}
        onClose={() => setIsVisualBuilderOpen(false)}
        currentRoute={currentRoute}
        onNavigateCity={handleNavigateCity}
        onNavigateState={handleNavigateState}
        onNavigateService={handleNavigateService}
        onNavigateCondition={handleNavigateCondition}
        onNavigateArticle={handleNavigateArticle}
        onNavigateHome={handleNavigateHome}
      />

      {/* Discreet Admin Floating Dock (Visible only to logged-in administrators / builder mode) */}
      {isAdminUser && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
          <button
            onClick={() => setIsVisualBuilderOpen(!isVisualBuilderOpen)}
            className="px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider shadow-2xl backdrop-blur-md border border-slate-700 hover:border-emerald-500 transition-all flex items-center gap-2 cursor-pointer group"
            title="Open Elementor / Divi Visual Customizer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse" />
            <span>{isVisualBuilderOpen ? 'Close Editor' : '✏️ Visual Theme Builder'}</span>
          </button>
        </div>
      )}

      {/* Live Sync Notification Toast from WordPress Page Builder Saves */}
      {liveSyncToast && (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2.5 bg-slate-900/95 text-emerald-300 border border-emerald-500/50 shadow-2xl px-4 py-2.5 rounded-full text-xs font-bold backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{liveSyncToast.message}</span>
        </div>
      )}

      {/* Persistent Live Chat Support Bubble in Bottom-Right Corner */}
      <LiveChatSupport onOpenApply={handleOpenApply} />

    </div>
  );
}
