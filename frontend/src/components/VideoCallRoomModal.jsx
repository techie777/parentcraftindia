import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  ShieldCheck, 
  User, 
  Volume2, 
  Maximize2, 
  Sparkles, 
  X, 
  Send, 
  Camera, 
  AlertCircle, 
  RefreshCw, 
  Repeat, 
  Wifi, 
  CheckCircle2,
  Lock,
  ExternalLink,
  Info
} from 'lucide-react';
import { useSocketIO } from '../hooks/useSocketIO';
import { useWebRTC } from '../hooks/useWebRTC';
import { useAuth } from '../context/AuthContext';

export default function VideoCallRoomModal({ isOpen, onClose, passCode = 'PRV-COUNSEL-948201', counselorName = 'Dr. Ananya Roy' }) {
  const { user } = useAuth();
  const { socket } = useSocketIO();

  const userRole = user?.role === 'expert' ? 'Doctor' : 'Parent';
  const userName = user?.name || (userRole === 'Doctor' ? counselorName : 'Priya Sharma');

  // Integrated WebRTC Hook
  const {
    localStream,
    remoteStream,
    connectionStatus,
    isMicOn,
    isVideoOn,
    isHardwareMedia,
    cameraError,
    peerInfo,
    toggleMic,
    toggleVideo,
    startRealMedia,
    triggerLoopbackTest
  } = useWebRTC({
    socket,
    passCode,
    userRole,
    userName,
    isOpen
  });

  // UI State
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isLocalMainScreen, setIsLocalMainScreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [messages, setMessages] = useState([
    { sender: counselorName, text: 'Hello! Welcome to our confidential parenting video consultation room.', time: 'System' }
  ]);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatBcRef = useRef(null);

  const bindLocalVideo = (node) => {
    localVideoRef.current = node;
    if (node && localStream) {
      if (node.srcObject !== localStream) node.srcObject = localStream;
      node.play().catch(() => {});
    }
  };

  const bindRemoteVideo = (node) => {
    remoteVideoRef.current = node;
    if (node && remoteStream) {
      if (node.srcObject !== remoteStream) node.srcObject = remoteStream;
      node.play().catch(() => {
        node.muted = true;
        node.play().catch(() => {});
      });
    }
  };

  // Bind local stream to local video element
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play().catch(() => {});
    }
  }, [localStream, isLocalMainScreen]);

  // Bind remote stream to remote video element
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play().catch(() => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.muted = true;
          remoteVideoRef.current.play().catch(() => {});
        }
      });
    }
  }, [remoteStream, isLocalMainScreen]);

  // Socket & BroadcastChannel In-Call Chat Listener
  useEffect(() => {
    if (!isOpen || !passCode) return;

    const handleInCallMessage = (msg) => {
      setMessages(prev => [...prev, msg]);
    };

    if (socket) {
      socket.on('receive_incall_message', handleInCallMessage);
    }

    if (typeof window !== 'undefined' && window.BroadcastChannel) {
      chatBcRef.current = new BroadcastChannel(`parvarish_chat_${passCode}`);
      chatBcRef.current.onmessage = (event) => {
        if (event.data?.type === 'chat_message' && event.data?.message) {
          handleInCallMessage(event.data.message);
        }
      };
    }

    return () => {
      if (socket) {
        socket.off('receive_incall_message', handleInCallMessage);
      }
      if (chatBcRef.current) {
        chatBcRef.current.close();
      }
    };
  }, [socket, isOpen, passCode]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: `${userName} (${userRole})`,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);

    if (socket?.connected) {
      socket.emit('send_incall_message', { passCode, message: newMsg });
    }

    if (chatBcRef.current) {
      chatBcRef.current.postMessage({ type: 'chat_message', message: newMsg });
    }

    setChatInput('');
  };

  const handleCopyPassCode = () => {
    navigator.clipboard.writeText(passCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#FAF8FF] flex flex-col animate-in fade-in duration-200 max-w-full overflow-hidden select-none font-sans">
      
      {/* =======================================================================
          TOP HEADER BAR (SUPER LIGHT WARM GUIDANCE THEME)
          ======================================================================= */}
      <div className="py-2.5 px-3 sm:px-6 bg-white/95 backdrop-blur-md border-b border-[#E4DFF7] shadow-[0_1px_8px_rgba(91,72,214,0.06)] flex items-center justify-between gap-2 max-w-full overflow-hidden">
        
        {/* Left: Specialist Avatar & Room Passcode */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#5B48D6] via-[#7D6BEE] to-[#FF8F7A] p-[2px] flex items-center justify-center flex-shrink-0 shadow-sm">
            <div className="w-full h-full bg-[#FAF8FF] rounded-[14px] flex items-center justify-center p-1">
              <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="#EDE8FF" />
                <path d="M9 22C9 16.5 13 12 18 12C23 12 27 16.5 27 22" stroke="#5B48D6" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="18" cy="8" r="3.2" fill="#5B48D6" />
                <circle cx="18" cy="16.5" r="2.4" fill="#FF8F7A" />
                <path d="M15 22C15 20.5 16.5 19 18 20.2C19.5 19 21 20.5 21 22C21 23.5 18 25.5 18 25.5C18 25.5 15 23.5 15 22Z" fill="#126D55" />
              </svg>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-xs sm:text-sm font-extrabold text-[#1A1540] truncate max-w-[130px] sm:max-w-none">
                {counselorName}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center space-x-1 flex-shrink-0 ${
                connectionStatus === 'connected' 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-xs'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                <span>
                  {connectionStatus === 'connected' && 'Connected (Encrypted)'}
                  {connectionStatus === 'connecting' && 'Connecting...'}
                  {connectionStatus === 'waiting' && 'Waiting for peer...'}
                  {connectionStatus === 'acquiring' && 'Accessing camera...'}
                  {connectionStatus === 'failed' && 'Ready to Connect'}
                </span>
              </span>
            </div>
            <div className="text-[10px] text-[#5E5A80] font-mono flex items-center gap-1.5 mt-0.5">
              <span>Passcode:</span>
              <span className="font-bold text-[#5B48D6] bg-[#F0EBFF] px-1.5 py-0.2 rounded">{passCode}</span>
            </div>
          </div>
        </div>

        {/* Right Header Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
          
          {/* Start Real Webcam Button */}
          {!isHardwareMedia ? (
            <button
              onClick={startRealMedia}
              className="py-1 px-2.5 sm:px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[10px] sm:text-xs font-bold shadow-sm flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all"
              title="Click to turn on your physical webcam and microphone"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Start Real Cam</span>
            </button>
          ) : (
            <span className="hidden md:inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Real Cam Active</span>
            </span>
          )}

          {/* Swap Feeds Button */}
          <button
            onClick={() => setIsLocalMainScreen(!isLocalMainScreen)}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-[#F6F1FF] text-[#1A1540] text-xs font-semibold flex items-center space-x-1 border border-[#E4DFF7] shadow-xs cursor-pointer"
            title="Swap Video Feeds"
          >
            <Repeat className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B48D6]" />
            <span className="hidden sm:inline">Swap Feeds</span>
          </button>

          {/* In-Call Chat Drawer Toggle */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 border transition-all cursor-pointer ${
              showChat 
                ? 'bg-[#5B48D6] text-white border-[#5B48D6] shadow-sm' 
                : 'bg-white hover:bg-[#F6F1FF] text-[#1A1540] border-[#E4DFF7] shadow-xs'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">In-Call Chat</span>
          </button>

          {/* Leave / Close Dialog */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
            title="Exit video consultation"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* =======================================================================
          MAIN VIDEO STAGE & LAYOUT
          ======================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Video Canvas Stage */}
        <div className="flex-1 bg-[#F7F5FF] p-2 sm:p-4 flex flex-col justify-between relative overflow-hidden">
          
          {/* CAMERA / MIC PERMISSION HELPER BANNER (IF BLOCKED BY BROWSER) */}
          {cameraError && (
            <div className="mb-2 p-3 sm:p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm flex items-start justify-between gap-3 text-amber-950 z-30 animate-in fade-in duration-200">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="font-bold">Camera/Microphone Permission: </span>
                  <span>{cameraError}</span>
                  <div className="mt-1 text-[11px] text-amber-800">
                    💡 <strong>Tip:</strong> In Chrome, click the small lock/camera icon on the left of the address bar (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono">localhost:3000</code>), set Camera & Mic to <strong>Allow</strong>, then click <strong>Try Camera Again</strong>.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={startRealMedia}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
              >
                🔄 Try Camera Again
              </button>
            </div>
          )}

          {/* PRIMARY MAIN SCREEN */}
          <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-[#E4DFF7] overflow-hidden relative flex items-center justify-center shadow-[0_12px_36px_-6px_rgba(91,72,214,0.08)]">
            
            {isLocalMainScreen ? (
              /* LOCAL USER CAMERA ON MAIN SCREEN */
              <div className="w-full h-full relative bg-[#F7F5FF] flex items-center justify-center">
                <video
                  ref={bindLocalVideo}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transform -scale-x-100 ${isVideoOn && localStream ? 'block' : 'hidden'}`}
                />

                {(!isVideoOn || !localStream) && (
                  <div className="text-center space-y-2 p-4">
                    <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-[#5E5A80] mx-auto" />
                    <div className="text-xs sm:text-sm font-bold text-[#1A1540]">Camera Off</div>
                  </div>
                )}

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1A1540] text-[10px] sm:text-xs font-bold flex items-center space-x-1.5 border border-[#E4DFF7] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>You ({userName})</span>
                </div>
              </div>
            ) : (
              /* REMOTE PEER STREAM ON MAIN SCREEN */
              <div className="w-full h-full relative bg-[#F7F5FF] flex items-center justify-center">
                {remoteStream ? (
                  <video
                    ref={bindRemoteVideo}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* LIGHT THEME WAITING FOR PEER CARD */
                  <div className="text-center space-y-4 p-5 max-w-sm sm:max-w-md bg-white/90 backdrop-blur-md rounded-3xl border border-[#E4DFF7] shadow-[0_10px_30px_rgba(91,72,214,0.06)] m-4">
                    <div className="w-14 h-14 rounded-full bg-[#F0EBFF] border border-[#E4DFF7] flex items-center justify-center mx-auto shadow-xs">
                      <Wifi className="w-7 h-7 text-[#5B48D6] animate-pulse" />
                    </div>

                    <div className="space-y-1">
                      <div className="text-base font-extrabold text-[#1A1540] leading-snug">
                        {connectionStatus === 'waiting' && `Waiting for ${userRole === 'Doctor' ? 'Parent' : 'Specialist'} to join room...`}
                        {connectionStatus === 'connecting' && 'Establishing Encrypted WebRTC Handshake...'}
                        {connectionStatus === 'failed' && 'Ready to Connect (Click test below)'}
                        {connectionStatus === 'acquiring' && 'Connecting Camera & Microphone...'}
                      </div>
                      <div className="text-xs text-[#5E5A80]">
                        Room Passcode: <span className="font-mono text-[#5B48D6] font-bold bg-[#F0EBFF] px-2 py-0.5 rounded border border-[#E4DFF7]">{passCode}</span>
                      </div>
                    </div>

                    {/* LIVE CALL ACTIONS & TESTING */}
                    <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                      {!isHardwareMedia && (
                        <button
                          type="button"
                          onClick={startRealMedia}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95"
                        >
                          <Camera className="w-4 h-4 text-white" />
                          <span>🎥 Enable Physical Camera & Mic</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={triggerLoopbackTest}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#5B48D6] to-[#7D6BEE] hover:from-[#4F3DBD] text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95"
                      >
                        <Sparkles className="w-4 h-4 text-[#FFDE9E]" />
                        <span>Instant 1-Click Live Call Test</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyPassCode}
                          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-[#F6F1FF] text-[#1A1540] text-xs font-semibold border border-[#E4DFF7] shadow-xs cursor-pointer"
                        >
                          {isCopied ? '✓ Copied' : '📋 Copy Pass'}
                        </button>

                        <button
                          type="button"
                          onClick={() => window.open('/specialist', '_blank')}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#F0EBFF] hover:bg-[#E4DFFF] text-[#5B48D6] text-xs font-bold border border-[#E4DFF7] shadow-xs cursor-pointer"
                        >
                          🚀 Doctor Tab
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {remoteStream && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1A1540] text-[10px] sm:text-xs font-bold flex items-center space-x-1.5 border border-[#E4DFF7] shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <Volume2 className="w-3.5 h-3.5 text-[#5B48D6]" />
                    <span>{peerInfo?.userName || (userRole === 'Doctor' ? 'Parent (Priya Sharma)' : counselorName)}</span>
                  </div>
                )}
              </div>
            )}

            {/* PICTURE-IN-PICTURE (PiP) PREVIEW IN LIGHT THEME */}
            <div
              onClick={() => setIsLocalMainScreen(!isLocalMainScreen)}
              className="absolute top-3 right-3 sm:top-auto sm:bottom-20 sm:right-6 w-28 h-20 sm:w-44 sm:h-32 rounded-xl sm:rounded-2xl bg-white border-2 border-[#5B48D6] shadow-[0_12px_28px_rgba(91,72,214,0.18)] overflow-hidden cursor-pointer hover:scale-105 transition-all z-20"
              title="Click to Swap Video Feed"
            >
              {!isLocalMainScreen ? (
                /* LOCAL USER IN SMALL PIP */
                <div className="w-full h-full relative bg-[#F7F5FF]">
                  <video
                    ref={bindLocalVideo}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transform -scale-x-100 ${isVideoOn && localStream ? 'block' : 'hidden'}`}
                  />

                  {(!isVideoOn || !localStream) && (
                    <div className="w-full h-full bg-[#FAF8FF] flex flex-col items-center justify-center p-1 text-center">
                      <Camera className="w-5 h-5 text-[#5E5A80]" />
                      <span className="text-[8px] text-[#5E5A80] font-bold">Camera Off</span>
                    </div>
                  )}

                  <div className="absolute bottom-1 left-1 text-[8px] sm:text-[9px] font-bold text-[#1A1540] bg-white/95 px-1.5 py-0.5 rounded border border-[#E4DFF7] shadow-xs">
                    You (Swap)
                  </div>
                </div>
              ) : (
                /* REMOTE PEER IN SMALL PIP */
                <div className="w-full h-full relative bg-[#F7F5FF]">
                  {remoteStream ? (
                    <video
                      ref={bindRemoteVideo}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#FAF8FF] flex items-center justify-center p-1 text-center text-[9px] text-[#5E5A80] font-bold">
                      Waiting...
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 text-[8px] sm:text-[9px] font-bold text-[#1A1540] bg-white/95 px-1.5 py-0.5 rounded border border-[#E4DFF7] shadow-xs">
                    {peerInfo?.userName || 'Peer'}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* =======================================================================
              BOTTOM FLOATING CALL CONTROLS (CLEAN SUPER LIGHT WARM GUIDANCE PILL)
              ======================================================================= */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E4DFF7] shadow-[0_12px_32px_-4px_rgba(91,72,214,0.14)] z-30 max-w-[95vw]">
            
            {/* Mic Toggle */}
            <button
              onClick={toggleMic}
              className={`p-2.5 sm:p-3.5 rounded-full transition-all cursor-pointer ${
                isMicOn 
                  ? 'bg-[#F0EBFF] text-[#1A1540] hover:bg-[#E4DFFF]' 
                  : 'bg-rose-600 text-white shadow-md'
              }`}
              title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {isMicOn ? <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B48D6]" /> : <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Video Camera Toggle */}
            <button
              onClick={toggleVideo}
              className={`p-2.5 sm:p-3.5 rounded-full transition-all cursor-pointer ${
                isVideoOn 
                  ? 'bg-[#F0EBFF] text-[#1A1540] hover:bg-[#E4DFFF]' 
                  : 'bg-rose-600 text-white shadow-md'
              }`}
              title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {isVideoOn ? <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B48D6]" /> : <VideoOff className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Swap Feeds */}
            <button
              onClick={() => setIsLocalMainScreen(!isLocalMainScreen)}
              className="p-2.5 sm:p-3.5 rounded-full bg-[#F0EBFF] hover:bg-[#E4DFFF] text-[#5B48D6] transition-all cursor-pointer"
              title="Swap Video Feeds"
            >
              <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Leave Call Button */}
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-rose-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>LEAVE CALL</span>
            </button>

          </div>

        </div>

        {/* =======================================================================
            RIGHT SIDE IN-CALL CHAT DRAWER (SUPER LIGHT THEME)
            ======================================================================= */}
        {showChat && (
          <div className="w-full sm:w-80 bg-white border-l border-[#E4DFF7] shadow-xl flex flex-col justify-between p-4 animate-in slide-in-from-right duration-200 absolute sm:relative inset-0 z-40 sm:z-auto">
            <div className="border-b border-[#E4DFF7] pb-3 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1A1540] uppercase tracking-wider">Confidential In-Call Chat</span>
              <button onClick={() => setShowChat(false)} className="text-[#5E5A80] hover:text-[#1A1540] p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1">
              {messages.map((msg, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#5B48D6]">{msg.sender}</span>
                    <span className="text-[9px] text-[#5E5A80]">{msg.time}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F7F5FF] border border-[#E4DFF7] text-xs text-[#1A1540] leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center space-x-2 pt-2 border-t border-[#E4DFF7]">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type confidential message..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#F6F1FF] border border-[#E4DFF7] text-[#1A1540] placeholder-[#5E5A80] focus:outline-none focus:ring-2 focus:ring-[#5B48D6]"
              />
              <button 
                type="submit" 
                className="p-2 rounded-xl bg-[#5B48D6] text-white hover:bg-[#4F3DBD] transition-colors shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}
