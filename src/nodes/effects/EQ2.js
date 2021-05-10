import DotAudioNode from 'nodes/DotAudioNode'
import Filter from 'nodes/core/Filter'

const defaultProps = {
    lowFrequency: 320,
    lowGain: 0,
    highFrequency: 3200,
    highGain: 0,
}

class EQ2 extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'EQ2'
        this.low = new Filter(this.AC, { type: 'lowshelf', frequency: 320 })
        this.high = new Filter(this.AC, { type: 'highshelf', frequency: 3200 })

        this.params = {
            lowFrequency: this.low.getParams().frequency,
            lowGain: this.low.getParams().gain,
            highFrequency: this.high.getParams().frequency,
            highGain: this.high.getParams().gain,
        }
        this.inputs = [this.low]
        this.outputs = [this.high]

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setLowFrequency(initProps.lowFrequency)
        this.setLowGain(initProps.lowGain)
        this.setHighFrequency(initProps.highFrequency)
        this.setHighGain(initProps.highGain)

        // Connections
        this.low.connect(this.high)
    }

    // - Getters -
    getLowFrequency = () => this.params.lowFrequency.value
    getLowGain = () => this.params.lowGain.value
    getHighFrequency = () => this.params.highFrequency.value
    getHighGain = () => this.params.highGain.value

    // - Setters -
    setLowGain = (val, time) => this.low.setGain(val, time)
    setLowFrequency = (val, time) => this.low.setFrequency(val, time)
    setHighGain = (val, time) => this.high.setGain(val, time)
    setHighFrequency = (val, time) => this.high.setFrequency(val, time)
}

export default EQ2
