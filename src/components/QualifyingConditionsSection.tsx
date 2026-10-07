import React, { useState } from 'react';
import { useThemeContent } from '../utils/themeContent';
import { 
  HeartPulse, Brain, Moon, Sparkles, AlertCircle, PlusCircle, 
  ArrowRight, CheckCircle2, X 
} from 'lucide-react';

interface QualifyingConditionsSectionProps {
  onOpenApply: () => void;
  onNavigateCondition?: (conditionId: string) => void;
}

export const QualifyingConditionsSection: React.FC<QualifyingConditionsSectionProps> = ({ 
  onOpenApply,
  onNavigateCondition
}) => {
  const themeContent = useThemeContent();
  const condContent = themeContent.conditions;
  const [activeCheckModal, setActiveCheckModal] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const screenshotCards = [
    {
      title: 'Chronic Pain',
      desc: 'Experience relief from persistent or treatment-resistant pain.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2 text-[#16a34a]">
          <path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
          <path d="M16 12v1a4 4 0 0 1-8 0v-1" />
          <path d="M12 16v6" />
          <path d="M9 22h6" />
        </svg>
      )
    },
    {
      title: 'Migraines',
      desc: 'Reduce the frequency & intensity of chronic migraine attacks.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2 text-[#16a34a]">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
          <path d="M8 3v2" />
          <path d="M16 3v2" />
        </svg>
      )
    },
    {
      title: 'PTSD',
      desc: 'Support your trauma recovery and improve emotional resilience.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2 text-[#16a34a]">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    },
    {
      title: 'Insomnia',
      desc: 'Improve sleep quality and reset natural rest patterns naturally.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2 text-[#16a34a]">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <path d="M19 3v4" />
          <path d="M21 5h-4" />
        </svg>
      )
    },
    {
      title: 'Anxiety',
      desc: 'Find natural & plant-based support for anxiety, stress, and tension.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2 text-[#16a34a]">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12c1.5 2 6.5 2 8 0" />
          <circle cx="9" cy="9" r="1" fill="currentColor" />
          <circle cx="15" cy="9" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Other Conditions',
      desc: 'Medical cannabis may also help with conditions such as cancer, seizures, epilepsy, multiple sclerosis, and more.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2 text-[#16a34a]">
          <path d="M12 2v20" />
          <path d="M2 12h20" />
          <rect x="3" y="3" width="18" height="18" rx="4" />
        </svg>
      )
    }
  ];

  const toggleCheck = (c: string) => {
    if (selectedConditions.includes(c)) {
      setSelectedConditions(selectedConditions.filter((x) => x !== c));
    } else {
      setSelectedConditions([...selectedConditions, c]);
    }
  };

  return (
    <section id="conditions" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title from Screenshot (Connected to WordPress Editable Theme Content) */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>{condContent.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {condContent.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {condContent.subheading}
          </p>
        </div>

        {/* 6 Condition Cards Grid (Matching Screenshot) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshotCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-slate-50/60 rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Circular Icon (From Screenshot) */}
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>

                <h3 
                  onClick={() => {
                    const condIdMap: Record<string, string> = {
                      'Chronic Pain': 'chronic-pain',
                      'Migraines': 'migraines',
                      'PTSD': 'anxiety-ptsd',
                      'Sleep Disorders': 'insomnia',
                      'Cancer': 'cancer-chemo',
                      'Severe Nausea': 'doctor-discretion'
                    };
                    const cid = condIdMap[card.title] || 'chronic-pain';
                    if (onNavigateCondition) onNavigateCondition(cid);
                  }}
                  className="text-xl font-bold text-slate-900 mb-2 cursor-pointer hover:text-[#16a34a] transition-colors"
                >
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-[#16a34a]">
                <button
                  onClick={onOpenApply}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Evaluate for {card.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {onNavigateCondition && (
                  <button
                    onClick={() => {
                      const condIdMap: Record<string, string> = {
                        'Chronic Pain': 'chronic-pain',
                        'Migraines': 'migraines',
                        'PTSD': 'anxiety-ptsd',
                        'Sleep Disorders': 'insomnia',
                        'Cancer': 'cancer-chemo',
                        'Severe Nausea': 'doctor-discretion'
                      };
                      const cid = condIdMap[card.title] || 'chronic-pain';
                      onNavigateCondition(cid);
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-800"
                  >
                    Clinical Guide
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note from Screenshot */}
        <div className="mt-8 text-center text-xs text-slate-500 italic max-w-2xl mx-auto">
          <strong>Note:</strong> The conditions listed are widely accepted for medical cannabis use, but specific eligibility requirements differ from state to state. Consult with our certified MMJ doctor for a detailed evaluation and applicable state regulations.
        </div>

        {/* Center Green Button from Screenshot: "CHECK MY MMJ CARD ELIGIBILITY" */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setActiveCheckModal(true)}
            className="px-8 py-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>CHECK MY MMJ CARD ELIGIBILITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Quick Interactive Eligibility Assessment Drawer/Modal */}
      {activeCheckModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveCheckModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Check Your MMJ Card Eligibility
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Select any conditions or symptoms you currently experience:
            </p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                'Chronic Pain', 'Migraines', 'PTSD', 'Insomnia / Sleep Issues',
                'Anxiety / Severe Stress', 'Arthritis', 'Muscle Spasms',
                'Cancer Symptoms', 'Neuropathy', 'Crohn’s / IBS',
                'Depression', 'Other Debilitating Symptom'
              ].map((c) => {
                const isSelected = selectedConditions.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCheck(c)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-1">{c}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 mb-6">
              {selectedConditions.length > 0 ? (
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <span>You selected {selectedConditions.length} symptom(s). You are eligible to be certified by our state doctor!</span>
                </div>
              ) : (
                <span>Select at least 1 symptom above to check eligibility.</span>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveCheckModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCheckModal(false);
                  onOpenApply();
                }}
                disabled={selectedConditions.length === 0}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white transition-all ${
                  selectedConditions.length > 0
                    ? 'bg-[#16a34a] hover:bg-[#15803d] shadow-md cursor-pointer'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Book Consultation Now
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
