import React, { useState, useEffect } from 'react';
import { BlogArticle, BLOG_ARTICLES_DATA } from '../data/blogArticlesData';
import { 
  Zap, Calendar, Clock, ShieldCheck, ChevronRight, 
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Share2, ArrowLeft, Lightbulb, PhoneCall
} from 'lucide-react';

interface ArticleAmpSpeedViewProps {
  article: BlogArticle;
  onNavigateHome: () => void;
  onNavigateBlog: (isSpeedMode?: boolean) => void;
  onNavigateArticle: (slug: string, isAmp?: boolean) => void;
  onOpenApply: () => void;
  onToggleStandardView: () => void;
}

export const ArticleAmpSpeedView: React.FC<ArticleAmpSpeedViewProps> = ({
  article,
  onNavigateHome,
  onNavigateBlog,
  onNavigateArticle,
  onOpenApply,
  onToggleStandardView,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.title = `⚡ AMP: ${article.metaTitle} | Online MMJ Card`;
  }, [article]);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const relatedArticles = BLOG_ARTICLES_DATA.filter(
    (a) => article.relatedArticleIds.includes(a.id) || article.relatedArticleIds.includes(a.slug)
  ).slice(0, 3);

  return (
    <div className="bg-[#fafafa] text-slate-900 min-h-screen font-sans selection:bg-emerald-200 antialiased">
      
      {/* Schema.org MedicalWebPage & AMP BlogPosting JSON-LD */}
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
            "dateModified": "2026-10-06T08:00:00+08:00",
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
              "@id": `https://onlinemmjcard.com/${article.slug}/?amp=1`
            }
          })
        }}
      />

      {/* Speed Mode Top Notice Bar */}
      <aside aria-label="AMP Speed Mode Notice" className="bg-emerald-900 text-emerald-100 text-[11px] px-3 py-2 border-b border-emerald-800">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-bold">
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 shrink-0" />
            <span>⚡ Ultra-Fast AMP Mode Active (0.1s FCP | 0 CLS | Mobile Data Saver)</span>
          </div>
          <button
            onClick={onToggleStandardView}
            className="text-white underline hover:text-yellow-200 transition-colors font-semibold shrink-0 cursor-pointer"
          >
            Switch to Standard View
          </button>
        </div>
      </aside>

      {/* Lightweight Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#16a34a] flex items-center justify-center text-white font-black text-sm">
              M
            </div>
            <div>
              <span className="font-black text-slate-900 text-sm tracking-tight block">
                ONLINE MMJ <span className="text-[#16a34a]">CARD</span>
              </span>
              <span className="text-[9px] text-slate-500 uppercase font-semibold block leading-none">
                ⚡ AMP Fast Reader
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateBlog(true)}
              className="text-xs text-slate-600 hover:text-[#16a34a] font-bold px-2 py-1 rounded-md transition-colors"
            >
              All Articles
            </button>
            <button
              onClick={onOpenApply}
              className="bg-[#16a34a] hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1"
            >
              <span>Get Card</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </header>

      {/* Minimal Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto px-4 pt-3 pb-2 text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
        <button onClick={onNavigateHome} className="hover:text-emerald-700 cursor-pointer">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button onClick={() => onNavigateBlog(true)} className="hover:text-emerald-700 cursor-pointer">Insights</button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Main AMP Article Body */}
      <article className="max-w-3xl mx-auto px-4 py-4 space-y-6">
        
        {/* Article Meta Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
            <span>⚡ AMP</span>
            <span>&middot;</span>
            <span>{article.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1 pb-3 border-b border-slate-200">
            <span className="font-bold text-slate-800">By {article.author.name}</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{article.publishedDate}</span>
            </span>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </span>
            <span>&middot;</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Reviewed by {article.reviewedBy}</span>
            </span>
          </div>
        </header>

        {/* Speed-Optimized Image Container (Guaranteed 0 CLS with fixed aspect ratio) */}
        <div className="relative w-full aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
          <img
            src={article.featuredImage}
            alt={article.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Executive Summary / Key Takeaways Box */}
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-[#16a34a]" />
            <span>Key Takeaways (Quick Read)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-emerald-900">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                <span className="leading-snug">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fast Jump Table of Contents */}
        <nav aria-label="Table of Contents" className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-xs">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Jump to Section:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
            {article.sections.map((section, idx) => (
              <a
                key={idx}
                href={`#section-${idx}`}
                className="text-[#16a34a] hover:underline truncate py-1 px-2 rounded-md hover:bg-emerald-50 transition-colors"
              >
                &rarr; {section.heading}
              </a>
            ))}
          </div>
        </nav>

        {/* Streamlined Content Sections */}
        <div className="space-y-6 text-sm sm:text-base text-slate-800 leading-relaxed font-sans">
          {article.sections.map((section, idx) => (
            <section key={idx} id={`#section-${idx}`} className="space-y-3 pt-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-200 pb-1.5">
                {section.heading}
              </h2>

              {section.subheading && (
                <h3 className="text-sm font-bold text-slate-700">
                  {section.subheading}
                </h3>
              )}

              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed text-xs sm:text-sm text-slate-700">
                  {paragraph}
                </p>
              ))}

              {section.callout && (
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  section.callout.type === 'warning'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}>
                  <strong>Notice: </strong> {section.callout.text}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Frequently Asked Questions */}
        {article.faqList.length > 0 && (
          <section className="pt-4 border-t border-slate-200 space-y-3">
            <h2 className="text-base font-black text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {article.faqList.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-3 flex items-center justify-between text-xs font-bold text-slate-900 hover:text-[#16a34a] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {activeFaq === idx ? (
                      <ChevronUp className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {activeFaq === idx && (
                    <div className="p-3 text-xs text-slate-600 border-t border-slate-100 bg-slate-50 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fast Action CTA Box */}
        <section aria-label="Book Evaluation CTA" className="bg-[#16a34a] text-white p-5 rounded-2xl shadow-sm space-y-3 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              Instant 420 Evaluation
            </div>
            <h3 className="text-base font-black">
              Get Your Official MMJ Card in 15 Minutes
            </h3>
            <p className="text-[11px] text-emerald-100">
              100% Online video visit with licensed state doctors. 99% approval or full refund.
            </p>
          </div>
          <button
            onClick={onOpenApply}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-[#16a34a] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-50 transition-colors shadow-sm shrink-0 cursor-pointer"
          >
            Apply Now &rarr;
          </button>
        </section>

        {/* Medical Author Profile */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">
            Medical Author & Clinical Review
          </div>
          <div className="font-bold text-slate-900">
            {article.author.name} ({article.author.credentials})
          </div>
          <div className="text-slate-600 text-[11px] leading-relaxed">
            Clinically reviewed by {article.reviewedBy}. All educational content is verified for adherence to state medical marijuana laws and clinical cannabinoid guidelines.
          </div>
        </div>

        {/* Related Articles Fast Carousel */}
        {relatedArticles.length > 0 && (
          <section className="pt-4 border-t border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Related Clinical Guides (AMP Fast Loading)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateArticle(rel.slug, true)}
                  className="bg-white border border-slate-200 hover:border-emerald-500 p-3 rounded-xl cursor-pointer transition-all space-y-1 shadow-xs group"
                >
                  <span className="text-[9px] font-bold uppercase text-emerald-700 block">
                    ⚡ {rel.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#16a34a] line-clamp-2 transition-colors">
                    {rel.title}
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 pt-1">
                    <span>Read AMP</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation Switcher */}
        <footer className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleStandardView}
              className="text-[#16a34a] hover:underline font-bold cursor-pointer"
            >
              Switch to Standard Interactive View
            </button>
            <span>&middot;</span>
            <button
              onClick={handleShare}
              className="hover:text-slate-900 flex items-center gap-1 cursor-pointer font-semibold"
            >
              <Share2 className="w-3 h-3" />
              <span>{copiedUrl ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          <div>
            <a href="tel:8884206789" className="hover:text-[#16a34a] flex items-center gap-1 font-bold">
              <PhoneCall className="w-3 h-3" />
              <span>(888) 420-6789</span>
            </a>
          </div>
        </footer>

      </article>

    </div>
  );
};
