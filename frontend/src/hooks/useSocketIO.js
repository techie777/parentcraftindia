import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

// The backend server URL - auto-detect for local dev vs production
const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

let sharedSocket = null;

function getSharedSocket() {
  if (!sharedSocket && typeof window !== 'undefined') {
    sharedSocket = io(SOCKET_SERVER_URL || undefined, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 1000,
      timeout: 10000,
    });
  }
  return sharedSocket;
}

export function useSocketIO() {
  const socket = getSharedSocket();
  const [isConnected, setIsConnected] = useState(() => socket ? socket.connected : false);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      setIsConnected(true);
      console.log('[Socket.io] ✅ Connected to Signaling Server. Socket ID:', socket.id);
    };

    const handleDisconnect = (reason) => {
      setIsConnected(false);
      console.log('[Socket.io] ❌ Disconnected:', reason);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    if (socket.connected) {
      setIsConnected(true);
    } else if (socket.disconnected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [socket]);

  return { socket, isConnected };
}
