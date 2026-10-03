import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' }
  ]
};

// Synthetic Animated Video Stream (Warm Guidance Light Theme) to guarantee video preview is never black
export function createSyntheticCameraStream(name = 'Participant', role = 'User') {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');
  let frame = 0;
  let intervalId = null;

  const renderFrame = () => {
    frame++;
    // Warm Guidance Light Gradient Background
    const grad = ctx.createLinearGradient(0, 0, 640, 480);
    grad.addColorStop(0, role === 'Doctor' ? '#F2FCF8' : '#FAF8FF');
    grad.addColorStop(0.5, role === 'Doctor' ? '#E6F7F0' : '#F0EBFF');
    grad.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 480);

    // Subtle soft background rings
    const waveRadius = 75 + Math.sin(frame * 0.08) * 8;
    ctx.beginPath();
    ctx.arc(320, 190, waveRadius + 22, 0, Math.PI * 2);
    ctx.strokeStyle = role === 'Doctor' ? 'rgba(18, 109, 85, 0.12)' : 'rgba(91, 72, 214, 0.12)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(320, 190, waveRadius + 10, 0, Math.PI * 2);
    ctx.strokeStyle = role === 'Doctor' ? 'rgba(18, 109, 85, 0.22)' : 'rgba(91, 72, 214, 0.22)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Central Avatar Circle
    ctx.beginPath();
    ctx.arc(320, 190, waveRadius, 0, Math.PI * 2);
    ctx.fillStyle = role === 'Doctor' ? '#126D55' : '#5B48D6';
    ctx.fill();
    ctx.shadowColor = 'rgba(91, 72, 214, 0.25)';
    ctx.shadowBlur = 16;

    // Initial Letter
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 50px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((name || 'U').charAt(0).toUpperCase(), 320, 190);

    // Role Indicator Badge
    ctx.beginPath();
    ctx.arc(365, 235, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = role === 'Doctor' ? '#126D55' : '#5B48D6';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = role === 'Doctor' ? '#126D55' : '#5B48D6';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(role === 'Doctor' ? '🩺' : '👤', 365, 236);

    // Floating Participant Card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(130, 295, 380, 56, 16);
    } else {
      ctx.rect(130, 295, 380, 56);
    }
    ctx.fill();
    ctx.strokeStyle = '#E4DFF7';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#1A1540';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(name, 320, 318);

    ctx.fillStyle = '#00533F';
    ctx.font = '600 12px sans-serif';
    ctx.fillText(role === 'Doctor' ? '🟢 Specialist Ready • Video Connected' : '🟢 Consultation Room • Feed Active', 320, 338);
  };

  renderFrame();
  intervalId = setInterval(renderFrame, 33); // 30 FPS rock-solid rendering even offscreen

  const stream = canvas.captureStream(30);

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      const actx = new AudioCtx();
      const osc = actx.createOscillator();
      const dst = actx.createMediaStreamDestination();
      osc.connect(dst);
      osc.start();
      const [dummyAudioTrack] = dst.stream.getAudioTracks();
      dummyAudioTrack.enabled = false;
      stream.addTrack(dummyAudioTrack);
    }
  } catch (err) {
    console.debug('AudioContext dummy track err', err);
  }

  stream._stopSynthetic = () => {
    if (intervalId) clearInterval(intervalId);
  };

  return stream;
}

export function useWebRTC({ socket, passCode, userRole = 'Parent', userName = 'User', isOpen }) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('idle'); // idle | acquiring | waiting | connecting | connected | disconnected | failed
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHardwareMedia, setIsHardwareMedia] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [peerInfo, setPeerInfo] = useState(null);

  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const isInitiatorRef = useRef(false);
  const iceCandidatesQueue = useRef([]);

  // 1. Initialize PeerConnection
  const createPeerConnection = useCallback((socketInstance) => {
    if (pcRef.current) return pcRef.current;

    console.log('[WebRTC Hook] Initializing RTCPeerConnection with STUN servers...');
    const pc = new RTCPeerConnection(DEFAULT_ICE_SERVERS);

    // Attach local media tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    // Handle incoming remote media stream
    pc.ontrack = (event) => {
      console.log('[WebRTC Hook] 🎥 Remote Track Received:', event.track.kind);
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      } else {
        const inboundStream = new MediaStream([event.track]);
        setRemoteStream(inboundStream);
      }
      setConnectionStatus('connected');
    };

    // Monitor Connection State
    pc.onconnectionstatechange = () => {
      console.log('[WebRTC Hook] Connection State Changed:', pc.connectionState);
      if (pc.connectionState === 'connected') {
        setConnectionStatus('connected');
      } else if (pc.connectionState === 'connecting') {
        setConnectionStatus('connecting');
      } else if (pc.connectionState === 'disconnected') {
        setConnectionStatus('disconnected');
      } else if (pc.connectionState === 'failed') {
        setConnectionStatus('failed');
      }
    };

    pcRef.current = pc;
    return pc;
  }, [passCode, userRole]);

  // 2. Start WebRTC Session when Modal Opens
  useEffect(() => {
    if (!isOpen || !passCode) return;

    let mounted = true;
    let bc = null;
    let presenceTimer = null;
    let httpPollTimer = null;
    let lastSignalTimestamp = 0;
    const seenSignalIds = new Set();

    // Deterministic role: Parent initiates the offer, Doctor answers
    const isOfferer = userRole === 'Parent';

    async function initCall() {
      try {
        setConnectionStatus('acquiring');
        setCameraError('');

        let stream = null;

        if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
              audio: true
            });
            setIsHardwareMedia(true);
          } catch (e1) {
            console.warn('[WebRTC Hook] High-res camera request failed, trying simple video+audio:', e1);
            try {
              stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
              setIsHardwareMedia(true);
            } catch (e2) {
              console.warn('[WebRTC Hook] Video+Audio failed, attempting video-only (e.g. desktop with no mic):', e2);
              try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setIsHardwareMedia(true);
              } catch (e3) {
                console.warn('[WebRTC Hook] Video-only failed, attempting audio-only:', e3);
                try {
                  stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                  setIsHardwareMedia(true);
                } catch (e4) {
                  console.warn('[WebRTC Hook] Hardware media devices unavailable, falling back to verified studio camera:', e4);
                }
              }
            }
          }
        }

        // If no video stream was granted (no webcam, blocked permissions, or already busy in another app)
        if (!stream || stream.getVideoTracks().length === 0) {
          const synth = createSyntheticCameraStream(userName, userRole);
          if (stream && stream.getAudioTracks().length > 0) {
            synth.addTrack(stream.getAudioTracks()[0]);
          }
          stream = synth;
          setIsHardwareMedia(false);
          setCameraError('Virtual Studio Camera Active (Physical webcam busy or ungranted)');
        }

        if (!mounted) {
          stream?.getTracks().forEach(t => t.stop());
          return;
        }

        localStreamRef.current = stream;
        setLocalStream(stream);
        console.log('[WebRTC Hook] ✅ Local Camera Stream Acquired.');

        // Create PeerConnection
        const pc = createPeerConnection(socket);
        setConnectionStatus('waiting');

        // Multi-Channel Signal Dispatcher
        const sendSignal = (type, payload = {}) => {
          const envelope = {
            passCode,
            type,
            senderRole: userRole,
            userName,
            timestamp: Date.now(),
            ...payload
          };

          // 1. Socket.IO (Direct real-time relay)
          if (socket?.connected) {
            socket.emit(type, envelope);
          }

          // 2. BroadcastChannel (Same-profile cross-tab)
          if (bc) {
            try {
              bc.postMessage(envelope);
            } catch (e) {}
          }

          // 3. HTTP Relay (Cross-profile / Incognito window relay)
          try {
            fetch(`/api/rtc/signal/${encodeURIComponent(passCode)}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ type, payload: envelope, senderRole: userRole, userName })
            }).catch(() => {});
          } catch (e) {}
        };

        // Forward local ICE candidates through all channels
        pc.onicecandidate = (event) => {
          if (event.candidate && passCode) {
            sendSignal('webrtc_ice_candidate', { candidate: event.candidate });
          }
        };

        // Safe offer generator (Guaranteed glare-free)
        const makeOffer = async () => {
          if (!mounted) return;
          const currentPc = pcRef.current;
          if (!currentPc) return;

          if (currentPc.signalingState !== 'stable') {
            console.log('[WebRTC Hook] Signaling state not stable (' + currentPc.signalingState + '), deferring offer');
            return;
          }

          try {
            console.log('[WebRTC Hook] 🚀 Generating SDP Offer as Offerer...');
            setConnectionStatus('connecting');
            const offer = await currentPc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
            await currentPc.setLocalDescription(offer);
            sendSignal('webrtc_offer', { offer });
          } catch (err) {
            console.error('[WebRTC Hook] Error generating SDP offer:', err);
          }
        };

        // Handle incoming SDP Offer
        const handleWebRTCOffer = async ({ offer, senderRole, senderName }) => {
          if (senderRole === userRole) return;
          console.log('[WebRTC Hook] 📨 Received SDP Offer from', senderName || 'Peer');
          setConnectionStatus('connecting');
          if (senderName) setPeerInfo({ userName: senderName, userRole: senderRole });

          const currentPc = pcRef.current;
          if (!currentPc) return;

          try {
            // Handle glare collisions cleanly
            if (currentPc.signalingState !== 'stable') {
              if (!isOfferer) {
                console.warn('[WebRTC Hook] Answerer yielding collision to incoming offer');
                await currentPc.setLocalDescription({ type: 'rollback' }).catch(() => {});
              } else {
                console.warn('[WebRTC Hook] Offerer ignoring duplicate offer collision');
                return;
              }
            }

            await currentPc.setRemoteDescription(new RTCSessionDescription(offer));

            // Drain queued ICE candidates
            while (iceCandidatesQueue.current.length > 0) {
              const cand = iceCandidatesQueue.current.shift();
              if (cand) {
                await currentPc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
              }
            }

            console.log('[WebRTC Hook] 🎯 Creating SDP Answer...');
            const answer = await currentPc.createAnswer();
            await currentPc.setLocalDescription(answer);
            sendSignal('webrtc_answer', { answer });
          } catch (err) {
            console.error('[WebRTC Hook] Error processing offer:', err);
          }
        };

        // Handle incoming SDP Answer
        const handleWebRTCAnswer = async ({ answer, senderRole, senderName }) => {
          if (senderRole === userRole) return;
          console.log('[WebRTC Hook] 📨 Received SDP Answer from', senderName || 'Peer');
          if (senderName) setPeerInfo({ userName: senderName, userRole: senderRole });

          const currentPc = pcRef.current;
          if (!currentPc) return;

          try {
            if (currentPc.signalingState === 'have-local-offer') {
              await currentPc.setRemoteDescription(new RTCSessionDescription(answer));

              // Drain queued ICE candidates
              while (iceCandidatesQueue.current.length > 0) {
                const cand = iceCandidatesQueue.current.shift();
                if (cand) {
                  await currentPc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
                }
              }
              setConnectionStatus('connected');
            }
          } catch (err) {
            console.error('[WebRTC Hook] Error processing answer:', err);
          }
        };

        // Handle incoming ICE Candidate
        const handleWebRTCICECandidate = async ({ candidate, senderRole }) => {
          if (senderRole === userRole || !candidate) return;
          const currentPc = pcRef.current;
          if (!currentPc) return;

          try {
            if (currentPc.remoteDescription && currentPc.remoteDescription.type) {
              await currentPc.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {});
            } else {
              iceCandidatesQueue.current.push(candidate);
            }
          } catch (err) {
            console.debug('[WebRTC Hook] ICE Candidate addition error:', err);
          }
        };

        const handlePeerPresence = (data) => {
          if (data.senderRole === userRole) return;
          console.log('[WebRTC Hook] Peer Presence Detected:', data);
          setPeerInfo({ userName: data.userName || (userRole === 'Doctor' ? 'Parent' : 'Doctor'), userRole: data.senderRole });
          setConnectionStatus('connecting');
          if (isOfferer) {
            makeOffer();
          }
        };

        const handlePeerLeft = () => {
          console.log('[WebRTC Hook] Remote Peer Disconnected');
          setRemoteStream(null);
          setPeerInfo(null);
          setConnectionStatus('waiting');
        };

        // Socket.IO Room & Signaling Event Handlers
        const emitJoinRoom = () => {
          if (socket?.connected && passCode) {
            console.log(`[WebRTC Hook] 📡 Emitting join_call_room for passCode: ${passCode} as ${userRole}`);
            socket.emit('join_call_room', { passCode, userRole, userName });
          }
        };

        if (socket) {
          socket.on('room_joined_status', ({ isInitiator, numClients }) => {
            console.log(`[WebRTC Hook] Room Joined: Initiator=${isInitiator}, Clients=${numClients}`);
            isInitiatorRef.current = isInitiator;
            if (numClients > 1 && isOfferer) {
              makeOffer();
            }
          });

          socket.on('peer_joined', (data) => {
            console.log('[WebRTC Hook] Socket peer_joined:', data);
            handlePeerPresence(data);
          });

          socket.on('room_ready', () => {
            console.log('[WebRTC Hook] Socket room_ready: Both peers in room');
            if (isOfferer) {
              makeOffer();
            }
          });

          socket.on('webrtc_offer', handleWebRTCOffer);
          socket.on('webrtc_answer', handleWebRTCAnswer);
          socket.on('webrtc_ice_candidate', handleWebRTCICECandidate);
          socket.on('peer_left', handlePeerLeft);
          socket.on('connect', emitJoinRoom);

          if (socket.connected) {
            emitJoinRoom();
          }
        }

        // BroadcastChannel Setup (For same-profile cross-tab instant sync)
        if (typeof window !== 'undefined' && window.BroadcastChannel) {
          try {
            bc = new BroadcastChannel(`parvarish_call_room_${passCode}`);
            bc.onmessage = (event) => {
              const data = event.data || {};
              if (data.senderRole === userRole) return;

              if (data.type === 'peer_presence' || data.type === 'join_call_room') {
                handlePeerPresence(data);
              } else if (data.type === 'webrtc_offer') {
                handleWebRTCOffer(data);
              } else if (data.type === 'webrtc_answer') {
                handleWebRTCAnswer(data);
              } else if (data.type === 'webrtc_ice_candidate') {
                handleWebRTCICECandidate(data);
              } else if (data.type === 'leave_call_room') {
                handlePeerLeft();
              }
            };
          } catch (e) {
            console.debug('BroadcastChannel error', e);
          }
        }

        // Announce initial presence across all channels
        sendSignal('peer_presence', { userName, senderRole: userRole });

        // Presence Heartbeat (Every 2.5s until connected)
        presenceTimer = setInterval(() => {
          if (!mounted) return;
          const currentPc = pcRef.current;
          if (!currentPc || currentPc.connectionState === 'connected') return;

          emitJoinRoom();
          sendSignal('peer_presence', { userName, senderRole: userRole });
        }, 2500);

        // HTTP Signaling Poll Relay (Every 1s for Incognito / Cross-Profile tabs)
        httpPollTimer = setInterval(async () => {
          if (!mounted) return;
          const currentPc = pcRef.current;
          if (!currentPc || currentPc.connectionState === 'connected') return;

          try {
            const resp = await fetch(`/api/rtc/signal/${encodeURIComponent(passCode)}?since=${lastSignalTimestamp}`);
            if (!resp.ok) return;
            const data = await resp.json();
            if (data.timestamp) lastSignalTimestamp = data.timestamp;

            if (Array.isArray(data.signals)) {
              for (const sig of data.signals) {
                if (seenSignalIds.has(sig.id)) continue;
                seenSignalIds.add(sig.id);

                if (sig.senderRole === userRole) continue;

                if (sig.type === 'peer_presence') {
                  handlePeerPresence({ userName: sig.userName, senderRole: sig.senderRole });
                } else if (sig.type === 'webrtc_offer' && sig.payload?.offer) {
                  handleWebRTCOffer({ offer: sig.payload.offer, senderRole: sig.senderRole, senderName: sig.userName });
                } else if (sig.type === 'webrtc_answer' && sig.payload?.answer) {
                  handleWebRTCAnswer({ answer: sig.payload.answer, senderRole: sig.senderRole, senderName: sig.userName });
                } else if (sig.type === 'webrtc_ice_candidate' && sig.payload?.candidate) {
                  handleWebRTCICECandidate({ candidate: sig.payload.candidate, senderRole: sig.senderRole });
                }
              }
            }
          } catch (e) {}
        }, 1000);

      } catch (err) {
        console.error('[WebRTC Hook] Camera Access Error:', err);
        setCameraError(err.message || 'Camera/Microphone permission denied.');
        setConnectionStatus('failed');
      }
    }

    initCall();

    return () => {
      mounted = false;
      console.log('[WebRTC Hook] Cleaning up WebRTC Session...');

      if (presenceTimer) clearInterval(presenceTimer);
      if (httpPollTimer) clearInterval(httpPollTimer);

      if (bc) {
        try {
          bc.postMessage({ type: 'leave_call_room', senderRole: userRole });
          bc.close();
        } catch (e) {
          console.debug(e);
        }
      }

      if (socket) {
        socket.emit('leave_call_room', { passCode });
        socket.off('room_joined_status');
        socket.off('peer_joined');
        socket.off('room_ready');
        socket.off('webrtc_offer');
        socket.off('webrtc_answer');
        socket.off('webrtc_ice_candidate');
        socket.off('peer_left');
        socket.off('connect');
      }

      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }

      setLocalStream(null);
      setRemoteStream(null);
      setConnectionStatus('idle');
    };
  }, [isOpen, passCode, socket, userRole, userName, createPeerConnection]);

  // Toggle Microphone
  const toggleMic = async () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };

  // Toggle Video Camera or Request Real Webcam if on Virtual
  const toggleVideo = async () => {
    if (!isHardwareMedia) {
      // If currently on synthetic camera, clicking video button starts real camera
      await startRealMedia();
      return;
    }

    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  // User-Initiated Explicit Real Hardware Media Acquisition (Triggers browser permissions)
  const startRealMedia = async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera & microphone are not supported in this browser.');
      return false;
    }

    try {
      console.log('[WebRTC Hook] 🎥 User requested real hardware webcam/mic activation...');
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
          audio: true
        });
      } catch (err1) {
        console.warn('[WebRTC Hook] High-res video+audio request failed, trying standard video+audio:', err1);
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        } catch (err2) {
          console.warn('[WebRTC Hook] Video+Audio failed, attempting video-only:', err2);
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
          } catch (err3) {
            console.warn('[WebRTC Hook] Video-only failed, attempting audio-only:', err3);
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          }
        }
      }

      if (!stream) {
        throw new Error('No physical camera or microphone was granted or available.');
      }

      // Stop synthetic animation
      if (localStreamRef.current?._stopSynthetic) {
        localStreamRef.current._stopSynthetic();
      }

      // If video only, add silent audio track
      if (stream.getAudioTracks().length === 0) {
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            const actx = new AudioCtx();
            const dst = actx.createMediaStreamDestination();
            const [silentAudio] = dst.stream.getAudioTracks();
            silentAudio.enabled = false;
            stream.addTrack(silentAudio);
          }
        } catch (e) {}
      }

      localStreamRef.current = stream;
      setLocalStream(stream);
      setIsHardwareMedia(true);
      setIsVideoOn(true);
      setIsMicOn(true);
      setCameraError('');

      // Replace tracks on active RTCPeerConnection for remote peer
      if (pcRef.current) {
        const senders = pcRef.current.getSenders();
        stream.getTracks().forEach(newTrack => {
          const sender = senders.find(s => s.track && s.track.kind === newTrack.kind);
          if (sender) {
            sender.replaceTrack(newTrack).catch(e => console.warn('replaceTrack err:', e));
          } else {
            pcRef.current.addTrack(newTrack, stream);
          }
        });
      }

      console.log('[WebRTC Hook] ✅ Real Hardware Stream Successfully Activated!');
      return true;
    } catch (err) {
      console.warn('[WebRTC Hook] Failed to activate real camera/mic:', err);
      const isDenied = err.name === 'NotAllowedError' || err.message?.includes('Permission');
      const errorMsg = isDenied
        ? "Camera/Mic permission is blocked. Click the lock/camera icon in your address bar (top-left of URL), set Camera & Mic to 'Allow', then click 'Try Camera Again'."
        : (err.message || 'Physical camera busy in another tab or unavailable.');
      setCameraError(errorMsg);
      return false;
    }
  };

  // Loopback / Single-Window Self-Test Simulation Trigger
  const triggerLoopbackTest = () => {
    let currentLocal = localStreamRef.current;
    if (!currentLocal) {
      currentLocal = createSyntheticCameraStream(userName, userRole);
      localStreamRef.current = currentLocal;
      setLocalStream(currentLocal);
    }
    const doctorStream = createSyntheticCameraStream(userRole === 'Doctor' ? 'Parent (Priya Sharma)' : 'Dr. Sameer (Child Psychologist)', userRole === 'Doctor' ? 'Parent' : 'Doctor');
    setRemoteStream(doctorStream);
    setConnectionStatus('connected');
    setPeerInfo({
      userName: userRole === 'Doctor' ? 'Priya Sharma (Parent)' : 'Dr. Sameer (Child Psychologist)',
      userRole: userRole === 'Doctor' ? 'Parent' : 'Doctor'
    });
  };

  return {
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
  };
}
