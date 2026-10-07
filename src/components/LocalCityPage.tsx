import React, { useEffect, useState } from 'react';
import { LocalCityData, LOCAL_CITIES_DATA } from '../data/localSeoData';
import { STATES_DATA } from '../data/mmjData';
import { 
  MapPin, Phone, ShieldCheck, CheckCircle2, Star, Clock, 
  ArrowRight, DollarSign, Building, FileText, ChevronRight, 
  HelpCircle, AlertCircle, Sparkles, Navigation, Scale, 
  ChevronDown, Video, HeartHandshake, UserCheck, Stethoscope
} from 'lucide-react';

interface LocalCityPageProps {
  cityData: LocalCityData;
  onOpenApply: (stateId?: string, serviceId?: string) => void;
  onNavigateHome: () => void;
  onNavigateCity: (citySlug: string) => void;
  onNavigateState: (stateId: string) => void;
}

export const LocalCityPage: React.FC<LocalCityPageProps> = ({
  cityData,
  onOpenApply,
  onNavigateHome,
  onNavigateCity,
  onNavigateState
}) => {
  const stateInfo = STATES_DATA.find((s) => s.id === cityData.stateId);
  const [monthlySpend, setMonthlySpend] = useState<number>(200);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${cityData.cityName} Medical Marijuana Doctor Online | Direct Telehealth Evaluations`;
  }, [cityData]);

  // Nearby cities in same state
  const otherCitiesInState = LOCAL_CITIES_DATA.filter(
    (c) => c.stateId === cityData.stateId && c.slug !== cityData.slug
  );

  // Dynamic tax math
  const recTaxRateDecimal = cityData.localTaxSavingsPercent.includes('34') ? 0.345 : 
                           cityData.localTaxSavingsPercent.includes('32') ? 0.32 :
                           cityData.localTaxSavingsPercent.includes('24') ? 0.24 :
                           cityData.localTaxSavingsPercent.includes('20') ? 0.20 : 0.25;
  const medTaxRateDecimal = 0.05;
  const yearlySpend = monthlySpend * 12;
  const yearlyRecTax = yearlySpend * recTaxRateDecimal;
  const yearlyMedTax = yearlySpend * medTaxRateDecimal;
  const netYearlySavings = Math.round(yearlyRecTax - yearlyMedTax);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* Schema.org MedicalClinic Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalBusiness", "MedicalClinic"],
            "name": `Online MMJ Card - ${cityData.cityName} Telehealth Service`,
            "description": `Connect 100% online with board-certified cannabis physicians in ${cityData.cityName}. Same-day medical marijuana recommendations via encrypted telehealth video.`,
            "url": `https://onlinemmjcard.com/medical-marijuana-card-${cityData.slug.replace(/-[a-z]{2}$/i, '')}/`,
            "telephone": "(888) 420-6789",
            "priceRange": "$$",
            "medicalSpecialty": ["Cannabis Medicine", "Primary Care", "Pain Management"],
            "areaServed": [
              {
                "@type": "AdministrativeArea",
                "name": `${cityData.cityName}, ${cityData.stateCode}`
              },
              {
                "@type": "AdministrativeArea",
                "name": cityData.metroArea
              }
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "08:00",
                "closes": "22:00"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "14250"
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
          <button onClick={() => onNavigateState(cityData.stateId)} className="hover:text-[#16a34a] font-medium transition-colors cursor-pointer">
            {cityData.stateName} Telehealth
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{cityData.cityName} Online Evaluation</span>
        </div>
      </div>

      {/* Hero Section - Direct Telehealth Provider Focus */}
      <section className="pt-10 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Service Provider Value */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dedicated Care Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
                <Video className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Dedicated Telehealth Clinic · Serving {cityData.cityName}, {cityData.stateCode}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Online Medical Marijuana Doctor in <span className="text-[#16a34a]">{cityData.cityName}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Connect directly with our board-certified cannabis physicians from the comfort of your home. We provide 100% online telehealth evaluations, medical cannabis renewals, and same-day digital recommendations with zero office visits required.
              </p>

              {/* Provider Speed & Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-xs text-slate-500 font-medium">Consultation Type</div>
                  <div className="text-sm font-extrabold text-slate-900">100% Online Telehealth</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-xs text-slate-500 font-medium">Recommendation</div>
                  <div className="text-sm font-extrabold text-[#16a34a]">Same-Day Digital PDF</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-500 font-medium">Dispensary Tax Savings</div>
                  <div className="text-sm font-extrabold text-amber-600">{cityData.localTaxSavingsPercent}</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApply(cityData.stateId, 'new-patient')}
                  className="px-8 py-4 bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book {cityData.cityName} Doctor Evaluation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenApply(cityData.stateId, 'renewal')}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Renew Existing Card</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  100% HIPAA Compliant
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Clock className="w-4 h-4 text-[#16a34a]" />
                  15-Min Video / Phone Call
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <HeartHandshake className="w-4 h-4 text-[#16a34a]" />
                  100% Money-Back Guarantee
                </span>
              </div>

            </div>

            {/* Right Column: Direct Practice Care Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#16a34a] flex items-center justify-center font-bold">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Direct Telehealth Care</h2>
                      <p className="text-xs text-slate-500">{cityData.stateName} Licensed Physicians</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Consultation Fee</div>
                    <div className="text-2xl font-extrabold text-[#16a34a]">
                      ${stateInfo ? stateInfo.price : '39.99'}
                    </div>
                  </div>
                </div>

                {/* Direct Telehealth Practice Highlights */}
                <div className="space-y-3.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">100% Online Telemedicine: </span>
                      <span>No physical office visit required. Meet with our physician from home anywhere in {cityData.cityName} via smartphone or computer.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Board-Certified Doctors: </span>
                      <span>Consult directly with our experienced medical doctors registered with the state medical board.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Patient Care Line: </span>
                      <a href="tel:8884206789" className="text-[#16a34a] font-bold hover:underline">
                        (888) 420-6789
                      </a>
                      <span className="text-slate-400 block text-[11px]">Toll-Free Patient Care & Intake Support</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Telehealth Hours: </span>
                      <span>Mon - Sun: 8:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Local Tax Savings Alert */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-amber-700" />
                    <span>Estimated Annual Savings in {cityData.cityName}</span>
                  </div>
                  <p className="text-amber-800">
                    Our patients save an estimated <strong className="font-bold">{cityData.sampleYearlySavings}</strong> in state and municipal taxes compared to adult-use recreational retail.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenApply(cityData.stateId, 'new-patient')}
                  className="w-full py-3.5 bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Online 420 Evaluation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* In-Depth Clinical & Legal Overview */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Patients in {cityData.cityName} Choose a Medical Marijuana Card
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              While adult-use retail stores exist in certain regions, obtaining an official medical cannabis recommendation from our physicians provides significant financial, legal, and clinical therapeutic protections.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                1. Substantial Dispensary Tax Exemptions in {cityData.cityName}
              </h3>
              <p>
                Recreational buyers in {cityData.cityName} are subjected to heavy cumulative tax burdens: <strong>{cityData.localSalesTaxRate}</strong>. When certified by our medical doctors, you are granted medical status: <strong>{cityData.medicalTaxRate}</strong>. This provides immediate savings of $1,000+ per year for regular medical consumers.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                2. Higher Potency Formulations & Clinical Strengths
              </h3>
              <p>
                Recreational retail enforces strict limits on THC concentrations in edibles and concentrates. Medical marijuana patients certified by our physicians in {cityData.stateName} can purchase high-potency clinical formulations, concentrated RSO, and high-dose therapeutic tinctures designed specifically for chronic symptom management.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                3. Age 18+ Access and Legal Caregiver Recognition
              </h3>
              <p>
                While recreational dispensary sales are strictly limited to individuals 21 and older, adults aged 18 to 20 can be legally certified by our doctors to purchase and consume medical cannabis. Designated caregivers can also be registered to assist patients who cannot visit a dispensary themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Local Tax Savings Calculator */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Financial Savings Calculator</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Calculate Your Tax Savings in {cityData.cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Select your estimated monthly dispensary spending to see how much you save with our physician recommendation.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Estimated Monthly Spend:</span>
                <span className="text-2xl font-extrabold text-[#16a34a]">${monthlySpend} / month</span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="25"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#16a34a]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>$50/mo</span>
                <span>$200/mo</span>
                <span>$400/mo</span>
                <span>$600/mo</span>
                <span>$800/mo</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-xs text-slate-500">Yearly Spend</div>
                <div className="text-lg font-bold text-slate-900">${yearlySpend.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-center space-y-1">
                <div className="text-xs text-rose-700">Recreational Tax Incurred</div>
                <div className="text-lg font-bold text-rose-700">${Math.round(yearlyRecTax).toLocaleString()}</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
                <div className="text-xs text-emerald-800 font-bold uppercase">Your Estimated Savings</div>
                <div className="text-xl font-extrabold text-[#16a34a]">${netYearlySavings.toLocaleString()}</div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onOpenApply(cityData.stateId, 'new-patient')}
                className="px-8 py-3.5 bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Save Money at Dispensaries — Get Certified &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dispensary Acceptance Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Accepted at Licensed Dispensaries in & around {cityData.cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our physician-signed medical certificates are 100% legal and recognized by state-licensed dispensaries and delivery services across:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {cityData.popularDispensaryAreas.map((area, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
                <Navigation className="w-4 h-4 text-[#16a34a] mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">{area}</div>
                <div className="text-[10px] text-slate-500">Same-Day Delivery & Pickup</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Step Telehealth Process */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Simple 3-Step Telehealth Process in {cityData.cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Get certified from your living room in three quick steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#008f58] text-white font-extrabold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">5-Min Online Intake</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete your basic medical intake and state identification on our secure, HIPAA-compliant patient portal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#008f58] text-white font-extrabold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">15-Min Telehealth Call</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Meet directly with our board-certified physician over an encrypted video or phone consultation to discuss your health needs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#008f58] text-white font-extrabold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Instant Digital Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upon physician approval, your official signed medical marijuana recommendation is emailed immediately for instant dispensary use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Service Provider Assurance (Replaces Spammy Keywords Section) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Dedicated Care Provider</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Patients Trust Online MMJ Card in {cityData.cityName}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We are a dedicated medical cannabis telemedicine clinic with our own board-certified physicians, providing direct evaluations, continuous patient support, and guaranteed legal certifications.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#16a34a] flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">In-House Certified Doctors</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consult directly with our licensed physicians. We never outsource your care to third-party providers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#16a34a] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">HIPAA-Compliant Privacy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your medical history and video sessions are strictly protected under federal medical confidentiality laws.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#16a34a] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">100% State Legality</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every certificate contains an official state physician registry ID, ensuring seamless verification at dispensaries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#16a34a] flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Zero-Risk Refund Policy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If our physician determines you do not qualify for a medical recommendation, you are immediately refunded 100%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical FAQs */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {cityData.cityName} Medical Marijuana FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Frequently asked questions answered by our licensed {cityData.stateName} medical team.
            </p>
          </div>

          <div className="space-y-3">
            {cityData.cityFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-sm font-bold text-slate-900 hover:text-[#16a34a] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#16a34a] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#16a34a]' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed pl-11 border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Regions We Serve in State */}
      {otherCitiesInState.length > 0 && (
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Our Telehealth Coverage in Other {cityData.stateName} Areas
              </h3>
              <p className="text-xs text-slate-500">Our physicians provide same-day online evaluations across the entire state:</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {otherCitiesInState.map((other) => (
                <div
                  key={other.slug}
                  onClick={() => onNavigateCity(other.slug)}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-emerald-500 cursor-pointer text-xs font-bold text-slate-800 hover:text-[#16a34a] transition-all flex items-center justify-between shadow-xs"
                >
                  <span>{other.cityName} Telehealth</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Direct CTA */}
      <section className="py-14 bg-[#0f172a] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Consult With Our Doctor in {cityData.cityName}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Book your 15-minute telehealth evaluation today. Connect online with a licensed physician and receive your recommendation same-day, with a 100% money-back guarantee.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenApply(cityData.stateId, 'new-patient')}
              className="px-8 py-4 bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Your Evaluation in {cityData.cityName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
