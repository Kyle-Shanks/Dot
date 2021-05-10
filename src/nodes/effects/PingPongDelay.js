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
            preDelayTime: this.preDelay.getParams().delayTime,
            leftDelayTime: this.leftDelay.getParams().delayTime,
            rightDelayTime: this.rightDelay.getParams().delayTime,
            leftFeedback: this.leftFeedbackGain.getParams().gain,
            rightFeedback: this.rightFeedbackGain.getParams().gain,
            tone: this.tone.getParams().frequency,
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
    }

    // - Getters -
    getAmount = () => this.amount
    getPreDelayTime = () => this.params.preDelayTime.value
    getLeftDelayTime = () => this.params.leftDelayTime.value
    getRightDelayTime = () => this.params.rightDelayTime.value
    getLeftFeedback = () => this.params.leftFeedback.value
    getRightFeedback = () => this.params.rightFeedback.value
    getTone = () => this.params.tone.value

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
    setPreDelayTime = (val, time) => this.preDelay.setDelayTime(val, time)
    setLeftDelayTime = (val, time) => this.leftDelay.setDelayTime(val, time)
    setRightDelayTime = (val, time) => this.rightDelay.setDelayTime(val, time)
    setLeftFeedback = (val, time) => this.leftFeedbackGain.setGain(val, time)
    setRightFeedback = (val, time) => this.rightFeedbackGain.setGain(val, time)
    setTone = (val, time) => this.tone.setFrequency(val, time)
}

export default PingPongDelay
