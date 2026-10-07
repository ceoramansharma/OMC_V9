import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, CheckCircle2, ArrowRight, Zap, 
  DollarSign, Sparkles, Mail, Phone, User, ExternalLink, Settings, RefreshCw, MapPin 
} from 'lucide-react';
import { 
  submitPatientLead, 
  getLeadSettings, 
  LeadSettings, 
  LeadSubmission 
} from '../utils/leadStorage';
import { STATES_DATA } from '../data/mmjData';
import { useDetectedState } from '../utils/geoDetection';

interface MyMMJDoctorEvaluationFormProps {
  initialStateId?: string;
  initialServiceId?: string;
  onOpenAdminSettings?: () => void;
  onNavigateHome?: () => void;
}

export const MyMMJDoctorEvaluationForm: React.FC<MyMMJDoctorEvaluationFormProps> = ({
  initialStateId,
  initialServiceId = 'new-patient',
  onOpenAdminSettings,
  onNavigateHome
}) => {
  const {
    selectedStateId,
    currentState,
    setSelectedStateId,
    isAutoDetected
  } = useDetectedState(initialStateId);
  const [settings, setSettings] = useState<LeadSettings>(getLeadSettings());
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Submission & Transition States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);
  const [targetRedirectUrl, setTargetRedirectUrl] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic reading scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
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

  // Sync settings when updated
  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(getLeadSettings());
    };
    window.addEventListener('lead-settings-updated', handleSettingsUpdate);
    return () => window.removeEventListener('lead-settings-updated', handleSettingsUpdate);
  }, []);

  // Countdown timer for automatic affiliate redirection
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRedirecting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isRedirecting && countdown === 0 && targetRedirectUrl) {
      window.location.href = targetRedirectUrl;
    }
    return () => clearTimeout(timer);
  }, [isRedirecting, countdown, targetRedirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full legal name as it appears on your ID.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address so we can deliver your evaluation.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 7) {
      setErrorMessage('Please enter a valid phone number for appointment confirmation.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage('You must accept the Terms and Conditions to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Store lead & dispatch notification emails
      const result = await submitPatientLead({
        fullName,
        email,
        phoneNumber,
        stateId: selectedStateId,
        serviceId: initialServiceId,
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
      console.error('Lead submission error:', err);
      setIsSubmitting(false);
      setErrorMessage('An error occurred submitting your intake. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf6f0] via-[#f2faf5] to-[#edf7f2] text-slate-800 flex flex-col font-sans">
      
      {/* ============================================================== */}
      {/* 1. TOP HEADER (Matches Screenshot Exact Layout)                */}
      {/* ============================================================== */}
      <header className="bg-white/95 backdrop-blur-xs border-b border-slate-200/80 sticky top-0 z-30">
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
            className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-white transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(110,231,183,0.9)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateHome}>
            {/* Medical Cross + Cannabis Leaf Green Badge Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#008f58] flex items-center justify-center text-white shadow-sm">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 2h2v7h7v2h-7v7h-2v-7H4v-2h7V2z" fill="#ffffff" />
                <path d="M12 4c.5 2 2 3.5 4 4-2 .5-3.5 2-4 4-.5-2-2-3.5-4-4 2-.5 3.5-2 4-4z" fill="#a7f3d0" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
                Online<span className="text-[#008f58]">MMJCard</span>
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Certified Telehealth Clinic
              </div>
            </div>
          </div>

          {/* Right Trust Badges (Screenshot: HIPAA Compliant Platform & 256-Bit SSL Encrypted) */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-700">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#008f58]" />
              <span>HIPAA Compliant Platform</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-700">
              <Lock className="w-4 h-4 text-[#008f58]" />
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>

        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. MAIN CENTERED FORM SECTION                                  */}
      {/* ============================================================== */}
      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 flex flex-col items-center justify-center">
        
        {/* Floating / Centered Card */}
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-emerald-950/5 border border-slate-200/70 p-6 sm:p-10 space-y-6">
          
          {/* Card Title & Starting Price Subtitle */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#008f58] tracking-tight uppercase">
              BOOK YOUR MMJ EVALUATION
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-600">
              Evaluation fee starts at <span className="text-[#008f58] font-bold">{settings.startingPrice || '$55'}</span>
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Pre-Selected State Field with Geolocation Auto-Detection */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                  Select Evaluation State
                </label>
                {isAutoDetected && currentState ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#008f58] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <MapPin className="w-3 h-3" />
                    <span>Auto-Detected ({currentState.code})</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Change anytime
                  </span>
                )}
              </div>
              <select
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-slate-50 focus:outline-none focus:border-[#008f58] focus:ring-2 focus:ring-[#008f58]/20 transition-all cursor-pointer shadow-xs"
              >
                {STATES_DATA.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.code}) — Telehealth Fee ${st.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name as per ID"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-[#008f58] focus:ring-2 focus:ring-[#008f58]/20 transition-all bg-white"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-[#008f58] focus:ring-2 focus:ring-[#008f58]/20 transition-all bg-white"
              />
              <p className="text-[11px] text-slate-400">
                We'll send your evaluation details here
              </p>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="For appointment confirmation"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-[#008f58] focus:ring-2 focus:ring-[#008f58]/20 transition-all bg-white"
              />
              <p className="text-[11px] text-slate-400">
                We only use your number to schedule your evaluation
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2.5 pt-1">
              <label className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#008f58] focus:ring-[#008f58] cursor-pointer"
                />
                <span>
                  I accept the <span className="text-[#008f58] font-bold hover:underline">Terms and Conditions</span>
                </span>
              </label>

              <label className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#008f58] focus:ring-[#008f58] cursor-pointer"
                />
                <span>Send me helpful updates (optional)</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#008f58] hover:bg-[#007a4a] active:scale-[0.99] text-white text-sm sm:text-base font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Evaluation...</span>
                </>
              ) : (
                <span>CONTINUE TO DOCTOR EVALUATION</span>
              )}
            </button>

            {/* Footnotes under button */}
            <div className="space-y-1 pt-2 text-center text-[11px] text-slate-400 leading-relaxed">
              <p>
                Your information is securely reviewed by a licensed physician and handled in accordance with HIPAA guidelines.
              </p>
              <p className="text-slate-400/90">
                Instant redirect to state-certified physician portal upon submission.
              </p>
            </div>

          </form>

        </div>

        {/* ============================================================== */}
        {/* 3. THREE TRUST BADGES ROW (Below Form in Screenshot)          */}
        {/* ============================================================== */}
        <div className="w-full max-w-xl grid grid-cols-3 gap-3 sm:gap-4 mt-6">
          
          {/* Badge 1: 100% Legal / State Certified */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 text-center space-y-1 shadow-xs">
            <div className="w-7 h-7 mx-auto rounded-full bg-emerald-50 text-[#008f58] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 leading-tight">100% Legal</div>
            <div className="text-[11px] text-slate-500">State Certified</div>
          </div>

          {/* Badge 2: No Risk Policy / 100% Refund if not approved */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 text-center space-y-1 shadow-xs">
            <div className="w-7 h-7 mx-auto rounded-full bg-emerald-50 text-[#008f58] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 leading-tight">No Risk Policy</div>
            <div className="text-[11px] text-slate-500">100% Refund if not approved</div>
          </div>

          {/* Badge 3: Fast Process / Same-Day Evaluations */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 text-center space-y-1 shadow-xs">
            <div className="w-7 h-7 mx-auto rounded-full bg-emerald-50 text-[#008f58] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 leading-tight">Fast Process</div>
            <div className="text-[11px] text-slate-500">Same-Day Evaluations</div>
          </div>

        </div>

      </main>

      {/* ============================================================== */}
      {/* 4. FOOTER (Matches Screenshot Copy)                            */}
      {/* ============================================================== */}
      <footer className="py-6 px-4 text-center text-xs text-slate-500 space-y-1.5 border-t border-slate-200/60 bg-white/40">
        <p className="font-medium text-slate-600">
          © 2026 OnlineMMJCard Health Services. All rights reserved.
        </p>
        <p className="text-[11px] text-slate-400 max-w-2xl mx-auto">
          Medical marijuana recommendations are provided strictly by state-licensed medical practitioners following telehealth compliance.
        </p>
      </footer>

      {/* ============================================================== */}
      {/* 5. SEAMLESS AFFILIATE REDIRECTION OVERLAY                      */}
      {/* ============================================================== */}
      {isRedirecting && submittedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-2xl border border-emerald-100">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#008f58] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">
                Evaluation Request Received!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Thank you, <span className="font-bold text-slate-900">{submittedLead.fullName}</span>. Your intake data has been securely transmitted.
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

            {/* Redirection Countdown Indicator */}
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

    </div>
  );
};
