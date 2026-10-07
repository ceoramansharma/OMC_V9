import React from 'react';
import { BLOG_ARTICLES_DATA } from '../data/blogArticlesData';
import { BookOpen, ArrowRight, Clock, UserCheck } from 'lucide-react';

interface BlogHomeTeaserSectionProps {
  onNavigateBlog: () => void;
  onNavigateArticle: (slug: string) => void;
}

export const BlogHomeTeaserSection: React.FC<BlogHomeTeaserSectionProps> = ({
  onNavigateBlog,
  onNavigateArticle
}) => {
  // Take top 3 articles for the home page showcase
  const topArticles = BLOG_ARTICLES_DATA.slice(0, 3);

  return (
    <section id="insights" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#16a34a]" />
              <span>Evidence-Based Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Medical Marijuana <span className="text-[#16a34a]">Insights</span> & Research
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Stay informed with patient guides, cannabinoid clinical research, and state law updates authored by board-certified physicians.
            </p>
          </div>

          <div>
            <button
              onClick={onNavigateBlog}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="w-4 h-4 text-[#16a34a]" />
            </button>
          </div>
        </div>

        {/* 3-Article Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {topArticles.map((article) => (
            <article
              key={article.id}
              className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
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
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
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
                    className="text-base font-bold text-slate-900 group-hover:text-[#16a34a] transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-200/60 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  By {article.author.name.split(',')[0]}
                </span>
                <button
                  onClick={() => onNavigateArticle(article.slug)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#16a34a] group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
