import DotAudioNode from '../DotAudioNode.js'
import Gain from '../core/Gain.js'
import Delay from '../core/Delay.js'
import LFO from '../sources/LFO.js'

class Flanger extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Flanger'
        this.dryGain = new Gain(this.AC)
        this.inputGain = new Gain(this.AC)
        this.delay = new Delay(this.AC)
        this.feedback = new Gain(this.AC)
        this.lfo = new LFO(this.AC)
        this.wetGain = new Gain(this.AC)

        this.params = {
            amount: this.wetGain.getParams().gain,
            delayTime: this.delay.getParams().delayTime,
            depth: this.lfo.getParams().depth,
            feedback: this.feedback.getParams().gain,
            rate: this.lfo.getParams().rate,
        }

        // Initialize
        this.inputGain.connect(this.delay)
        this.inputGain.connect(this.wetGain)
        this.delay.connect(this.feedback)
        this.delay.connect(this.wetGain)
        this.feedback.connect(this.inputGain)
        this.lfo.connect(this.delay.getParams().delayTime)
        this.lfo.start()

        this.setAmount(0)
    }

    // Getters
    getInputs = () => [this.dryGain, this.inputGain]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.params.amount.value
    getDelayTime = () => this.params.delayTime.value
    getDepth = () => this.params.depth.value
    getFeedback = () => this.params.feedback.value
    getRate = () => this.params.rate.value

    // Setters
    setAmount = (val, time) => {
        this._fadeUpdate(
            this.dryGain.getParams().gain,
            this.wetGain.getParams().gain,
            val,
            time,
        )
    }
    setFeedback = (val, time) => this.feedback.setGain(val, time)
    setRate = (val, time) => this.lfo.setRate(val, time)
    setDepth = (val, time) => this.lfo.setDepth(val, time)
    setDelayTime = (val, time) => this.delay.setDelayTime(val, time)
}

export default Flanger
