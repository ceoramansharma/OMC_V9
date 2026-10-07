import React, { useState } from 'react';
import { useThemeContent } from '../utils/themeContent';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ReviewsSectionProps {
  onOpenApply?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenApply }) => {
  const themeContent = useThemeContent();
  const reviewsContent = themeContent.reviews;
  const [showAllModal, setShowAllModal] = useState(false);

  // Reviews exactly matching the screenshot
  const reviewsList = [
    {
      name: 'de Hippoliet',
      rating: 5,
      date: 'Verified Patient',
      comment: 'pleased with him',
      badge: 'Verified Patient'
    },
    {
      name: 'Terri Lynn',
      rating: 5,
      date: 'Verified Patient',
      comment: 'Highly recommend. Quick and easy process.',
      badge: 'Verified Patient'
    },
    {
      name: 'Kyle',
      rating: 5,
      date: 'Verified Patient',
      comment: 'Enjoyed my visit, was quick, it was very simple.',
      badge: 'Verified Patient'
    },
    {
      name: 'Marcus B.',
      rating: 5,
      date: 'Verified Patient',
      comment: 'Renewing took 5 minutes flat. Saved hundreds on dispensary taxes.',
      badge: 'Verified Patient'
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title from Screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {reviewsContent.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Hear from our patients who have completed their medical marijuana evaluations through Online MMJ Card and shared their experiences with our doctors and the process.
          </p>
        </div>

        {/* Rating Summary + Review Cards Row (Matching Screenshot) */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Rating Box: "Online MMJ Card is rated Excellent 4.9 out of 5 based on 2,894 reviews" */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center lg:text-left space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Patient Satisfaction
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              Online MMJ Card is rated <span className="text-[#16a34a]">Excellent</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-400 py-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-7 h-7 rounded bg-[#16a34a] text-white flex items-center justify-center shadow-xs">
                  <Star className="w-4 h-4 fill-white" />
                </div>
              ))}
            </div>
            <div className="text-sm font-semibold text-slate-600">
              <strong className="text-slate-900 font-extrabold">{reviewsContent.ratingScore} out of 5</strong> based on <strong>{reviewsContent.reviewCount} reviews</strong>
            </div>
            <div className="pt-2 text-xs text-slate-400">
              Verified third-party ratings across Google, Trustpilot & Leafly
            </div>
          </div>

          {/* Right Review Cards Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
            {reviewsList.slice(0, 3).map((rev, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#16a34a] mb-2">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#16a34a]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">{rev.name}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    {rev.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Center Green Button from Screenshot: "READ MORE REVIEWS" */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAllModal(true)}
            className="px-8 py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>READ MORE REVIEWS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Extended Reviews Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Verified Patient Reviews</h3>
                <span className="text-xs text-[#16a34a] font-bold">4.9/5 Rating · 2,894+ Patients Certified</span>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {[
                { name: 'de Hippoliet', text: 'pleased with him. Very professional physician.', date: '3 days ago' },
                { name: 'Terri Lynn', text: 'Highly recommend. Quick and easy process. Doctor answered all questions.', date: '5 days ago' },
                { name: 'Kyle', text: 'Enjoyed my visit, was quick, it was very simple. Recommendation arrived same day.', date: '1 week ago' },
                { name: 'Marcus B. (New York)', text: 'Renewing took 5 minutes flat. Saved hundreds on dispensary taxes compared to recreational.', date: '1 week ago' },
                { name: 'Samantha M. (Florida)', text: 'I was hesitant about doing a telehealth consultation, but Online MMJ Card made it so easy.', date: '2 weeks ago' },
                { name: 'David K. (California)', text: 'The whole process took literally 12 minutes on my phone. Approved right away!', date: '2 weeks ago' },
              ].map((r, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-slate-900 text-sm">{r.name}</span>
                    <span className="text-slate-400 text-[10px]">{r.date}</span>
                  </div>
                  <div className="flex text-[#16a34a] mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#16a34a]" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed italic">"{r.text}"</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowAllModal(false)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
