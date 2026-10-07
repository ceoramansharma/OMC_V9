import React, { useState } from 'react';
import { 
  Phone, Mail, Clock, MapPin, MessageSquare, 
  Send, CheckCircle2, ShieldCheck, Copy, Check, ArrowLeft,
  Calendar, FileText, Headphones, Sparkles, HelpCircle
} from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenApply?: (stateId?: string, serviceId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onOpenApply
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('CA');
  const [subject, setSubject] = useState('New Patient Question');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('888-420-6789').catch(() => {});
      }
    } catch (err) {
      // safe fallback
    }
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('support@onlinemmjcard.com').catch(() => {});
      }
    } catch (err) {
      // safe fallback
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Breadcrumb & Navigation Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#16a34a] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
              <span>HIPAA Compliant Patient Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            <Headphones className="w-3.5 h-3.5 text-emerald-300" />
            <span>Dedicated Telehealth Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Contact Patient Support
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Have questions about qualifying conditions, state registration, or scheduling your 420 doctor evaluation? Our friendly clinic staff is available 7 days a week.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        
        {/* Quick Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Phone */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16a34a] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">Phone Consultations</h3>
              <p className="text-xs text-slate-500 mb-3">Speak directly with an intake coordinator</p>
              <div className="text-xl font-black text-slate-900">(888) 420-6789</div>
              <div className="text-[11px] text-emerald-700 font-bold mt-1">Toll-Free · Nationwide</div>
            </div>
            <div className="pt-5 flex gap-2">
              <a
                href="tel:8884206789"
                className="flex-1 py-2.5 rounded-xl bg-[#16a34a] hover:bg-emerald-700 text-white text-xs font-bold text-center transition-colors"
              >
                Call Now
              </a>
              <button
                onClick={handleCopyPhone}
                className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-[#16a34a]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">Email Support</h3>
              <p className="text-xs text-slate-500 mb-3">For verification & document inquiries</p>
              <div className="text-base font-black text-slate-900 truncate">support@onlinemmjcard.com</div>
              <div className="text-[11px] text-teal-700 font-bold mt-1">Average Response: &lt; 30 Mins</div>
            </div>
            <div className="pt-5 flex gap-2">
              <a
                href="mailto:support@onlinemmjcard.com"
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center transition-colors"
              >
                Send Email
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-[#16a34a]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Card 3: Clinic Hours */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">Clinic Hours</h3>
              <p className="text-xs text-slate-500 mb-3">Physicians online 7 days a week</p>
              <div className="text-sm font-bold text-slate-900">Monday – Sunday</div>
              <div className="text-xs text-slate-600 mt-1">8:00 AM – 10:00 PM EST</div>
              <div className="text-[11px] text-amber-700 font-bold mt-2">Same-day video appointments open</div>
            </div>
            <div className="pt-5">
              <button
                onClick={() => onOpenApply ? onOpenApply() : onNavigateHome()}
                className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-center transition-colors cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Contact Form & Clinic Location Details */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Message Intake Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-600 mb-6">
              Complete this brief form and a certified patient care specialist will reach out shortly.
            </p>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#16a34a] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Successfully Sent!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{name || 'Patient'}</strong>. An intake coordinator has received your inquiry and will follow up at <strong>{email || phone}</strong> within 15–30 minutes during clinic hours.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={onNavigateHome}
                    className="px-5 py-2.5 rounded-xl bg-[#16a34a] hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="michael@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      State of Residence
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    >
                      <option value="CA">California (CA)</option>
                      <option value="NY">New York (NY)</option>
                      <option value="FL">Florida (FL)</option>
                      <option value="PA">Pennsylvania (PA)</option>
                      <option value="OH">Ohio (OH)</option>
                      <option value="TX">Texas (TX)</option>
                      <option value="OTHER">Other State</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                  >
                    <option value="New Patient Question">New Patient Medical Card Question</option>
                    <option value="Card Renewal">MMJ Card Renewal Assistance</option>
                    <option value="Qualifying Conditions">Qualifying Medical Conditions Check</option>
                    <option value="Cultivation License">99-Plant Cultivation Recommendation</option>
                    <option value="Dispensary Verification">Dispensary Certificate Verification</option>
                    <option value="Billing & Refund">Billing or Refund Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can help you with your medical cannabis evaluation..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry to Medical Team</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    🔒 All inquiries are encrypted & strictly HIPAA compliant. We never share your health details.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right: Telehealth Clinic Details & FAQ Quick Access (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Clinic Headquarters Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#16a34a]" />
                <span>Telehealth Headquarters</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-800">Online MMJ Card Health Services Inc.</p>
                <p>700 S Flower St, Suite 1000</p>
                <p>Los Angeles, CA 90017</p>
                <div className="pt-2 text-slate-500 border-t border-slate-100">
                  <span className="font-semibold text-slate-700">Service Coverage:</span> Providing 100% legal telemedicine medical cannabis doctor evaluations across California and nationwide.
                </div>
              </div>
            </div>

            {/* Common Patient Inquiries Accordion Box */}
            <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200/80">
              <h3 className="font-extrabold text-emerald-950 text-base mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-700" />
                <span>Quick Answers</span>
              </h3>
              <div className="space-y-3 text-xs text-emerald-900">
                <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                  <div className="font-bold text-slate-900 mb-1">How fast do I get my card?</div>
                  <p className="text-slate-600">
                    Your official signed digital recommendation is emailed immediately after your 15-minute telehealth video appointment.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                  <div className="font-bold text-slate-900 mb-1">What if I'm not approved?</div>
                  <p className="text-slate-600">
                    We maintain a strict 100% money-back guarantee. If our physician cannot recommend medical cannabis for your condition, you pay $0.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                  <div className="font-bold text-slate-900 mb-1">Are video evaluations legal?</div>
                  <p className="text-slate-600">
                    Yes. Under state telehealth statutes, licensed physicians can conduct remote video exams and issue legal medical cannabis recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Chat Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Live Intake Chat</span>
              </div>
              <h4 className="font-bold text-base mb-1">Need an Immediate Answer?</h4>
              <p className="text-xs text-slate-300 mb-4">
                Chat with an active clinic representative in real-time right in your browser.
              </p>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-live-chat'));
                }}
                className="w-full py-2.5 rounded-xl bg-[#16a34a] hover:bg-emerald-600 text-white text-xs font-bold text-center transition-colors cursor-pointer"
              >
                Launch Live Chat
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
