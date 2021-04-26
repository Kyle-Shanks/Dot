import Gain from '../core/Gain.js'
import Envelope from './Envelope.js'

const defaultProps = {
    gain: 0,
}

class GainEnvelope extends Envelope {
    constructor(AC, opts = {}) {
        super(AC, opts)
        this.name = 'GainEnvelope'
        this.gain = new Gain(this.AC)

        this.params = {
            gain: this.gain.getParams().gain
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setGain(initProps.gain)

        // Connections
        this.source.connect(this.gain.getParams().gain)
    }

    // - Getters -
    getInputs = () => [this.gain]
    getOutputs = () => [this.gain]

    getGain = () => this.params.gain.value

    // - Setters -
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default GainEnvelope
