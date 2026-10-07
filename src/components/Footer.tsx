import React from 'react';
import { useThemeContent } from '../utils/themeContent';
import { 
  Phone, Mail, Clock, ShieldCheck, HeartHandshake, FileCheck, 
  MapPin, HelpCircle, Lock 
} from 'lucide-react';

interface FooterProps {
  onOpenApply: (stateId?: string, serviceId?: string) => void;
  onOpenPortal: () => void;
  onOpenContact?: () => void;
  onNavigateState?: (stateId: string) => void;
  onNavigateCity?: (citySlug: string) => void;
  onNavigateBlog?: () => void;
  onNavigateArticle?: (slug: string) => void;
  onOpenLeadSettings?: () => void;
  onOpenAdminSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenApply, 
  onOpenPortal,
  onOpenContact,
  onNavigateState,
  onNavigateCity,
  onNavigateBlog,
  onNavigateArticle,
  onOpenLeadSettings,
  onOpenAdminSettings
}) => {
  const themeContent = useThemeContent();
  const footerContent = themeContent.footer;
  const openSettings = onOpenAdminSettings || onOpenLeadSettings;
  const allStatesList = [
    'Arizona', 'Arkansas', 'California', 'Connecticut', 'Delaware', 'Florida',
    'Georgia', 'Illinois', 'Iowa', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nevada', 'New Jersey', 'New Mexico', 'New York',
    'North Dakota', 'Ohio', 'Oklahoma', 'Pennsylvania', 'Texas',
    'Vermont', 'Virginia', 'Washington DC', 'West Virginia'
  ];

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
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Navigation Grid from Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#16a34a] flex items-center justify-center text-white shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 10 7 8 9C6 11 3 12 3 12C3 12 7 14 9 16C11 18 12 22 12 22C12 22 13 18 15 16C17 14 21 12 21 12C21 12 18 11 16 9C14 7 12 2 12 2Z" fill="white" />
                </svg>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                ONLINE MMJ <span className="text-[#16a34a]">CARD</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              United States' most trusted medical marijuana card service.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#16a34a] hover:text-white transition-colors flex items-center justify-center cursor-pointer font-bold">
                f
              </span>
              <span className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#16a34a] hover:text-white transition-colors flex items-center justify-center cursor-pointer font-bold">
                𝕏
              </span>
              <span className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#16a34a] hover:text-white transition-colors flex items-center justify-center cursor-pointer font-bold">
                in
              </span>
              <span className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#16a34a] hover:text-white transition-colors flex items-center justify-center cursor-pointer font-bold">
                ▶
              </span>
            </div>

            <div className="pt-2 text-xs text-slate-500">
              {footerContent.copyrightText}
            </div>

            {/* Location & Discovery */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <h5 className="font-bold text-white text-[11px] uppercase tracking-wider">
                Location & Discovery
              </h5>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <a href="#states-directory" className="hover:text-[#16a34a] transition-colors">Locations</a>
                <span>·</span>
                <a href="#states-directory" className="hover:text-[#16a34a] transition-colors">Sitemap</a>
              </div>
            </div>
          </div>

          {/* Column 2: Services (From Screenshot) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onOpenApply(undefined, 'new-patient')} className="hover:text-[#16a34a] transition-colors cursor-pointer text-left">
                  Book Appointment
                </button>
              </li>
              <li>
                <button onClick={() => onOpenApply(undefined, 'renewal')} className="hover:text-[#16a34a] transition-colors cursor-pointer text-left">
                  Card Renewal
                </button>
              </li>
              <li>
                <a href="#conditions" className="hover:text-[#16a34a] transition-colors">
                  Do I Qualify
                </a>
              </li>
              <li>
                <a href="#medical-team" className="hover:text-[#16a34a] transition-colors">
                  Our MMJ Doctors
                </a>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-[#16a34a] transition-colors cursor-pointer text-left font-bold text-[#16a34a]">
                  Patient Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Education (From Screenshot) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Support & Education
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => safeNavigate('/medical-marijuana-insights/', onNavigateBlog)} 
                  className="hover:text-[#16a34a] transition-colors cursor-pointer text-left"
                >
                  Medical Marijuana Insights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => safeNavigate('/medical-marijuana-card-vs-recreational-cannabis/', () => onNavigateArticle && onNavigateArticle('medical-marijuana-card-vs-recreational-cannabis'))} 
                  className="hover:text-[#16a34a] transition-colors cursor-pointer text-left"
                >
                  MMJ Card vs Recreational
                </button>
              </li>
              <li>
                <button 
                  onClick={() => safeNavigate('/understanding-terpenes-cannabinoids-guide/', () => onNavigateArticle && onNavigateArticle('understanding-terpenes-cannabinoids-guide'))} 
                  className="hover:text-[#16a34a] transition-colors cursor-pointer text-left"
                >
                  Terpenes & Cannabinoids Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => safeNavigate('/california-ab-2188-workplace-drug-testing-rights/', () => onNavigateArticle && onNavigateArticle('california-ab-2188-workplace-drug-testing-rights'))} 
                  className="hover:text-[#16a34a] transition-colors cursor-pointer text-left"
                >
                  Workplace Drug Testing Rights
                </button>
              </li>
              <li>
                <a href="#why-trust" className="hover:text-[#16a34a] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-[#16a34a] transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#16a34a] transition-colors">
                  FAQ Centre
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Editorial (From Screenshot) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Legal & Editorial
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-[#16a34a] cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-[#16a34a] cursor-pointer">HIPAA Compliance</span></li>
              <li><span className="hover:text-[#16a34a] cursor-pointer">Consent for Telehealth</span></li>
              <li><span className="hover:text-[#16a34a] cursor-pointer">Terms of Use</span></li>
              <li><span className="hover:text-[#16a34a] cursor-pointer">Refund Policy</span></li>
              <li><span className="hover:text-[#16a34a] cursor-pointer">Shipping Policy</span></li>
              <li><span className="hover:text-[#16a34a] cursor-pointer">Accessibility Statement</span></li>
              <li><span className="hover:text-[#16a34a] cursor-pointer">Editorial Policy</span></li>
              <li><span className="hover:text-[#16a34a] cursor-pointer">Disclaimer</span></li>
            </ul>
          </div>

        </div>

        {/* Popular SEO Keyword Search Topics */}
        <div className="py-6 border-b border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <div className="text-center font-bold text-slate-300 uppercase tracking-wider mb-2 text-[10px]">
            Popular Telehealth MMJ Search Terms
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 text-slate-400">
            <button onClick={() => onOpenApply(undefined, 'new-patient')} className="hover:text-[#16a34a] transition-colors cursor-pointer">Medical Marijuana Card Online</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => onOpenApply(undefined, 'new-patient')} className="hover:text-[#16a34a] transition-colors cursor-pointer">420 Evaluations Near Me</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => onOpenApply(undefined, 'new-patient')} className="hover:text-[#16a34a] transition-colors cursor-pointer">Medical Marijuana Doctor Telehealth</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => onOpenApply(undefined, 'new-patient')} className="hover:text-[#16a34a] transition-colors cursor-pointer">MMJ Doctor Consultation</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => onOpenApply(undefined, 'renewal')} className="hover:text-[#16a34a] transition-colors cursor-pointer">Medical Cannabis Card Renewal</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => onOpenApply(undefined, 'new-patient')} className="hover:text-[#16a34a] transition-colors cursor-pointer">Medical Marijuana Evaluations</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => onOpenApply(undefined, 'new-patient')} className="hover:text-[#16a34a] transition-colors cursor-pointer">Same Day 420 Doctor</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => onOpenApply(undefined, 'cultivation')} className="hover:text-[#16a34a] transition-colors cursor-pointer">99-Plant Cultivation Recommendation</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => onOpenApply(undefined, 'new-patient')} className="hover:text-[#16a34a] transition-colors cursor-pointer">Cheap MMJ Card Online</button>
          </div>
        </div>

        {/* Full State List Bar (Matching Screenshot) */}
        <div className="py-8 border-b border-slate-800 text-[11px] text-slate-400 leading-relaxed text-center">
          <p>
            {allStatesList.map((st, i) => (
              <span key={st}>
                <button
                  onClick={() => {
                    const stId = st.toLowerCase().replace(/\s+/g, '-');
                    if (onNavigateState) onNavigateState(stId);
                    else onOpenApply(stId);
                  }}
                  className="hover:text-[#16a34a] transition-colors cursor-pointer"
                >
                  {st}
                </button>
                {i < allStatesList.length - 1 && <span className="text-slate-600 mx-2">·</span>}
              </span>
            ))}
          </p>
        </div>

        {/* Medical Disclaimer Banner (From Screenshot) */}
        <div className="pt-6 text-[11px] text-slate-400 leading-relaxed">
          <p>
            {footerContent.disclaimerText}
          </p>
        </div>

      </div>
    </footer>
  );
};
