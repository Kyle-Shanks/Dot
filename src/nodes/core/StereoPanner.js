import DotAudioNode from 'nodes/DotAudioNode'

const defaultProps = {
    pan: 0,
}

class StereoPanner extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'StereoPanner'
        this.panner = this.AC.createStereoPanner()

        this.params = {
            pan: this.panner.pan,
        }

        // Initialize
        const initProps = { ...defaultProps, ...opts }

        this.setPan(initProps.pan)
    }

    // - Getters -
    getInputs = () => [this.panner]
    getOutputs = () => [this.panner]

    getPan = () => this.params.pan.value

    // - Setters -
    setPan = (val, time) => this._timeUpdate(this.params.pan, val, time)
}

export default StereoPanner
