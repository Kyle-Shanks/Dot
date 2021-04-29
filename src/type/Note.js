import { NOTES, clamp, getNoteFrequency, noteRegex } from 'src/util/util'

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
            case 'note': return this.note;
            case 'octave': return this.octave;
            case 'frequency': return this.frequency;
            default: return `${this.note}${this.octave}`;
        }
    }

    // - Setters -
    set = (val) => {
        const match = val.match(noteRegex)
        if (!match) return console.error('Invalid note input')

        this.note = match[1].toUpperCase()
        this.octave = parseInt(match[2])
        this.frequency = this._updateFrequency()
    }
    setNote = (val) => {
        this.note = val
        this._updateFrequency()
    }
    setOctave = (val) => {
        this.octave = clamp(val, 0, 9)
        this._updateFrequency()
    }

    // - Util methods -
    transpose = (semitones) => {
        if (semitones === 0) return
        let idx = NOTES.indexOf(this.note)
        let mod = 0

        if (semitones > 0) {
            while (mod < semitones) {
                idx = (idx + 1) % NOTES.length
                this.note = NOTES[idx]
                if (idx === 0) this.octave++
                mod++
            }
        } else {
            while (mod > semitones) {
                idx = (idx === 0 ? NOTES.length - 1 : idx - 1)
                this.note = NOTES[idx]
                if (idx === NOTES.length - 1) this.octave--
                mod--
            }
        }

        this._updateFrequency()
    }

    // --- Private Methods ---
    _updateFrequency = () => this.frequency = getNoteFrequency(`${this.note}${this.octave}`)
}

export default Note
