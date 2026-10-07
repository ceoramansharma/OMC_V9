import React, { useState } from 'react';
import { BookOpen, User, Calendar, ArrowRight, X } from 'lucide-react';

export const EducationCentreSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  const articles = [
    {
      id: 'art-1',
      title: 'Before You Apply in West Virginia, Read This First',
      author: 'Carlos L., Dossier',
      date: 'May 12, 2026',
      readTime: '4 min read',
      summary: 'Everything patients and caregivers need to know about applying for a state medical cannabis recommendation, from certification to dispensary approval.',
      content: 'Medical cannabis laws have evolved rapidly to provide safe legal access for qualifying patients. Before scheduling your evaluation, ensure you have basic residency verification and a review of your ongoing health symptoms. Telemedicine makes this initial clinical intake effortless.'
    },
    {
      id: 'art-2',
      title: 'What Doctors Check in a West Virginia MMJ Evaluation',
      author: 'Carlos L., Dossier',
      date: 'May 15, 2026',
      readTime: '5 min read',
      summary: 'Curious what your doctor asks during a telehealth medical cannabis evaluation? Here’s what to expect and how to prepare beforehand.',
      content: 'During your video consultation, the physician focuses on your quality of life, frequency of chronic discomfort, and how traditional therapies have performed. The goal is to determine if cannabinoids offer an effective, non-invasive therapeutic addition.'
    },
    {
      id: 'art-3',
      title: 'WV Cannabis Card Expiring? Here’s What to Do',
      author: 'Carlos L., Dossier',
      date: 'May 18, 2026',
      readTime: '3 min read',
      summary: 'Step-by-step guide to renewing a state medical marijuana card online, avoiding expiration penalties, and maintaining uninterrupted dispensary access.',
      content: 'Renewing your card before its formal expiration prevents gaps in dispensary purchasing limits and ensures you maintain legal possession rights and tax exemptions. Annual renewals take only 5 minutes through Online MMJ Card.'
    }
  ];

  return (
    <section id="education" className="py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title from Screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Medical Cannabis <span className="text-[#16a34a]">Education Centre</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our blogs help you understand medical cannabis, covering qualifying conditions, dosages, state laws, and patient rights. Every article is reviewed by licensed healthcare professionals for accuracy you can trust.
          </p>
        </div>

        {/* 3 Articles Grid (Matching Screenshot) */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Article Image Container */}
                <div className="aspect-[16/10] bg-gradient-to-br from-emerald-100 via-teal-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#16a34a] group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-extrabold text-slate-700 px-2.5 py-1 rounded-md">
                    Clinical Guide
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[11px] text-slate-400 font-semibold mb-2">
                    By {art.author} · {art.readTime}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#16a34a] transition-colors mb-3 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center text-xs font-bold text-[#16a34a]">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Center Green Button from Screenshot: "VIEW ALL BLOGS" */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setActiveArticle(articles[0])}
            className="px-8 py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>VIEW ALL BLOGS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs text-[#16a34a] font-bold uppercase mb-2">
              Medical Cannabis Education
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
              {activeArticle.title}
            </h3>
            <div className="text-xs text-slate-400 mb-4 pb-3 border-b border-slate-100">
              By {activeArticle.author} · Verified by Medical Advisory Board
            </div>

            <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>{activeArticle.summary}</p>
              <p>{activeArticle.content}</p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900">
                <strong>Key Takeaway:</strong> Telehealth evaluations make obtaining a medical marijuana card faster, cheaper, and fully HIPAA compliant.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
