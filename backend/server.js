import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import qaRoutes from './routes/qaRoutes.js';
import milestoneRoutes from './routes/milestoneRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Attach io to req for real-time events in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/qa', qaRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', platform: 'Parvarish MERN Platform', timestamp: new Date().toISOString() });
});

// RTC ICE Credentials Endpoint (STUN + TURN)
app.get('/api/rtc/ice-config', (req, res) => {
  const iceServers = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ];

  if (process.env.TURN_URLS) {
    iceServers.push({
      urls: process.env.TURN_URLS.split(','),
      username: process.env.TURN_USERNAME || '',
      credential: process.env.TURN_CREDENTIAL || ''
    });
  }

  res.json({ iceServers });
});

// Dual-Channel HTTP Signaling Relay for Cross-Tab & Incognito WebRTC
const httpSignalingStore = new Map();

app.post('/api/rtc/signal/:passCode', (req, res) => {
  const { passCode } = req.params;
  const { type, payload, senderRole } = req.body;
  if (!httpSignalingStore.has(passCode)) {
    httpSignalingStore.set(passCode, []);
  }
  const queue = httpSignalingStore.get(passCode);
  const item = { id: `${Date.now()}_${Math.random()}`, type, payload, senderRole, timestamp: Date.now() };
  queue.push(item);
  if (queue.length > 50) queue.shift();
  res.json({ success: true, item });
});

app.get('/api/rtc/signal/:passCode', (req, res) => {
  const { passCode } = req.params;
  const since = parseInt(req.query.since || '0', 10);
  const queue = httpSignalingStore.get(passCode) || [];
  const signals = queue.filter(s => s.timestamp > since);
  res.json({ signals, timestamp: Date.now() });
});

// Socket.io WebRTC Signaling & Notification Events
io.on('connection', (socket) => {
  console.log(`[Socket.io Connected]: Client ${socket.id}`);
  
  socket.on('join_thread', (threadId) => {
    socket.join(`thread:${threadId}`);
    console.log(`Socket ${socket.id} joined room thread:${threadId}`);
  });

  // Vendor / User Personal Room Join
  socket.on('join_vendor_room', (vendorId) => {
    const roomName = `vendor:${vendorId}`;
    socket.join(roomName);
    console.log(`[Socket.io] Client ${socket.id} subscribed to Vendor Push Room: ${roomName}`);
  });

  // 1. Join WebRTC Call Room
  socket.on('join_call_room', ({ passCode, userRole, userName }) => {
    const roomName = `call_room:${passCode}`;
    socket.join(roomName);

    const clientsInRoom = io.sockets.adapter.rooms.get(roomName);
    const numClients = clientsInRoom ? clientsInRoom.size : 0;

    console.log(`[WebRTC Room Join] Socket ${socket.id} (${userName} - ${userRole}) joined ${roomName}. Total participants: ${numClients}`);

    // Notify other peers in room of newcomer
    socket.to(roomName).emit('peer_joined', {
      peerId: socket.id,
      userRole,
      userName,
      numClients
    });

    // Send room status to joining client
    socket.emit('room_joined_status', {
      isInitiator: numClients === 1,
      numClients,
      passCode
    });

    // If 2 or more clients in room, emit room_ready to EVERYONE in the room
    if (numClients >= 2) {
      console.log(`[WebRTC Signaling] 🎯 Room ${roomName} has ${numClients} participants! Emitting room_ready to all.`);
      io.in(roomName).emit('room_ready', {
        passCode,
        numClients
      });
    }
  });

  // 2. Relay WebRTC SDP Offer
  socket.on('webrtc_offer', (data) => {
    const roomName = `call_room:${data.passCode}`;
    console.log(`[WebRTC Signaling] Relaying SDP Offer from ${socket.id} in room ${roomName}`);
    socket.to(roomName).emit('webrtc_offer', {
      ...data,
      senderId: socket.id
    });
  });

  // 3. Relay WebRTC SDP Answer
  socket.on('webrtc_answer', (data) => {
    const roomName = `call_room:${data.passCode}`;
    console.log(`[WebRTC Signaling] Relaying SDP Answer from ${socket.id} in room ${roomName}`);
    socket.to(roomName).emit('webrtc_answer', {
      ...data,
      senderId: socket.id
    });
  });

  // 4. Relay WebRTC ICE Candidates
  socket.on('webrtc_ice_candidate', (data) => {
    const roomName = `call_room:${data.passCode}`;
    socket.to(roomName).emit('webrtc_ice_candidate', {
      ...data,
      senderId: socket.id
    });
  });

  // 5. In-Call Chat Relay
  socket.on('send_incall_message', ({ passCode, message }) => {
    const roomName = `call_room:${passCode}`;
    io.in(roomName).emit('receive_incall_message', message);
  });

  // 6. Broadcast Real-Time Booking Notifications to Vendor Room
  socket.on('new_booking_notification', (bookingData) => {
    console.log(`[Push Alert] Broadcasting Live Booking for ${bookingData.counselorName} (Pass: ${bookingData.passCode})`);
    io.emit('push_live_booking', bookingData);
  });

  socket.on('cancel_booking_notification', (cancelData) => {
    console.log(`[Push Alert] Broadcasting Cancellation for Session ${cancelData.passCode}`);
    io.emit('push_live_cancellation', cancelData);
  });

  // 7. Leave / Disconnect
  socket.on('leave_call_room', ({ passCode }) => {
    const roomName = `call_room:${passCode}`;
    socket.leave(roomName);
    socket.to(roomName).emit('peer_left', { peerId: socket.id });
    console.log(`[WebRTC Room Leave] Socket ${socket.id} left ${roomName}`);
  });

  socket.on('disconnecting', () => {
    for (const room of socket.rooms) {
      if (room.startsWith('call_room:')) {
        socket.to(room).emit('peer_left', { peerId: socket.id });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io Disconnected]: Client ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

// Connect to Database & Start Server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🌱 Parvarish Full-Stack Backend Server Running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`💬 Real-Time Socket.io & WebRTC Signaling Enabled`);
    console.log(`=================================================`);
  });
});
