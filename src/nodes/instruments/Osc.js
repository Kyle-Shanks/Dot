import DotAudioNode from 'nodes/DotAudioNode'
import Gain from 'nodes/core/Gain'
import Oscillator from 'nodes/sources/Oscillator'

const defaultProps = {
    waveform: 'sine',
    frequency: 440,
    detune: 0,
    gain: 1,
}

// Simple Oscillator connected to a Gain node
class Osc extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Osc'
        this.osc = new Oscillator(this.AC, { start: true })
        this.gain = new Gain(this.AC)

        this.params = {
            frequency: this.osc.getParams().frequency,
            detune: this.osc.getParams().detune,
            gain: this.gain.getParams().gain,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setWaveform(initProps.waveform)
        this.setFrequency(initProps.frequency)
        this.setDetune(initProps.detune)
        this.setGain(initProps.gain)

        // Connections
        this.osc.connect(this.gain)
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
