import React, { useState } from 'react';
import { Stethoscope, Award, Star, ArrowRight, X, CheckCircle2 } from 'lucide-react';

interface DoctorDirectorySectionProps {
  onOpenApply?: () => void;
}

export const DoctorDirectorySection: React.FC<DoctorDirectorySectionProps> = ({ onOpenApply }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);

  // Doctors exactly matching the screenshot
  const doctorsList = [
    {
      id: 'dr-miller',
      name: 'Dr. Johnathan Miller, MD',
      title: 'Medical Cannabis Evaluating Physician',
      experience: '9 Years',
      bio: 'A licensed general practitioner with a compassionate, patient-focused approach while conducting state-compliant medical marijuana evaluations.',
      initials: 'JM',
      licensedStates: ['California', 'New York', 'Florida', 'Ohio', 'Pennsylvania'],
      npi: '1948201948',
      education: 'MD - University of Washington School of Medicine'
    },
    {
      id: 'dr-kargman',
      name: 'Dr. Kevin Kargman, DO',
      title: 'Medical Cannabis Evaluating Physician',
      experience: '19 Years',
      bio: 'A certified pediatrician with extensive clinical experience, providing thorough, regulation-compliant evaluations.',
      initials: 'KK',
      licensedStates: ['California', 'Oklahoma', 'Missouri', 'Illinois'],
      npi: '1849201842',
      education: 'DO - Philadelphia College of Osteopathic Medicine'
    },
    {
      id: 'dr-thapliyal',
      name: 'Dr. Anshi Thapliyal, MD',
      title: 'Medical Cannabis Evaluating Physician',
      experience: '20 Years',
      bio: 'An internal medicine specialist who conducts thorough medical evaluations based on detailed medical history and qualifying conditions.',
      initials: 'AT',
      licensedStates: ['Texas', 'Florida', 'Georgia', 'Virginia'],
      npi: '1748291039',
      education: 'MD - Johns Hopkins University School of Medicine'
    },
    {
      id: 'dr-durinka',
      name: 'Dr. Joel Durinka, MD',
      title: 'Medical Cannabis Evaluating Physician',
      experience: '11 Years',
      bio: 'A family medicine physician who provides detailed evaluations, focusing on patient medical history and symptoms to determine eligibility in accordance with state law.',
      initials: 'JD',
      licensedStates: ['California', 'New York', 'Connecticut', 'Maryland'],
      npi: '1648291028',
      education: 'MD - Georgetown University School of Medicine'
    }
  ];

  return (
    <section id="medical-team" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Quote from Screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Meet the Expert Medical Team <br className="hidden sm:inline" />
            Behind <span className="text-[#16a34a]">Online MMJ Card</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 italic font-serif">
            "At Online MMJ Card, medical integrity isn't optional, it's our foundation."
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our team of board-certified physicians with years of clinical experience believes in an evidence-based approach to every MMJ consultation, ensuring that each recommendation is patient-focused. Each doctor is licensed in their respective state and trained to evaluate medical cannabis eligibility responsibly, in accordance with state laws.
          </p>
        </div>

        {/* 4 Doctor Cards Grid (Matching Screenshot) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctorsList.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div>
                {/* Doctor Headshot / Illustration in white coat */}
                <div className="aspect-[4/4] rounded-2xl bg-gradient-to-br from-emerald-100/80 via-teal-50 to-slate-100 border border-slate-200 mb-5 flex flex-col items-center justify-end p-2 relative overflow-hidden">
                  <div className="w-24 h-24 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-700 font-extrabold text-xl font-mono">
                    {doc.initials}
                  </div>
                  <div className="w-full bg-white/90 backdrop-blur-xs rounded-xl py-1 px-2 text-center mt-2 shadow-xs border border-slate-100">
                    <span className="text-[10px] font-extrabold text-[#16a34a] uppercase">State Licensed MD</span>
                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="text-base font-extrabold text-slate-900 mb-1 leading-snug">
                  {doc.name}
                </h3>
                <div className="text-[11px] font-bold text-[#16a34a] mb-2 leading-tight">
                  {doc.title}
                </div>

                <div className="text-xs text-slate-500 font-bold mb-3 pb-2 border-b border-slate-200/60">
                  Experience: <span className="text-slate-900">{doc.experience}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {doc.bio}
                </p>
              </div>

              {/* Green VIEW PROFILE Button (Matching Screenshot) */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="w-full py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  VIEW PROFILE
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#16a34a] font-extrabold text-2xl flex items-center justify-center font-mono">
                {selectedDoctor.initials}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedDoctor.name}</h3>
                <div className="text-xs font-bold text-[#16a34a]">{selectedDoctor.title}</div>
                <div className="text-xs text-slate-500 font-medium">Clinical Experience: {selectedDoctor.experience}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700 mb-6">
              <p className="leading-relaxed text-sm text-slate-600">
                {selectedDoctor.bio}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div><strong>Education:</strong> {selectedDoctor.education}</div>
                <div><strong>NPI Number:</strong> <span className="font-mono">{selectedDoctor.npi}</span></div>
                <div><strong>Licensed Telehealth States:</strong> {selectedDoctor.licensedStates.join(', ')}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedDoctor(null);
                  if (onOpenApply) onOpenApply();
                }}
                className="px-6 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md"
              >
                Schedule with this Physician
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
