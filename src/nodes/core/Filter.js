import DotAudioNode from 'nodes/core/DotAudioNode'
import { FILTER_TYPE } from 'src/util/util'

const defaultProps = {
    frequency: 11000,
    q: 0,
    detune: 0,
    gain: 0,
    type: 'lowpass',
}

/**
 * A Node used to filter frequencies of the incoming signal.
 * Wrapper class for the native Filter audio node.
 *
 * @example
 * const synth = new Dot.Synth(AC)
 * const filter = new Dot.Filter(AC, { frequency: 3000, q: 1 })
 *
 * Dot.chain(synth, filter, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.frequency - Initial frequency value of the filter
 * @param {Number} opts.q - Initial q value of the filter
 * @param {Number} opts.detune - Initial detune of the filter
 * @param {Number} opts.gain - Initial gain of the filter
 * @param {String} opts.type - Initial type of the filter
 * @params
 * frequency - The cutoff frequency of the filter in Hz.
 * q - The Q factor, or quality factor of the filter.
 * detune - The detune of the filter frequency in cents. (100 cents/semitone, 1200 cents/octave)
 * gain - The gain of the filter in dB. Gain is only used if the filter type is set to lowshelf, highshelf, or peaking.
 * type - The type of the filter. For more information, refer to the web audio api documentation (https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type).
 * @returns {Filter} Filter Node
 */
class Filter extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Filter'
        this.filter = this.AC.createBiquadFilter()

        this.params = {
            frequency: this.filter.frequency,
            q: this.filter.q,
            gain: this.filter.gain,
            detune: this.filter.detune,
        }
        this.inputs = [this.filter]
        this.outputs = [this.filter]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setFrequency(initProps.frequency)
        this.setQ(initProps.q)
        this.setGain(initProps.gain)
        this.setDetune(initProps.detune)
        this.setType(initProps.type)
    }

    // - Getters -
    /**
     * Get the current frequency
     * @returns {Number} Frequency
     */
    getFrequency = () => this.params.frequency.value

    /**
     * Get the current q value
     * @returns {Number} Q value
     */
    getQ = () => this.params.Q.value

    /**
     * Get the current gain
     * @returns {Number} Gain
     */
    getGain = () => this.params.gain.value

    /**
     * Get the current detune
     * @returns {Number} Detune
     */
    getDetune = () => this.params.detune.value

    /**
     * Get the current filter type
     * @returns {String} Filter type
     */
    getType = () => this.filter.type

    // - Setters -
    /**
     * Set the cutoff frequency of the filter
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - frequency value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setFrequency = (val, time) => this._timeUpdate(this.params.frequency, val, time)

    /**
     * Set the q value of the filter
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - q value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setQ = (val, time) => this._timeUpdate(this.params.frequency, val, time)

    /**
     * Set the gain of the filter
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - gain value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setGain = (val, time) => this._timeUpdate(this.params.gain, val, time)

    /**
     * Set the detune of the filter
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - detune value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)

    /**
     * Set the type of the filter
     *
     * @param {String} val - type value
     * @returns
     */
    setType = (val) => {
        if (FILTER_TYPE.includes(val)) this.filter.type = val
    }
}

export default Filter
