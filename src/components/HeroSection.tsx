import React, { useState, useEffect } from 'react';
import { STATES_DATA } from '../data/mmjData';
import { 
  ArrowRight, Star, ShieldCheck, CheckCircle2, 
  Settings, DollarSign, Zap, RefreshCw, Mail, ExternalLink, MapPin 
} from 'lucide-react';
import { 
  getLeadSettings, 
  submitPatientLead, 
  LeadSettings, 
  LeadSubmission 
} from '../utils/leadStorage';
import { getThemeContent, ThemeContent } from '../utils/themeContent';
import { useDetectedState } from '../utils/geoDetection';

interface HeroSectionProps {
  onOpenApply: (stateId?: string) => void;
  onNavigateBook?: (stateId?: string) => void;
  onOpenAdminSettings?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenApply, 
  onNavigateBook,
  onOpenAdminSettings 
}) => {
  const {
    selectedStateId,
    currentState,
    setSelectedStateId,
    isAutoDetected,
    detectedStateName
  } = useDetectedState();

  // Form states
  const [settings, setSettings] = useState<LeadSettings>(getLeadSettings());
  const [themeContent, setThemeContent] = useState<ThemeContent>(getThemeContent());
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);
  const [targetRedirectUrl, setTargetRedirectUrl] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(getLeadSettings());
    };
    const handleThemeContentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeContent>;
      if (customEvent.detail) {
        setThemeContent(customEvent.detail);
      } else {
        setThemeContent(getThemeContent());
      }
    };

    window.addEventListener('lead-settings-updated', handleSettingsUpdate);
    window.addEventListener('theme-content-updated', handleThemeContentUpdate);
    return () => {
      window.removeEventListener('lead-settings-updated', handleSettingsUpdate);
      window.removeEventListener('theme-content-updated', handleThemeContentUpdate);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRedirecting && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (isRedirecting && countdown === 0 && targetRedirectUrl) {
      window.location.href = targetRedirectUrl;
    }
    return () => clearTimeout(timer);
  }, [isRedirecting, countdown, targetRedirectUrl]);

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full legal name as it appears on your ID.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 7) {
      setErrorMessage('Please enter a valid phone number for confirmation.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage('You must accept the Terms and Conditions to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitPatientLead({
        fullName,
        email,
        phoneNumber,
        stateId: selectedStateId,
        serviceId: 'new-patient',
        acceptedTerms,
        marketingConsent,
        sourceUrl: window.location.href
      });

      setSubmittedLead(result.lead);
      setTargetRedirectUrl(result.redirectUrl);
      setIsSubmitting(false);
      setIsRedirecting(true);
      setCountdown(settings.redirectDelaySeconds || 2);
    } catch (err) {
      console.error('Lead submission failed:', err);
      setIsSubmitting(false);
      setErrorMessage('An error occurred submitting your intake. Please try again.');
    }
  };

  const handleSelectStateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigateBook) {
      onNavigateBook(selectedStateId);
    } else {
      onOpenApply(selectedStateId);
    }
  };

  return (
    <section className="bg-white pt-8 pb-14 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Two-Column Hero Row */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading, copy, state selector, trust highlights */}
          <div className="lg:col-span-6 space-y-6 text-left pt-2">
            
            {/* Top Keyword Authority Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
              <span>{themeContent.hero.badgeText}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold tracking-tight text-slate-900 leading-[1.14]">
              {themeContent.hero.headingPrefix} <br />
              <span className="text-[#16a34a]">{themeContent.hero.headingHighlight}</span> <br />
              {themeContent.hero.headingSuffix}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {themeContent.hero.subheading}
            </p>

            {/* State Picker Form (Quick State Filter) */}
            <form onSubmit={handleSelectStateSubmit} className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg">
              <div className="relative flex-1">
                <select
                  value={selectedStateId}
                  onChange={(e) => setSelectedStateId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:bg-white cursor-pointer shadow-xs"
                >
                  <option value="" disabled>Select your state</option>
                  {STATES_DATA.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.code}) - ${st.price}
                    </option>
                  ))}
                </select>
                {isAutoDetected && (
                  <div className="text-[11px] text-[#008f58] font-bold flex items-center gap-1 mt-1.5 pl-1">
                    <MapPin className="w-3.5 h-3.5 text-[#008f58]" />
                    <span>Auto-detected for {detectedStateName || currentState.name} residents</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap self-start sm:self-auto"
              >
                <span>{themeContent.hero.statePickerButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Micro Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                100% Online Consultations
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                Money-Back Guarantee
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                HIPAA Compliant
              </span>
            </div>

          </div>

          {/* Right Column: OnlineMMJCard Evaluation Intake Form Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* The Form Card */}
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-emerald-950/10 border-2 border-emerald-100/80 p-6 sm:p-8 space-y-5 relative">
              
              {/* Badge: Same Day Approval */}
              <div className="absolute -top-3.5 right-6 bg-[#008f58] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                <span>99% Approved · Same Day</span>
              </div>

              {/* Form Title & Subtitle */}
              <div className="text-center space-y-1.5 pt-1">
                <h2 className="text-2xl sm:text-[26px] font-black text-[#008f58] tracking-tight uppercase">
                  {themeContent.hero.formTitle}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  {themeContent.hero.formPriceSubtext} <span className="text-[#008f58] font-bold text-base">{settings.startingPrice || '$55'}</span>
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Intake Form */}
              <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                
                {/* Pre-Selected State Field with Geolocation Detection Badge */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Evaluation State
                    </label>
                    {isAutoDetected ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#008f58] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <MapPin className="w-3 h-3" />
                        <span>Auto-Detected ({currentState.code})</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        Select your state
                      </span>
                    )}
                  </div>
                  <select
                    value={selectedStateId}
                    onChange={(e) => setSelectedStateId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-slate-50 focus:outline-none focus:border-[#008f58] focus:ring-2 focus:ring-[#008f58]/20 transition-all cursor-pointer shadow-xs"
                  >
                    {STATES_DATA.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.code}) — Telehealth Fee ${st.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name as per ID"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-[#008f58] focus:ring-2 focus:ring-[#008f58]/20 transition-all bg-white"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-[#008f58] focus:ring-2 focus:ring-[#008f58]/20 transition-all bg-white"
                  />
                  <p className="text-[11px] text-slate-400">
                    We'll send your evaluation details here
                  </p>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="For appointment confirmation"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-[#008f58] focus:ring-2 focus:ring-[#008f58]/20 transition-all bg-white"
                  />
                  <p className="text-[11px] text-slate-400">
                    We only use your number to schedule your evaluation
                  </p>
                </div>

                {/* Terms and Updates Checkboxes */}
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#008f58] focus:ring-[#008f58] cursor-pointer"
                    />
                    <span>
                      I accept the <span className="text-[#008f58] font-bold underline">Terms and Conditions</span>
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#008f58] focus:ring-[#008f58] cursor-pointer"
                    />
                    <span>Send me helpful updates (optional)</span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#008f58] hover:bg-[#007a4a] active:scale-[0.99] text-white text-sm font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-3"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Evaluation...</span>
                    </>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>{(themeContent.hero.formButtonText || 'CONTINUE TO DOCTOR EVALUATION').replace(/&rarr;?/gi, '').trim()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>

                {/* Subtext footnotes */}
                <div className="pt-2 text-center text-[11px] text-slate-400 leading-snug">
                  Your information is securely reviewed by a licensed physician and handled in accordance with HIPAA guidelines.
                </div>

              </form>

            </div>

            {/* Trust Badges directly beneath the Form (Matching Screenshot) */}
            <div className="w-full max-w-lg grid grid-cols-3 gap-2.5 mt-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-2.5 text-center space-y-0.5">
                <div className="w-6 h-6 mx-auto rounded-full bg-emerald-100 text-[#008f58] flex items-center justify-center mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">{themeContent.hero.trustBadge1Title}</div>
                <div className="text-[10px] text-slate-500">{themeContent.hero.trustBadge1Sub}</div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-2.5 text-center space-y-0.5">
                <div className="w-6 h-6 mx-auto rounded-full bg-emerald-100 text-[#008f58] flex items-center justify-center mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">{themeContent.hero.trustBadge2Title}</div>
                <div className="text-[10px] text-slate-500">{themeContent.hero.trustBadge2Sub}</div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-2.5 text-center space-y-0.5">
                <div className="w-6 h-6 mx-auto rounded-full bg-emerald-100 text-[#008f58] flex items-center justify-center mb-1">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">{themeContent.hero.trustBadge3Title}</div>
                <div className="text-[10px] text-slate-500">{themeContent.hero.trustBadge3Sub}</div>
              </div>
            </div>

          </div>

        </div>

        {/* Affiliate Redirecting Overlay */}
        {isRedirecting && submittedLead && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-2xl border border-emerald-100">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#008f58] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900">
                  Evaluation Intake Received!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Thank you, <span className="font-bold text-slate-900">{submittedLead.fullName}</span>. Your intake information has been securely transmitted.
                </p>
              </div>

              {/* Patient Reassurance & Next Steps */}
              <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200 text-xs space-y-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-200 pb-2">
                  <ShieldCheck className="w-4 h-4 text-[#008f58]" />
                  <span>Next Steps for Your Consultation</span>
                </div>
                <div className="space-y-2 text-slate-600 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008f58] mt-1.5 shrink-0" />
                    <span>A confirmation receipt has been sent to <strong className="text-slate-800">{submittedLead.email}</strong> with your intake details.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008f58] mt-1.5 shrink-0" />
                    <span>Our state-licensed physician will review your qualifying health background and connect with you shortly.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008f58] mt-1.5 shrink-0" />
                    <span>Your session and medical data are 100% HIPAA-compliant, encrypted, and confidential.</span>
                  </div>
                </div>
              </div>

              {/* Redirection Countdown */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
                  <RefreshCw className="w-4 h-4 text-[#008f58] animate-spin" />
                  <span>Redirecting to Telehealth Doctor in {countdown}s...</span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#008f58] h-full transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((settings.redirectDelaySeconds - countdown) / settings.redirectDelaySeconds) * 100}%` }}
                  />
                </div>

                <a
                  href={targetRedirectUrl}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <span>Proceed to Doctor Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="text-[11px] text-slate-400">
                  Questions? Call patient support at <a href="tel:8884206789" className="font-bold text-[#008f58] hover:underline">(888) 420-6789</a>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Social Proof Strip (Matching Screenshot: Trusted Reviews From: Google, Leafly, Trustpilot, Sitejabber) */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Reviews list */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs text-slate-600 font-bold">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                Trusted Reviews From:
              </span>

              {/* Google Reviews */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="font-extrabold text-slate-800">Google</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
                <span className="text-slate-900 font-black">4.9</span>
              </div>

              {/* Leafly */}
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="text-emerald-700 font-black text-sm">Leafly.</span>
                <span className="text-[11px] text-slate-500 font-medium">5.0 Rated</span>
              </div>

              {/* Trustpilot */}
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="text-emerald-600 font-extrabold">★ Trustpilot</span>
                <span className="text-[11px] text-slate-500 font-medium">Excellent</span>
              </div>

              {/* Sitejabber */}
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="text-red-500 font-bold">Sitejabber</span>
                <span className="text-[11px] text-slate-500 font-medium">Verified</span>
              </div>

            </div>

            {/* As Featured On (Matching screenshot: msn, HERB, BING JOURNAL, HIGH TIMES, IMPACT WEALTH) */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black tracking-widest text-slate-400 uppercase">
              <span className="text-[10px] text-slate-300 font-semibold">AS FEATURED ON:</span>
              <span className="hover:text-slate-700 transition-colors">msn</span>
              <span>·</span>
              <span className="hover:text-slate-700 transition-colors">HERB</span>
              <span>·</span>
              <span className="hover:text-slate-700 transition-colors">BING JOURNAL</span>
              <span>·</span>
              <span className="hover:text-slate-700 transition-colors">HIGH TIMES</span>
              <span>·</span>
              <span className="hover:text-slate-700 transition-colors">IMPACT WEALTH</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
