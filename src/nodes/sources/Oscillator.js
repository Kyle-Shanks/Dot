import Node from '../Node.js'
import { WAVEFORM } from '../../util/util.js'

class Oscillator extends Node {
    constructor(AC) {
        super(AC)
        this.osc = this.AC.createOscillator()

        this.params = {
            frequency: this.osc.frequency,
            detune: this.osc.detune,
            type: this.osc.type,
        }
    }

    start = () => this.osc.start()
    stop = () => this.osc.stop()

    // Getters
    getOutputs = () => [this.osc]

    getFreq = () => this.params.frequency.value
    getDetune = () => this.params.detune.value
    getType = () => this.params.type

    // Setters
    setFreq = (val, time) => this._timeUpdate(this.params.frequency, val, time)
    setDetune = (val, time) => this._timeUpdate(this.params.detune, val, time)
    setType = (type) => {
        if (WAVEFORM.includes(type)) this.params.type = type
    }
}

export default Oscillator
