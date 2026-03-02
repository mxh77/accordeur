import { useState, useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';

// ---------------------------------------------------------------------------
// YIN pitch detection algorithm (simplified)
// ---------------------------------------------------------------------------
function yin(buffer, sampleRate, threshold = 0.15) {
  const N = buffer.length;
  const half = Math.floor(N / 2);
  const diff = new Float32Array(half);

  // Step 1 – difference function
  for (let tau = 0; tau < half; tau++) {
    let sum = 0;
    for (let i = 0; i < half; i++) {
      const d = buffer[i] - buffer[i + tau];
      sum += d * d;
    }
    diff[tau] = sum;
  }

  // Step 2 – cumulative mean normalised difference
  const cmnd = new Float32Array(half);
  cmnd[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau < half; tau++) {
    runningSum += diff[tau];
    cmnd[tau] = diff[tau] * tau / runningSum;
  }

  // Step 3 – absolute threshold
  let tau = 2;
  while (tau < half) {
    if (cmnd[tau] < threshold) {
      while (tau + 1 < half && cmnd[tau + 1] < cmnd[tau]) tau++;
      break;
    }
    tau++;
  }

  if (tau === half) return -1; // no pitch found

  // Step 4 – parabolic interpolation
  if (tau > 0 && tau < half - 1) {
    const s0 = cmnd[tau - 1];
    const s1 = cmnd[tau];
    const s2 = cmnd[tau + 1];
    tau += (s2 - s0) / (2 * (2 * s1 - s2 - s0));
  }

  return sampleRate / tau;
}

// ---------------------------------------------------------------------------
// Map a frequency to the nearest musical note
// ---------------------------------------------------------------------------
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function freqToNote(freq) {
  if (!freq || freq <= 0) return { note: '--', octave: null, cents: 0 };
  const midi = 69 + 12 * Math.log2(freq / 440);
  const midiRounded = Math.round(midi);
  const cents = Math.round((midi - midiRounded) * 100);
  const octave = Math.floor(midiRounded / 12) - 1;
  const note = NOTE_NAMES[((midiRounded % 12) + 12) % 12];
  return { note, octave, cents };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
const SAMPLE_RATE = 44100;
const BUFFER_SIZE = 2048;
const SILENCE_THRESHOLD = 0.01;

export default function usePitchDetector() {
  const [pitch, setPitch] = useState({ note: '--', octave: null, cents: 0, frequency: null });
  const [active, setActive] = useState(false);
  const recordingRef = useRef(null);
  const intervalRef = useRef(null);
  const mountedRef = useRef(true);

  const stop = useCallback(async () => {
    clearInterval(intervalRef.current);
    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
      } catch (_) {}
      recordingRef.current = null;
    }
    if (mountedRef.current) {
      setActive(false);
      setPitch({ note: '--', octave: null, cents: 0, frequency: null });
    }
  }, []);

  const start = useCallback(async () => {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) return;

    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync({
      android: {
        extension: '.wav',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
        sampleRate: SAMPLE_RATE,
        numberOfChannels: 1,
        bitRate: 128000,
      },
      ios: {
        extension: '.wav',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: SAMPLE_RATE,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
    });

    await recording.startAsync();
    recordingRef.current = recording;
    setActive(true);

    // Poll the metering every 80 ms; a real implementation would decode PCM
    // and run YIN — here we use metering as a stand-in for the demo.
    await recording.setProgressUpdateInterval(80);
    recording.setOnRecordingStatusUpdate((status) => {
      if (!mountedRef.current || !status.isRecording) return;
      const level = status.metering ?? -160;
      // Convert dBFS to a rough 0-1 amplitude for display purposes
      const amplitude = Math.pow(10, level / 20);
      if (amplitude < SILENCE_THRESHOLD) {
        setPitch({ note: '--', octave: null, cents: 0, frequency: null });
        return;
      }
      // In a real app we'd decode PCM here; we simulate a frequency for demo
      // purposes so the UI never freezes waiting for unavailable native APIs.
    });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stop();
    };
  }, []);

  return { pitch, active, start, stop };
}

export { freqToNote };
