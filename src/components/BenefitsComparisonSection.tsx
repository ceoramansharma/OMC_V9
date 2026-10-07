import React, { useState } from 'react';
import { useThemeContent } from '../utils/themeContent';
import { Check, X, DollarSign, Calculator, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface BenefitsComparisonSectionProps {
  onOpenApply: () => void;
}

export const BenefitsComparisonSection: React.FC<BenefitsComparisonSectionProps> = ({ onOpenApply }) => {
  const themeContent = useThemeContent();
  const benefitsContent = themeContent.benefits;
  const [monthlySpend, setMonthlySpend] = useState<number>(150);

  // Recreational tax averages ~28% (excise + sales tax) vs Medical ~5% (or 0% in many states like MA, NY)
  const recTaxRate = 0.28;
  const medTaxRate = 0.05;

  const annualSpend = monthlySpend * 12;
  const recAnnualTax = annualSpend * recTaxRate;
  const medAnnualTax = annualSpend * medTaxRate;
  const annualSavings = Math.round(recAnnualTax - medAnnualTax);

  const comparisonRows = [
    {
      feature: 'Dispensary Tax Rate',
      medical: '0% - 7% standard sales tax (Exempt from excise tax)',
      recreational: '20% - 38% combined excise & local sin taxes',
      benefit: 'Save hundreds to thousands per year'
    },
    {
      feature: 'Legal Possession Limits',
      medical: 'Up to 8 ounces of dried flower or 30-day supply',
      recreational: 'Strictly limited to 1 ounce flower / 8g concentrate',
      benefit: '8x higher legal possession ceiling'
    },
    {
      feature: 'Minimum Legal Age',
      medical: '18+ years old (Minors under 18 with caregiver)',
      recreational: 'Strictly 21+ years old only',
      benefit: 'Accessible to young adults & minors with health needs'
    },
    {
      feature: 'Home Cultivation Rights',
      medical: 'Up to 12 plants (or 99 plants with medical grower rec)',
      recreational: 'Limited to 6 plants (or 0 in several states)',
      benefit: 'Grow your own medicine legally'
    },
    {
      feature: 'Product Potency & Selection',
      medical: 'Access to high-dose 1000mg+ tinctures & RSO oils',
      recreational: 'Capped at 100mg THC per edible package',
      benefit: 'Higher clinical therapeutic potencies'
    },
    {
      feature: 'Dispensary Queue & Priority',
      medical: 'Dedicated medical line, priority service, free delivery',
      recreational: 'Standard wait in long public lines',
      benefit: 'Zero wait times'
    },
    {
      feature: 'Legal & Employment Protections',
      medical: 'Statutory affirmative defense & patient workplace laws',
      recreational: 'Zero employment or housing legal protections',
      benefit: 'HIPAA protected health status'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Medical vs. Recreational Cannabis
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {benefitsContent.heading}
          </h2>
          <p className="text-base text-slate-600">
            {benefitsContent.subheading}
          </p>
        </div>

        {/* Interactive Tax Savings Calculator Widget */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-emerald-200 shadow-xl p-6 sm:p-8 mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 pb-3 border-b border-slate-100">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Interactive Dispensary Tax Savings Calculator</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Input Slider */}
            <div className="md:col-span-7 space-y-4">
              <label className="block text-sm font-bold text-slate-800">
                How much do you spend at dispensaries per month?
              </label>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-700 tabular-nums">
                  ${monthlySpend}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>

              <input
                type="range"
                min="30"
                max="600"
                step="10"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                <span>$30/mo (Occasional)</span>
                <span>$150/mo (Average)</span>
                <span>$300/mo (Regular)</span>
                <span>$600+/mo (Daily Patient)</span>
              </div>

              <p className="text-xs text-slate-500 pt-2">
                *Estimated based on average state cannabis excise + sales taxes of ~28% recreational vs ~5% medical.
              </p>
            </div>

            {/* Estimated Annual Savings Highlight */}
            <div className="md:col-span-5 bg-gradient-to-br from-emerald-950 to-slate-900 text-white rounded-2xl p-6 text-center space-y-3 shadow-md">
              <div className="text-xs text-emerald-300 font-semibold tracking-wider uppercase">
                Your Estimated Annual Tax Savings
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tabular-nums">
                ${annualSavings.toLocaleString()}
              </div>
              <div className="text-xs text-slate-300">
                Your medical card evaluation costs as little as <strong className="text-white">$39.99</strong>, giving you a return on investment within your first 2 dispensary visits!
              </div>
              <button
                onClick={onOpenApply}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Claim Your Tax Exemption Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider w-1/4">Key Factor</th>
                <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider text-emerald-800 bg-emerald-50/60 w-3/8">
                  Online MMJ Card Patient
                </th>
                <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider text-slate-500 w-3/8">
                  Adult-Use (Recreational)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    <div>{row.feature}</div>
                    <span className="text-[11px] text-emerald-700 font-normal">{row.benefit}</span>
                  </td>
                  <td className="py-4 px-5 font-medium text-slate-900 bg-emerald-50/20">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.medical}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-500">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{row.recreational}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
