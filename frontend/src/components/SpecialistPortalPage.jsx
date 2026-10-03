import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useBookingNotification } from '../context/BookingNotificationContext';
import { 
  Stethoscope, ShieldCheck, User, LogOut, CheckCircle2, Calendar, 
  Clock, Video, DollarSign, Activity, FileText, ArrowRight, Lock, 
  Plus, Check, Star, Award, Settings, ChevronRight
} from 'lucide-react';
import VideoCallRoomModal from './VideoCallRoomModal';

export const INITIAL_DOCTOR_APPOINTMENTS = [
  {
    id: 'doc_ap_1',
    passCode: 'PRV-COUNSEL-948201',
    patientName: 'Aarav (Parent: Priya Sharma)',
    issue: 'Toddler Screen Addiction & Tantrums',
    mode: 'video',
    date: new Date().toISOString().split('T')[0],
    time: '05:30 PM',
    fee: 1200,
    status: 'Scheduled Today',
    note: 'Child cries whenever iPad is turned off after 30 mins.'
  },
  {
    id: 'doc_ap_2',
    passCode: 'PRV-COUNSEL-749201',
    patientName: 'Rohan (Parent: Rahul Verma)',
    issue: 'School Anxiety & Speech Hesitation',
    mode: 'call',
    date: '2026-07-28',
    time: '11:30 AM',
    fee: 800,
    status: 'Upcoming',
    note: 'Cries during morning school bus drop-off.'
  }
];

export default function SpecialistPortalPage() {
  const { user, login, register, logout } = useAuth();
  const { lang, t } = useLanguage();
  const { bookings } = useBookingNotification();
  const isHi = lang === 'hi';

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [degree, setDegree] = useState('MD (Pediatrics)');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('Pediatric Development & Behavioral Health');
  const [hospital, setHospital] = useState('');
  const [experience, setExperience] = useState('10+ Years');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [appointments, setAppointments] = useState(INITIAL_DOCTOR_APPOINTMENTS);
  const [selectedMeetingPass, setSelectedMeetingPass] = useState(null);
  const [isVideoRoomOpen, setIsVideoRoomOpen] = useState(false);

  // Live real parent bookings merged with doctor scheduled sessions
  const liveAppointments = (bookings || []).map(b => ({
    id: b.id || b.passCode,
    passCode: b.passCode,
    patientName: `${b.parentName || 'Parent'} (${b.serviceTitle || 'Session'})`,
    issue: b.note || b.serviceTitle || 'Parenting & Behavioral Development Consultation',
    mode: b.mode || 'video',
    date: b.date,
    time: b.time,
    fee: b.fee || 1200,
    status: b.status || 'Upcoming',
    note: b.note
  }));

  const displayAppointments = [
    ...liveAppointments,
    ...appointments.filter(a => !liveAppointments.some(l => l.passCode === a.passCode))
  ];

  const [morningSlotsActive, setMorningSlotsActive] = useState(true);
  const [afternoonSlotsActive, setAfternoonSlotsActive] = useState(true);
  const [eveningSlotsActive, setEveningSlotsActive] = useState(true);

  const isDoctor = user?.role === 'expert' || user?.isVerifiedExpert || user?.licenseNumber;

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        if (!fullName.trim() || !email.trim() || !licenseNumber.trim()) {
          setErrorMsg('Please enter your Name, Email, and MCI/RCI License ID.');
          return;
        }
        await register({
          name: fullName,
          email,
          role: 'expert',
          isDoctor: true,
          licenseNumber,
          specialization,
          hospital,
          experience
        });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error.');
    }
  };

  const handleLaunchVideoRoom = (passCode) => {
    setSelectedMeetingPass(passCode);
    setIsVideoRoomOpen(true);
  };

  const handleCompleteAppointment = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Completed' } : a));
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Professional Portal Bar */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
            🩺
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Parvarish Specialist Partner Portal</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-400/30">
                Verified Medical Suite
              </span>
            </div>
            <p className="text-xs text-teal-200 mt-1">
              Telehealth & In-Clinic Practice Management for Board-Certified Pediatricians & Child Psychologists
            </p>
          </div>
        </div>

        {user && isDoctor ? (
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{user.name}</div>
              <div className="text-[10px] font-mono text-emerald-300 font-bold">ID: {user.userId || 'PRV-DOC-849201'}</div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-2xl bg-rose-600/80 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span>Doctor Logout</span>
            </button>
          </div>
        ) : (
          <span className="text-xs text-emerald-300 font-bold flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MCI / RCI Verified Portal</span>
          </span>
        )}
      </div>

      {/* LOGGED OUT: DOCTOR REGISTRATION & LOGIN */}
      {(!user || !isDoctor) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Auth Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-slate-900">
                {isLoginMode ? 'Doctor / Specialist Login' : 'Register as a Specialist Partner'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isLoginMode ? 'Access your patient consultations and schedule' : 'Expand your practice and support thousands of families'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleDoctorSubmit} className="space-y-4">
              
              {!isLoginMode && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Doctor Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Ananya Roy"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Medical Degree</label>
                      <input
                        type="text"
                        required
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        placeholder="MD (Pediatrics)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">MCI / RCI License ID</label>
                      <input
                        type="text"
                        required
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder="MCI-849201"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Specialization</label>
                    <select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold"
                    >
                      <option>Pediatric Development & Behavioral Health</option>
                      <option>Child Clinical Psychology & Teen Therapy</option>
                      <option>Speech, Language & Motor Pathology</option>
                      <option>Adolescent Psychiatry & Counseling</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Hospital / Clinic</label>
                      <input
                        type="text"
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                        placeholder="Max Healthcare, Delhi"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Experience</label>
                      <input
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="14 Years"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Professional Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dr.ananya@parvarish.org"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
              >
                {isLoginMode ? 'Access Specialist Portal' : 'Register Professional Profile'}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
              {isLoginMode ? (
                <>Need a professional account? <button onClick={() => setIsLoginMode(false)} className="font-extrabold text-emerald-700">Apply Here</button></>
              ) : (
                <>Already registered doctor? <button onClick={() => setIsLoginMode(true)} className="font-extrabold text-emerald-700">Doctor Sign In</button></>
              )}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-2xl">
                🏆
              </div>
              <h3 className="text-xl font-black text-white">Why Join Parvarish as a Specialist Partner?</h3>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>100% Flexible Practice</strong>: Set your own consultation hours across 4 mediums (Chat, Voice, Video, In-Clinic).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Guaranteed Direct Payouts</strong>: Receive 85% net earnings per session with weekly bank settlements.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>256-Bit Encrypted Telehealth</strong>: Integrated HD video rooms and private consultation notes.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* LOGGED IN DOCTOR PORTAL DASHBOARD */}
      {user && isDoctor && (
        <div className="space-y-8">
          
          {/* Doctor Profile Banner */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <img src={user.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'} className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-sm" />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{user.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified Doctor</span>
                  </span>
                </div>
                <p className="text-xs font-bold text-teal-700">{user.specialization || 'Pediatric Development & Behavioral Health'}</p>
                <p className="text-xs text-slate-500">MCI License ID: <strong className="font-mono text-slate-700">{user.licenseNumber || 'MCI-849201'}</strong> | Unique Doctor ID: <strong className="font-mono text-emerald-700">{user.userId || 'PRV-DOC-849201'}</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center min-w-[200px]">
              <div className="text-[10px] font-bold uppercase text-slate-400">Total Net Earnings</div>
              <div className="text-2xl font-black text-emerald-800">₹45,000</div>
              <div className="text-[10px] text-emerald-600 font-semibold">14 Completed Consultations</div>
            </div>
          </div>

          {/* TWO COLUMN DOCTOR DASHBOARD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Patient Appointments Desk */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span>Patient Consultation Appointments</span>
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {displayAppointments.length} Scheduled
                  </span>
                </div>

                <div className="space-y-4">
                  {displayAppointments.map((ap) => (
                    <div key={ap.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">{ap.passCode}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                            {ap.status}
                          </span>
                        </div>
                        <span className="text-xs font-black text-emerald-800">₹{ap.fee} Fee</span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{ap.patientName}</h4>
                        <p className="text-xs text-slate-600">Issue: <strong>{ap.issue}</strong></p>
                        <p className="text-xs text-slate-500">Scheduled: <strong>{ap.date} at {ap.time}</strong> ({ap.mode.toUpperCase()})</p>
                        {ap.note && (
                          <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                            <strong>Parent Note:</strong> "{ap.note}"
                          </div>
                        )}
                      </div>

                      <div className="pt-2 flex items-center space-x-3">
                        <button
                          onClick={() => handleLaunchVideoRoom(ap.passCode)}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center space-x-2 shadow-xs"
                        >
                          <Video className="w-4 h-4 text-emerald-200" />
                          <span>Join Patient HD Video Room</span>
                        </button>

                        {ap.status !== 'Completed' && (
                          <button
                            onClick={() => handleCompleteAppointment(ap.id)}
                            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Slot Availability Controls */}
            <div className="space-y-6">
              <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <span>Consultation Slot Availability</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900">Morning Slots (9 AM - 12 PM)</div>
                      <div className="text-[10px] text-slate-500">09:00 AM, 10:00 AM, 11:30 AM</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={morningSlotsActive}
                      onChange={(e) => setMorningSlotsActive(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900">Afternoon Slots (12 PM - 5 PM)</div>
                      <div className="text-[10px] text-slate-500">12:30 PM, 02:00 PM, 04:00 PM</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={afternoonSlotsActive}
                      onChange={(e) => setAfternoonSlotsActive(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900">Evening Slots (5 PM - 9 PM)</div>
                      <div className="text-[10px] text-slate-500">05:30 PM, 07:00 PM, 08:30 PM</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={eveningSlotsActive}
                      onChange={(e) => setEveningSlotsActive(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                  </div>
                </div>

                <button
                  onClick={() => alert('Slot availability updated successfully!')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Save Availability Settings
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Video Call Room Modal */}
      <VideoCallRoomModal
        isOpen={isVideoRoomOpen}
        onClose={() => setIsVideoRoomOpen(false)}
        passCode={selectedMeetingPass || 'PRV-COUNSEL-948201'}
        counselorName={user?.name || 'Dr. Ananya Roy'}
      />

    </div>
  );
}
