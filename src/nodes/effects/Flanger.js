import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Delay from 'nodes/core/Delay'
import LFO from 'nodes/sources/LFO'

const defaultProps = {
    amount: 0,
    delayTime: 0.01,
    depth: 0.0015,
    feedback: 0.6666,
    rate: 0.3333,
}

/**
 * A Flanger effect used to adds width and texture to the incoming signal.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.amount - The dry/wet amount for the node
 * @param {Number} opts.delayTime - The delay time of the flanger modulation
 * @param {Number} opts.depth - The depth of the flanger modulation
 * @param {Number} opts.rate - The rate of the flanger modulation
 * @param {Number} opts.feedback - The gain for the feedback signal
 * @params
 * delayTime - Delay time of the delay node
 * feedback - Gain of the feedback gain node
 * rate - Rate of the LFO connected to the delay time
 * depth - Depth of the LFO connected to the delay time
 * @returns {Flanger} Flanger Node
 */
class Flanger extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Flanger'
        this.dryGain = new Gain(this.AC)
        this.inputGain = new Gain(this.AC)
        this.delay = new Delay(this.AC)
        this.feedback = new Gain(this.AC)
        this.lfo = new LFO(this.AC, { start: true })
        this.wetGain = new Gain(this.AC)

        this.params = {
            delayTime: this.delay.getParams().delayTime,
            depth: this.lfo.getParams().depth,
            feedback: this.feedback.getParams().gain,
            rate: this.lfo.getParams().rate,
        }
        this.inputs = [this.dryGain, this.inputGain]
        this.outputs = [this.dryGain, this.wetGain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAmount(initProps.amount)
        this.setDelayTime(initProps.delayTime)
        this.setFeedback(initProps.feedback)
        this.setDepth(initProps.depth)
        this.setRate(initProps.rate)

        // Connections
        this.inputGain.connect(this.delay)
        this.inputGain.connect(this.wetGain)
        this.delay.connect(this.feedback)
        this.delay.connect(this.wetGain)
        this.feedback.connect(this.inputGain)
        this.lfo.connect(this.delay.getParams().delayTime)
    }

    // - Getters -
    /**
     * Get the dry/wet amount level of the node.
     * @returns {Number} Dry/wet amount
     */
    getAmount = () => this.wetGain.getGain()

    /**
     * Get the delay time of the node.
     * @returns {Number} Delay time
     */
    getDelayTime = () => this.params.delayTime.value

    /**
     * Get the depth of the flanger modulation.
     * @returns {Number} Modulation depth
     */
    getDepth = () => this.params.depth.value

    /**
     * Get the feedback amount.
     * @returns {Number} Feedback amount
     */
    getFeedback = () => this.params.feedback.value

    /**
     * Get the rate of the flanger modulation.
     * @returns {Number} Modulation rate
     */
    getRate = () => this.params.rate.value

    // - Setters -
    /**
     * Set the dry/wet amount of the node.
     * Uses linearFadeUpdate method to evenly fade and to allow for changes over time.
     * @param {Number} val - Dry/set amount
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setAmount = (val, time) => {
        this._linearFadeUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }

    /**
     * Set the feedback gain of the node.
     * Calls the setGain method of the feedback gain node.
     * @param {Number} val - Feedback
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setFeedback = (val, time) => this.feedback.setGain(val, time)

    /**
     * Set the rate of the flanger modulation.
     * Calls the setRate method of the delay time LFO.
     * @param {Number} val - depth
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setRate = (val, time) => this.lfo.setRate(val, time)

    /**
     * Set the depth of the flanger modulation.
     * Calls the setDepth method of the delay time LFO.
     * @param {Number} val - depth
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setDepth = (val, time) => this.lfo.setDepth(val, time)

    /**
     * Set the delay time of the node.
     * Calls the setDelayTime method of the delay node.
     * @param {Number} val - Delay time
     * @param {Number} [time] - update time in seconds (optional)
     * @returns
     */
    setDelayTime = (val, time) => this.delay.setDelayTime(val, time)
}

export default Flanger
