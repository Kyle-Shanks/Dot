import DotAudioNode from '../DotAudioNode.js'

class Limiter extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Limiter'
        this.limiter = this.AC.createDynamicsCompressor()

        this.params = {
            knee: this.limiter.knee,
            threshold: this.limiter.threshold,
            ratio: this.limiter.ratio,
            attack: this.limiter.attack,
            release: this.limiter.release,
        }

        this.setThreshold(-6)
        this.setAttack(0.003)
        this.setRelease(0.01)
        this.setRatio(20)
    }

    // Getters
    getInputs = () => [this.limiter]
    getOutputs = () => [this.limiter]

    getKnee = () => this.params.knee.value
    getThreshold = () => this.params.threshold.value
    getRatio = () => this.params.ratio.value
    getAttack = () => this.params.attack.value
    getRelease = () => this.params.release.value

    // Setters
    setKnee = (val, time) => this._timeUpdate(this.params.knee, val, time)
    setThreshold = (val, time) => this._timeUpdate(this.params.threshold, val, time)
    setRatio = (val, time) => this._timeUpdate(this.params.ratio, val, time)
    setAttack = (val, time) => this._timeUpdate(this.params.attack, val, time)
    setRelease = (val, time) => this._timeUpdate(this.params.release, val, time)
}

export default Limiter
