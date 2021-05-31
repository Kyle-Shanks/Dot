import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Filter from 'nodes/core/Filter'
import Delay from 'nodes/core/Delay'
import ChannelMerger from 'nodes/core/ChannelMerger'

const defaultProps = {
    amount: 0,
    preDelayTime: 0.2,
    leftDelayTime: 0.2,
    rightDelayTime: 0.2,
    leftFeedback: 0.6,
    rightFeedback: 0.6,
    tone: 4400,
}

/**
 * A ping pong delay effect to adds echos and other delay-based effects to the incoming signal.
 *
 * @example
 * const synth = new Dot.Synth(AC)
 * const delay = new Dot.PingPongDelay(AC, { amount: 0.3 })
 *
 * Dot.chain(synth, delay, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.amount - The dry/wet amount of the node (default: 0)
 * @param {Number} opts.preDelayTime - The delay time of the initial delay node (default: 0.2)
 * @param {Number} opts.leftDelayTime - The delay time of the left delay node (default: 0.2)
 * @param {Number} opts.rightDelayTime - The delay time of the right delay node (default: 0.2)
 * @param {Number} opts.leftFeedback - The gain value of the left feedback gain node (default: 0.6)
 * @param {Number} opts.rightFeedback - The gain value of the right feedback gain node (default: 0.6)
 * @param {Number} opts.tone - The cutoff frequency of the low-pass filter (default: 4400)
 * @params
 * preDelayTime - The delay time of the initial delay node
 * leftDelayTime - The delay time of the left delay node
 * rightDelayTime - The delay time of the right delay node
 * leftFeedback - The gain value of the left feedback gain node
 * rightFeedback - The gain value of the right feedback gain node
 * tone - The frequency of the low-pass filter
 * @returns {PingPongDelay} PingPongDelay Node
 */
class PingPongDelay extends DotAudioNode{
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'PingPongDelay'
        this.dryGain = new Gain(this.AC)
        this.leftDelay = new Delay(this.AC)
        this.preDelay = new Delay(this.AC)
        this.rightDelay = new Delay(this.AC)
        this.leftFeedbackGain = new Gain(this.AC)
        this.rightFeedbackGain = new Gain(this.AC)
        this.channelMerger = new ChannelMerger(this.AC)
        this.tone = new Filter(this.AC)
        this.wetGain = new Gain(this.AC)

        this.amount = 0
        this.params = {
            preDelayTime: this.preDelay.getParam('delayTime'),
            leftDelayTime: this.leftDelay.getParam('delayTime'),
            rightDelayTime: this.rightDelay.getParam('delayTime'),
            leftFeedback: this.leftFeedbackGain.getParam('gain'),
            rightFeedback: this.rightFeedbackGain.getParam('gain'),
            tone: this.tone.getParam('frequency'),
        }
        this.inputs = [this.dryGain, this.leftDelay, this.preDelay]
        this.outputs = [this.dryGain, this.wetGain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAmount(initProps.amount)
        this.setPreDelayTime(initProps.preDelayTime)
        this.setLeftDelayTime(initProps.leftDelayTime)
        this.setRightDelayTime(initProps.rightDelayTime)
        this.setLeftFeedback(initProps.leftFeedback)
        this.setRightFeedback(initProps.rightFeedback)
        this.setTone(initProps.tone)

        // Connections
        this.preDelay.connect(this.rightDelay)
        this.leftDelay.connect(this.channelMerger, 0, 0)
        this.rightDelay.connect(this.channelMerger, 0, 1)
        this.leftDelay.connect(this.leftFeedbackGain)
        this.leftFeedbackGain.connect(this.rightDelay)
        this.rightDelay.connect(this.rightFeedbackGain)
        this.rightFeedbackGain.connect(this.leftDelay)
        this.channelMerger.connect(this.tone)
        this.tone.connect(this.wetGain)

        return this
    }

    // - Getters -
    /**
     * Get the dry/wet amount of the node.
     * @returns {Number} Dry/set amount
     */
    getAmount = () => this.amount

    /**
     * Get the initial delay time of the node.
     * @returns {Number} Delay time
     */
    getPreDelayTime = () => this.params.preDelayTime.value

    /**
     * Get the left delay time of the node.
     * @returns {Number} Delay time
     */
    getLeftDelayTime = () => this.params.leftDelayTime.value

    /**
     * Get the right delay time of the node.
     * @returns {Number} Delay time
     */
    getRightDelayTime = () => this.params.rightDelayTime.value

    /**
     * Get the left feedback of the node.
     * @returns {Number} Feedback value
     */
    getLeftFeedback = () => this.params.leftFeedback.value

    /**
     * Get the right feedback of the node.
     * @returns {Number} Feedback value
     */
    getRightFeedback = () => this.params.rightFeedback.value

    /**
     * Get the tone value of the node.
     * @returns {Number} Tone frequency
     */
    getTone = () => this.params.tone.value

    // - Setters -
    /**
     * Set the dry/wet amount of the node.
     * Uses dryWetUpdate method to allow for changes over time.
     * @param {Number} val - Dry/set amount
     * @param {Number} [time] - update time in seconds (optional)
     */
    setAmount = (val, time) => {
        this.amount = val
        this._dryWetUpdate(
            this.dryGain.getParam('gain'),
            this.wetGain.getParam('gain'),
            val,
            time,
        )
    }

    /**
     * Set the initial delay time of the node.
     * Calls the setDelayTime method of the initial delay node.
     * @param {Number} val - delay time
     * @param {Number} [time] - update time in seconds (optional)
     */
    setPreDelayTime = (val, time) => this.preDelay.setDelayTime(val, time)

    /**
     * Set the left delay time of the node.
     * Calls the setDelayTime method of the left delay node.
     * @param {Number} val - delay time
     * @param {Number} [time] - update time in seconds (optional)
     */
    setLeftDelayTime = (val, time) => this.leftDelay.setDelayTime(val, time)

    /**
     * Set the right delay time of the node.
     * Calls the setDelayTime method of the right delay node.
     * @param {Number} val - delay time
     * @param {Number} [time] - update time in seconds (optional)
     */
    setRightDelayTime = (val, time) => this.rightDelay.setDelayTime(val, time)

    /**
     * Set the left feedback value of the node.
     * Calls the setGain method of the left feedback gain.
     * @param {Number} val - feedback gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setLeftFeedback = (val, time) => this.leftFeedbackGain.setGain(val, time)

    /**
     * Set the right feedback value of the node.
     * Calls the setGain method of the right feedback gain.
     * @param {Number} val - feedback gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setRightFeedback = (val, time) => this.rightFeedbackGain.setGain(val, time)

    /**
     * Set the tone value of the node.
     * Calls the setFrequency method of the tone (filter node).
     * @param {Number} val - tone frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setTone = (val, time) => this.tone.setFrequency(val, time)
}

export default PingPongDelay
