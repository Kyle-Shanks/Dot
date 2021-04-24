import DotAudioNode from '../DotAudioNode.js'

class Gain extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Gain'
        this.gain = this.AC.createGain()

        this.params = {
            gain: this.gain.gain,
        }
    }

    // - Getters -
    getInputs = () => [this.gain]
    getOutputs = () => [this.gain]

    getGain = () => this.params.gain.value

    // - Setters -
    setGain = (val, time) => this._timeUpdate(this.params.gain, val, time)
}

export default Gain
