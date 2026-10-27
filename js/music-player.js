// ========================================================
// BRAIN WAVES — HIGH-FIDELITY PROCEDURAL CYBER MUSIC ENGINE
// Ambient Cyberpunk, Synthwave & Chillwave Synthesizer
// Zero external dependencies · Web Audio API Native
// ========================================================

const BrainWavesMusic = (function() {
  let audioCtx = null;
  let masterGain = null;
  let compressor = null;
  let delayNode = null;
  let delayFeedback = null;
  let delayFilter = null;
  let analyser = null;
  let isPlaying = false;
  let currentTrackIdx = 0;
  let timerId = null;
  let step = 0;
  let noiseBuffer = null;
  let animFrameId = null;
  let isMuted = false;
  let lastVolume = 0.45;

  const tracks = [
    {
      id: 'neural-drift',
      name: 'Neural Drift',
      genre: 'Cyber Synthwave · 110 BPM',
      bpm: 110,
      mode: 'synthwave',
      desc: 'Driving 80s bassline, punchy cyber drums & cosmic arpeggios'
    },
    {
      id: 'cyber-void',
      name: 'Cyber Void',
      genre: 'Deep Space Ambient · 72 BPM',
      bpm: 72,
      mode: 'ambient',
      desc: 'Lush zero-gravity pads, sub-bass pulse & celestial bell chimes'
    },
    {
      id: 'silicon-pulse',
      name: 'Silicon Pulse',
      genre: 'Lo-Fi Chillwave · 88 BPM',
      bpm: 88,
      mode: 'chillwave',
      desc: 'Mellow warm Rhodes chords, relaxed groove & tape warmth'
    },
    {
      id: 'tokyo-overdrive',
      name: 'Tokyo Overdrive',
      genre: 'Cyberpunk Darksynth · 124 BPM',
      bpm: 124,
      mode: 'darksynth',
      desc: 'High-octane electro pulse, aggressive synth riffs & sharp beats'
    }
  ];

  // MIDI Note to Frequency Helper
  function midiToFreq(m) {
    return 440 * Math.pow(2, (m - 69) / 12);
  }

  // Cyber Chord Progressions (A Minor Cinematic / Neo-Tokyo)
  // Am9, Fmaj7, Cmaj9, Gsus4/Em7
  const chordProgressions = [
    { root: 45, chord: [45, 52, 57, 60, 64] }, // Am9 (A2, E3, A3, C4, E4)
    { root: 41, chord: [41, 48, 53, 57, 60] }, // Fmaj7 (F2, C3, F3, A3, C4)
    { root: 48, chord: [48, 55, 59, 64, 67] }, // Cmaj9 (C3, G3, B3, E4, G4)
    { root: 43, chord: [43, 50, 55, 59, 62] }  // Gadd9 (G2, D3, G3, B3, D4)
  ];

  // Darksynth Progressions (Dm, Bb, Gm, A)
  const darksynthProgressions = [
    { root: 50, chord: [50, 57, 62, 65] }, // Dm (D3, A3, D4, F4)
    { root: 46, chord: [46, 53, 58, 62] }, // Bb (Bb2, F3, Bb3, D4)
    { root: 43, chord: [43, 50, 55, 58] }, // Gm (G2, D3, G3, Bb3)
    { root: 45, chord: [45, 52, 57, 61] }  // A maj (A2, E3, A3, C#4)
  ];

  // Initialize Web Audio Engine
  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      audioCtx = new AudioContextClass();

      // Master Gain
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.45, audioCtx.currentTime);

      // Studio Compressor & Limiter
      compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-18, audioCtx.currentTime);
      compressor.knee.setValueAtTime(24, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(5, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.005, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.2, audioCtx.currentTime);

      // Real-time Analyser for Visualizer
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;

      // Cyber Spatial Delay Bus
      delayNode = audioCtx.createDelay(1.0);
      delayNode.delayTime.setValueAtTime(0.28, audioCtx.currentTime);

      delayFeedback = audioCtx.createGain();
      delayFeedback.gain.setValueAtTime(0.38, audioCtx.currentTime);

      delayFilter = audioCtx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(2200, audioCtx.currentTime);

      // Loop: delay -> filter -> feedback -> delay
      delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayFilter.connect(compressor);

      // Master Chain: masterGain -> compressor -> analyser -> destination
      masterGain.connect(compressor);
      compressor.connect(analyser);
      analyser.connect(audioCtx.destination);

      // Precompute Noise Buffer for crisp snares & hats
      const bufSize = Math.floor(audioCtx.sampleRate * 0.4);
      noiseBuffer = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // --- Sound Generators ---

  // 1. Cyber Kick Drum (Deep punchy sub sweep)
  function playKick(time, punch = 1.0) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.frequency.setValueAtTime(155 * punch, time);
    osc.frequency.exponentialRampToValueAtTime(36, time + 0.12);

    gain.gain.setValueAtTime(0.65, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(time);
    osc.stop(time + 0.17);
  }

  // 2. Cyber Snare / Electronic Clap
  function playSnare(time, snappy = true) {
    if (!audioCtx || !noiseBuffer) return;

    // Body tone
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.08);
    oscGain.gain.setValueAtTime(0.3, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
    osc.connect(oscGain);
    oscGain.connect(masterGain);
    osc.start(time);
    osc.stop(time + 0.1);

    // Noise burst
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = snappy ? 'highpass' : 'bandpass';
    filter.frequency.setValueAtTime(1200, time);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.26, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.13);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // Send a touch to delay
    if (delayNode) {
      const sendGain = audioCtx.createGain();
      sendGain.gain.setValueAtTime(0.08, time);
      noiseGain.connect(sendGain);
      sendGain.connect(delayNode);
    }

    noise.start(time);
    noise.stop(time + 0.14);
  }

  // 3. Cyber Hi-Hat (Crisp Metallic 909 style)
  function playHiHat(time, open = false) {
    if (!audioCtx || !noiseBuffer) return;
    const dur = open ? 0.1 : 0.035;

    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, time);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(open ? 0.14 : 0.09, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    noise.start(time);
    noise.stop(time + dur + 0.01);
  }

  // 4. Synthwave Rolling 16th Bass
  function playBassNote(freq, time, dur, drive = false) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc.type = drive ? 'sawtooth' : 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(drive ? 850 : 550, time);
    filter.frequency.exponentialRampToValueAtTime(140, time + dur);
    filter.Q.setValueAtTime(drive ? 5 : 3.5, time);

    gain.gain.setValueAtTime(0.32, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  // 5. Polyphonic Lush Cyber Pad
  function playPadChord(chordNotes, time, dur) {
    if (!audioCtx) return;
    chordNotes.forEach((m, idx) => {
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      // Slight chorus detune
      const detune = (idx % 2 === 0 ? 5 : -5);
      osc.frequency.setValueAtTime(midiToFreq(m), time);
      osc.detune.setValueAtTime(detune, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, time);
      filter.frequency.linearRampToValueAtTime(1500, time + dur * 0.45);
      filter.frequency.linearRampToValueAtTime(650, time + dur);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.065, time + dur * 0.25);
      gain.gain.linearRampToValueAtTime(0.001, time + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      // Send to spatial delay
      if (delayNode && idx === chordNotes.length - 1) {
        const send = audioCtx.createGain();
        send.gain.setValueAtTime(0.06, time);
        gain.connect(send);
        send.connect(delayNode);
      }

      osc.start(time);
      osc.stop(time + dur + 0.1);
    });
  }

  // 6. Arpeggiator Lead & Shimmer Chimes
  function playArpNote(freq, time, dur, wave = 'sine') {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, time);
    filter.frequency.exponentialRampToValueAtTime(800, time + dur);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    // Echo to delay
    if (delayNode) {
      const send = audioCtx.createGain();
      send.gain.setValueAtTime(0.15, time);
      gain.connect(send);
      send.connect(delayNode);
    }

    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  // Sequencer Engine Tick
  function tick() {
    if (!isPlaying || !audioCtx) return;

    const track = tracks[currentTrackIdx];
    const sixteenthTime = (60 / track.bpm) / 4;
    const now = audioCtx.currentTime;

    const currentBar = Math.floor(step / 16);
    const posInBar = step % 16;
    const progList = (track.mode === 'darksynth') ? darksynthProgressions : chordProgressions;
    const chordObj = progList[currentBar % progList.length];

    // ================= TRACK MODES =================
    if (track.mode === 'synthwave') {
      // 1. Kick on 0, 4, 8, 12 (4-on-the-floor)
      if (posInBar % 4 === 0) {
        playKick(now, 1.0);
      }
      // 2. Snare on 4, 12 (Classic backbeat)
      if (posInBar === 4 || posInBar === 12) {
        playSnare(now, true);
      }
      // 3. Hi-Hats: 16ths with open accents on off-beats
      playHiHat(now, posInBar % 4 === 2);

      // 4. Rolling Bassline: 16th-note octave pulse
      const baseMidi = chordObj.root;
      const bassMidi = (posInBar % 2 === 0) ? baseMidi : baseMidi + 12;
      playBassNote(midiToFreq(bassMidi), now, sixteenthTime * 0.85);

      // 5. Synth Pad at bar start
      if (posInBar === 0) {
        playPadChord(chordObj.chord, now, sixteenthTime * 15.6);
      }

      // 6. Neon Arpeggio (8th notes)
      if (posInBar % 2 === 0) {
        const chordNotes = chordObj.chord;
        const noteIdx = (posInBar / 2) % chordNotes.length;
        const arpMidi = chordNotes[noteIdx] + 12;
        playArpNote(midiToFreq(arpMidi), now, sixteenthTime * 1.6, 'sawtooth');
      }

    } else if (track.mode === 'ambient') {
      // Deep Space Ambient
      // Slow breathing pads
      if (posInBar === 0) {
        playPadChord(chordObj.chord, now, sixteenthTime * 15.8);
      }
      // Gentle soft sub pulse on bar 0 and 8
      if (posInBar === 0 || posInBar === 8) {
        playKick(now, 0.4);
      }
      // Cosmic shimmer chimes
      if (posInBar === 4 || posInBar === 10 || posInBar === 14) {
        const randomNote = chordObj.chord[Math.floor(Math.random() * chordObj.chord.length)] + 24;
        playArpNote(midiToFreq(randomNote), now, sixteenthTime * 2.8, 'sine');
      }

    } else if (track.mode === 'chillwave') {
      // Lo-Fi Chillwave
      // Kick: relaxed syncopated groove (beats 0 and 10)
      if (posInBar === 0 || posInBar === 10) {
        playKick(now, 0.8);
      }
      // Soft snare/clap on 4, 12
      if (posInBar === 4 || posInBar === 12) {
        playSnare(now, false);
      }
      // Soft hi-hat on every 8th note
      if (posInBar % 2 === 0) {
        playHiHat(now, false);
      }
      // Warm Rhodes chords
      if (posInBar === 0) {
        playPadChord(chordObj.chord, now, sixteenthTime * 15.5);
      }
      // Deep warm walking bass
      if (posInBar === 0 || posInBar === 6 || posInBar === 12) {
        playBassNote(midiToFreq(chordObj.root), now, sixteenthTime * 4, false);
      }

    } else if (track.mode === 'darksynth') {
      // Cyberpunk Darksynth
      // Driving kick on 0, 4, 8, 12
      if (posInBar % 4 === 0) {
        playKick(now, 1.25);
      }
      // Aggressive snare on 4, 12
      if (posInBar === 4 || posInBar === 12) {
        playSnare(now, true);
      }
      // Fast rolling hi-hat
      playHiHat(now, posInBar === 2 || posInBar === 6 || posInBar === 10 || posInBar === 14);

      // Distorted Saw Bass (continuous 16th notes with pitch movement)
      const rootMidi = chordObj.root;
      const bassNotes = [rootMidi, rootMidi, rootMidi + 7, rootMidi + 12];
      const bassMidi = bassNotes[posInBar % bassNotes.length];
      playBassNote(midiToFreq(bassMidi), now, sixteenthTime * 0.9, true);

      // Staccato synth chord on beat 0, 6, 12
      if (posInBar === 0 || posInBar === 6 || posInBar === 12) {
        playPadChord(chordObj.chord, now, sixteenthTime * 2.5);
      }
      // Sharp lead arpeggio
      if (posInBar % 2 === 1) {
        const leadMidi = chordObj.chord[posInBar % chordObj.chord.length] + 12;
        playArpNote(midiToFreq(leadMidi), now, sixteenthTime * 1.2, 'sawtooth');
      }
    }

    step++;
    const nextTickMs = (sixteenthTime * 1000);
    timerId = setTimeout(tick, nextTickMs);
  }

  // --- Real-time Visualizer Canvas Loop ---
  function startVisualizerLoop() {
    if (animFrameId) cancelAnimationFrame(animFrameId);

    const canvas = document.getElementById('music-visualizer-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 32);

    function renderFrame() {
      if (!isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Idle line
        ctx.strokeStyle = 'rgba(101, 245, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }

      animFrameId = requestAnimationFrame(renderFrame);

      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 16;
      const barWidth = (canvas.width / numBars) - 2;

      for (let i = 0; i < numBars; i++) {
        const val = dataArray[i * 2] || 0;
        const percent = val / 255;
        const barHeight = Math.max(3, percent * (canvas.height - 2));

        // Cyber Gradient (Cyan to Violet)
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#65F5FF');
        gradient.addColorStop(1, '#9B6BFF');

        ctx.fillStyle = gradient;
        ctx.fillRect(i * (barWidth + 2), canvas.height - barHeight, barWidth, barHeight);
      }
    }

    renderFrame();
  }

  // --- Controls & Lifecycle ---

  function startMusic() {
    initAudioContext();
    if (isPlaying) return;
    isPlaying = true;
    step = 0;
    tick();
    startVisualizerLoop();
    updateUIState();

    const track = tracks[currentTrackIdx];
    if (typeof showToast === 'function') {
      showToast(`🎵 Memutar Musik: ${track.name} (${track.genre})`, 'info');
    }
  }

  function pauseMusic() {
    isPlaying = false;
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    updateUIState();
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    startVisualizerLoop(); // Clears canvas to idle line
  }

  function togglePlay() {
    initAudioContext();
    if (isPlaying) {
      pauseMusic();
      if (typeof showToast === 'function') {
        showToast('⏸ Musik Cyber di-pause.', 'info');
      }
    } else {
      startMusic();
    }
  }

  function setTrack(idx) {
    if (idx >= 0 && idx < tracks.length) {
      currentTrackIdx = idx;
      step = 0;
      updateUIState();
      if (isPlaying) {
        const track = tracks[currentTrackIdx];
        if (typeof showToast === 'function') {
          showToast(`🔀 Beralih ke: ${track.name} (${track.genre})`, 'info');
        }
      }
    }
  }

  function nextTrack() {
    setTrack((currentTrackIdx + 1) % tracks.length);
  }

  function prevTrack() {
    setTrack((currentTrackIdx - 1 + tracks.length) % tracks.length);
  }

  function setVolume(val) {
    const vol = parseFloat(val);
    lastVolume = vol;
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(vol, audioCtx.currentTime);
    }
    isMuted = (vol === 0);
    updateVolumeIcon();
  }

  function toggleMute() {
    const volSlider = document.getElementById('music-volume-slider');
    if (isMuted) {
      setVolume(lastVolume || 0.45);
      if (volSlider) volSlider.value = lastVolume || 0.45;
    } else {
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
      }
      isMuted = true;
      if (volSlider) volSlider.value = 0;
    }
    updateVolumeIcon();
  }

  function updateVolumeIcon() {
    const muteBtn = document.getElementById('music-mute-btn');
    if (!muteBtn) return;
    if (isMuted) {
      muteBtn.innerHTML = '🔇';
    } else if (lastVolume > 0.5) {
      muteBtn.innerHTML = '🔊';
    } else {
      muteBtn.innerHTML = '🔉';
    }
  }

  function toggleWidgetCollapse() {
    const widget = document.getElementById('cyber-music-player');
    if (widget) {
      widget.classList.toggle('collapsed');
    }
  }

  function updateUIState() {
    const playBtn = document.getElementById('music-play-btn');
    const trackTitle = document.getElementById('music-track-title');
    const trackGenre = document.getElementById('music-track-genre');
    const trackDesc = document.getElementById('music-track-desc');
    const playerWidget = document.getElementById('cyber-music-player');
    const navMusicBtn = document.getElementById('music-nav-btn');

    const track = tracks[currentTrackIdx];

    if (trackTitle) trackTitle.textContent = track.name;
    if (trackGenre) trackGenre.textContent = track.genre;
    if (trackDesc) trackDesc.textContent = track.desc;

    const pillLabel = document.getElementById('dock-pill-track-name');
    if (pillLabel) pillLabel.textContent = `🎵 ${track.name}`;

    // Update track selector pill active state
    document.querySelectorAll('.music-pill-track').forEach((pill, idx) => {
      if (idx === currentTrackIdx) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    if (playBtn) {
      if (isPlaying) {
        playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/></svg>`;
        playBtn.classList.add('playing');
        playBtn.setAttribute('title', 'Pause Musik');
      } else {
        playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>`;
        playBtn.classList.remove('playing');
        playBtn.setAttribute('title', 'Putar Musik Cyber');
      }
    }

    if (playerWidget) {
      if (isPlaying) {
        playerWidget.classList.add('active');
      } else {
        playerWidget.classList.remove('active');
      }
    }

    if (navMusicBtn) {
      const isId = (window.BrainWavesI18n && window.BrainWavesI18n.getLang && window.BrainWavesI18n.getLang() === 'id');
      const label = navMusicBtn.querySelector('.music-nav-label') || navMusicBtn.querySelector('.audio-label');
      if (isPlaying) {
        navMusicBtn.classList.add('active');
        if (label) label.textContent = isId ? 'MUSIK AKTIF' : 'MUSIC ON';
        navMusicBtn.setAttribute('title', isId ? 'Hentikan Musik (Pause)' : 'Pause Cyber Music');
      } else {
        navMusicBtn.classList.remove('active');
        if (label) label.textContent = isId ? 'MUSIK' : 'MUSIC';
        navMusicBtn.setAttribute('title', isId ? 'Putar Musik Cyber' : 'Play Cyber Music');
      }
    }
  }

  // Auto initialize UI on load
  document.addEventListener('DOMContentLoaded', () => {
    updateUIState();
    startVisualizerLoop();
  });

  // Re-update labels when language switches
  window.addEventListener('brainwaves:langchange', () => {
    updateUIState();
  });

  return {
    startMusic,
    pauseMusic,
    togglePlay,
    setTrack,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    toggleWidgetCollapse,
    isPlaying: () => isPlaying,
    getCurrentTrack: () => tracks[currentTrackIdx],
    getTracks: () => tracks
  };
})();

// Export globally
window.BrainWavesMusic = BrainWavesMusic;
