import { NOTES, midiNoteMap, noteFreqMap, keyMidiMap, noteRegex } from './constants'

export const clamp = (val, min, max) => Math.min(max, Math.max(min, val))

/**
 * Connect a series of nodes together.
 *
 * @example
 * const AC = new AudioContext()
 * const synth = new Dot.Synth(AC)
 * const chorus = new Dot.Chorus(AC, { amount: 0.2 })
 *
 * Dot.chain(synth, chorus, AC.destination)
 *
 * @param  {...(DotAudioNode|AudioNode|AudioParam)} nodes - Nodes to connect
 */
export const chain = (...nodes) => {
    if (nodes.length < 2) return

    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].connect(nodes[i + 1])
    }
}

const getNoteInfo = (val) => {
    const match = val.match(noteRegex)
    if (!match) return

    return {
        note: match[1].toUpperCase(),
        octave: parseInt(match[2]),
    }
}

/**
 * Get the frequency of the given note.
 *
 * @example
 * Dot.getNoteFrequency('A4') // => 440
 * Dot.getNoteFrequency('A2') // => 110
 *
 * @param {String} note - Note
 * @returns {Number} Note frequency
 */
export const getNoteFrequency = (note) => {
    const noteInfo = getNoteInfo(note)
    return noteInfo ? noteFreqMap[noteInfo.note] * Math.pow(2, noteInfo.octave - 4) : null
}

/**
 * Get full information about a note.
 *
 * @example
 * Dot.parseNote('A4')
 * // => { fullNote: 'A4', note: 'A', octave: 4, frequency: 440, midi: 69 }
 *
 * @param {String} note - Note
 * @returns {Object} Note information
 */
export const parseNote = (note) => {
    const noteInfo = getNoteInfo(note)
    if (!noteInfo) return

    return {
        fullNote: `${noteInfo.note}${noteInfo.octave}`,
        note: noteInfo.note,
        octave: noteInfo.octave,
        frequency: getNoteFrequency(note),
        midi: noteToMidi(note),
    }
}

// Function to parse keyboard key and return note info
export const parseKey = (key, octave = 0) => {
    const midi = keyMidiMap[key] + (octave * 12)
    return parseNote(midiToNote(midi))
}

// Midi util functions
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
