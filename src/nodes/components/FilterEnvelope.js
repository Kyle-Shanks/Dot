import Filter from '../core/Filter.js'
import Envelope from './Envelope.js'

class FilterEnvelope extends Envelope {
    constructor(AC) {
        super(AC)
        this.name = 'FilterEnvelope'
        this.filter = new Filter(this.AC)

        this.params = {
            frequency: this.filter.getParams().frequency,
            detune: this.filter.getParams().detune,
            q: this.filter.getParams().q,
            gain: this.filter.getParams().gain,
        }

        // Initialize
        this.source.connect(this.filter.getParams().frequency)
    }

    // - Getters -
    getInputs = () => [this.filter]
    getOutputs = () => [this.filter]

    getFreq = () => this.params.frequency.value
    getDetune = () => this.params.detune.value
    getQ = () => this.params.q.value
    getGain = () => this.params.gain.value
    getType = () => this.filter.getType()

    // - Setters -
    setFreq = (val, time) => this.filter.setFreq(val, time)
    setDetune = (val, time) => this.filter.setDetune(val, time)
    setQ = (val, time) => this.filter.setQ(val, time)
    setGain = (val, time) => this.filter.setGain(val, time)
    setType = (val) => this.filter.setType(val)
}

export default FilterEnvelope
