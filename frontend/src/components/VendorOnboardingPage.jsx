import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, CheckCircle2, User, Award, Building, DollarSign, Upload, ArrowRight, Sparkles } from 'lucide-react';

export default function VendorOnboardingPage({ onComplete }) {
  const { lang, t } = useLanguage();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  // Form State
  const [fullName, setFullName] = useState('');
  const [degree, setDegree] = useState('MD (Pediatrics)');
  const [specialty, setSpecialty] = useState('Pediatric Development');
  const [licenseNo, setLicenseNo] = useState('');
  const [experience, setExperience] = useState('10');
  const [hospital, setHospital] = useState('');
  const [location, setLocation] = useState('');
  
  // Custom Services
  const [service1Name, setService1Name] = useState('General Pediatric Consultation');
  const [service1Fee, setService1Fee] = useState('800');
  const [service2Name, setService2Name] = useState('Behavioral & Development Therapy');
  const [service2Fee, setService2Fee] = useState('1200');

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = `PARV-VENDOR-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppId(refCode);
    setSubmitted(true);
  };

  return (
    <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-100 text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Specialist Partner Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('onboardingTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto">
          {t('onboardingSub')}
        </p>
      </div>

      {submitted ? (
        /* Submitted Confirmation Screen */
        <div className="glass-card p-8 rounded-3xl text-center space-y-4 border-emerald-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">Registration Application Submitted!</h3>

          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            Thank you, Dr. {fullName || 'Specialist'}! Our medical verification panel will review your credentials and license <strong>({licenseNo || 'REG-PENDING'})</strong> within 24 hours.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs space-y-1">
            <div className="text-slate-400 uppercase tracking-wider font-bold">Application Reference ID</div>
            <div className="font-mono font-bold text-emerald-700 text-base">{appId}</div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        /* 3-Step Registration Form */
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-slate-200">
          
          {/* Step Progress Indicators */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-bold">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-emerald-700' : 'text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">1</span>
              <span>Personal & Medical Credentials</span>
            </div>

            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-emerald-700' : 'text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">2</span>
              <span>Services & Custom Fees</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name (with Title)
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Ananya Roy"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Medical / Clinical Degree
                    </label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    >
                      <option>MD (Pediatrics)</option>
                      <option>M.Sc (Clinical Child Psychology)</option>
                      <option>M.Sc (Speech & Language Pathology)</option>
                      <option>DNB (Pediatric Neurology)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Medical Registration / License No.
                    </label>
                    <input
                      type="text"
                      required
                      value={licenseNo}
                      onChange={(e) => setLicenseNo(e.target.value)}
                      placeholder="e.g. MCI-948201 / RCI-7482"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Primary Hospital / Clinic Name & City
                  </label>
                  <input
                    type="text"
                    required
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    placeholder="e.g. Max Children Healthcare, New Delhi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1.5"
                  >
                    <span>Next: Services & Fees</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Configure Your Clinical Services & Custom Fees
                </h4>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-xs text-slate-800">Service Package 1:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={service1Name}
                      onChange={(e) => setService1Name(e.target.value)}
                      placeholder="Service Name (e.g. General Consultation)"
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                    <input
                      type="number"
                      value={service1Fee}
                      onChange={(e) => setService1Fee(e.target.value)}
                      placeholder="Fee in ₹ (e.g. 800)"
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-xs text-slate-800">Service Package 2 (Optional):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={service2Name}
                      onChange={(e) => setService2Name(e.target.value)}
                      placeholder="Service Name (e.g. Screen Addiction Protocol)"
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                    <input
                      type="number"
                      value={service2Fee}
                      onChange={(e) => setService2Fee(e.target.value)}
                      placeholder="Fee in ₹ (e.g. 1200)"
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md"
                  >
                    {t('btnSubmitOnboarding')}
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      )}

    </section>
  );
}
