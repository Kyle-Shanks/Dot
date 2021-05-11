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
 * An Oscillator connected to a Gain node.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {AudioBuffer} opts.waveform - Initial waveform
 * @param {Boolean} opts.frequency - Initial frequency
 * @param {Number} opts.detune - Initial detune value
 * @param {Number} opts.gain - Initial gain value
 * @params
 * frequency - Frequency of the oscillator
 * detune - Detune value of the oscillator
 * gain - Gain value of the gain node
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
     * Get the waveform of the oscillator
     * @returns {String} Waveform
     */
    getWaveform = () => this.osc.getType()

    /**
     * Get the frequency of the oscillator
     * @returns {Number} Frequency
     */
    getFrequency = () => this.params.frequency.value

    /**
     * Get the detune of the oscillator
     * @returns {Number} Detune
     */
    getDetune = () => this.params.detune.value

    /**
     * Get the gain of the gain node
     * @returns {Number} Gain
     */
    getGain = () => this.params.gain.value

    // - Setters -
    /**
     * Set the waveform of the oscillator
     * @param {String} val - Waveform
     * @returns
     */
    setWaveform = (val) => this.osc.setType(val)

    /**
     * Set the frequency of the oscillator
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - Frequency
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setFrequency = (val, time) => this.osc.setFrequency(val, time)

    /**
     * Set the detune of the oscillator
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - Detune
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setDetune = (val, time) => this.osc.setDetune(val, time)

    /**
     * Set the gain of the gain node
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - Gain
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default Osc
