import DotAudioNode from '../DotAudioNode.js'
import { WAVEFORM } from '../../util/util.js'

const defaultProps = {
    type: 'sine',
    frequency: 440,
    detune: 0,
    start: false,
}

class Oscillator extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Oscillator'
        this.osc = this.AC.createOscillator()

        this.params = {
            frequency: this.osc.frequency,
            detune: this.osc.detune,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setType(initProps.type)
        this.setFrequency(initProps.frequency)
        this.setDetune(initProps.detune)

        if (initProps.start) this.start()
    }

    start = () => this.osc.start()
    stop = () => this.osc.stop()

    // - Getters -
    getOutputs = () => [this.osc]

    getFrequency = () => this.params.frequency.value
    getDetune = () => this.params.detune.value
    getWaveform = () => this.getType()
    getType = () => this.osc.type

    // - Setters -
    setFrequency = (val, time) => this._timeUpdate(this.params.frequency, val, time)
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)
    setWaveform = (val) => this.setType(val)
    setType = (val) => {
        if (WAVEFORM.includes(val)) this.osc.type = val
    }
}

export default Oscillator
