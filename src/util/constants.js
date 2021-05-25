export const minTime = 0.005
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const OVERSAMPLE = ['none', '2x', '4x']
export const NOISE_TYPE = ['white', 'pink', 'brown']
export const WAVEFORM = ['sine', 'triangle', 'square', 'sawtooth']
export const FILTER_TYPE = [
    'lowpass',
    'highpass',
    'bandpass',
    'allpass',
    'notch',
    'peaking',
    'lowshelf',
    'highshelf',
]

export const noteRegex = /^(?![ebEB]#)([a-gA-G]#?)([0-9])$/

// MIDI numbers for 0th octave
export const midiNoteMap = {
    12: 'C',
    13: 'C#',
    14: 'D',
    15: 'D#',
    16: 'E',
    17: 'F',
    18: 'F#',
    19: 'G',
    20: 'G#',
    21: 'A',
    22: 'A#',
    23: 'B',
}

// Frequencies in 4th octave
export const noteFreqMap = {
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
}

// Key to midi mapping for 0th octave
export const keyMidiMap = {
    'a': 12,
    'w': 13,
    's': 14,
    'e': 15,
    'd': 16,
    'f': 17,
    't': 18,
    'g': 19,
    'y': 20,
    'h': 21,
    'u': 22,
    'j': 23,
    'k': 24,
    'o': 25,
    'l': 26,
    'p': 27,
    ';': 28,
}
