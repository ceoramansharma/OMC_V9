import React, { useEffect } from 'react';
import { WordPressPage } from '../utils/customPagesStore';
import { ArrowLeft, Clock, Calendar, CheckCircle2, ShieldCheck, FileText, ArrowRight, Settings } from 'lucide-react';

interface CustomPageViewProps {
  page: WordPressPage;
  onNavigateHome: () => void;
  onOpenApply?: (stateId?: string, serviceId?: string) => void;
  onOpenAdminSettings?: () => void;
}

export const CustomPageView: React.FC<CustomPageViewProps> = ({
  page,
  onNavigateHome,
  onOpenApply,
  onOpenAdminSettings
}) => {
  useEffect(() => {
    // Dynamic SEO Title
    if (page.seoTitle) {
      document.title = page.seoTitle;
    } else if (page.title) {
      document.title = `${page.title} | Online MMJ Card`;
    }

    // Dynamic Meta Description
    if (page.metaDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', page.metaDescription);
    }

    // Dynamic Canonical Link
    if (page.canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', page.canonicalUrl);
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#16a34a] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Template:</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
              {page.template}
            </span>
            {onOpenAdminSettings && (
              <button
                onClick={onOpenAdminSettings}
                className="ml-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                title="Edit this page in Lead Manager"
              >
                <Settings className="w-3 h-3 text-[#16a34a]" />
                <span>Edit Page (CRUD)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Patient Resource</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            {page.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Published: {page.date || 'Active'}</span>
            </div>
            {page.lastModified && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Updated: {page.lastModified}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Physician Reviewed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 space-y-8">
          
          {/* Page Body Content */}
          {page.content ? (
            <div 
              className="prose prose-slate max-w-none prose-headings:font-black prose-h2:text-2xl prose-h2:text-slate-900 prose-h3:text-lg prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="py-8 text-center text-slate-500">
              <p>This custom page has been created and published. Use the Lead Manager CRUD interface to add content.</p>
            </div>
          )}

          {/* Clinical Telehealth CTA Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                <span>Ready to consult with a doctor?</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Get Your Official Medical Marijuana Card Online
              </h3>
              <p className="text-xs text-slate-600 max-w-xl">
                15-minute telehealth evaluation with a state-licensed physician. 99% approval guarantee or 100% full refund.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenApply ? onOpenApply() : onNavigateHome()}
                className="px-6 py-3 rounded-xl bg-[#16a34a] hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
