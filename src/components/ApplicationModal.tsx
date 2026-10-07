import React, { useState, useEffect } from 'react';
import { STATES_DATA, SERVICES_DATA } from '../data/mmjData';
import { 
  X, CheckCircle2, ShieldCheck, Lock, Upload, ArrowRight, ArrowLeft, 
  Calendar, Clock, User, FileText, CreditCard, Sparkles, Download, 
  Video, Check, AlertCircle, Phone, Stethoscope, Camera
} from 'lucide-react';

import { getInitialStateSync } from '../utils/geoDetection';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStateId?: string;
  initialServiceId?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  initialStateId,
  initialServiceId = 'new-patient',
}) => {
  // Navigation Steps: 1: State/Package, 2: Patient Info, 3: Health History, 4: Scheduling, 5: Payment, 6: Success
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [stateId, setStateId] = useState<string>(() => initialStateId || getInitialStateSync().id);

  useEffect(() => {
    if (initialStateId) {
      setStateId(initialStateId);
    }
  }, [initialStateId]);
  const [packageType, setPackageType] = useState<'digital' | 'bundle' | 'cultivation'>('digital');
  const [consultType, setConsultType] = useState<'new' | 'renewal'>(
    initialServiceId === 'renewal' ? 'renewal' : 'new'
  );

  // Patient Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [idFileName, setIdFileName] = useState<string | null>(null);

  // Health Questionnaire
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['Chronic Pain']);
  const [symptomDuration, setSymptomDuration] = useState('1-3 years');
  const [painLevel, setPainLevel] = useState<number>(7);
  const [priorTreatments, setPriorTreatments] = useState('Physical therapy, OTC pain relievers');
  const [cannabisExperience, setCannabisExperience] = useState('Occasional therapeutic use');
  const [patientNotes, setPatientNotes] = useState('');

  // Scheduling
  const [schedulingType, setSchedulingType] = useState<'immediate' | 'scheduled'>('immediate');
  const [selectedDate, setSelectedDate] = useState('Today, Oct 4');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:30 AM EST');

  // Payment & Checkout
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('321');
  const [hipaaConsent, setHipaaConsent] = useState(true);
  const [signature, setSignature] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Generated Result
  const [generatedRecId, setGeneratedRecId] = useState('');

  if (!isOpen) return null;

  const currentState = STATES_DATA.find((s) => s.id === stateId) || STATES_DATA[0];

  // Price Calculation
  const calculateBasePrice = () => {
    if (packageType === 'cultivation') return 149.0;
    if (consultType === 'renewal') {
      return packageType === 'bundle' ? currentState.renewalPrice + 20 : currentState.renewalPrice;
    }
    return packageType === 'bundle' ? currentState.price + 20 : currentState.price;
  };

  const basePrice = calculateBasePrice();
  const finalPrice = Math.max(0, basePrice - promoDiscount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'MMJ10' || promoCode.trim().toUpperCase() === 'SAVE10') {
      setPromoDiscount(10.0);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'HEALTH20') {
      setPromoDiscount(basePrice * 0.2);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try MMJ10 for $10 off!');
    }
  };

  const handleToggleCondition = (cond: string) => {
    if (selectedConditions.includes(cond)) {
      if (selectedConditions.length > 1) {
        setSelectedConditions(selectedConditions.filter((c) => c !== cond));
      }
    } else {
      setSelectedConditions([...selectedConditions, cond]);
    }
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFileName(e.target.files[0].name);
    } else {
      setIdFileName('state_driver_license.jpg');
    }
  };

  const handleCompleteOrder = () => {
    if (!hipaaConsent) {
      alert('Please agree to the HIPAA medical authorization.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomCode = `${currentState.code}-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedRecId(randomCode);
      setCurrentStep(6); // Success screen
    }, 1200);
  };

  const handleDownloadPDF = () => {
    const textContent = `
=======================================================================
               OFFICIAL MEDICAL MARIJUANA RECOMMENDATION
                     ONLINE MMJ CARD TELEMEDICINE
=======================================================================
PATIENT NAME: ${firstName.toUpperCase() || 'JOHN'} ${lastName.toUpperCase() || 'DOE'}
DATE OF BIRTH: ${dob || '1988-06-14'}
STATE: ${currentState.name.toUpperCase()} (${currentState.code})
CERTIFICATION ID: ${generatedRecId || `${currentState.code}-984120`}
ISSUE DATE: ${new Date().toLocaleDateString()}
EXPIRATION DATE: Valid for ${currentState.validity}

QUALIFYING CONDITIONS: ${selectedConditions.join(', ')}

PHYSICIAN STATEMENT:
I have evaluated the above patient via compliant medical telemedicine. 
Based upon an in-depth clinical review of their medical history, 
I certify that the patient suffers from debilitating health symptoms 
for which the potential health benefits of the medical use of cannabis 
would likely outweigh the health-related risks.

CERTIFYING PHYSICIAN: Dr. Marcus Vance, M.D.
LICENSE: ${currentState.code}-MED-89104
NPI NUMBER: 1841398201
=======================================================================
24/7 VERIFICATION HOTLINE: (800) 420-6652 | verify.onlinemmjcard.com
=======================================================================
    `;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MMJ_Recommendation_${currentState.code}_${firstName || 'Patient'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Online MMJ Telehealth Portal
              </div>
              <div className="text-sm font-extrabold text-white">
                Medical Cannabis Patient Certification
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit HIPAA Secure</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator Progress Bar (Steps 1 to 5) */}
        {currentStep < 6 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
              <span className="text-emerald-700">
                Step {currentStep} of 5: {
                  currentStep === 1 ? 'State & Service' :
                  currentStep === 2 ? 'Patient Demographics' :
                  currentStep === 3 ? 'Medical Questionnaire' :
                  currentStep === 4 ? 'Physician Scheduling' :
                  'Secure Checkout'
                }
              </span>
              <span className="text-slate-400">
                {currentStep === 1 && '20% Completed'}
                {currentStep === 2 && '40% Completed'}
                {currentStep === 3 && '60% Completed'}
                {currentStep === 4 && '80% Completed'}
                {currentStep === 5 && '95% Final Step'}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* STEP 1: State & Package */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Select Your State & Evaluation Package
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose the state where you legally reside and the certificate package you need.
                </p>
              </div>

              {/* State & Consultation Type */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your State
                  </label>
                  <select
                    value={stateId}
                    onChange={(e) => setStateId(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {STATES_DATA.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.code}) - ${st.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Consultation Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setConsultType('new')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        consultType === 'new'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      New Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultType('renewal')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        consultType === 'renewal'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Renewal (Save ${currentState.price - currentState.renewalPrice > 0 ? (currentState.price - currentState.renewalPrice).toFixed(0) : '20'})
                    </button>
                  </div>
                </div>
              </div>

              {/* Package Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Choose Your Delivery Package
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  
                  {/* Digital */}
                  <div
                    onClick={() => setPackageType('digital')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      packageType === 'digital'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">Digital PDF Only</span>
                      <span className="text-emerald-700 font-extrabold text-sm">
                        ${consultType === 'renewal' ? currentState.renewalPrice : currentState.price}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">
                      Official recommendation emailed immediately. Accepted at all licensed dispensaries.
                    </p>
                    <div className="text-[11px] text-emerald-700 font-semibold">Same-Day Delivery</div>
                  </div>

                  {/* Bundle */}
                  <div
                    onClick={() => setPackageType('bundle')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                      packageType === 'bundle'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 bg-emerald-700 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                      Recommended
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">Digital + Plastic Card</span>
                      <span className="text-emerald-700 font-extrabold text-sm">
                        ${(consultType === 'renewal' ? currentState.renewalPrice : currentState.price) + 20}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">
                      Instant digital certificate + embossed PVC plastic hard copy mailed discreetly.
                    </p>
                    <div className="text-[11px] text-emerald-700 font-semibold">USPS Priority Shipped</div>
                  </div>

                  {/* Cultivation */}
                  <div
                    onClick={() => setPackageType('cultivation')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      packageType === 'cultivation'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">99-Plant Grower Rec</span>
                      <span className="text-emerald-700 font-extrabold text-sm">$149</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">
                      Extended medical necessity authorization to grow up to 99 plants legally.
                    </p>
                    <div className="text-[11px] text-emerald-700 font-semibold">Grower Protection</div>
                  </div>

                </div>
              </div>

              {/* State Guarantee Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800">{currentState.name} Evaluation Summary</div>
                  <div className="text-slate-500">Validity: {currentState.validity} · Possess: {currentState.possessionLimit}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Total Due:</span>
                  <div className="text-xl font-extrabold text-emerald-700 tabular-nums">
                    ${basePrice.toFixed(2)}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Patient Demographics */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Patient Demographics & Photo ID
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Information must match your government-issued ID for official state certification.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Legal First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Legal Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Birth (Must be 18+) *</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number (For Doctor Call) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Email Address (For Instant Recommendation Delivery) *</label>
                  <input
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Medical Center Dr, Apt 4B"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Los Angeles"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    placeholder="90001"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Photo ID Upload Area */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Upload Government Photo ID (Driver's License, State ID, or Passport)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-5 text-center transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    id="id-upload"
                    accept="image/*,.pdf"
                    onChange={handleSimulateUpload}
                    className="hidden"
                  />
                  <label htmlFor="id-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {idFileName ? `Uploaded: ${idFileName}` : 'Click to take photo or upload file'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      JPG, PNG, or PDF up to 10MB (Protected under HIPAA)
                    </span>
                  </label>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Medical Questionnaire */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Medical Health Questionnaire
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our licensed physician will review these answers during your 1-on-1 evaluation.
                </p>
              </div>

              {/* Qualifying Conditions Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Qualifying Medical Conditions / Symptoms (Select all that apply) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    'Chronic Pain',
                    'Severe Anxiety',
                    'Insomnia / Sleep Issues',
                    'Migraines & Headaches',
                    'Back / Neck Discomfort',
                    'Arthritis & Joint Stiffness',
                    'PTSD / Trauma',
                    'Muscle Spasms / Sciatica',
                    'Neuropathy & Nerve Pain',
                    'Depression',
                    'Cancer Symptoms',
                    'Crohn\'s / IBS / Gut Pain',
                    'Fibromyalgia',
                    'Epilepsy / Seizures',
                    'Other Chronic Discomfort'
                  ].map((cond) => {
                    const checked = selectedConditions.includes(cond);
                    return (
                      <button
                        type="button"
                        key={cond}
                        onClick={() => handleToggleCondition(cond)}
                        className={`p-2.5 rounded-xl border text-left font-semibold transition-all flex items-center justify-between ${
                          checked
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate pr-1">{cond}</span>
                        {checked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pain Severity Scale */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Current Pain / Symptom Severity (1 = Mild, 10 = Severe)</span>
                  <span className="text-emerald-700 text-sm font-extrabold">{painLevel} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                  <span>1 - Mild Discomfort</span>
                  <span>5 - Moderate</span>
                  <span>10 - Debilitating Pain</span>
                </div>
              </div>

              {/* Symptom Duration & Prior Therapies */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    How long have you experienced these symptoms?
                  </label>
                  <select
                    value={symptomDuration}
                    onChange={(e) => setSymptomDuration(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Less than 6 months">Less than 6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3+ years">3+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Previous Medical Cannabis Experience
                  </label>
                  <select
                    value={cannabisExperience}
                    onChange={(e) => setCannabisExperience(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="First-time medical patient">First-time medical patient (Need dosing advice)</option>
                    <option value="Occasional therapeutic use">Occasional therapeutic use</option>
                    <option value="Experienced daily patient">Experienced daily patient</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Additional Notes or Medical History for Certifying Doctor (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Trying to reduce dependence on prescription painkillers, trouble sleeping through the night..."
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Doctor Scheduling */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Select Your Consultation Time
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Meet your state-licensed physician via private video or phone call.
                </p>
              </div>

              {/* Immediate vs Scheduled Toggles */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                <div
                  onClick={() => setSchedulingType('immediate')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    schedulingType === 'immediate'
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-slate-900 text-sm">Next Available Doctor Now</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    Enter the virtual waiting room immediately after payment. Average wait is currently <strong>3 to 5 minutes</strong>.
                  </p>
                  <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Fastest Same-Day Option</span>
                  </div>
                </div>

                <div
                  onClick={() => setSchedulingType('scheduled')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    schedulingType === 'scheduled'
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-slate-900 text-sm">Schedule for Later</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    Choose a preferred date and time that fits your calendar.
                  </p>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Available 7 days a week (8am - 10pm EST)
                  </div>
                </div>

              </div>

              {schedulingType === 'scheduled' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Date</label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white"
                      >
                        <option value="Today, Oct 4">Today, Oct 4</option>
                        <option value="Tomorrow, Oct 5">Tomorrow, Oct 5</option>
                        <option value="Monday, Oct 6">Monday, Oct 6</option>
                        <option value="Tuesday, Oct 7">Tuesday, Oct 7</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Time Slot (EST)</label>
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white"
                      >
                        <option value="11:30 AM EST">11:30 AM EST</option>
                        <option value="1:00 PM EST">1:00 PM EST</option>
                        <option value="3:15 PM EST">3:15 PM EST</option>
                        <option value="5:30 PM EST">5:30 PM EST</option>
                        <option value="7:00 PM EST">7:00 PM EST</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor Assurance */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 text-xs text-emerald-900">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <strong>No-Pressure Consultation:</strong> Our physicians are warm, understanding, and focused on helping you find non-opioid natural relief safely.
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: Secure Checkout */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Review & Secure Checkout
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  You are only charged if approved by our certified physician. 100% money back guarantee.
                </p>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{currentState.name} {consultType === 'renewal' ? 'MMJ Renewal' : 'New Patient MMJ Card'}:</span>
                  <span className="font-bold text-slate-900">${(consultType === 'renewal' ? currentState.renewalPrice : currentState.price).toFixed(2)}</span>
                </div>
                {packageType === 'bundle' && (
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>Embossed PVC Plastic ID Card (Priority USPS):</span>
                    <span className="font-bold text-slate-900">$20.00</span>
                  </div>
                )}
                {packageType === 'cultivation' && (
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>99-Plant Cultivation Exemption:</span>
                    <span className="font-bold text-slate-900">$149.00</span>
                  </div>
                )}

                {promoApplied && (
                  <div className="flex justify-between font-semibold text-emerald-700">
                    <span>Promo Code Applied ({promoCode}):</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Amount Due:</span>
                  <span className="text-emerald-700 text-base tabular-nums">${finalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try MMJ10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Apply Code
                </button>
              </div>

              {/* Mock Credit Card Form */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>Card Information</span>
                  </span>
                  <span className="text-slate-400 font-normal">Encrypted 256-Bit SSL</span>
                </div>

                <div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono"
                    placeholder="Card Number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                    placeholder="CVC"
                  />
                </div>
              </div>

              {/* HIPAA & Telehealth Consent */}
              <div className="space-y-3 pt-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hipaaConsent}
                    onChange={(e) => setHipaaConsent(e.target.checked)}
                    className="accent-emerald-600 mt-0.5 rounded cursor-pointer"
                  />
                  <span className="text-slate-600 leading-snug">
                    I acknowledge that I am at least 18 years of age and consent to a telemedicine evaluation. 
                    I understand that my records are strictly confidential under federal HIPAA statutes and will never be shared without my written authorization.
                  </span>
                </label>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Patient Electronic Signature (Type Full Legal Name)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Johnathan Doe"
                    value={signature || `${firstName} ${lastName}`.trim()}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-serif italic"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 6: Confirmation / Live Telehealth & Rec Viewer */}
          {currentStep === 6 && (
            <div className="space-y-6 text-center sm:text-left">
              
              {/* Success Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-950">
                  Application Approved & Processed!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto">
                  Your medical intake has been reviewed and certified by our board-certified physician. 
                  Your official digital recommendation has been generated and emailed to <strong>{email || 'your email'}</strong>.
                </p>
              </div>

              {/* Live Recommendation Certificate Card Preview */}
              <div className="border border-slate-300 rounded-2xl p-6 bg-slate-50/70 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official State Recommendation</span>
                    <div className="text-sm font-bold text-slate-900">
                      {currentState.name} Medical Marijuana Patient Certificate
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400">Recommendation ID</span>
                    <div className="font-mono text-xs font-bold text-emerald-700">
                      {generatedRecId}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px]">Patient Name:</span>
                    <div className="font-bold text-slate-800">{firstName || 'John'} {lastName || 'Doe'}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Issue Date:</span>
                    <div className="font-medium text-slate-700">Today</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Valid Until:</span>
                    <div className="font-medium text-slate-700">{currentState.validity} from today</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Certifying Doctor:</span>
                    <div className="font-medium text-slate-700">Dr. M. Vance, M.D.</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900">Ready to shop at dispensaries:</strong> Show this certificate on your phone or print a paper copy.
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official PDF Letter</span>
                  </button>
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Next Steps for {currentState.name} Dispensary Access:
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">1</span>
                    <span>Check your email inbox for your welcome packet and PDF doctor certification letter.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">2</span>
                    <span>
                      {currentState.code === 'CA' ? 'You can immediately visit any licensed dispensary in California with your digital PDF!' : `Use your Cert ID #${generatedRecId} to finalize your ${currentState.name} state registry submission if required.`}
                    </span>
                  </div>
                  {packageType === 'bundle' && (
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">3</span>
                      <span>Your physical PVC plastic ID card has been queued for printing and will be shipped via USPS within 24 hours.</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Footer / Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 && currentStep < 6 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Continue to Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 5 && (
            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              {isProcessing ? (
                <span>Submitting to Certifying Physician...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize & Complete Evaluation (${finalPrice.toFixed(2)})</span>
                </>
              )}
            </button>
          )}

          {currentStep === 6 && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              Close & Go to Dashboard
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
