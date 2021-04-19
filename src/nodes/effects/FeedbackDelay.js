import DotAudioNode from '../DotAudioNode.js'
import Gain from '../core/Gain.js'
import Filter from '../core/Filter.js'
import Delay from '../core/Delay.js'

class FeedbackDelay extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'FeedbackDelay'
        this.dryGain = new Gain(this.AC)
        this.delay = new Delay(this.AC)
        this.feedbackGain = new Gain(this.AC)
        this.tone = new Filter(this.AC)
        this.wetGain = new Gain(this.AC)

        this.params = {
            amount: this.wetGain.getParams().gain,
            delayTime: this.delay.getParams().delayTime,
            feedback: this.feedbackGain.getParams().gain,
            tone: this.tone.getParams().frequency,
        }

        this.delay.connect(this.feedbackGain)
        this.feedbackGain.connect(this.tone)
        this.feedbackGain.connect(this.delay)
        this.tone.connect(this.wetGain)

        this.setAmount(0)
        this.setFeedback(0)
    }

    // Getters
    getInputs = () => [this.dryGain, this.delay]
    // getInputs = () => [...this.dryGain.getInputs(), ...this.delay.getInputs()]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.params.amount.value
    getDelayTime = () => this.params.delayTime.value
    getFeedback = () => this.params.feedback.value
    getTone = () => this.params.tone.value

    // Setters
    setAmount = (val, time) => {
        this._dryWetUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }
    setFeedback = (val, time) => this.feedbackGain.setGain(val, time)
    setTone = (val, time) => this.tone.setFreq(val, time)
    setDelayTime = (val, time) => this.delay.setDelayTime(val, time)
}

export default FeedbackDelay
