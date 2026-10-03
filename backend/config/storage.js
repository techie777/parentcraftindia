import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

const DEFAULT_SEED_BOOKINGS = [
  {
    id: 'b_101',
    passCode: 'PRV-COUNSEL-948201',
    parentName: 'Priya Sharma',
    parentEmail: 'parent@parvarish.org',
    parentPhone: '9876543210',
    counselorName: 'Dr. Ananya Roy',
    serviceTitle: 'Toddler Screen Addiction & Tantrum Protocol',
    mode: 'video',
    date: '2026-07-27',
    time: '04:00 PM',
    fee: 1200,
    status: 'Upcoming',
    hoursUntilSession: 24,
    paymentMethod: 'upi',
    note: 'Difficulty weaning from screen after school.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b_102',
    passCode: 'PRV-COUNSEL-482019',
    parentName: 'Priya Sharma',
    parentEmail: 'parent@parvarish.org',
    parentPhone: '9876543210',
    counselorName: 'Kavita Verma (M.Sc)',
    serviceTitle: 'Child Motor & Speech Evaluation Session',
    mode: 'chat',
    date: '2026-07-20',
    time: '02:00 PM',
    fee: 800,
    status: 'Completed',
    hoursUntilSession: 0,
    paymentMethod: 'card',
    note: 'Initial milestones check.',
    createdAt: new Date().toISOString()
  }
];

export function getBookingsFromDisk() {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) {
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(DEFAULT_SEED_BOOKINGS, null, 2), 'utf-8');
      return DEFAULT_SEED_BOOKINGS;
    }
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage Error] Failed to read bookings.json:', err);
    return DEFAULT_SEED_BOOKINGS;
  }
}

export function saveBookingsToDisk(bookings) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Storage Error] Failed to write bookings.json:', err);
    return false;
  }
}
