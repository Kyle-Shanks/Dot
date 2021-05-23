import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Oscillator from 'nodes/sources/Oscillator'

const defaultProps = {
    waveform: 'sine',
    frequency: 440,
    detune: 0,
    gain: 1,
}

/**
 * A general-purpose source node composed of an Oscillator connected to a Gain node.
 *
 * @example
 * const osc = new Dot.Osc(AC, { waveform: 'square' })
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {String} opts.waveform - Waveform of the oscillator (default: 'sine')
 * @param {Boolean} opts.frequency - Frequency of the oscillator in Hz (default: 440)
 * @param {Number} opts.detune - Detune of the oscillator in cents (default: 0)
 * @param {Number} opts.gain - Gain value of the gain node (default: 1)
 * @params
 * frequency - Frequency of the oscillator
 * detune - Detune of the oscillator
 * gain - Gain of the gain node
 * @returns {Osc} Osc Node
 */
class Osc extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Osc'
        this.osc = new Oscillator(this.AC, { start: true })
        this.gain = new Gain(this.AC)

        this.params = {
            frequency: this.osc.getParams().frequency,
            detune: this.osc.getParams().detune,
            gain: this.gain.getParams().gain,
        }
        this.inputs = null
        this.outputs = [this.gain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setWaveform(initProps.waveform)
        this.setFrequency(initProps.frequency)
        this.setDetune(initProps.detune)
        this.setGain(initProps.gain)

        // Connections
        this.osc.connect(this.gain)
    }

    // - Getters -
    /**
     * Get the waveform of the oscillator.
     * @returns {String} Waveform
     */
    getWaveform = () => this.osc.getType()

    /**
     * Get the frequency of the oscillator.
     * @returns {Number} Frequency
     */
    getFrequency = () => this.params.frequency.value

    /**
     * Get the detune of the oscillator.
     * @returns {Number} Detune
     */
    getDetune = () => this.params.detune.value

    /**
     * Get the gain of the gain node.
     * @returns {Number} Gain
     */
    getGain = () => this.params.gain.value

    // - Setters -
    /**
     * Set the waveform of the oscillator.
     * @param {String} val - Waveform
     */
    setWaveform = (val) => this.osc.setType(val)

    /**
     * Set the frequency of the oscillator.
     * Calls the setFrequency method on the oscillator.
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFrequency = (val, time) => this.osc.setFrequency(val, time)

    /**
     * Set the detune of the oscillator.
     * Calls the setDetune method on the oscillator.
     * @param {Number} val - Detune
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDetune = (val, time) => this.osc.setDetune(val, time)

    /**
     * Set the gain of the gain node.
     * Calls the setGain method on the gain node.
     * @param {Number} val - Gain
     * @param {Number} [time] - update time in seconds (optional)
     */
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default Osc
