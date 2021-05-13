import DotAudioNode from 'nodes/core/DotAudioNode'
import GainEnvelope from 'nodes/components/GainEnvelope'
import Oscillator from 'nodes/sources/Oscillator'
import { getNoteFrequency } from 'src/util/util'

const defaultProps = {
    waveform: 'sine',
    frequency: 440,
    detune: 0,
    gainAttack: 0,
    gainDecay: 0,
    gainSustain: 1,
    gainRelease: 0,
    gainAmount: 0.75,
}

/**
 * An Oscillator connected to a GainEnvelope.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {AudioBuffer} opts.waveform - Initial waveform
 * @param {Boolean} opts.frequency - Frequency of the oscillator
 * @param {Number} opts.detune - Detune value of the oscillator
 * @param {Number} opts.gainAttack - Attack time of the gain envelope
 * @param {Number} opts.gainDecay - Decay time of the gain envelope
 * @param {Number} opts.gainSustain - Sustain value of the gain envelope
 * @param {Number} opts.gainRelease - Release time of the gain envelope
 * @param {Number} opts.gainAmount - Modifier value of the gain envelope
 * @params
 * frequency - Frequency of the oscillator
 * detune - Detune value of the oscillator
 * gain - Gain value of the gain node
 * @returns {Synth} Synth Node
 */
class Synth extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Synth'
        this.osc = new Oscillator(this.AC, { start: true })
        this.gainEnv = new GainEnvelope(this.AC)

        this.currentNote = null
        this.params = {
            frequency: this.osc.getParams().frequency,
            detune: this.osc.getParams().detune,
            gain: this.gainEnv.getParams().gain,
        }
        this.inputs = null
        this.outputs = [this.gainEnv]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setWaveform(initProps.waveform)
        this.setFrequency(initProps.frequency)
        this.setDetune(initProps.detune)
        this.setGainAttack(initProps.gainAttack)
        this.setGainDecay(initProps.gainDecay)
        this.setGainSustain(initProps.gainSustain)
        this.setGainRelease(initProps.gainRelease)
        this.setGainAmount(initProps.gainAmount)

        // Connections
        this.osc.connect(this.gainEnv)
    }

    // --- Public Methods ---
    // - Getters -
    /**
     * Get the note that is currently being played.
     * @returns {String} Current note
     */
    getCurrentNote = () => this.currentNote

    // Oscillator
    /**
     * Get the waveform of the oscillator.
     * @returns {String} Oscillator type
     */
    getWaveform = () => this.osc.getType()

    /**
     * Get the frequency of the oscillator.
     * @returns {Number} Oscillator frequency
     */
    getFrequency = () => this.params.frequency.value

    /**
     * Get the detune value of the oscillator.
     * @returns {Number} Oscillator detune
     */
    getDetune = () => this.params.detune.value

    // Gain Envelope
    /**
     * Get the attack time of the gain envelope.
     * @returns {Number} Gain attack time
     */
    getGainAttack = () => this.gainEnv.getAttack()

    /**
     * Get the decay time of the gain envelope.
     * @returns {Number} Gain decay time
     */
    getGainDecay = () => this.gainEnv.getDecay()

    /**
     * Get the sustain value of the gain envelope.
     * @returns {Number} Gain sustain value
     */
    getGainSustain = () => this.gainEnv.getSustain()

    /**
     * Get the release time of the gain envelope.
     * @returns {Number} Gain release time
     */
    getGainRelease = () => this.gainEnv.getRelease()

    /**
     * Get the modifier value of the gain envelope.
     * @returns {Number} Gain amount
     */
    getGainAmount = () => this.gainEnv.getModifier()

    // - Setters -
    // Oscillator
    /**
     * Set the waveform of the oscillator.
     * @param {String} val - Waveform
     */
    setWaveform = (val) => this.osc.setType(val)

    /**
     * Set the frequency of the oscillator.
     * Calls the setFrequency method of the oscillator.
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFrequency = (val, time) => this.osc.setFrequency(val, time)

    /**
     * Set the detune of the oscillator.
     * Calls the setDetune method on the oscillator.
     * @param {Number} val - Detune value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDetune = (val, time) => this.osc.setDetune(val, time)

    // Gain Envelope
    /**
     * Set the attack time of the gain envelope.
     * Calls the setAttack method on the gain envelope.
     * @param {Number} val - Attack time
     */
    setGainAttack = (val) => this.gainEnv.setAttack(val)

    /**
     * Set the decay time of the gain envelope.
     * Calls the setDecay method on the gain envelope.
     * @param {Number} val - Decay time
     */
    setGainDecay = (val) => this.gainEnv.setDecay(val)

    /**
     * Set the sustain value of the gain envelope.
     * Calls the setSustain method on the gain envelope.
     * @param {Number} val - Sustain value
     */
    setGainSustain = (val) => this.gainEnv.setSustain(val)

    /**
     * Set the release time of the gain envelope.
     * Calls the setRelease method on the gain envelope.
     * @param {Number} val - Release time
     */
    setGainRelease = (val) => this.gainEnv.setRelease(val)

    /**
     * Set the gain modifier of the gain envelope.
     * Calls the setModifier method on the gain envelope.
     * @param {Number} val - Modifier amount
     */
    setGainAmount = (val) => this.gainEnv.setModifier(val)

    // - Note Methods -
    /**
     * Plays the note given.
     * Sets the frequency of the oscillator and calls triggerAttack on the gain envelope.
     * @param {String} note - Note to be played
     */
    noteOn = (note) => this._noteOn(note)

    /**
     * Releases the note given if it matches the current note.
     * If a note is not given, it will release any current note being played.
     * Calls triggerRelease on the gain envelope.
     * @param {String} [note] - Note to be released (optional)
     */
    noteOff = (note) => this._noteOff(note)

    /**
     * Stops any note currently being played.
     * Calls triggerStop on the gain envelope.
     */
    noteStop = () => this._noteStop()

    // --- Private Methods ---
    _noteOn = (note) => {
        if (!note) {
            console.error('Note must be provided to play')
            return
        }

        this.currentNote = note
        this.osc.setFrequency(getNoteFrequency(note))
        this.gainEnv.triggerAttack()
    }
    _noteOff = (note) => {
        // Do not release if the note if different from the current note
        if (note && note !== this.currentNote) return

        this.currentNote = null
        this.gainEnv.triggerRelease()
    }
    _noteStop = () => {
        this.currentNote = null
        this.gainEnv.triggerStop()
    }
}

export default Synth
