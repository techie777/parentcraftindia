import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBookingNotification } from '../context/BookingNotificationContext';
import { COUNSELOR_PRESETS } from './CounselorChatModal';
import { X, Calendar, Clock, Video, CheckCircle2, ShieldCheck, Sparkles, User, FileText, Sun, Sunset, Moon } from 'lucide-react';
import { TIME_SLOTS_BY_PERIOD, isSlotInPast, getTodayDateString, getFirstAvailableSlot } from './CounselorProfilePage';
import VideoCallRoomModal from './VideoCallRoomModal';

export default function BookCounselorModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const bookingCtx = useBookingNotification();
  
  const [selectedCounselor, setSelectedCounselor] = useState(COUNSELOR_PRESETS[0]);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString);
  const [selectedTime, setSelectedTime] = useState(() => getFirstAvailableSlot(getTodayDateString()));
  const [note, setNote] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [appointmentPass, setAppointmentPass] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (isSlotInPast(selectedDate, selectedTime)) {
      alert('Selected time slot has passed. Please choose an upcoming time slot.');
      return;
    }
    const passCode = `PRV-COUNSEL-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppointmentPass(passCode);
    setBookingSuccess(true);

    if (bookingCtx?.createBooking) {
      bookingCtx.createBooking({
        passCode,
        counselorName: selectedCounselor.name,
        serviceTitle: selectedCounselor.role || 'Parenting & Child Guidance',
        date: selectedDate,
        time: selectedTime,
        fee: selectedCounselor.fee || 1200,
        mode: 'video',
        note
      });
    }
  };

  const handleReset = () => {
    setBookingSuccess(false);
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{t('bookModalTitle')}</h3>
              <p className="text-xs text-slate-500">{t('bookModalDesc')}</p>
            </div>
          </div>

          <button onClick={handleReset} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookingSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold text-slate-900">{t('bookingSuccessTitle')}</h4>
            
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/60 border border-indigo-100 max-w-md mx-auto space-y-2 text-left text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Appointment Pass Code:</span>
                <span className="font-mono font-black text-indigo-700 text-sm">{appointmentPass}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Specialist:</span>
                <span className="font-bold text-slate-900">{selectedCounselor.name}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Scheduled Time:</span>
                <span className="font-bold text-slate-900">{selectedDate} at {selectedTime}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto">
              A private video room link has been generated. You and your counselor can join the live room now.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white text-xs font-black shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-95 transition-all"
              >
                <Video className="w-4 h-4 text-emerald-200" />
                <span>Join Video Room Now</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
              >
                Done
              </button>
            </div>

            <VideoCallRoomModal
              isOpen={isVideoModalOpen}
              onClose={() => setIsVideoModalOpen(false)}
              passCode={appointmentPass}
              counselorName={selectedCounselor.name}
            />
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            
            {/* Counselor Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {t('selectCounselor')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COUNSELOR_PRESETS.map((counselor) => (
                  <div
                    key={counselor.id}
                    onClick={() => setSelectedCounselor(counselor)}
                    className={`p-3 rounded-2xl cursor-pointer border transition-all flex items-center space-x-3 ${
                      selectedCounselor.id === counselor.id
                        ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={counselor.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center space-x-1">
                        <span>{counselor.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {lang === 'hi' ? counselor.roleHi : counselor.roleEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                required
                min={getTodayDateString()}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(getFirstAvailableSlot(e.target.value));
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5b48d6]"
              />
            </div>

            {/* Time Slot breakdown (Morning/Afternoon/Evening) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {t('selectSlot')} (Morning / Afternoon / Evening)
              </label>

              <div className="space-y-2">
                {TIME_SLOTS_BY_PERIOD.map((group) => {
                  const PeriodIcon = group.icon;
                  return (
                    <div key={group.period} className={`p-2.5 rounded-2xl border ${group.bgColor} space-y-1.5`}>
                      <div className="flex items-center space-x-1 text-[11px] font-extrabold text-slate-800">
                        <PeriodIcon className={`w-3.5 h-3.5 ${group.iconColor}`} />
                        <span>{group.period}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5">
                        {group.slots.map((slot) => {
                          const isPast = isSlotInPast(selectedDate, slot);
                          const isSelected = selectedTime === slot && !isPast;

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isPast}
                              onClick={() => !isPast && setSelectedTime(slot)}
                              className={`py-1.5 px-1 rounded-xl text-[11px] transition-all text-center border font-semibold ${
                                isPast 
                                  ? 'opacity-40 bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through' 
                                  : isSelected 
                                    ? 'bg-emerald-600 text-white font-black border-emerald-600 shadow-sm'
                                    : 'bg-white hover:border-emerald-400 border-slate-200 text-slate-800'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                {t('notesLabel')}
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t('notesPlaceholder')}
                className="w-full px-4 py-2 text-xs text-slate-800 rounded-xl border border-slate-200"
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
            >
              Confirm Appointment
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
