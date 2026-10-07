import React, { useState } from 'react';
import { getMergedCitiesData } from '../data/localSeoData';
import { useThemeContent } from '../utils/themeContent';
import { Video, ShieldCheck, Clock, CheckCircle2, Search, Sparkles, MapPin } from 'lucide-react';

interface LocalCitiesDirectorySectionProps {
  onNavigateCity: (citySlug: string) => void;
  onOpenApply: (stateId?: string, serviceId?: string) => void;
}

export const LocalCitiesDirectorySection: React.FC<LocalCitiesDirectorySectionProps> = ({
  onNavigateCity,
  onOpenApply
}) => {
  const themeContent = useThemeContent();
  const citiesContent = themeContent.cities;

  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Strictly filter to California cities only on homepage as requested
  const allCitiesData = getMergedCitiesData();
  const californiaCities = allCitiesData.filter(
    (c) => c.stateCode === 'CA' || c.stateName.toLowerCase() === 'california' || c.stateId === 'california'
  );

  // California regional filters
  const caRegions = [
    { id: 'all', label: 'All California' },
    { id: 'socal', label: 'Southern California (LA / San Diego / OC)' },
    { id: 'norcal', label: 'Bay Area & NorCal (SF / San Jose / Oakland)' },
    { id: 'central', label: 'Central Valley & Inland Empire (Sacramento / Fresno / Riverside)' },
  ];

  const filteredCities = californiaCities.filter((c) => {
    let matchesRegion = true;
    if (selectedRegionFilter === 'socal') {
      matchesRegion = c.slug.includes('los-angeles') || c.slug.includes('san-diego') || c.slug.includes('long-beach') || c.slug.includes('anaheim') || c.slug.includes('irvine') || c.metroArea.toLowerCase().includes('angeles') || c.metroArea.toLowerCase().includes('diego') || c.metroArea.toLowerCase().includes('orange');
    } else if (selectedRegionFilter === 'norcal') {
      matchesRegion = c.slug.includes('francisco') || c.slug.includes('jose') || c.slug.includes('oakland') || c.metroArea.toLowerCase().includes('bay') || c.metroArea.toLowerCase().includes('silicon');
    } else if (selectedRegionFilter === 'central') {
      matchesRegion = c.slug.includes('sacramento') || c.slug.includes('fresno') || c.slug.includes('lodi') || c.slug.includes('bakersfield') || c.slug.includes('riverside') || c.metroArea.toLowerCase().includes('valley') || c.metroArea.toLowerCase().includes('inland');
    }

    const matchesSearch = c.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.metroArea.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="locations-we-serve" className="py-20 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Connected to WordPress Editable Theme Content */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>{citiesContent.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {citiesContent.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {citiesContent.subheading}
          </p>

          {/* Provider Guarantee Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
              Direct Video / Phone Visits
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
              <Clock className="w-4 h-4 text-[#16a34a]" />
              Same-Day Digital Recommendation
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
              100% Refund If Not Approved
            </span>
          </div>
        </div>

        {/* California Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {caRegions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegionFilter(reg.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedRegionFilter === reg.id
                    ? 'bg-[#16a34a] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search California city or metro..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            />
          </div>

        </div>

        {/* California Cities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.slug}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></span>
                    California Licensed MDs
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                    Save {city.localTaxSavingsPercent} Tax
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <h3 className="text-lg font-bold text-slate-900">
                    {city.cityName}, CA
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  {city.metroArea}
                </p>

                <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span>100% Online video or phone evaluation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span>Same-day California recommendation letter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span>100% Full refund if not approved</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenApply(city.stateId)}
                  className="w-full py-2.5 bg-[#008f58] hover:bg-[#007a4a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Consult With CA Doctor ($39.99)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateCity(city.slug)}
                  className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-[#16a34a] transition-colors cursor-pointer"
                >
                  View {city.cityName} Patient Guide &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No specific area matches your search, but our California-licensed physicians provide 100% online evaluations across the entire state of California!
          </div>
        )}

      </div>
    </section>
  );
};
