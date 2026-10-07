import React from 'react';
import { useThemeContent } from '../utils/themeContent';
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenApply: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenApply }) => {
  const themeContent = useThemeContent();
  const hw = themeContent.howItWorks;

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title (Connected to WordPress Editable Theme Content) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>{hw.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {hw.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {hw.subheading}
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-slate-50/60 rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all group relative">
            <div>
              {/* Image Container with Orange Circular Step Badge */}
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100/70 to-teal-50 border border-slate-200 overflow-hidden relative mb-6 flex items-center justify-center p-4">
                
                {/* Visual Representation of Patient on Laptop / Form */}
                <div className="w-full h-full bg-white rounded-xl shadow-xs border border-slate-200/80 p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">HIPAA INTAKE FORM</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="space-y-1.5 py-1">
                    <div className="h-2 bg-slate-100 rounded-full w-3/4"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                    <div className="h-2 bg-emerald-100 rounded-full w-5/6"></div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-semibold pt-1">
                    <span>5-Min Online Form</span>
                    <span className="text-[#16a34a]">100% Encrypted</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#f97316] text-white font-extrabold text-base flex items-center justify-center shadow-md">
                  1
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {hw.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {hw.step1Desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#16a34a]">
              <span>No in-person visit required</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50/60 rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all group relative">
            <div>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100/70 to-teal-50 border border-slate-200 overflow-hidden relative mb-6 flex items-center justify-center p-4">
                <div className="w-full h-full bg-slate-900 rounded-xl shadow-xs border border-slate-800 p-3 flex flex-col justify-between text-white relative">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1 font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      LIVE VIDEO CONSULT
                    </span>
                    <span className="text-slate-400 font-mono text-[9px]">10:00 MINS</span>
                  </div>
                  <div className="flex items-center justify-center my-auto">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-emerald-500/60 flex items-center justify-center text-xs font-bold text-emerald-300">
                      MD
                    </div>
                  </div>
                  <div className="text-[9px] text-center text-slate-400">
                    Dr. Kevin Kargman, D.O. · Licensed Physician
                  </div>
                </div>

                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#f97316] text-white font-extrabold text-base flex items-center justify-center shadow-md">
                  2
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {hw.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {hw.step2Desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#16a34a]">
              <span>Compassionate, judgment-free</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50/60 rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all group relative">
            <div>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100/70 to-teal-50 border border-slate-200 overflow-hidden relative mb-6 flex items-center justify-center p-4">
                <div className="w-full h-full bg-white rounded-xl shadow-xs border border-slate-200/80 p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">OFFICIAL CERTIFICATE</span>
                    <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  </div>
                  <div className="space-y-1.5 py-1">
                    <div className="h-2 bg-slate-100 rounded-full w-2/3"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-semibold pt-1 border-t border-slate-100">
                    <span className="text-emerald-700 font-bold">APPROVED</span>
                    <span>Same-Day PDF</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#f97316] text-white font-extrabold text-base flex items-center justify-center shadow-md">
                  3
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {hw.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {hw.step3Desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#16a34a]">
              <span>Immediate dispensary validity</span>
            </div>
          </div>

        </div>

        {/* CTA Bar Under Steps */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenApply}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Your 3-Step Process Online</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
