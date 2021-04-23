import DotAudioNode from '../DotAudioNode.js'
import Filter from '../core/Filter.js'

class EQ2 extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'EQ2'
        this.low = new Filter(this.AC)
        this.high = new Filter(this.AC)

        this.params = {
            lowFreq: this.low.getParams().frequency,
            lowGain: this.low.getParams().gain,
            highFreq: this.high.getParams().frequency,
            highGain: this.high.getParams().gain,
        }

        // Initialize
        this.low.setType('lowshelf')
        this.low.setFreq(320.0)
        this.high.setType('highshelf')
        this.high.setFreq(3200.0)

        this.low.connect(this.high)
    }

    // Getters
    getInputs = () => [this.low]
    getOutputs = () => [this.high]

    getLowFreq = () => this.params.lowFreq.value
    getLowGain = () => this.params.lowGain.value
    getHighFreq = () => this.params.highFreq.value
    getHighGain = () => this.params.highGain.value

    // Setters
    setLowGain = (val, time) => this.low.setGain(val, time)
    setLowFreq = (val, time) => this.low.setFreq(val, time)
    setHighGain = (val, time) => this.high.setGain(val, time)
    setHighFreq = (val, time) => this.high.setFreq(val, time)
}

export default EQ2
