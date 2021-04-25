import DotAudioNode from '../DotAudioNode.js'
import Filter from '../core/Filter.js'

class EQ2 extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'EQ2'
        this.low = new Filter(this.AC)
        this.high = new Filter(this.AC)

        this.params = {
            lowFrequency: this.low.getParams().frequency,
            lowGain: this.low.getParams().gain,
            highFrequency: this.high.getParams().frequency,
            highGain: this.high.getParams().gain,
        }

        // Initialize
        this.low.setType('lowshelf')
        this.low.setFrequency(320.0)
        this.high.setType('highshelf')
        this.high.setFrequency(3200.0)

        this.low.connect(this.high)
    }

    // - Getters -
    getInputs = () => [this.low]
    getOutputs = () => [this.high]

    getLowFrequency = () => this.params.lowFreq.value
    getLowGain = () => this.params.lowGain.value
    getHighFrequency = () => this.params.highFreq.value
    getHighGain = () => this.params.highGain.value

    // - Setters -
    setLowGain = (val, time) => this.low.setGain(val, time)
    setLowFrequency = (val, time) => this.low.setFrequency(val, time)
    setHighGain = (val, time) => this.high.setGain(val, time)
    setHighFrequency = (val, time) => this.high.setFrequency(val, time)
}

export default EQ2
