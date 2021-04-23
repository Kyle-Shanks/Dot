import Gain from '../core/Gain.js'
import Envelope from './Envelope.js'

class GainEnvelope extends Envelope {
    constructor(AC) {
        super(AC)
        this.name = 'GainEnvelope'
        this.gain = new Gain(this.AC)

        // Initialize
        this.gain.setGain(0)
        this.source.connect(this.gain.getParams().gain)
    }

    // Getters
    getInputs = () => [this.gain]
    getOutputs = () => [this.gain]
}

export default GainEnvelope
