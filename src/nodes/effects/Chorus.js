import DotAudioNode from 'nodes/core/DotAudioNode'
import ChannelMerger from 'nodes/core/ChannelMerger'
import Delay from 'nodes/core/Delay'
import Gain from 'nodes/core/Gain'
import LFO from 'nodes/sources/LFO'

// TODO: Need to figure out a better way to handle the phasing
// Currently just doubling the rate of the right delay

const defaultProps = {
    amount: 0,
    delayTime: 0.04,
    depth: 0.005,
    rate: 0.25,
    feedback: 0.4,
}

/**
 * A Chorus effect used to adds width and texture to the incoming signal.
 *
 * @example
 * const synth = new Dot.Synth(AC)
 * const chorus = new Dot.Chorus(AC, { amount: 0.2 })
 *
 * Dot.chain(synth, chorus, AC.destination)
 *
 * @extends DotAudioNode
 * @param {AudioContext} AC - Audio context
 * @param {Object} opts - Initialization options
 * @param {Number} opts.amount - The dry/wet amount for the node (default: 0)
 * @param {Number} opts.delayTime - The delay time of the chorus modulation (default: 0.04)
 * @param {Number} opts.depth - The depth of the chorus modulation (default: 0.005)
 * @param {Number} opts.rate - The rate of the chorus modulation (default: 0.25)
 * @param {Number} opts.feedback - The gain for the feedback signal (default: 0.4)
 * @params
 * delayTime - Delay time of the delay nodes
 * feedback - Gain of the feedback gain node
 * rate - Rate of the LFOs connected to the delay times
 * depth - Depth of the LFOs connected to the delay times
 * @returns {Chorus} Chorus Node
 */
class Chorus extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Chorus'
        this.dryGain = new Gain(this.AC)
        this.leftLFO = new LFO(this.AC, { start: true })
        this.rightLFO = new LFO(this.AC, { start: true })
        this.chorusGain = new Gain(this.AC, { gain: 0.6 })
        this.leftDelay = new Delay(this.AC)
        this.rightDelay = new Delay(this.AC)
        this.channelMerger = new ChannelMerger(this.AC)
        this.feedback = new Gain(this.AC)
        this.wetGain = new Gain(this.AC)

        this.params = {
            delayTime: [this.leftDelay.getParam('delayTime'), this.rightDelay.getParam('delayTime')],
            feedback: this.feedback.getParam('gain'),
            rate: [this.leftLFO.getParam('rate'), this.rightLFO.getParam('rate')],
            depth: [this.leftLFO.getParam('depth'), this.rightLFO.getParam('depth')],
        }
        this.inputs = [this.dryGain, this.chorusGain]
        this.outputs = [this.dryGain, this.wetGain]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setAmount(initProps.amount)
        this.setDelayTime(initProps.delayTime)
        this.setRate(initProps.rate)
        this.setDepth(initProps.depth)
        this.setFeedback(initProps.feedback)

        // Connections
        this.chorusGain.connect(this.leftDelay)
        this.chorusGain.connect(this.rightDelay)
        this.leftDelay.connect(this.channelMerger, 0, 0)
        this.rightDelay.connect(this.channelMerger, 0, 1)
        this.channelMerger.connect(this.feedback)
        this.channelMerger.connect(this.wetGain)
        this.feedback.connect(this.leftDelay)
        this.feedback.connect(this.rightDelay)
        this.leftLFO.connect(this.leftDelay.getParam('delayTime'))
        this.rightLFO.connect(this.rightDelay.getParam('delayTime'))

        return this
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
    getDelayTime = () => this.leftDelay.getDelayTime()

    /**
     * Get the feedback amount
     * @returns {Number} Feedback amount
     */
    getFeedback = () => this.params.feedback.value

    /**
     * Get the rate of the chorus modulation.
     * @returns {Number} Modulation rate
     */
    getRate = () => this.leftLFO.getRate()

    /**
     * Get the depth of the chorus modulation.
     * @returns {Number} Modulation depth
     */
    getDepth = () => this.leftLFO.getDepth()

    // - Setters -
    /**
     * Set the dry/wet amount of the node.
     * Uses linearFadeUpdate method to evenly fade and to allow for changes over time.
     * @param {Number} val - Dry/set amount
     * @param {Number} [time] - update time in seconds (optional)
     */
    setAmount = (val, time) => {
        this._linearFadeUpdate(
            this.dryGain.getParam('gain'),
            this.wetGain.getParam('gain'),
            val,
            time,
        )
    }

    /**
     * Set the feedback gain of the node.
     * Calls the setGain method of the feedback gain node.
     * @param {Number} val - Feedback
     * @param {Number} [time] - update time in seconds (optional)
     */
    setFeedback = (val, time) => this.feedback.setGain(val, time)

    /**
     * Set the rate of the chorus modulation.
     * Calls the setRate method of both delay time lfos.
     * @param {Number} val - depth
     * @param {Number} [time] - update time in seconds (optional)
     */
    setRate = (val, time) => {
        this.leftLFO.setRate(val, time)
        this.rightLFO.setRate(val * 2, time)
    }

    /**
     * Set the depth of the chorus modulation.
     * Calls the setDepth method of both delay time lfos.
     * @param {Number} val - depth
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDepth = (val, time) => {
        this.leftLFO.setDepth(val, time)
        this.rightLFO.setDepth(val, time)
    }

    /**
     * Set the delay time of the node.
     * Calls the setDelayTime method of both delay nodes.
     * @param {Number} val - Delay time
     * @param {Number} [time] - update time in seconds (optional)
     */
    setDelayTime = (val, time) => {
        this.leftDelay.setDelayTime(val, time)
        this.rightDelay.setDelayTime(val, time)
    }
}

export default Chorus
