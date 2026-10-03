import React, { useState } from 'react';
import { useBookingNotification } from '../context/BookingNotificationContext';
import { Bell, X, CheckCircle2, Clock, DollarSign, Video, AlertTriangle, ArrowRight } from 'lucide-react';
import VideoCallRoomModal from './VideoCallRoomModal';

export default function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, unreadCount, markAllNotificationsRead } = useBookingNotification();

  const [activeTabFilter, setActiveTabFilter] = useState('All'); // 'All' | 'Reminders' | 'Refunds'
  const [activeCallPass, setActiveCallPass] = useState(null);
  const [activeDoctorName, setActiveDoctorName] = useState('Dr. Ananya Roy');

  if (!isOpen) return null;

  const filteredAlerts = notifications.filter(n => {
    if (activeTabFilter === 'Reminders') return n.type.includes('reminder');
    if (activeTabFilter === 'Refunds') return n.type === 'refund' || n.type === 'cancellation';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex justify-end animate-in fade-in duration-150">
      
      <div className="w-96 max-w-[90vw] h-full bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-emerald-100 overflow-y-auto">
        
        <div className="space-y-4">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Notification Alerts</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {unreadCount} New
                </span>
              )}
            </div>

            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Pills & Mark All Read */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              {['All', 'Reminders', 'Refunds'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveTabFilter(filter)}
                  className={`px-3 py-1 rounded-xl font-bold transition-all ${
                    activeTabFilter === filter ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] font-bold text-emerald-700 hover:underline"
            >
              Mark all read
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3 pt-2">
            {filteredAlerts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No notification alerts under this filter.
              </div>
            ) : (
              filteredAlerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border space-y-2 transition-all ${
                    !alert.read ? 'bg-emerald-50/60 border-emerald-200' : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                      {alert.type.includes('reminder') && <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                      {alert.type === 'booking_success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
                      {alert.type === 'refund' && <DollarSign className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />}
                      <span>{alert.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-snug truncate" title={alert.message}>
                    {alert.message}
                  </p>

                  {/* 1-CLICK JOIN VIDEO CALL CTA */}
                  {alert.passCode && (
                    <button
                      onClick={() => { setActiveCallPass(alert.passCode); setActiveDoctorName(alert.doctor || 'Dr. Ananya Roy'); }}
                      className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                    >
                      <Video className="w-3 h-3 text-emerald-200" />
                      <span>Join Direct HD Video Call</span>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
          Real-Time Notification System • Parvarish
        </div>

      </div>

      {/* In-App HD Video Consultation Room Modal */}
      <VideoCallRoomModal
        isOpen={!!activeCallPass}
        onClose={() => setActiveCallPass(null)}
        passCode={activeCallPass}
        counselorName={activeDoctorName}
      />

    </div>
  );
}
