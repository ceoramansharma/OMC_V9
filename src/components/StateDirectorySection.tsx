import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ExternalLink, ArrowRight, Shield, Sparkles, Scale, Info, X } from 'lucide-react';
import { STATES_DATA, StateInfo } from '../data/mmjData';

interface StateDirectorySectionProps {
  onOpenApply: (stateId: string) => void;
  onNavigateState?: (stateId: string) => void;
}

export const StateDirectorySection: React.FC<StateDirectorySectionProps> = ({ 
  onOpenApply,
  onNavigateState
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeStateModal, setActiveStateModal] = useState<StateInfo | null>(null);

  const filteredStates = STATES_DATA.filter((state) => {
    const matchesSearch =
      state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || state.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <section id="states-directory" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            State-by-State Pricing & Law Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Your State MMJ Card
          </h2>
          <p className="text-base text-slate-600">
            Compare doctor evaluation rates, home cultivation laws, validity periods, and state health registry fees.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by state name or code (e.g. California, NY)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['All', 'West', 'East', 'Midwest', 'South'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedRegion === region
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

        </div>

        {/* State Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-lg transition-all group"
            >
              <div>
                {/* State Title & Price Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center font-mono">
                      {st.code}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {st.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Region: {st.region} · {st.validity} Valid
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                      ${st.price}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold">
                      Renewal: ${st.renewalPrice}
                    </div>
                  </div>
                </div>

                {/* State Highlights */}
                <p className="text-xs text-slate-600 line-clamp-2 my-3">
                  {st.summary}
                </p>

                {/* Specs List */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div className="flex items-center justify-between py-1 border-t border-slate-50">
                    <span className="text-slate-400">Consultation:</span>
                    <span className="font-medium text-slate-700">{st.consultationTime}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-t border-slate-50">
                    <span className="text-slate-400">Home Cultivation:</span>
                    <span className="font-medium text-slate-700 truncate max-w-[180px]">{st.homeCultivation}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-t border-slate-50">
                    <span className="text-slate-400">State Registry Fee:</span>
                    <span className="font-medium text-slate-700">{st.stateRegistryFee}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onNavigateState) onNavigateState(st.id);
                    else setActiveStateModal(st);
                  }}
                  className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>State Laws</span>
                </button>

                <button
                  onClick={() => onOpenApply(st.id)}
                  className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Get Card</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Result */}
        {filteredStates.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-700">No states found matching "{searchQuery}"</div>
            <div className="text-xs text-slate-500 mt-1">Try searching for California, New York, Florida, Ohio, etc.</div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
              className="mt-3 px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* State Law Deep-Dive Drawer / Modal */}
      {activeStateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveStateModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-lg flex items-center justify-center font-mono">
                {activeStateModal.code}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeStateModal.name} Medical Marijuana Program
                </h3>
                <span className="text-xs text-emerald-700 font-semibold">
                  Valid for {activeStateModal.validity} · Telehealth Evaluation Allowed
                </span>
              </div>
            </div>

            {/* Content Breakdown */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-1">
                <div className="font-bold text-emerald-900 text-xs uppercase tracking-wider">Pricing Overview</div>
                <div className="flex items-center justify-between text-slate-800">
                  <span>First-Time Telehealth Certification:</span>
                  <span className="font-bold text-slate-900">${activeStateModal.price}</span>
                </div>
                <div className="flex items-center justify-between text-slate-800">
                  <span>Annual Renewal Consultation:</span>
                  <span className="font-bold text-emerald-700">${activeStateModal.renewalPrice}</span>
                </div>
                <div className="flex items-center justify-between text-slate-800">
                  <span>State Registry Application Fee:</span>
                  <span className="font-semibold text-slate-600">{activeStateModal.stateRegistryFee}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Legal Possession & Cultivation Limits</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Possession:</strong> {activeStateModal.possessionLimit}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  <strong>Home Cultivation:</strong> {activeStateModal.homeCultivation}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">State Reciprocity</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeStateModal.reciprocityNotes}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Common Qualifying Conditions in {activeStateModal.name}</h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeStateModal.popularConditions.map((cond, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {cond}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={activeStateModal.stateRegistryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Official {activeStateModal.name} Cannabis Health Dept Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveStateModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const stateId = activeStateModal.id;
                  setActiveStateModal(null);
                  onOpenApply(stateId);
                }}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Start {activeStateModal.name} Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
