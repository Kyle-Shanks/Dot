import DotAudioNode from '../DotAudioNode.js'
import Oscillator from '../sources/Oscillator.js'
import Gain from '../core/Gain.js'

// Simple Oscillator connected to a Gain node
class Osc extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Osc'
        this.osc = new Oscillator(this.AC)
        this.gain = new Gain(this.AC)

        this.params = {
            frequency: this.osc.getParams().frequency,
            detune: this.osc.getParams().detune,
            gain: this.gain.getParams().gain,
        }

        // Initialize
        this.osc.connect(this.gain)
        this.osc.start()
    }

    // --- Public Methods ---
    // - Getters -
    getOutputs = () => [this.gain]

    // Oscillator
    getWaveform = () => this.osc.getType()
    getFrequency = () => this.params.frequency.value
    getDetune = () => this.params.detune.value
    // Gain
    getGain = () => this.params.gain.value

    // - Setters -
    // Oscillator
    setWaveform = (val) => this.osc.setType(val)
    setFrequency = (val, time) => this.osc.setFrequency(val, time)
    setDetune = (val, time) => this.osc.setDetune(val, time)
    // Gain
    setGain = (val, time) => this.gain.setGain(val, time)
}

export default Osc
