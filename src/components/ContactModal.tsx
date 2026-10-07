import React, { useState } from 'react';
import { 
  X, Phone, Mail, Clock, MapPin, MessageSquare, 
  Send, CheckCircle2, ShieldCheck, Copy, Check 
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveChat?: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenLiveChat
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('888-420-6789');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('support@onlinemmjcard.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-[#16a34a] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Patient Care Desk</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight">Contact Patient Support</h3>
          <p className="text-emerald-100 text-xs mt-1">
            Our clinical intake team is here to assist with appointments, state laws, and renewals.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-[#16a34a] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Message Received!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you for contacting Online MMJ Card. An intake specialist will review your inquiry and follow up within 15–30 minutes during normal clinic hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#16a34a] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              {/* Direct Channels Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Phone Contact */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      <span className="flex items-center gap-1.5 text-emerald-700">
                        <Phone className="w-4 h-4" /> Phone Support
                      </span>
                    </div>
                    <div className="text-slate-900 font-extrabold text-base">(888) 420-6789</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Toll-Free Patient Line</div>
                  </div>
                  <div className="pt-3 flex gap-2">
                    <button
                      onClick={handleCopyPhone}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-[#16a34a]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <a
                      href="tel:8884206789"
                      className="px-2.5 py-1.5 rounded-lg bg-[#16a34a] hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1"
                    >
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      <span className="flex items-center gap-1.5 text-teal-700">
                        <Mail className="w-4 h-4" /> Email Support
                      </span>
                    </div>
                    <div className="text-slate-900 font-bold text-xs truncate">support@onlinemmjcard.com</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">HIPAA Response Desk</div>
                  </div>
                  <div className="pt-3">
                    <button
                      onClick={handleCopyEmail}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-[#16a34a]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Chat Banner */}
              {onOpenLiveChat && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#16a34a] text-white flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-950">Prefer Instant Chat?</div>
                      <div className="text-[11px] text-emerald-800">Connect with an intake coordinator right now.</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenLiveChat();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#16a34a] hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap cursor-pointer transition-colors shadow-xs"
                  >
                    Open Live Chat
                  </button>
                </div>
              )}

              {/* Hours & Address */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Support Hours: </span>
                    Monday – Sunday: 8:00 AM – 10:00 PM EST (7 Days/Week)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Clinic Address: </span>
                    700 S Flower St, Suite 1000, Los Angeles, CA 90017
                  </div>
                </div>
              </div>

              {/* Quick Message Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-1 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Send a Quick Message
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="How can we assist you with your MMJ evaluation?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
