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

export const clamp = (val, min, max) => Math.min(max, Math.max(min, val))

// Connect a series of nodes
export const chain = (...nodes) => {
    if (nodes.length < 2) return

    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].connect(nodes[i + 1])
    }
}

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
const noteFreqMap = {
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
const keyMidiMap = {
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
};

export const noteRegex = /^(?![ebEB]#)([a-gA-G]#?)([0-9])$/

const getNoteInfo = (val) => {
    const match = val.match(noteRegex)
    if (!match) return

    return {
        note: match[1].toUpperCase(),
        octave: parseInt(match[2]),
    }
}

// Function to parse note or midi value and return note info
export const parseNote = (val) => {
    const noteInfo = getNoteInfo(val)
    if (!noteInfo) return

    return {
        note: noteInfo.note,
        octave: noteInfo.octave,
        frequency: getNoteFrequency(val),
        midi: noteToMidi(val),
    }
}

// Function to parse keyboard key and return note info
export const parseKey = (key, octave = 0) => {
    const midi = keyMidiMap[key] + (octave * 12)
    return parseNote(midiToNote(midi))
}

export const midiToNote = (val) => {
    let idx = clamp(val, 12, 120)
    let octave = 0

    while (idx > 23) {
        idx -= 12
        octave++
    }

    return `${midiNoteMap[idx]}${octave}`
}
export const noteToMidi = (val) => {
    const noteInfo = getNoteInfo(val)
    return noteInfo ? NOTES.indexOf(noteInfo.note) + 12 * (noteInfo.octave + 1) : null
}

export const getNoteFrequency = (val) => {
    const noteInfo = getNoteInfo(val)
    return noteInfo ? noteFreqMap[noteInfo.note] * Math.pow(2, noteInfo.octave - 4) : null
}

export const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i)
    return bytes.buffer
}
