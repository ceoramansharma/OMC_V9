import React from 'react';
import { SERVICES_DATA } from '../data/mmjData';
import { useThemeContent } from '../utils/themeContent';
import { CheckCircle2, ArrowRight, ShieldCheck, FileCheck, RefreshCw, Sprout } from 'lucide-react';

interface ServicesSectionProps {
  onOpenApply: (stateId?: string, serviceId?: string) => void;
  onNavigateService?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenApply,
  onNavigateService
}) => {
  const themeContent = useThemeContent();
  const servicesContent = themeContent.services;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck':
        return <FileCheck className="w-6 h-6" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6" />;
      default:
        return <FileCheck className="w-6 h-6" />;
    }
  };

  // Only keep core medical cannabis services on homepage (New Patient, Renewal, Cultivation Rec)
  // Emotional Support Animal (ESA) Letter is removed from the homepage
  const homepageServices = SERVICES_DATA.filter((service) => service.id !== 'esa-letter');

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Connected to WordPress Editable Theme Content */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {servicesContent.badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {servicesContent.heading}
          </h2>
          <p className="text-base text-slate-600">
            {servicesContent.subheading}
          </p>
        </div>

        {/* Services 3-Card Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {homepageServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all relative ${
                service.popular
                  ? 'border-emerald-500 shadow-xl bg-gradient-to-b from-emerald-50/40 via-white to-white ring-1 ring-emerald-500/20'
                  : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-xs">
                  Most Popular
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  {getIcon(service.icon)}
                </div>

                <div className="text-xs font-medium text-emerald-700 mb-1">{service.timeframe}</div>
                <h3 
                  onClick={() => onNavigateService && onNavigateService(service.id)}
                  className="text-lg font-bold text-slate-900 mb-2 cursor-pointer hover:text-[#16a34a] transition-colors"
                >
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{service.shortDesc}</p>

                <div className="py-2 border-y border-slate-100 mb-4 flex items-baseline gap-1">
                  <span className="text-xs text-slate-400">Starting at</span>
                  <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    ${service.startingPrice}
                  </span>
                </div>

                <ul className="space-y-2 mb-6 text-xs text-slate-700">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => onOpenApply(undefined, service.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    service.popular
                      ? 'bg-[#16a34a] hover:bg-[#15803d] text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {onNavigateService && (
                  <button
                    onClick={() => onNavigateService(service.id)}
                    className="w-full text-center text-[11px] font-bold text-slate-500 hover:text-[#16a34a] py-1 cursor-pointer"
                  >
                    View Service Guide
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Safe Telehealth Notice */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-900">Protected by 100% Money-Back Guarantee</div>
              <div className="text-xs text-slate-500">If our doctor does not recommend you for any reason, you receive a full refund with zero fees.</div>
            </div>
          </div>
          <button
            onClick={() => onOpenApply()}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
          >
            Start Your Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
