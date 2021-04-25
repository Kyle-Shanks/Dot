import DotAudioNode from '../DotAudioNode.js'
import { WAVEFORM } from '../../util/util.js'

class Oscillator extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Oscillator'
        this.osc = this.AC.createOscillator()

        this.params = {
            frequency: this.osc.frequency,
            detune: this.osc.detune,
        }
    }

    start = () => this.osc.start()
    stop = () => this.osc.stop()

    // - Getters -
    getOutputs = () => [this.osc]

    getFrequency = () => this.params.frequency.value
    getDetune = () => this.params.detune.value
    getType = () => this.osc.type

    // - Setters -
    setFrequency = (val, time) => this._timeUpdate(this.params.frequency, val, time)
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)
    setType = (val) => {
        if (WAVEFORM.includes(val)) this.osc.type = val
    }
}

export default Oscillator
