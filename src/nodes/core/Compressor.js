import DotAudioNode from '../DotAudioNode.js'

const defaultProps = {
    threshold: -24,
    ratio: 12,
    knee: 30,
    attack: 0.003,
    release: 0.25,
}

class Compressor extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Compressor'
        this.compressor = this.AC.createDynamicsCompressor()

        this.params = {
            knee: this.compressor.knee,
            threshold: this.compressor.threshold,
            ratio: this.compressor.ratio,
            attack: this.compressor.attack,
            release: this.compressor.release,
            reduction: this.compressor.reduction,
        }

        // Initialize
        const initProps = {
            ...defaultProps,
            ...opts,
        }

        this.setThreshold(initProps.threshold)
        this.setRatio(initProps.ratio)
        this.setKnee(initProps.knee)
        this.setAttack(initProps.attack)
        this.setRelease(initProps.release)
    }

    // Getters
    getInputs = () => [this.compressor]
    getOutputs = () => [this.compressor]

    getKnee = () => this.params.knee.value
    getThreshold = () => this.params.threshold.value
    getRatio = () => this.params.ratio.value
    getAttack = () => this.params.attack.value
    getRelease = () => this.params.release.value
    getReduction = () => this.params.reduction

    // Setters
    setKnee = (val, time) => this._timeUpdate(this.params.knee, val, time)
    setThreshold = (val, time) => this._timeUpdate(this.params.threshold, val, time)
    setRatio = (val, time) => this._timeUpdate(this.params.ratio, val, time)
    setAttack = (val, time) => this._timeUpdate(this.params.attack, val, time)
    setRelease = (val, time) => this._timeUpdate(this.params.release, val, time)
}

export default Compressor
