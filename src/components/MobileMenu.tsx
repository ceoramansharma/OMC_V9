import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, ChevronDown, ChevronRight, Phone, Search, ShieldCheck, 
  MapPin, FileText, RefreshCw, Sprout, HeartHandshake, User, 
  ArrowRight, Sparkles, BookOpen, Scale, HelpCircle, CheckCircle2 
} from 'lucide-react';
import { STATES_DATA } from '../data/mmjData';
import { LOCAL_CITIES_DATA } from '../data/localSeoData';
import { useCustomPages } from '../utils/customPagesStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: (stateId?: string, serviceId?: string) => void;
  onOpenPortal: () => void;
  onOpenContact?: () => void;
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
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
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
}) => {
  const { navPages } = useCustomPages();
  const [searchQuery, setSearchQuery] = useState('');
  const [openSection, setOpenSection] = useState<string | null>('services');

  // Prevent scroll when mobile menu is open, without clashing with WordPress editor
  useEffect(() => {
    if (!isOpen) return;

    // Detect if inside WordPress editor canvas to avoid disrupting editor gestures
    const isWpEditor = 
      typeof document !== 'undefined' && 
      (document.body.classList.contains('elementor-editor-active') || 
       document.body.classList.contains('et-fb') ||
       window.location.search.includes('elementor-preview'));

    if (!isWpEditor) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAction = (callback?: () => void) => {
    onClose();
    if (callback) callback();
  };

  // Filtered states and cities for instant mobile search
  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return STATES_DATA.filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return LOCAL_CITIES_DATA.filter((c) => c.cityName.toLowerCase().includes(q) || c.stateCode.toLowerCase().includes(q));
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
      {/* Dimmed Backdrop with Blur */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Drawer Container */}
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden transform transition-transform animate-in slide-in-from-right duration-250"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Top App Bar inside Drawer */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div 
            onClick={() => handleAction(onNavigateHome)} 
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#16a34a] flex items-center justify-center text-white shadow-xs">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 10 7 8 9C6 11 3 12 3 12C3 12 7 14 9 16C11 18 12 22 12 22C12 22 13 18 15 16C17 14 21 12 21 12C21 12 18 11 16 9C14 7 12 2 12 2Z" fill="white" />
              </svg>
            </div>
            <div>
              <span className="text-base font-black text-slate-900 tracking-tight">
                ONLINE MMJ <span className="text-[#16a34a]">CARD</span>
              </span>
              <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                Telehealth Clinic
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 divide-y divide-slate-100">
          
          {/* Quick Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => handleAction(() => onNavigateBook ? onNavigateBook() : onOpenApply())}
              className="w-full py-3.5 bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Start Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAction(onOpenPortal)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span>Patient Portal</span>
              </button>
              <a
                href="tel:8884206789"
                className="py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>(888) 420-6789</span>
              </a>
            </div>
          </div>

          {/* Quick Instant Search */}
          <div className="pt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search state, city, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-100 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {searchQuery.trim() && (
              <div className="mt-2 bg-slate-50 border border-slate-200 rounded-xl p-2 space-y-1 max-h-48 overflow-y-auto text-xs">
                {filteredStates.length === 0 && filteredCities.length === 0 && (
                  <div className="text-slate-400 text-center py-2">No matching states or cities found</div>
                )}
                {filteredStates.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleAction(() => onNavigateState ? onNavigateState(st.id) : onOpenApply(st.id))}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white text-slate-800 font-bold flex items-center justify-between"
                  >
                    <span>{st.name} ({st.code}) MMJ Card</span>
                    <span className="text-emerald-700 font-extrabold">${st.price}</span>
                  </button>
                ))}
                {filteredCities.map((ct) => (
                  <button
                    key={ct.slug}
                    onClick={() => handleAction(() => onNavigateCity ? onNavigateCity(ct.slug) : onNavigateHome?.())}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white text-slate-800 font-medium flex items-center justify-between"
                  >
                    <span>{ct.cityName}, {ct.stateCode} 420 Doctor</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Category Accordions */}
          <div className="pt-4 space-y-2 text-xs font-bold text-slate-800">
            
            {/* 1. Services */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('services')}
                className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-left text-slate-900 font-extrabold uppercase tracking-wide hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#16a34a]" />
                  <span>Get My Card (Services)</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'services' ? 'rotate-180 text-[#16a34a]' : ''}`} />
              </button>
              {openSection === 'services' && (
                <div className="p-2 space-y-1 bg-white">
                  <button
                    onClick={() => handleAction(() => onNavigateService ? onNavigateService('new-patient') : onOpenApply(undefined, 'new-patient'))}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold">New Patient MMJ Card</div>
                      <div className="text-[11px] text-slate-400 font-normal">First-time telehealth evaluation</div>
                    </div>
                    <span className="text-emerald-700 font-extrabold">$39.99</span>
                  </button>
                  <button
                    onClick={() => handleAction(() => onNavigateService ? onNavigateService('renewal') : onOpenApply(undefined, 'renewal'))}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold">MMJ Card Renewal</div>
                      <div className="text-[11px] text-slate-400 font-normal">Fast 5-min recertification</div>
                    </div>
                    <span className="text-emerald-700 font-extrabold">$34.99</span>
                  </button>
                  <button
                    onClick={() => handleAction(() => onNavigateService ? onNavigateService('cultivation') : onOpenApply(undefined, 'cultivation'))}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold">99-Plant Cultivation Rec</div>
                      <div className="text-[11px] text-slate-400 font-normal">Extended medical grower certification</div>
                    </div>
                    <span className="text-emerald-700 font-extrabold">$149</span>
                  </button>
                  <button
                    onClick={() => handleAction(() => onNavigateService ? onNavigateService('esa-letter') : onOpenApply(undefined, 'esa-letter'))}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold">ESA Support Animal Letter</div>
                      <div className="text-[11px] text-slate-400 font-normal">Housing accommodation & pet fees exemption</div>
                    </div>
                    <span className="text-emerald-700 font-extrabold">$129</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. States Laws & Pricing */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('states')}
                className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-left text-slate-900 font-extrabold uppercase tracking-wide hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#16a34a]" />
                  <span>States & State Laws</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'states' ? 'rotate-180 text-[#16a34a]' : ''}`} />
              </button>
              {openSection === 'states' && (
                <div className="p-2 space-y-1 bg-white">
                  <div className="grid grid-cols-2 gap-1.5">
                    {STATES_DATA.slice(0, 10).map((st) => (
                      <button
                        key={st.id}
                        onClick={() => handleAction(() => onNavigateState ? onNavigateState(st.id) : onOpenApply(st.id))}
                        className="px-2.5 py-2 text-left rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-bold truncate transition-colors"
                      >
                        {st.name} ({st.code})
                      </button>
                    ))}
                  </div>
                  <a
                    href="#states-directory"
                    onClick={() => handleAction()}
                    className="block text-center py-2 text-xs font-bold text-[#16a34a] hover:underline pt-2 border-t border-slate-100"
                  >
                    View All {STATES_DATA.length} States Directory &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* 3. Local Cities */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('cities')}
                className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-left text-slate-900 font-extrabold uppercase tracking-wide hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#16a34a]" />
                  <span>Local City 420 Doctors</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'cities' ? 'rotate-180 text-[#16a34a]' : ''}`} />
              </button>
              {openSection === 'cities' && (
                <div className="p-2 space-y-1 bg-white">
                  <div className="grid grid-cols-2 gap-1.5">
                    {LOCAL_CITIES_DATA.slice(0, 8).map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => handleAction(() => onNavigateCity ? onNavigateCity(city.slug) : onNavigateHome?.())}
                        className="px-2.5 py-2 text-left rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-bold truncate transition-colors"
                      >
                        {city.cityName}, {city.stateCode}
                      </button>
                    ))}
                  </div>
                  <a
                    href="#local-cities"
                    onClick={() => handleAction()}
                    className="block text-center py-2 text-xs font-bold text-[#16a34a] hover:underline pt-2 border-t border-slate-100"
                  >
                    View All City Coverage &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* 4. Cannabis Resources & Insights */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('resources')}
                className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-left text-slate-900 font-extrabold uppercase tracking-wide hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#16a34a]" />
                  <span>Cannabis Resources</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'resources' ? 'rotate-180 text-[#16a34a]' : ''}`} />
              </button>
              {openSection === 'resources' && (
                <div className="p-2 space-y-1 bg-white">
                  <button
                    onClick={() => handleAction(onNavigateBlog)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-bold"
                  >
                    Medical Marijuana Insights (All Articles)
                  </button>
                  <a
                    href="#conditions"
                    onClick={() => handleAction()}
                    className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium"
                  >
                    Qualifying Conditions Self-Check
                  </a>
                  <a
                    href="#reciprocity"
                    onClick={() => handleAction()}
                    className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium"
                  >
                    State Reciprocity Travel Checker
                  </a>
                  <a
                    href="#benefits-comparison"
                    onClick={() => handleAction()}
                    className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium"
                  >
                    Dispensary Tax Savings Calculator
                  </a>
                  <a
                    href="#faq"
                    onClick={() => handleAction()}
                    className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-medium"
                  >
                    Frequently Asked Questions
                  </a>
                </div>
              )}
            </div>

            {/* 5. Custom Dynamic WordPress Pages (if created in admin) */}
            {navPages.length > 0 && (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('custom')}
                  className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-left text-slate-900 font-extrabold uppercase tracking-wide hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#16a34a]" />
                    <span>More Pages</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'custom' ? 'rotate-180 text-[#16a34a]' : ''}`} />
                </button>
                {openSection === 'custom' && (
                  <div className="p-2 space-y-1 bg-white">
                    {navPages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => handleAction(() => onNavigateCustomPage ? onNavigateCustomPage(page.slug) : onNavigateHome?.())}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 font-bold"
                      >
                        {page.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. Contact Us Support Desk */}
            <button
              onClick={() => handleAction(() => onNavigateContact ? onNavigateContact() : onOpenContact ? onOpenContact() : undefined)}
              className="w-full px-4 py-3 bg-slate-50 rounded-xl flex items-center justify-between text-left text-slate-900 font-extrabold uppercase tracking-wide hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#16a34a]" />
                <span>Contact Patient Support Desk</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
              <span>99% Guaranteed Approval or 100% Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
              <span>HIPAA Compliant & Encrypted Patient Records</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
              <span>Board-Certified Licensed Cannabis Physicians</span>
            </div>
          </div>

        </div>

        {/* Bottom Drawer Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 text-xs flex items-center justify-between">
          <span className="text-slate-500">Questions?</span>
          <a href="tel:8884206789" className="font-extrabold text-[#16a34a] flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>(888) 420-6789</span>
          </a>
        </div>
      </div>
    </div>
  );
};
