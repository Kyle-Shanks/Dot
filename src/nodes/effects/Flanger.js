import DotAudioNode from 'nodes/DotAudioNode'
import { Delay, Gain, LFO } from 'nodes'

const defaultProps = {
    amount: 0,
    delayTime: 0.01,
    depth: 0.0015,
    feedback: 0.6666,
    rate: 0.3333,
}

class Flanger extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Flanger'
        this.dryGain = new Gain(this.AC)
        this.inputGain = new Gain(this.AC)
        this.delay = new Delay(this.AC)
        this.feedback = new Gain(this.AC)
        this.lfo = new LFO(this.AC, { start: true })
        this.wetGain = new Gain(this.AC)

        this.params = {
            delayTime: this.delay.getParams().delayTime,
            depth: this.lfo.getParams().depth,
            feedback: this.feedback.getParams().gain,
            rate: this.lfo.getParams().rate,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setAmount(initProps.amount)
        this.setDelayTime(initProps.delayTime)
        this.setFeedback(initProps.feedback)
        this.setDepth(initProps.depth)
        this.setRate(initProps.rate)

        // Connections
        this.inputGain.connect(this.delay)
        this.inputGain.connect(this.wetGain)
        this.delay.connect(this.feedback)
        this.delay.connect(this.wetGain)
        this.feedback.connect(this.inputGain)
        this.lfo.connect(this.delay.getParams().delayTime)
    }

    // - Getters -
    getInputs = () => [this.dryGain, this.inputGain]
    getOutputs = () => [this.dryGain, this.wetGain]

    getAmount = () => this.wetGain.getGain()
    getDelayTime = () => this.params.delayTime.value
    getDepth = () => this.params.depth.value
    getFeedback = () => this.params.feedback.value
    getRate = () => this.params.rate.value

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
    setRate = (val, time) => this.lfo.setRate(val, time)
    setDepth = (val, time) => this.lfo.setDepth(val, time)
    setDelayTime = (val, time) => this.delay.setDelayTime(val, time)
}

export default Flanger
