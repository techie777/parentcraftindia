import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSocketIO } from '../hooks/useSocketIO';

const BookingNotificationContext = createContext();

export const INITIAL_BOOKINGS = [
  {
    id: 'b_101',
    passCode: 'PRV-COUNSEL-948201',
    parentName: 'Priya Sharma',
    counselorName: 'Dr. Ananya Roy',
    serviceTitle: 'Toddler Screen Addiction & Tantrum Protocol',
    mode: 'video',
    date: new Date().toISOString().split('T')[0],
    time: '05:30 PM',
    fee: 1200,
    status: 'Upcoming',
    hoursUntilSession: 24,
    rated: false
  },
  {
    id: 'b_102',
    passCode: 'PRV-COUNSEL-482019',
    parentName: 'Priya Sharma',
    counselorName: 'Kavita Verma (M.Sc)',
    serviceTitle: 'Child Motor & Speech Evaluation Session',
    mode: 'chat',
    date: '2026-07-20',
    time: '02:00 PM',
    fee: 800,
    status: 'Completed',
    hoursUntilSession: 0,
    rated: false
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n_1',
    title: '🚨 Starting in 10 Mins',
    message: 'HD Video session with Dr. Ananya Roy starts in 10 minutes.',
    time: 'Just now',
    type: 'reminder_10m',
    read: false,
    passCode: 'PRV-COUNSEL-948201',
    doctor: 'Dr. Ananya Roy'
  },
  {
    id: 'n_2',
    title: '⏰ Session Today at 04:00 PM',
    message: 'Upcoming consultation with Dr. Ananya Roy scheduled for today.',
    time: '50m ago',
    type: 'reminder_1h',
    read: false
  },
  {
    id: 'n_3',
    title: '🎉 Session Booked',
    message: 'Confirmed with Dr. Ananya Roy • Pass: PRV-COUNSEL-948201',
    time: 'Yesterday',
    type: 'booking_success',
    read: true
  },
  {
    id: 'n_4',
    title: '💳 Refund Processed',
    message: 'Full refund of ₹800 credited under policy.',
    time: '3 days ago',
    type: 'refund',
    read: true
  }
];

export function BookingNotificationProvider({ children }) {
  const { socket } = useSocketIO();
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Audio alert chime
  const playAlertSound = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => {});
    } catch (e) {}
  };

  // 1. Fetch live bookings from database on load
  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.bookings) && data.bookings.length > 0) {
          setBookings(data.bookings);
        }
      })
      .catch(err => console.debug('[Bookings Sync] Fetch error:', err));
  }, []);

  // Socket.io Real-Time Push Notification Listener
  useEffect(() => {
    if (!socket) return;

    const handlePushLiveBooking = (newBooking) => {
      console.log('[Socket Push Received] Live Booking:', newBooking);
      
      // Update bookings if not already present
      setBookings(prev => {
        if (prev.some(b => b.passCode === newBooking.passCode)) return prev;
        return [newBooking, ...prev];
      });

      const alertSuccess = {
        id: `n_push_${Date.now()}`,
        title: '🎉 Live Session Booked',
        message: `With ${newBooking.counselorName} on ${newBooking.date} at ${newBooking.time} • Pass: ${newBooking.passCode}`,
        time: 'Just now',
        type: 'booking_success',
        read: false,
        passCode: newBooking.passCode,
        doctor: newBooking.counselorName
      };

      setNotifications(prev => [alertSuccess, ...prev]);
      playAlertSound();
    };

    const handlePushLiveCancellation = (cancelData) => {
      console.log('[Socket Push Received] Live Cancellation:', cancelData);
      setBookings(prev => prev.map(b => b.passCode === cancelData.passCode ? { ...b, status: 'Cancelled' } : b));
      playAlertSound();
    };

    socket.on('push_live_booking', handlePushLiveBooking);
    socket.on('push_live_cancellation', handlePushLiveCancellation);

    return () => {
      socket.off('push_live_booking', handlePushLiveBooking);
      socket.off('push_live_cancellation', handlePushLiveCancellation);
    };
  }, [socket]);

  // 1. CREATE LIVE SESSION BOOKING
  const createBooking = (bookingData) => {
    const newBooking = {
      id: `b_${Date.now()}`,
      status: 'Upcoming',
      hoursUntilSession: 24,
      rated: false,
      parentName: 'Priya Sharma',
      ...bookingData
    };

    setBookings(prev => [newBooking, ...prev]);

    // Persist to Database API
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    }).catch(e => console.debug('[Bookings DB] POST error:', e));

    // Short 1-line Notification Alerts
    const alertSuccess = {
      id: `n_${Date.now()}_1`,
      title: '🎉 Session Booked',
      message: `With ${newBooking.counselorName} on ${newBooking.date} at ${newBooking.time} • Pass: ${newBooking.passCode}`,
      time: 'Just now',
      type: 'booking_success',
      read: false,
      passCode: newBooking.passCode,
      doctor: newBooking.counselorName
    };

    const alert10m = {
      id: `n_${Date.now()}_2`,
      title: '🚨 Starting in 10 Mins',
      message: `HD Video session with ${newBooking.counselorName} starts in 10 minutes.`,
      time: 'Upcoming',
      type: 'reminder_10m',
      read: false,
      passCode: newBooking.passCode,
      doctor: newBooking.counselorName
    };

    setNotifications(prev => [alertSuccess, alert10m, ...prev]);
    playAlertSound();

    // Broadcast across Socket.io network to all clients
    if (socket) {
      socket.emit('new_booking_notification', newBooking);
    }

    return newBooking;
  };

  // 2. CANCEL APPOINTMENT
  const cancelBooking = (bookingId) => {
    let targetBooking = null;
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        targetBooking = b;
        return { ...b, status: 'Cancelled' };
      }
      return b;
    }));

    if (targetBooking) {
      const isFree = targetBooking.hoursUntilSession >= 2;
      const refundAmt = isFree ? targetBooking.fee : Math.max(0, targetBooking.fee - 250);

      const cancelAlert = {
        id: `n_${Date.now()}_cancel`,
        title: '❌ Session Cancelled',
        message: `Appointment with ${targetBooking.counselorName} was cancelled.`,
        time: 'Just now',
        type: 'cancellation',
        read: false
      };

      const refundAlert = {
        id: `n_${Date.now()}_refund`,
        title: '💳 Refund Processed',
        message: `Refund of ₹${refundAmt} credited to your account under policy.`,
        time: 'Just now',
        type: 'refund',
        read: false
      };

      setNotifications(prev => [cancelAlert, refundAlert, ...prev]);
      playAlertSound();

      if (socket) {
        socket.emit('cancel_booking_notification', { passCode: targetBooking.passCode });
      }
    }
  };

  // 3. UPDATE / RESCHEDULE APPOINTMENT
  const updateBooking = (bookingId, updatedFields) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, ...updatedFields } : b));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <BookingNotificationContext.Provider value={{
      bookings,
      notifications,
      unreadCount,
      createBooking,
      addBooking: createBooking,
      cancelBooking,
      updateBooking,
      markAllNotificationsRead
    }}>
      {children}
    </BookingNotificationContext.Provider>
  );
}

export function useBookingNotification() {
  return useContext(BookingNotificationContext);
}
