import DotAudioNode from '../DotAudioNode.js'

class StereoPanner extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'StereoPanner'
        this.panner = this.AC.createStereoPanner()

        this.params = {
            pan: this.panner.pan,
        }
    }

    // - Getters -
    getInputs = () => [this.panner]
    getOutputs = () => [this.panner]

    getPan = () => this.params.pan.value

    // - Setters -
    setPan = (val, time) => this._timeUpdate(this.params.pan, val, time)
}

export default StereoPanner
