import DotAudioNode from '../DotAudioNode.js'

class Compressor extends DotAudioNode {
    constructor(AC) {
        super(AC)
        this.name = 'Compressor'
        this.compressor = this.AC.createDynamicsCompressor()

        this.params = {
            knee: this.compressor.knee,
            threshold: this.compressor.threshold,
            ratio: this.compressor.ratio,
            attack: this.compressor.attack,
            release: this.compressor.release,
        }
    }

    // Getters
    getInputs = () => [this.compressor]
    getOutputs = () => [this.compressor]

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

export default Compressor
