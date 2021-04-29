export const minTime = 0.005
export const noteRegex = /^(?![ebEB]#)([a-gA-G]#?)([0-9])$/
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

// MIDI numbers for 0th octave
const midiNoteMap = {
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
}

const midiToNote = (midi) => {
    if (midi < 12 || midi > 120) return
    let octave = 0

    while (midi > 23) {
        midi -= 12
        octave++
    }

    return `${midiNoteMap[midi]}${octave}`
}

export const clamp = (val, min, max) => Math.min(max, Math.max(min, val))

export const getNoteFrequency = (note) => {
    const noteName = note.slice(0, -1)
    const octave = parseInt(note.slice(-1))
    return freqMap[noteName] * Math.pow(2, octave - 4)
}

export const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i)
    return bytes.buffer
}
