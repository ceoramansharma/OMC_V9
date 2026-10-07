import React from 'react';
import { useThemeContent } from '../utils/themeContent';
import { Check, X, Star, ShieldCheck } from 'lucide-react';

interface WhyTrustSectionProps {
  onOpenApply: () => void;
}

export const WhyTrustSection: React.FC<WhyTrustSectionProps> = ({ onOpenApply }) => {
  const themeContent = useThemeContent();
  const whyTrust = themeContent.whyTrust;

  const comparisonRows = [
    { feature: 'Licensed Doctors', us: 'Yes', others: 'Yes', clinics: 'Yes' },
    { feature: 'HIPAA-Compliant', us: 'Yes', others: 'Yes', clinics: 'No' },
    { feature: 'Same-Day Evaluation', us: 'Yes', others: 'No', clinics: 'No' },
    { feature: 'Affordable Pricing', us: 'Yes', others: 'No', clinics: 'No' },
    { feature: 'Money-Back Guarantee', us: 'Yes', others: 'No', clinics: 'No' },
    { feature: '24/7 Customer Support', us: 'Yes', others: 'No', clinics: 'No' },
  ];

  return (
    <section id="why-trust" className="py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Quote from Screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {whyTrust.heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-700 italic font-serif">
            {whyTrust.quote}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {whyTrust.subheading}
          </p>
        </div>

        {/* Two-Column Layout: Left Doctor Photo & Badge, Right Comparison Table */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Doctor Photo + 4.9/5 Badge */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-emerald-100 via-teal-50 to-slate-100 flex flex-col items-center justify-end relative p-6">
                
                {/* Friendly Compassionate Doctor Vector Illustration */}
                <div className="w-36 h-36 rounded-full bg-slate-200 border-4 border-white shadow-md relative overflow-hidden flex items-center justify-center mb-2">
                  <div className="w-28 h-28 rounded-full bg-amber-100 relative mt-3">
                    <div className="w-24 h-12 bg-slate-800 rounded-t-full absolute -top-1 left-2"></div>
                    <div className="flex justify-center gap-4 pt-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    </div>
                    <div className="w-5 h-2 border-b-2 border-slate-700 rounded-full mx-auto mt-1"></div>
                  </div>
                </div>

                <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 text-center">
                  <div className="text-sm font-extrabold text-slate-900">Dr. Kevin Kargman, D.O.</div>
                  <div className="text-xs font-semibold text-[#16a34a]">Lead Evaluating Physician</div>
                  <div className="text-[11px] text-slate-500 mt-1">19+ Years Clinical Healthcare Experience</div>
                </div>

              </div>
            </div>

            {/* 4.9/5 Rated Doctors Badge (Matching Screenshot) */}
            <div className="mt-4 flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-md border border-slate-100">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-extrabold text-slate-900">4.9/5 Rated Doctors</span>
            </div>
          </div>

          {/* Right Column: Comparison Table (Matching Screenshot) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700">
                      <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider w-2/5">
                        Features
                      </th>
                      <th className="py-4 px-4 font-black uppercase text-[11px] tracking-wider text-[#16a34a] bg-emerald-50/70 text-center w-1/5">
                        Online MMJ Card
                      </th>
                      <th className="py-4 px-4 font-bold uppercase text-[11px] tracking-wider text-slate-500 text-center w-1/5">
                        Other Providers
                      </th>
                      <th className="py-4 px-4 font-bold uppercase text-[11px] tracking-wider text-slate-500 text-center w-1/5">
                        Other Clinics
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-5 font-bold text-slate-900">
                          {row.feature}
                        </td>

                        {/* Online MMJ Card Column (Always green Yes) */}
                        <td className="py-4 px-4 font-extrabold text-[#16a34a] bg-emerald-50/40 text-center">
                          <span className="inline-flex items-center gap-1">
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>{row.us}</span>
                          </span>
                        </td>

                        {/* Other Providers */}
                        <td className={`py-4 px-4 font-bold text-center ${
                          row.others === 'Yes' ? 'text-slate-700' : 'text-red-500'
                        }`}>
                          {row.others === 'Yes' ? (
                            <span>Yes</span>
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              <X className="w-3.5 h-3.5" />
                              <span>No</span>
                            </span>
                          )}
                        </td>

                        {/* Other Clinics */}
                        <td className={`py-4 px-4 font-bold text-center ${
                          row.clinics === 'Yes' ? 'text-slate-700' : 'text-red-500'
                        }`}>
                          {row.clinics === 'Yes' ? (
                            <span>Yes</span>
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              <X className="w-3.5 h-3.5" />
                              <span>No</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Table Strip */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 font-medium">
                  Experience compassionate, certified telemedicine with zero financial risk.
                </span>
                <button
                  onClick={onOpenApply}
                  className="px-5 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-black text-xs uppercase tracking-wider rounded-full shadow-sm transition-all"
                >
                  Get Evaluated
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
