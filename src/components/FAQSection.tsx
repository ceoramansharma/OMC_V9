import React, { useState } from 'react';
import { useThemeContent } from '../utils/themeContent';
import { ChevronDown, ChevronRight, Phone, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  onOpenApply: () => void;
  onOpenContact?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenApply, onOpenContact }) => {
  const themeContent = useThemeContent();
  const faqContent = themeContent.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  // All 12 questions exactly matching the screenshot
  const screenshotQuestions = [
    {
      q: 'How do I get a medical marijuana card online?',
      a: 'To get a medical marijuana card online, complete a simple secure intake form and consult with a licensed physician via a video or phone appointment. Once approved, you will receive your official recommendation certificate via email, ready for use at state dispensaries.'
    },
    {
      q: 'What conditions qualify for a medical marijuana card?',
      a: 'Common qualifying conditions include chronic pain, severe anxiety, PTSD, migraines, insomnia, cancer symptoms, arthritis, epilepsy, and multiple sclerosis. In discretionary states, doctors may evaluate any debilitating condition causing persistent pain or reducing quality of life.'
    },
    {
      q: 'Can I get an MMJ card on the same day?',
      a: 'Yes! In many states such as California, New York, and Oklahoma, our physicians conduct same-day telehealth evaluations and issue your digital recommendation certificate immediately after your appointment concludes.'
    },
    {
      q: 'Is it legal to get a medical marijuana card online?',
      a: 'Yes, 100% legal. State telehealth statutes explicitly authorize licensed physicians to evaluate patients and issue valid medical cannabis recommendations remotely using HIPAA-compliant video and audio technology.'
    },
    {
      q: 'How much does a medical marijuana card cost?',
      a: 'Our physician evaluation fees start at $39.99 depending on your state. There are never recurring subscription fees, and all consultations are protected by our 100% money-back guarantee if you are not approved.'
    },
    {
      q: 'How long does it take to get a medical marijuana card?',
      a: 'The intake form takes about 3 to 5 minutes, and your consultation with the physician lasts approximately 10 to 15 minutes. Digital certificates are issued within 24 to 48 hours (often same day), and physical cards arrive via mail in 7 to 20 days.'
    },
    {
      q: 'Do I need to see a doctor in person for an MMJ card?',
      a: 'No. In all states we serve, the entire consultation takes place 100% online through your smartphone, tablet, or laptop. No office visits or long waiting rooms are required.'
    },
    {
      q: 'How long is a medical marijuana card valid?',
      a: 'Most state recommendations are valid for 1 full year. Some states (like Oklahoma and Missouri) offer 2-year or 3-year patient licenses, while Florida requires renewals every 210 days (7 months).'
    },
    {
      q: 'Can I use my medical marijuana card in another state?',
      a: 'Yes, many states practice reciprocity! States like Nevada, Michigan, Oklahoma (visitor permit), Maine, Puerto Rico, and Washington D.C. honor out-of-state medical cards. Check our state reciprocity guide for exact travel guidelines.'
    },
    {
      q: 'Is my information secure and confidential?',
      a: 'Absolutely. Your medical data and evaluations are strictly protected under federal HIPAA privacy laws and 256-bit SSL encryption. We never share your records with employers, insurance companies, or law enforcement.'
    },
    {
      q: 'What are the benefits of having a medical marijuana card?',
      a: 'Medical cardholders save up to 35% in state and local sales taxes, enjoy higher possession and purchasing limits, gain access to higher-potency medicine, can legally cultivate more plants at home, and have lower minimum age limits (18+ vs 21+).'
    },
    {
      q: 'What is the process to renew a medical marijuana card?',
      a: 'Renewing is quick and easy. Simply select "MMJ Card Renewal" on our site, complete a brief 5-minute telehealth check-in with our doctor, and receive your updated recommendation letter at discounted renewal rates.'
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title from Screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {faqContent.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {faqContent.subheading}
          </p>
        </div>

        {/* 12 Accordion List (Matching Screenshot styling) */}
        <div className="space-y-3">
          {screenshotQuestions.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                    isOpen ? 'text-[#16a34a] bg-emerald-50/40' : 'text-slate-800 hover:text-[#16a34a]'
                  }`}
                >
                  <span className="leading-snug">{item.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? 'bg-[#16a34a] text-white rotate-90' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Center Green Button from Screenshot: "CONTACT OUR SUPPORT TEAM" */}
        <div className="mt-12 text-center space-y-3">
          <button
            onClick={onOpenApply}
            className="px-8 py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            CONTACT OUR SUPPORT TEAM
          </button>
          <div className="text-xs text-slate-500 font-medium">
            Still have questions? Our team is here to help.
          </div>
        </div>

      </div>
    </section>
  );
};
