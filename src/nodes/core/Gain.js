import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    gain: 1,
}

/**
 * A Node used to adjust the gain, or volume, of the incoming signal.
 * Wrapper class for the native Gain audio node.
 * For more information, refer to the web audio api documentation.
 * (https://developer.mozilla.org/en-US/docs/Web/API/GainNode)
 *
 * @example
 * const oscillator = new Dot.Oscillator(AC, { start: true })
 * const gain = new Dot.Gain(AC, { gain: 0.25 })
 *
 * Dot.chain(oscillator, gain, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.gain - Gain adjustment of the incoming signal (default: 1)
 * @params
 * gain - Node gain
 * @returns {Gain} Gain Node
 */
class Gain extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Gain'
        this.gain = this.AC.createGain()

        this.params = {
            gain: this.gain.gain,
        }
        this.inputs = [this.gain]
        this.outputs = [this.gain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setGain(initProps.gain)
    }

    // - Getters -
    /**
     * Get the current gain value.
     * @returns {Number} Gain value
     */
    getGain = () => this.params.gain.value

    // - Setters -
    /**
     * Set the gain of the node.
     * Uses timeUpdate method to allow for changes over time.
     * @param {Number} val - gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setGain = (val, time) => this._timeUpdate(this.params.gain, val, time)
}

export default Gain
