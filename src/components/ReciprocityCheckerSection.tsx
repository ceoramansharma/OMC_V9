import React, { useState } from 'react';
import { STATES_DATA } from '../data/mmjData';
import { MapPin, CheckCircle2, AlertTriangle, Info, ArrowRight } from 'lucide-react';

interface ReciprocityCheckerSectionProps {
  onOpenApply: (stateId: string) => void;
}

export const ReciprocityCheckerSection: React.FC<ReciprocityCheckerSectionProps> = ({ onOpenApply }) => {
  const [selectedHomeState, setSelectedHomeState] = useState('california');

  const homeState = STATES_DATA.find((s) => s.id === selectedHomeState) || STATES_DATA[0];

  // States with established reciprocal recognition or temporary guest passes
  const reciprocalDestinations = [
    { state: 'Nevada (Las Vegas, Reno)', status: 'Full Reciprocity', note: 'Out-of-state cards recognized directly at all licensed dispensaries' },
    { state: 'Michigan', status: 'Full Reciprocity', note: 'Dispensaries may accept valid cards from any US state' },
    { state: 'Oklahoma', status: '30-Day Temp Permit', note: 'Apply online through OMMA for a 30-day temporary visitor card' },
    { state: 'Maine', status: 'Full Reciprocity', note: 'Accepts visiting patients from matching state qualifying condition lists' },
    { state: 'Hawaii', status: 'Visiting Patient Pass', note: '60-day electronic registration available for out-of-state cardholders' },
    { state: 'Puerto Rico', status: 'Full Reciprocity', note: 'Accepts mainland medical cards for non-flower cannabis medicine' },
    { state: 'Washington D.C.', status: 'Self-Certification & Reciprocity', note: 'Extensive reciprocity for all certified state patients' },
    { state: 'Arkansas', status: '30-Day Visiting Permit', note: 'Pay $50 state fee for 30-day medical purchasing pass' },
    { state: 'Rhode Island', status: 'Full Reciprocity', note: 'Recognizes valid doctor recommendations from any state' },
  ];

  return (
    <section id="reciprocity" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Travel & Patient Mobility
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Medical Marijuana State Reciprocity Checker
          </h2>
          <p className="text-base text-slate-600">
            Traveling across state lines? Check which US states and territories accept your MMJ recommendation.
          </p>
        </div>

        {/* Checker Interactive Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="text-left w-full sm:w-auto">
              <label htmlFor="reciprocity-state" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Your Issuing State
              </label>
              <select
                id="reciprocity-state"
                value={selectedHomeState}
                onChange={(e) => setSelectedHomeState(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-xs min-w-[220px]"
              >
                {STATES_DATA.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-auto text-left sm:text-right bg-white px-4 py-3 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500">Your State Status:</div>
              <div className="text-sm font-bold text-emerald-800">
                {homeState.reciprocityNotes}
              </div>
            </div>
          </div>

          {/* Reciprocal States Grid */}
          <div className="pt-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>States & Territories Where Your {homeState.name} MMJ Card Is Recognized:</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {reciprocalDestinations.map((dest, i) => (
                <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{dest.state}</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {dest.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {dest.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Travel Warning Box */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Federal Transportation Notice:</strong> While states practice reciprocity, federal law prohibits transporting cannabis across state borders, on commercial flights, or on federal lands. Always purchase your medicine at licensed dispensaries within the state you are visiting.
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <span className="text-xs text-slate-600 font-medium">
                Get your legal {homeState.name} card starting at just <strong>${homeState.price}</strong>.
              </span>
              <button
                onClick={() => onOpenApply(homeState.id)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Get Certified in {homeState.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
