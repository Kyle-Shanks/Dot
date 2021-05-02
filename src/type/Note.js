import {
    clamp,
    getNoteFrequency,
    midiToNote,
    noteToMidi,
    parseNote,
} from 'src/util/util'

class Note {
    constructor(note = 'A4') {
        this.set(note)
    }

    // --- Public Methods ---
    // - Getters -
    getNote = () => this.note
    getOctave = () => this.octave
    getFrequency = () => this.frequency
    get = (prop) => {
        switch(prop) {
            case 'note': return this.note
            case 'octave': return this.octave
            case 'frequency': return this.frequency
            default: return `${this.note}${this.octave}`
        }
    }

    // - Setters -
    set = (val) => {
        const fullNote = typeof val === 'number' ? midiToNote(val) : val
        const noteInfo = parseNote(fullNote)

        if (!noteInfo) return console.error('Invalid note value')

        this.note = noteInfo.note
        this.octave = noteInfo.octave
        this._updateMidi()
        this._updateFrequency()
    }
    setNote = (val) => {
        this.note = val
        this._updateMidi()
        this._updateFrequency()
    }
    setOctave = (val) => {
        this.octave = clamp(val, 0, 9)
        this._updateMidi()
        this._updateFrequency()
    }

    // - Util methods -
    transpose = (semitones) => {
        if (semitones === 0) return
        const midi = noteToMidi(this.get())
        this.set(clamp(midi + semitones, 12, 120))
    }

    // --- Private Methods ---
    _updateFrequency = () => this.frequency = getNoteFrequency(`${this.note}${this.octave}`)
    _updateMidi = () => this.midi = noteToMidi(`${this.note}${this.octave}`)
}

export default Note
