// ========================================================
// BRAIN WAVES — PROCEDURAL CYBER AUDIO SYNTHESIZER
// High-fidelity Web Audio API engine
// ========================================================

const BrainWavesAudio = (function() {
  let audioCtx = null;
  let isSoundEnabled = true;
  let masterGain = null;
  let ambientOsc1 = null;
  let ambientOsc2 = null;
  let ambientFilter = null;
  let ambientGain = null;
  let lfoOsc = null;

  function initContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Auto-init audio context on first user gesture so UI clicks work seamlessly
  document.addEventListener('pointerdown', () => {
    initContext();
  }, { once: true });

  // Futuristic Activation Chime (Plays immediately when user toggles audio ON)
  function playActivationSound() {
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;

      // Dual sweep + bell chime
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C Major 9 pentatonic
      freqs.forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f * 0.8, now + i * 0.06);
        osc.frequency.exponentialRampToValueAtTime(f, now + i * 0.06 + 0.04);

        gain.gain.setValueAtTime(0.18, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.45);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.5);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Tactile Cyber UI Click
  function playClick(freq = 840) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.35, now + 0.06);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  // Soft Hover Chirp
  function playHoverChirp() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.035);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // Wizard Step Advance Chord
  function playStepChord() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A major cyber chord
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.12, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.35);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.38);
      });
    } catch (e) {}
  }

  // Inquiry Submission Success Chime
  function playSuccessChime() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // Triumphant cyber arpeggio
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.7);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.75);
      });
    } catch (e) {}
  }

  // Ambient Cyber Sci-Fi Pad (Warm harmonic drone)
  function startAmbientDrone() {
    if (!audioCtx) return;
    try {
      stopAmbientDrone();

      const now = audioCtx.currentTime;

      // Lowpass filter to keep sound warm and futuristic
      ambientFilter = audioCtx.createBiquadFilter();
      ambientFilter.type = 'lowpass';
      ambientFilter.frequency.setValueAtTime(650, now);

      ambientGain = audioCtx.createGain();
      ambientGain.gain.setValueAtTime(0.001, now);
      ambientGain.gain.exponentialRampToValueAtTime(0.08, now + 1.5); // Smooth fade in

      // Harmonic dual oscillator (220Hz A3 + 329.6Hz E4 perfect 5th)
      ambientOsc1 = audioCtx.createOscillator();
      ambientOsc2 = audioCtx.createOscillator();

      ambientOsc1.type = 'sawtooth';
      ambientOsc1.frequency.setValueAtTime(220, now); // A3

      ambientOsc2.type = 'sine';
      ambientOsc2.frequency.setValueAtTime(329.63, now); // E4

      // LFO for breathing pulsation
      lfoOsc = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfoOsc.frequency.setValueAtTime(0.2, now); // 0.2Hz slow breath
      lfoGain.gain.setValueAtTime(150, now);
      lfoOsc.connect(ambientFilter.frequency);
      lfoOsc.start(now);

      ambientOsc1.connect(ambientFilter);
      ambientOsc2.connect(ambientFilter);
      ambientFilter.connect(ambientGain);
      ambientGain.connect(masterGain);

      ambientOsc1.start(now);
      ambientOsc2.start(now);
    } catch (e) {
      console.warn('Ambient drone start error:', e);
    }
  }

  function stopAmbientDrone() {
    try {
      if (ambientGain && audioCtx) {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      }
      setTimeout(() => {
        if (ambientOsc1) { ambientOsc1.stop(); ambientOsc1.disconnect(); ambientOsc1 = null; }
        if (ambientOsc2) { ambientOsc2.stop(); ambientOsc2.disconnect(); ambientOsc2 = null; }
        if (lfoOsc) { lfoOsc.stop(); lfoOsc.disconnect(); lfoOsc = null; }
        if (ambientFilter) { ambientFilter.disconnect(); ambientFilter = null; }
        if (ambientGain) { ambientGain.disconnect(); ambientGain = null; }
      }, 350);
    } catch (e) {}
  }

  // Toggle Function
  function toggleAudio() {
    initContext();

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isSoundEnabled = !isSoundEnabled;

    const toggleBtn = document.getElementById('audio-toggle-btn');
    if (toggleBtn) {
      if (isSoundEnabled) {
        toggleBtn.classList.add('active');
        toggleBtn.querySelector('.audio-label').textContent = 'AUDIO ON';
        playActivationSound();
        startAmbientDrone();
        if (typeof showToast === 'function') {
          showToast('🔊 Audio FX Diaktifkan! Klik tombol, filter, atau card untuk efek suara.', 'info');
        }
      } else {
        toggleBtn.classList.remove('active');
        toggleBtn.querySelector('.audio-label').textContent = 'AUDIO FX';
        stopAmbientDrone();
        if (typeof showToast === 'function') {
          showToast('🔇 Audio FX Dinonaktifkan.', 'info');
        }
      }
    }
    return isSoundEnabled;
  }

  // Global listener for interactive elements
  document.addEventListener('click', (e) => {
    if (!isSoundEnabled) return;
    const interactive = e.target.closest('button, a, .service-choice-card, .pill-option, .project-card, .filter-btn, .step-circle');
    if (interactive && !interactive.closest('#audio-toggle-btn')) {
      playClick(720);
    }
  });

  return {
    toggleAudio,
    playBlip: playClick,
    playClick,
    playHoverChirp,
    playStepChord,
    playSuccessChime,
    playActivationSound,
    isEnabled: () => isSoundEnabled
  };
})();
