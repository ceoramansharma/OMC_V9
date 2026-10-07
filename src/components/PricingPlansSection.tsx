import React from 'react';
import { useThemeContent } from '../utils/themeContent';
import { Check, ShieldCheck, Sparkles, ArrowRight, Star } from 'lucide-react';

interface PricingPlansSectionProps {
  onOpenApply: (stateId?: string, serviceId?: string) => void;
}

export const PricingPlansSection: React.FC<PricingPlansSectionProps> = ({ onOpenApply }) => {
  const themeContent = useThemeContent();
  const pricingContent = themeContent.pricing;
  const plans = [
    {
      id: 'digital',
      name: 'Digital MMJ Recommendation',
      price: '39.99',
      period: 'State Evaluation Fee',
      popular: false,
      description: 'Ideal for patients who want immediate access to dispensaries today with an official digital PDF.',
      features: [
        '100% Online Telehealth Doctor Consultation',
        'Official Signed Recommendation PDF emailed instantly',
        'Direct acceptance at all state licensed dispensaries',
        'Step-by-step assistance for state health portal',
        '100% Full Refund if not approved by physician',
        '24/7 Online & Phone Verification Line',
        '1 Year Medical Patient Legal Defense'
      ],
      cta: 'Get Digital Recommendation',
      serviceId: 'new-patient'
    },
    {
      id: 'bundle',
      name: 'Digital PDF + Plastic ID Card',
      price: '59.99',
      period: 'Most Popular Patient Bundle',
      popular: true,
      description: 'Get immediate digital access plus a durable, embossed physical photo ID card sent via USPS priority.',
      features: [
        'Everything included in Digital Recommendation',
        'Durable credit-card style PVC Plastic ID card',
        'Official state seal & holographic security foil',
        'Discreet, unmarked bubble envelope delivery',
        'High-resolution patient photo & state barcode',
        'Free replacement if lost within 90 days',
        'Priority physician scheduling line'
      ],
      cta: 'Get Card + Hard Copy Bundle',
      serviceId: 'new-patient'
    },
    {
      id: 'cultivation',
      name: '99-Plant Cultivation License',
      price: '149.00',
      period: 'Medical Grower Certification',
      popular: false,
      description: 'Extended personal cultivation recommendation for patients requiring higher daily plant medicine dosages.',
      features: [
        'Evaluation with specialized cannabinoid physician',
        'Extended medical necessity recommendation letter',
        'Legal authorization to cultivate up to 99 plants',
        'Covers indoor grow room and outdoor garden plots',
        'Embossed paper certificate with doctor wax seal',
        'Immediate digital copy + mailed certificate',
        '24/7 dedicated verification hotline for authorities'
      ],
      cta: 'Get 99-Plant Cultivation Rec',
      serviceId: 'cultivation'
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {pricingContent.badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {pricingContent.heading}
          </h2>
          <p className="text-base text-slate-600">
            {pricingContent.subheading}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-white border-2 border-emerald-500 shadow-xl ring-4 ring-emerald-500/10'
                  : 'bg-white border border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-full tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Best Value Package</span>
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-500">{plan.description}</p>
                </div>

                <div className="py-4 border-y border-slate-100 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-slate-400">from $</span>
                    <span className="text-4xl font-extrabold text-slate-900 tabular-nums">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ evaluation</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                    {plan.period}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenApply(undefined, plan.serviceId)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                  Protected by 100% Money-Back Guarantee
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 max-w-3xl mx-auto bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Our Ironclad "No Risk" Patient Satisfaction Guarantee
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
              We stand behind our services with a 100% full money-back guarantee. If you are not approved for a medical marijuana recommendation by our licensed physician, your consultation is 100% free of charge.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
