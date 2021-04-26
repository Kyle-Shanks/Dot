import DotAudioNode from '../DotAudioNode.js'
import ChannelMerger from '../core/ChannelMerger.js'
import Delay from '../core/Delay.js'
import Gain from '../core/Gain.js'
import LFO from '../sources/LFO.js'

// TODO: Need to figure out a better way to handle the phasing
// Currently just doubling the rate of the right delay

class Chorus extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Chorus'
        this.dryGain = new Gain(this.AC)
        this.leftLFO = new LFO(this.AC)
        this.rightLFO = new LFO(this.AC)
        this.leftGain = new Gain(this.AC)
        this.rightGain = new Gain(this.AC)
        this.leftDelay = new Delay(this.AC)
        this.rightDelay = new Delay(this.AC)
        this.channelMerger = new ChannelMerger(this.AC)
        this.feedback = new Gain(this.AC)
        this.wetGain = new Gain(this.AC)

        this.leftGain.setGain(0.6)
        this.rightGain.setGain(0.6)

        this.params = {
            delayTime: [this.leftDelay.getParams().delayTime, this.rightDelay.getParams().delayTime],
            feedback: this.feedback.getParams().gain,
            rate: [this.leftLFO.getParams().rate, this.rightLFO.getParams().rate],
            depth: [this.leftLFO.getParams().depth, this.rightLFO.getParams().depth],
        }

        // Initialize
        this.leftGain.connect(this.leftDelay)
        this.rightGain.connect(this.rightDelay)
        this.leftDelay.connect(this.channelMerger, 0, 0)
        this.rightDelay.connect(this.channelMerger, 0, 1)
        this.channelMerger.connect(this.feedback)
        this.channelMerger.connect(this.wetGain)
        this.feedback.connect(this.leftDelay)
        this.feedback.connect(this.rightDelay)
        this.leftLFO.connect(this.leftDelay.getParams().delayTime)
        this.rightLFO.connect(this.rightDelay.getParams().delayTime)
        this.leftLFO.start()
        this.rightLFO.start()

        this.setAmount(0)
        this.setFeedback(0.4)
        this.setDelayTime(0.04)
        this.setDepth(0.005)
        this.setRate(0.25)
    }

    // - Getters -
    getInputs = () => [this.dryGain, this.leftGain, this.rightGain]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.wetGain.getGain()
    getDelayTime = () => this.leftGain.getDelayTime()
    getFeedback = () => this.params.feedback.value
    getRate = () => this.leftLFO.getRate()
    getDepth = () => this.leftLFO.getDepth()

    // - Setters -
    setAmount = (val, time) => {
        this._fadeUpdate(
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
