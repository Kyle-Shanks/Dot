import DotAudioNode from 'nodes/core/DotAudioNode'

const defaultProps = {
    delayTime: 0,
}

/**
 * A Node used to delay an incoming signal.
 * Wrapper class for the native Delay audio node.
 *
 * @example
 * const synth = new Dot.Synth(AC)
 * const delay = new Dot.Delay(AC, { delayTime: 1 })
 *
 * Dot.chain(synth, delay, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.delayTime - Initial delay time of the node
 * @params
 * delayTime - Amount of time to delay the incoming signal
 * @returns {Delay} Delay Node
 */
class Delay extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Delay'
        this.delay = this.AC.createDelay()

        this.params = {
            delayTime: this.delay.delayTime,
        }
        this.inputs = [this.delay]
        this.outputs = [this.delay]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setDelayTime(initProps.delayTime)
    }

    // - Getters -
    /**
     * Get the current delay time
     * @returns {Number} Delay time
     */
    getDelayTime = () => this.params.delayTime.value

    // - Setters -
    /**
     * Set the delay time of the node
     * Uses timeUpdate method to allow for changes over time
     *
     * @param {Number} val - New delay time value
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setDelayTime = (val, time) => this._timeUpdate(this.params.delayTime, val, time)
}

export default Delay
