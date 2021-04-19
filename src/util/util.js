export const minTime = 0.005;
export const WAVEFORM = ['sine', 'triangle', 'square', 'sawtooth'];
export const FILTER_TYPE = [
    'lowpass',
    'highpass',
    'bandpass',
    'allpass',
    'notch',
    'peaking',
    'lowshelf',
    'highshelf',
];

// Frequencies in 4th octave
const freqMap = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88,
};

export const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

export const getNoteFreq = (note) => {
    const noteName = note.slice(0, -1);
    const octave = parseInt(note.slice(-1));
    return freqMap[noteName] * Math.pow(2, octave - 4);
};
