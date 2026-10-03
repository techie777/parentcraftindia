import { io } from 'socket.io-client';

const API_BASE = '/api';

export const socket = io(window.location.origin.replace('3000', '5000'), {
  autoConnect: true,
  transports: ['websocket', 'polling']
});

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('parvarish_token');
  const currentUser = localStorage.getItem('parvarish_user');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(currentUser ? { 'x-demo-user': currentUser } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (err) {
    console.warn(`[API Fetch Warning] ${endpoint}:`, err.message);
    throw err;
  }
};
