import DotAudioNode from '../DotAudioNode.js'
import Gain from '../core/Gain.js'
import Filter from '../core/Filter.js'
import Delay from '../core/Delay.js'
import ChannelMerger from '../core/ChannelMerger.js'

class PingPongDelay extends DotAudioNode{
    constructor(AC) {
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
            delayTime: this.leftDelay.getParams().delayTime,
            feedback: this.leftFeedbackGain.getParams().gain,
            tone: this.tone.getParams().frequency,
        }

        // Initialize
        this.preDelay.connect(this.rightDelay)
        this.leftDelay.connect(this.channelMerger, 0, 0)
        this.rightDelay.connect(this.channelMerger, 0, 1)
        this.leftDelay.connect(this.leftFeedbackGain)
        this.leftFeedbackGain.connect(this.rightDelay)
        this.rightDelay.connect(this.rightFeedbackGain)
        this.rightFeedbackGain.connect(this.leftDelay)
        this.channelMerger.connect(this.tone)
        this.tone.connect(this.wetGain)

        this.setAmount(0)
        this.setFeedback(0)
    }

    // - Getters -
    getInputs = () => [this.dryGain, this.leftDelay, this.preDelay]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.amount
    getDelayTime = () => this.params.delayTime.value
    getTone = () => this.params.tone.value
    getFeedback = () => this.params.feedback.value

    // - Setters -
    setAmount = (val, time) => {
        this.amount = val
        this._dryWetUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }
    setFeedback = (val, time) => {
        this.leftFeedbackGain.setGain(val, time)
        this.rightFeedbackGain.setGain(val, time)
    }
    setTone = (val, time) => this.tone.setFreq(val, time)
    setDelayTime = (val, time) => {
        this.preDelay.setDelayTime(val, time)
        this.leftDelay.setDelayTime(val, time)
        this.rightDelay.setDelayTime(val, time)
    }
}

export default PingPongDelay
