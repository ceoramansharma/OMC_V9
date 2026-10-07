import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Stethoscope, CheckCircle2, 
  HelpCircle, ArrowRight, Sparkles, Award, Scale, Clock, Lock 
} from 'lucide-react';

interface SEOContentSectionProps {
  onOpenApply: (stateId?: string, serviceId?: string) => void;
}

export const SEOContentSection: React.FC<SEOContentSectionProps> = ({ onOpenApply }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'evaluations' | 'benefits' | 'renewals'>('overview');

  const popularKeywords = [
    { label: 'Medical Marijuana Card', desc: '100% legal state certification', serviceId: 'new-patient' },
    { label: 'Medical Marijuana Doctor', desc: 'Board-certified MMJ physicians', serviceId: 'new-patient' },
    { label: 'MMJ Card Online', desc: 'Same-day telehealth consultation', serviceId: 'new-patient' },
    { label: '420 Evaluations', desc: 'Rapid 15-minute appointment', serviceId: 'new-patient' },
    { label: 'MMJ Doctor Telehealth', desc: 'Video & phone evaluations', serviceId: 'new-patient' },
    { label: 'Medical Cannabis Card', desc: 'Save up to 35% on dispensary taxes', serviceId: 'new-patient' },
    { label: 'Medical Marijuana Evaluations', desc: 'HIPAA-compliant patient care', serviceId: 'new-patient' },
    { label: '420 Doctor Near Me', desc: 'Nationwide online availability', serviceId: 'new-patient' },
    { label: 'MMJ Card Renewal', desc: 'Fast 5-minute renewal evaluation', serviceId: 'renewal' },
    { label: 'Same Day 420 Evaluation', desc: 'Instant recommendation PDF', serviceId: 'new-patient' },
    { label: '99-Plant Cultivation Recommendation', desc: 'Personal grower exemption', serviceId: 'cultivation' },
    { label: 'Cannabis Recommendation Letter', desc: 'Dispensary-approved document', serviceId: 'new-patient' },
  ];

  return (
    <section id="seo-guide" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Complete Patient Guide & Telehealth Resources</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Online <span className="text-[#16a34a]">Medical Marijuana Card</span> & 420 Evaluations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about getting evaluated by a certified medical marijuana doctor, state cannabis laws, tax savings, and maintaining legal patient status.
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#16a34a] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            What is an MMJ Card?
          </button>
          <button
            onClick={() => setActiveTab('evaluations')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'evaluations'
                ? 'bg-[#16a34a] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            420 Evaluations Process
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'benefits'
                ? 'bg-[#16a34a] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Medical vs. Adult-Use
          </button>
          <button
            onClick={() => setActiveTab('renewals')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'renewals'
                ? 'bg-[#16a34a] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            MMJ Doctor Renewals
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sm:p-10 mb-14 shadow-xs">
          
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  How a Medical Marijuana Card Protects Your Health and Legal Rights
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A <strong className="text-slate-800">medical marijuana card</strong> (commonly referred to as an <strong className="text-slate-800">MMJ card</strong> or <strong className="text-slate-800">medical cannabis card</strong>) is a state-recognized identification document confirming that a certified <strong className="text-slate-800">medical marijuana doctor</strong> has evaluated your symptoms and recommended cannabis for therapeutic treatment.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Holding an official medical marijuana card grants you legal exemption from state and municipal adult-use excise taxes, provides access to higher potency medicine not sold to recreational customers, protects your rights to grow medicine at home in eligible states, and lowers the legal purchasing age to 18.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <span>State-Registered Legal Immunity</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <span>Save 10%–35% in Cannabis Sales Tax</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <span>Access High Potency Formulations</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <span>Eligible for Ages 18+ (Under 18 with Guardian)</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#16a34a] flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Guaranteed Medical Approval</h4>
                    <p className="text-xs text-slate-500">99.2% of patients approved or full refund</p>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
                  "Our network of licensed MMJ doctors has evaluated over 50,000 patients across 20+ states with 100% HIPAA compliance and zero risk."
                </div>
                <button
                  onClick={() => onOpenApply()}
                  className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Apply For Your MMJ Card</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'evaluations' && (
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  What Are 420 Evaluations and How Does Telemedicine Work?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The term <strong className="text-slate-800">420 evaluations</strong> refers to the clinical consultation between an individual and a state-licensed medical marijuana doctor. Historically conducted in physical clinics, today modern telehealth regulations permit patients to complete <strong className="text-slate-800">medical marijuana evaluations</strong> entirely online from the privacy of their smartphone or computer.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  During your 15-minute appointment, an evaluating <strong className="text-slate-800">MMJ doctor</strong> reviews your health questionnaire, discusses your ongoing symptoms (such as chronic pain, anxiety, PTSD, or insomnia), assesses how cannabis interacts with your lifestyle, and answers your dosing questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
                    <Clock className="w-4 h-4 text-[#16a34a]" />
                    <span>Average Duration: 10–15 Mins</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
                    <Lock className="w-4 h-4 text-[#16a34a]" />
                    <span>HIPAA-Encrypted Video & Phone</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
                    <FileText className="w-4 h-4 text-[#16a34a]" />
                    <span>Same-Day Digital Certificate</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  What You Need for Your 420 Evaluation:
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span>Valid State ID, Driver's License, or US Passport</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span>Proof of state residency (utility bill, lease, or voter registration)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span>Summary of your health symptoms or qualifying condition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span>A phone, tablet, or laptop with camera/microphone</span>
                  </li>
                </ul>
                <button
                  onClick={() => onOpenApply()}
                  className="w-full mt-4 py-3 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                >
                  Start Your 420 Evaluation Now
                </button>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  Why Get a Medical Cannabis Card When Recreational is Legal?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Even in states with adult-use recreational cannabis, over 70% of frequent consumers maintain a <strong className="text-slate-800">medical marijuana card</strong>. The primary reasons are financial savings and expanded patient rights:
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <p>
                    <strong className="text-slate-900">1. Substantial Tax Savings:</strong> Recreational cannabis carries combined excise, state, and local taxes ranging from 15% to 40%. A medical card eliminates most of these taxes, saving typical patients $600 to $1,500+ every year.
                  </p>
                  <p>
                    <strong className="text-slate-900">2. Higher Possession & Purchase Limits:</strong> Medical patients can legally purchase 2x to 4x the quantity of flower and concentrates compared to adult-use shoppers.
                  </p>
                  <p>
                    <strong className="text-slate-900">3. Stronger Potency Allowances:</strong> Certain high-dose edibles, topicals, and high-potency RSO tinctures are restricted exclusively to medical patients.
                  </p>
                  <p>
                    <strong className="text-slate-900">4. Home Cultivation Privileges:</strong> In states like Illinois, Missouri, and Connecticut, only certified medical cardholders are legally authorized to grow plants at home.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
                <div className="text-4xl font-extrabold text-[#16a34a]">$1,240/yr</div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Average Patient Tax Savings</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your evaluation pays for itself within 1 to 2 dispensary purchases through tax exemptions alone.
                </p>
                <button
                  onClick={() => onOpenApply()}
                  className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Calculate Your State Savings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'renewals' && (
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  Fast Online MMJ Doctor Renewals (Under 10 Minutes)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Most state medical marijuana cards are valid for 12 months. Allowing your card to expire means forfeiting dispensary tax discounts, risking purchasing interruptions, and facing full re-enrollment fees.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  With Online MMJ Card, you can renew your <strong className="text-slate-800">medical cannabis card</strong> seamlessly. Our <strong className="text-slate-800">MMJ doctors</strong> accept renewal evaluations for patients originally certified by ANY other clinic or telehealth provider nationwide.
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>Discounted renewal consultation rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>Instant recommendation renewal email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>Fast 5-minute telehealth check-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>Full state registry re-upload support</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="text-xs font-bold uppercase text-emerald-800">Expedited Service</div>
                <div className="text-xl font-bold text-slate-900">Renewing Your Expired or Expiring Card?</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Lock in renewal pricing starting at just $34.99 and keep your uninterrupted legal access.
                </p>
                <button
                  onClick={() => onOpenApply(undefined, 'renewal')}
                  className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Renew Your MMJ Card Now
                </button>
              </div>
            </div>
          )}

        </div>

        {/* High-Intent Keyword Explorer & Topics Cloud */}
        <div className="pt-6 border-t border-slate-200">
          <div className="text-center mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular Medical Marijuana Telehealth Searches
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularKeywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => onOpenApply(undefined, kw.serviceId)}
                className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-[#16a34a] transition-colors leading-tight mb-1">
                  {kw.label}
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1">
                  {kw.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
