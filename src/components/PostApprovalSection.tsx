import React from 'react';
import { FileCheck, CreditCard, Store, ArrowRight } from 'lucide-react';

interface PostApprovalSectionProps {
  onOpenApply: () => void;
}

export const PostApprovalSection: React.FC<PostApprovalSectionProps> = ({ onOpenApply }) => {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title from Screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Post-Approval Process
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            If you're approved, here's what you need to do next. A quick look at your post-approval journey.
          </p>
        </div>

        {/* 3 Steps Row (Matching Screenshot with circular green icons) */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Step 1: Receive Digital Certification */}
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50/60 border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-[#16a34a] text-[#16a34a] flex items-center justify-center mb-5 shadow-xs">
              <FileCheck className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Receive Digital Certification
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your approved MMJ recommendation is emailed within 24-48 hours of your approved consultation.
            </p>
          </div>

          {/* Step 2: Get Your MMJ Card */}
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50/60 border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-[#16a34a] text-[#16a34a] flex items-center justify-center mb-5 shadow-xs">
              <CreditCard className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Get Your MMJ Card
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The physical card arrives in 7-20 business days (varies by state program).
            </p>
          </div>

          {/* Step 3: Visit Dispensary */}
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50/60 border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-[#16a34a] text-[#16a34a] flex items-center justify-center mb-5 shadow-xs">
              <Store className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Visit Dispensary
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Start purchasing medical cannabis from state-licensed dispensaries.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
