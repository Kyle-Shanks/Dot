import DotAudioNode from 'nodes/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Filter from 'nodes/core/Filter'
import Delay from 'nodes/core/Delay'

const defaultProps = {
    amount: 0,
    delayTime: 0.2,
    feedback: 0.6,
    tone: 4400,
}

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

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

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
    getInputs = () => [this.dryGain, this.delay]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.amount
    getDelayTime = () => this.params.delayTime.value
    getFeedback = () => this.params.feedback.value
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
    setFeedback = (val, time) => this.feedbackGain.setGain(val, time)
    setTone = (val, time) => this.tone.setFrequency(val, time)
    setDelayTime = (val, time) => this.delay.setDelayTime(val, time)
}

export default FeedbackDelay
