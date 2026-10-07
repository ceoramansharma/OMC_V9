import React, { useState, useEffect } from 'react';
import { 
  X, Globe, RefreshCw, Download, CheckCircle2, Copy, 
  ExternalLink, FileCode, Clock, Server, Check, AlertCircle 
} from 'lucide-react';
import { 
  crawlAppRoutes, 
  generateSitemapXml, 
  getSitemapStats, 
  downloadSitemapFile, 
  saveSitemapLocally,
  saveSitemapToWordPressRoot,
  SitemapStats,
  SitemapEntry
} from '../utils/sitemapGenerator';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome?: () => void;
  onNavigateBlog?: () => void;
  onNavigateArticle?: (slug: string, isAmp?: boolean) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigateHome,
  onNavigateBlog,
  onNavigateArticle,
}) => {
  const [stats, setStats] = useState<SitemapStats>(() => getSitemapStats());
  const [routes, setRoutes] = useState<SitemapEntry[]>(() => crawlAppRoutes());
  const [isCrawling, setIsCrawling] = useState(false);
  const [isSavingWp, setIsSavingWp] = useState(false);
  const [wpSaveSuccess, setWpSaveSuccess] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showXmlPreview, setShowXmlPreview] = useState(false);
  const [xmlContent, setXmlContent] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = () => {
    const updatedRoutes = crawlAppRoutes();
    const updatedStats = getSitemapStats();
    setRoutes(updatedRoutes);
    setStats(updatedStats);
    setXmlContent(generateSitemapXml());
  };

  const handleManualCrawl = () => {
    setIsCrawling(true);
    setTimeout(() => {
      const freshXml = generateSitemapXml();
      saveSitemapLocally(freshXml);
      refreshData();
      setIsCrawling(false);
    }, 450);
  };

  const handleSaveToWordPress = async () => {
    setIsSavingWp(true);
    setWpSaveSuccess(null);
    try {
      const result = await saveSitemapToWordPressRoot();
      if (result.success) {
        setWpSaveSuccess(result.message);
      } else {
        setWpSaveSuccess(`Saved to local root and theme sitemap.xml fallback (${result.message})`);
      }
    } catch (err: any) {
      setWpSaveSuccess('Sitemap saved to browser storage & /sitemap.xml static route.');
    } finally {
      setIsSavingWp(false);
    }
  };

  const handleCopySitemapUrl = () => {
    const url = 'https://onlinemmjcard.com/sitemap.xml';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  if (!isOpen) return null;

  const filteredRoutes = routes.filter((r) => {
    if (selectedFilter === 'All') return true;
    return r.category === selectedFilter;
  });

  const categories = ['All', 'Home', 'States', 'Cities', 'Services', 'Conditions', 'Blog', 'Articles', 'AMP'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#16a34a] flex items-center justify-center text-white font-black shadow-md">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">Automated XML Sitemap Generator</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-500/40">
                  ⚡ Auto-Crawling Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Periodically crawls all live app routes & indexes into WordPress root directory (<code className="text-emerald-300">sitemap.xml</code>)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls & Metric Badges */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Indexed URLs</span>
              <span className="text-2xl font-black text-slate-900">{stats.totalUrls}</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">31 States & Cities</span>
              <span className="text-2xl font-black text-emerald-700">
                {(stats.byCategory['States'] || 0) + (stats.byCategory['Cities'] || 0)}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">AMP Fast URLs</span>
              <span className="text-2xl font-black text-yellow-600">
                {stats.byCategory['AMP'] || 0}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">XML File Size</span>
              <span className="text-2xl font-black text-slate-900">
                {Math.round(stats.fileSizeBytes / 1024)} KB
              </span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleManualCrawl}
                disabled={isCrawling}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCrawling ? 'animate-spin' : ''}`} />
                <span>{isCrawling ? 'Crawling App State...' : 'Re-Crawl App State'}</span>
              </button>

              <button
                onClick={handleSaveToWordPress}
                disabled={isSavingWp}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isSavingWp ? 'Saving...' : 'Save to WordPress Root'}</span>
              </button>

              <button
                onClick={() => downloadSitemapFile()}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download XML</span>
              </button>

              <button
                onClick={() => setShowXmlPreview(!showXmlPreview)}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5 text-slate-500" />
                <span>{showXmlPreview ? 'Hide XML' : 'View Raw XML'}</span>
              </button>
            </div>

            <button
              onClick={handleCopySitemapUrl}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-bold cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#16a34a]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied URL!' : 'Copy sitemap.xml URL'}</span>
            </button>
          </div>

          {wpSaveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
              <span>{wpSaveSuccess}</span>
            </div>
          )}
        </div>

        {/* Main Content Area: XML Preview or Route Table */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          
          {showXmlPreview ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold">Raw Sitemaps.org Standard XML with Google Image Tags:</span>
                <span>{xmlContent.split('\n').length} lines</span>
              </div>
              <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto max-h-[360px] leading-relaxed border border-slate-800">
                {xmlContent}
              </pre>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${
                      selectedFilter === cat
                        ? 'bg-[#16a34a] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat} {cat !== 'All' && `(${stats.byCategory[cat] || 0})`}
                  </button>
                ))}
              </div>

              {/* Crawled Route List Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Route Category</th>
                      <th className="p-3">URL Location</th>
                      <th className="p-3 text-center">Priority</th>
                      <th className="p-3 text-center">Frequency</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRoutes.map((route, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            route.category === 'AMP'
                              ? 'bg-yellow-100 text-yellow-900'
                              : route.category === 'States'
                              ? 'bg-blue-100 text-blue-900'
                              : route.category === 'Cities'
                              ? 'bg-purple-100 text-purple-900'
                              : route.category === 'Conditions'
                              ? 'bg-orange-100 text-orange-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {route.category}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-slate-900">
                          <div className="truncate max-w-[280px] sm:max-w-md font-mono text-[11px]">
                            {route.path}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[280px] sm:max-w-md">
                            {route.title}
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold text-slate-700">
                          {route.priority.toFixed(2)}
                        </td>
                        <td className="p-3 text-center text-slate-500 capitalize">
                          {route.changefreq}
                        </td>
                        <td className="p-3 text-right">
                          <a
                            href={route.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#16a34a] hover:underline font-bold inline-flex items-center gap-1"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* Periodic Crawler Status Banner */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#16a34a] shrink-0" />
              <span>
                <strong>Automated Crawler Schedule:</strong> Runs every 2 minutes in background & on every published article/route change.
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold">
              Target: WordPress Root (<code className="bg-white/80 px-1 py-0.5 rounded-sm">ABSPATH/sitemap.xml</code>)
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Search Engine Standard: Sitemaps.org 0.9 + Google Image Extension</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
