import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBookingNotification } from '../context/BookingNotificationContext';
import { ShieldCheck, Calendar, Clock, Video, CheckCircle2, User, DollarSign, Edit3, Link, Plus, Save, PhoneCall } from 'lucide-react';
import VideoCallRoomModal from './VideoCallRoomModal';

export default function VendorDashboard() {
  const { lang, t } = useLanguage();
  const { bookings } = useBookingNotification();

  const [editingVideoLinkId, setEditingVideoLinkId] = useState(null);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Video Call Modal State
  const [activeCallRoom, setActiveCallRoom] = useState(null);

  const doctorBookings = bookings.filter(b => b.counselorName.includes('Ananya') || b.counselorName.includes('Kavita') || true);

  const handleSaveVideoLink = (id) => {
    setEditingVideoLinkId(null);
    setNewVideoUrl('');
    setToastMessage('Meeting video link updated!');
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-amber-50 border border-teal-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Verified Doctor Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Doctor Consultation & Schedule Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Logged in as: <strong className="text-slate-900">Dr. Ananya Roy (Senior Pediatric Neurologist)</strong>
          </p>
        </div>
      </div>

      {/* Doctor Upcoming Sessions List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span>Live Patient Appointments ({doctorBookings.filter(s => s.status === 'Upcoming').length})</span>
        </h3>

        <div className="space-y-4">
          {doctorBookings.map((session) => (
            <div key={session.id} className="glass-card p-6 rounded-3xl space-y-4 border-slate-200">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-bold text-slate-900">{session.parentName || 'Priya Sharma'}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      session.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">{session.serviceTitle} (₹{session.fee})</p>
                </div>

                <div className="text-right text-xs">
                  <div className="font-mono font-bold text-emerald-800">{session.passCode}</div>
                  <div className="text-slate-500">{session.date} at {session.time}</div>
                </div>
              </div>

              {session.note && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  <strong>Parent Note:</strong> "{session.note}"
                </div>
              )}

              {/* Meeting Link & Join Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                
                <div className="flex items-center space-x-2 flex-1 min-w-[280px]">
                  <Video className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold text-slate-700 font-mono">Pass Code: {session.passCode}</span>
                </div>

                {session.status === 'Upcoming' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveCallRoom(session)}
                      className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
                    >
                      <PhoneCall className="w-4 h-4 animate-pulse" />
                      <span>Join Video Call</span>
                    </button>
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Video Call Modal */}
      {activeCallRoom && (
        <VideoCallRoomModal
          isOpen={!!activeCallRoom}
          onClose={() => setActiveCallRoom(null)}
          passCode={activeCallRoom.passCode}
          counselorName="Dr. Ananya Roy"
        />
      )}

    </section>
  );
}
