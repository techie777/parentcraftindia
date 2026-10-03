import express from 'express';
import Booking from '../models/Booking.js';
import { getBookingsFromDisk, saveBookingsToDisk } from '../config/storage.js';

const router = express.Router();

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const { counselorName, parentEmail } = req.query;
    let bookings = [];

    try {
      if (Booking.db?.readyState === 1) {
        let filter = {};
        if (counselorName) filter.counselorName = new RegExp(counselorName, 'i');
        if (parentEmail) filter.parentEmail = parentEmail;
        bookings = await Booking.find(filter).sort({ createdAt: -1 });
      }
    } catch (e) {
      console.warn('[MongoDB read fallback to disk]:', e.message);
    }

    if (!bookings || bookings.length === 0) {
      bookings = getBookingsFromDisk();
      if (counselorName) {
        const cLower = counselorName.toLowerCase();
        bookings = bookings.filter(b => b.counselorName && b.counselorName.toLowerCase().includes(cLower));
      }
      if (parentEmail) {
        bookings = bookings.filter(b => b.parentEmail === parentEmail);
      }
    }

    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new booking
router.post('/', async (req, res) => {
  try {
    const {
      passCode,
      parentName = 'Priya Sharma',
      parentEmail = 'parent@parvarish.org',
      parentPhone = '9876543210',
      counselorName,
      serviceTitle = 'Child Consultation Session',
      date,
      time,
      fee = 1200,
      mode = 'video',
      paymentMethod = 'upi',
      note = ''
    } = req.body;

    if (!passCode || !counselorName || !date || !time) {
      return res.status(400).json({ success: false, error: 'passCode, counselorName, date, and time are required' });
    }

    const newBookingObj = {
      id: `b_${Date.now()}`,
      passCode,
      parentName,
      parentEmail,
      parentPhone,
      counselorName,
      serviceTitle,
      date,
      time,
      fee: Number(fee) || 1200,
      mode,
      status: 'Upcoming',
      hoursUntilSession: 24,
      paymentMethod,
      note,
      createdAt: new Date().toISOString()
    };

    // Try MongoDB
    try {
      if (Booking.db?.readyState === 1) {
        await Booking.create(newBookingObj);
      }
    } catch (e) {
      console.warn('[MongoDB write fallback to disk]:', e.message);
    }

    // Persist to Disk
    const all = getBookingsFromDisk();
    const existingIndex = all.findIndex(b => b.passCode === passCode);
    if (existingIndex >= 0) {
      all[existingIndex] = { ...all[existingIndex], ...newBookingObj };
    } else {
      all.unshift(newBookingObj);
    }
    saveBookingsToDisk(all);

    // Broadcast Real-time Push Notification to Counselor & Parent
    if (req.io) {
      console.log(`[Realtime Booking Push] New Session Booked for ${counselorName} (Pass: ${passCode})`);
      req.io.emit('push_live_booking', newBookingObj);
    }

    res.status(201).json({ success: true, booking: newBookingObj });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update booking (reschedule, complete, cancel)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Try MongoDB
    try {
      if (Booking.db?.readyState === 1) {
        await Booking.findOneAndUpdate({ $or: [{ _id: id }, { id }, { passCode: id }] }, updates, { new: true });
      }
    } catch (e) {}

    // Disk update
    const all = getBookingsFromDisk();
    const idx = all.findIndex(b => b.id === id || b.passCode === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], ...updates };
      saveBookingsToDisk(all);

      if (req.io && updates.status === 'Cancelled') {
        req.io.emit('push_live_cancellation', { passCode: all[idx].passCode });
      }

      return res.json({ success: true, booking: all[idx] });
    }

    res.status(404).json({ success: false, error: 'Booking not found' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
