import React, { useState, useEffect } from 'react';
import { List, ChevronRight, ArrowUp, X, Sparkles, CheckCircle2 } from 'lucide-react';

export interface TocHeading {
  id: string;
  text: string;
  level: number; // 2 for H2, 3 for H3
}

interface FloatingTableOfContentsProps {
  containerSelector?: string;
  customHeadings?: TocHeading[];
  onOpenApply?: () => void;
  title?: string;
  showBackToTop?: boolean;
}

export const FloatingTableOfContents: React.FC<FloatingTableOfContentsProps> = ({
  containerSelector = 'article, main',
  customHeadings,
  onOpenApply,
  title = 'Table of Contents',
  showBackToTop = true,
}) => {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scan container and register H2 and H3 elements
  useEffect(() => {
    if (customHeadings && customHeadings.length > 0) {
      setHeadings(customHeadings);
      return;
    }

    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Small delay to ensure all dynamic components and text are rendered
    const timeout = setTimeout(() => {
      const elements = container.querySelectorAll('h2, h3');
      const items: TocHeading[] = [];

      elements.forEach((el, index) => {
        // Skip headings inside modals, footer, or header
        if (el.closest('header, footer, [role="dialog"], .no-toc')) return;

        const text = el.textContent?.trim() || '';
        if (!text) return;

        // Generate clean semantic id if missing
        if (!el.id) {
          const slug = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50);
          el.id = `${slug}-${index}`;
        }

        // Add scroll margin so sticky navbar does not obscure heading
        (el as HTMLElement).style.scrollMarginTop = '100px';

        items.push({
          id: el.id,
          text,
          level: el.tagName.toLowerCase() === 'h2' ? 2 : 3,
        });
      });

      setHeadings(items);
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [containerSelector, customHeadings]);

  // Track active heading and scroll progress via IntersectionObserver & scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveId(id);
    setMobileDrawerOpen(false);

    const yOffset = -90; // Offset for sticky navbar
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });

    // Update URL hash without forcing jump
    try {
      window.history.replaceState(null, '', `#${id}`);
    } catch (e) {
      // Ignore in restricted iframe
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileDrawerOpen(false);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* ============================================================== */}
      {/* 1. DESKTOP FLOATING / STICKY SIDEBAR (Hidden on mobile/tablet) */}
      {/* ============================================================== */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-28 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          
          {/* TOC Header with Reading Progress */}
          <div className="space-y-2 pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <List className="w-4 h-4 text-[#16a34a]" />
                {title}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                {Math.round(scrollProgress)}%
              </span>
            </div>

            {/* Reading Progress Line */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#16a34a] h-full rounded-full transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Heading Links List */}
          <nav className="max-h-[calc(100vh-280px)] overflow-y-auto pr-1 space-y-1 text-xs">
            {headings.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`w-full text-left py-1.5 transition-all cursor-pointer rounded-lg flex items-start gap-1.5 ${
                    item.level === 3 ? 'pl-5 text-[11px]' : 'pl-2 text-xs font-semibold'
                  } ${
                    isActive
                      ? 'text-[#16a34a] bg-emerald-50/80 font-bold border-l-2 border-[#16a34a]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="shrink-0 text-slate-300 mt-0.5">
                    {item.level === 3 ? '↳' : '•'}
                  </span>
                  <span className="line-clamp-2 leading-tight">
                    {item.text}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions: Back to Top & Quick Consultation CTA */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="w-full py-1.5 text-left text-[11px] font-semibold text-slate-500 hover:text-[#16a34a] flex items-center justify-between cursor-pointer transition-colors"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenApply && (
              <button
                onClick={onOpenApply}
                className="w-full py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-[11px] font-black uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Get MMJ Card</span>
              </button>
            )}
          </div>

        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. MOBILE FLOATING TRIGGER BUTTON (Pill at bottom of screen)   */}
      {/* ============================================================== */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="px-4 py-2.5 bg-[#0f172a] text-white rounded-full shadow-xl border border-slate-700 text-xs font-bold flex items-center gap-2 active:scale-95 transition-all"
        >
          <List className="w-4 h-4 text-[#16a34a]" />
          <span>Table of Contents</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
        </button>
      </div>

      {/* ============================================================== */}
      {/* 3. MOBILE SLIDE-UP DRAWER                                      */}
      {/* ============================================================== */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          {/* Backdrop Click to Close */}
          <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />

          {/* Drawer Sheet */}
          <div className="bg-white rounded-t-3xl max-h-[75vh] flex flex-col p-6 space-y-4 shadow-2xl border-t border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <List className="w-4 h-4 text-[#16a34a]" />
                <span>{title}</span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Headings List */}
            <div className="overflow-y-auto space-y-1.5 py-1">
              {headings.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left py-2 px-3 rounded-xl transition-all flex items-start gap-2 ${
                      item.level === 3 ? 'pl-6 text-xs' : 'text-xs font-bold'
                    } ${
                      isActive
                        ? 'bg-emerald-50 text-[#16a34a] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-slate-400 mt-0.5">
                      {item.level === 3 ? '↳' : '•'}
                    </span>
                    <span>{item.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={scrollToTop}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold text-center"
              >
                Back to Top
              </button>
              {onOpenApply && (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onOpenApply();
                  }}
                  className="flex-1 py-2.5 bg-[#16a34a] text-white rounded-xl text-xs font-bold text-center"
                >
                  Get MMJ Card
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
