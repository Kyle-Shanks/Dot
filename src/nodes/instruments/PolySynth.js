import DotAudioNode from 'nodes/DotAudioNode'
import Limiter from 'nodes/dynamics/Limiter'
import MonoSynth from 'nodes/instruments/MonoSynth'

const defaultProps = {
    waveform: 'sine',
    frequency: 440,
    detune: 0,
    gainAttack: 0,
    gainDecay: 0,
    gainSustain: 1,
    gainRelease: 0,
    gainAmount: 0.25,
    filterFrequency: 2000,
    filterQ: 0,
    filterDetune: 0,
    filterGain: 0,
    filterType: 'lowpass',
    filterAttack: 0,
    filterDecay: 0,
    filterSustain: 1,
    filterRelease: 0,
    filterAmount: 6000,
}

class PolySynth extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'PolySynth'
        this.voices = Array(8).fill(0).map(_ => new MonoSynth(this.AC))
        this.limiter = new Limiter(this.AC)

        this.polyphony = 8
        this.voicePos = 0
        this.params = {
            frequency: this.voices.map(voice => voice.getParams().frequency),
            detune: this.voices.map(voice => voice.getParams().detune),
            gain: this.voices.map(voice => voice.getParams().gain),
            filterFrequency: this.voices.map(voice => voice.getParams().filterFrequency),
            filterQ: this.voices.map(voice => voice.getParams().filterQ),
            filterDetune: this.voices.map(voice => voice.getParams().filterDetune),
            filterGain: this.voices.map(voice => voice.getParams().filterGain),
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.voices.forEach((voice) => {
            voice.setWaveform(initProps.waveform)
            voice.setFrequency(initProps.frequency)
            voice.setDetune(initProps.detune)
            voice.setGainAttack(initProps.gainAttack)
            voice.setGainDecay(initProps.gainDecay)
            voice.setGainSustain(initProps.gainSustain)
            voice.setGainRelease(initProps.gainRelease)
            voice.setGainAmount(initProps.gainAmount)
            voice.setFilterType(initProps.filterType)
            voice.setFilterFrequency(initProps.filterFrequency)
            voice.setFilterQ(initProps.filterQ)
            voice.setFilterDetune(initProps.filterDetune)
            voice.setFilterGain(initProps.filterGain)
            voice.setFilterAttack(initProps.filterAttack)
            voice.setFilterDecay(initProps.filterDecay)
            voice.setFilterSustain(initProps.filterSustain)
            voice.setFilterRelease(initProps.filterRelease)
            voice.setFilterAmount(initProps.filterAmount)

            voice.connect(this.limiter)
        })
    }

    // --- Public Methods ---
    // - Getters -
    getOutputs = () => [this.limiter]

    // Oscillator
    getWaveform = () => this.voices[0].getWaveform()
    getDetune = () => this.voices[0].getDetune()
    // Gain Envelope
    getGainAttack = () => this.voices[0].getGainAttack()
    getGainDecay = () => this.voices[0].getGainDecay()
    getGainSustain = () => this.voices[0].getGainSustain()
    getGainRelease = () => this.voices[0].getGainRelease()
    getGainAmount = () => this.voices[0].getGainAmount()
    // Filter
    getFilterFrequency = () => this.voices[0].getFilterFrequency()
    getFilterDetune = () => this.voices[0].getFilterDetune()
    getFilterQ = () => this.voices[0].getFilterQ()
    getFilterGain = () => this.voices[0].getFilterGain()
    getFilterType = () => this.voices[0].getFilterType()
    // Filter Envelope
    getFilterAttack = () => this.voices[0].getFilterAttack()
    getFilterDecay = () => this.voices[0].getFilterDecay()
    getFilterSustain = () => this.voices[0].getFilterSustain()
    getFilterRelease = () => this.voices[0].getFilterRelease()
    getFilterAmount = () => this.voices[0].getFilterAmount()

    // - Setters -
    // Oscillator
    setWaveform = (val) => this.voices.forEach(voice => voice.setWaveform(val))
    setDetune = (val, time) => this.voices.forEach(voice => voice.setDetune(val, time))
    // Gain Envelope
    setGainAttack = (val) => this.voices.forEach(voice => voice.setGainAttack(val))
    setGainDecay = (val) => this.voices.forEach(voice => voice.setGainDecay(val))
    setGainSustain = (val) => this.voices.forEach(voice => voice.setGainSustain(val))
    setGainRelease = (val) => this.voices.forEach(voice => voice.setGainRelease(val))
    setGainAmount = (val) => this.voices.forEach(voice => voice.setGainAmount(val))
    // Filter
    setFilterFrequency = (val, time) => this.voices.forEach(voice => voice.setFilterFrequency(val, time))
    setFilterDetune = (val, time) => this.voices.forEach(voice => voice.setFilterDetune(val, time))
    setFilterQ = (val, time) => this.voices.forEach(voice => voice.setFilterQ(val, time))
    setFilterGain = (val, time) => this.voices.forEach(voice => voice.setFilterGain(val, time))
    setFilterType = (val) => this.voices.forEach(voice => voice.setFilterType(val))
    // Filter Envelope
    setFilterAttack = (val) => this.voices.forEach(voice => voice.setFilterAttack(val))
    setFilterDecay = (val) => this.voices.forEach(voice => voice.setFilterDecay(val))
    setFilterSustain = (val) => this.voices.forEach(voice => voice.setFilterSustain(val))
    setFilterRelease = (val) => this.voices.forEach(voice => voice.setFilterRelease(val))
    setFilterAmount = (val) => this.voices.forEach(voice => voice.setFilterAmount(val))

    // - Note Methods -
    noteOn = (note) => {
        // If note is an array of notes, play each
        if (Array.isArray(note)) {
            note.forEach(n => this.noteOn(n))
            return
        }

        // Play single note
        if (!this.voices[this.voicePos].getCurrentNote()) {
            this._voiceNoteOn(this.voices[this.voicePos], note)
        } else {
            const initialPos = this.voicePos
            this._incrementVoicePos()

            while (this.voicePos !== initialPos) {
                if (!this.voices[this.voicePos].currentNote) break
                this._incrementVoicePos()
            }
            this._voiceNoteOn(this.voices[this.voicePos], note)
        }

        this._incrementVoicePos()
    }
    noteOff = (note) => {
        // If note is undefined, release all notes
        if (!note) return this.voices.forEach(voice => this._voiceNoteOff(voice))

        // If note is an array of notes, release each
        if (Array.isArray(note)) return note.forEach(n => this.noteOff(n))

        // Release single note
        const targetVoices = this.voices.filter(voice => voice.getCurrentNote() === note)
        targetVoices.forEach(voice => this._voiceNoteOff(voice))
    }
    noteStop = (note) => {
        // If note is undefined, release all notes
        if (!note) return this.voices.forEach(voice => this._voiceNoteStop(voice))

        // If note is an array of notes, stop each
        if (Array.isArray(note)) return note.forEach(n => this.noteStop(n))

        // Stop single note
        const targetVoices = this.voices.filter(voice => voice.getCurrentNote() === note)
        targetVoices.forEach(voice => this._voiceNoteStop(voice))
    }

    // --- Private Methods ---
    _resetVoicePos = () => this.voicePos = 0
    _incrementVoicePos = () => this.voicePos = (this.voicePos + 1) % this.polyphony

    _voiceNoteOn = (voice, note) => voice.noteOn(note)
    _voiceNoteOff = (voice) => voice.noteOff()
    _voiceNoteStop = (voice) => voice.noteStop()
}

export default PolySynth
