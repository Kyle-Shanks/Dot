import DotAudioNode from 'nodes/DotAudioNode'

const defaultProps = {
    gain: 1,
}

class Gain extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Gain'
        this.gain = this.AC.createGain()

        this.params = {
            gain: this.gain.gain,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setGain(initProps.gain)
    }

    // - Getters -
    getInputs = () => [this.gain]
    getOutputs = () => [this.gain]

    getGain = () => this.params.gain.value

    // - Setters -
    setGain = (val, time) => this._timeUpdate(this.params.gain, val, time)
}

export default Gain
