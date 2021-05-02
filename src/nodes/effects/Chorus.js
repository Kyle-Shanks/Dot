import DotAudioNode from 'nodes/DotAudioNode'
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
            delayTime: [this.leftDelay.getParams().delayTime, this.rightDelay.getParams().delayTime],
            feedback: this.feedback.getParams().gain,
            rate: [this.leftLFO.getParams().rate, this.rightLFO.getParams().rate],
            depth: [this.leftLFO.getParams().depth, this.rightLFO.getParams().depth],
        }

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
        this.leftLFO.connect(this.leftDelay.getParams().delayTime)
        this.rightLFO.connect(this.rightDelay.getParams().delayTime)
    }

    // - Getters -
    getInputs = () => [this.dryGain, this.chorusGain]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.wetGain.getGain()
    getDelayTime = () => this.leftDelay.getDelayTime()
    getFeedback = () => this.params.feedback.value
    getRate = () => this.leftLFO.getRate()
    getDepth = () => this.leftLFO.getDepth()

    // - Setters -
    setAmount = (val, time) => {
        this._linearFadeUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }
    setFeedback = (val, time) => this.feedback.setGain(val, time)
    setRate = (val, time) => {
        this.leftLFO.setRate(val, time)
        this.rightLFO.setRate(val * 2, time)
    }
    setDepth = (val, time) => {
        this.leftLFO.setDepth(val, time)
        this.rightLFO.setDepth(val, time)
    }
    setDelayTime = (val, time) => {
        this.leftDelay.setDelayTime(val, time)
        this.rightDelay.setDelayTime(val, time)
    }
}

export default Chorus
