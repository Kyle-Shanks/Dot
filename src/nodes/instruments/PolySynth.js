import DotAudioNode from 'nodes/core/DotAudioNode'
import Limiter from 'nodes/effects/Limiter'
import MonoSynth from 'nodes/instruments/MonoSynth'
import { clamp } from 'src/util/util'

const defaultProps = {
    polyphony: 8,
    waveform: 'sine',
    frequency: 440,
    detune: 0,
    gainAttack: 0,
    gainDecay: 0,
    gainSustain: 1,
    gainRelease: 0,
    gainAmount: 0.15,
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

/**
 * General-purpose polyphonic synth node that supports up to 8 voices.
 * Built using MonoSynths.
 *
 * @example
 * const polySynth = new Dot.PolySynth(AC, { polyphony: 4 })
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.polyphony - The number of voices (default: 8)
 * @param {String} opts.waveform - The waveform of the node's oscillators (default: 'sine')
 * @param {Number} opts.frequency - The frequency of the node's oscillators (default: 440)
 * @param {Number} opts.detune - The detune of the node's oscillators (default: 0)
 * @param {Number} opts.gainAttack - The attack time of the gain envelope (default: 0)
 * @param {Number} opts.gainDecay - The decay time of the gain envelope (default: 0)
 * @param {Number} opts.gainSustain - The sustain value of the gain envelope (default: 1)
 * @param {Number} opts.gainRelease - The release time of the gain envelope (default: 0)
 * @param {Number} opts.gainAmount - The gain modifier of the gain envelope (default: 0.15)
 * @param {Number} opts.filterFrequency - The cutoff frequency of the filter envelope' filter (default: 2000)
 * @param {Number} opts.filterQ - The q value of the filter envelope's filter (default: 0)
 * @param {Number} opts.filterDetune - The detune of the filter envelope's filter (default: 0)
 * @param {Number} opts.filterGain - The gain value of the filter envelope's filter (default: 0)
 * @param {String} opts.filterType - The filter type of the filter envelope's filter (default: 'lowpass')
 * @param {Number} opts.filterAttack - The attack time of the filter envelope (default: 0)
 * @param {Number} opts.filterDecay - The decay time of the filter envelope (default: 0)
 * @param {Number} opts.filterSustain - The sustain value of the filter envelope (default: 1)
 * @param {Number} opts.filterRelease - The release time of the filter envelope (default: 0)
 * @param {Number} opts.filterAmount - The frequency modifier of the filter envelope (default: 6000)
 * @params
 * frequency - The frequency of each of the voices
 * detune - The detune value of each of the voices
 * gain - The gain value of each of the voices
 * filterFrequency - The filter frequncy of each of the voices
 * filterQ - The filter q value of each of the voices
 * filterDetune - The filter detune of each of the voices
 * filterGain - The filter gain of each of the voices
 * @returns {PolySynth} PolySynth Node
 */
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
        this.inputs = null
        this.outputs = [this.limiter]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setPolyphony(initProps.polyphony)

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
    /**
     * Get the polyphony setting of the node
     * @returns {Number} Polyphony setting
     */
    getPolyphony = () => this.polyphony

    // Oscillator
    /**
     * Get the waveform of the node's oscillators
     * @returns {String} Waveform
     */
    getWaveform = () => this.voices[0].getWaveform()

    /**
     * Get the detune of the node's oscillators
     * @returns {Number} Detune value
     */
    getDetune = () => this.voices[0].getDetune()

    // Gain Envelope
    /**
     * Get the attack time of the gain envelope
     * @returns {Number} Attack time
     */
    getGainAttack = () => this.voices[0].getGainAttack()

    /**
     * Get the decay time of the gain envelope
     * @returns {Number} Decay time
     */
    getGainDecay = () => this.voices[0].getGainDecay()

    /**
     * Get the sustain value of the gain envelope
     * @returns {Number} Sustain value
     */
    getGainSustain = () => this.voices[0].getGainSustain()

    /**
     * Get the release time of the gain envelope
     * @returns {Number} Release time
     */
    getGainRelease = () => this.voices[0].getGainRelease()

    /**
     * Get the gain modifier of the gain envelope
     * @returns {Number} Modifier value
     */
    getGainAmount = () => this.voices[0].getGainAmount()

    // Filter
    /**
     * Get the frequency of the filter envelope's filter
     * @returns {Number} Frequency value
     */
    getFilterFrequency = () => this.voices[0].getFilterFrequency()

    /**
     * Get the detune of the filter envelope's filter
     * @returns {Number} Detune value
     */
    getFilterDetune = () => this.voices[0].getFilterDetune()

    /**
     * Get the Q value of the filter envelope's filter
     * @returns {Number} Q value
     */
    getFilterQ = () => this.voices[0].getFilterQ()

    /**
     * Get the gain value of the filter envelope's filter
     * @returns {Number} Gain value
     */
    getFilterGain = () => this.voices[0].getFilterGain()

    /**
     * Get the filter type of the filter envelope's filter
     * @returns {String} Filter type
     */
    getFilterType = () => this.voices[0].getFilterType()

    // Filter Envelope
    /**
     * Get the attack time of the filter envelope
     * @returns {Number} Attack time
     */
    getFilterAttack = () => this.voices[0].getFilterAttack()

    /**
     * Get the decay time of the filter envelope
     * @returns {Number} Decay time
     */
    getFilterDecay = () => this.voices[0].getFilterDecay()

    /**
     * Get the sustain value of the filter envelope
     * @returns {Number} Sustain value
     */
    getFilterSustain = () => this.voices[0].getFilterSustain()

    /**
     * Get the release time of the filter envelope
     * @returns {Number} Release time
     */
    getFilterRelease = () => this.voices[0].getFilterRelease()

    /**
     * Get the frequency modifier of the filter envelope
     * @returns {Number} Modifier value
     */
    getFilterAmount = () => this.voices[0].getFilterAmount()

    // - Setters -
    /**
     * Set the maximum number of active voices for the node
     * @param {Number} val - Polyphony setting
     */
    setPolyphony = (val) => this.polyphony = clamp(val, 1, 8)

    // Oscillator
    /**
     * Set the waveform for each of the node's oscillators.
     * @param {String} val - Waveform
     */
    setWaveform = (val) => this.voices.forEach(voice => voice.setWaveform(val))

    /**
     * Set the detune for each of the node's oscillators.
     * @param {Number} val - Detune value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDetune = (val, time) => this.voices.forEach(voice => voice.setDetune(val, time))

    // Gain Envelope
    /**
     * Set the attack time of the gain envelope.
     * @param {Number} val - Attack time
     */
    setGainAttack = (val) => this.voices.forEach(voice => voice.setGainAttack(val))

    /**
     * Set the attack time of the gain envelope.
     * @param {Number} val - Attack time
     */
    setGainDecay = (val) => this.voices.forEach(voice => voice.setGainDecay(val))

    /**
     * Set the sustain value of the gain envelope.
     * @param {Number} val - Sustain value
     */
    setGainSustain = (val) => this.voices.forEach(voice => voice.setGainSustain(val))

    /**
     * Set the release time of the gain envelope.
     * @param {Number} val - Release time
     */
    setGainRelease = (val) => this.voices.forEach(voice => voice.setGainRelease(val))

    /**
     * Set the gain modifier of the gain envelope.
     * @param {Number} val - Modifier amount
     */
    setGainAmount = (val) => this.voices.forEach(voice => voice.setGainAmount(val))

    // Filter
    /**
     * Set the cutoff frequency of the filter envelope's filter.
     * @param {Number} val - Frequency value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFilterFrequency = (val, time) => this.voices.forEach(voice => voice.setFilterFrequency(val, time))

    /**
     * Set the detune of the filter envelope's filter.
     * @param {Number} val - Detune value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFilterDetune = (val, time) => this.voices.forEach(voice => voice.setFilterDetune(val, time))

    /**
     * Set the Q value of the filter envelope's filter.
     * @param {Number} val - Q value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFilterQ = (val, time) => this.voices.forEach(voice => voice.setFilterQ(val, time))

    /**
     * Set the gain of the filter envelope's filter.
     * @param {Number} val - Gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFilterGain = (val, time) => this.voices.forEach(voice => voice.setFilterGain(val, time))

    /**
     * Set the filter type of the filter envelope's filter.
     * @param {String} val - Filter type
     */
    setFilterType = (val) => this.voices.forEach(voice => voice.setFilterType(val))

    // Filter Envelope
    /**
     * Set the attack time of the filter envelope.
     * @param {Number} val - Attack time
     */
    setFilterAttack = (val) => this.voices.forEach(voice => voice.setFilterAttack(val))

    /**
     * Set the attack time of the filter envelope.
     * @param {Number} val - Attack time
     */
    setFilterDecay = (val) => this.voices.forEach(voice => voice.setFilterDecay(val))

    /**
     * Set the sustain value of the filter envelope.
     * @param {Number} val - Sustain value
     */
    setFilterSustain = (val) => this.voices.forEach(voice => voice.setFilterSustain(val))

    /**
     * Set the release time of the filter envelope.
     * @param {Number} val - Release time
     */
    setFilterRelease = (val) => this.voices.forEach(voice => voice.setFilterRelease(val))

    /**
     * Set the frequency modifier of the filter envelope.
     * @param {Number} val - Modifier amount
     */
    setFilterAmount = (val) => this.voices.forEach(voice => voice.setFilterAmount(val))

    // - Note Methods -
    /**
     * Plays the given note or array of notes.
     * @param {String | Array.<String>} note - Note(s) to be played
     */
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

    /**
     * Releases the note or array of notes given.
     * If a note is not given, it will release all current notes being played.
     * @param {String | Array.<String>} [note] - Note(s) to be released (optional)
     */
    noteOff = (note) => {
        // If note is undefined, release all notes
        if (!note) return this.voices.forEach(voice => this._voiceNoteOff(voice))

        // If note is an array of notes, release each
        if (Array.isArray(note)) return note.forEach(n => this.noteOff(n))

        // Release single note
        const targetVoices = this.voices.filter(voice => voice.getCurrentNote() === note)
        targetVoices.forEach(voice => this._voiceNoteOff(voice, note))
    }

    /**
     * Stops the note or array of notes given.
     * If a note is not given, it will stop all current notes being played.
     * @param {String | Array.<String>} [note] - Note(s) to be stopped (optional)
     */
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
    _voiceNoteOff = (voice, note) => voice.noteOff(note)
    _voiceNoteStop = (voice) => voice.noteStop()
}

export default PolySynth
