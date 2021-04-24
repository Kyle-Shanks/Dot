import Gain from '../core/Gain.js'
import Envelope from './Envelope.js'

class GainEnvelope extends Envelope {
    constructor(AC) {
        super(AC)
        this.name = 'GainEnvelope'
        this.gain = new Gain(this.AC)

        this.params = {
            gain: this.gain.getParams().gain
        }

        // Initialize
        this.gain.setGain(0)
        this.source.connect(this.gain.getParams().gain)
    }

    // Getters
    getInputs = () => [this.gain]
    getOutputs = () => [this.gain]

    getGain = () => this.params.gain.value

    // Setters
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default GainEnvelope
