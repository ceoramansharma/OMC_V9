import React, { useState } from 'react';
import { 
  X, User, Search, ShieldCheck, Download, RefreshCw, FileText, 
  CreditCard, CheckCircle2, AlertCircle, MessageSquare, Phone, Calendar 
} from 'lucide-react';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRenewal: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenRenewal
}) => {
  const [lookupQuery, setLookupQuery] = useState('demo.patient@example.com');
  const [isSearched, setIsSearched] = useState(true);
  const [activeTab, setActiveTab] = useState<'card' | 'support' | 'orders'>('card');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  if (!isOpen) return null;

  const handleDownloadCertificate = () => {
    const textContent = `
=======================================================================
               OFFICIAL MEDICAL MARIJUANA RECOMMENDATION
                     ONLINE MMJ CARD TELEMEDICINE
=======================================================================
PATIENT NAME: ALEXANDRA CHEN
DATE OF BIRTH: 1989-11-22
STATE: CALIFORNIA (CA)
RECOMMENDATION ID: CA-MMJ-84920
ISSUE DATE: 2026-03-15
EXPIRATION DATE: 2027-03-15 (VALID ACTIVE)

QUALIFYING CONDITIONS: Chronic Back Pain, Insomnia, Migraines

PHYSICIAN CERTIFICATION:
I hereby certify that I am a physician licensed in good standing 
to practice medicine. I have evaluated this patient and determined 
that medical cannabis is appropriate and medically necessary for 
the relief of debilitating chronic health symptoms.

CERTIFYING PHYSICIAN: Dr. Marcus Vance, M.D.
STATE MEDICAL LICENSE: CA-C184920
NPI NUMBER: 1841398201
=======================================================================
24/7 PATIENT VERIFICATION: verify.onlinemmjcard.com | (800) 420-6652
=======================================================================
    `;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OnlineMMJCard_Certificate_Alexandra_Chen.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setSupportMessage('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Patient Account Center
              </div>
              <div className="text-sm font-extrabold text-white">
                Online MMJ Card Patient Portal
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar / Lookup */}
        <div className="p-5 bg-slate-50 border-b border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Look Up Recommendation by Email or Recommendation ID:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Enter email or ID (e.g. CA-MMJ-84920)..."
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              onClick={() => setIsSearched(true)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
            >
              Verify Record
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white text-xs font-bold">
          <button
            onClick={() => setActiveTab('card')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'card'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Active Recommendation
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Plastic Card & Documents
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'support'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Message Care Team
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800">
          
          {/* Active Card Tab */}
          {activeTab === 'card' && (
            <div className="space-y-5">
              
              {/* Status Badge */}
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Recommendation Status: ACTIVE & VERIFIED
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800">
                  Valid Through March 15, 2027
                </span>
              </div>

              {/* Digital Certificate Preview */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-emerald-500/30 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">
                      STATE OF CALIFORNIA
                    </div>
                    <div className="text-base font-extrabold tracking-tight">
                      MEDICAL MARIJUANA PATIENT IDENTIFICATION
                    </div>
                  </div>
                  <div className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px] font-mono">
                    CA-MMJ-84920
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Patient Name:</span>
                    <div className="font-bold text-white">ALEXANDRA CHEN</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Date of Birth:</span>
                    <div className="font-mono text-slate-200">11/22/1989</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Certifying Physician:</span>
                    <div className="text-slate-200">Dr. Marcus Vance, M.D.</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Expiration Date:</span>
                    <div className="font-bold text-emerald-400">03/15/2027</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>24/7 ONLINE VERIFIED ID</span>
                  <span className="text-emerald-400">DISPENSARY COMPLIANT</span>
                </div>
              </div>

              {/* Actions Grid */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDownloadCertificate}
                  className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official PDF Letter</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenRenewal();
                  }}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-700" />
                  <span>Request Annual Card Renewal</span>
                </button>
              </div>

            </div>
          )}

          {/* Orders / Plastic Hard Card Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-slate-900">Embossed PVC Plastic ID Card</div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Delivered via USPS
                  </span>
                </div>
                <p className="text-slate-500 mb-3">
                  Tracking # 9400 1118 9956 4821 0019 42 (Delivered to patient address)
                </p>
                <button
                  onClick={() => alert('Replacement card ordered! A new embossed card has been queued for printing.')}
                  className="py-2 px-3 bg-white border border-slate-300 hover:bg-slate-50 font-bold rounded-lg text-slate-700"
                >
                  Order Replacement Plastic Card ($19.99)
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">State Registry Submission Verification</div>
                <p className="text-slate-500 mb-3">
                  Your California CDPH registry documentation is archived and on file.
                </p>
                <button
                  onClick={handleDownloadCertificate}
                  className="py-2 px-3 bg-emerald-50 text-emerald-800 font-bold rounded-lg hover:bg-emerald-100"
                >
                  View State Compliance Form
                </button>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Have questions regarding dispensary acceptance, strain recommendations, or dosing adjustments? Message our clinical support team:
              </div>

              {supportSent ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center">
                  Your message has been sent to Dr. Vance's patient coordinator. We will reply via email within 30 minutes!
                </div>
              ) : (
                <form onSubmit={handleSendSupport} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Message to Care Team</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Type your question here (e.g. advice on CBD/THC ratio for insomnia, updated delivery address)..."
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <div className="text-[11px] text-slate-400">
                      Or call us directly at <a href="tel:8004206652" className="text-emerald-700 font-bold">(800) 420-6652</a>
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">
            Online MMJ Card · HIPAA Protected
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
