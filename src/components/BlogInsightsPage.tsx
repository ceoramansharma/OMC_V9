import React, { useState, useEffect } from 'react';
import { BLOG_ARTICLES_DATA, BlogArticle } from '../data/blogArticlesData';
import { 
  BookOpen, Search, ArrowRight, Clock, Calendar, 
  ShieldCheck, UserCheck, ChevronRight, Sparkles, Filter, Zap 
} from 'lucide-react';

interface BlogInsightsPageProps {
  initialSpeedMode?: boolean;
  onNavigateHome: () => void;
  onNavigateArticle: (slug: string, isAmp?: boolean) => void;
  onOpenApply: () => void;
}

export const BlogInsightsPage: React.FC<BlogInsightsPageProps> = ({
  initialSpeedMode = false,
  onNavigateHome,
  onNavigateArticle,
  onOpenApply
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSpeedMode, setIsSpeedMode] = useState<boolean>(() => {
    if (initialSpeedMode) return true;
    if (typeof window !== 'undefined') {
      return window.location.search.includes('view=speed') || window.location.search.includes('amp=1');
    }
    return false;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = isSpeedMode
      ? '⚡ Fast Mobile View: Medical Marijuana Insights | Online MMJ Card'
      : 'Medical Marijuana Insights & Patient Education | Online MMJ Card';
  }, [isSpeedMode]);

  const categories = [
    'All',
    'State Laws & Regulations',
    'Patient Guides',
    'Clinical Science & Research',
    'Wellness & Dosing'
  ];

  const filteredArticles = BLOG_ARTICLES_DATA.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = BLOG_ARTICLES_DATA[0];

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* Schema.org Blog / CollectionPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Medical Marijuana Insights",
            "description": "Evidence-based medical cannabis research, state law updates, patient dosing guides, and clinical insights by board-certified physicians.",
            "url": "https://onlinemmjcard.com/medical-marijuana-insights/",
            "publisher": {
              "@type": "MedicalOrganization",
              "name": "Online MMJ Card Telehealth Clinic",
              "logo": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80"
            }
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <button onClick={onNavigateHome} className="hover:text-[#16a34a] font-medium transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Medical Marijuana Insights</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-14 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Physician-Authored Educational Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Medical Marijuana <span className="text-[#16a34a]">Insights</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Evidence-based medical cannabis guides, state law comparisons, dosing protocols, and clinical research curated by board-certified physicians.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by condition, state law, or terpene..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-emerald-100 text-sm shadow-xs transition-all"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#16a34a] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* View Mode Switcher & Speed Notice Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isSpeedMode ? 'bg-yellow-400 animate-ping' : 'bg-emerald-400'}`} />
            <span className="text-slate-400">View Mode:</span>
            <span className="text-white font-bold">{isSpeedMode ? '⚡ Ultra-Fast Mobile Mode' : 'Standard Magazine View'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsSpeedMode(false);
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('view');
                  window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
                } catch (e) {
                  // ignore
                }
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                !isSpeedMode ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard Grid
            </button>
            <button
              onClick={() => {
                setIsSpeedMode(true);
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set('view', 'speed');
                  window.history.replaceState(null, '', url.pathname + url.search);
                } catch (e) {
                  // ignore
                }
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                isSpeedMode ? 'bg-yellow-400 text-slate-950 shadow-sm' : 'bg-slate-800 text-yellow-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>⚡ Speed View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Spotlight Article (Only when in Standard Mode, 'All' category and no search) */}
      {!isSpeedMode && selectedCategory === 'All' && !searchQuery && featuredArticle && (
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-6 relative h-64 lg:h-auto min-h-[320px]">
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured Insight
                </div>
              </div>
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="font-bold text-[#16a34a]">{featuredArticle.category}</span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                    <span>&middot;</span>
                    <span>{featuredArticle.publishedDate}</span>
                  </div>

                  <h2 
                    onClick={() => onNavigateArticle(featuredArticle.slug)}
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900 hover:text-[#16a34a] transition-colors cursor-pointer leading-tight"
                  >
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                      {featuredArticle.author.avatarInitials}
                    </div>
                    <span className="font-medium text-slate-700">{featuredArticle.author.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigateArticle(featuredArticle.slug, true)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-emerald-700 fill-emerald-700" />
                      <span>⚡ AMP</span>
                    </button>
                    <button
                      onClick={() => onNavigateArticle(featuredArticle.slug)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16a34a] hover:text-[#15803d] hover:underline cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid or Speed List */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                {isSpeedMode && <Zap className="w-5 h-5 text-[#16a34a] fill-[#16a34a]" />}
                <span>{selectedCategory === 'All' ? 'Latest Medical Cannabis Research' : `${selectedCategory} Articles`}</span>
              </h2>
              {isSpeedMode && (
                <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                  ⚡ Mobile Data Saver & AMP View Enabled (Instant 0ms layout shift)
                </p>
              )}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <p className="text-base text-slate-600">No articles matched your search query.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-xs font-bold text-[#16a34a] underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : isSpeedMode ? (
            /* Lightweight Speed-Optimized List View (AMP-Ready, 0 CLS, Fast Mobile Loading) */
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-black text-[#16a34a] uppercase tracking-wider text-[10px]">
                        ⚡ {article.category}
                      </span>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {article.readTime}
                      </span>
                      <span>&middot;</span>
                      <span>{article.publishedDate}</span>
                    </div>

                    <h3
                      onClick={() => onNavigateArticle(article.slug, true)}
                      className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#16a34a] transition-colors cursor-pointer leading-snug"
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      onClick={() => onNavigateArticle(article.slug, true)}
                      className="flex-1 sm:flex-initial px-4 py-2 bg-[#16a34a] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                      <span>Read AMP</span>
                    </button>
                    <button
                      onClick={() => onNavigateArticle(article.slug, false)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Full
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Standard Grid View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div 
                      onClick={() => onNavigateArticle(article.slug)}
                      className="relative h-48 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {article.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{article.publishedDate}</span>
                        <span>&middot;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      <h3
                        onClick={() => onNavigateArticle(article.slug)}
                        className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#16a34a] transition-colors cursor-pointer line-clamp-2 leading-snug"
                      >
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500 font-medium truncate">
                      By {article.author.name.split(',')[0]}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onNavigateArticle(article.slug, true)}
                        className="text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        title="Read in ultra-fast AMP mode"
                      >
                        <Zap className="w-2.5 h-2.5 text-[#16a34a] fill-[#16a34a]" />
                        <span>AMP</span>
                      </button>
                      <button
                        onClick={() => onNavigateArticle(article.slug)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#16a34a] group-hover:translate-x-1 transition-transform cursor-pointer"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Medical Callout Banner */}
      <section className="py-14 bg-[#0f172a] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700 text-emerald-300 text-xs font-bold">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Ready for Clinical Relief?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Connect with a Board-Certified MMJ Doctor Online
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            15-minute HIPAA-compliant telehealth evaluation. Same-day digital recommendation with 99% approval guarantee or 100% money back.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenApply}
              className="px-8 py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Your Evaluation &rarr;</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
