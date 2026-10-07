import React, { useEffect } from 'react';
import { ConditionItem, QUALIFYING_CONDITIONS } from '../data/mmjData';
import { 
  ShieldCheck, CheckCircle2, ArrowRight, Activity, 
  ChevronRight, Sparkles, HeartPulse, FileText, Clock 
} from 'lucide-react';

interface ConditionDetailPageProps {
  conditionData: ConditionItem;
  onOpenApply: (stateId?: string, serviceId?: string) => void;
  onNavigateHome: () => void;
  onNavigateCondition: (conditionId: string) => void;
}

export const ConditionDetailPage: React.FC<ConditionDetailPageProps> = ({
  conditionData,
  onOpenApply,
  onNavigateHome,
  onNavigateCondition
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `Medical Marijuana for ${conditionData.name} | MMJ Doctor Evaluations`;
  }, [conditionData]);

  const otherConditions = QUALIFYING_CONDITIONS.filter((c) => c.id !== conditionData.id).slice(0, 6);

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* Top Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-wrap gap-2">
          <button onClick={onNavigateHome} className="hover:text-[#16a34a] font-medium transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Conditions</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{conditionData.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-10 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
                <HeartPulse className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>State Qualifying Condition Guide · {conditionData.category}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Medical Marijuana for <span className="text-[#16a34a]">{conditionData.name}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {conditionData.description} Our licensed medical marijuana doctors evaluate patients experiencing {conditionData.name.toLowerCase()} via secure telehealth in 15 minutes.
              </p>

              {/* Clinical Specs */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#16a34a]" />
                  <span>How Medical Cannabis Helps:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {conditionData.cannabisBenefit}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenApply()}
                  className="px-8 py-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Book Telehealth Evaluation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Clock className="w-4 h-4 text-[#16a34a]" />
                  15-Min Video Consult
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  100% Money-Back Guarantee
                </span>
              </div>
            </div>

            {/* Right Column Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Profile</div>
                <div className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Therapeutic Formulations
                </div>

                <div className="space-y-4 text-xs text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Recommended Delivery Methods:</span>
                    <span className="text-slate-600 leading-relaxed block">{conditionData.recommendedType}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Prevalence in Medical Programs:</span>
                    <span className="text-slate-600 leading-relaxed block">{conditionData.prevalence}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Doctor Evaluation Focus:</span>
                    <span className="text-slate-600 leading-relaxed block">
                      Our physician will review symptom onset, frequency of acute discomfort, response to traditional medications, and recommend an optimal cannabinoid ratio.
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenApply()}
                  className="w-full py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Check Your Eligibility</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Explore Other Conditions */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Other Common Qualifying Medical Conditions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select another condition to view specific cannabinoid research and doctor guidelines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherConditions.map((cond) => (
              <div
                key={cond.id}
                onClick={() => onNavigateCondition(cond.id)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase mb-1">{cond.category}</div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#16a34a] transition-colors mb-2">
                    {cond.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{cond.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#16a34a] mt-3">
                  <span>View Condition Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-[#0f172a] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Suffering from {conditionData.name}?</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Talk to a compassionate medical marijuana doctor today. 100% online, private, and money-back guaranteed.
          </p>
          <button
            onClick={() => onOpenApply()}
            className="px-8 py-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Book Your Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
