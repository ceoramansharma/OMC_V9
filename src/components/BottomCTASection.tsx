import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, ArrowRight, ShieldCheck, Check, Clock } from 'lucide-react';

interface BottomCTASectionProps {
  onOpenApply: () => void;
  onOpenPortal: () => void;
}

export const BottomCTASection: React.FC<BottomCTASectionProps> = ({ onOpenApply, onOpenPortal }) => {
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Hello! How can our patient support team help you with your MMJ card evaluation today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'support', text: 'Thank you for reaching out! A patient coordinator is reviewing your question. In the meantime, you can begin your 100% money-back guaranteed evaluation anytime!' }
      ]);
    }, 1000);
  };

  return (
    <section className="bg-[#15803d] text-white pt-16 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Center Block (Matching Screenshot) */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-tight">
            Access Your Medical Marijuana <br className="hidden sm:inline" />
            Card Today
          </h2>

          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-xl mx-auto">
            Your trusted partner for medical cannabis care. We've helped thousands of patients nationwide with safe and stress-free MMJ card approvals.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenApply}
              className="px-8 py-4 bg-white text-[#15803d] hover:bg-emerald-50 text-xs font-black uppercase tracking-wider rounded-full shadow-xl hover:shadow-2xl transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>GET YOUR MMJ CARD TODAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 text-[11px] sm:text-xs text-emerald-100 font-medium">
            Complete the process in 15-30 minutes · 100% online · No office visits required
          </div>
        </div>

        {/* 3 Contact Cards Grid (Matching Screenshot: Call Now, Email, Live Chat) */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          {/* Card 1: Call Now */}
          <div className="bg-white rounded-3xl p-6 text-center text-slate-800 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Call Now</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Talk to our friendly patient care team instantly.
              </p>
            </div>
            <a
              href="tel:8884206789"
              className="w-full py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-extrabold uppercase tracking-wider rounded-full shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>CALL NOW</span>
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white rounded-3xl p-6 text-center text-slate-800 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Get answers to your medical cannabis questions.
              </p>
            </div>
            <a
              href="mailto:support@onlinemmjcard.com"
              className="w-full py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-extrabold uppercase tracking-wider rounded-full shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>EMAIL US</span>
            </a>
          </div>

          {/* Card 3: Live Chat */}
          <div className="bg-white rounded-3xl p-6 text-center text-slate-800 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Live Chat</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Connect 24/7 with our support anytime.
              </p>
            </div>
            <button
              onClick={() => setShowChatModal(true)}
              className="w-full py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-extrabold uppercase tracking-wider rounded-full shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>CHAT WITH US</span>
            </button>
          </div>

        </div>

      </div>

      {/* Live Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="bg-[#16a34a] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold">Online MMJ Card Support</div>
                  <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
                    Online 24/7
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="text-white hover:text-emerald-100 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-[#16a34a] text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your state qualification..."
                className="flex-1 text-xs border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#16a34a] text-white text-xs font-bold rounded-xl"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
