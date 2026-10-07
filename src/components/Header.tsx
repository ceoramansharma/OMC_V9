import React, { useState, useEffect } from 'react';
import { Phone, Search, User, ChevronDown, Menu, X, ArrowRight, ShieldCheck, CheckCircle2, Settings, Mail, FileText } from 'lucide-react';
import { STATES_DATA } from '../data/mmjData';
import { useCustomPages } from '../utils/customPagesStore';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  onOpenApply: (stateId?: string, serviceId?: string) => void;
  onOpenPortal: () => void;
  onOpenContact?: () => void;
  onOpenSearch?: () => void;
  onNavigateHome?: () => void;
  onNavigateCity?: (citySlug: string) => void;
  onNavigateState?: (stateId: string) => void;
  onNavigateService?: (serviceId: string) => void;
  onNavigateCondition?: (conditionId: string) => void;
  onNavigateBlog?: () => void;
  onNavigateArticle?: (slug: string) => void;
  onNavigateBook?: (stateId?: string, serviceId?: string) => void;
  onNavigateContact?: () => void;
  onNavigateCustomPage?: (slug: string) => void;
  onOpenLeadSettings?: () => void;
  onOpenAdminSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenApply, 
  onOpenPortal,
  onOpenContact,
  onNavigateHome,
  onNavigateCity,
  onNavigateState,
  onNavigateService,
  onNavigateCondition,
  onNavigateBlog,
  onNavigateArticle,
  onNavigateBook,
  onNavigateContact,
  onNavigateCustomPage,
  onOpenLeadSettings,
  onOpenAdminSettings
}) => {
  const { navPages } = useCustomPages();
  const openSettings = onOpenAdminSettings || onOpenLeadSettings;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statesDropdownOpen, setStatesDropdownOpen] = useState(false);
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Indicator Calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStateSelect = (stateId: string) => {
    setStatesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateState) {
      onNavigateState(stateId);
    } else {
      onOpenApply(stateId);
    }
  };

  const safeNavigate = (url: string, callback?: () => void) => {
    if (callback) {
      callback();
    } else {
      try {
        window.history.pushState(null, '', url);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (e) {
        window.location.href = url;
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-slate-100">
      
      {/* Slim Progress-Bar-Style Scroll Indicator */}
      <div 
        className="w-full h-[3.5px] bg-emerald-950/25 overflow-hidden relative"
        role="progressbar" 
        aria-valuenow={Math.round(scrollProgress)} 
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-label="Reading scroll progress"
      >
        <div 
          className="h-full bg-gradient-to-r from-emerald-300 via-lime-300 to-white transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(110,231,183,0.9)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Banner from Screenshot: "Elevate with peace: 10% off with your medical card! · (888) 420-6789" */}
      <div className="bg-[#15803d] text-white text-xs py-2 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>Elevate with peace: <strong>10% off</strong> with your medical card!</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <a href="tel:8884206789" className="flex items-center gap-1.5 font-bold hover:underline text-emerald-100">
              <Phone className="w-3.5 h-3.5" />
              <span>(888) 420-6789</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand: ONLINE MMJ CARD (Matching screenshot's logo lockup) */}
          <div 
            onClick={() => safeNavigate('/', onNavigateHome)}
            className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#16a34a] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 10 7 8 9C6 11 3 12 3 12C3 12 7 14 9 16C11 18 12 22 12 22C12 22 13 18 15 16C17 14 21 12 21 12C21 12 18 11 16 9C14 7 12 2 12 2Z" fill="white" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                ONLINE MMJ <span className="text-[#16a34a]">CARD</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Doctor Telemedicine
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Matching Screenshot: GET MY CARD, CANNABIS RESOURCES, ABOUT, SELECT STATE) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold tracking-wide uppercase text-slate-700">
            
            {/* GET MY CARD DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setCardDropdownOpen(true)}
              onMouseLeave={() => setCardDropdownOpen(false)}
            >
              <button 
                onClick={() => setCardDropdownOpen(!cardDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#16a34a] transition-colors py-2 focus:outline-none cursor-pointer"
              >
                <span>GET MY CARD</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#16a34a]" />
              </button>

              {cardDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 normal-case tracking-normal animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => { 
                      setCardDropdownOpen(false); 
                      if (onNavigateService) onNavigateService('new-patient');
                      else onOpenApply(undefined, 'new-patient'); 
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <div>New Patient MMJ Card</div>
                    <span className="text-[11px] text-slate-400 font-normal">First-time state recommendation</span>
                  </button>
                  <button
                    onClick={() => { 
                      setCardDropdownOpen(false); 
                      if (onNavigateService) onNavigateService('renewal');
                      else onOpenApply(undefined, 'renewal'); 
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <div>MMJ Card Renewal</div>
                    <span className="text-[11px] text-slate-400 font-normal">Fast 5-min annual renewal</span>
                  </button>
                  <button
                    onClick={() => { 
                      setCardDropdownOpen(false); 
                      if (onNavigateService) onNavigateService('cultivation');
                      else onOpenApply(undefined, 'cultivation'); 
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <div>99-Plant Cultivation Rec</div>
                    <span className="text-[11px] text-slate-400 font-normal">Extended medical grower license</span>
                  </button>
                </div>
              )}
            </div>

            {/* RESOURCES MEGA-DROPDOWN (Housing all Blog & Information) */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <button 
                onClick={() => {
                  setResourcesDropdownOpen(!resourcesDropdownOpen);
                  safeNavigate('/medical-marijuana-insights/', onNavigateBlog);
                }}
                className="flex items-center gap-1 hover:text-[#16a34a] transition-colors py-2 focus:outline-none cursor-pointer"
              >
                <span>RESOURCES</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-white rounded-2xl shadow-xl border border-slate-100 p-5 grid grid-cols-2 gap-6 z-50 normal-case tracking-normal animate-in fade-in slide-in-from-top-2">
                  
                  {/* Left Column: Medical Marijuana Insights Blog */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Medical Marijuana Insights
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Blog & News
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setResourcesDropdownOpen(false);
                        safeNavigate('/medical-marijuana-insights/', onNavigateBlog);
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-900 hover:text-emerald-900 transition-colors cursor-pointer group"
                    >
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span>All Medical Articles & Guides</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#16a34a] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                        Clinical research, dosing & laws
                      </p>
                    </button>

                    <div className="space-y-1 pt-1 text-xs">
                      <button
                        onClick={() => {
                          setResourcesDropdownOpen(false);
                          safeNavigate('/medical-marijuana-card-vs-recreational-cannabis/', () => onNavigateArticle && onNavigateArticle('medical-marijuana-card-vs-recreational-cannabis'));
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] font-medium transition-colors cursor-pointer truncate"
                      >
                        • MMJ Card vs. Recreational
                      </button>

                      <button
                        onClick={() => {
                          setResourcesDropdownOpen(false);
                          safeNavigate('/how-to-talk-to-doctor-about-medical-marijuana/', () => onNavigateArticle && onNavigateArticle('how-to-talk-to-doctor-about-medical-marijuana'));
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] font-medium transition-colors cursor-pointer truncate"
                      >
                        • Talking to an MMJ Doctor
                      </button>

                      <button
                        onClick={() => {
                          setResourcesDropdownOpen(false);
                          safeNavigate('/understanding-terpenes-cannabinoids-guide/', () => onNavigateArticle && onNavigateArticle('understanding-terpenes-cannabinoids-guide'));
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] font-medium transition-colors cursor-pointer truncate"
                      >
                        • Patient Guide to Terpenes & CBD
                      </button>

                      <button
                        onClick={() => {
                          setResourcesDropdownOpen(false);
                          safeNavigate('/california-ab-2188-workplace-drug-testing-rights/', () => onNavigateArticle && onNavigateArticle('california-ab-2188-workplace-drug-testing-rights'));
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] font-medium transition-colors cursor-pointer truncate"
                      >
                        • AB 2188 Workplace Testing Rights
                      </button>

                      <button
                        onClick={() => {
                          setResourcesDropdownOpen(false);
                          safeNavigate('/medical-marijuana-for-seniors-aging-comfortably/', () => onNavigateArticle && onNavigateArticle('medical-marijuana-for-seniors-aging-comfortably'));
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] font-medium transition-colors cursor-pointer truncate"
                      >
                        • Medical Cannabis for Seniors
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Educational Centers & Tools */}
                  <div className="space-y-2.5">
                    <div className="pb-2 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Patient Tools & Reference
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <a
                        href="#conditions"
                        onClick={() => setResourcesDropdownOpen(false)}
                        className="block px-2.5 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] transition-colors"
                      >
                        <div className="font-bold text-slate-900">Pre-Qualification Self-Check</div>
                        <div className="text-[11px] text-slate-500">30-second symptom questionnaire</div>
                      </a>

                      <a
                        href="#reciprocity"
                        onClick={() => setResourcesDropdownOpen(false)}
                        className="block px-2.5 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] transition-colors"
                      >
                        <div className="font-bold text-slate-900">State Reciprocity Checker</div>
                        <div className="text-[11px] text-slate-500">Travel rules & out-of-state cards</div>
                      </a>

                      <a
                        href="#benefits-comparison"
                        onClick={() => setResourcesDropdownOpen(false)}
                        className="block px-2.5 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] transition-colors"
                      >
                        <div className="font-bold text-slate-900">Tax Savings Calculator</div>
                        <div className="text-[11px] text-slate-500">Medical vs recreational retail taxes</div>
                      </a>

                      <a
                        href="#faqs"
                        onClick={() => setResourcesDropdownOpen(false)}
                        className="block px-2.5 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#16a34a] transition-colors"
                      >
                        <div className="font-bold text-slate-900">FAQ Knowledge Base</div>
                        <div className="text-[11px] text-slate-500">Answers to top 10 patient questions</div>
                      </a>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* ABOUT */}
            <a href="#why-trust" className="hover:text-[#16a34a] transition-colors">
              ABOUT
            </a>

            {/* CONTACT US */}
            <button
              onClick={() => {
                if (onNavigateContact) {
                  onNavigateContact();
                } else if (onOpenContact) {
                  onOpenContact();
                } else {
                  safeNavigate('/contact-us/');
                }
              }}
              className="hover:text-[#16a34a] transition-colors cursor-pointer uppercase font-bold"
            >
              CONTACT US
            </button>

            {/* Dynamically Linked WordPress Pages */}
            {navPages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  if (onNavigateCustomPage) {
                    onNavigateCustomPage(page.slug);
                  } else {
                    safeNavigate(`/${page.slug}/`);
                  }
                }}
                className="hover:text-[#16a34a] transition-colors cursor-pointer uppercase font-bold text-[13px] tracking-wide"
                title={page.title}
              >
                {page.title}
              </button>
            ))}

            {/* SELECT STATE DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setStatesDropdownOpen(true)}
              onMouseLeave={() => setStatesDropdownOpen(false)}
            >
              <button 
                onClick={() => setStatesDropdownOpen(!statesDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#16a34a] transition-colors py-2 focus:outline-none cursor-pointer"
              >
                <span>SELECT STATE</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {statesDropdownOpen && (
                <div className="absolute top-full right-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-3 grid grid-cols-2 gap-1.5 z-50 normal-case tracking-normal animate-in fade-in slide-in-from-top-2">
                  <div className="col-span-2 pb-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Your State
                  </div>
                  {STATES_DATA.slice(0, 10).map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleStateSelect(st.id)}
                      className="text-left px-2 py-1.5 rounded-lg hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-[#16a34a] flex items-center justify-between"
                    >
                      <span>{st.name}</span>
                      <span className="text-[#16a34a] font-bold">${st.price}</span>
                    </button>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-100">
                    <a
                      href="#states-directory"
                      onClick={() => setStatesDropdownOpen(false)}
                      className="text-xs text-[#16a34a] font-bold flex items-center justify-center gap-1 hover:underline"
                    >
                      View All 20+ States <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* Right Action Icons & Button (Matching Screenshot: Search Icon, User Icon, Green 'START EVALUATION' Button) */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Search Icon */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none cursor-pointer"
                title="Search conditions & states"
              >
                <Search className="w-5 h-5" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white p-2.5 rounded-xl shadow-xl border border-slate-200 z-50">
                  <input
                    type="text"
                    placeholder="Search state, condition, pricing..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    autoFocus
                  />
                  {searchVal && (
                    <div className="mt-2 text-xs text-slate-600 space-y-1">
                      <a href="#conditions" onClick={() => setSearchOpen(false)} className="block p-1.5 rounded hover:bg-slate-50 font-medium">
                        Search in Qualifying Conditions
                      </a>
                      <a href="#states-directory" onClick={() => setSearchOpen(false)} className="block p-1.5 rounded hover:bg-slate-50 font-medium">
                        Search in State Directory
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Patient Portal / User Icon */}
            <button
              onClick={onOpenPortal}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none cursor-pointer"
              title="Patient Login / Portal"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Primary Action Button (Vibrant Green matching Screenshot) */}
            <button
              onClick={() => onNavigateBook ? onNavigateBook() : onOpenApply()}
              className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider text-white bg-[#008f58] hover:bg-[#007a4a] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              START EVALUATION
            </button>
          </div>

          {/* Mobile & Tablet Navigation Hamburger (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onNavigateBook ? onNavigateBook() : onOpenApply()}
              className="px-3.5 py-1.5 rounded-full text-xs font-black text-white bg-[#008f58] hover:bg-[#007a4a] transition-colors"
            >
              START
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Dedicated Responsive Mobile Menu Drawer Component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenApply={onOpenApply}
        onOpenPortal={onOpenPortal}
        onOpenContact={onOpenContact}
        onNavigateHome={onNavigateHome}
        onNavigateCity={onNavigateCity}
        onNavigateState={onNavigateState}
        onNavigateService={onNavigateService}
        onNavigateCondition={onNavigateCondition}
        onNavigateBlog={onNavigateBlog}
        onNavigateArticle={onNavigateArticle}
        onNavigateBook={onNavigateBook}
        onNavigateContact={onNavigateContact}
        onNavigateCustomPage={onNavigateCustomPage}
      />

    </header>
  );
};
