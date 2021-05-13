import DotAudioNode from 'nodes/core/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Filter from 'nodes/core/Filter'
import Delay from 'nodes/core/Delay'

const defaultProps = {
    amount: 0,
    delayTime: 0.2,
    feedback: 0.6,
    tone: 4400,
}

/**
 * A feedback delay effect to adds echos and other delay-based effects to the incoming signal.
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.amount - The dry/wet amount of the node (default: 0)
 * @param {Number} opts.delayTime - The delay time of the delay node (default: 0.2)
 * @param {Number} opts.feedback - The gain value of the feedback gain node (default: 0.6)
 * @param {Number} opts.tone - The cutoff frequency of the low-pass filter (default: 4400)
 * @params
 * delayTime - The delay time of the delay node
 * feedback - The gain value of the feedback gain node
 * tone - The frequency of the low-pass filter
 * @returns {FeedbackDelay} FeedbackDelay Node
 */
class FeedbackDelay extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'FeedbackDelay'
        this.dryGain = new Gain(this.AC)
        this.delay = new Delay(this.AC)
        this.feedbackGain = new Gain(this.AC)
        this.tone = new Filter(this.AC)
        this.wetGain = new Gain(this.AC)

        this.amount = 0
        this.params = {
            delayTime: this.delay.getParams().delayTime,
            feedback: this.feedbackGain.getParams().gain,
            tone: this.tone.getParams().frequency,
        }
        this.inputs = [this.dryGain, this.delay]
        this.outputs = [this.dryGain, this.wetGain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAmount(initProps.amount)
        this.setDelayTime(initProps.delayTime)
        this.setFeedback(initProps.feedback)
        this.setTone(initProps.tone)

        // Connections
        this.delay.connect(this.feedbackGain)
        this.feedbackGain.connect(this.tone)
        this.feedbackGain.connect(this.delay)
        this.tone.connect(this.wetGain)
    }

    // - Getters -
    /**
     * Get the dry/wet amount of the node.
     * @returns {Number} Dry/set amount
     */
    getAmount = () => this.amount

    /**
     * Get the delay time of the node.
     * @returns {Number} Delay time
     */
    getDelayTime = () => this.params.delayTime.value

    /**
     * Get the feedback of the node.
     * @returns {Number} Feedback value
     */
    getFeedback = () => this.params.feedback.value

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
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }

    /**
     * Set the delay time of the node.
     * Calls the setDelayTime method of the delay node.
     * @param {Number} val - delay time
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDelayTime = (val, time) => this.delay.setDelayTime(val, time)

    /**
     * Set the feedback value of the node.
     * Calls the setGain method of the feedback gain.
     * @param {Number} val - feedback gain value
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFeedback = (val, time) => this.feedbackGain.setGain(val, time)

    /**
     * Set the tone value of the node.
     * Calls the setFrequency method of the tone (filter node).
     * @param {Number} val - tone frequency
     * @param {Number} [time] - update time in seconds (optional)
     */
    setTone = (val, time) => this.tone.setFrequency(val, time)
}

export default FeedbackDelay
