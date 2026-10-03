import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  passCode: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  parentName: {
    type: String,
    required: true
  },
  parentEmail: {
    type: String,
    default: 'parent@parvarish.org'
  },
  parentPhone: {
    type: String,
    default: '9876543210'
  },
  counselorName: {
    type: String,
    required: true
  },
  serviceTitle: {
    type: String,
    default: 'Child Consultation Session'
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    enum: ['video', 'chat', 'call'],
    default: 'video'
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Completed', 'Cancelled', 'Scheduled Today', 'Upcoming (Rescheduled)'],
    default: 'Upcoming'
  },
  hoursUntilSession: {
    type: Number,
    default: 24
  },
  paymentMethod: {
    type: String,
    default: 'upi'
  },
  note: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;
