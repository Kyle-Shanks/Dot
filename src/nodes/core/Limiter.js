import DotAudioNode from '../DotAudioNode.js'

const defaultProps = {
    threshold: -6,
    ratio: 20,
    knee: 30,
    attack: 0.003,
    release: 0.01,
}

class Limiter extends DotAudioNode {
    constructor(AC, opts = {}) {
        super(AC)
        this.name = 'Limiter'
        this.limiter = this.AC.createDynamicsCompressor()

        this.params = {
            knee: this.limiter.knee,
            threshold: this.limiter.threshold,
            ratio: this.limiter.ratio,
            attack: this.limiter.attack,
            release: this.limiter.release,
            reduction: this.limiter.reduction,
        }

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
    getInputs = () => [this.limiter]
    getOutputs = () => [this.limiter]

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

export default Limiter
