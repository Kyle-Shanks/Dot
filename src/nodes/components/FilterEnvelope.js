import Envelope from 'nodes/components/Envelope'
import Filter from 'nodes/core/Filter'

const defaultProps = {
    frequency: 2000,
    q: 0,
    detune: 0,
    gain: 0,
    type: 'lowpass',
}

class FilterEnvelope extends Envelope {
    constructor(AC, opts = {}) {
        super(AC, opts)
        this.name = 'FilterEnvelope'
        this.filter = new Filter(this.AC)

        this.params = {
            frequency: this.filter.getParams().frequency,
            detune: this.filter.getParams().detune,
            q: this.filter.getParams().q,
            gain: this.filter.getParams().gain,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setFrequency(initProps.frequency)
        this.setQ(initProps.q)
        this.setDetune(initProps.detune)
        this.setGain(initProps.gain)
        this.setType(initProps.type)

        // Connections
        this.source.connect(this.filter.getParams().frequency)
    }

    // - Getters -
    getInputs = () => [this.filter]
    getOutputs = () => [this.filter]

    getFrequency = () => this.params.frequency.value
    getDetune = () => this.params.detune.value
    getQ = () => this.params.q.value
    getGain = () => this.params.gain.value
    getType = () => this.filter.getType()

    // - Setters -
    setFrequency = (val, time) => this.filter.setFrequency(val, time)
    setDetune = (val, time) => this.filter.setDetune(val, time)
    setQ = (val, time) => this.filter.setQ(val, time)
    setGain = (val, time) => this.filter.setGain(val, time)
    setType = (val) => this.filter.setType(val)
}

export default FilterEnvelope
