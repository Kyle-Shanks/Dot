import DotAudioNode from 'nodes/core/DotAudioNode'
import Filter from 'nodes/core/Filter'

const defaultProps = {
    lowFrequency: 320,
    lowGain: 0,
    highFrequency: 3200,
    highGain: 0,
}

/**
 * A 2-band equalizer node for adjusting the gain of the high and low frequencies of the incoming signal.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.lowFrequency - The frequency of the low band
 * @param {Number} opts.lowGain - The gain value of the low band
 * @param {Number} opts.highFrequency - The frequency of the high band
 * @param {Number} opts.highGain - The gain value of the high band
 * @params
 * lowFrequency - The frequency of the low band (filter node)
 * lowGain - The gain of the low band (filter node)
 * highFrequency - The frequency of the high band (filter node)
 * highGain - The gain of the high band (filter node)
 * @returns {EQ2} EQ2 Node
 */
class EQ2 extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'EQ2'
        this.low = new Filter(this.AC, { type: 'lowshelf', frequency: 320 })
        this.high = new Filter(this.AC, { type: 'highshelf', frequency: 3200 })

        this.params = {
            lowFrequency: this.low.getParams().frequency,
            lowGain: this.low.getParams().gain,
            highFrequency: this.high.getParams().frequency,
            highGain: this.high.getParams().gain,
        }
        this.inputs = [this.low]
        this.outputs = [this.high]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setLowFrequency(initProps.lowFrequency)
        this.setLowGain(initProps.lowGain)
        this.setHighFrequency(initProps.highFrequency)
        this.setHighGain(initProps.highGain)

        // Connections
        this.low.connect(this.high)
    }

    // - Getters -
    /**
     * Get the frequency of the low band.
     * @returns {Number} Low band frequency
     */
    getLowFrequency = () => this.params.lowFrequency.value

    /**
     * Get the gain value of the low band.
     * @returns {Number} Low band gain
     */
    getLowGain = () => this.params.lowGain.value

    /**
     * Get the frequency of the high band.
     * @returns {Number} High band frequency
     */
    getHighFrequency = () => this.params.highFrequency.value

    /**
     * Get the gain value of the high band.
     * @returns {Number} High band gain
     */
    getHighGain = () => this.params.highGain.value

    // - Setters -
    /**
     * Set the frequency of the low band.
     * Calls the setFrequency method of the low band (filter node).
     * @param {Number} val - frequency
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setLowFrequency = (val, time) => this.low.setFrequency(val, time)

    /**
     * Set the gain value of the low band.
     * Calls the setGain method of the low band (filter node).
     * @param {Number} val - gain value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setLowGain = (val, time) => this.low.setGain(val, time)

    /**
     * Set the frequency of the high band.
     * Calls the setFrequency method of the high band (filter node).
     * @param {Number} val - frequency
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setHighFrequency = (val, time) => this.high.setFrequency(val, time)

    /**
     * Set the gain value of the high band.
     * Calls the setGain method of the high band (filter node).
     * @param {Number} val - gain value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setHighGain = (val, time) => this.high.setGain(val, time)
}

export default EQ2
