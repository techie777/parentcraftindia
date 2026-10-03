import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBookingNotification } from '../context/BookingNotificationContext';
import { 
  X, Calendar, Clock, Video, FileText, CheckCircle2, AlertTriangle, 
  Star, RefreshCw, MessageSquare, Edit3, XCircle, ArrowLeft, Filter, Search, ShieldCheck, Info
} from 'lucide-react';
import InvoiceModal from './InvoiceModal';
import VideoCallRoomModal from './VideoCallRoomModal';
import { TIME_SLOTS_BY_PERIOD, isSlotInPast } from './CounselorProfilePage';

export default function MyBookingsModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const bookingCtx = useBookingNotification();
  const bookings = bookingCtx?.bookings || [];
  const cancelBooking = bookingCtx?.cancelBooking;
  const updateBooking = bookingCtx?.updateBooking;

  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState(null);
  const [activeVideoCallPass, setActiveVideoCallPass] = useState(null);
  const [activeVideoDoctor, setActiveVideoDoctor] = useState('Dr. Ananya Roy');
  
  // Filter Tab State: 'all' | 'upcoming' | 'completed' | 'cancelled'
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Reschedule Modal State
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [newDate, setNewDate] = useState('2026-07-28');
  const [newTime, setNewTime] = useState('10:00 AM');

  // Cancel Confirmation Modal State
  const [cancelModalBooking, setCancelModalBooking] = useState(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const handleOpenCancelDialogue = (booking) => {
    setCancelModalBooking(booking);
  };

  const handleConfirmCancelAction = () => {
    if (!cancelModalBooking || !cancelBooking) return;

    const booking = cancelModalBooking;
    cancelBooking(booking.id);

    const isFree = (booking.hoursUntilSession ?? 24) >= 2;
    const refundAmt = isFree ? booking.fee : Math.max(0, booking.fee - 250);

    const msg = isFree 
      ? `Session ${booking.passCode} cancelled. 100% Full Refund (₹${refundAmt}) processed under 2-hour policy!`
      : `Session ${booking.passCode} cancelled. ₹250 penalty applied. Partial refund of ₹${refundAmt} processed.`;

    setToastMessage(msg);
    setCancelModalBooking(null);
    setActiveTab('cancelled'); // Automatically navigate to Cancelled tab

    setTimeout(() => setToastMessage(''), 5000);
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (isSlotInPast(newDate, newTime)) {
      alert('Selected time slot has passed. Please choose an upcoming time slot.');
      return;
    }

    if (updateBooking && rescheduleBooking) {
      updateBooking(rescheduleBooking.id, {
        date: newDate,
        time: newTime,
        status: 'Upcoming (Rescheduled)'
      });
    }

    setToastMessage(`Session ${rescheduleBooking?.passCode} successfully rescheduled to ${newDate} at ${newTime}!`);
    setRescheduleBooking(null);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.counselorName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.passCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === 'upcoming') return b.status.includes('Upcoming');
    if (activeTab === 'completed') return b.status === 'Completed';
    if (activeTab === 'cancelled') return b.status === 'Cancelled';
    return true; // 'all'
  });

  const countUpcoming = bookings.filter(b => b.status.includes('Upcoming')).length;
  const countCompleted = bookings.filter(b => b.status === 'Completed').length;
  const countCancelled = bookings.filter(b => b.status === 'Cancelled').length;

  return (
    <div className="fixed inset-0 z-[999] bg-warmbg flex flex-col overflow-y-auto max-w-full overflow-x-hidden animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[1000] px-4 py-3 rounded-2xl bg-emerald-700 text-white text-xs font-bold shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom-3 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* FULL SCREEN PAGE HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center space-x-1 text-xs font-bold flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Platform</span>
            </button>

            <div className="overflow-hidden">
              <div className="flex items-center space-x-1.5 flex-wrap">
                <h1 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight truncate">
                  My Consultation Sessions
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-extrabold flex items-center space-x-1 flex-shrink-0">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate hidden sm:block">
                Manage appointments, join live video consultation rooms, reschedule or view tax invoices.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>

        </div>
      </header>

      {/* MAIN FULL-SCREEN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 space-y-6 flex-1">
        
        {/* TOP FILTER CONTROLS & SEARCH BAR */}
        <div className="glass-card p-4 sm:p-6 rounded-3xl bg-white border-slate-200/80 shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* SCROLLABLE FILTER TABS: All | Upcoming | Completed | Cancelled */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center space-x-1.5 flex-shrink-0 cursor-pointer ${
                  activeTab === 'all' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>All Sessions</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">{bookings.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center space-x-1.5 flex-shrink-0 cursor-pointer ${
                  activeTab === 'upcoming' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Upcoming</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono">{countUpcoming}</span>
              </button>

              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center space-x-1.5 flex-shrink-0 cursor-pointer ${
                  activeTab === 'completed' 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Completed</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-mono">{countCompleted}</span>
              </button>

              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center space-x-1.5 flex-shrink-0 cursor-pointer ${
                  activeTab === 'cancelled' 
                    ? 'bg-rose-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Cancelled</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-mono">{countCancelled}</span>
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search counselor or passcode..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>

          </div>

        </div>

        {/* APPOINTMENTS CARDS GRID */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="glass-card p-8 sm:p-12 rounded-3xl text-center space-y-3 bg-white border-slate-200">
              <div className="text-4xl">📅</div>
              <h3 className="text-lg font-bold text-slate-800">No {activeTab !== 'all' ? activeTab : ''} sessions found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No consultations match your selected filter. Select "All Sessions" or book a new appointment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredBookings.map((booking) => {
                const isUpcoming = booking.status.includes('Upcoming');
                const isCompleted = booking.status === 'Completed';
                const isCancelled = booking.status === 'Cancelled';

                return (
                  <div
                    key={booking.id}
                    className="glass-card p-5 sm:p-6 rounded-3xl space-y-4 border-slate-200 bg-white shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all"
                  >
                    <div className="space-y-4">
                      
                      {/* Top Header Card Info */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
                        <div className="flex items-center space-x-3">
                          <img
                            src={booking.counselorAvatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150'}
                            alt={booking.counselorName}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-emerald-400 shadow-xs flex-shrink-0"
                          />
                          <div>
                            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                              <h3 className="text-sm sm:text-base font-black text-slate-900">{booking.counselorName}</h3>
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase ${
                                isUpcoming ? 'bg-emerald-100 text-emerald-800' :
                                isCompleted ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-teal-700 mt-0.5">{booking.serviceTitle}</p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="font-mono text-[11px] sm:text-xs font-black text-emerald-800 block">{booking.passCode}</span>
                          <span className="text-xs font-black text-slate-900 block mt-0.5">₹{booking.fee}</span>
                        </div>
                      </div>

                      {/* Scheduled Slot Details */}
                      <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <div className="flex items-center space-x-1.5 text-slate-700 font-semibold truncate">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">Date: <strong>{booking.date}</strong></span>
                        </div>

                        <div className="flex items-center space-x-1.5 text-slate-700 font-semibold truncate">
                          <Clock className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                          <span className="truncate">Time: <strong>{booking.time}</strong></span>
                        </div>
                      </div>

                    </div>

                    {/* ACTIONS BUTTONS BAR */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      
                      <div className="flex flex-wrap items-center gap-2">
                        {isUpcoming && (
                          <button
                            onClick={() => { setActiveVideoCallPass(booking.passCode); setActiveVideoDoctor(booking.counselorName); }}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold flex items-center space-x-1.5 shadow-xs cursor-pointer active:scale-95 transition-all text-xs"
                          >
                            <Video className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Join Video Room</span>
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedInvoiceBooking(booking)}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center space-x-1 transition-colors text-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-teal-600" />
                          <span>Tax Invoice</span>
                        </button>
                      </div>

                      {/* Reschedule & Cancel Actions */}
                      {isUpcoming && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setRescheduleBooking(booking)}
                            className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold flex items-center space-x-1 transition-colors cursor-pointer text-xs"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                            <span>Reschedule</span>
                          </button>

                          <button
                            onClick={() => handleOpenCancelDialogue(booking)}
                            className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold flex items-center space-x-1 transition-colors cursor-pointer text-xs"
                          >
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

      {/* CANCELLATION CONFIRMATION DIALOGUE MODAL */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="text-base font-bold text-slate-900">Cancel Appointment</h4>
              </div>
              <button onClick={() => setCancelModalBooking(null)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p>
                Are you sure you want to cancel session <strong className="font-mono text-slate-900">{cancelModalBooking.passCode}</strong> with <strong>{cancelModalBooking.counselorName}</strong>?
              </p>

              {/* PENALTY / FREE REFUND CALCULATION BANNER */}
              {(cancelModalBooking.hoursUntilSession ?? 24) >= 2 ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Free Cancellation Policy Applies</span>
                  </div>
                  <div className="text-[11px] text-emerald-800 leading-relaxed">
                    • Refund Amount: <strong className="font-black text-emerald-900">₹{cancelModalBooking.fee}</strong> (100% Full Credit)<br />
                    • Penalty Fee: <strong className="font-black text-emerald-900">₹0 (No Penalty Charges)</strong>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center space-x-1">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>Cancellation Within 2 Hours Policy</span>
                  </div>
                  <div className="text-[11px] text-amber-900 leading-relaxed">
                    • Cancellation Fee: <strong className="font-black text-rose-700">₹250</strong> (Clinical slot hold penalty)<br />
                    • Net Refund Amount: <strong className="font-black text-emerald-800">₹{Math.max(0, cancelModalBooking.fee - 250)}</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalBooking(null)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider"
              >
                Keep Session
              </button>

              <button
                type="button"
                onClick={handleConfirmCancelAction}
                className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                Confirm Cancellation
              </button>
            </div>

          </div>
        </div>
      )}

      {/* RESCHEDULE MODAL POPUP */}
      {rescheduleBooking && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">Reschedule Session ({rescheduleBooking.passCode})</h4>
              <button onClick={() => setRescheduleBooking(null)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleConfirmReschedule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Select New Date</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Select New Time Slot</label>
                <div className="space-y-2">
                  {TIME_SLOTS_BY_PERIOD.map((group) => (
                    <div key={group.period} className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-700 mb-1">{group.period}</div>
                      <div className="grid grid-cols-3 gap-1">
                        {group.slots.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setNewTime(slot)}
                            className={`py-1 rounded-lg text-[10px] font-bold border ${newTime === slot ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-700 border-slate-200'}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Confirm New Rescheduled Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal */}
      {selectedInvoiceBooking && (
        <InvoiceModal
          isOpen={!!selectedInvoiceBooking}
          onClose={() => setSelectedInvoiceBooking(null)}
          booking={selectedInvoiceBooking}
        />
      )}

      {/* Video Call Room Modal */}
      {activeVideoCallPass && (
        <VideoCallRoomModal
          isOpen={!!activeVideoCallPass}
          onClose={() => setActiveVideoCallPass(null)}
          passCode={activeVideoCallPass}
          counselorName={activeVideoDoctor}
        />
      )}

    </div>
  );
}
