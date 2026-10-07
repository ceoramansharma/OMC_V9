import React, { useEffect, useState } from 'react';
import { BlogArticle, BLOG_ARTICLES_DATA } from '../data/blogArticlesData';
import { 
  Calendar, Clock, UserCheck, ShieldCheck, ChevronRight, 
  ArrowRight, Share2, CheckCircle2, AlertTriangle, Lightbulb, 
  HelpCircle, ChevronDown, BookOpen, Zap 
} from 'lucide-react';
import { FloatingTableOfContents } from './FloatingTableOfContents';
import { ArticleAmpSpeedView } from './ArticleAmpSpeedView';

interface ArticleDetailPageProps {
  article: BlogArticle;
  isAmp?: boolean;
  onNavigateHome: () => void;
  onNavigateBlog: (isSpeedMode?: boolean) => void;
  onNavigateArticle: (slug: string, isAmp?: boolean) => void;
  onOpenApply: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  isAmp = false,
  onNavigateHome,
  onNavigateBlog,
  onNavigateArticle,
  onOpenApply
}) => {
  const [isSpeedMode, setIsSpeedMode] = useState<boolean>(() => {
    if (isAmp) return true;
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const hash = window.location.hash;
      return search.includes('amp=1') || hash.includes('amp=1') || search.includes('view=speed');
    }
    return false;
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (isAmp) {
      setIsSpeedMode(true);
    }
  }, [isAmp]);

  useEffect(() => {
    if (!isSpeedMode) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.title = `${article.metaTitle} | Online MMJ Card Insights`;
    }
  }, [article, isSpeedMode]);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Find related articles
  const relatedIds = article.relatedArticleIds || [];
  const relatedArticles = BLOG_ARTICLES_DATA.filter(
    (a) => relatedIds.includes(a.id) || relatedIds.includes(a.slug)
  ).slice(0, 3);

  // If Speed / AMP mode is active, render ultra-lightweight AMP component
  if (isSpeedMode) {
    return (
      <ArticleAmpSpeedView
        article={article}
        onNavigateHome={onNavigateHome}
        onNavigateBlog={onNavigateBlog}
        onNavigateArticle={onNavigateArticle}
        onOpenApply={onOpenApply}
        onToggleStandardView={() => {
          setIsSpeedMode(false);
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete('amp');
            url.searchParams.delete('view');
            window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
          } catch (e) {
            // ignore
          }
        }}
      />
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* AMP Link and Speed Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">View Mode:</span>
            <span className="text-white font-bold">Standard Interactive View</span>
          </div>
          <button
            onClick={() => {
              setIsSpeedMode(true);
              try {
                const url = new URL(window.location.href);
                url.searchParams.set('amp', '1');
                window.history.replaceState(null, '', url.pathname + url.search);
              } catch (e) {
                // ignore
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-black text-[11px] uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
            <span>⚡ Switch to Ultra-Fast AMP View</span>
          </button>
        </div>
      </div>
      
      {/* Schema.org BlogPosting & MedicalWebPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["BlogPosting", "MedicalWebPage"],
            "headline": article.title,
            "description": article.metaDesc,
            "image": [article.featuredImage],
            "datePublished": "2026-10-01T08:00:00+08:00",
            "dateModified": "2026-10-05T08:00:00+08:00",
            "author": {
              "@type": "Person",
              "name": article.author.name,
              "jobTitle": article.author.credentials
            },
            "reviewedBy": {
              "@type": "Person",
              "name": article.reviewedBy
            },
            "publisher": {
              "@type": "MedicalOrganization",
              "name": "Online MMJ Card Telehealth Clinic",
              "logo": {
                "@type": "ImageObject",
                "url": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://onlinemmjcard.com/${article.slug}/`
            }
          })
        }}
      />

      {/* Schema.org FAQPage for in-article questions */}
      {article.faqList.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": article.faqList.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.a
                }
              }))
            })
          }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center flex-wrap gap-2">
          <button onClick={onNavigateHome} className="hover:text-[#16a34a] font-medium transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigateBlog()} className="hover:text-[#16a34a] font-medium transition-colors cursor-pointer">
            Insights
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-[240px] sm:max-w-md">
            {article.title}
          </span>
        </div>
      </div>

      {/* Main Semantic Article Container with Floating TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-10 items-start justify-center">
        
        {/* Main Article Content */}
        <article id="article-content" className="flex-1 min-w-0 max-w-3xl space-y-8">
        
        {/* Article Header & Metadata */}
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
            {article.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                {article.author.avatarInitials}
              </div>
              <div>
                <span className="font-bold text-slate-800 block">{article.author.name}</span>
                <span className="text-[10px] text-slate-400">{article.author.credentials}</span>
              </div>
            </div>

            <span className="text-slate-300 hidden sm:inline">&middot;</span>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.publishedDate}</span>
            </div>

            <span className="text-slate-300 hidden sm:inline">&middot;</span>

            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </div>

            <span className="text-slate-300 hidden sm:inline">&middot;</span>

            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{article.reviewedBy}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-[320px] sm:h-[420px] object-cover"
          />
        </div>

        {/* Executive Summary / Key Takeaways Box */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-emerald-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-emerald-700" />
            <span>Key Takeaways & Executive Summary</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 pt-4">
                {section.heading}
              </h2>

              {section.subheading && (
                <h3 className="text-base font-bold text-slate-800">
                  {section.subheading}
                </h3>
              )}

              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {section.callout && (
                <div className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                  section.callout.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : section.callout.type === 'stat'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-start gap-2.5">
                    {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />}
                    {section.callout.type === 'stat' && <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />}
                    <span>{section.callout.text}</span>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* In-Article FAQs Accordion */}
        {article.faqList.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#16a34a]" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-3">
              {article.faqList.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:text-[#16a34a] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#16a34a]' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Doctor Bio Box */}
        <section className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-sm">
            {article.author.avatarInitials}
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Medical Author Profile
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {article.author.name}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {article.author.credentials}. Dedicated to educating patients on evidence-based cannabinoid therapeutic strategies, endocannabinoid receptor biology, and legal patient protections.
            </p>
          </div>
        </section>

        {/* Mid-Article Consultation Booking Callout */}
        <div className="p-8 bg-gradient-to-r from-emerald-600 to-green-700 rounded-3xl text-white space-y-4 shadow-md text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1 max-w-md">
            <h3 className="text-xl font-extrabold">Ready to Get Evaluated?</h3>
            <p className="text-xs text-emerald-100">
              Schedule your 15-minute video evaluation with our certified MMJ doctors. 99% approval guarantee.
            </p>
          </div>
          <button
            onClick={onOpenApply}
            className="px-6 py-3.5 bg-white text-emerald-900 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-50 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <span>Book 420 Evaluation &rarr;</span>
          </button>
        </div>

        {/* Related Articles Carousel / Grid */}
        {relatedArticles.length > 0 && (
          <section className="pt-10 border-t border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#16a34a]" />
              <span>Related Medical Marijuana Insights</span>
            </h2>

            <div className="grid sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateArticle(rel.slug)}
                  className="bg-slate-50 hover:bg-emerald-50/50 p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {rel.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#16a34a] line-clamp-2 transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#16a34a] flex items-center gap-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        </article>

        {/* Floating / Sticky Table of Contents Sidebar */}
        <FloatingTableOfContents 
          containerSelector="#article-content"
          onOpenApply={onOpenApply}
          title="On This Page"
        />

      </div>

    </div>
  );
};
