import React from 'react';
import { useThemeContent } from '../utils/themeContent';
import { Award, Clock, Users, ShieldCheck } from 'lucide-react';

export const TrustStatsBar: React.FC = () => {
  const themeContent = useThemeContent();
  const stats = themeContent.trustStats;

  return (
    <section id="trust-stats" className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center justify-between text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center px-4 pt-3 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums">
              {stats.stat1Value}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              {stats.stat1Label}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">Or 100% Full Refund</div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center px-4 pt-3 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums">
              {stats.stat2Value}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              {stats.stat2Label}
            </div>
            <div className="text-[11px] text-teal-700 font-medium">Same-Day Digital Delivery</div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center px-4 pt-3 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums">
              {stats.stat3Value}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              {stats.stat3Label}
            </div>
            <div className="text-[11px] text-blue-700 font-medium">Across 20+ US States</div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center px-4 pt-3 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums">
              {stats.stat4Value}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              {stats.stat4Label}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">256-Bit Encrypted Data</div>
          </div>

        </div>
      </div>
    </section>
  );
};
