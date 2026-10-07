import React, { useEffect, useState } from 'react';
import { ServiceItem, SERVICES_DATA } from '../data/mmjData';
import { 
  ShieldCheck, CheckCircle2, ArrowRight, DollarSign, 
  Clock, FileText, ChevronRight, HelpCircle, Star, Sparkles, 
  RefreshCw, Sprout, HeartHandshake, ChevronDown, Award, Lock, FileCheck 
} from 'lucide-react';
import { FloatingTableOfContents } from './FloatingTableOfContents';

interface ServiceDetailPageProps {
  serviceData: ServiceItem;
  onOpenApply: (stateId?: string, serviceId?: string) => void;
  onNavigateHome: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceData,
  onOpenApply,
  onNavigateHome
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${serviceData.title} | Online MMJ Card Telehealth`;
  }, [serviceData]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck': return <FileText className="w-8 h-8" />;
      case 'RefreshCw': return <RefreshCw className="w-8 h-8" />;
      case 'Sprout': return <Sprout className="w-8 h-8" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8" />;
      default: return <FileText className="w-8 h-8" />;
    }
  };

  const serviceFaqs = [
    {
      q: `How quickly will I receive my ${serviceData.title} documentation?`,
      a: 'Immediately upon approval! Your examining physician signs your official digital recommendation PDF, which is transmitted to your email within 10 to 15 minutes of concluding your video consultation.'
    },
    {
      q: 'What happens if the evaluating doctor does not approve my application?',
      a: 'We offer an unconditional 100% money-back guarantee. If our licensed physician determines you are not medically eligible for a recommendation under your state cannabis statute, your fee is refunded in full automatically.'
    },
    {
      q: 'Will my employer, health insurer, or landlord find out about this service?',
      a: 'No. All patient records, consultations, and medical files are strictly confidential and legally protected under federal HIPAA privacy regulations. We never disclose patient records to employers, insurance providers, or public registries.'
    },
    {
      q: 'Do I need a desktop computer, or can I do the appointment on my smartphone?',
      a: 'You can complete your entire consultation right from your smartphone or tablet! No software downloads or apps are required—everything runs smoothly within your web browser.'
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* Top Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-wrap gap-2">
          <button onClick={onNavigateHome} className="hover:text-[#16a34a] font-medium transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Services</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{serviceData.title}</span>
        </div>
      </div>

      {/* Main Content Layout with Floating Table of Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-12 items-start justify-center">
        
        {/* Main Service Content Body */}
        <div id="service-content" className="flex-1 min-w-0 max-w-4xl space-y-12">
          
          {/* Header Hero Banner */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#16a34a]" />
              <span>Certified Telehealth Clinical Service</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {serviceData.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {serviceData.fullDesc}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-6">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-[#16a34a]" />
                {serviceData.timeframe} Turnaround
              </span>
              <span className="text-slate-300 hidden sm:inline">&middot;</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                100% Money-Back Guarantee
              </span>
              <span className="text-slate-300 hidden sm:inline">&middot;</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Award className="w-4 h-4 text-[#16a34a]" />
                Starting at ${serviceData.startingPrice}
              </span>
            </div>
          </div>

          {/* Quick Action Pricing Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-3xl border border-emerald-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Transparent One-Time Fee
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900">
                ${serviceData.startingPrice}
                <span className="text-xs text-slate-500 font-normal ml-2">All-Inclusive Consultation</span>
              </div>
              <p className="text-xs text-slate-600">
                Zero hidden charges. Complete consultation with a licensed state physician.
              </p>
            </div>
            <button
              onClick={() => onOpenApply(undefined, serviceData.id)}
              className="w-full md:w-auto px-8 py-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>Schedule Evaluation &rarr;</span>
            </button>
          </div>

          {/* SECTION 1: Service Overview & Medical Scope (H2) */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Service Overview & Medical Scope
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Our clinical telemedicine platform provides HIPAA-compliant remote evaluations for therapeutic cannabis recommendations, annual renewals, extended 99-plant medical necessity cultivation documents, and emotional support animal certifications. Every consultation is conducted live by a board-certified physician licensed in your state.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              Clinical Benefits of Holding an MMJ Card
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              While adult-use retail stores exist in many states, certified patients enjoy lower dispensary tax rates (saving up to 30%), higher potency caps for pharmaceutical-grade extracts, larger possession and home grow allowances, and legal age access starting at 18+.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">
              State Telehealth Compliance & Legal Validity
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              All telemedicine visits are conducted under statutory state medical board guidelines. Once approved, your recommendation is registered with your state regulatory commission (or entered into the state registry database) and verified 24/7 by phone and online portals.
            </p>
          </section>

          {/* SECTION 2: What Is Included with Your Consultation (H2) */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Included with Your Telehealth Consultation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We provide complete, all-inclusive patient care without hidden processing fees or unexpected subscription charges:
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {serviceData.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                <span>24/7 Online & Phone Recommendation Verification</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                <span>365-Day Ongoing Patient Medical Support</span>
              </div>
            </div>
          </section>

          {/* SECTION 3: How Your Appointment Works (H2) */}
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              How Your Appointment Works (3 Simple Steps)
            </h2>
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a] text-white text-xs font-black flex items-center justify-center">1</span>
                  <span>Step 1: 5-Minute Online Health Intake</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
                  Complete our confidential, HIPAA-encrypted medical questionnaire on your phone or computer. Provide your basic contact information, state residency details, and symptoms.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a] text-white text-xs font-black flex items-center justify-center">2</span>
                  <span>Step 2: Video Evaluation with Licensed Physician</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
                  Connect one-on-one with our board-certified doctor via video or phone. The doctor reviews your medical history, discusses symptom management, and explains recommended cannabinoid ratios.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#16a34a] text-white text-xs font-black flex items-center justify-center">3</span>
                  <span>Step 3: Instant Digital Recommendation Delivery</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
                  Upon approval, your signed recommendation certificate is generated and emailed to you immediately. You can enter licensed medical dispensaries the very same day.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: Required Documents & Eligibility (H2) */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Required Documents & Eligibility Checklist
            </h2>

            <h3 className="text-base font-bold text-slate-900">
              Proof of State Residency
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Patients must provide a valid government-issued photo ID (Driver’s License, State Identification Card, or Passport) confirming residency in the state where they are seeking certification.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">
              Medical History & Prior Records
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              While medical records (doctor notes, prescriptions, diagnosis summaries) are helpful, they are not mandatory in many states. Our examining physician can clinically evaluate your qualifying symptoms during your live consultation.
            </p>
          </section>

          {/* SECTION 5: Frequently Asked Service Questions (H2) */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#16a34a]" />
              <span>Frequently Asked Service Questions</span>
            </h2>

            <div className="space-y-3">
              {serviceFaqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:text-[#16a34a] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#16a34a]' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: 100% Risk-Free Guarantee (H2) */}
          <section className="p-8 bg-[#0f172a] rounded-3xl text-white space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-[#16a34a] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              100% Risk-Free Money Back Guarantee
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              If our doctor determines you do not qualify for a medical marijuana recommendation under state law, you receive a full 100% refund immediately. No hassles, no hidden fees.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenApply(undefined, serviceData.id)}
                className="px-8 py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Book Your Consultation &rarr;</span>
              </button>
            </div>
          </section>

        </div>

        {/* Floating Table of Contents Sidebar */}
        <FloatingTableOfContents
          containerSelector="#service-content"
          onOpenApply={() => onOpenApply(undefined, serviceData.id)}
          title="On This Page"
        />

      </div>

    </div>
  );
};
