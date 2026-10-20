// Web Audio API based ambient space hum generator
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let filter: BiquadFilterNode | null = null;
let isPlaying = false;

export function toggleSpaceAudio(): boolean {
  if (isPlaying) {
    stopSpaceAudio();
    return false;
  } else {
    startSpaceAudio();
    return true;
  }
}

export function isAudioPlaying(): boolean {
  return isPlaying;
}

export function startSpaceAudio(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 2);
    masterGain.connect(audioCtx.destination);

    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, audioCtx.currentTime);
    filter.Q.setValueAtTime(2, audioCtx.currentTime);
    filter.connect(masterGain);

    // Deep cosmic fundamental
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
    osc1.connect(filter);
    osc1.start();

    // Harmonics
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110, audioCtx.currentTime); // A2 note
    const gain2 = audioCtx.createGain();
    gain2.gain.value = 0.4;
    osc2.connect(gain2);
    gain2.connect(filter);
    osc2.start();

    isPlaying = true;
  } catch (e) {
    console.warn("Audio playback error:", e);
    isPlaying = false;
  }
}

export function stopSpaceAudio(): void {
  try {
    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
      setTimeout(() => {
        try {
          osc1?.stop();
          osc2?.stop();
          osc1?.disconnect();
          osc2?.disconnect();
          osc1 = null;
          osc2 = null;
        } catch {
          // ignore
        }
      }, 1000);
    }
  } catch {
    // ignore
  }
  isPlaying = false;
}
