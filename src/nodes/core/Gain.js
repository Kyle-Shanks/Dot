import Node from '../Node.js'

class Gain extends Node {
    constructor(AC) {
        super(AC)
        this.gain = this.AC.createGain()

        this.params = {
            gain: this.gain.gain,
        }
    }

    // Getters
    getInputs = () => [this.gain]
    getOutputs = () => [this.gain]

    getGain = () => this.params.gain.value

    // Setters
    setGain = (val, time) => this._timeUpdate(this.params.gain, val, time)
}

export default Gain
