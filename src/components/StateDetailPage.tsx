import React, { useEffect, useState } from 'react';
import { StateInfo } from '../data/mmjData';
import { LOCAL_CITIES_DATA } from '../data/localSeoData';
import { STATE_DETAILED_DOSSIERS, getStateDossier } from '../data/stateDetailedContent';
import { 
  MapPin, ShieldCheck, CheckCircle2, ArrowRight, DollarSign, 
  Clock, FileText, ChevronRight, Sprout, ExternalLink, HelpCircle, 
  Scale, Building, AlertCircle, Sparkles, ChevronDown, Store 
} from 'lucide-react';

interface StateDetailPageProps {
  stateData: StateInfo;
  onOpenApply: (stateId?: string, serviceId?: string) => void;
  onNavigateHome: () => void;
  onNavigateCity: (citySlug: string) => void;
}

export const StateDetailPage: React.FC<StateDetailPageProps> = ({
  stateData,
  onOpenApply,
  onNavigateHome,
  onNavigateCity
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${stateData.name} Medical Marijuana Card Online | 420 Evaluations & State Laws`;
  }, [stateData]);

  // Find local cities for this state
  const citiesInState = LOCAL_CITIES_DATA.filter((c) => c.stateId === stateData.id);
  const dossier = getStateDossier(stateData);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const faqsToDisplay = dossier.stateFaqs;

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* Schema.org MedicalWebPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": `${stateData.name} Medical Marijuana Card & Telehealth Evaluation Guide`,
            "url": `https://onlinemmjcard.com/medical-marijuana-card-${stateData.id.toLowerCase()}/`,
            "description": dossier.detailedIntro.split('\n\n')[0] || stateData.summary,
            "about": {
              "@type": "MedicalCondition",
              "name": "Qualifying Medical Conditions for Cannabis Recommendation"
            },
            "mainEntity": {
              "@type": "MedicalBusiness",
              "name": `Online MMJ Card - ${stateData.name} Telehealth Clinic`,
              "telephone": "(888) 420-6789",
              "priceRange": `$${stateData.price}`
            }
          })
        }}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-wrap gap-2">
          <button onClick={onNavigateHome} className="hover:text-[#16a34a] font-medium transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">State Laws & Guides</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{stateData.name} MMJ Program</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-10 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Official {stateData.name} ({stateData.code}) Telehealth Evaluation Program</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {stateData.name} <span className="text-[#16a34a]">Medical Marijuana Card</span> Online
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {dossier ? dossier.detailedIntro.split('\n\n')[0] : stateData.summary}
              </p>

              {/* State Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-[11px] text-slate-500 font-medium">Card Validity</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900">{stateData.validity}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-[11px] text-slate-500 font-medium">Turnaround</div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#16a34a]">Same-Day Digital</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-[11px] text-slate-500 font-medium">State Fee</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900">{stateData.stateRegistryFee}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-[11px] text-slate-500 font-medium">Home Cultivation</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate" title={stateData.homeCultivation}>
                    {stateData.homeCultivation}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenApply(stateData.id, 'new-patient')}
                  className="px-8 py-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Get {stateData.name} Card - ${stateData.price}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenApply(stateData.id, 'renewal')}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Renew - ${stateData.renewalPrice}</span>
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  99% Guaranteed Approval
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <DollarSign className="w-4 h-4 text-[#16a34a]" />
                  100% Money-Back Guarantee
                </span>
              </div>

            </div>

            {/* Right Column: State Legal Specs Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="text-sm font-bold text-slate-900">{stateData.name} Program Summary</div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    Telehealth Legal
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Statutory Law:</span>
                    <span>{dossier?.governingLaw || 'State Compassionate Use Statute'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">State Regulatory Agency:</span>
                    <span>{dossier?.regulatoryAgency || 'State Health & Cannabis Licensing Department'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Possession Limits:</span>
                    <span>{stateData.possessionLimit}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Home Cultivation Policy:</span>
                    <span>{stateData.homeCultivation}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Reciprocity Status:</span>
                    <span>{stateData.reciprocityNotes}</span>
                  </div>
                  {stateData.stateRegistryUrl && (
                    <div className="pt-2">
                      <a
                        href={stateData.stateRegistryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#16a34a] font-bold hover:underline"
                      >
                        <span>Official State Health Registry Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onOpenApply(stateData.id, 'new-patient')}
                  className="w-full py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Book {stateData.name} 420 Evaluation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Local City Landing Pages in this State */}
      {citiesInState.length > 0 && (
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Local City 420 Doctor Guides in {stateData.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Explore local dispensary districts, city tax rates, and same-day telehealth evaluations.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {citiesInState.map((city) => (
                <div
                  key={city.slug}
                  onClick={() => onNavigateCity(city.slug)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-[#16a34a] transition-colors mb-1">
                      {city.cityName} MMJ Doctor
                    </div>
                    <div className="text-xs text-slate-500 mb-3">{city.metroArea}</div>
                    <div className="text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded font-semibold inline-block">
                      Save {city.localTaxSavingsPercent} Local Taxes
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#16a34a]">
                    <span>View City Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deep Step-by-Step State Walkthrough */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Patient Walkthrough</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              How to Get a Medical Marijuana Card in {stateData.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              A comprehensive step-by-step roadmap to obtaining your legal recommendation without office visits.
            </p>
          </div>

          <div className="space-y-6">
            {(dossier?.stepByStepWalkthrough || [
              {
                stepNumber: 1,
                title: `Submit Online Patient Intake Form`,
                description: `Fill out basic ${stateData.name} residency information and health background on our HIPAA-compliant portal.`,
                details: ['Valid government photo ID required.', 'Upload past medical records or prescription histories (optional).', 'Takes 3-5 minutes on mobile or computer.']
              },
              {
                stepNumber: 2,
                title: `15-Minute Telehealth Consultation`,
                description: `Meet one-on-one with our state-licensed medical cannabis physician via secure video call.`,
                details: ['Discuss symptoms, safe dosing, and product forms.', 'Private and confidential evaluation.', 'Doctor enters certification upon approval.']
              },
              {
                stepNumber: 3,
                title: `Receive Official Medical Certification`,
                description: `Get your signed state recommendation letter or digital registry certification immediately.`,
                details: ['Digital certificate sent via email.', 'Dispensary verification available 24/7.', 'Immediate shopping at licensed state dispensaries.']
              }
            ]).map((step) => (
              <div key={step.stepNumber} className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#16a34a] text-white font-extrabold flex items-center justify-center text-sm shrink-0">
                    {step.stepNumber}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pl-12 leading-relaxed">
                  {step.description}
                </p>
                <div className="pl-12 pt-1 space-y-1.5">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State Detailed Qualifying Conditions */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Medical Eligibility</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Qualifying Conditions for Medical Cannabis in {stateData.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Review recognized statutory conditions evaluated by our board-certified physicians under {stateData.name} law.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {(dossier?.statutoryConditions || stateData.popularConditions.map((c) => ({
              name: c,
              description: `Patients experiencing ${c.toLowerCase()} may qualify under state statutes when traditional treatments have proven insufficient or when symptoms significantly limit major life activities.`
            }))).map((cond, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span>{cond.name}</span>
                </div>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                  {cond.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center text-xs text-emerald-900 space-y-1">
            <strong>Unsure if your symptoms qualify?</strong>
            <p className="text-emerald-800">
              Our evaluating physicians have clinical discretion in many jurisdictions to consider other chronic or debilitating symptoms. If you are not approved, our 100% Money-Back Guarantee protects you.
            </p>
          </div>
        </div>
      </section>

      {/* State Tax Breakdown & Financial Savings Math */}
      {dossier?.taxBreakdown && (
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Financial Benefits</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {stateData.name} Dispensary Tax Breakdown & Annual Patient Savings
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                Comparing adult-use retail taxes versus certified medical cannabis exemptions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs text-slate-500 font-medium">Recreational Retail Taxes</div>
                <div className="text-sm font-bold text-rose-700">{dossier.taxBreakdown.recreationalTaxRate}</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs text-slate-500 font-medium">Medical Patient Rate</div>
                <div className="text-sm font-bold text-[#16a34a]">{dossier.taxBreakdown.medicalTaxRate}</div>
              </div>
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 space-y-2">
                <div className="text-xs text-emerald-800 font-medium">Average Annual Savings</div>
                <div className="text-base font-extrabold text-[#16a34a]">{dossier.taxBreakdown.averageAnnualSavings}</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
              {dossier.taxBreakdown.breakdownExplanation}
            </p>
          </div>
        </section>
      )}

      {/* Legal Protections, Cultivation & Rights */}
      {dossier?.legalProtectionsAndLimits && (
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Legal Rights</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Patient Rights, Home Grow & Possession Laws in {stateData.name}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {dossier.legalProtectionsAndLimits.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#16a34a]" />
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dispensary Acceptance & Purchasing Rules */}
      {dossier?.dispensaryGuide && (
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Dispensary Access</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {dossier.dispensaryGuide.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                {dossier.dispensaryGuide.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase text-slate-900 flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#16a34a]" />
                  <span>Licensed Dispensary Chains</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {dossier.dispensaryGuide.topChains.map((chain, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                      <span>{chain}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  <span>Purchasing Rules & Verification</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {dossier.dispensaryGuide.purchasingRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* State FAQs Accordion */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Everything You Need to Know</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stateData.name} Medical Marijuana Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Answers prepared by our state-licensed clinical evaluations team.
            </p>
          </div>

          <div className="space-y-3">
            {faqsToDisplay.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-sm font-bold text-slate-900 hover:text-[#16a34a] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#16a34a] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#16a34a]' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed pl-11 border-t border-slate-200/50 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-[#0f172a] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Get Your Official {stateData.name} Medical Marijuana Card Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            15-minute video evaluation with a board-certified physician. 99% approval guarantee or 100% money back.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenApply(stateData.id, 'new-patient')}
              className="px-8 py-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Apply for {stateData.name} Card Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
